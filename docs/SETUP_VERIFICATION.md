# Setup Verification Checklist

Run through this checklist to verify your backend integration is working correctly.

## Step 1: Verify Backend Setup

### 1.1 Python Environment
```bash
# Check Python version
python --version
# Should be 3.8+

# Check FastAPI installed
python -c "import fastapi; print(fastapi.__version__)"
# Should print version number

# Check other dependencies
python -c "import pandas; import shap; import joblib"
# Should complete without errors
```

### 1.2 Model Files
```bash
# Navigate to backend directory
cd D:\laptrinhpython\Final

# List model files
dir *.pkl

# Should see:
# - diabetes_model.pkl
# - diabetes_model_home.pkl
# - scaler_diabetes.pkl
# - label_encoders.pkl
# - x_train_sample.pkl
# - x_train_sample_home.pkl
```

### 1.3 Start Backend
```bash
cd D:\laptrinhpython\Final
python -m uvicorn clinical-input:app --reload --host 0.0.0.0 --port 8000

# Expected output:
# INFO:     Uvicorn running on http://0.0.0.0:8000
# ✅ [Lifespan] Đã tải tất cả Models thành công!
```

### 1.4 Verify Backend Endpoint
```bash
# In another terminal, test backend
curl http://localhost:8000/docs

# Should return HTML page with Swagger UI
# If fails, backend is not running correctly
```

## Step 2: Verify Frontend Setup

### 2.1 Node.js Environment
```bash
# Check Node version
node --version
# Should be 16+ (preferably 18+)

# Check npm version
npm --version
# Should be 8+
```

### 2.2 Environment Configuration
```bash
# Check .env.local exists
ls .env.local
# or on Windows:
dir .env.local

# Verify content
cat .env.local
# Should show: NEXT_PUBLIC_API_URL=http://localhost:8000
```

### 2.3 Dependencies Installed
```bash
# Check node_modules exists
ls node_modules | head -10

# If empty, install:
npm install

# Should complete without errors
```

### 2.4 Start Frontend
```bash
npm run dev

# Expected output:
# > next dev
# - ready started server on 0.0.0.0:3000, url: http://localhost:3000
# - event compiled client and server successfully
```

### 2.5 Verify Frontend Loads
```bash
# Open browser and visit:
http://localhost:3000

# Should see:
# - DiabeTwin header
# - Navigation menu
# - Home page content
# - No errors in console
```

## Step 3: Verify Integration

### 3.1 Check API Service
```bash
# Open /lib/api.ts in editor
# Verify it has:
# - import { predictHome, predictClinical } from "@/lib/api"
# - API_BASE_URL using NEXT_PUBLIC_API_URL
# - Both predict functions defined
```

### 3.2 Test Doctor Page

**In Browser:**
1. Go to http://localhost:3000/doctor
2. Should see: "Professional Clinical Diagnosis"
3. Fill in the form:
   - Gender: Male
   - Age: 45
   - Smoking: Never
   - Hypertension: No
   - Heart Disease: No
   - BMI: 25
   - HbA1c: 5.8
   - Glucose: 100
4. Click "Phân tích"
5. Wait 2-3 seconds
6. Should see results with:
   - Risk probability
   - SHAP feature impacts
   - AI recommendations

**If it fails:**
- Open browser console (F12)
- Look for error message
- Check backend console for errors
- Verify NEXT_PUBLIC_API_URL in .env.local

### 3.3 Test User Prediction Page

**In Browser:**
1. Go to http://localhost:3000/user-prediction
2. Complete 3-step form:
   - Step 1: Personal info
   - Step 2: Medical history
   - Step 3: Lifestyle
3. Click "Phân tích nguy cơ"
4. Wait 2-3 seconds
5. Should see results with risk assessment

**If it fails:**
- Same debugging as doctor page
- Check browser console
- Verify backend is running

### 3.4 Test Navigation

**In Browser:**
1. Click "Home" → Should load home page
2. Click "Doctor" → Should load doctor page
3. Click "User Check" → Should load user prediction
4. Click "About" → Should load about page
5. No 404 errors should appear

## Step 4: Verify API Communication

### 4.1 Test Clinical API Directly
```bash
# Test with curl
curl -X POST http://localhost:8000/api/predict/clinical \
  -H "Content-Type: application/json" \
  -d '{
    "gender": "Male",
    "age": 45,
    "smoking_history": "never",
    "hypertension": 0,
    "heart_disease": 0,
    "bmi": 25,
    "hba1c": 5.8,
    "glucose": 100
  }'

# Should return JSON with:
# {
#   "probability": XX.X,
#   "status": "ÂM TÍNH" or "DƯƠNG TÍNH",
#   "risk_level": "🟢" etc,
#   "impacts": [...],
#   "ai_advice": "..."
# }
```

