// API Service for DiabeTwin Backend
const API_BASE_URL =
  // process.env.NEXT_PUBLIC_NGROK_API_URL ||
  // process.env.NEXT_PUBLIC_API_URL ||
  'http://localhost:8000';

/**
 * Headers bắt buộc để bypass trang "Visit Site" của Ngrok.
 * Thiếu 2 headers này → Ngrok trả về HTML thay vì JSON → lỗi kết nối.
 */
const BASE_HEADERS: HeadersInit = {
  'Content-Type': 'application/json',
  'ngrok-skip-browser-warning': 'true',
  'User-Agent': 'DiabeTwin-Client/1.0',
};

// ─── Interfaces ───────────────────────────────────────────────────────────────

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

// ─── Helper ───────────────────────────────────────────────────────────────────

async function apiFetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;

  let response: Response;
  try {
    response = await fetch(url, {
      ...options,
      headers: { ...BASE_HEADERS, ...(options.headers ?? {}) },
    });
  } catch {
    throw new Error(
      `Không thể kết nối backend tại ${API_BASE_URL}. Kiểm tra Ngrok/Render đang chạy chưa.`
    );
  }

  if (!response.ok) {
    const errorText = await response.text().catch(() => '(no body)');
    throw new Error(`Backend lỗi ${response.status} ${response.statusText}\n${errorText}`);
  }

  return response.json() as Promise<T>;
}

// ─── Public API ───────────────────────────────────────────────────────────────

export async function predictClinical(data: ClinicalInput): Promise<PredictionResult> {
  console.log('[API] Clinical →', data);
  const result = await apiFetch<PredictionResult>('/api/predict/clinical', {
    method: 'POST',
    body: JSON.stringify(data),
  });
  console.log('[API] Clinical ←', result);
  return result;
}

export async function predictHome(data: HomeInput): Promise<PredictionResult> {
  console.log('[API] Home →', data);
  const result = await apiFetch<PredictionResult>('/api/predict/home', {
    method: 'POST',
    body: JSON.stringify(data),
  });
  console.log('[API] Home ←', result);
  return result;
}

export async function healthCheck(): Promise<boolean> {
  try {
    console.log('[API] Health check →', API_BASE_URL);
    const data = await apiFetch<{ status: string }>('/health');
    console.log('[API] Health check ←', data);
    return data.status === 'healthy';
  } catch (error) {
    console.error('[API] Health check failed:', error);
    return false;
  }
}