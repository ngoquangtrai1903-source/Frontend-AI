# DiabeTwin - Quick Start Guide

## Prerequisites
- Node.js 16+ 
- Python 3.8+ with FastAPI
- Your backend running with trained models

## Setup in 3 Steps

### Step 1: Configure Backend URL
Edit `.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### Step 2: Start Backend
```bash
cd D:\laptrinhpython\Final
python -m uvicorn clinical-input:app --reload --host 0.0.0.0 --port 8000
```
✅ Backend running at: http://localhost:8000

### Step 3: Start Frontend
```bash
npm install  # if first time
npm run dev
```
✅ Frontend running at: http://localhost:3000

## Available Routes

| Route | Purpose | Mode |
|-------|---------|------|
| / | Home page | Public |
| /about | About & Research | Public |
| /doctor | Professional diagnosis | Clinical |
| /user-prediction | Self-assessment | Home |

## Testing API Connection

### Option 1: Test in Browser
1. Go to http://localhost:3000/doctor
2. Fill in form and submit
3. Check browser console (F12) for errors

### Option 2: Test with cURL
```bash
# Clinical prediction
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

# Home prediction
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
```

### Option 3: API Documentation
Visit: http://localhost:8000/docs (FastAPI Swagger UI)

## Common Issues & Fixes

### 404 on Page Navigation
```bash
# Clear Next.js cache
rm -rf .next/
npm run dev
```

### Backend Connection Failed
```bash
# Check backend is running
curl http://localhost:8000/docs

# Check .env.local has correct URL
cat .env.local

# View server logs for errors
# Check that models exist at paths in clinical-input.py
```

### CORS Error
- Backend CORS is already configured for all origins
- Check backend console for startup errors
- Verify backend is fully loaded (check /docs endpoint)

## File Structure

```
DiabeTwin/
├── app/
│   ├── page.tsx              # Home page
│   ├── about/page.tsx        # About page
│   ├── doctor/page.tsx       # Doctor entry
│   ├── doctor/doctor-page.tsx # Doctor implementation
│   ├── user-prediction/page.tsx
│   ├── user-prediction/UserPredictionApp.tsx
│   └── layout.tsx
├── components/               # UI components
├── lib/
│   └── api.ts               # Backend API client
├── .env.local               # Configuration
└── docs/
    └── BACKEND_SETUP.md     # Full setup guide
```

## Next Steps

1. **Customize Visualizations**
   - Edit `/components/ResultsVisualization.tsx`
   - Update colors and chart types

2. **Adjust API Mappings**
   - Modify `/lib/api.ts` for different field names
   - Update form mappings in doctor/user pages

3. **Deploy**
   - Update `NEXT_PUBLIC_API_URL` to production backend
   - Deploy to Vercel or your hosting provider

## Support

For detailed setup, see `/docs/BACKEND_SETUP.md`
