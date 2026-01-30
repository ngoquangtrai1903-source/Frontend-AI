"use client";

import { useEffect, useState } from "react";
import { ImpactChart } from "./ImpactChart";
import { WaterfallChart } from "./WaterfallChart";

interface ResultsDisplayProps {
  results: {
    probability: number;
    conclusion: string;
    riskLevel: "low" | "medium" | "high";
    impacts: Array<{ feature: string; impact: number }>;
    aiAdvice: string;
  };
  onReset: () => void;
}

export function ResultsDisplay({ results, onReset }: ResultsDisplayProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  if (!mounted) {
    return (
      <div className="space-y-6">
        <div className="h-64 bg-gray-100 rounded-lg animate-pulse"></div>
      </div>
    );
  }

  const getRiskColor = (level: string) => {
    switch (level) {
      case "high": return "bg-red-600";
      case "medium": return "bg-yellow-600";
      default: return "bg-green-600";
    }
  };

  const getRiskEmoji = (level: string) => {
    switch (level) {
      case "high": return "🔴";
      case "medium": return "🟡";
      default: return "🟢";
    }
  };

  const significantImpacts = results.impacts.filter(
    impact => Math.abs(impact.impact) > 0.01
  );

  return (
    <div className={`space-y-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
      {/* Metrics Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        <MetricCard
          title="Risk Probability"
          value={`${(results.probability * 100).toFixed(1)}%`}
          color="bg-blue-600"
          delay={0}
        />
        <MetricCard
          title="Conclusion"
          value={results.conclusion}
          color={results.conclusion === "DƯƠNG TÍNH" ? "bg-red-600" : "bg-green-600"}
          delay={100}
        />
        <MetricCard
          title="Risk Level"
          value={getRiskEmoji(results.riskLevel)}
          color={getRiskColor(results.riskLevel)}
          delay={200}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Impact Analysis - 2 columns */}
        <div className="lg:col-span-2 space-y-6">
          {/* Impact List */}
          <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
            <div className="bg-blue-600 px-6 py-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                🧠 Feature Impact (SHAP)
              </h3>
            </div>
            <div className="p-6 space-y-3">
              <p className="text-gray-700 mb-4">
                Top factors influencing your diabetes risk assessment:
              </p>
              
              {significantImpacts.length === 0 ? (
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-blue-700">
                    ℹ️ All parameters are at safe levels compared to population baseline.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {significantImpacts.map((impact, index) => (
                    <ImpactItem 
                      key={`${impact.feature}-${index}`}
                      impact={impact} 
                      delay={index * 50}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Charts */}
          <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
            <div className="bg-green-600 px-6 py-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                📊 Visual Analysis
              </h3>
            </div>
            <div className="p-6">
              <ImpactChart impacts={results.impacts} />
            </div>
          </div>

          {/* Waterfall Chart */}
          <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
            <div className="bg-orange-600 px-6 py-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                📈 Waterfall Analysis
              </h3>
            </div>
            <div className="p-6">
              <WaterfallChart impacts={results.impacts} />
            </div>
          </div>
        </div>

        {/* AI Advice - 1 column */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden sticky top-24">
            <div className="bg-purple-600 px-6 py-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                👨‍⚕️ AI Doctor Recommendations
              </h3>
            </div>
            <div className="p-6">
              <div className="space-y-3">
                {results.aiAdvice.split('\n').map((line, index) => (
                  <p key={`advice-${index}`} className="text-gray-700 leading-relaxed">
                    {line}
                  </p>
                ))}
              </div>
            </div>
          </div>

          {/* Reset Button */}
          <button
            onClick={onReset}
            className="w-full bg-gray-600 text-white py-4 rounded-lg font-bold shadow-md hover:bg-gray-700 transition-colors flex items-center justify-center gap-2"
          >
            🔄 New Analysis
          </button>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ 
  title, 
  value, 
  color, 
  delay 
}: { 
  title: string; 
  value: string; 
  color: string;
  delay: number;
}) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), delay);
  }, [delay]);

  return (
    <div 
      className={`transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden group hover:shadow-lg transition-shadow">
        <div className={`${color} px-6 py-3`}>
          <h4 className="text-white font-semibold text-sm">{title}</h4>
        </div>
        <div className="px-6 py-8">
          <p className="text-4xl font-bold text-gray-900 text-center group-hover:scale-110 transition-transform">
            {value}
          </p>
        </div>
      </div>
    </div>
  );
}

function ImpactItem({ 
  impact, 
  delay 
}: { 
  impact: { feature: string; impact: number };
  delay: number;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const val = Math.round(impact.impact * 100) / 100;
  const isPositive = val > 0;

  useEffect(() => {
    setTimeout(() => setIsVisible(true), delay);
  }, [delay]);

  return (
    <div 
      className={`transition-all duration-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}
    >
      <div className={`p-4 rounded-lg border-l-4 ${
        isPositive 
          ? 'bg-red-50 border-red-400' 
          : 'bg-green-50 border-green-400'
      }`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{isPositive ? '🔴' : '🟢'}</span>
            <div>
              <p className="font-bold text-gray-900">{impact.feature}</p>
              <p className={`text-sm ${isPositive ? 'text-red-700' : 'text-green-700'}`}>
                {isPositive ? 'Increases' : 'Reduces'} {Math.abs(val)}% risk
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className={`text-2xl font-bold ${isPositive ? 'text-red-700' : 'text-green-700'}`}>
              {isPositive ? '+' : ''}{val}%
            </div>
          </div>
        </div>
        {/* Progress bar */}
        <div className="mt-3 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className={`h-full ${isPositive ? 'bg-red-500' : 'bg-emerald-500'} transition-all duration-1000`}
            style={{ 
              width: `${Math.min(Math.abs(val) * 5, 100)}%`,
              transitionDelay: `${delay}ms`
            }}
          />
        </div>
      </div>
    </div>
  );
}