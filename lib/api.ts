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
    const response = await fetch(`${API_BASE_URL}/api/predict/clinical`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error predicting clinical:', error);
    throw error;
  }
}

export async function predictHome(data: HomeInput): Promise<PredictionResult> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/predict/home`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error predicting home:', error);
    throw error;
  }
}
