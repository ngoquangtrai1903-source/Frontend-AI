'use client';

import { useEffect, useState } from 'react';

interface RecommendationsPanelProps {
  aiAdvice: string;
  isDoctorMode?: boolean;
}

export function RecommendationsPanel({ aiAdvice, isDoctorMode = false }: RecommendationsPanelProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 200);
  }, []);

  // Parse AI advice into structured recommendations
  const parseRecommendations = (advice: string) => {
    const lines = advice
      .split('\n')
      .filter((line) => line.trim().length > 0)
      .map((line) => line.replace(/^[\d\.\*\-\#\*]+\s*/, '').trim());

    return lines;
  };

  const recommendations = parseRecommendations(aiAdvice);

  return (
    <div
      className={`transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden sticky top-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            {isDoctorMode ? '👨‍⚕️ Clinical Recommendations' : '💡 AI Health Recommendations'}
          </h3>
          <p className="text-blue-100 text-sm mt-1">
            {isDoctorMode ? 'Evidence-based suggestions' : 'Personalized guidance'}
          </p>
        </div>

        {/* Recommendations List */}
        <div className="p-6 space-y-4 max-h-96 overflow-y-auto">
          {recommendations.length === 0 ? (
            <p className="text-gray-600 text-sm">No recommendations available</p>
          ) : (
            recommendations.map((rec, idx) => (
              <div
                key={idx}
                className={`transition-all duration-500 ${
                  isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                }`}
                style={{
                  transitionDelay: `${200 + idx * 50}ms`,
                }}
              >
                <div className="bg-gradient-to-r from-blue-50 to-blue-100/50 rounded-lg p-3 border border-blue-200/50 hover:border-blue-300 transition-all">
                  <div className="flex gap-3">
                    <div className="text-xl flex-shrink-0">
                      {idx === 0 ? '🎯' : idx === 1 ? '💪' : idx === 2 ? '🥗' : '📋'}
                    </div>
                    <p className="text-sm text-gray-800 leading-relaxed">
                      <span className="font-semibold text-gray-900">{`Step ${idx + 1}:`}</span>{' '}
                      {rec.replace(/\*\*/g, '')}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Note */}
        <div className="bg-blue-50 px-6 py-3 border-t border-blue-200">
          <p className="text-xs text-gray-600">
            ℹ️ These recommendations are AI-generated suggestions. Always consult with a healthcare professional for
            medical advice.
          </p>
        </div>
      </div>
    </div>
  );
}
