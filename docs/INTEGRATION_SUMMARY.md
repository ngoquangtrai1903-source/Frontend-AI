# Backend Integration Summary

## What Has Been Done

### 1. API Service Layer (`/lib/api.ts`)
✅ Created centralized API client for backend communication
- `predictClinical()` - For doctor/clinical predictions
- `predictHome()` - For home/user predictions
- Proper error handling and type safety
- Configurable API base URL via environment variables

### 2. Environment Configuration
✅ Created `.env.local` for configuration
```
NEXT_PUBLIC_API_URL=http://localhost:8000
```
This allows frontend to connect to your backend at port 8000

### 3. Frontend Integration

#### Doctor Page (`/app/doctor/doctor-page.tsx`)
✅ Integrated with clinical prediction API
- Maps form data to backend `ClinicalInput` schema
- Handles response and transforms to UI format
- Fallback to mock data if API fails
- Error notifications for users

#### User Prediction Page (`/app/user-prediction/UserPredictionApp.tsx`)
✅ Integrated with home prediction API
- Maps form data to backend `HomeInput` schema
- Parses SHAP impacts from backend
- Extracts recommendations from AI advice
- Real-time backend communication

### 4. Page Structure
✅ All routes properly configured:
- `/` → Home page
- `/about` → About & Research
- `/doctor` → Professional diagnosis
- `/user-prediction` → Self-assessment

### 5. Navigation
✅ Updated Navigation component with hydration fixes
- Prevents hydration mismatch errors
- Proper client-side rendering
- All navigation links work correctly

## How to Use

### Start Backend
```bash
cd D:\laptrinhpython\Final
python -m uvicorn clinical-input:app --reload --host 0.0.0.0 --port 8000
```

### Start Frontend
```bash
npm run dev
```

### Test Predictions
1. **Doctor Mode**: http://localhost:3000/doctor
   - Fill clinical form
   - Submit to get SHAP analysis + AI advice
   
2. **User Mode**: http://localhost:3000/user-prediction
   - Fill home health form
   - Get risk assessment with recommendations

## Data Flow

### Clinical Prediction Flow
```
PatientForm → handleAnalyze() → predictClinical() 
  ↓
Backend /api/predict/clinical 
  ↓
Response: {probability, status, impacts, ai_advice}
  ↓
Transform & Display in ResultsDisplay
```

### Home Prediction Flow
```
UserPredictionApp (3 steps) → handleSubmit() → predictHome()
  ↓
Backend /api/predict/home
  ↓
Response: {probability, status, impacts, ai_advice}
  ↓
Display in Results View
```

## Backend API Requirements

Your FastAPI backend must provide:

1. **POST /api/predict/clinical**
   - Input: ClinicalInput schema
   - Output: PredictionResult with SHAP impacts
   - Uses model at: `D:\laptrinhpython\Final\diabetes_model.pkl`

2. **POST /api/predict/home**
   - Input: HomeInput schema
   - Output: PredictionResult with SHAP impacts
   - Uses model at: `D:\laptrinhpython\Final\diabetes_model_home.pkl`

3. **CORS Enabled**
   - Already configured in your backend
   - Allows requests from any origin

## File Changes Summary

### New Files Created
- `/lib/api.ts` - API client service
- `/.env.local` - Environment configuration
- `/docs/BACKEND_SETUP.md` - Setup guide
- `/QUICK_START.md` - Quick reference
- `/docs/INTEGRATION_SUMMARY.md` - This file

### Files Modified
- `/app/doctor/doctor-page.tsx` - Added backend API integration
- `/app/user-prediction/UserPredictionApp.tsx` - Added backend API integration
- `/components/Navigation.tsx` - Hydration fixes (no functional changes)

### Files Verified
- `/app/page.tsx` - Home page (working)
- `/app/about/page.tsx` - About page (working)
- `/app/user-prediction/page.tsx` - Route wrapper (working)
- `/app/doctor/page.tsx` - Route wrapper (working)

## Troubleshooting

### Pages Show 404
**Cause**: Next.js build cache issue
**Solution**:
```bash
rm -rf .next/
npm run dev
```

### Backend Connection Errors
**Cause**: Backend not running or wrong URL
**Solution**:
1. Verify backend: `curl http://localhost:8000/docs`
2. Check `.env.local`: `NEXT_PUBLIC_API_URL=http://localhost:8000`
3. Check backend console for errors
4. Verify model files exist

### Model Loading Errors
**Cause**: Model files not found at specified paths
**Solution**:
- Ensure all files exist in `D:\laptrinhpython\Final\`:
  - `diabetes_model.pkl`
  - `diabetes_model_home.pkl`
  - `scaler_diabetes.pkl`
  - `label_encoders.pkl`
  - `x_train_sample.pkl`
  - `x_train_sample_home.pkl`

### CORS Errors
**Cause**: Browser blocking cross-origin request
**Solution**:
- Your backend CORS is configured correctly
- Try accessing backend directly: `http://localhost:8000/docs`
- Check backend startup logs

## Testing Checklist

- [ ] Backend running at http://localhost:8000
- [ ] Frontend running at http://localhost:3000
- [ ] Can access http://localhost:3000 (Home page)
- [ ] Navigation links work (to /doctor, /user-prediction, /about)
- [ ] Can submit doctor form without errors
- [ ] Can see results with SHAP impacts
- [ ] Can submit user form and get results
- [ ] Console shows no API errors

## Next Steps

1. **Verify Backend Connection**
   - Run both services
   - Submit a form to test API

2. **Customize Response Handling**
   - Edit transform logic in doctor/user pages if needed
   - Adjust visualizations based on backend response

3. **Deploy**
   - Update `NEXT_PUBLIC_API_URL` to production backend
   - Deploy frontend to hosting provider

## Support Documentation

- `QUICK_START.md` - Quick reference guide
- `BACKEND_SETUP.md` - Detailed setup instructions
- `INTEGRATION_SUMMARY.md` - This file
- `VISUALIZATION_FRAMEWORK.md` - Chart components reference

All documentation is in `/docs/` folder.
