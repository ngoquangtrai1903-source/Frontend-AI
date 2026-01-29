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
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-cyan-50 to-blue-50">
      {/* Header */}
      <header className="border-b border-emerald-200/50 bg-white/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-xl flex items-center justify-center">
                <span className="text-white text-xl">🔬</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
                  DiabeTwin
                </h1>
                <p className="text-sm text-gray-500">Hệ thống dự đoán tiểu đường AI</p>
              </div>
            </div>
            
            {/* Mode Toggle */}
            <div className="flex gap-2 bg-gray-100 rounded-full p-1">
              <button
                onClick={() => setMode("user")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  mode === "user"
                    ? "bg-white text-emerald-600 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                👤 Người dùng
              </button>
              <button
                onClick={() => setMode("doctor")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  mode === "doctor"
                    ? "bg-white text-cyan-600 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                👨‍⚕️ Bác sĩ
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-3">
            {mode === "doctor" 
              ? "Chẩn đoán lâm sàng chuyên nghiệp" 
              : "Kiểm tra nhanh nguy cơ tiểu đường"}
          </h2>
          <p className="text-gray-600 text-lg">
            Công nghệ AI tiên tiến giúp đánh giá nguy cơ tiểu đường chính xác
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
      <footer className="mt-16 border-t border-emerald-200/50 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-8 text-center text-gray-600">
          <p>© 2026 DiabeTwin - Hệ thống dự đoán tiểu đường AI</p>
          <p className="text-sm mt-2">
            ⚠️ Kết quả chỉ mang tính tham khảo. Vui lòng tham khảo ý kiến bác sĩ chuyên khoa.
          </p>
        </div>
      </footer>
    </div>
  );
}
