"use client";

import { useState } from "react";
import { ResultsDisplay } from "@/components/ResultsDisplay";
import { PatientForm } from "@/components/PatientForm";

export default function Home() {
  const [mode, setMode] = useState<"user" | "doctor">("doctor");
  const [results, setResults] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = async (formData: any) => {
    setIsAnalyzing(true);
    
    // Simulate API call - replace with actual backend
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock results
    const mockResults = {
      probability: 0.42,
      conclusion: formData.hba1c > 6.5 ? "DƯƠNG TÍNH" : "ÂM TÍNH",
      riskLevel: formData.hba1c > 7 ? "high" : formData.hba1c > 5.7 ? "medium" : "low",
      impacts: [
        { feature: "HbA1c", impact: formData.hba1c > 6 ? 12.5 : -3.2 },
        { feature: "Đường huyết", impact: formData.glucose > 120 ? 8.3 : -2.1 },
        { feature: "BMI", impact: formData.bmi > 25 ? 5.7 : -1.5 },
        { feature: "Tuổi", impact: formData.age > 50 ? 4.2 : -0.8 },
        { feature: "Hút thuốc", impact: formData.smoking !== "never" ? 3.8 : -0.5 },
        { feature: "Huyết áp", impact: formData.hypertension ? 2.9 : -0.3 },
        { feature: "Bệnh tim", impact: formData.heart_disease ? 2.1 : -0.2 },
        { feature: "Giới tính", impact: 0.5 }
      ],
      aiAdvice: `Dựa trên phân tích của tôi, bệnh nhân có nguy cơ tiểu đường ở mức ${formData.hba1c > 7 ? "cao" : "trung bình"}. 

**3 Khuyến nghị quan trọng:**

1. **Kiểm soát HbA1c:** Chỉ số HbA1c hiện tại ${formData.hba1c}% ${formData.hba1c > 6.5 ? "cao hơn ngưỡng bình thường" : "cần theo dõi"}. Nên duy trì chế độ ăn ít đường và tinh bột.

2. **Quản lý cân nặng:** BMI ${formData.bmi} ${formData.bmi > 25 ? "cho thấy thừa cân" : "ở mức tốt"}. Tăng cường hoạt động thể chất 150 phút/tuần.

3. **Theo dõi thường xuyên:** ${formData.hba1c > 6.5 ? "Nên khám kiểm tra mỗi 3 tháng" : "Kiểm tra lại sau 6 tháng"} và duy trì lối sống lành mạnh.`
    };
    
    setResults(mockResults);
    setIsAnalyzing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-800">
      {/* Header */}
      <header className="border-b border-slate-700/50 bg-slate-950/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-white text-xl">⚕️</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                  DiabeTwin
                </h1>
                <p className="text-xs text-slate-400">AI Diabetes Risk Assessment</p>
              </div>
            </div>
            
            {/* Mode Toggle */}
            <div className="flex gap-2 bg-slate-800 rounded-full p-1.5">
              <button
                onClick={() => setMode("user")}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                  mode === "user"
                    ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                👤 User
              </button>
              <button
                onClick={() => setMode("doctor")}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                  mode === "doctor"
                    ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                👨‍⚕️ Doctor
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-12 text-center animate-fadeIn">
          <div className="inline-block px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full mb-4">
            <p className="text-blue-400 text-sm font-semibold">🚀 Advanced AI Analysis</p>
          </div>
          <h2 className="text-5xl font-bold text-white mb-4 leading-tight">
            {mode === "doctor" 
              ? "Professional Clinical Diagnosis" 
              : "Rapid Diabetes Risk Check"}
          </h2>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            State-of-the-art AI technology for accurate diabetes risk assessment with comprehensive health insights
          </p>
        </div>

        {!results ? (
          <PatientForm onSubmit={handleAnalyze} isLoading={isAnalyzing} />
        ) : (
          <ResultsDisplay 
            results={results} 
            onReset={() => setResults(null)}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-slate-700/50 bg-gradient-to-t from-slate-950 to-slate-900/50 backdrop-blur-sm py-8">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-slate-300 font-medium">© 2026 DiabeTwin - AI-Powered Health Assessment</p>
          <p className="text-slate-400 text-sm mt-3">
            ⚠️ Results are for reference only. Please consult with healthcare professionals for medical advice.
          </p>
        </div>
      </footer>
    </div>
  );
}
