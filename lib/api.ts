// API Service for DiabeTwin Backend
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export interface ClinicalInput {
  gender: string;
  age: number;
  smoking_history: string;
  hypertension: number;
  heart_disease: number;
  bmi: number;
  hba1c: number;
  glucose: number;
}

export interface HomeInput {
  HighBP: number;
  HighChol: number;
  CholCheck: number;
  BMI: number;
  Smoker: number;
  Stroke: number;
  HeartDiseaseorAttack: number;
  PhysActivity: number;
  Fruits: number;
  Veggies: number;
  HvyAlcoholConsump: number;
  GenHlth: number;
  MentHlth: number;
  PhysHlth: number;
  DiffWalk: number;
  Sex: number;
  Age: number;
}

export interface PredictionResult {
  probability: number;
  status: string;
  risk_level?: string;
  impacts: Array<{
    feature: string;
    impact: number;
  }>;
  ai_advice: string;
}

export async function predictClinical(data: ClinicalInput): Promise<PredictionResult> {
  try {
    console.log('[API] Clinical prediction request:', { url: `${API_BASE_URL}/api/predict/clinical`, data });
    
    const response = await fetch(`${API_BASE_URL}/api/predict/clinical`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[API] Clinical prediction failed:', { status: response.status, error: errorText });
      throw new Error(`Backend Error: ${response.status} ${response.statusText}\n${errorText}`);
    }

    const result = await response.json();
    console.log('[API] Clinical prediction success:', result);
    return result;
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    console.error('[API] Clinical prediction error:', errorMsg);
    
    if (errorMsg.includes('fetch')) {
      throw new Error(`Cannot connect to backend at ${API_BASE_URL}. Make sure the backend is running on port 8000.`);
    }
    throw error;
  }
}

export async function predictHome(data: HomeInput): Promise<PredictionResult> {
  try {
    console.log('[API] Home prediction request:', { url: `${API_BASE_URL}/api/predict/home`, data });
    
    const response = await fetch(`${API_BASE_URL}/api/predict/home`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[API] Home prediction failed:', { status: response.status, error: errorText });
      throw new Error(`Backend Error: ${response.status} ${response.statusText}\n${errorText}`);
    }

    const result = await response.json();
    console.log('[API] Home prediction success:', result);
    return result;
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    console.error('[API] Home prediction error:', errorMsg);
    
    if (errorMsg.includes('fetch')) {
      throw new Error(`Cannot connect to backend at ${API_BASE_URL}. Make sure the backend is running on port 8000.`);
    }
    throw error;
  }
}

export async function healthCheck(): Promise<boolean> {
  try {
    console.log('[API] Health check:', API_BASE_URL);
    const response = await fetch(`${API_BASE_URL}/health`);
    const data = await response.json();
    console.log('[API] Health check result:', data);
    return data.status === 'healthy';
  } catch (error) {
    console.error('[API] Health check failed:', error);
    return false;
  }
}
