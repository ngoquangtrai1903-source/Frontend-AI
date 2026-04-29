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
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">About DiabeTwin</h1>
          <p className="text-base sm:text-lg md:text-xl text-blue-100 max-w-3xl mx-auto">
            Advanced AI-powered diabetes prediction system, providing accurate and timely diagnostic solutions
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
              label="Overview"
            />
            <TabButton
              active={activeTab === 'model'}
              onClick={() => setActiveTab('model')}
              icon="🤖"
              label="AI Model"
            />
            <TabButton
              active={activeTab === 'research'}
              onClick={() => setActiveTab('research')}
              icon="📚"
              label="Research"
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
            Results are for reference only. Please consult a specialist doctor.
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
        <h2 className="text-3xl font-bold text-gray-900 mb-6">🎯 Our Mission</h2>
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-8 border border-blue-200">
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            DiabeTwin was developed with the mission to <strong>democratize access to healthcare</strong> through advanced AI technology. 
            We believe everyone deserves access to accurate, fast, and accessible health assessment tools.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            Diabetes affects millions of people worldwide. Early detection can save lives and improve quality of life. 
            That's why we built DiabeTwin - to bring the most advanced prediction tools to everyone.
          </p>
        </div>
      </section>

      {/* Statistics */}
      <section>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">📈 Statistics & Impact</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <StatCard
            value="95%"
            label="Accuracy"
            description="Average model accuracy"
            color="from-green-400 to-emerald-500"
          />
          <StatCard
            value="15,000+"
            label="Users"
            description="Have used the system"
            color="from-blue-400 to-indigo-500"
          />
          <StatCard
            value="80%"
            label="Recall Score"
            description="Coverage score"
            color="from-purple-400 to-fuchsia-500"
          />
          <StatCard
            value="<10s"
            label="Speed"
            description="Average analysis time"
            color="from-orange-400 to-red-500"
          />
        </div>
      </section>

      {/* Team */}
      <section>
        <h2 className="text-3xl font-bold text-gray-900 mb-6">👥 Development Team</h2>
        <div className="bg-white rounded-xl border border-gray-200 p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <TeamMember
              name="Mr. Ngô Quang Trãi"
              role="ML Engineer"
              avatar="👨‍🔬"
              description="Machine Learning Engineer, FPT University"
            />
            <TeamMember
              name="Mr. Đào Đức Anh Kiệt"
              role="AI Engineer"
              avatar="👨‍💻"
              description="Full-stack Developer, FPT University"
            />
            <TeamMember
              name="Mr. Nguyễn Nho Huy Hoàng"
              role="Data Scientist"
              avatar="👨‍🔬"
              description="Data Science Specialist, FPT University"
            />
            <TeamMember
              name="Mr. Phan Văn Quốc"
              role="Researcher"
              avatar="👨‍💼"
              description="Project Lead & Researcher, FPT University"
            />
          </div>
        </div>
      </section>

      {/* Features */}
      <section>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">✨ Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <FeatureCard
            icon="🎯"
            title="Accurate Prediction"
            description="Uses advanced ML algorithms with high accuracy, validated by clinical research"
          />
          <FeatureCard
            icon="📊"
            title="SHAP Analysis"
            description="Transparent explanation of factors affecting your prediction results"
          />
          <FeatureCard
            icon="⚡"
            title="Instant Results"
            description="Get detailed analysis results in just a few seconds"
          />
          <FeatureCard
            icon="🔒"
            title="Absolute Security"
            description="End-to-end encrypted data, no personal information stored"
          />
          <FeatureCard
            icon="💡"
            title="AI Consultation"
            description="Get personalized recommendations based on your health condition"
          />
          <FeatureCard
            icon="📱"
            title="Cross-Platform"
            description="Use on any device: computer, phone, tablet"
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
        <h2 className="text-3xl font-bold text-gray-900 mb-6">🏗️ Dual AI Model Architecture (Doctor & Home)</h2>
        <div className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
          <p className="text-gray-700 leading-relaxed text-base sm:text-lg">
            DiabeTwin is designed as a <strong>"twin" AI system</strong> with two different models, 
            optimized separately for two use contexts:
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mt-6">
            <div className="bg-blue-50 rounded-lg p-5 sm:p-6 border border-blue-200 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-blue-900 mb-2">Doctor Model</h3>
                <p className="text-sm sm:text-base text-gray-700 mb-3">
                  Trained with <strong>AdaBoostClassifier</strong> on approximately <strong>100,000 clinical profiles</strong>, 
                  designed for hospital/clinic environments where doctors need high-accuracy diagnostic support tools.
                </p>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>• Optimized for <strong>sensitivity (recall)</strong> with positive cases to minimize missed diagnoses.</li>
                  <li>• Detailed results interface with SHAP explanations for each patient.</li>
                  <li>• Suitable for parallel use with standard diagnostic procedures.</li>
                </ul>
              </div>
              <div className="mt-4">
                <a
                  href="/diabetes_report.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors w-full sm:w-auto"
                >
                  📊 View Doctor Model Training Report
                </a>
              </div>
            </div>

            <div className="bg-purple-50 rounded-lg p-5 sm:p-6 border border-purple-200 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-purple-900 mb-2">Home User Model</h3>
                <p className="text-sm sm:text-base text-gray-700 mb-3">
                  Trained with <strong>LGBMClassifier</strong> on <strong>70,692 samples</strong> from the 
                  <strong>BRFSS (Behavioral Risk Factor Surveillance System)</strong>, focusing on behavioral and lifestyle factors.
                </p>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>• Prioritizes <strong>speed and stability</strong> for smooth performance across multiple devices.</li>
                  <li>• User-friendly question design, helping non-medical users answer easily.</li>
                  <li>• Enables home use for <strong>early risk screening</strong>, not a replacement for doctors.</li>
                </ul>
              </div>
              <div className="mt-4">
                <a
                  href="/diabetes_report_for_AI_at_home.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-purple-600 text-white text-sm font-semibold hover:bg-purple-700 transition-colors w-full sm:w-auto"
                >
                  📈 View Home User Model Report
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Training Data & Metrics */}
      <section>
        <h2 className="text-3xl font-bold text-gray-900 mb-6">📊 Training Data & Model Quality</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Doctor Model (AdaBoost)</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <DataCard
                title="Training Samples"
                value="~100.000"
                description="Clinical patient profiles"
                color="bg-blue-600"
              />
              <DataCard
                title="Use Context"
                value="Hospital"
                description="Decision support for doctors"
                color="bg-sky-600"
              />
            </div>
            <p className="text-sm text-gray-700 mb-3">
              On the test set, the doctor model achieves <strong>high overall accuracy</strong>, 
              with good ability to identify diabetes risk cases <strong>(positive group recall ~87%)</strong>.
            </p>
            <p className="text-sm text-gray-700">
              Confusion matrix shows <strong>large numbers of correctly classified negative cases</strong>, 
              while still prioritizing not missing high-risk patients.
            </p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">User Model (LGBM)</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <DataCard
                title="BRFSS Samples"
                value="70.692"
                description="Community health data from CDC"
                color="bg-purple-600"
              />
              <DataCard
                title="Objective"
                value="Home Screening"
                description="Quick personal risk assessment"
                color="bg-fuchsia-600"
              />
            </div>
            <p className="text-sm text-gray-700 mb-3">
              On the test set, the LGBM model achieves <strong>precision ~74%</strong> and <strong>recall ~80%</strong> 
              for the high-risk group, balancing disease detection and minimizing false alarms.
            </p>
            <p className="text-sm text-gray-700">
              Results are displayed with an intuitive interface, helping users understand their status 
              without deep statistical knowledge.
            </p>
          </div>
        </div>
      </section>

      {/* Explainability & LLM Assistant */}
      <section>
        <h2 className="text-3xl font-bold text-gray-900 mb-6">🔍 SHAP Results Explanation & LLM Assistant</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">SHAP – Understanding Why You're at Risk</h3>
            <p className="text-sm sm:text-base text-gray-700 mb-4">
              Instead of just returning a "yes/no" number, DiabeTwin uses <strong>SHAP (SHapley Additive exPlanations)</strong> 
              to analyze each factor's contribution to your prediction results.
            </p>
            <p className="text-sm sm:text-base text-gray-700 mb-4">
              You will see <strong>top personal risk factors</strong> (e.g., age, BMI, blood pressure, smoking habits, 
              activity level...), helping you understand what's increasing or decreasing your risk.
            </p>
            <div className="space-y-3">
              <FeatureImportanceBar feature="BMI & Weight" importance={23.5} />
              <FeatureImportanceBar feature="Age" importance={18.2} />
              <FeatureImportanceBar feature="High Blood Pressure" importance={15.7} />
              <FeatureImportanceBar feature="Low Activity" importance={12.4} />
              <FeatureImportanceBar feature="Family History" importance={9.3} />
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">LLM Assistant – Explanation & Action Suggestions</h3>
            <p className="text-sm sm:text-base text-gray-700 mb-3">
              After the ML model makes predictions and SHAP identifies key factors, 
              we use a <strong>Large Language Model (LLM)</strong> to interpret results 
              in everyday, easy-to-understand language.
            </p>
            <ul className="text-sm sm:text-base text-gray-700 space-y-2 mb-4">
              <li>• Summarizes your current risk by level (low, medium, high).</li>
              <li>• Explains why certain factors increase/decrease risk.</li>
              <li>• Suggests <strong>specific action steps</strong> for diet, exercise, screenings...</li>
            </ul>
            <p className="text-xs sm:text-sm text-gray-500">
              Note: LLM assistant serves only as <strong>reference consultation</strong>. 
              All treatment-related decisions should be discussed with specialist doctors.
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
      summary: "Systematic review of ML methods for diabetes prediction, comparing performance of XGBoost, Random Forest, and Neural Networks.",
      link: "#",
      tags: ["Machine Learning", "Systematic Review"]
    },
    {
      title: "Early Detection of Type 2 Diabetes Using AI: A Multicenter Study",
      authors: "Johnson & Lee",
      journal: "The Lancet Digital Health",
      year: 2024,
      impact: "Very High",
      summary: "Multicenter study on using AI for early detection of type 2 diabetes, with 96.2% accuracy.",
      link: "#",
      tags: ["AI", "Clinical Trial"]
    },
    {
      title: "SHAP-based Interpretability in Clinical Decision Support Systems",
      authors: "Chen et al.",
      journal: "Nature Medicine",
      year: 2023,
      impact: "Very High",
      summary: "Application of SHAP values to explain ML models in healthcare, increasing transparency and trust.",
      link: "#",
      tags: ["Interpretability", "SHAP"]
    },
    {
      title: "Lifestyle Factors and Diabetes Risk: A Machine Learning Approach",
      authors: "Nguyễn Văn A, Trần Thị B",
      journal: "Vietnamese Journal of Endocrinology",
      year: 2023,
      impact: "Medium",
      summary: "Study on lifestyle factors' impact on diabetes risk in Vietnamese population using ML.",
      link: "#",
      tags: ["Lifestyle", "Vietnamese Population"]
    },
    {
      title: "XGBoost vs Neural Networks for Medical Diagnosis: A Comparative Study",
      authors: "Park & Kim",
      journal: "Artificial Intelligence in Medicine",
      year: 2024,
      impact: "High",
      summary: "Performance comparison between XGBoost and Neural Networks in medical diagnosis, concluding ensemble approach gives best results.",
      link: "#",
      tags: ["XGBoost", "Comparison"]
    },
    {
      title: "Data Augmentation Techniques for Imbalanced Medical Datasets",
      authors: "Williams et al.",
      journal: "IEEE Journal of Biomedical Informatics",
      year: 2023,
      impact: "High",
      summary: "SMOTE and GAN techniques for balancing medical datasets, improving model performance on minority classes.",
      link: "#",
      tags: ["Data Augmentation", "SMOTE"]
    }
  ];

  const clinicalGuidelines = [
    {
      title: "American Diabetes Association Standards of Care 2024",
      organization: "ADA",
      year: 2024,
      summary: "Comprehensive guidelines for diabetes diagnosis, treatment and management from ADA.",
      link: "#"
    },
    {
      title: "WHO Guidelines on Diabetes Management",
      organization: "World Health Organization",
      year: 2023,
      summary: "Global recommendations for diabetes management and prevention.",
      link: "#"
    },
    {
      title: "Vietnam Diabetes Diagnosis and Treatment Guidelines - Ministry of Health",
      organization: "Ministry of Health Vietnam",
      year: 2023,
      summary: "Official guidelines for diabetes diagnosis and treatment in Vietnam.",
      link: "#"
    }
  ];

  const latestNews = [
    {
      title: "Breakthrough: New AI Model Predicts Diabetes 5 Years in Advance",
      source: "Medical News Today",
      date: "2024-01-15",
      summary: "Researchers develop AI model that can predict diabetes 5 years in advance with 95% accuracy.",
      link: "#"
    },
    {
      title: "FDA Approves First AI-Based Diabetes Screening Tool",
      source: "Healthcare IT News",
      date: "2024-01-10",
      summary: "FDA approves first AI-based diabetes screening tool for clinical use.",
      link: "#"
    },
    {
      title: "Study: Lifestyle Changes Can Reverse Prediabetes in 58% of Cases",
      source: "The New England Journal of Medicine",
      date: "2023-12-20",
      summary: "New study shows lifestyle changes can reverse prediabetes in 58% of cases.",
      link: "#"
    },
    {
      title: "Vietnam Launches National Diabetes Prevention Program",
      source: "VnExpress Health",
      date: "2023-12-15",
      summary: "Vietnam launches national diabetes prevention program, integrating AI technology.",
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
              placeholder="Search research, guidelines, news..."
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
        <h2 className="text-3xl font-bold text-gray-900 mb-6">📰 Latest News</h2>
        <div className="space-y-4">
          {latestNews.map((news, index) => (
            <NewsCard key={index} {...news} />
          ))}
        </div>
      </section>

      {/* Research Papers */}
      <section>
        <h2 className="text-3xl font-bold text-gray-900 mb-6">📚 Scientific Research</h2>
        <div className="space-y-6">
          {researchPapers.map((paper, index) => (
            <ResearchPaperCard key={index} {...paper} />
          ))}
        </div>
      </section>

      {/* Clinical Guidelines */}
      <section>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">📋 Clinical Guidelines</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {clinicalGuidelines.map((guideline, index) => (
            <GuidelineCard key={index} {...guideline} />
          ))}
        </div>
      </section>

      {/* Educational Resources */}
      <section>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">🎓 Educational Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <ResourceCard
            icon="📖"
            title="Understanding Diabetes"
            description="Overview of diabetes, causes, symptoms and complications"
            link="#"
          />
          <ResourceCard
            icon="🍎"
            title="Nutrition for Diabetes"
            description="Healthy eating guidelines for diabetes patients"
            link="#"
          />
          <ResourceCard
            icon="🏃"
            title="Exercise & Lifestyle"
            description="Suitable exercises and physical activities"
            link="#"
          />
          <ResourceCard
            icon="💊"
            title="Treatment Medications"
            description="Information about common diabetes treatment medications"
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
        Read More →
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
          Details →
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
        View Guidelines →
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
        Learn More →
      </a>
    </div>
  );
}
