"use client";

import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { EnhancedResultsDisplay } from "@/components/EnhancedResultsDisplay";
import { predictHome } from "@/lib/api";

// Types
interface UserFormData {
  sex: number;
  age: number;
  bmi: number;
  genhlth: number;
  highBP: number;
  highChol: number;
  cholCheck: number;
  stroke: number;
  heartDis: number;
  diffWalk: number;
  smoker: number;
  physAct: number;
  fruits: number;
  veggies: number;
  hvyAlcohol: number;
  mentHlth: number;
  physHlth: number;
}

interface PredictionResults {
  probability: number;
  riskLevel: "low" | "medium" | "high";
  impacts: Array<{ feature: string; impact: number }>;
  insights: {
    topRisks: string[];
    protectiveFactors: string[];
    recommendations: string[];
  };
}

export default function UserPredictionApp() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<UserFormData>({
    sex: 1,
    age: 5,
    bmi: 22,
    genhlth: 3,
    highBP: 0,
    highChol: 0,
    cholCheck: 1,
    stroke: 0,
    heartDis: 0,
    diffWalk: 0,
    smoker: 0,
    physAct: 1,
    fruits: 1,
    veggies: 1,
    hvyAlcohol: 0,
    mentHlth: 0,
    physHlth: 0,
  });
  const [results, setResults] = useState<PredictionResults | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const updateField = (field: keyof UserFormData, value: number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    setIsAnalyzing(true);
    try {
      // Map form data to backend API format
      const apiData = {
        HighBP: formData.highBP,
        HighChol: formData.highChol,
        CholCheck: formData.cholCheck,
        BMI: formData.bmi,
        Smoker: formData.smoker,
        Stroke: formData.stroke,
        HeartDiseaseorAttack: formData.heartDis,
        PhysActivity: formData.physAct,
        Fruits: formData.fruits,
        Veggies: formData.veggies,
        HvyAlcoholConsump: formData.hvyAlcohol,
        GenHlth: formData.genhlth,
        MentHlth: formData.mentHlth,
        PhysHlth: formData.physHlth,
        DiffWalk: formData.diffWalk,
        Sex: formData.sex,
        Age: formData.age,
      };

      // Call backend API
      const response = await predictHome(apiData);
      
      // Parse SHAP impacts from backend
      const impacts = response.impacts || [];
      
      // Convert probability to decimal (backend returns percentage)
      const probability = response.probability / 100;
      
      const results: PredictionResults = {
        probability: probability,
        riskLevel: probability > 0.7 ? "high" : probability > 0.4 ? "medium" : "low",
        impacts: impacts,
        insights: {
          topRisks: impacts
            .filter(i => i.impact > 0)
            .slice(0, 3)
            .map(i => `${i.feature}: +${i.impact.toFixed(1)}%`),
          protectiveFactors: impacts
            .filter(i => i.impact < 0)
            .slice(0, 3)
            .map(i => `${i.feature}: ${i.impact.toFixed(1)}%`),
          recommendations: generateRecommendations(response.ai_advice)
        }
      };
      
      setResults(results);
      setStep(4);
    } catch (error) {
      console.error('Prediction error:', error);
      alert('Lỗi phân tích. Vui lòng kiểm tra kết nối backend.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const generateRecommendations = (aiAdvice: string): string[] => {
    // Parse AI advice to extract recommendations
    const lines = aiAdvice.split('\n').filter(line => line.trim().length > 0);
    return lines.slice(0, 5);
  };

  const generateInsights = (data: UserFormData) => {
    const topRisks = [];
    const protective = [];
    const recommendations = [];

    if (data.highBP === 1) {
      topRisks.push("Huyết áp cao");
      recommendations.push("Kiểm soát huyết áp thường xuyên và theo dõi với bác sĩ");
    }
    if (data.highChol === 1) {
      topRisks.push("Cholesterol cao");
      recommendations.push("Giảm chất béo bão hòa trong chế độ ăn");
    }
    if (data.bmi > 30) {
      topRisks.push("BMI cao (thừa cân/béo phì)");
      recommendations.push("Lập kế hoạch giảm cân lành mạnh với chuyên gia dinh dưỡng");
    }
    if (data.physAct === 1) protective.push("Có hoạt động thể chất đều đặn");
    if (data.fruits === 1) protective.push("Ăn trái cây hàng ngày");
    if (data.veggies === 1) protective.push("Ăn rau xanh hàng ngày");
    
    if (topRisks.length === 0) {
      recommendations.push("Duy trì lối sống lành mạnh hiện tại");
    }

    return { topRisks, protectiveFactors: protective, recommendations };
  };

  if (results) {
    return <UserResultsView results={results} onReset={() => { setResults(null); setStep(1); }} />;
  }

  if (isAnalyzing) {
    return <AnalyzingScreen />;
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <div className="max-w-4xl mx-auto py-12 px-4">
        {/* Progress Bar */}
        <ProgressBar currentStep={step} totalSteps={3} />

        {/* Step Content */}
        <div className="mt-8">
          {step === 1 && <Step1Personal formData={formData} updateField={updateField} onNext={() => setStep(2)} />}
          {step === 2 && <Step2Medical formData={formData} updateField={updateField} onNext={() => setStep(3)} onBack={() => setStep(1)} />}
          {step === 3 && <Step3Lifestyle formData={formData} updateField={updateField} onBack={() => setStep(2)} onSubmit={handleSubmit} />}
        </div>
      </div>
    </div>
  );
}

// Progress Bar Component
function ProgressBar({ currentStep, totalSteps }: { currentStep: number; totalSteps: number }) {
  const progress = (currentStep / totalSteps) * 100;
  
  return (
    <div className="relative">
      <div className="flex justify-between mb-2">
        {[1, 2, 3].map(step => (
          <div key={step} className="flex flex-col items-center">
            <div className={`w-8 sm:w-10 lg:w-12 h-8 sm:h-10 lg:h-12 rounded-full flex items-center justify-center font-bold text-sm sm:text-base lg:text-lg transition-all duration-300 ${
              currentStep >= step 
                ? 'bg-blue-600 text-white shadow-md' 
                : 'bg-gray-200 text-gray-400'
            }`}>
              {step}
            </div>
            <span className={`text-xs mt-1 sm:mt-2 font-medium ${currentStep >= step ? 'text-blue-600' : 'text-gray-400'}`}>
              {step === 1 ? 'Cá nhân' : step === 2 ? 'Y tế' : 'Lối sống'}
            </span>
          </div>
        ))}
      </div>
      <div className="h-1.5 sm:h-2 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className="h-full bg-blue-600 transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

// Step 1: Personal Info
function Step1Personal({ formData, updateField, onNext }: any) {
  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 sm:p-6 lg:p-8 animate-fadeIn">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
        👤 Thông tin cá nhân
      </h2>
      
      <div className="space-y-4 sm:space-y-6">
        {/* Gender */}
        <div className="group">
          <label className="block text-sm font-semibold text-gray-700 mb-2 sm:mb-3">Giới tính</label>
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {[
              { value: 0, label: '👩 Nữ' },
              { value: 1, label: '👨 Nam' }
            ].map(option => (
              <button
                key={option.value}
                onClick={() => updateField('sex', option.value)}
                className={`p-3 sm:p-4 rounded-lg font-semibold text-sm sm:text-base lg:text-lg transition-colors duration-150 ${
                  formData.sex === option.value
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Age Slider */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2 sm:mb-3">
            Nhóm tuổi: <span className="text-blue-600 text-lg sm:text-xl">{
              formData.age === 1 ? "18-24" :
              formData.age === 2 ? "25-29" :
              formData.age === 3 ? "30-34" :
              formData.age === 4 ? "35-39" :
              formData.age === 5 ? "40-44" :
              formData.age === 6 ? "45-49" :
              formData.age === 7 ? "50-54" :
              formData.age === 8 ? "55-59" :
              formData.age === 9 ? "60-64" :
              formData.age === 10 ? "65-69" :
              formData.age === 11 ? "70-74" :
              formData.age === 12 ? "75-79" : "80+"
            }</span>
          </label>
          <input
            type="range"
            min="1"
            max="13"
            value={formData.age}
            onChange={(e) => updateField('age', parseInt(e.target.value))}
            className="w-full h-2 sm:h-3 bg-gradient-to-r from-green-400 via-yellow-400 to-red-400 rounded-lg appearance-none cursor-pointer slider"
          />
        </div>

        {/* BMI */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2 sm:mb-3">
            Chỉ số BMI: <span className="text-blue-600 text-lg sm:text-xl">{formData.bmi.toFixed(1)}</span>
          </label>
          <input
            type="range"
            min="15"
            max="50"
            step="0.5"
            value={formData.bmi}
            onChange={(e) => updateField('bmi', parseFloat(e.target.value))}
            className="w-full h-2 sm:h-3 bg-gradient-to-r from-green-400 via-yellow-400 to-red-400 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span className="hidden sm:inline">Gầy</span>
            <span>Bình thường</span>
            <span className="hidden sm:inline">Thừa cân</span>
            <span>Béo phì</span>
          </div>
        </div>

        {/* Health Status */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2 sm:mb-3">Sức khỏe tổng quát</label>
          <div className="grid grid-cols-5 gap-1 sm:gap-2">
            {[1, 2, 3, 4, 5].map(level => (
              <button
                key={level}
                onClick={() => updateField('genhlth', level)}
                className={`p-2 sm:p-3 rounded-lg font-medium text-xs sm:text-sm transition-colors duration-150 ${
                  formData.genhlth === level
                    ? level === 1 ? 'bg-green-600 text-white shadow-md' :
                      level === 2 ? 'bg-green-500 text-white shadow-md' :
                      level === 3 ? 'bg-yellow-500 text-white shadow-md' :
                      level === 4 ? 'bg-orange-600 text-white shadow-md' :
                      'bg-red-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <span className="text-lg sm:text-xl">{level === 1 ? '😊' : level === 2 ? '🙂' : level === 3 ? '😐' : level === 4 ? '😟' : '😞'}</span>
              </button>
            ))}
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span className="hidden sm:inline">Rất tốt</span>
            <span>Kém</span>
          </div>
        </div>
      </div>

      <button
        onClick={onNext}
        className="w-full mt-6 sm:mt-8 bg-blue-600 text-white py-3 sm:py-4 rounded-lg font-bold text-base sm:text-lg shadow-md hover:bg-blue-700 transition-colors min-h-[48px] sm:min-h-[56px]"
      >
        Tiếp theo →
      </button>
    </div>
  );
}

// Step 2: Medical History
function Step2Medical({ formData, updateField, onNext, onBack }: any) {
  const Toggle = ({ label, field, icon }: any) => (
    <div className="bg-gray-50 rounded-xl p-3 sm:p-4 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="text-xl sm:text-2xl">{icon}</span>
          <span className="font-medium text-gray-700 text-sm sm:text-base">{label}</span>
        </div>
        <button
          onClick={() => updateField(field, formData[field] === 1 ? 0 : 1)}
          className={`relative w-14 sm:w-16 h-6 sm:h-8 rounded-full transition-colors duration-150 ${
            formData[field] === 1 ? 'bg-red-600' : 'bg-gray-300'
          }`}
        >
          <div className={`absolute top-0.5 sm:top-1 w-5 sm:w-6 h-5 sm:h-6 bg-white rounded-full shadow-md transition-transform duration-150 ${
            formData[field] === 1 ? 'translate-x-7 sm:translate-x-9' : 'translate-x-0.5 sm:translate-x-1'
          }`} />
        </button>
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 sm:p-6 lg:p-8 animate-fadeIn">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
        🏥 Tiền sử y tế
      </h2>
      
      <div className="space-y-3 sm:space-y-4">
        <Toggle label="Huyết áp cao" field="highBP" icon="❤️" />
        <Toggle label="Cholesterol cao" field="highChol" icon="🧪" />
        <Toggle label="Đã kiểm tra Cholesterol (5 năm qua)" field="cholCheck" icon="📋" />
        <Toggle label="Từng bị đột quỵ" field="stroke" icon="🧠" />
        <Toggle label="Bệnh tim mạch" field="heartDis" icon="💔" />
        <Toggle label="Khó khăn khi đi bộ/leo cầu thang" field="diffWalk" icon="🚶" />
      </div>

      <div className="flex gap-3 sm:gap-4 mt-6 sm:mt-8">
        <button
          onClick={onBack}
          className="flex-1 bg-gray-200 text-gray-700 py-3 sm:py-4 rounded-lg font-bold text-base sm:text-lg hover:bg-gray-300 transition-colors min-h-[48px] sm:min-h-[56px]"
        >
          ← Quay lại
        </button>
        <button
          onClick={onNext}
          className="flex-1 bg-blue-600 text-white py-3 sm:py-4 rounded-lg font-bold text-base sm:text-lg shadow-md hover:bg-blue-700 transition-colors min-h-[48px] sm:min-h-[56px]"
        >
          Tiếp theo →
        </button>
      </div>
    </div>
  );
}

// Step 3: Lifestyle
function Step3Lifestyle({ formData, updateField, onBack, onSubmit }: any) {
  const Toggle = ({ label, field, icon, goodValue = 1 }: any) => (
    <div className="bg-gray-50 rounded-xl p-3 sm:p-4 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="text-xl sm:text-2xl">{icon}</span>
          <span className="font-medium text-gray-700 text-sm sm:text-base">{label}</span>
        </div>
        <button
          onClick={() => updateField(field, formData[field] === goodValue ? (goodValue === 1 ? 0 : 1) : goodValue)}
          className={`relative w-14 sm:w-16 h-6 sm:h-8 rounded-full transition-colors duration-150 ${
            formData[field] === goodValue 
              ? 'bg-green-600' 
              : 'bg-red-600'
          }`}
        >
          <div className={`absolute top-0.5 sm:top-1 w-5 sm:w-6 h-5 sm:h-6 bg-white rounded-full shadow-md transition-transform duration-150 ${
            formData[field] === goodValue ? 'translate-x-7 sm:translate-x-9' : 'translate-x-0.5 sm:translate-x-1'
          }`} />
        </button>
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 sm:p-6 lg:p-8 animate-fadeIn">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
        🥗 Lối sống & Thói quen
      </h2>
      
      <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
        <Toggle label="Hút thuốc (>100 điếu trong đời)" field="smoker" icon="🚬" goodValue={0} />
        <Toggle label="Vận động thể chất (30 ngày qua)" field="physAct" icon="🏃" />
        <Toggle label="Ăn trái cây hàng ngày" field="fruits" icon="🍎" />
        <Toggle label="Ăn rau xanh hàng ngày" field="veggies" icon="🥬" />
        <Toggle label="Uống nhiều rượu bia" field="hvyAlcohol" icon="🍺" goodValue={0} />
      </div>

      <div className="space-y-4 mb-6 sm:mb-8">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Số ngày sức khỏe tinh thần kém (30 ngày qua): <span className="text-blue-600 text-sm sm:text-base">{formData.mentHlth}</span>
          </label>
          <input
            type="range"
            min="0"
            max="30"
            value={formData.mentHlth}
            onChange={(e) => updateField('mentHlth', parseInt(e.target.value))}
            className="w-full h-2 sm:h-3"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Số ngày sức khỏe thể chất kém (30 ngày qua): <span className="text-blue-600 text-sm sm:text-base">{formData.physHlth}</span>
          </label>
          <input
            type="range"
            min="0"
            max="30"
            value={formData.physHlth}
            onChange={(e) => updateField('physHlth', parseInt(e.target.value))}
            className="w-full h-2 sm:h-3"
          />
        </div>
      </div>

      <div className="flex gap-3 sm:gap-4">
        <button
          onClick={onBack}
          className="flex-1 bg-gray-200 text-gray-700 py-3 sm:py-4 rounded-lg font-bold text-base sm:text-lg hover:bg-gray-300 transition-colors min-h-[48px] sm:min-h-[56px]"
        >
          ← Quay lại
        </button>
        <button
          onClick={onSubmit}
          className="flex-1 bg-blue-600 text-white py-3 sm:py-4 rounded-lg font-bold text-base sm:text-lg shadow-md hover:bg-blue-700 transition-colors min-h-[48px] sm:min-h-[56px]"
        >
          🔍 Phân tích nguy cơ
        </button>
      </div>
    </div>
  );
}

// Analyzing Screen
function AnalyzingScreen() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <div className="relative w-32 h-32 mx-auto mb-8">
          <div className="absolute inset-0 bg-blue-600 rounded-full animate-ping opacity-30" />
          <div className="absolute inset-0 border-4 border-blue-600 rounded-full animate-spin" style={{ borderTopColor: 'transparent' }} />
          <div className="absolute inset-4 bg-white rounded-full flex items-center justify-center">
            <span className="text-4xl">🧬</span>
          </div>
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Đang phân tích dữ liệu...</h3>
        <p className="text-gray-600">AI đang xử lý thông tin của bạn</p>
      </div>
    </div>
  );
}

// User Results View - wrapper that adapts the enhanced display for user mode
function UserResultsView({ results, onReset }: { results: PredictionResults; onReset: () => void }) {
  // Transform internal results format to enhanced display format
  const transformedResults = {
    probability: results.probability,
    conclusion: results.riskLevel === "high" ? "DƯƠNG TÍNH" : "ÂM TÍNH",
    riskLevel: results.riskLevel,
    impacts: results.impacts,
    aiAdvice: results.insights.recommendations.join('\n'),
  };

  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <Navigation />
      <div className="max-w-7xl mx-auto">
        <EnhancedResultsDisplay 
          results={transformedResults}
          onReset={onReset}
          isDoctorMode={false}
        />
      </div>
    </div>
  );
}
