'use client';

interface FactorsOverviewProps {
  impacts: Array<{ feature: string; impact: number }>;
}

export function FactorsOverview({ impacts }: FactorsOverviewProps) {
  const riskFactors = impacts.filter((i) => i.impact > 0).length;
  const protectiveFactors = impacts.filter((i) => i.impact < 0).length;
  const totalFactors = impacts.length;

  const avgRiskImpact =
    impacts.filter((i) => i.impact > 0).reduce((sum, i) => sum + i.impact, 0) /
    Math.max(riskFactors, 1);

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-6">Factor Summary</h3>

      <div className="space-y-4">
        {/* Risk Factors Count */}
        <div className="bg-red-50 rounded-lg p-4 border border-red-200">
          <div className="flex items-start justify-between mb-2">
            <div>
              <p className="text-xs text-red-600 font-semibold uppercase tracking-wide">Risk Factors</p>
              <p className="text-2xl font-bold text-red-700 mt-1">{riskFactors}</p>
            </div>
            <span className="text-2xl">⚠️</span>
          </div>
          <p className="text-xs text-red-600">Avg impact: {avgRiskImpact.toFixed(1)}%</p>
        </div>

        {/* Protective Factors Count */}
        <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-200">
          <div className="flex items-start justify-between mb-2">
            <div>
              <p className="text-xs text-emerald-600 font-semibold uppercase tracking-wide">Protective Factors</p>
              <p className="text-2xl font-bold text-emerald-700 mt-1">{protectiveFactors}</p>
            </div>
            <span className="text-2xl">🛡️</span>
          </div>
          <p className="text-xs text-emerald-600">Good lifestyle choices detected</p>
        </div>

        {/* Total Factors */}
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <div className="flex items-start justify-between mb-2">
            <div>
              <p className="text-xs text-gray-600 font-semibold uppercase tracking-wide">Total Analyzed</p>
              <p className="text-2xl font-bold text-gray-700 mt-1">{totalFactors}</p>
            </div>
            <span className="text-2xl">📊</span>
          </div>
          <p className="text-xs text-gray-600">Health metrics evaluated</p>
        </div>
      </div>

      {/* Balance Indicator */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <p className="text-xs text-gray-600 font-semibold mb-3">Risk Balance</p>
        <div className="flex items-center gap-2">
          <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-red-500 transition-all duration-500"
              style={{
                width: `${(riskFactors / (riskFactors + protectiveFactors)) * 100}%`,
              }}
            />
          </div>
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-2">
          <span>Protective</span>
          <span>Risk</span>
        </div>
      </div>
    </div>
  );
}
