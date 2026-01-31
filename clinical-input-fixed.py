import joblib
import pandas as pd
import shap
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from contextlib import asynccontextmanager
import logging
import os
from dotenv import load_dotenv
import asyncio
from concurrent.futures import ThreadPoolExecutor

load_dotenv(override=True)

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# --- 1. CONFIGURATION & GLOBALS ---
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
GEMINI_MODEL_ID = "gemini-2.5-flash"
GEMINI_CLIENT = None
executor = ThreadPoolExecutor(max_workers=2)

print(f"DEBUG: Gemini API Key configured: {bool(GEMINI_API_KEY)}")

def init_gemini_client():
    """Initialize Gemini client with error handling"""
    global GEMINI_CLIENT
    try:
        import google.generativeai as genai
        genai.configure(api_key=GEMINI_API_KEY)
        GEMINI_CLIENT = genai
        logger.info("✅ Gemini API client initialized successfully")
        return True
    except ImportError:
        logger.error("❌ google-generativeai package not installed")
        logger.info("Install with: pip install google-generativeai")
        return False
    except Exception as e:
        logger.error(f"❌ Failed to initialize Gemini client: {e}")
        return False


MODELS = {}


# --- 2. LIFECYCLE MANAGEMENT ---
@asynccontextmanager
async def lifespan(app: FastAPI):
    # [STARTUP]
    try:
        # Load ML models
        MODELS['clinical_model'] = joblib.load(r'D:\laptrinhpython\Final\diabetes_model.pkl')
        MODELS['clinical_scaler'] = joblib.load(r'D:\laptrinhpython\Final\scaler_diabetes.pkl')
        MODELS['clinical_encoders'] = joblib.load(r'D:\laptrinhpython\Final\label_encoders.pkl')
        MODELS['clinical_background'] = joblib.load(r'D:\laptrinhpython\Final\x_train_sample.pkl')

        MODELS['home_model'] = joblib.load(r'D:\laptrinhpython\Final\diabetes_model_home.pkl')
        MODELS['home_background'] = joblib.load(r'D:\laptrinhpython\Final\x_train_sample_home.pkl')

        logger.info("✅ All ML Models loaded successfully!")

        # Initialize Gemini
        gemini_ok = init_gemini_client()
        if not gemini_ok:
            logger.warning("⚠️ Gemini API not available - will use fallback advice")

    except Exception as e:
        logger.error(f"❌ Error loading models: {e}")
        raise

    yield
    MODELS.clear()
    logger.info("🧹 Memory cleared on shutdown")


