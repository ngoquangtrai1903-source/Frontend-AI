"use client";

import { Navigation } from "@/components/Navigation";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-50 py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-block px-4 sm:px-5 py-2 bg-blue-100 border border-blue-300 rounded-lg mb-4 md:mb-6">
            <p className="text-blue-700 text-xs sm:text-sm font-semibold">AI-Powered Health Assessment</p>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight">
            Diabetes Risk Assessment
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-8 md:mb-10">
            Get personalized insights about your diabetes risk using advanced AI technology. Fast, accurate, and secure.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <a href="/user-prediction" className="px-6 sm:px-8 py-2 sm:py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-md text-sm sm:text-base">
              Check My Risk
            </a>
            <a href="/doctor" className="px-6 sm:px-8 py-2 sm:py-3 bg-gray-100 border border-gray-300 text-gray-900 font-semibold rounded-lg hover:bg-gray-200 transition-colors text-sm sm:text-base">
              Doctor Portal
            </a>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 text-center mb-10 md:mb-14">Why Choose DiabeTwin?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <VibrantFeatureCard
              icon="⚡"
              title="Kết quả tức thì"
              description="Phân tích AI nhanh chóng trong vài giây với công nghệ tiên tiến nhất."
              gradient="from-yellow-400 to-orange-500"
              bgPattern="lightning"
              animation="pulse"
            />
            <VibrantFeatureCard
              icon="🎯"
              title="Độ chính xác vượt trội"
              description="Độ chính xác hàng đầu ngành dựa trên nghiên cứu y tế và kiểm chứng lâm sàng."
              gradient="from-blue-400 to-purple-500"
              bgPattern="target"
              animation="bounce"
            />
            <VibrantFeatureCard
              icon="🔒"
              title="Bảo mật tuyệt đối"
              description="Dữ liệu sức khỏe của bạn được mã hóa và không bao giờ chia sẻ với bên thứ ba."
              gradient="from-green-400 to-emerald-500"
              bgPattern="shield"
              animation="spin"
            />
            <VibrantFeatureCard
              icon="📊"
              title="Minh bạch đầy đủ"
              description="Hiểu rõ lý do đằng sau dự đoán AI qua giải thích dựa trên SHAP."
              gradient="from-purple-400 to-pink-500"
              bgPattern="chart"
              animation="float"
            />
            <VibrantFeatureCard
              icon="💡"
              title="Cá nhân hóa thông minh"
              description="Nhận khuyến nghị tùy chỉnh dựa trên hồ sơ sức khỏe của riêng bạn."
              gradient="from-amber-400 to-red-500"
              bgPattern="idea"
              animation="glow"
            />
            <VibrantFeatureCard
              icon="📱"
              title="Đa nền tảng linh hoạt"
              description="Sử dụng trên mọi thiết bị: máy tính, điện thoại, máy tính bảng mọi lúc, mọi nơi."
              gradient="from-cyan-400 to-blue-500"
              bgPattern="devices"
              animation="slide"
            />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-gray-50 py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 text-center mb-10 md:mb-14">How It Works</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            <StepCard
              number="1"
              title="Fill In Your Data"
              description="Enter your personal and health information securely"
            />
            <StepCard
              number="2"
              title="AI Analysis"
              description="Our model analyzes your data in real-time"
            />
            <StepCard
              number="3"
              title="Get Results"
              description="Receive comprehensive risk assessment instantly"
            />
            <StepCard
              number="4"
              title="Get Recommendations"
              description="Receive personalized health recommendations"
            />
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 text-center mb-10 md:mb-14">Our Impact</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            <StatBox value="92%" label="Accuracy" description="State-of-the-art model" />
            <StatBox value="15K+" label="Users" description="Trusting DiabeTwin" />
            <StatBox value="87%" label="Recall Score" description="Clinical validation" />
            <StatBox value="<5s" label="Speed" description="Average analysis time" />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center text-white">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6">Ready to Check Your Risk?</h2>
          <p className="text-base sm:text-lg md:text-xl text-blue-100 mb-8 md:mb-10">Start your diabetes risk assessment today with our advanced AI system.</p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <a href="/user-prediction" className="px-6 sm:px-8 py-2 sm:py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors text-sm sm:text-base">
              Get Started Now
            </a>
            <a href="/about" className="px-6 sm:px-8 py-2 sm:py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-blue-800 transition-colors text-sm sm:text-base">
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center text-gray-600">
          <p>© 2026 DiabeTwin - AI-Powered Health Assessment</p>
          <p className="text-sm mt-2">Results are for reference only. Consult healthcare professionals for medical advice.</p>
        </div>
      </footer>
    </div>
  );
}

function VibrantFeatureCard({ 
  icon, 
  title, 
  description, 
  gradient,
  bgPattern,
  animation
}: { 
  icon: string; 
  title: string; 
  description: string;
  gradient: string;
  bgPattern: string;
  animation: string;
}) {
  const getAnimationClass = (anim: string) => {
    switch(anim) {
      case 'pulse': return 'animate-pulse';
      case 'bounce': return 'animate-bounce';
      case 'spin': return 'animate-spin';
      case 'float': return 'animate-float';
      case 'glow': return 'animate-glow';
      case 'slide': return 'animate-slide';
      default: return '';
    }
  };

  const getBgPattern = (pattern: string) => {
    switch(pattern) {
      case 'lightning': return 'bg-pattern-lightning';
      case 'target': return 'bg-pattern-target';
      case 'shield': return 'bg-pattern-shield';
      case 'chart': return 'bg-pattern-chart';
      case 'idea': return 'bg-pattern-idea';
      case 'devices': return 'bg-pattern-devices';
      default: return '';
    }
  };

  return (
    <div className="group relative overflow-hidden bg-white rounded-2xl border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
      {/* Background Pattern */}
      <div className={`absolute inset-0 opacity-5 ${getBgPattern(bgPattern)}`} />
      
      {/* Gradient Border Effect */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
      
      {/* Content */}
      <div className="relative p-6 sm:p-8">
        {/* Icon with gradient background */}
        <div className={`w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 ${getAnimationClass(animation)}`}>
          <span className="text-3xl sm:text-4xl text-white filter drop-shadow-md">{icon}</span>
        </div>
        
        {/* Title with gradient text */}
        <h3 className={`text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-center bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>
          {title}
        </h3>
        
        {/* Description */}
        <p className="text-sm sm:text-base text-gray-600 text-center leading-relaxed">
          {description}
        </p>
        
        {/* Hover effect overlay */}
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none`} />
      </div>
      
      {/* Decorative corner */}
      <div className={`absolute top-2 right-2 w-8 h-8 bg-gradient-to-br ${gradient} opacity-20 rounded-bl-xl`} />
    </div>
  );
}

function StepCard({ number, title, description }: { number: string; title: string; description: string }) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
      <div className="w-10 sm:w-12 h-10 sm:h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-base sm:text-lg mb-3 sm:mb-4 mx-auto flex-shrink-0">
        {number}
      </div>
      <h3 className="text-base sm:text-lg font-bold text-gray-900 text-center mb-2">{title}</h3>
      <p className="text-gray-600 text-center text-xs sm:text-sm">{description}</p>
    </div>
  );
}

function StatBox({ value, label, description }: { value: string; label: string; description: string }) {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-200 p-4 sm:p-8 text-center">
      <div className="text-2xl sm:text-4xl font-bold text-blue-600 mb-1 sm:mb-2 break-words">{value}</div>
      <div className="text-base sm:text-lg font-semibold text-gray-900 mb-1">{label}</div>
      <div className="text-xs sm:text-sm text-gray-600">{description}</div>
    </div>
  );
}
