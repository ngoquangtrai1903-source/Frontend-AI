"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50">
      {/* Header */}
      <header className="border-b border-teal-200/50 bg-white/90 backdrop-blur-xl sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-white text-2xl">🔬</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
                  DiabeTwin
                </h1>
                <p className="text-sm text-gray-500">Hệ thống dự đoán tiểu đường AI</p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <Link 
                href="/doctor"
                className="px-4 py-2 rounded-xl text-sm font-medium text-teal-600 hover:bg-teal-50 transition-colors"
              >
                👨‍⚕️ Bác sĩ
              </Link>
              <Link 
                href="/user-prediction"
                className="px-4 py-2 rounded-xl text-sm font-medium text-cyan-600 hover:bg-cyan-50 transition-colors"
              >
                👤 Người dùng
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-16 animate-fadeIn">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-100 text-teal-700 rounded-full text-sm font-medium mb-6">
            <span>✨</span>
            <span>Công nghệ AI tiên tiến</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Dự đoán nguy cơ tiểu đường
            <br />
            <span className="bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent">
              bằng trí tuệ nhân tạo
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Phân tích chính xác với AI, hỗ trợ quyết định lâm sàng và tự kiểm tra sức khỏe
          </p>
        </div>

        {/* Mode Selection Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-20">
          {/* Doctor Mode */}
          <Link href="/doctor">
            <div className="group relative bg-white rounded-3xl shadow-xl border-2 border-teal-100 p-8 hover:shadow-2xl hover:scale-[1.02] hover:border-teal-300 transition-all duration-300 cursor-pointer overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-teal-400/20 to-cyan-400/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-500"></div>
              
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all">
                  <span className="text-3xl">👨‍⚕️</span>
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  Chế độ Bác sĩ
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Công cụ chuyên nghiệp cho phân tích lâm sàng chi tiết với các chỉ số y tế đầy đủ
                </p>
                
                <ul className="space-y-3 text-sm text-gray-600 mb-6">
                  <li className="flex items-center gap-3 p-2 rounded-lg hover:bg-teal-50 transition-colors">
                    <div className="w-6 h-6 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0">
                      <span className="text-teal-600 text-xs">✓</span>
                    </div>
                    <span>Phân tích SHAP chi tiết</span>
                  </li>
                  <li className="flex items-center gap-3 p-2 rounded-lg hover:bg-teal-50 transition-colors">
                    <div className="w-6 h-6 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0">
                      <span className="text-teal-600 text-xs">✓</span>
                    </div>
                    <span>Biểu đồ waterfall trực quan</span>
                  </li>
                  <li className="flex items-center gap-3 p-2 rounded-lg hover:bg-teal-50 transition-colors">
                    <div className="w-6 h-6 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0">
                      <span className="text-teal-600 text-xs">✓</span>
                    </div>
                    <span>Khuyến nghị từ AI</span>
                  </li>
                </ul>
                
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <span className="text-teal-600 font-semibold">Bắt đầu phân tích</span>
                  <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center group-hover:bg-teal-600 group-hover:text-white transition-all">
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>

          {/* User Mode */}
          <Link href="/user-prediction">
            <div className="group relative bg-white rounded-3xl shadow-xl border-2 border-cyan-100 p-8 hover:shadow-2xl hover:scale-[1.02] hover:border-cyan-300 transition-all duration-300 cursor-pointer overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-cyan-400/20 to-blue-400/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-500"></div>
              
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all">
                  <span className="text-3xl">👤</span>
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  Chế độ Người dùng
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Kiểm tra nhanh nguy cơ tiểu đường với giao diện thân thiện và dễ sử dụng
                </p>
                
                <ul className="space-y-3 text-sm text-gray-600 mb-6">
                  <li className="flex items-center gap-3 p-2 rounded-lg hover:bg-cyan-50 transition-colors">
                    <div className="w-6 h-6 rounded-full bg-cyan-100 flex items-center justify-center flex-shrink-0">
                      <span className="text-cyan-600 text-xs">✓</span>
                    </div>
                    <span>Giao diện đơn giản, dễ dùng</span>
                  </li>
                  <li className="flex items-center gap-3 p-2 rounded-lg hover:bg-cyan-50 transition-colors">
                    <div className="w-6 h-6 rounded-full bg-cyan-100 flex items-center justify-center flex-shrink-0">
                      <span className="text-cyan-600 text-xs">✓</span>
                    </div>
                    <span>Kết quả dễ hiểu, rõ ràng</span>
                  </li>
                  <li className="flex items-center gap-3 p-2 rounded-lg hover:bg-cyan-50 transition-colors">
                    <div className="w-6 h-6 rounded-full bg-cyan-100 flex items-center justify-center flex-shrink-0">
                      <span className="text-cyan-600 text-xs">✓</span>
                    </div>
                    <span>Khuyến nghị cụ thể</span>
                  </li>
                </ul>
                
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <span className="text-cyan-600 font-semibold">Kiểm tra ngay</span>
                  <div className="w-10 h-10 rounded-full bg-cyan-100 flex items-center justify-center group-hover:bg-cyan-600 group-hover:text-white transition-all">
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl p-8 text-center shadow-lg border border-teal-100 hover:shadow-xl hover:scale-105 transition-all">
            <div className="w-16 h-16 bg-gradient-to-br from-teal-100 to-cyan-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl">🎯</span>
            </div>
            <h4 className="text-lg font-bold text-gray-900 mb-2">Chính xác cao</h4>
            <p className="text-gray-600 text-sm">Mô hình AI được huấn luyện trên dữ liệu y tế thực tế</p>
          </div>
          
          <div className="bg-white rounded-2xl p-8 text-center shadow-lg border border-cyan-100 hover:shadow-xl hover:scale-105 transition-all">
            <div className="w-16 h-16 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl">⚡</span>
            </div>
            <h4 className="text-lg font-bold text-gray-900 mb-2">Nhanh chóng</h4>
            <p className="text-gray-600 text-sm">Kết quả phân tích chỉ trong vài giây</p>
          </div>
          
          <div className="bg-white rounded-2xl p-8 text-center shadow-lg border border-blue-100 hover:shadow-xl hover:scale-105 transition-all">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl">🔒</span>
            </div>
            <h4 className="text-lg font-bold text-gray-900 mb-2">An toàn</h4>
            <p className="text-gray-600 text-sm">Dữ liệu được bảo mật tuyệt đối</p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-20 border-t border-teal-200/50 bg-white/70 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-8 text-center text-gray-600">
          <p className="font-semibold text-gray-800">© 2026 DiabeTwin - Hệ thống dự đoán tiểu đường AI</p>
          <p className="text-sm mt-2 text-gray-500">
            ⚠️ Kết quả chỉ mang tính tham khảo. Vui lòng tham khảo ý kiến bác sĩ chuyên khoa.
          </p>
        </div>
      </footer>
    </div>
  );
}