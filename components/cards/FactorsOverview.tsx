'use client';

import { useState } from 'react';

interface FactorsOverviewProps {
  impacts: Array<{ feature: string; impact: number }>;
}

export function FactorsOverview({ impacts }: FactorsOverviewProps) {
  const [expandedRisk, setExpandedRisk] = useState(false);
  const [expandedProtective, setExpandedProtective] = useState(false);

  const riskFactorsList = impacts
    .filter((i) => i.impact > 0)
    .sort((a, b) => b.impact - a.impact);
  
  const protectiveFactorsList = impacts
    .filter((i) => i.impact < 0)
    .sort((a, b) => a.impact - b.impact);

  const riskCount = riskFactorsList.length;
  const protectiveCount = protectiveFactorsList.length;

  const avgRiskImpact =
    riskFactorsList.reduce((sum, i) => sum + i.impact, 0) / Math.max(riskCount, 1);

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 space-y-4">
      <h3 className="text-lg font-bold text-gray-900">Factor Summary</h3>

      {/* Risk Factors - Expandable */}
      <button
        onClick={() => setExpandedRisk(!expandedRisk)}
        className="w-full text-left bg-red-50 hover:bg-red-100 rounded-lg p-4 border border-red-200 transition-colors"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">⚠️</span>
            <div>
              <p className="text-xs text-red-600 font-semibold uppercase tracking-wide">Risk Factors</p>
              <p className="text-2xl font-bold text-red-700 mt-1">{riskCount}</p>
            </div>
          </div>
          <span className={`text-xl text-red-600 transition-transform ${expandedRisk ? 'rotate-180' : ''}`}>
            ▼
          </span>
        </div>
        {!expandedRisk && (
          <p className="text-xs text-red-600 mt-2">Avg impact: {avgRiskImpact.toFixed(1)}%</p>
        )}
      </button>

      {/* Risk Factors List - Expanded */}
      {expandedRisk && (
        <div className="bg-red-50 rounded-lg p-4 border border-red-200 space-y-2 ml-2">
          {riskFactorsList.length > 0 ? (
            riskFactorsList.map((factor, idx) => (
              <div key={idx} className="flex items-center justify-between p-2 bg-white rounded border border-red-100">
                <span className="text-sm font-medium text-gray-900">{factor.feature}</span>
                <span className="text-sm font-bold text-red-600">+{factor.impact.toFixed(1)}%</span>
              </div>
            ))
          ) : (
            <p className="text-sm text-red-600 text-center py-2">No risk factors detected</p>
          )}
        </div>
      )}

      {/* Protective Factors - Expandable */}
      <button
        onClick={() => setExpandedProtective(!expandedProtective)}
        className="w-full text-left bg-emerald-50 hover:bg-emerald-100 rounded-lg p-4 border border-emerald-200 transition-colors"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🛡️</span>
            <div>
              <p className="text-xs text-emerald-600 font-semibold uppercase tracking-wide">Protective Factors</p>
              <p className="text-2xl font-bold text-emerald-700 mt-1">{protectiveCount}</p>
            </div>
          </div>
          <span className={`text-xl text-emerald-600 transition-transform ${expandedProtective ? 'rotate-180' : ''}`}>
            ▼
          </span>
        </div>
        {!expandedProtective && (
          <p className="text-xs text-emerald-600 mt-2">Good lifestyle choices detected</p>
        )}
      </button>

      {/* Protective Factors List - Expanded */}
      {expandedProtective && (
        <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-200 space-y-2 ml-2">
          {protectiveFactorsList.length > 0 ? (
            protectiveFactorsList.map((factor, idx) => (
              <div key={idx} className="flex items-center justify-between p-2 bg-white rounded border border-emerald-100">
                <span className="text-sm font-medium text-gray-900">{factor.feature}</span>
                <span className="text-sm font-bold text-emerald-600">{factor.impact.toFixed(1)}%</span>
              </div>
            ))
          ) : (
            <p className="text-sm text-emerald-600 text-center py-2">No protective factors detected</p>
          )}
        </div>
      )}
    </div>
  );
}
