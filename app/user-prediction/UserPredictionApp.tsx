"use client";

import { useState } from "react";
import { Navigation } from "@/components/Navigation";

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

  const ageLabels: { [key: number]: string } = {
    1: "18-24", 2: "25-29", 3: "30-34", 4: "35-39", 5: "40-44",
    6: "45-49", 7: "50-54", 8: "55-59", 9: "60-64", 10: "65-69",
    11: "70-74", 12: "75-79", 13: "80+"
  };

  const healthLabels: { [key: number]: string } = {
    1: "Rất tốt", 2: "Tốt", 3: "Khá", 4: "Trung bình", 5: "Kém"
  };

  const updateField = (field: keyof UserFormData, value: number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    setIsAnalyzing(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    // Mock calculation
    const mockResults: PredictionResults = {
      probability: calculateRisk(formData),
      riskLevel: getRiskLevel(calculateRisk(formData)),
      impacts: generateImpacts(formData),
      insights: generateInsights(formData)
    };
    
    setResults(mockResults);
    setIsAnalyzing(false);
    setStep(4);
  };

  const calculateRisk = (data: UserFormData): number => {
    let risk = 0.2;
    if (data.highBP === 1) risk += 0.15;
    if (data.highChol === 1) risk += 0.12;
    if (data.bmi > 30) risk += 0.1;
    if (data.age > 8) risk += 0.08;
    if (data.smoker === 1) risk += 0.1;
    if (data.heartDis === 1) risk += 0.12;
    if (data.genhlth >= 4) risk += 0.08;
    if (data.physAct === 0) risk += 0.05;
    return Math.min(risk, 0.95);
  };

  const getRiskLevel = (prob: number): "low" | "medium" | "high" => {
    if (prob > 0.7) return "high";
    if (prob > 0.4) return "medium";
    return "low";
  };

  const generateImpacts = (data: UserFormData) => {
    const impacts = [
      { feature: "Huyết áp cao", impact: data.highBP === 1 ? 15 : -2 },
      { feature: "Cholesterol cao", impact: data.highChol === 1 ? 12 : -1.5 },
      { feature: "Chỉ số BMI", impact: data.bmi > 30 ? 10 : data.bmi < 25 ? -3 : 2 },
      { feature: "Nhóm tuổi", impact: data.age > 8 ? 8 : -1 },
      { feature: "Hút thuốc", impact: data.smoker === 1 ? 10 : -2 },
      { feature: "Bệnh tim", impact: data.heartDis === 1 ? 12 : -1 },
      { feature: "Sức khỏe tổng quát", impact: data.genhlth >= 4 ? 8 : data.genhlth <= 2 ? -4 : 1 },
      { feature: "Vận động thể chất", impact: data.physAct === 1 ? -5 : 5 },
      { feature: "Ăn trái cây", impact: data.fruits === 1 ? -2 : 1 },
      { feature: "Ăn rau xanh", impact: data.veggies === 1 ? -2 : 1 },
    ];
    return impacts.sort((a, b) => Math.abs(b.impact) - Math.abs(a.impact));
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
    return <ResultsView results={results} onReset={() => { setResults(null); setStep(1); }} />;
  }

  if (isAnalyzing) {
    return <AnalyzingScreen />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-pink-50 to-white">
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
            <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-500 ${
              currentStep >= step 
                ? 'bg-gradient-to-br from-purple-500 to-fuchsia-500 text-white scale-110 shadow-lg' 
                : 'bg-gray-200 text-gray-400'
            }`}>
              {step}
            </div>
            <span className={`text-xs mt-2 font-medium ${currentStep >= step ? 'text-purple-600' : 'text-gray-400'}`}>
              {step === 1 ? 'Cá nhân' : step === 2 ? 'Y tế' : 'Lối sống'}
            </span>
          </div>
        ))}
      </div>
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-purple-500 to-fuchsia-500 transition-all duration-700 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

// Step 1: Personal Info
function Step1Personal({ formData, updateField, onNext }: any) {
  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-purple-100 animate-fadeIn">
      <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-fuchsia-600 bg-clip-text text-transparent mb-6">
        👤 Thông tin cá nhân
      </h2>
      
      <div className="space-y-6">
        {/* Gender */}
        <div className="group">
          <label className="block text-sm font-semibold text-gray-700 mb-3">Giới tính</label>
          <div className="grid grid-cols-2 gap-4">
            {[
              { value: 0, label: '👩 Nữ', color: 'from-pink-400 to-rose-400' },
              { value: 1, label: '👨 Nam', color: 'from-blue-400 to-cyan-400' }
            ].map(option => (
              <button
                key={option.value}
                onClick={() => updateField('sex', option.value)}
                className={`p-4 rounded-xl font-semibold text-lg transition-all duration-300 ${
                  formData.sex === option.value
                    ? `bg-gradient-to-r ${option.color} text-white shadow-lg scale-105`
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
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Nhóm tuổi: <span className="text-purple-600 text-xl">{
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
            className="w-full h-3 bg-gradient-to-r from-green-400 via-yellow-400 to-red-400 rounded-lg appearance-none cursor-pointer slider"
          />
        </div>

        {/* BMI */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Chỉ số BMI: <span className="text-purple-600 text-xl">{formData.bmi.toFixed(1)}</span>
          </label>
          <input
            type="range"
            min="15"
            max="50"
            step="0.5"
            value={formData.bmi}
            onChange={(e) => updateField('bmi', parseFloat(e.target.value))}
            className="w-full h-3 bg-gradient-to-r from-blue-400 via-green-400 via-yellow-400 to-red-400 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>Gầy</span>
            <span>Bình thường</span>
            <span>Thừa cân</span>
            <span>Béo phì</span>
          </div>
        </div>

        {/* Health Status */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">Sức khỏe tổng quát</label>
          <div className="grid grid-cols-5 gap-2">
            {[1, 2, 3, 4, 5].map(level => (
              <button
                key={level}
                onClick={() => updateField('genhlth', level)}
                className={`p-3 rounded-xl font-medium transition-all duration-300 ${
                  formData.genhlth === level
                    ? level === 1 ? 'bg-green-500 text-white shadow-lg scale-110' :
                      level === 2 ? 'bg-lime-500 text-white shadow-lg scale-110' :
                      level === 3 ? 'bg-yellow-500 text-white shadow-lg scale-110' :
                      level === 4 ? 'bg-orange-500 text-white shadow-lg scale-110' :
                      'bg-red-500 text-white shadow-lg scale-110'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {level === 1 ? '😊' : level === 2 ? '🙂' : level === 3 ? '😐' : level === 4 ? '😟' : '😞'}
              </button>
            ))}
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span>Rất tốt</span>
            <span>Kém</span>
          </div>
        </div>
      </div>

      <button
        onClick={onNext}
        className="w-full mt-8 bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all hover:scale-105"
      >
        Tiếp theo →
      </button>
    </div>
  );
}

// Step 2: Medical History
function Step2Medical({ formData, updateField, onNext, onBack }: any) {
  const Toggle = ({ label, field, icon }: any) => (
    <div className="bg-gray-50 rounded-xl p-4 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{icon}</span>
          <span className="font-medium text-gray-700">{label}</span>
        </div>
        <button
          onClick={() => updateField(field, formData[field] === 1 ? 0 : 1)}
          className={`relative w-16 h-8 rounded-full transition-all duration-300 ${
            formData[field] === 1 ? 'bg-gradient-to-r from-red-400 to-rose-400' : 'bg-gray-300'
          }`}
        >
          <div className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300 ${
            formData[field] === 1 ? 'translate-x-9' : 'translate-x-1'
          }`} />
        </button>
      </div>
    </div>
  );

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-purple-100 animate-fadeIn">
      <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-fuchsia-600 bg-clip-text text-transparent mb-6">
        🏥 Tiền sử y tế
      </h2>
      
      <div className="space-y-4">
        <Toggle label="Huyết áp cao" field="highBP" icon="❤️" />
        <Toggle label="Cholesterol cao" field="highChol" icon="🧪" />
        <Toggle label="Đã kiểm tra Cholesterol (5 năm qua)" field="cholCheck" icon="📋" />
        <Toggle label="Từng bị đột quỵ" field="stroke" icon="🧠" />
        <Toggle label="Bệnh tim mạch" field="heartDis" icon="💔" />
        <Toggle label="Khó khăn khi đi bộ/leo cầu thang" field="diffWalk" icon="🚶" />
      </div>

      <div className="flex gap-4 mt-8">
        <button
          onClick={onBack}
          className="flex-1 bg-gray-200 text-gray-700 py-4 rounded-xl font-bold text-lg hover:bg-gray-300 transition-all"
        >
          ← Quay lại
        </button>
        <button
          onClick={onNext}
          className="flex-1 bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all hover:scale-105"
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
    <div className="bg-gray-50 rounded-xl p-4 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{icon}</span>
          <span className="font-medium text-gray-700">{label}</span>
        </div>
        <button
          onClick={() => updateField(field, formData[field] === goodValue ? (goodValue === 1 ? 0 : 1) : goodValue)}
          className={`relative w-16 h-8 rounded-full transition-all duration-300 ${
            formData[field] === goodValue 
              ? 'bg-gradient-to-r from-green-400 to-emerald-400' 
              : 'bg-gradient-to-r from-red-400 to-rose-400'
          }`}
        >
          <div className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300 ${
            formData[field] === goodValue ? 'translate-x-9' : 'translate-x-1'
          }`} />
        </button>
      </div>
    </div>
  );

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-purple-100 animate-fadeIn">
      <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-fuchsia-600 bg-clip-text text-transparent mb-6">
        🥗 Lối sống & Thói quen
      </h2>
      
      <div className="space-y-4 mb-6">
        <Toggle label="Hút thuốc (>100 điếu trong đời)" field="smoker" icon="🚬" goodValue={0} />
        <Toggle label="Vận động thể chất (30 ngày qua)" field="physAct" icon="🏃" />
        <Toggle label="Ăn trái cây hàng ngày" field="fruits" icon="🍎" />
        <Toggle label="Ăn rau xanh hàng ngày" field="veggies" icon="🥬" />
        <Toggle label="Uống nhiều rượu bia" field="hvyAlcohol" icon="🍺" goodValue={0} />
      </div>

      {/* Mental & Physical Health Days */}
      <div className="space-y-4 mb-8">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Số ngày sức khỏe tinh thần kém (30 ngày qua): <span className="text-purple-600">{formData.mentHlth}</span>
          </label>
          <input
            type="range"
            min="0"
            max="30"
            value={formData.mentHlth}
            onChange={(e) => updateField('mentHlth', parseInt(e.target.value))}
            className="w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Số ngày sức khỏe thể chất kém (30 ngày qua): <span className="text-purple-600">{formData.physHlth}</span>
          </label>
          <input
            type="range"
            min="0"
            max="30"
            value={formData.physHlth}
            onChange={(e) => updateField('physHlth', parseInt(e.target.value))}
            className="w-full"
          />
        </div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={onBack}
          className="flex-1 bg-gray-200 text-gray-700 py-4 rounded-xl font-bold text-lg hover:bg-gray-300 transition-all"
        >
          ← Quay lại
        </button>
        <button
          onClick={onSubmit}
          className="flex-1 bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all hover:scale-105"
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
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50 flex items-center justify-center">
      <div className="text-center">
        <div className="relative w-32 h-32 mx-auto mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-fuchsia-500 rounded-full animate-ping opacity-75" />
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-fuchsia-500 rounded-full animate-spin" style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }} />
          <div className="absolute inset-4 bg-white rounded-full flex items-center justify-center">
            <span className="text-4xl">🧬</span>
          </div>
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Đang phân tích dữ liệu...</h3>
        <p className="text-gray-600">AI đang xử lý thông tin của bạn</p>
      </div>
    </div>
  );
}

// Results View
function ResultsView({ results, onReset }: { results: PredictionResults; onReset: () => void }) {
  const getRiskColor = (level: string) => {
    switch (level) {
      case "high": return { from: "from-red-500", to: "to-rose-500", text: "text-red-600", bg: "bg-red-50" };
      case "medium": return { from: "from-yellow-500", to: "to-amber-500", text: "text-yellow-600", bg: "bg-yellow-50" };
      default: return { from: "from-green-500", to: "to-emerald-500", text: "text-green-600", bg: "bg-green-50" };
    }
  };

  const colors = getRiskColor(results.riskLevel);

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50 py-12 px-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Hero Card */}
        <div className={`bg-gradient-to-r ${colors.from} ${colors.to} rounded-3xl shadow-2xl p-8 text-white animate-fadeIn`}>
          <div className="text-center">
            <div className="text-6xl mb-4">
              {results.riskLevel === "high" ? "⚠️" : results.riskLevel === "medium" ? "⚡" : "✅"}
            </div>
            <h2 className="text-4xl font-bold mb-2">Nguy cơ tiểu đường</h2>
            <div className="text-7xl font-black my-6">{(results.probability * 100).toFixed(1)}%</div>
            <p className="text-xl opacity-90">
              {results.riskLevel === "high" ? "Nguy cơ cao - Cần chú ý ngay" : 
               results.riskLevel === "medium" ? "Nguy cơ trung bình - Cần theo dõi" : 
               "Nguy cơ thấp - Hãy duy trì!"}
            </p>
          </div>
        </div>

        {/* Insights Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Risk Factors */}
          {results.insights.topRisks.length > 0 && (
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl p-6 border border-red-100">
              <h3 className="text-xl font-bold text-red-600 mb-4 flex items-center gap-2">
                ⚠️ Yếu tố nguy cơ
              </h3>
              <ul className="space-y-2">
                {results.insights.topRisks.map((risk, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">●</span>
                    <span className="text-gray-700">{risk}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Protective Factors */}
          {results.insights.protectiveFactors.length > 0 && (
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl p-6 border border-green-100">
              <h3 className="text-xl font-bold text-green-600 mb-4 flex items-center gap-2">
                🛡️ Yếu tố bảo vệ
              </h3>
              <ul className="space-y-2">
                {results.insights.protectiveFactors.map((factor, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">●</span>
                    <span className="text-gray-700">{factor}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Impact Visualization */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl p-6 border border-purple-100">
          <h3 className="text-2xl font-bold text-purple-600 mb-6">📊 Phân tích tác động</h3>
          <div className="space-y-3">
            {results.impacts.slice(0, 8).map((impact, i) => {
              const isPositive = impact.impact > 0;
              const maxImpact = Math.max(...results.impacts.map(imp => Math.abs(imp.impact)));
              const width = (Math.abs(impact.impact) / maxImpact) * 100;
              
              return (
                <div key={i} className="animate-fadeIn" style={{ animationDelay: `${i * 100}ms` }}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">{impact.feature}</span>
                    <span className={`text-sm font-bold ${isPositive ? 'text-red-600' : 'text-green-600'}`}>
                      {isPositive ? '+' : ''}{impact.impact.toFixed(1)}%
                    </span>
                  </div>
                  <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-1000 ease-out ${
                        isPositive ? 'bg-gradient-to-r from-red-400 to-rose-400' : 'bg-gradient-to-r from-green-400 to-emerald-400'
                      }`}
                      style={{ width: `${width}%`, transitionDelay: `${i * 100}ms` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recommendations */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl p-6 border border-blue-100">
          <h3 className="text-2xl font-bold text-blue-600 mb-4 flex items-center gap-2">
            💡 Khuyến nghị
          </h3>
          <ul className="space-y-3">
            {results.insights.recommendations.map((rec, i) => (
              <li key={i} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                <span className="text-blue-500 text-xl mt-0.5">{i + 1}.</span>
                <span className="text-gray-700 flex-1">{rec}</span>
              </li>
            ))}
          </ul>
          <div className="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded">
            <p className="text-sm text-yellow-800">
              ⚠️ <strong>Lưu ý:</strong> Kết quả chỉ mang tính tham khảo. Vui lòng tham khảo ý kiến bác sĩ chuyên khoa để được tư vấn chính xác.
            </p>
          </div>
        </div>

        {/* Reset Button */}
        <button
          onClick={onReset}
          className="w-full bg-gradient-to-r from-gray-600 to-gray-700 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all hover:scale-105"
        >
          🔄 Kiểm tra lại
        </button>
      </div>
    </div>
  );
}