### 4.2 Test Home API Directly
```bash
# Test with curl
curl -X POST http://localhost:8000/api/predict/home \
  -H "Content-Type: application/json" \
  -d '{
    "HighBP": 0,
    "HighChol": 0,
    "CholCheck": 1,
    "BMI": 25,
    "Smoker": 0,
    "Stroke": 0,
    "HeartDiseaseorAttack": 0,
    "PhysActivity": 1,
    "Fruits": 1,
    "Veggies": 1,
    "HvyAlcoholConsump": 0,
    "GenHlth": 2,
    "MentHlth": 0,
    "PhysHlth": 0,
    "DiffWalk": 0,
    "Sex": 1,
    "Age": 5
  }'

# Should return JSON prediction result
```

### 4.3 Check Browser Network Tab
1. Open browser DevTools (F12)
2. Click "Network" tab
3. Submit a form on doctor/user page
4. Look for POST request to `/api/predict/clinical` or `/api/predict/home`
5. Should see Status: 200
6. Response should contain prediction data

## Step 5: Verify Documentation

### 5.1 Check All Docs Created
```bash
ls docs/
# Should show:
# - BACKEND_SETUP.md
# - INTEGRATION_SUMMARY.md
# - 404_FIXES.md
# - SETUP_VERIFICATION.md

ls *.md
# Should show:
# - QUICK_START.md
# - README_BACKEND_INTEGRATION.md
```

### 5.2 Verify Key Files
```bash
# Check API service
ls lib/api.ts
# Should exist

# Check env config
cat .env.local
# Should show: NEXT_PUBLIC_API_URL=http://localhost:8000

# Check page files
ls app/page.tsx
ls app/about/page.tsx
ls app/doctor/page.tsx
ls app/user-prediction/page.tsx
# All should exist
```

## Step 6: Final Verification

### 6.1 Complete Workflow Test
1. ✅ Backend running: http://localhost:8000/docs
2. ✅ Frontend running: http://localhost:3000
3. ✅ Can navigate between pages
4. ✅ Can fill and submit doctor form
5. ✅ Can fill and submit user form
6. ✅ Results display correctly
7. ✅ AI advice shows
8. ✅ SHAP impacts display
9. ✅ No errors in browser console
10. ✅ No errors in backend console

### 6.2 Browser Console Check
1. Open DevTools (F12)
2. Click Console tab
3. Reload page
4. Should see no red errors
5. May see yellow warnings (okay)
6. Submit form
7. Should see API response in Network tab

### 6.3 Backend Console Check
1. Look at backend terminal
2. Should see:
   - ✅ [Lifespan] Models loaded
   - POST /api/predict/clinical (successful requests)
   - POST /api/predict/home (successful requests)
3. No error messages

## Troubleshooting During Verification

### Backend Won't Start
```bash
# Issue: ModuleNotFoundError
# Solution: pip install fastapi uvicorn pandas shap joblib google-generativeai

# Issue: Model files not found
# Solution: Check D:\laptrinhpython\Final\ has all .pkl files

# Issue: Port 8000 in use
# Solution: python -m uvicorn clinical-input:app --port 8001
```

### Frontend Won't Start
```bash
# Issue: npm install fails
# Solution: npm cache clean --force && npm install

# Issue: Port 3000 in use
# Solution: npm run dev -- -p 3001

# Issue: .next error
# Solution: rm -rf .next/ && npm run dev
```

### API Connection Fails
```bash
# Issue: "Connection refused"
# Solution: Verify backend running at http://localhost:8000/docs

# Issue: "404 on /api/predict"
# Solution: Using old code; should use /api/predict/clinical or /api/predict/home

# Issue: "CORS error"
# Solution: Backend CORS is configured; check backend console
```

### Form Submission Hangs
```bash
# Issue: Form doesn't respond
# Debugging:
# 1. Open browser console (F12)
# 2. Look for error messages
# 3. Check Network tab for request
# 4. Click form submit again
# 5. Look at response in Network tab
```

## Success Indicators

When setup is complete, you should see:

✅ **Backend Console:**
```
Uvicorn running on http://0.0.0.0:8000
✅ [Lifespan] Đã tải tất cả Models thành công!
```

✅ **Frontend Console:**
```
- ready started server on 0.0.0.0:3000
- event compiled client and server successfully
```

✅ **Browser Shows:**
- Home page loads
- Navigation works
- Can fill forms
- Results display
- No console errors

✅ **Network Tab Shows:**
- POST requests to /api/predict/clinical
- POST requests to /api/predict/home
- Status 200 responses
- JSON data in responses

## Next Steps if Verified

Once all checks pass:
1. Test with different input values
2. Check edge cases (very high/low values)
3. Verify AI recommendations are sensible
4. Test error handling (submit with invalid data)
5. Monitor performance
6. Plan deployment

## Getting Help

If verification fails:
1. Check the specific error message
2. Look in `/docs/404_FIXES.md` for solutions
3. Check `/docs/BACKEND_SETUP.md` for setup help
4. Review browser console (F12) for errors
5. Review backend console output
6. Verify all files exist with `ls` commands
7. Ensure both services are running

---

**Last Updated**: January 31, 2026
**Backend**: FastAPI/Python
**Frontend**: Next.js/React
**Test Duration**: ~5-10 minutes
