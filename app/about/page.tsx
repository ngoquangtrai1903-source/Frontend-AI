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
              with good ability to identify diabetes risk cases <strong>(positive group recall 80%)</strong>.
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
      title: "IDF Diabetes Atlas, 10th ed.",
      authors: "International Diabetes Federation",
      journal: "International Diabetes Federation",
      year: 2021,
      impact: "Very High",
      summary: "Comprehensive global diabetes statistics and epidemiological data from the International Diabetes Federation.",
      link: "https://diabetesatlas.org/data-by-location/global/",
      tags: ["Epidemiology", "Global Statistics", "Diabetes Atlas"]
    },
    {
      title: "Diabetes",
      authors: "World Health Organization",
      journal: "WHO Fact Sheets",
      year: 2023,
      impact: "Very High",
      summary: "WHO fact sheet providing essential information about diabetes, its types, complications, and global burden.",
      link: "https://www.who.int/news-room/fact-sheets/detail/diabetes",
      tags: ["WHO", "Fact Sheet", "Public Health"]
    },
    {
      title: "Heart disease and stroke statistics---2000 update",
      authors: "American Heart Association",
      journal: "Circulation",
      volume: "100",
      number: "10",
      pages: "1134--1146",
      year: 1999,
      impact: "High",
      summary: "Comprehensive statistics on heart disease and stroke, including diabetes-related cardiovascular complications.",
      link: "https://www.ahajournals.org/doi/full/10.1161/01.CIR.100.10.1134",
      tags: ["Cardiovascular", "Statistics", "Complications"]
    },
    {
      title: "Kidney failure and diabetes",
      authors: "Centers for Disease Control and Prevention",
      journal: "CDC",
      year: 2023,
      impact: "High",
      summary: "CDC report on the relationship between diabetes and kidney failure, including prevention strategies.",
      link: "https://www.cdc.gov/diabetes/data-research/research/kidney-failure-diabetes.html",
      tags: ["Kidney Disease", "Complications", "CDC"]
    },
    {
      title: "Promoting diabetic retinopathy screening",
      authors: "World Health Organization Regional Office for Europe",
      journal: "WHO Europe",
      year: 2024,
      impact: "High",
      summary: "WHO Europe initiative to promote screening for diabetic retinopathy, a major diabetes complication.",
      link: "https://www.who.int/europe/activities/promoting-diabetic-retinopathy-screening",
      tags: ["Retinopathy", "Screening", "WHO Europe"]
    },
    {
      title: "Global Report on Effective Access to Assistive Technology",
      authors: "World Health Organization",
      journal: "World Health Organization",
      year: 2022,
      impact: "Very High",
      summary: "WHO global report on access to assistive technology, including devices for diabetes management.",
      link: "https://iris.who.int/server/api/core/bitstreams/1f4d4a08-b20d-4c36-9148-a59429ac3477/content",
      tags: ["Assistive Technology", "Global Health", "WHO"]
    },
    {
      title: "The growing burden of diabetes in Viet Nam",
      authors: "World Health Organization",
      journal: "World Health Organization",
      year: 2024,
      impact: "High",
      summary: "WHO report on the increasing diabetes burden in Vietnam, including epidemiological trends and challenges.",
      link: "https://www.who.int/vietnam/news/feature-stories/detail/the-growing-burden-of-diabetes-in-viet-nam",
      tags: ["Vietnam", "Epidemiology", "Burden"]
    },
    {
      title: "What clinicians want: contextualizing explainable machine learning for clinical end use",
      authors: "S. Tonekaboni, S. Joshi, K. D. McCradden, A. Goldenberg",
      journal: "Proceedings of Machine Learning Research",
      volume: "106",
      year: 2019,
      impact: "Very High",
      summary: "Research on clinicians' needs for explainable AI in clinical settings, focusing on practical implementation.",
      link: "https://proceedings.mlr.press/v106/tonekaboni19a.html",
      tags: ["Explainable AI", "Clinical", "Machine Learning"]
    },
    {
      title: "Assessment of machine learning algorithms to detect early disease outcomes",
      authors: "R. A. Calvert and others",
      journal: "BMC Medicine",
      volume: "17",
      number: "1",
      pages: "142",
      year: 2019,
      impact: "Very High",
      summary: "Comprehensive assessment of ML algorithms for early disease detection, including diabetes outcomes.",
      link: "https://doi.org/10.1186/s12916-019-1426-2",
      tags: ["Machine Learning", "Early Detection", "Algorithm Assessment"]
    },
    {
      title: "Machine learning algorithm-based prediction of diabetes among female population using PIMA dataset",
      authors: "A. Ahmed and others",
      journal: "Healthcare",
      volume: "13",
      number: "1",
      pages: "37",
      year: 2025,
      impact: "High",
      summary: "ML-based diabetes prediction specifically for female population using the PIMA Indian diabetes dataset.",
      link: "https://doi.org/10.3390/healthcare13010037",
      tags: ["PIMA Dataset", "Female Population", "Prediction"]
    },
    {
      title: "Machine learning tools for long-term type 2 diabetes risk prediction",
      authors: "N. Fazakis, O. Kocsis, E. Dritsas, S. Alexiou, N. Fakotakis, K. Moustakas",
      journal: "IEEE Access",
      volume: "9",
      pages: "103737--103757",
      year: 2021,
      impact: "Very High",
      summary: "Development and evaluation of ML tools for long-term type 2 diabetes risk prediction.",
      link: "https://doi.org/10.1109/ACCESS.2021.3098691",
      tags: ["Type 2 Diabetes", "Long-term Prediction", "IEEE Access"]
    },
    {
      title: "Diabetes prediction using machine learning and explainable AI techniques",
      authors: "I. Tasin, T. U. Nabil, S. Islam, R. Khan",
      journal: "Healthcare Technology Letters",
      volume: "10",
      number: "1-2",
      pages: "1--10",
      year: 2022,
      impact: "High",
      summary: "Integration of machine learning and explainable AI techniques for diabetes prediction and interpretation.",
      link: "https://doi.org/10.1049/htl2.12039",
      tags: ["Explainable AI", "Machine Learning", "Interpretation"]
    },
    {
      title: "High-performance medicine: convergence of human and artificial intelligence",
      authors: "E. J. Topol",
      journal: "Nature Medicine",
      volume: "25",
      pages: "44--56",
      year: 2019,
      impact: "Very High",
      summary: "Vision for the convergence of human expertise and AI in high-performance medicine, including diabetes care.",
      link: "https://www.nature.com/articles/s41591-018-0300-7",
      tags: ["AI Convergence", "High-performance Medicine", "Future Medicine"]
    },
    {
      title: "Using big data-machine learning models for diabetes prediction",
      authors: "T. Nibareke, J. Laassiri",
      journal: "Journal of Big Data",
      year: 2020,
      impact: "High",
      summary: "Application of big data and machine learning models for diabetes prediction using large-scale datasets.",
      link: "https://journalofbigdata.springeropen.com/articles/10.1186/s40537-020-00355-0",
      tags: ["Big Data", "Machine Learning", "Large-scale"]
    },
    {
      title: "A bimodal dataset for diabetes research",
      authors: "J. Li and others",
      journal: "Scientific Data",
      year: 2026,
      impact: "Very High",
      summary: "Novel bimodal dataset specifically designed for comprehensive diabetes research applications.",
      link: "https://www.nature.com/articles/s41597-026-06923-y",
      tags: ["Dataset", "Bimodal", "Research"]
    },
    {
      title: "Large language models encode clinical knowledge",
      authors: "K. Singhal and others",
      journal: "Nature",
      volume: "620",
      pages: "172--180",
      year: 2023,
      impact: "Very High",
      summary: "Demonstration of how large language models can encode and apply clinical medical knowledge.",
      link: "https://www.nature.com/articles/s41586-023-06291-2",
      tags: ["Large Language Models", "Clinical Knowledge", "AI"]
    },
    {
      title: "The utilization of machine learning algorithms for assisting physicians in diagnosis of diabetes",
      authors: "L. P. Nguyen and others",
      journal: "Diagnostics",
      volume: "13",
      number: "12",
      pages: "2087",
      year: 2023,
      impact: "High",
      summary: "Machine learning algorithms designed to assist physicians in diabetes diagnosis and decision-making.",
      link: "https://doi.org/10.3390/diagnostics13122087",
      tags: ["Physician Assistance", "Diagnosis", "Clinical Decision Support"]
    },
    {
      title: "Prediction of Diabetes Using Machine Learning: Analysis of 70,000 Clinical Database Patient Record",
      authors: "S. M. Kuriakose, A. S. Nair, R. S. Kumar, P. V. S. Nair",
      journal: "IEEE International Conference on Computing, Communication and Networking Technologies (ICCCNT)",
      year: 2022,
      impact: "High",
      summary: "Large-scale study using 70,000 clinical patient records for diabetes prediction using machine learning.",
      link: "https://ieeexplore.ieee.org/document/9984264",
      tags: ["Large Dataset", "Clinical Records", "IEEE Conference"]
    },
    {
      title: "Retrieval-augmented generation for knowledge-intensive NLP tasks",
      authors: "P. Lewis and others",
      journal: "Advances in Neural Information Processing Systems (NeurIPS)",
      year: 2020,
      impact: "Very High",
      summary: "RAG framework for enhancing language models with external knowledge retrieval, applicable to medical AI systems.",
      link: "https://papers.nips.cc/paper/2020/hash/6b493230205f780e1bc26945df7481e5-Abstract.html",
      tags: ["RAG", "Knowledge Retrieval", "NeurIPS"]
    },
    {
      title: "GatorTron: A large clinical language model to unlock patient information from electronic health records",
      authors: "Y. Yang and others",
      journal: "npj Digital Medicine",
      volume: "5",
      year: 2022,
      impact: "Very High",
      summary: "Large clinical language model specifically designed for processing electronic health records and patient information.",
      link: "https://www.nature.com/articles/s41746-022-00742-2",
      tags: ["Clinical Language Model", "EHR", "GatorTron"]
    }
  ];

  // Filter research papers based on search query
  const filteredPapers = researchPapers.filter(paper => {
    const searchLower = searchQuery.toLowerCase();
    return (
      paper.title.toLowerCase().includes(searchLower) ||
      paper.authors.toLowerCase().includes(searchLower) ||
      paper.journal.toLowerCase().includes(searchLower) ||
      paper.summary.toLowerCase().includes(searchLower) ||
      paper.tags.some(tag => tag.toLowerCase().includes(searchLower))
    );
  });

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

  return (
    <div className="space-y-12 animate-fadeIn">
      {/* Search */}
      <section>
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Search research papers and guidelines..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-4 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none text-lg"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-2xl">🔍</span>
          </div>
        </div>
      </section>

      {/* Research Papers */}
      <section>
        <h2 className="text-3xl font-bold text-gray-900 mb-6">📚 Scientific Research</h2>
        <div className="space-y-6">
          {filteredPapers.map((paper, index) => (
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
