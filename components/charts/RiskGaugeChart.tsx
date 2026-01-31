'use client';

interface RiskGaugeChartProps {
  probability: number;
  riskLevel: 'low' | 'medium' | 'high';
}

export function RiskGaugeChart({ probability, riskLevel }: RiskGaugeChartProps) {
  const percentage = Math.min(probability * 100, 100);

  // SVG gauge visualization
  const SVG_SIZE = 280;
  const CENTER_X = SVG_SIZE / 2;
  const CENTER_Y = SVG_SIZE / 2;
  const RADIUS = 80;
  const STROKE_WIDTH = 20;

  // Create arc path for gauge
  const getArcPath = (startAngle: number, endAngle: number, radius: number) => {
    const start = polarToCartesian(CENTER_X, CENTER_Y, radius, endAngle);
    const end = polarToCartesian(CENTER_X, CENTER_Y, radius, startAngle);
    const largeArc = endAngle - startAngle <= 180 ? '0' : '1';

    return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArc} 0 ${end.x} ${end.y}`;
  };

  const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians),
    };
  };

  // Angles for gauge (180 degree gauge: -90 to 90)
  const startAngle = -90;
  const endAngle = 90;
  const currentAngle = startAngle + (percentage / 100) * (endAngle - startAngle);

  return (
    <div className="flex flex-col items-center gap-8">
      {/* SVG Gauge */}
      <svg width={SVG_SIZE} height={SVG_SIZE} viewBox={`0 0 ${SVG_SIZE} ${SVG_SIZE}`} className="drop-shadow-sm">
        {/* Background arc */}
        <path
          d={getArcPath(startAngle, endAngle, RADIUS)}
          stroke="#e5e7eb"
          strokeWidth={STROKE_WIDTH}
          fill="none"
          strokeLinecap="round"
        />

        {/* Low risk arc (green) */}
        <path
          d={getArcPath(startAngle, startAngle + (endAngle - startAngle) * 0.33, RADIUS)}
          stroke="#10b981"
          strokeWidth={STROKE_WIDTH}
          fill="none"
          strokeLinecap="round"
          opacity="0.3"
        />

        {/* Medium risk arc (yellow) */}
        <path
          d={getArcPath(
            startAngle + (endAngle - startAngle) * 0.33,
            startAngle + (endAngle - startAngle) * 0.67,
            RADIUS
          )}
          stroke="#f59e0b"
          strokeWidth={STROKE_WIDTH}
          fill="none"
          strokeLinecap="round"
          opacity="0.3"
        />

        {/* High risk arc (red) */}
        <path
          d={getArcPath(startAngle + (endAngle - startAngle) * 0.67, endAngle, RADIUS)}
          stroke="#ef4444"
          strokeWidth={STROKE_WIDTH}
          fill="none"
          strokeLinecap="round"
          opacity="0.3"
        />

        {/* Active arc - animated based on percentage */}
        <path
          d={getArcPath(startAngle, currentAngle, RADIUS)}
          stroke={
            riskLevel === 'high' ? '#ef4444' : riskLevel === 'medium' ? '#f59e0b' : '#10b981'
          }
          strokeWidth={STROKE_WIDTH}
          fill="none"
          strokeLinecap="round"
          className="transition-all duration-1000"
          style={{
            filter: 'drop-shadow(0 0 6px currentColor)',
          }}
        />

        {/* Center circle with percentage */}
        <circle cx={CENTER_X} cy={CENTER_Y} r={35} fill="white" stroke="#e5e7eb" strokeWidth="2" />
        <text
          x={CENTER_X}
          y={CENTER_Y}
          textAnchor="middle"
          dominantBaseline="middle"
          className="text-3xl font-bold fill-gray-900"
        >
          {percentage.toFixed(0)}%
        </text>
      </svg>

      {/* Risk Level Labels */}
      <div className="flex justify-between items-end gap-4 text-center w-full">
        <div>
          <p className="text-xs text-gray-500 font-medium mb-1">Low</p>
          <p className="text-xl font-bold text-emerald-600">0-33%</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 font-medium mb-1">Medium</p>
          <p className="text-xl font-bold text-amber-600">33-66%</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 font-medium mb-1">High</p>
          <p className="text-xl font-bold text-red-600">66-100%</p>
        </div>
      </div>

      {/* Current Status */}
      <div className="w-full pt-4 border-t border-gray-200">
        <p className="text-sm text-gray-600 text-center">
          <span className="font-semibold">Current Status:</span>{' '}
          <span
            className={`font-bold ${
              riskLevel === 'high'
                ? 'text-red-600'
                : riskLevel === 'medium'
                  ? 'text-amber-600'
                  : 'text-emerald-600'
            }`}
          >
            {riskLevel === 'high' ? 'HIGH RISK' : riskLevel === 'medium' ? 'MODERATE RISK' : 'LOW RISK'}
          </span>
        </p>
      </div>
    </div>
  );
}
