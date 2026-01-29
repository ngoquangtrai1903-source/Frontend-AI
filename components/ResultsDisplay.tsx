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

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  const getRiskColor = (level: string) => {
    switch (level) {
      case "high": return "from-red-500 to-rose-600";
      case "medium": return "from-amber-500 to-orange-600";
      default: return "from-emerald-500 to-teal-600";
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
          gradient="from-blue-500 to-cyan-500"
          delay={0}
        />
        <MetricCard
          title="Conclusion"
          value={results.conclusion}
          gradient={results.conclusion === "DƯƠNG TÍNH" ? "from-red-500 to-rose-600" : "from-emerald-500 to-teal-600"}
          delay={100}
        />
        <MetricCard
          title="Risk Level"
          value={getRiskEmoji(results.riskLevel)}
          gradient={getRiskColor(results.riskLevel)}
          delay={200}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Impact Analysis - 2 columns */}
        <div className="lg:col-span-2 space-y-6">
          {/* Impact List */}
          <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-700/50 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                🧠 Feature Impact (SHAP)
              </h3>
            </div>
            <div className="p-6 space-y-3">
              <p className="text-slate-300 mb-4">
                Top factors influencing your diabetes risk assessment:
              </p>
              
              {significantImpacts.length === 0 ? (
                <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/30">
                  <p className="text-blue-300">
                    ℹ️ All parameters are at safe levels compared to population baseline.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {significantImpacts.map((impact, index) => (
                    <ImpactItem 
                      key={index} 
                      impact={impact} 
                      delay={index * 50}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Charts */}
          <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-700/50 overflow-hidden">
            <div className="bg-gradient-to-r from-cyan-600 to-blue-600 px-6 py-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                📊 Visual Analysis
              </h3>
            </div>
            <div className="p-6">
              <ImpactChart impacts={results.impacts} />
            </div>
          </div>

          {/* Waterfall Chart */}
          <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-700/50 overflow-hidden">
            <div className="bg-gradient-to-r from-violet-600 to-purple-600 px-6 py-4">
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
          <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-700/50 overflow-hidden sticky top-24">
            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                👨‍⚕️ AI Doctor Recommendations
              </h3>
            </div>
            <div className="p-6">
              <div className="space-y-3">
                {results.aiAdvice.split('\n').map((line, index) => (
                  <p key={index} className="text-slate-300 leading-relaxed">
                    {line}
                  </p>
                ))}
              </div>
            </div>
          </div>

          {/* Reset Button */}
          <button
            onClick={onReset}
            className="w-full bg-gradient-to-r from-slate-700 to-slate-600 text-white py-4 rounded-xl font-bold shadow-lg hover:shadow-xl hover:from-slate-600 hover:to-slate-500 transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
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
  gradient, 
  delay 
}: { 
  title: string; 
  value: string; 
  gradient: string;
  delay: number;
}) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), delay);
  }, [delay]);

  return (
    <div 
      className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl shadow-xl border border-slate-700/50 overflow-hidden group hover:shadow-2xl transition-shadow">
        <div className={`bg-gradient-to-r ${gradient} px-6 py-3`}>
          <h4 className="text-white font-semibold text-sm">{title}</h4>
        </div>
        <div className="px-6 py-8">
          <p className="text-4xl font-bold text-slate-100 text-center group-hover:scale-110 transition-transform">
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
          ? 'bg-red-500/10 border-red-500' 
          : 'bg-emerald-500/10 border-emerald-500'
      }`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{isPositive ? '🔴' : '🟢'}</span>
            <div>
              <p className="font-bold text-slate-100">{impact.feature}</p>
              <p className={`text-sm ${isPositive ? 'text-red-400' : 'text-emerald-400'}`}>
                {isPositive ? 'Increases' : 'Reduces'} {Math.abs(val)}% risk
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className={`text-2xl font-bold ${isPositive ? 'text-red-400' : 'text-emerald-400'}`}>
              {isPositive ? '+' : ''}{val}%
            </div>
          </div>
        </div>
        {/* Progress bar */}
        <div className="mt-3 h-2 bg-slate-700 rounded-full overflow-hidden">
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
