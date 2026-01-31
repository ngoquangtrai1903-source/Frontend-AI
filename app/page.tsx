"use client";

import { Navigation } from "@/components/Navigation";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-50 py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="inline-block px-5 py-2 bg-blue-100 border border-blue-300 rounded-lg mb-6">
            <p className="text-blue-700 text-sm font-semibold">AI-Powered Health Assessment</p>
          </div>
          <h1 className="text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Diabetes Risk Assessment
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
            Get personalized insights about your diabetes risk using advanced AI technology. Fast, accurate, and secure.
          </p>
          <div className="flex gap-4 justify-center">
            <a href="/user-prediction" className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-md">
              Check My Risk
            </a>
            <a href="/doctor" className="px-8 py-3 bg-gray-100 border border-gray-300 text-gray-900 font-semibold rounded-lg hover:bg-gray-200 transition-colors">
              Doctor Portal
            </a>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-14">Why Choose DiabeTwin?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon="⚡"
              title="Fast Results"
              description="Get instant analysis in seconds with our advanced AI model."
            />
            <FeatureCard
              icon="🎯"
              title="Accurate"
              description="Industry-leading accuracy based on medical research and clinical validation."
            />
            <FeatureCard
              icon="🔒"
              title="Secure"
              description="Your health data is encrypted and never shared with third parties."
            />
            <FeatureCard
              icon="📊"
              title="Transparent"
              description="Understand why through SHAP-based explanations of AI predictions."
            />
            <FeatureCard
              icon="💡"
              title="Personalized"
              description="Receive customized recommendations based on your health profile."
            />
            <FeatureCard
              icon="📱"
              title="Multi-Platform"
              description="Use on any device: computer, phone, or tablet anytime, anywhere."
            />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-14">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-6">
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
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-14">Our Impact</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <StatBox value="95.3%" label="Accuracy" description="State-of-the-art model" />
            <StatBox value="15K+" label="Users" description="Trusting DiabeTwin" />
            <StatBox value="98.7%" label="AUC Score" description="Clinical validation" />
            <StatBox value="<2s" label="Speed" description="Average analysis time" />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 py-16">
        <div className="max-w-4xl mx-auto px-6 text-center text-white">
          <h2 className="text-4xl font-bold mb-6">Ready to Check Your Risk?</h2>
          <p className="text-xl text-blue-100 mb-10">Start your diabetes risk assessment today with our advanced AI system.</p>
          <div className="flex gap-4 justify-center">
            <a href="/user-prediction" className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors">
              Get Started Now
            </a>
            <a href="/about" className="px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-blue-800 transition-colors">
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-6 text-center text-gray-600">
          <p>© 2026 DiabeTwin - AI-Powered Health Assessment</p>
          <p className="text-sm mt-2">Results are for reference only. Consult healthcare professionals for medical advice.</p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-8 hover:shadow-lg transition-shadow text-center">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

function StepCard({ number, title, description }: { number: string; title: string; description: string }) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg mb-4 mx-auto">
        {number}
      </div>
      <h3 className="text-lg font-bold text-gray-900 text-center mb-2">{title}</h3>
      <p className="text-gray-600 text-center text-sm">{description}</p>
    </div>
  );
}

function StatBox({ value, label, description }: { value: string; label: string; description: string }) {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-200 p-8 text-center">
      <div className="text-4xl font-bold text-blue-600 mb-2">{value}</div>
      <div className="text-lg font-semibold text-gray-900 mb-1">{label}</div>
      <div className="text-sm text-gray-600">{description}</div>
    </div>
  );
}
