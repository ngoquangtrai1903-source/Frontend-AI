# Backend Connection Debugging Guide

## Problem Found: Syntax Error in Backend

Your backend has a **critical syntax error** on the CORS middleware line:

### ❌ WRONG (Your Current Code)
```python
a   pp.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    ...
)
```

### ✅ CORRECT
```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    ...
)
```

The typo `a   pp` instead of `app` is preventing the CORS middleware from being registered properly.

---

## Solution: Step-by-Step Fix

### Step 1: Replace Your Backend File

Replace your `clinical-input.py` with the corrected version:

**Option A: Manual Fix**
- Open your `clinical-input.py`
- Find the line: `a   pp.add_middleware(`
- Replace with: `app.add_middleware(`
- Save the file

**Option B: Use Fixed Version**
- Download `/backend_fixed.py` from this project
- Replace your original file with it

### Step 2: Restart Backend
```bash
# Stop current backend (Ctrl+C)
# Then restart:
python -m uvicorn clinical-input:app --reload --host 0.0.0.0 --port 8000
```

You should see:
```
✅ [Lifespan] Đã tải tất cả Models thành công!
Uvicorn running on http://0.0.0.0:8000
```

### Step 3: Test Backend Connection

```bash
# Test health endpoint
curl http://localhost:8000/health

# Expected response:
# {"status":"healthy","models_loaded":true}
```

### Step 4: Check CORS Headers
```bash
# Test CORS with clinical endpoint
curl -X OPTIONS http://localhost:8000/api/predict/clinical \
  -H "Origin: http://localhost:3000" \
  -H "Access-Control-Request-Method: POST"

# Should see CORS headers in response
```

### Step 5: Restart Frontend & Test
```bash
# In new terminal
npm run dev

# Open http://localhost:3000/doctor
# Fill form and submit - should work now!
```

---

## Common Connection Issues & Solutions

### Issue 1: "Cannot reach backend"
**Cause**: Backend not running or wrong port
**Solution**:
```bash
# Check if backend is running
netstat -ano | findstr :8000

# If not running, start it:
python -m uvicorn clinical-input:app --reload --host 0.0.0.0 --port 8000
```

### Issue 2: "CORS Error: blocked by browser"
**Cause**: CORS middleware not registered due to syntax error
**Solution**: Apply the fix above

### Issue 3: "Models not loaded"
**Cause**: File paths don't exist
**Solution**: Verify all model files exist:
```bash
# Check if files exist
dir D:\laptrinhpython\Final\*.pkl
```

### Issue 4: "ModuleNotFoundError"
**Cause**: Missing dependencies
**Solution**:
```bash
pip install fastapi uvicorn pydantic joblib pandas shap google-genai
```

---

## Testing Workflow

### 1. Backend Health Check
```python
# Test endpoint is working
GET http://localhost:8000/health
```

### 2. Clinical Prediction Test
```bash
curl -X POST http://localhost:8000/api/predict/clinical \
  -H "Content-Type: application/json" \
  -d '{
    "gender": "Male",
    "age": 45,
    "smoking_history": "never",
    "hypertension": 1,
    "heart_disease": 0,
    "bmi": 25.5,
    "hba1c": 5.8,
    "glucose": 110
  }'
```

### 3. Home Prediction Test
```bash
curl -X POST http://localhost:8000/api/predict/home \
  -H "Content-Type: application/json" \
  -d '{
    "HighBP": 1,
    "HighChol": 1,
    "CholCheck": 1,
    "BMI": 25.5,
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
    "Age": 9
  }'
```

---

## Architecture Verification

### Backend Stack
- FastAPI (web framework)
- Pydantic (data validation)
- scikit-learn (ML models)
- SHAP (model explainability)
- Google Generative AI (advice generation)
- CORS Middleware (cross-origin requests)

### Frontend Connection
```
Next.js → fetch() → /lib/api.ts → http://localhost:8000
         ↓
    Store in state → Display in UI
```

---

## Quick Checklist

- [ ] Backend syntax error fixed (line with `app.add_middleware`)
- [ ] Backend running on port 8000
- [ ] Frontend running on port 3000
- [ ] Health check endpoint returns success
- [ ] Can submit form and get predictions
- [ ] No CORS errors in browser console
- [ ] Models are loading successfully

---

## Still Having Issues?

1. Check browser console (F12) for exact error messages
2. Check backend terminal for exceptions
3. Verify all file paths exist
4. Ensure ports 3000 and 8000 are not blocked by firewall
5. Try restarting both frontend and backend

