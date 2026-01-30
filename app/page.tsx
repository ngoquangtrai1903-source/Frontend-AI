"use client";

import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { ResultsDisplay } from "@/components/ResultsDisplay";
import { PatientForm } from "@/components/PatientForm";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <div className="inline-block px-5 py-2 bg-blue-50 border border-blue-200 rounded-md mb-6">
            <p className="text-blue-700 text-sm font-semibold">AI-Powered Health Assessment</p>
          </div>
          <h1 className="text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Diabetes Risk Assessment
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Get personalized insights about your diabetes risk using advanced AI technology. Fast, accurate, and secure.
          </p>
          <div className="flex gap-4 justify-center">
            <a href="/user-prediction" className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors">
              Check My Risk
            </a>
            <a href="/doctor" className="px-8 py-3 bg-gray-100 border border-gray-300 text-gray-900 font-semibold rounded-md hover:bg-gray-200 transition-colors">
              Doctor Portal
            </a>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mt-20">
          <div className="p-6 bg-gray-50 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="text-3xl mb-4">⚡</div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Fast Results</h3>
            <p className="text-gray-600">Get instant analysis in seconds with our advanced AI model.</p>
          </div>
          <div className="p-6 bg-gray-50 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="text-3xl mb-4">🎯</div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Accurate</h3>
            <p className="text-gray-600">Industry-leading accuracy based on medical research.</p>
          </div>
          <div className="p-6 bg-gray-50 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="text-3xl mb-4">🔒</div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Secure</h3>
            <p className="text-gray-600">Your health data is encrypted and never shared.</p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-20 border-t border-gray-200 bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-6 text-center text-gray-600">
          <p>© 2026 DiabeTwin - AI-Powered Health Assessment</p>
          <p className="text-sm mt-2">Results are for reference only. Consult healthcare professionals for medical advice.</p>
        </div>
      </footer>
    </div>
  );
}