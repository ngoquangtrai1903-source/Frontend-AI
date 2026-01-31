'use client';

import { useEffect, useState } from 'react';

interface FeatureImpactChartProps {
  impacts: Array<{ feature: string; impact: number }>;
}

export function FeatureImpactChart({ impacts }: FeatureImpactChartProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  const maxAbsImpact = Math.max(...impacts.map((i) => Math.abs(i.impact)), 1);

  return (
    <div className="space-y-4">
      {impacts.map((impact, index) => {
        const percentage = (Math.abs(impact.impact) / maxAbsImpact) * 100;
        const isPositive = impact.impact > 0;

        return (
          <div
            key={`${impact.feature}-${index}`}
            className={`transition-all duration-500 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
            }`}
            style={{
              transitionDelay: `${index * 50}ms`,
            }}
          >
            {/* Feature Name and Impact Value */}
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-gray-900 truncate pr-2">{impact.feature}</span>
              <span
                className={`text-sm font-bold whitespace-nowrap ${
                  isPositive ? 'text-red-600' : 'text-emerald-600'
                }`}
              >
                {isPositive ? '+' : ''}
                {impact.impact.toFixed(1)}%
              </span>
            </div>

            {/* Bar with Center Line */}
            <div className="relative h-8 bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
              {/* Center dividing line */}
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-300 z-10" />

              {/* Horizontal bar extending from center */}
              <div
                className={`absolute top-0 bottom-0 transition-all duration-1000 ease-out ${
                  isPositive
                    ? 'bg-gradient-to-r from-red-400 to-red-500 left-1/2'
                    : 'bg-gradient-to-l from-emerald-400 to-emerald-500 right-1/2'
                }`}
                style={{
                  width: isVisible ? `${percentage / 2}%` : '0%',
                  transitionDelay: `${index * 50}ms`,
                }}
              />

              {/* Value label inside bar */}
              <div className={`absolute top-1/2 -translate-y-1/2 z-20 ${isPositive ? 'left-1/2 ml-2' : 'right-1/2 mr-2'}`}>
                <span className="text-xs font-bold text-white drop-shadow-sm">
                  {Math.abs(impact.impact).toFixed(1)}%
                </span>
              </div>
            </div>
          </div>
        );
      })}

      {/* Legend */}
      <div className="mt-6 pt-4 border-t border-gray-200 flex gap-4">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-gradient-to-r from-red-400 to-red-500" />
          <span className="text-xs text-gray-600">Increases Risk</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-gradient-to-r from-emerald-400 to-emerald-500" />
          <span className="text-xs text-gray-600">Protects</span>
        </div>
      </div>
    </div>
  );
}
