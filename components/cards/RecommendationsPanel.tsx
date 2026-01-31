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

  // Clean up the advice text
  const cleanAdvice = aiAdvice
    .split('\n')
    .filter((line) => line.trim().length > 0)
    .map((line) => line.replace(/^[\d\.\*\-\#\*]+\s*/, '').trim())
    .join(' ');

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

        {/* Recommendations as Continuous Text */}
        <div className="p-6 max-h-96 overflow-y-auto">
          {cleanAdvice.length === 0 ? (
            <p className="text-gray-600 text-sm">No recommendations available</p>
          ) : (
            <div className="space-y-4">
              <p className="text-gray-800 leading-relaxed text-base">
                {cleanAdvice}
              </p>
            </div>
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
