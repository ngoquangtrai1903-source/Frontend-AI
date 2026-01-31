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
        {/* Left: Risk Gauge + Factors Overview - 1 col */}
        <div className="space-y-8">
          {/* Gauge Chart */}
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Risk Level Gauge</h3>
            <RiskGaugeChart probability={results.probability} riskLevel={results.riskLevel} />
          </div>

          {/* Factors Overview */}
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

        {/* Middle: Feature Impact Chart - 1 col */}
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

        {/* Right: AI Recommendations - 1 col */}
        <RecommendationsPanel aiAdvice={results.aiAdvice} isDoctorMode={isDoctorMode} />
      </div>

      {/* Detailed Risk Factors Section */}
      <div className="bg-white rounded-xl shadow-md border border-gray-200 p-8 mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-8">Comprehensive Factor Analysis</h3>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Risk Factors */}
          <div>
            <h4 className="text-lg font-bold text-red-700 mb-6 flex items-center gap-2">
              <span className="text-2xl">⚠️</span>
              Risk Factors
            </h4>
            <div className="space-y-3">
              {results.impacts
                .filter((i) => i.impact > 0)
                .sort((a, b) => b.impact - a.impact)
                .slice(0, 5)
                .map((impact, idx) => (
                  <div key={idx} className="bg-red-50 rounded-lg p-4 border border-red-100">
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-semibold text-gray-900">{impact.feature}</span>
                      <span className="text-red-600 font-bold">+{impact.impact.toFixed(1)}%</span>
                    </div>
                    <div className="w-full h-2 bg-red-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-red-500 transition-all duration-1000"
                        style={{ width: `${Math.min((Math.abs(impact.impact) / 20) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Protective Factors */}
          <div>
            <h4 className="text-lg font-bold text-emerald-700 mb-6 flex items-center gap-2">
              <span className="text-2xl">🛡️</span>
              Protective Factors
            </h4>
            <div className="space-y-3">
              {results.impacts
                .filter((i) => i.impact < 0)
                .sort((a, b) => a.impact - b.impact)
                .slice(0, 5)
                .map((impact, idx) => (
                  <div key={idx} className="bg-emerald-50 rounded-lg p-4 border border-emerald-100">
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-semibold text-gray-900">{impact.feature}</span>
                      <span className="text-emerald-600 font-bold">{impact.impact.toFixed(1)}%</span>
                    </div>
                    <div className="w-full h-2 bg-emerald-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-emerald-500 transition-all duration-1000"
                        style={{ width: `${Math.min((Math.abs(impact.impact) / 20) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>

      {/* All Factors Table */}
      <div className="bg-white rounded-xl shadow-md border border-gray-200 p-8 mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">All Contributing Factors</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Factor</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-700">Impact %</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Contribution</th>
              </tr>
            </thead>
            <tbody>
              {[...results.impacts]
                .sort((a, b) => Math.abs(b.impact) - Math.abs(a.impact))
                .map((impact, idx) => (
                  <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-4 font-medium text-gray-900">{impact.feature}</td>
                    <td className="text-right py-3 px-4">
                      <span
                        className={`font-bold ${
                          impact.impact > 0 ? 'text-red-600' : 'text-emerald-600'
                        }`}
                      >
                        {impact.impact > 0 ? '+' : ''}
                        {impact.impact.toFixed(2)}%
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${impact.impact > 0 ? 'bg-red-500' : 'bg-emerald-500'}`}
                            style={{
                              width: `${Math.min((Math.abs(impact.impact) / 20) * 100, 100)}%`,
                            }}
                          />
                        </div>
                        <span className="text-xs text-gray-500 w-8">
                          {impact.impact > 0 ? 'Risk' : 'Protects'}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
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
