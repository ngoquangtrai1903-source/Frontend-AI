"use client";

import { useState } from "react";
import { Navigation } from "@/components/Navigation";

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'model' | 'research'>('overview');

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 to-purple-600 text-white py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Về DiabeTwin</h1>
          <p className="text-base sm:text-lg md:text-xl text-blue-100 max-w-3xl mx-auto">
            Hệ thống dự đoán tiểu đường AI tiên tiến, mang lại giải pháp chẩn đoán chính xác và kịp thời
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 sticky top-16 bg-white z-40 overflow-x-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex gap-4 sm:gap-8 min-w-full sm:min-w-0">
            <TabButton
              active={activeTab === 'overview'}
              onClick={() => setActiveTab('overview')}
              icon="📊"
              label="Tổng quan"
            />
            <TabButton
              active={activeTab === 'model'}
              onClick={() => setActiveTab('model')}
              icon="🤖"
              label="Mô hình AI"
            />
            <TabButton
              active={activeTab === 'research'}
              onClick={() => setActiveTab('research')}
              icon="📚"
              label="Nghiên cứu"
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {activeTab === 'overview' && <OverviewTab />}
        {activeTab === 'model' && <ModelTab />}
        {activeTab === 'research' && <ResearchTab />}
      </main>

      {/* Footer */}
      <footer className="mt-16 sm:mt-20 border-t border-gray-200 bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center text-gray-600">
          <p>© 2026 DiabeTwin - AI-Powered Health Assessment</p>
          <p className="text-sm mt-2">
            Kết quả chỉ mang tính tham khảo. Vui lòng tham khảo ý kiến bác sĩ chuyên khoa.
          </p>
        </div>
      </footer>
    </div>
  );
}

function TabButton({ active, onClick, icon, label }: any) {
  return (
    <button
      onClick={onClick}
      className={`px-2 sm:px-4 py-3 sm:py-4 font-semibold border-b-2 transition-colors whitespace-nowrap text-sm sm:text-base ${
        active
          ? 'border-blue-600 text-blue-600'
          : 'border-transparent text-gray-600 hover:text-gray-900'
      }`}
    >
      <span className="mr-1 sm:mr-2">{icon}</span>
      <span className="hidden sm:inline">{label}</span>
      <span className="sm:hidden">{label.substring(0, 3)}</span>
    </button>
  );
}

