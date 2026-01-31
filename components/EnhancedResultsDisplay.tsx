'use client';

import { useEffect, useState } from 'react';
import { RiskGaugeChart } from './charts/RiskGaugeChart';
import { FeatureImpactChart } from './charts/FeatureImpactChart';
import { RiskLevelCard } from './cards/RiskLevelCard';
import { RecommendationsPanel } from './cards/RecommendationsPanel';
import { FactorsOverview } from './cards/FactorsOverview';

interface EnhancedResultsDisplayProps {
  results: {
    probability: number;
    conclusion: string;
    riskLevel: 'low' | 'medium' | 'high';
    impacts: Array<{ feature: string; impact: number }>;
    aiAdvice: string;
  };
  onReset: () => void;
  isDoctorMode?: boolean;
}

export function EnhancedResultsDisplay({
  results,
  onReset,
  isDoctorMode = false,
}: EnhancedResultsDisplayProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  const getRiskEmoji = (level: string) => {
    switch (level) {
      case 'high':
        return '⚠️';
      case 'medium':
        return '⚡';
      default:
        return '✅';
    }
  };

  const topImpacts = [...results.impacts]
    .sort((a, b) => Math.abs(b.impact) - Math.abs(a.impact))
    .slice(0, 8);

  return (
    <div
      className={`transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      {/* Hero Section */}
      <div className="mb-8">
        <div
          className={`rounded-2xl shadow-lg overflow-hidden ${
            results.riskLevel === 'high'
              ? 'bg-gradient-to-br from-red-50 to-red-100 border border-red-200'
              : results.riskLevel === 'medium'
                ? 'bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-200'
                : 'bg-gradient-to-br from-emerald-50 to-emerald-100 border border-emerald-200'
          }`}
        >
          <div className="px-8 py-12">
            <div className="flex items-start justify-between gap-8">
              <div className="flex-1">
                <div className="text-5xl mb-4">{getRiskEmoji(results.riskLevel)}</div>
                <h2 className="text-4xl font-bold text-gray-900 mb-2">Diabetes Risk Assessment</h2>
                <p
                  className={`text-lg font-medium ${
                    results.riskLevel === 'high'
                      ? 'text-red-700'
                      : results.riskLevel === 'medium'
                        ? 'text-amber-700'
                        : 'text-emerald-700'
                  }`}
                >
                  {results.riskLevel === 'high'
                    ? 'High Risk - Immediate attention recommended'
                    : results.riskLevel === 'medium'
                      ? 'Moderate Risk - Active monitoring suggested'
                      : 'Low Risk - Maintain healthy lifestyle'}
                </p>
              </div>

              {/* Large Risk Percentage */}
              <div className="text-center">
                <div className="text-6xl font-bold text-gray-900 mb-2">
                  {(results.probability * 100).toFixed(1)}%
                </div>
                <p className="text-sm text-gray-600 font-medium">Probability Score</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="grid lg:grid-cols-3 gap-8 mb-8">
        {/* Left: Risk Gauge - Larger size */}
        <div className="space-y-6">
          {/* Large Gauge Chart */}
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-8">
            <h3 className="text-lg font-bold text-gray-900 mb-8 text-center">Risk Level Gauge</h3>
            <RiskGaugeChart probability={results.probability} riskLevel={results.riskLevel} />
          </div>

          {/* Factors Overview with Expandable Sections */}
          <FactorsOverview impacts={results.impacts} />

          {/* Conclusion */}
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Assessment Result</h3>
            <div
              className={`text-center py-4 px-6 rounded-lg font-bold text-lg ${
                results.conclusion === 'DƯƠNG TÍNH'
                  ? 'bg-red-50 text-red-700 border border-red-200'
                  : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
              }`}
            >
              {results.conclusion === 'DƯƠNG TÍNH' ? '🔴 POSITIVE' : '🟢 NEGATIVE'}
            </div>
            <p className="text-sm text-gray-600 mt-4 leading-relaxed">
              {results.conclusion === 'DƯƠNG TÍNH'
                ? 'Assessment suggests potential diabetes indicators. Consult healthcare provider for confirmation.'
                : 'Current assessment shows low diabetes indicators. Continue with regular health monitoring.'}
            </p>
          </div>
        </div>

        {/* Middle: Feature Impact Chart */}
        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Feature Impact Analysis</h3>
          <div className="space-y-1">
            <FeatureImpactChart impacts={topImpacts} />
          </div>
          <p className="text-xs text-gray-500 mt-6 pt-4 border-t border-gray-200">
            Shows how each health factor contributes to the risk score. Red indicates increased risk, green indicates
            protective effect.
          </p>
        </div>

        {/* Right: AI Recommendations */}
        <RecommendationsPanel aiAdvice={results.aiAdvice} isDoctorMode={isDoctorMode} />
      </div>



      {/* Action Buttons */}
      <div className="flex gap-4 justify-center">
        <button
          onClick={onReset}
          className="px-8 py-4 bg-white text-gray-900 font-bold rounded-lg border-2 border-gray-300 hover:border-gray-400 transition-all shadow-md hover:shadow-lg"
        >
          📊 New Analysis
        </button>
        <button className="px-8 py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-all shadow-md hover:shadow-lg">
          💾 Export Report
        </button>
      </div>
    </div>
  );
}
