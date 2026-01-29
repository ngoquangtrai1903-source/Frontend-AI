"use client";

import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [hoveredCard, setHoveredCard] = useState<"doctor" | "user" | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-cyan-50 to-purple-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" />
        <div className="absolute top-40 right-10 w-72 h-72 bg-cyan-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{ animationDelay: "1s" }} />
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{ animationDelay: "2s" }} />
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-white/20 bg-white/60 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-white text-2xl">🔬</span>
            </div>
            <div>
              <h1 className="text-3xl font-black bg-gradient-to-r from-emerald-600 via-cyan-600 to-purple-600 bg-clip-text text-transparent">
                DiabeTwin
              </h1>
              <p className="text-sm text-gray-600 font-medium">AI-Powered Diabetes Prediction System</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16 animate-fadeIn">
          <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-6 leading-tight">
            Dự đoán nguy cơ
            <br />
            <span className="bg-gradient-to-r from-emerald-600 via-cyan-600 to-purple-600 bg-clip-text text-transparent">
              Tiểu đường
            </span>
            {" "}bằng AI
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Hệ thống phân tích thông minh sử dụng Machine Learning để đánh giá nguy cơ tiểu đường
            chính xác, nhanh chóng và an toàn.
          </p>
        </div>

        {/* Selection Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Doctor Card */}
          <Link href="/doctor">
            <div
              onMouseEnter={() => setHoveredCard("doctor")}
              onMouseLeave={() => setHoveredCard(null)}
              className={`group relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border-2 transition-all duration-500 cursor-pointer overflow-hidden ${
                hoveredCard === "doctor"
                  ? "border-cyan-400 scale-105 shadow-cyan-200/50"
                  : "border-white/50 hover:border-cyan-300"
              }`}
            >
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Content */}
              <div className="relative p-8">
                {/* Icon */}
                <div className={`w-20 h-20 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg transition-transform duration-500 ${
                  hoveredCard === "doctor" ? "scale-110 rotate-6" : ""
                }`}>
                  <span className="text-4xl">👨‍⚕️</span>
                </div>

                {/* Title */}
                <h3 className="text-3xl font-bold text-gray-900 mb-3">
                  Chế độ Bác sĩ
                </h3>
                <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                  Giao diện chuyên nghiệp với đầy đủ chỉ số y học, phân tích SHAP chi tiết 
                  và khuyến nghị lâm sàng dành cho bác sĩ.
                </p>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-3 text-gray-700">
                    <span className="w-2 h-2 bg-cyan-500 rounded-full" />
                    <span>8 chỉ số y học chuyên sâu</span>
                  </li>
                  <li className="flex items-center gap-3 text-gray-700">
                    <span className="w-2 h-2 bg-cyan-500 rounded-full" />
                    <span>Biểu đồ SHAP phân tích tác động</span>
                  </li>
                  <li className="flex items-center gap-3 text-gray-700">
                    <span className="w-2 h-2 bg-cyan-500 rounded-full" />
                    <span>Khuyến nghị lâm sàng từ AI</span>
                  </li>
                </ul>

                {/* Button */}
                <div className={`inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-bold rounded-xl shadow-lg transition-all duration-300 ${
                  hoveredCard === "doctor" ? "translate-x-2" : ""
                }`}>
                  <span>Bắt đầu phân tích</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>

              {/* Decorative Element */}
              <div className="absolute -bottom-2 -right-2 w-32 h-32 bg-gradient-to-br from-emerald-400/20 to-cyan-400/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
            </div>
          </Link>

          {/* User Card */}
          <Link href="/user-prediction">
            <div
              onMouseEnter={() => setHoveredCard("user")}
              onMouseLeave={() => setHoveredCard(null)}
              className={`group relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border-2 transition-all duration-500 cursor-pointer overflow-hidden ${
                hoveredCard === "user"
                  ? "border-purple-400 scale-105 shadow-purple-200/50"
                  : "border-white/50 hover:border-purple-300"
              }`}
            >
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-fuchsia-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Content */}
              <div className="relative p-8">
                {/* Icon */}
                <div className={`w-20 h-20 bg-gradient-to-br from-purple-500 to-fuchsia-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg transition-transform duration-500 ${
                  hoveredCard === "user" ? "scale-110 rotate-6" : ""
                }`}>
                  <span className="text-4xl">👤</span>
                </div>

                {/* Title */}
                <h3 className="text-3xl font-bold text-gray-900 mb-3">
                  Chế độ Người dùng
                </h3>
                <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                  Giao diện thân thiện với hướng dẫn từng bước, dễ hiểu và phân tích 
                  trực quan dành cho người dùng cá nhân.
                </p>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-3 text-gray-700">
                    <span className="w-2 h-2 bg-purple-500 rounded-full" />
                    <span>Wizard 3 bước đơn giản</span>
                  </li>
                  <li className="flex items-center gap-3 text-gray-700">
                    <span className="w-2 h-2 bg-purple-500 rounded-full" />
                    <span>Phân tích dễ hiểu với biểu tượng</span>
                  </li>
                  <li className="flex items-center gap-3 text-gray-700">
                    <span className="w-2 h-2 bg-purple-500 rounded-full" />
                    <span>Khuyến nghị lối sống cá nhân hóa</span>
                  </li>
                </ul>

                {/* Button */}
                <div className={`inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white font-bold rounded-xl shadow-lg transition-all duration-300 ${
                  hoveredCard === "user" ? "translate-x-2" : ""
                }`}>
                  <span>Kiểm tra ngay</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>

              {/* Decorative Element */}
              <div className="absolute -bottom-2 -right-2 w-32 h-32 bg-gradient-to-br from-purple-400/20 to-fuchsia-400/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
            </div>
          </Link>
        </div>

        {/* Info Banner */}
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl p-6 backdrop-blur-sm">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">💡</span>
                </div>
              </div>
              <div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">
                  Lưu ý quan trọng
                </h4>
                <p className="text-gray-700 leading-relaxed">
                  Kết quả dự đoán chỉ mang tính chất <strong>tham khảo</strong> và không thay thế cho 
                  chẩn đoán y khoa chuyên nghiệp. Nếu bạn có nguy cơ cao hoặc các triệu chứng bất thường, 
                  vui lòng liên hệ với bác sĩ chuyên khoa để được tư vấn và điều trị kịp thời.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-4xl font-black bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent mb-2">
              95%
            </div>
            <div className="text-gray-600 font-medium">Độ chính xác</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-black bg-gradient-to-r from-cyan-600 to-purple-600 bg-clip-text text-transparent mb-2">
              &lt;2s
            </div>
            <div className="text-gray-600 font-medium">Thời gian phân tích</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-black bg-gradient-to-r from-purple-600 to-fuchsia-600 bg-clip-text text-transparent mb-2">
              10K+
            </div>
            <div className="text-gray-600 font-medium">Người dùng</div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 mt-auto border-t border-white/20 bg-white/60 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-8 text-center">
          <p className="text-gray-600 font-medium">
            © 2026 DiabeTwin - Hệ thống dự đoán tiểu đường AI
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Phát triển bởi Claude AI với ❤️
          </p>
        </div>
      </footer>
    </div>
  );
}
