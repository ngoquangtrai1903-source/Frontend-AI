# Backend Setup Guide - DiabeTwin

## Overview
This guide explains how to connect the Next.js frontend to the FastAPI backend for diabetes prediction.

## Backend Requirements

Your backend (FastAPI) provides two main endpoints:
- `POST /api/predict/clinical` - For doctor/clinical predictions
- `POST /api/predict/home` - For home/user predictions

## Frontend Configuration

### 1. Environment Variables

Create/update `.env.local` in the project root:

```bash
# Backend API URL
NEXT_PUBLIC_API_URL=http://localhost:8000
```

**Note:** Use `NEXT_PUBLIC_` prefix to make the variable accessible in the browser.

### 2. API Service (`/lib/api.ts`)

The API service handles all communication with the backend:

```typescript
// Available functions:
- predictClinical(data: ClinicalInput): Promise<PredictionResult>
- predictHome(data: HomeInput): Promise<PredictionResult>
```

## API Schemas

### Clinical Input (Doctor Mode)
```typescript
{
  gender: string;           // "Male" | "Female" | "Other"
  age: number;              // 0-100
  smoking_history: string;  // "never" | "former" | "current" | "ever"
  hypertension: number;     // 0 | 1
  heart_disease: number;    // 0 | 1
  bmi: number;              // 10-50
  hba1c: number;            // 3-15
  glucose: number;          // 50-400
}
```

### Home Input (User Mode)
```typescript
{
  HighBP: number;                // 0 | 1
  HighChol: number;              // 0 | 1
  CholCheck: number;             // 0 | 1
  BMI: number;                   // 10-50
  Smoker: number;                // 0 | 1
  Stroke: number;                // 0 | 1
  HeartDiseaseorAttack: number;  // 0 | 1
  PhysActivity: number;          // 0 | 1
  Fruits: number;                // 0 | 1
  Veggies: number;               // 0 | 1
  HvyAlcoholConsump: number;     // 0 | 1
  GenHlth: number;               // 1-5
  MentHlth: number;              // 0-30
  PhysHlth: number;              // 0-30
  DiffWalk: number;              // 0 | 1
  Sex: number;                   // 0 | 1
  Age: number;                   // 1-13 (age group)
}
```

### Prediction Result
```typescript
{
  probability: number;  // 0-100 (percentage)
  status: string;       // "DƯƠNG TÍNH" | "ÂM TÍNH" | "NGUY CƠ CAO" | "AN TOÀN"
  risk_level?: string;  // "🔴" | "🟡" | "🟢"
  impacts: Array<{
    feature: string;
    impact: number;     // SHAP value in percentage
  }>;
  ai_advice: string;    // AI recommendations from Gemini
}
```

## Running the System

### 1. Start Backend
```bash
# Navigate to backend directory
cd D:\laptrinhpython\Final

# Run FastAPI server
python -m uvicorn clinical-input:app --reload --host 0.0.0.0 --port 8000
```

Backend will start at: `http://localhost:8000`

### 2. Start Frontend
```bash
# In the project root
npm run dev
```

Frontend will start at: `http://localhost:3000`

### 3. Test Connection
Visit the pages:
- **Home:** http://localhost:3000
- **Doctor Mode:** http://localhost:3000/doctor
- **User Mode:** http://localhost:3000/user-prediction
- **About:** http://localhost:3000/about

## Troubleshooting

### 404 Errors
**Issue:** Pages not found after navigation
**Solution:** 
- Ensure all page.tsx files exist in correct routes
- Clear Next.js cache: `rm -rf .next/`
- Restart dev server

### API Connection Errors
**Issue:** "Lỗi phân tích. Vui lòng kiểm tra kết nối backend."
**Solution:**
1. Check backend is running: `curl http://localhost:8000/docs`
2. Verify `NEXT_PUBLIC_API_URL` in `.env.local`
3. Check CORS is enabled on backend (already configured)
4. Look at browser console for detailed error messages

### CORS Issues
**Issue:** "Access to XMLHttpRequest blocked by CORS policy"
**Solution:**
- Backend already has CORS enabled for all origins
- Ensure backend is running with correct CORS settings
- Try accessing backend directly to verify it's running

### Model Files Not Found
**Issue:** Backend shows "Lỗi tải model"
**Solution:**
- Verify paths in backend:
  - `D:\laptrinhpython\Final\diabetes_model.pkl`
  - `D:\laptrinhpython\Final\scaler_diabetes.pkl`
  - `D:\laptrinhpython\Final\label_encoders.pkl`
  - `D:\laptrinhpython\Final\x_train_sample.pkl`
  - `D:\laptrinhpython\Final\diabetes_model_home.pkl`
  - `D:\laptrinhpython\Final\x_train_sample_home.pkl`

## Production Deployment

### Update Backend URL
For production, update `.env.local`:
```bash
NEXT_PUBLIC_API_URL=https://your-backend-domain.com
```

### CORS for Production
Update backend CORS settings:
```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://your-frontend-domain.com"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

## Integration Points

### Doctor Page (`/app/doctor/doctor-page.tsx`)
- Uses `predictClinical()` from `/lib/api.ts`
- Converts form data to Clinical Input format
- Displays results in `ResultsDisplay` component

### User Prediction Page (`/app/user-prediction/UserPredictionApp.tsx`)
- Uses `predictHome()` from `/lib/api.ts`
- Converts form data to Home Input format
- Shows step-by-step analysis

## API Response Handling

All responses include:
1. **Probability**: Risk percentage from ML model
2. **Status**: Categorical result (positive/negative/safe/high-risk)
3. **Impacts**: SHAP values showing feature importance
4. **AI Advice**: Personalized recommendations from Gemini AI

The frontend transforms these responses into user-friendly visualizations.
