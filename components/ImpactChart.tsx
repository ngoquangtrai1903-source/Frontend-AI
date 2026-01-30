"use client";

import { useEffect, useState } from "react";

interface ImpactChartProps {
  impacts: Array<{ feature: string; impact: number }>;
}

export function ImpactChart({ impacts }: ImpactChartProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTimeout(() => setIsVisible(true), 200);
  }, []);

  if (!mounted) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-6">
          <h4 className="font-bold text-gray-900">Tác động của từng yếu tố (%)</h4>
          <div className="flex gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-500 rounded"></div>
              <span className="text-gray-600">Tăng nguy cơ</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded"></div>
              <span className="text-gray-600">Giảm nguy cơ</span>
            </div>
          </div>
        </div>
        <div className="h-64 bg-gray-50 rounded-lg animate-pulse"></div>
      </div>
    );
  }

  // Sort by absolute impact
  const sortedImpacts = [...impacts].sort((a, b) => 
    Math.abs(b.impact) - Math.abs(a.impact)
  );

  const maxAbsImpact = Math.max(...impacts.map(i => Math.abs(i.impact)));

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <h4 className="font-bold text-gray-900">Tác động của từng yếu tố (%)</h4>
        <div className="flex gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-500 rounded"></div>
            <span className="text-gray-600">Tăng nguy cơ</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded"></div>
            <span className="text-gray-600">Giảm nguy cơ</span>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {sortedImpacts.map((impact, index) => {
          const percentage = (Math.abs(impact.impact) / maxAbsImpact) * 100;
          const isPositive = impact.impact > 0;
          
          return (
            <div key={`${impact.feature}-${index}`} className="group">
              <div className="flex items-center gap-3 mb-1">
                <span className="text-sm font-medium text-gray-700 w-28 text-right">
                  {impact.feature}
                </span>
                <div className="flex-1 relative h-8 bg-gray-100 rounded-lg overflow-hidden">
                  {/* Center line */}
                  <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-300 z-10"></div>
                  
                  {/* Bar */}
                  <div
                    className={`absolute top-0 bottom-0 ${
                      isPositive ? 'bg-gradient-to-r from-red-400 to-red-500' : 'bg-gradient-to-l from-green-400 to-green-500'
                    } transition-all duration-1000 ease-out group-hover:opacity-90`}
                    style={{
                      [isPositive ? 'left' : 'right']: '50%',
                      width: isVisible ? `${percentage / 2}%` : '0%',
                      transitionDelay: `${index * 50}ms`
                    }}
                  />
                  
                  {/* Value label */}
                  <div className={`absolute top-1/2 -translate-y-1/2 ${
                    isPositive ? 'left-1/2 ml-2' : 'right-1/2 mr-2'
                  } z-20`}>
                    <span className="text-xs font-bold text-gray-900 bg-white/80 px-2 py-1 rounded">
                      {isPositive ? '+' : ''}{impact.impact.toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex justify-between text-xs text-gray-500">
          <span>← Giảm nguy cơ</span>
          <span>Tăng nguy cơ →</span>
        </div>
      </div>
    </div>
  );
}