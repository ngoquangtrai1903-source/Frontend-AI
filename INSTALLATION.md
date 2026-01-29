# 📦 Hướng dẫn Cài đặt DiabeTwin UI

## 🎯 Mục đích
Tài liệu này hướng dẫn chi tiết cách cài đặt và chạy giao diện web DiabeTwin trên máy local.

---

## ✅ Yêu cầu hệ thống

### Bắt buộc:
- **Node.js**: Phiên bản 18.0 trở lên ([Tải tại đây](https://nodejs.org/))
- **npm**: Thường đi kèm với Node.js
- **Trình duyệt hiện đại**: Chrome, Firefox, Safari, hoặc Edge

### Kiểm tra:
```bash
node --version   # Nên >= v18.0.0
npm --version    # Nên >= 9.0.0
```

---

## 📥 Bước 1: Chuẩn bị dự án

### 1.1. Tạo thư mục dự án mới
```bash
mkdir diabetwin-ui
cd diabetwin-ui
```

### 1.2. Copy các file đã tạo vào thư mục
Copy toàn bộ nội dung từ folder `diabetwin-ui` vào thư mục này, bao gồm:
```
diabetwin-ui/
├── app/
│   ├── api/
│   │   └── predict/
│   │       └── route.ts
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ImpactChart.tsx
│   ├── PatientForm.tsx
│   ├── ResultsDisplay.tsx
│   └── WaterfallChart.tsx
├── tailwind.config.ts
├── README_DIABETWIN.md
└── INSTALLATION.md (file này)
```

### 1.3. Copy các file config từ project Next.js gốc
Bạn cần copy các file sau từ dự án Next.js gốc của bạn:
- `package.json`
- `package-lock.json`
- `next.config.ts`
- `tsconfig.json`
- `.gitignore`
- `eslint.config.mjs`
- `postcss.config.mjs`

---

## 🔧 Bước 2: Cài đặt Dependencies

### 2.1. Cài đặt các package cần thiết
```bash
npm install
```

Nếu gặp lỗi, thử:
```bash
npm install --legacy-peer-deps
```

### 2.2. Xác minh cài đặt
```bash
npm list next react react-dom
```

Kết quả mong đợi:
```
├── next@16.1.6
├── react@19.2.3
└── react-dom@19.2.3
```

---

## 🚀 Bước 3: Chạy ứng dụng

### 3.1. Development Mode
```bash
npm run dev
```

### 3.2. Mở trình duyệt
Truy cập: **http://localhost:3000**

Bạn sẽ thấy giao diện DiabeTwin với:
- ✅ Header với logo và toggle mode
- ✅ Form nhập liệu 8 chỉ số y học
- ✅ Nút "PHÂN TÍCH NGUY CƠ"

### 3.3. Test chức năng
1. Điền thông tin vào form
2. Click "PHÂN TÍCH NGUY CƠ"
3. Xem kết quả với:
   - Metrics cards (xác suất, kết luận, mức độ rủi ro)
   - Biểu đồ Impact
   - Biểu đồ Waterfall
   - Lời khuyên từ AI

---

## 🏗️ Bước 4: Build Production (Tùy chọn)

### 4.1. Build
```bash
npm run build
```

### 4.2. Start production server
```bash
npm start
```

### 4.3. Preview
Truy cập: **http://localhost:3000**

---

## 🔌 Bước 5: Tích hợp Backend (Quan trọng!)

Hiện tại API đang dùng **mock data**. Để kết nối với ML model thực:

### 5.1. Nếu có API endpoint sẵn:

Sửa file `app/page.tsx`:
```typescript
const handleAnalyze = async (formData: any) => {
  setIsAnalyzing(true);
  
  try {
    // Thay YOUR_API_URL bằng URL thực
    const response = await fetch('YOUR_API_URL/predict', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    
    const results = await response.json();
    setResults(results);
  } catch (error) {
    console.error('Error:', error);
    alert('Có lỗi xảy ra khi phân tích. Vui lòng thử lại.');
  } finally {
    setIsAnalyzing(false);
  }
};
```

### 5.2. Nếu chưa có backend:

File `app/api/predict/route.ts` đã được tạo sẵn với logic mock. Bạn có thể:

**Option A**: Tích hợp Python ML model qua API gateway
**Option B**: Deploy Python backend riêng (FastAPI/Flask)
**Option C**: Sử dụng serverless function (AWS Lambda, Vercel Functions)

#### Ví dụ với Python FastAPI:

```python
from fastapi import FastAPI
from pydantic import BaseModel
import joblib

app = FastAPI()

# Load model
model = joblib.load('diabetes_model.pkl')
scaler = joblib.load('scaler.pkl')

class PatientData(BaseModel):
    gender: str
    age: int
    smoking: str
    hypertension: bool
    heart_disease: bool
    bmi: float
    hba1c: float
    glucose: int

@app.post("/predict")
async def predict(data: PatientData):
    # Preprocess
    input_data = preprocess(data)
    scaled_data = scaler.transform(input_data)
    
    # Predict
    probability = model.predict_proba(scaled_data)[0][1]
    
    # Calculate SHAP
    impacts = calculate_shap(scaled_data)
    
    return {
        "probability": float(probability),
        "conclusion": "DƯƠNG TÍNH" if probability > 0.5 else "ÂM TÍNH",
        "riskLevel": "high" if probability > 0.7 else "medium" if probability > 0.4 else "low",
        "impacts": impacts,
        "aiAdvice": generate_advice(data, impacts)
    }
```

---

## 🎨 Bước 6: Tùy chỉnh giao diện (Tùy chọn)

### 6.1. Đổi màu chủ đạo
Sửa `tailwind.config.ts`:
```typescript
colors: {
  primary: {
    500: '#YOUR_COLOR', // Màu chính
  }
}
```

### 6.2. Đổi font chữ
Sửa `app/layout.tsx`:
```typescript
<link 
  href="https://fonts.googleapis.com/css2?family=YOUR_FONT&display=swap" 
  rel="stylesheet" 
/>
```

### 6.3. Thêm logo riêng
Replace emoji trong `app/page.tsx`:
```typescript
<img src="/logo.png" alt="Logo" className="w-10 h-10" />
```

---

## 🐛 Xử lý lỗi thường gặp

### Lỗi 1: Module not found
```bash
npm install
npm run dev
```

### Lỗi 2: Port 3000 đã được sử dụng
```bash
# Chạy trên port khác
PORT=3001 npm run dev
```

### Lỗi 3: TypeScript errors
```bash
# Xóa cache và rebuild
rm -rf .next
npm run dev
```

### Lỗi 4: CSS không load
```bash
# Xóa node_modules và cài lại
rm -rf node_modules
npm install
```

---

## 📱 Bước 7: Test trên mobile

### 7.1. Tìm IP của máy
```bash
# Mac/Linux
ipconfig getifaddr en0

# Windows
ipconfig
```

### 7.2. Truy cập từ mobile
```
http://YOUR_IP:3000
```

Ví dụ: `http://192.168.1.100:3000`

---

## 🚢 Bước 8: Deploy lên Production

### 8.1. Vercel (Khuyến nghị - Free)
```bash
npm install -g vercel
vercel
```

### 8.2. Netlify
```bash
npm run build
# Upload folder .next lên Netlify
```

### 8.3. Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

```bash
docker build -t diabetwin-ui .
docker run -p 3000:3000 diabetwin-ui
```

---

## 📊 Checklist hoàn thành

- [ ] Node.js đã cài (>= v18)
- [ ] Đã copy tất cả files
- [ ] `npm install` thành công
- [ ] `npm run dev` chạy không lỗi
- [ ] Truy cập http://localhost:3000 thành công
- [ ] Form hiển thị đầy đủ 8 trường
- [ ] Click "Phân tích" hiển thị kết quả
- [ ] Biểu đồ render chính xác
- [ ] Responsive trên mobile
- [ ] (Optional) Đã tích hợp backend thực

---

## 🆘 Cần hỗ trợ?

Nếu gặp vấn đề, vui lòng:
1. Đọc lại hướng dẫn cẩn thận
2. Check console log (F12 trên browser)
3. Check terminal log
4. Google error message
5. Tạo issue trên GitHub

---

## 🎉 Chúc mừng!

Bạn đã cài đặt thành công DiabeTwin UI! 🚀

**Các bước tiếp theo:**
- Tích hợp backend ML model thực
- Thêm authentication
- Deploy lên production
- Thu thập feedback từ người dùng
- Cải thiện UX dựa trên dữ liệu thực tế

---

**Phát triển bởi Claude AI** 🤖  
**Version**: 1.0.0  
**Last updated**: January 2026
