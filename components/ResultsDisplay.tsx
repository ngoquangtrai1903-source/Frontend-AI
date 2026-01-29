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
      case "high": return "from-red-500 to-rose-500";
      case "medium": return "from-yellow-500 to-amber-500";
      default: return "from-green-500 to-emerald-500";
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
          title="Xác suất mắc bệnh"
          value={`${(results.probability * 100).toFixed(1)}%`}
          gradient="from-blue-500 to-indigo-500"
          delay={0}
        />
        <MetricCard
          title="Kết luận"
          value={results.conclusion}
          gradient={results.conclusion === "DƯƠNG TÍNH" ? "from-red-500 to-rose-500" : "from-green-500 to-emerald-500"}
          delay={100}
        />
        <MetricCard
          title="Mức độ rủi ro"
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
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-emerald-100 overflow-hidden">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                🧠 Giải mã các con số (SHAP)
              </h3>
            </div>
            <div className="p-6 space-y-3">
              <p className="text-gray-600 mb-4">
                Các chỉ số có tác động đáng kể nhất đến nguy cơ của bạn:
              </p>
              
              {significantImpacts.length === 0 ? (
                <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                  <p className="text-blue-700">
                    ℹ️ Các chỉ số của bạn đều ở mức ổn định so với trung bình cộng đồng.
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
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-emerald-100 overflow-hidden">
            <div className="bg-gradient-to-r from-cyan-500 to-blue-500 px-6 py-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                📊 Phân tích trực quan
              </h3>
            </div>
            <div className="p-6">
              <ImpactChart impacts={results.impacts} />
            </div>
          </div>

          {/* Waterfall Chart */}
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-emerald-100 overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-500 px-6 py-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                📈 Biểu đồ Waterfall
              </h3>
            </div>
            <div className="p-6">
              <WaterfallChart impacts={results.impacts} />
            </div>
          </div>
        </div>

        {/* AI Advice - 1 column */}
        <div className="space-y-6">
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-emerald-100 overflow-hidden sticky top-24">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-500 px-6 py-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                👨‍⚕️ Lời khuyên từ Bác sĩ AI
              </h3>
            </div>
            <div className="p-6">
              <div className="prose prose-sm max-w-none">
                {results.aiAdvice.split('\n').map((line, index) => (
                  <p key={index} className="mb-3 text-gray-700 leading-relaxed">
                    {line}
                  </p>
                ))}
              </div>
            </div>
          </div>

          {/* Reset Button */}
          <button
            onClick={onReset}
            className="w-full bg-gradient-to-r from-gray-600 to-gray-700 text-white py-4 rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
          >
            🔄 Phân tích mới
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
      <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200 overflow-hidden group hover:shadow-2xl transition-shadow">
        <div className={`bg-gradient-to-r ${gradient} px-6 py-3`}>
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
      <div className={`p-4 rounded-xl border-l-4 ${
        isPositive 
          ? 'bg-red-50 border-red-500' 
          : 'bg-green-50 border-green-500'
      }`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{isPositive ? '🔴' : '🟢'}</span>
            <div>
              <p className="font-bold text-gray-900">{impact.feature}</p>
              <p className={`text-sm ${isPositive ? 'text-red-700' : 'text-green-700'}`}>
                {isPositive ? 'Làm tăng' : 'Giúp giảm'} {Math.abs(val)}% nguy cơ
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className={`text-2xl font-bold ${isPositive ? 'text-red-600' : 'text-green-600'}`}>
              {isPositive ? '+' : ''}{val}%
            </div>
          </div>
        </div>
        {/* Progress bar */}
        <div className="mt-3 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className={`h-full ${isPositive ? 'bg-red-500' : 'bg-green-500'} transition-all duration-1000`}
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