# --- 3. INITIALIZE APP & CORS ---
app = FastAPI(title="DiabeTwin AI Backend", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# --- 4. DATA SCHEMAS ---
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


# --- 5. HELPER FUNCTIONS ---

def generate_fallback_advice(prob: float, impacts: list, role: str, raw_data: dict) -> str:
    """Generate default advice when Gemini is unavailable"""

    top_3 = sorted(impacts, key=lambda x: abs(x['impact']), reverse=True)[:3]
    risk_level = "cao" if prob > 0.7 else "trung bình" if prob > 0.4 else "thấp"

    advice = f"""**Phân tích nguy cơ tiểu đường**

🎯 **Kết quả:** Nguy cơ ở mức **{risk_level}** với xác suất {prob * 100:.1f}%

📊 **3 Yếu tố ảnh hưởng lớn nhất:**
"""

    for i, impact in enumerate(top_3, 1):
        direction = "tăng" if impact['impact'] > 0 else "giảm"
        advice += f"\n{i}. **{impact['feature']}**: {direction} {abs(impact['impact']):.1f}% nguy cơ"

    advice += "\n\n💡 **Khuyến nghị:**\n"

    if prob > 0.7:
        advice += """
1. **Khẩn cấp:** Cần gặp bác sĩ chuyên khoa tiểu đường trong vòng 1 tuần
2. **Kiểm tra:** Xét nghiệm HbA1c và đường huyết đói ngay
3. **Lối sống:** Bắt đầu chế độ ăn kiêng ít đường, tăng vận động ngay lập tức
"""
    elif prob > 0.4:
        advice += """
1. **Theo dõi:** Đặt lịch khám sức khỏe định kỳ 3-6 tháng/lần
2. **Phòng ngừa:** Điều chỉnh chế độ ăn, tăng vận động 30 phút/ngày
3. **Kiểm tra:** Theo dõi các chỉ số sức khỏe tại nhà
"""
    else:
        advice += """
1. **Duy trì:** Tiếp tục lối sống lành mạnh hiện tại
2. **Kiểm tra:** Khám sức khỏe định kỳ hàng năm
3. **Phòng ngừa:** Giữ cân nặng ổn định, vận động đều đặn
"""

    advice += "\n\n⚠️ *Lưu ý: Kết quả chỉ mang tính tham khảo. Vui lòng tham khảo ý kiến bác sĩ chuyên khoa.*"

    return advice


def call_gemini_sync(prompt: str) -> str:
    """Synchronous call to Gemini API with proper error handling"""
    if GEMINI_CLIENT is None:
        logger.warning("Gemini client not initialized")
        return None

    try:
        logger.info("Calling Gemini API...")
        
        # Use the correct API call method
        model = GEMINI_CLIENT.GenerativeModel(GEMINI_MODEL_ID)
        response = model.generate_content(
            prompt,
            generation_config=GEMINI_CLIENT.types.GenerationConfig(
                temperature=0.7,
                max_output_tokens=1000,
            )
        )
        
        if response and response.text:
            logger.info("✅ Gemini API response received successfully")
            return response.text
        else:
            logger.warning("⚠️ Gemini API returned empty response")
            return None

    except Exception as e:
        logger.error(f"❌ Gemini API error: {type(e).__name__}: {e}")
        return None


async def get_gemini_advice(prob: float, impacts: list, role: str, raw_data: dict) -> str:
    """Get advice from Gemini API with fallback and timeout"""

    if GEMINI_CLIENT is None:
        logger.warning("Using fallback advice (Gemini not available)")
        return generate_fallback_advice(prob, impacts, role, raw_data)

    top_3 = sorted(impacts, key=lambda x: abs(x['impact']), reverse=True)[:3]
    top_3_str = "\n".join([f"- {i['feature']}: {i['impact']:.1f}%" for i in top_3])

    prompt = f"""Bạn là bác sĩ tư vấn AI chuyên về tiểu đường. Phân tích kết quả cho {role}.

**Thông tin bệnh nhân:**
- Nguy cơ tiểu đường: {prob * 100:.1f}%
- 3 yếu tố ảnh hưởng nhất (SHAP values):
{top_3_str}

Hãy đưa ra:
1. Giải thích ngắn gọn ý nghĩa các con số phần trăm
2. Phân tích nguy cơ
3. 3-4 lời khuyên cụ thể và khả thi

Trả lời bằng tiếng Việt, chuyên nghiệp nhưng dễ hiểu."""

    try:
        # Run sync Gemini call in thread pool with timeout
        loop = asyncio.get_event_loop()
        response_text = await asyncio.wait_for(
            loop.run_in_executor(executor, call_gemini_sync, prompt),
            timeout=30.0  # 30 second timeout
        )

        if response_text:
            return response_text
        else:
            logger.warning("Gemini returned empty, using fallback")
            return generate_fallback_advice(prob, impacts, role, raw_data)

    except asyncio.TimeoutError:
        logger.error("❌ Gemini API timeout (30s)")
        return generate_fallback_advice(prob, impacts, role, raw_data)
    except Exception as e:
        logger.error(f"❌ Gemini API exception: {type(e).__name__}: {e}")
        return generate_fallback_advice(prob, impacts, role, raw_data)


# --- 6. ENDPOINTS ---

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "models_loaded": len(MODELS) > 0,
        "gemini_available": GEMINI_CLIENT is not None
    }


@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "message": "DiabeTwin AI Backend",
        "version": "2.1",
        "endpoints": {
            "health": "/health",
            "clinical": "/api/predict/clinical",
            "home": "/api/predict/home",
            "docs": "/docs"
        }
    }


@app.post("/api/predict/clinical")
async def predict_clinical(data: ClinicalInput):
    """Clinical prediction endpoint (Doctor mode)"""
    try:
        logger.info(f"Clinical prediction request: {data.dict()}")

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

        # Get AI advice with proper async handling
        advice = await get_gemini_advice(prob, impacts, "Bác sĩ", data.dict())

        result = {
            "probability": round(prob * 100, 2),
            "status": "DƯƠNG TÍNH" if prob > 0.5 else "ÂM TÍNH",
            "risk_level": "🔴" if prob > 0.7 else "🟡" if prob > 0.3 else "🟢",
            "impacts": impacts,
            "ai_advice": advice
        }

        logger.info(f"Clinical prediction successful: {prob * 100:.1f}%")
        return result

    except Exception as e:
        logger.error(f"Clinical prediction error: {e}", exc_info=True)
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/api/predict/home")
async def predict_home(data: HomeInput):
    """Home prediction endpoint (User mode)"""
    try:
        logger.info(f"Home prediction request received")

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

        # Get AI advice with proper async handling
        advice = await get_gemini_advice(prob, impacts, "Người dùng", data.dict())

        result = {
            "probability": round(prob * 100, 2),
            "status": "NGUY CƠ CAO" if prob > 0.5 else "AN TOÀN",
            "impacts": impacts,
            "ai_advice": advice
        }

        logger.info(f"Home prediction successful: {prob * 100:.1f}%")
        return result

    except Exception as e:
        logger.error(f"Home prediction error: {e}", exc_info=True)
        raise HTTPException(status_code=500, detail=str(e))


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
