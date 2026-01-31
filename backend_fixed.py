import joblib
import pandas as pd
import shap
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from google import genai
from contextlib import asynccontextmanager

# --- 1. CẤU HÌNH AI & BIẾN TOÀN CỤC ---
GEMINI_API_KEY = "AIzaSyBrdxlHX0E6GgUkv94hDBJhg2Ewk60f4JA"
GEMINI_CLIENT = genai.Client(api_key=GEMINI_API_KEY)
GEMINI_MODEL_ID = "gemini-2.0-flash"

MODELS = {}

# --- 2. QUẢN LÝ VÒNG ĐỜI (LIFESPAN) ---
@asynccontextmanager
async def lifespan(app: FastAPI):
    # [STARTUP]: Chạy khi server bắt đầu
    try:
        # Đường dẫn tuyệt đối như bạn đã thiết lập
        MODELS['clinical_model'] = joblib.load(r'D:\laptrinhpython\Final\diabetes_model.pkl')
        MODELS['clinical_scaler'] = joblib.load(r'D:\laptrinhpython\Final\scaler_diabetes.pkl')
        MODELS['clinical_encoders'] = joblib.load(r'D:\laptrinhpython\Final\label_encoders.pkl')
        MODELS['clinical_background'] = joblib.load(r'D:\laptrinhpython\Final\x_train_sample.pkl')

        MODELS['home_model'] = joblib.load(r'D:\laptrinhpython\Final\diabetes_model_home.pkl')
        MODELS['home_background'] = joblib.load(r'D:\laptrinhpython\Final\x_train_sample_home.pkl')

        print("✅ [Lifespan] Đã tải tất cả Models thành công!")
    except Exception as e:
        print(f"❌ [Lifespan] Lỗi tải model: {e}")

    yield
    MODELS.clear()
    print("🧹 [Lifespan] Đã giải phóng bộ nhớ.")

# --- 3. KHỞI TẠO APP & CORS ---
app = FastAPI(title="DiabeTwin AI Backend", lifespan=lifespan)

# FIXED: Corrected the syntax error - was "a   pp.add_middleware"
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Cho phép tất cả các nguồn (Next.js port 3000)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- 4. SCHEMA DỮ LIỆU ---
class ClinicalInput(BaseModel):
    gender: str
    age: int
    smoking_history: str
    hypertension: int
    heart_disease: int
    bmi: float
    hba1c: float
    glucose: int

class HomeInput(BaseModel):
    HighBP: int
    HighChol: int
    CholCheck: int
    BMI: float
    Smoker: int
    Stroke: int
    HeartDiseaseorAttack: int
    PhysActivity: int
    Fruits: int
    Veggies: int
    HvyAlcoholConsump: int
    GenHlth: int
    MentHlth: int
    PhysHlth: int
    DiffWalk: int
    Sex: int
    Age: int

# --- 5. ENDPOINTS ---

@app.post("/api/predict/clinical")
async def predict_clinical(data: ClinicalInput):
    try:
        encoders = MODELS['clinical_encoders']
        scaler = MODELS['clinical_scaler']

        input_list = [
            encoders['gender'].transform([data.gender])[0],
            data.age, data.hypertension, data.heart_disease,
            encoders['smoking_history'].transform([data.smoking_history])[0],
            data.bmi, data.hba1c, data.glucose
        ]

        df = pd.DataFrame([input_list], columns=MODELS['clinical_background'].columns)
        scaled_df = pd.DataFrame(scaler.transform(df), columns=df.columns)

        prob = float(MODELS['clinical_model'].predict_proba(scaled_df)[0][1])

        # SHAP Calculation
        f = lambda x: MODELS['clinical_model'].predict_proba(x)[:, 1]
        background = scaler.transform(MODELS['clinical_background'].sample(100))
        explainer = shap.Explainer(f, background)
        shap_values = explainer(scaled_df)

        impacts = []
        features = ["Giới tính", "Tuổi", "Huyết áp", "Bệnh tim", "Hút thuốc", "BMI", "HbA1c", "Đường huyết"]
        for i, val in enumerate(shap_values.values[0]):
            impacts.append({"feature": features[i], "impact": round(val * 100, 2)})

        advice = await get_gemini_advice(prob, impacts, "Bác sĩ", data.dict())

        return {
            "probability": round(prob * 100, 2),
            "status": "DƯƠNG TÍNH" if prob > 0.5 else "ÂM TÍNH",
            "risk_level": "🔴" if prob > 0.7 else "🟡" if prob > 0.3 else "🟢",
            "impacts": impacts,
            "ai_advice": advice
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/predict/home")
async def predict_home(data: HomeInput):
    try:
        df = pd.DataFrame([data.dict()])
        prob = float(MODELS['home_model'].predict_proba(df)[0][1])

        f = lambda x: MODELS['home_model'].predict_proba(x)[:, 1]
        explainer = shap.Explainer(f, MODELS['home_background'])
        shap_values = explainer(df)

        display_names = [
            "Huyết áp cao", "Cholesterol cao", "Kiểm tra Chol", "Chỉ số BMI",
            "Hút thuốc", "Đột quỵ", "Bệnh tim", "Vận động", "Trái cây",
            "Rau xanh", "Rượu bia", "Sức khỏe tổng quát", "Sức khỏe tâm thần",
            "Sức khỏe thể chất", "Đi lại khó", "Giới tính", "Nhóm tuổi"
        ]

        impacts = []
        for i, val in enumerate(shap_values.values[0]):
            impacts.append({"feature": display_names[i], "impact": round(val * 100, 2)})

        advice = await get_gemini_advice(prob, impacts, "Người dùng", data.dict())

        return {
            "probability": round(prob * 100, 2),
            "status": "NGUY CƠ CAO" if prob > 0.5 else "AN TOÀN",
            "impacts": impacts,
            "ai_advice": advice
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "models_loaded": len(MODELS) > 0
    }

async def get_gemini_advice(prob, impacts, role, raw_data):
    top_3 = sorted(impacts, key=lambda x: abs(x['impact']), reverse=True)[:3]
    top_3_str = "\n".join([f"- {i['feature']}: {i['impact']}%" for i in top_3])

    prompt = f"""
    Bạn là bác sĩ tư vấn AI. Phân tích kết quả cho {role}.
    Nguy cơ: {prob * 100:.1f}%.
    3 yếu tố ảnh hưởng nhất từ SHAP: {top_3_str}
    Dữ liệu thô: {raw_data}
    Giải thích ngắn gọn ý nghĩa các con số % và đưa ra 3 lời khuyên.
    """
    try:
        res = GEMINI_CLIENT.models.generate_content(model=GEMINI_MODEL_ID, contents=prompt)
        return res.text
    except:
        return "Tạm thời không thể kết nối tư vấn AI."

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