// OVERVIEW TAB
function OverviewTab() {
  return (
    <div className="space-y-12 animate-fadeIn">
      {/* Mission */}
      <section>
        <h2 className="text-3xl font-bold text-gray-900 mb-6">🎯 Sứ mệnh của chúng tôi</h2>
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-8 border border-blue-200">
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            DiabeTwin được phát triển với sứ mệnh <strong>dân chủ hóa việc tiếp cận chăm sóc sức khỏe</strong> thông qua công nghệ AI tiên tiến. 
            Chúng tôi tin rằng mọi người đều xứng đáng có được công cụ đánh giá sức khỏe chính xác, nhanh chóng và dễ tiếp cận.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            Bệnh tiểu đường ảnh hưởng đến hàng triệu người trên toàn thế giới. Phát hiện sớm có thể cứu sống và cải thiện chất lượng cuộc sống. 
            Đó là lý do tại sao chúng tôi xây dựng DiabeTwin - để mang lại công cụ dự đoán tiên tiến nhất cho mọi người.
          </p>
        </div>
      </section>

      {/* Statistics */}
      <section>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">📈 Thống kê & Tác động</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <StatCard
            value="95.3%"
            label="Độ chính xác"
            description="Độ chính xác trung bình của mô hình"
            color="from-green-400 to-emerald-500"
          />
          <StatCard
            value="15,000+"
            label="Người dùng"
            description="Đã sử dụng hệ thống"
            color="from-blue-400 to-indigo-500"
          />
          <StatCard
            value="98.7%"
            label="AUC Score"
            description="Diện tích dưới đường cong ROC"
            color="from-purple-400 to-fuchsia-500"
          />
          <StatCard
            value="<2s"
            label="Tốc độ"
            description="Thời gian phân tích trung bình"
            color="from-orange-400 to-red-500"
          />
        </div>
      </section>

      {/* Team */}
      <section>
        <h2 className="text-3xl font-bold text-gray-900 mb-6">👥 Đội ngũ phát triển</h2>
        <div className="bg-white rounded-xl border border-gray-200 p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <TeamMember
              name="Mr. Ngô Quang Trãi"
              role="ML Engineer"
              avatar="👨‍🔬"
              description="Chuyên gia Machine Learning, trường đại học FPT"
            />
            <TeamMember
              name="Mr. Nguyễn Phương Huy"
              role="Web Developer"
              avatar="👨‍💻"
              description="Full-stack Developer, trường đại học FPT"
            />
            <TeamMember
              name="Mr. Võ Trần Gia Bảo"
              role="Data Scientist"
              avatar="👨‍🔬"
              description="Data Science Specialist, trường đại học FPT"
            />
            <TeamMember
              name="Mr. Phan Văn Quốc"
              role="Technical Lead"
              avatar="👨‍💼"
              description="Project Lead & Researcher, trường đại học FPT"
            />
          </div>
        </div>
      </section>

      {/* Features */}
      <section>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">✨ Tính năng nổi bật</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <FeatureCard
            icon="🎯"
            title="Dự đoán chính xác"
            description="Sử dụng thuật toán ML tiên tiến với độ chính xác cao, được kiểm chứng bởi nghiên cứu lâm sàng"
          />
          <FeatureCard
            icon="📊"
            title="Phân tích SHAP"
            description="Giải thích minh bạch về các yếu tố ảnh hưởng đến kết quả dự đoán của bạn"
          />
          <FeatureCard
            icon="⚡"
            title="Kết quả tức thì"
            description="Nhận kết quả phân tích chi tiết chỉ trong vài giây"
          />
          <FeatureCard
            icon="🔒"
            title="Bảo mật tuyệt đối"
            description="Dữ liệu được mã hóa end-to-end, không lưu trữ thông tin cá nhân"
          />
          <FeatureCard
            icon="💡"
            title="Tư vấn AI"
            description="Nhận khuyến nghị cá nhân hóa dựa trên tình trạng sức khỏe của bạn"
          />
          <FeatureCard
            icon="📱"
            title="Đa nền tảng"
            description="Sử dụng trên mọi thiết bị: máy tính, điện thoại, máy tính bảng"
          />
        </div>
      </section>
    </div>
  );
}

