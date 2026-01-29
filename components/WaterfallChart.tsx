"use client";

import { useEffect, useState } from "react";

interface WaterfallChartProps {
  impacts: Array<{ feature: string; impact: number }>;
}

export function WaterfallChart({ impacts }: WaterfallChartProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 300);
  }, []);

  // Calculate cumulative values
  const chartData = impacts.map((impact, index) => {
    const prevSum = impacts.slice(0, index).reduce((sum, i) => sum + i.impact, 0);
    return {
      feature: impact.feature,
      impact: impact.impact,
      start: prevSum,
      end: prevSum + impact.impact
    };
  });

  const minValue = Math.min(0, ...chartData.map(d => Math.min(d.start, d.end)));
  const maxValue = Math.max(0, ...chartData.map(d => Math.max(d.start, d.end)));
  const range = maxValue - minValue || 1;

  const getY = (value: number) => {
    return ((maxValue - value) / range) * 100;
  };

  const getHeight = (start: number, end: number) => {
    return (Math.abs(end - start) / range) * 100;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <h4 className="font-bold text-gray-900">Phân tích tích lũy SHAP</h4>
        <p className="text-sm text-gray-600">Tác động tích lũy của các yếu tố</p>
      </div>

      <div className="relative h-96 bg-gradient-to-b from-gray-50 to-white rounded-xl border border-gray-200 p-6">
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 bottom-0 w-12 flex flex-col justify-between text-xs text-gray-500">
          <span>{maxValue.toFixed(1)}%</span>
          <span>0%</span>
          <span>{minValue.toFixed(1)}%</span>
        </div>

        {/* Chart area */}
        <div className="ml-12 h-full relative">
          {/* Zero line */}
          <div 
            className="absolute left-0 right-0 border-t-2 border-dashed border-gray-400 z-10"
            style={{ top: `${getY(0)}%` }}
          >
            <span className="absolute -left-8 -top-2 text-xs font-bold text-gray-600">0</span>
          </div>

          {/* Bars */}
          <div className="flex items-end justify-around h-full pt-4 pb-8">
            {chartData.map((data, index) => {
              const isPositive = data.impact > 0;
              const barTop = getY(Math.max(data.start, data.end));
              const barHeight = getHeight(data.start, data.end);

              return (
                <div key={index} className="flex flex-col items-center flex-1 max-w-24 group">
                  {/* Value on top */}
                  <div className="h-12 flex items-end justify-center mb-2">
                    <span className="text-xs font-bold text-gray-700 group-hover:scale-110 transition-transform">
                      {data.impact > 0 ? '+' : ''}{data.impact.toFixed(1)}%
                    </span>
                  </div>

                  {/* Bar container */}
                  <div className="relative flex-1 w-full flex items-end">
                    <div 
                      className="absolute w-full"
                      style={{ top: `${barTop}%` }}
                    >
                      <div
                        className={`w-full ${
                          isPositive 
                            ? 'bg-gradient-to-t from-red-400 to-red-500' 
                            : 'bg-gradient-to-t from-green-400 to-green-500'
                        } rounded-t-lg shadow-lg group-hover:shadow-xl transition-all duration-1000 ease-out border-2 border-white`}
                        style={{
                          height: isVisible ? `${barHeight}%` : '0%',
                          minHeight: Math.abs(data.impact) > 0.01 ? '4px' : '0px',
                          transitionDelay: `${index * 80}ms`
                        }}
                      >
                        {/* Connector line to next bar */}
                        {index < chartData.length - 1 && (
                          <div 
                            className="absolute left-full top-0 w-4 border-t-2 border-dashed border-gray-300"
                            style={{
                              transform: `translateY(${isPositive ? '0' : '100'}%)`
                            }}
                          />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Label */}
                  <div className="mt-2 h-16">
                    <p className="text-xs text-center text-gray-600 leading-tight transform -rotate-45 origin-top-left whitespace-nowrap group-hover:text-gray-900 transition-colors">
                      {data.feature}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Explanation */}
      <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
        <p className="text-sm text-blue-800">
          <strong>💡 Cách đọc biểu đồ:</strong> Mỗi thanh cho thấy yếu tố đó thay đổi xác suất tiểu đường như thế nào. 
          Thanh đỏ = tăng nguy cơ, thanh xanh = giảm nguy cơ. Chiều cao thanh = mức độ tác động.
        </p>
      </div>
    </div>
  );
}
