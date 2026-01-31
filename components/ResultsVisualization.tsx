'use client';

/**
 * Results Visualization Components
 * This file contains reusable components for visualizing diabetes risk assessment results
 * Future enhancements can replace these with more sophisticated charts
 */

// Risk Level Gauge - Visual representation of risk severity
export function RiskGauge({ riskLevel }: { riskLevel: 'low' | 'medium' | 'high' }) {
  const getRiskColor = (level: string) => {
    switch (level) {
      case 'high': return { bg: 'bg-red-100', border: 'border-red-500', text: 'text-red-700' };
      case 'medium': return { bg: 'bg-yellow-100', border: 'border-yellow-500', text: 'text-yellow-700' };
      default: return { bg: 'bg-green-100', border: 'border-green-500', text: 'text-green-700' };
    }
  };

  const colors = getRiskColor(riskLevel);
  const gaugeWidth = riskLevel === 'low' ? '33%' : riskLevel === 'medium' ? '66%' : '100%';

  return (
    <div className="space-y-4">
      <div className={`${colors.bg} ${colors.border} border-2 rounded-lg p-6`}>
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">Risk Level Gauge</h3>
          <div className="relative h-8 bg-gray-200 rounded-full overflow-hidden">
            <div
              className={`h-full ${riskLevel === 'low' ? 'bg-green-500' : riskLevel === 'medium' ? 'bg-yellow-500' : 'bg-red-500'} transition-all duration-500`}
              style={{ width: gaugeWidth }}
            />
          </div>
        </div>
        <div className={`text-center ${colors.text}`}>
          <p className="text-sm font-semibold uppercase tracking-wide">{riskLevel} Risk</p>
        </div>
      </div>
    </div>
  );
}

// Probability Display - Large probability percentage
export function ProbabilityDisplay({ probability }: { probability: number }) {
  const percentage = (probability * 100).toFixed(1);
  const getSeverity = (prob: number) => {
    if (prob > 0.7) return { color: 'text-red-600', bg: 'bg-red-50' };
    if (prob > 0.4) return { color: 'text-yellow-600', bg: 'bg-yellow-50' };
    return { color: 'text-green-600', bg: 'bg-green-50' };
  };

  const severity = getSeverity(probability);

  return (
    <div className={`${severity.bg} rounded-lg border-2 ${severity.color.replace('text', 'border')} p-8 text-center`}>
      <p className="text-sm text-gray-600 mb-2 font-semibold">Diabetes Risk Probability</p>
      <div className={`text-5xl font-bold ${severity.color}`}>{percentage}%</div>
    </div>
  );
}

// Impact Breakdown - Shows which factors influence the result most
export function ImpactBreakdown({ impacts }: { impacts: Array<{ feature: string; impact: number }> }) {
  const sorted = [...impacts].sort((a, b) => Math.abs(b.impact) - Math.abs(a.impact));
  const topImpacts = sorted.slice(0, 5);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-gray-900">Top Contributing Factors</h3>
      <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
        {topImpacts.map((item, idx) => (
          <div key={idx} className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">{item.feature}</span>
              <span className={`text-sm font-bold ${item.impact > 0 ? 'text-red-600' : 'text-green-600'}`}>
                {item.impact > 0 ? '+' : ''}{item.impact.toFixed(1)}%
              </span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`h-full ${item.impact > 0 ? 'bg-red-500' : 'bg-green-500'}`}
                style={{ width: `${Math.min(Math.abs(item.impact) * 3, 100)}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Risk Factors List - Shows categorized risk factors
export function RiskFactorsList({ positive, protective }: { positive: string[]; protective: string[] }) {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="bg-red-50 rounded-lg border border-red-200 p-6">
        <h3 className="text-lg font-bold text-red-700 mb-4 flex items-center gap-2">
          ⚠️ Risk Factors
        </h3>
        <ul className="space-y-2">
          {positive.map((factor, idx) => (
            <li key={idx} className="flex items-start gap-2 text-sm">
              <span className="text-red-500 mt-1">●</span>
              <span className="text-gray-700">{factor}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-green-50 rounded-lg border border-green-200 p-6">
        <h3 className="text-lg font-bold text-green-700 mb-4 flex items-center gap-2">
          🛡️ Protective Factors
        </h3>
        <ul className="space-y-2">
          {protective.map((factor, idx) => (
            <li key={idx} className="flex items-start gap-2 text-sm">
              <span className="text-green-500 mt-1">●</span>
              <span className="text-gray-700">{factor}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// Comparison Chart - Compare your metrics to healthy ranges
export function ComparisonChart({ metrics }: { metrics: Array<{ label: string; your: number; healthy: number; unit: string }> }) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-6">Your Metrics vs Healthy Range</h3>
      <div className="space-y-6">
        {metrics.map((metric, idx) => (
          <div key={idx}>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">{metric.label}</span>
              <span className="text-sm text-gray-600">
                Your: <span className="font-bold text-gray-900">{metric.your}{metric.unit}</span> | Healthy: {metric.healthy}{metric.unit}
              </span>
            </div>
            <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden">
              <div className="absolute h-full bg-green-300 rounded-full" style={{ width: `${(metric.healthy / 150) * 100}%` }} />
              <div
                className={`absolute h-full ${metric.your > metric.healthy ? 'bg-red-500' : 'bg-blue-500'} rounded-full`}
                style={{ width: `${(metric.your / 150) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Timeline Recommendation - Shows actionable steps over time
export function TimelineRecommendation({ recommendations }: { recommendations: Array<{ timeframe: string; action: string; priority: 'high' | 'medium' | 'low' }> }) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-red-600 bg-red-50';
      case 'medium': return 'border-l-yellow-600 bg-yellow-50';
      default: return 'border-l-blue-600 bg-blue-50';
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-gray-900">Action Plan</h3>
      {recommendations.map((rec, idx) => (
        <div key={idx} className={`border-l-4 p-4 rounded-r-lg ${getPriorityColor(rec.priority)}`}>
          <div className="flex justify-between items-start mb-2">
            <p className="font-semibold text-gray-900">{rec.timeframe}</p>
            <span className={`px-2 py-1 rounded text-xs font-semibold ${rec.priority === 'high' ? 'bg-red-200 text-red-700' : rec.priority === 'medium' ? 'bg-yellow-200 text-yellow-700' : 'bg-blue-200 text-blue-700'}`}>
              {rec.priority.toUpperCase()}
            </span>
          </div>
          <p className="text-gray-700 text-sm">{rec.action}</p>
        </div>
      ))}
    </div>
  );
}

// Health Score - Overall health score visualization
export function HealthScoreCard({ score }: { score: number }) {
  const getScoreColor = (s: number) => {
    if (s >= 80) return { color: 'text-green-600', bg: 'bg-green-100', borderColor: 'border-green-300' };
    if (s >= 60) return { color: 'text-yellow-600', bg: 'bg-yellow-100', borderColor: 'border-yellow-300' };
    return { color: 'text-red-600', bg: 'bg-red-100', borderColor: 'border-red-300' };
  };

  const colors = getScoreColor(score);

  return (
    <div className={`${colors.bg} border-2 ${colors.borderColor} rounded-lg p-8 text-center`}>
      <p className="text-sm text-gray-600 mb-2 font-semibold">Health Score</p>
      <div className={`text-6xl font-bold ${colors.color}`}>{score}</div>
      <p className="text-sm text-gray-600 mt-2">
        {score >= 80 ? 'Excellent' : score >= 60 ? 'Good' : 'Needs Attention'}
      </p>
    </div>
  );
}