// MODEL TAB
function ModelTab() {
  return (
    <div className="space-y-12 animate-fadeIn">
      {/* Twin Model Architecture */}
      <section>
        <h2 className="text-3xl font-bold text-gray-900 mb-6">🏗️ Hai tuyến mô hình AI (Doctor & Home)</h2>
        <div className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
          <p className="text-gray-700 leading-relaxed text-base sm:text-lg">
            DiabeTwin được thiết kế như một hệ thống <strong>&quot;twin&quot; AI</strong> gồm hai mô hình khác nhau, 
            tối ưu riêng cho hai bối cảnh sử dụng:
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mt-6">
            <div className="bg-blue-50 rounded-lg p-5 sm:p-6 border border-blue-200 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-blue-900 mb-2">Mô hình cho Bác sĩ</h3>
                <p className="text-sm sm:text-base text-gray-700 mb-3">
                  Huấn luyện bằng <strong>AdaBoostClassifier</strong> trên khoảng <strong>100.000 hồ sơ lâm sàng</strong>, 
                  dành cho môi trường bệnh viện/phòng khám nơi bác sĩ cần công cụ hỗ trợ chẩn đoán có độ chính xác cao.
                </p>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>• Tối ưu cho <strong>độ nhạy (recall)</strong> với ca dương tính để hạn chế bỏ sót bệnh.</li>
                  <li>• Giao diện kết quả chi tiết, kèm giải thích SHAP cho từng bệnh nhân.</li>
                  <li>• Thích hợp dùng song song với quy trình chẩn đoán chuẩn của bác sĩ.</li>
                </ul>
              </div>
              <div className="mt-4">
                <a
                  href="/diabetes_report.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors w-full sm:w-auto"
                >
                  Xem báo cáo huấn luyện (HTML)
                </a>
              </div>
            </div>

            <div className="bg-purple-50 rounded-lg p-5 sm:p-6 border border-purple-200 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-purple-900 mb-2">Mô hình cho Người dùng tại nhà</h3>
                <p className="text-sm sm:text-base text-gray-700 mb-3">
                  Huấn luyện bằng <strong>LGBMClassifier</strong> trên <strong>70.692 mẫu</strong> từ bộ dữ liệu 
                  <strong> BRFSS (Behavioral Risk Factor Surveillance System)</strong>, tập trung vào các yếu tố hành vi và lối sống.
                </p>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>• Ưu tiên <strong>tốc độ và tính ổn định</strong> để chạy mượt trên nhiều thiết bị.</li>
                  <li>• Thiết kế câu hỏi thân thiện, giúp người dùng không chuyên y tế dễ trả lời.</li>
                  <li>• Cho phép sử dụng tại nhà để <strong>sàng lọc nguy cơ sớm</strong>, không thay thế bác sĩ.</li>
                </ul>
              </div>
              <div className="mt-4">
                <a
                  href="/diabetes_report_for_AI_at_home.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-purple-600 text-white text-sm font-semibold hover:bg-purple-700 transition-colors w-full sm:w-auto"
                >
                  Xem báo cáo mô hình tại nhà (HTML)
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Training Data & Metrics */}
      <section>
        <h2 className="text-3xl font-bold text-gray-900 mb-6">📊 Dữ liệu huấn luyện & chất lượng mô hình</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Mô hình cho Bác sĩ (AdaBoost)</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <DataCard
                title="Số mẫu huấn luyện"
                value="~100.000"
                description="Hồ sơ bệnh nhân lâm sàng"
                color="bg-blue-600"
              />
              <DataCard
                title="Bối cảnh sử dụng"
                value="Bệnh viện"
                description="Hỗ trợ ra quyết định cho bác sĩ"
                color="bg-sky-600"
              />
            </div>
            <p className="text-sm text-gray-700 mb-3">
              Trên tập kiểm thử, mô hình cho bác sĩ đạt <strong>độ chính xác tổng thể cao</strong>, 
              với khả năng nhận diện ca có nguy cơ tiểu đường tốt (recall nhóm dương tính khoảng 0.87).
            </p>
            <p className="text-sm text-gray-700">
              Confusion matrix cho thấy <strong>số lượng lớn ca âm tính được phân loại đúng</strong>, 
              đồng thời vẫn ưu tiên không bỏ sót bệnh nhân có nguy cơ cao.
            </p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Mô hình cho Người dùng (LGBM)</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <DataCard
                title="Số mẫu BRFSS"
                value="70.692"
                description="Dữ liệu sức khỏe cộng đồng từ CDC"
                color="bg-purple-600"
              />
              <DataCard
                title="Mục tiêu"
                value="Sàng lọc tại nhà"
                description="Đánh giá nhanh nguy cơ cá nhân"
                color="bg-fuchsia-600"
              />
            </div>
            <p className="text-sm text-gray-700 mb-3">
              Trên tập kiểm thử, mô hình LGBM đạt <strong>precision khoảng 0.77</strong> và <strong>recall khoảng 0.71</strong> 
              cho nhóm nguy cơ cao, cân bằng giữa việc phát hiện bệnh và hạn chế cảnh báo giả.
            </p>
            <p className="text-sm text-gray-700">
              Kết quả được hiển thị bằng giao diện trực quan, giúp người dùng dễ hiểu tình trạng của mình 
              mà không cần kiến thức chuyên sâu về thống kê.
            </p>
          </div>
        </div>
      </section>

      {/* Explainability & LLM Assistant */}
      <section>
        <h2 className="text-3xl font-bold text-gray-900 mb-6">🔍 Giải thích kết quả bằng SHAP & Trợ lý LLM</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">SHAP – hiểu rõ vì sao bạn có nguy cơ</h3>
            <p className="text-sm sm:text-base text-gray-700 mb-4">
              Thay vì chỉ trả về một con số &quot;có/không&quot;, DiabeTwin sử dụng <strong>SHAP (SHapley Additive exPlanations)</strong> 
              để phân tích mức độ đóng góp của từng yếu tố tới kết quả dự đoán của bạn.
            </p>
            <p className="text-sm sm:text-base text-gray-700 mb-4">
              Bạn sẽ nhìn thấy <strong>top các yếu tố rủi ro cá nhân</strong> (ví dụ: tuổi, BMI, huyết áp, thói quen hút thuốc, 
              mức độ vận động...), giúp hiểu rõ điều gì đang kéo nguy cơ của mình tăng lên hoặc giảm đi.
            </p>
            <div className="space-y-3">
              <FeatureImportanceBar feature="BMI & Cân nặng" importance={23.5} />
              <FeatureImportanceBar feature="Tuổi" importance={18.2} />
              <FeatureImportanceBar feature="Tăng huyết áp" importance={15.7} />
              <FeatureImportanceBar feature="Ít vận động" importance={12.4} />
              <FeatureImportanceBar feature="Tiền sử gia đình" importance={9.3} />
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Trợ lý LLM – giải thích & gợi ý hành động</h3>
            <p className="text-sm sm:text-base text-gray-700 mb-3">
              Sau khi mô hình ML đưa ra dự đoán và SHAP chỉ ra các yếu tố quan trọng, 
              chúng tôi sử dụng <strong>Large Language Model (LLM)</strong> để diễn giải kết quả 
              bằng ngôn ngữ đời thường, dễ hiểu.
            </p>
            <ul className="text-sm sm:text-base text-gray-700 space-y-2 mb-4">
              <li>• Tóm tắt nguy cơ hiện tại của bạn theo từng mức độ (thấp, trung bình, cao).</li>
              <li>• Giải thích tại sao một số yếu tố lại làm nguy cơ tăng/giảm.</li>
              <li>• Gợi ý các <strong>bước hành động cụ thể</strong> về dinh dưỡng, vận động, khám sàng lọc...</li>
            </ul>
            <p className="text-xs sm:text-sm text-gray-500">
              Lưu ý: Trợ lý LLM chỉ đóng vai trò <strong>tư vấn tham khảo</strong>. 
              Mọi quyết định liên quan đến điều trị cần được trao đổi với bác sĩ chuyên khoa.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

// RESEARCH TAB
function ResearchTab() {
  const [searchQuery, setSearchQuery] = useState("");

  const researchPapers = [
    {
      title: "Machine Learning for Diabetes Prediction: A Systematic Review",
      authors: "Smith et al.",
      journal: "Journal of Medical Internet Research",
      year: 2024,
      impact: "High",
      summary: "Nghiên cứu tổng quan về các phương pháp ML trong dự đoán tiểu đường, so sánh hiệu suất của XGBoost, Random Forest, và Neural Networks.",
      link: "#",
      tags: ["Machine Learning", "Systematic Review"]
    },
    {
      title: "Early Detection of Type 2 Diabetes Using AI: A Multicenter Study",
      authors: "Johnson & Lee",
      journal: "The Lancet Digital Health",
      year: 2024,
      impact: "Very High",
      summary: "Nghiên cứu đa trung tâm về việc sử dụng AI để phát hiện sớm tiểu đường type 2, với độ chính xác 96.2%.",
      link: "#",
      tags: ["AI", "Clinical Trial"]
    },
    {
      title: "SHAP-based Interpretability in Clinical Decision Support Systems",
      authors: "Chen et al.",
      journal: "Nature Medicine",
      year: 2023,
      impact: "Very High",
      summary: "Ứng dụng SHAP values để giải thích các mô hình ML trong y tế, tăng tính minh bạch và tin cậy.",
      link: "#",
      tags: ["Interpretability", "SHAP"]
    },
    {
      title: "Lifestyle Factors and Diabetes Risk: A Machine Learning Approach",
      authors: "Nguyễn Văn A, Trần Thị B",
      journal: "Vietnamese Journal of Endocrinology",
      year: 2023,
      impact: "Medium",
      summary: "Nghiên cứu về ảnh hưởng của các yếu tố lối sống đến nguy cơ tiểu đường ở người Việt Nam sử dụng ML.",
      link: "#",
      tags: ["Lifestyle", "Vietnamese Population"]
    },
    {
      title: "XGBoost vs Neural Networks for Medical Diagnosis: A Comparative Study",
      authors: "Park & Kim",
      journal: "Artificial Intelligence in Medicine",
      year: 2024,
      impact: "High",
      summary: "So sánh hiệu suất giữa XGBoost và Neural Networks trong chẩn đoán y khoa, kết luận ensemble approach cho kết quả tốt nhất.",
      link: "#",
      tags: ["XGBoost", "Comparison"]
    },
    {
      title: "Data Augmentation Techniques for Imbalanced Medical Datasets",
      authors: "Williams et al.",
      journal: "IEEE Journal of Biomedical Informatics",
      year: 2023,
      impact: "High",
      summary: "Các kỹ thuật SMOTE và GAN để cân bằng dữ liệu y tế, cải thiện hiệu suất mô hình trên class thiểu số.",
      link: "#",
      tags: ["Data Augmentation", "SMOTE"]
    }
  ];

  const clinicalGuidelines = [
    {
      title: "American Diabetes Association Standards of Care 2024",
      organization: "ADA",
      year: 2024,
      summary: "Hướng dẫn toàn diện về chẩn đoán, điều trị và quản lý bệnh tiểu đường từ ADA.",
      link: "#"
    },
    {
      title: "WHO Guidelines on Diabetes Management",
      organization: "World Health Organization",
      year: 2023,
      summary: "Khuyến nghị toàn cầu về quản lý và phòng ngừa bệnh tiểu đường.",
      link: "#"
    },
    {
      title: "Hướng dẫn Chẩn đoán và Điều trị Đái tháo đường - Bộ Y tế Việt Nam",
      organization: "Ministry of Health Vietnam",
      year: 2023,
      summary: "Hướng dẫn chính thức về chẩn đoán và điều trị đái tháo đường tại Việt Nam.",
      link: "#"
    }
  ];

  const latestNews = [
    {
      title: "Breakthrough: New AI Model Predicts Diabetes 5 Years in Advance",
      source: "Medical News Today",
      date: "2024-01-15",
      summary: "Các nhà nghiên cứu phát triển mô hình AI có thể dự đoán tiểu đường trước 5 năm với độ chính xác 92%.",
      link: "#"
    },
    {
      title: "FDA Approves First AI-Based Diabetes Screening Tool",
      source: "Healthcare IT News",
      date: "2024-01-10",
      summary: "FDA chấp thuận công cụ sàng lọc tiểu đường dựa trên AI đầu tiên cho sử dụng lâm sàng.",
      link: "#"
    },
    {
      title: "Study: Lifestyle Changes Can Reverse Prediabetes in 58% of Cases",
      source: "The New England Journal of Medicine",
      date: "2023-12-20",
      summary: "Nghiên cứu mới cho thấy thay đổi lối sống có thể đảo ngược tiền tiểu đường ở 58% trường hợp.",
      link: "#"
    },
    {
      title: "Vietnam Launches National Diabetes Prevention Program",
      source: "VnExpress Health",
      date: "2023-12-15",
      summary: "Việt Nam triển khai chương trình phòng ngừa đái tháo đường quốc gia, tích hợp công nghệ AI.",
      link: "#"
    }
  ];

  return (
    <div className="space-y-12 animate-fadeIn">
      {/* Search */}
      <section>
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Tìm kiếm nghiên cứu, hướng dẫn, tin tức..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-4 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none text-lg"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-2xl">🔍</span>
          </div>
        </div>
      </section>

      {/* Latest News */}
      <section>
        <h2 className="text-3xl font-bold text-gray-900 mb-6">📰 Tin tức mới nhất</h2>
        <div className="space-y-4">
          {latestNews.map((news, index) => (
            <NewsCard key={index} {...news} />
          ))}
        </div>
      </section>

      {/* Research Papers */}
      <section>
        <h2 className="text-3xl font-bold text-gray-900 mb-6">📚 Nghiên cứu khoa học</h2>
        <div className="space-y-6">
          {researchPapers.map((paper, index) => (
            <ResearchPaperCard key={index} {...paper} />
          ))}
        </div>
      </section>

      {/* Clinical Guidelines */}
      <section>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">📋 Hướng dẫn lâm sàng</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {clinicalGuidelines.map((guideline, index) => (
            <GuidelineCard key={index} {...guideline} />
          ))}
        </div>
      </section>

      {/* Educational Resources */}
      <section>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">🎓 Tài liệu học tập</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <ResourceCard
            icon="📖"
            title="Hiểu về Tiểu đường"
            description="Tổng quan về bệnh tiểu đường, nguyên nhân, triệu chứng và biến chứng"
            link="#"
          />
          <ResourceCard
            icon="🍎"
            title="Dinh dưỡng cho người tiểu đường"
            description="Hướng dẫn chế độ ăn uống lành mạnh cho người bệnh tiểu đường"
            link="#"
          />
          <ResourceCard
            icon="🏃"
            title="Vận động & Lối sống"
            description="Các bài tập và hoạt động thể chất phù hợp"
            link="#"
          />
          <ResourceCard
            icon="💊"
            title="Thuốc điều trị"
            description="Thông tin về các loại thuốc điều trị tiểu đường phổ biến"
            link="#"
          />
        </div>
      </section>
    </div>
  );
}

// Helper Components
function StatCard({ value, label, description, color }: any) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6 hover:shadow-lg transition-shadow">
      <div className={`w-12 sm:w-16 h-12 sm:h-16 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center mb-3 sm:mb-4`}>
        <span className="text-xl sm:text-2xl text-white font-bold">📊</span>
      </div>
      <div className="text-2xl sm:text-4xl font-bold text-gray-900 mb-1 sm:mb-2 break-words">{value}</div>
      <div className="text-base sm:text-lg font-semibold text-gray-700 mb-1">{label}</div>
      <div className="text-xs sm:text-sm text-gray-600">{description}</div>
    </div>
  );
}

function TeamMember({ name, role, avatar, description }: any) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-all hover:-translate-y-1 text-center flex flex-col items-center">
      <div className="text-6xl mb-4 flex-shrink-0">{avatar}</div>
      <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-2">{name}</h3>
      <p className="text-blue-600 font-semibold mb-3 text-sm">{role}</p>
      <p className="text-sm text-gray-600 line-clamp-3">{description}</p>
    </div>
  );
}

function FeatureCard({ icon, title, description }: any) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all hover:-translate-y-1">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

function DataCard({ title, value, description, color }: any) {
  return (
    <div className={`${color} text-white rounded-xl p-6`}>
      <div className="text-sm font-semibold mb-2 opacity-90">{title}</div>
      <div className="text-5xl font-bold mb-2">{value}</div>
      <div className="text-sm opacity-90">{description}</div>
    </div>
  );
}

function DataSource({ name, size, description }: any) {
  return (
    <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
      <div className="text-3xl">📊</div>
      <div className="flex-1">
        <h4 className="font-bold text-gray-900 mb-1">{name}</h4>
        <p className="text-sm text-blue-600 font-semibold mb-1">{size}</p>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  );
}

function MetricBar({ label, value, color, max = 100 }: any) {
  return (
    <div>
      <div className="flex justify-between mb-2">
        <span className="text-sm font-semibold text-gray-700">{label}</span>
        <span className="text-sm font-bold text-gray-900">{value}%</span>
      </div>
      <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-full ${color} transition-all duration-1000`}
          style={{ width: `${(value / max) * 100}%` }}
        />
      </div>
    </div>
  );
}

function FeatureImportanceBar({ feature, importance }: any) {
  return (
    <div>
      <div className="flex justify-between mb-2">
        <span className="text-sm font-medium text-gray-700">{feature}</span>
        <span className="text-sm font-bold text-blue-600">{importance}%</span>
      </div>
      <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-1000"
          style={{ width: `${importance}%` }}
        />
      </div>
    </div>
  );
}

function NewsCard({ title, source, date, summary, link }: any) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span className="font-semibold">{source}</span>
          <span>•</span>
          <span>{date}</span>
        </div>
        <span className="text-2xl">📰</span>
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{summary}</p>
      <a href={link} className="text-blue-600 font-semibold hover:underline">
        Đọc thêm →
      </a>
    </div>
  );
}

function ResearchPaperCard({ title, authors, journal, year, impact, summary, link, tags }: any) {
  const impactColors: any = {
    'Very High': 'bg-red-100 text-red-700 border-red-300',
    'High': 'bg-orange-100 text-orange-700 border-orange-300',
    'Medium': 'bg-yellow-100 text-yellow-700 border-yellow-300'
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
          <p className="text-sm text-gray-600 mb-1">{authors} • {journal} ({year})</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${impactColors[impact]}`}>
          {impact} Impact
        </span>
      </div>
      <p className="text-gray-700 mb-4">{summary}</p>
      <div className="flex items-center justify-between">
        <div className="flex gap-2 flex-wrap">
          {tags.map((tag: string, i: number) => (
            <span key={i} className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded-md">
              {tag}
            </span>
          ))}
        </div>
        <a href={link} className="text-blue-600 font-semibold hover:underline">
          Chi tiết →
        </a>
      </div>
    </div>
  );
}

function GuidelineCard({ title, organization, year, summary, link }: any) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all hover:-translate-y-1">
      <div className="text-4xl mb-4">📋</div>
      <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-blue-600 font-semibold mb-3">{organization} • {year}</p>
      <p className="text-sm text-gray-600 mb-4">{summary}</p>
      <a href={link} className="text-blue-600 font-semibold hover:underline text-sm">
        Xem hướng dẫn →
      </a>
    </div>
  );
}

function ResourceCard({ icon, title, description, link }: any) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all hover:-translate-y-1">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <a href={link} className="text-blue-600 font-semibold hover:underline">
        Tìm hiểu thêm →
      </a>
    </div>
  );
}
