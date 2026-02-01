'use client';

import { useEffect, useState } from 'react';

interface RecommendationsPanelProps {
  aiAdvice: string;
  isDoctorMode?: boolean;
}

const getIconForKeyword = (text: string): string => {
  const lowerText = text.toLowerCase();

  if (
    lowerText.includes('hba1c') ||
    lowerText.includes('glucose') ||
    lowerText.includes('đường huyết') ||
    lowerText.includes('kiểm soát')
  ) {
    return '📊';
  }
  if (
    lowerText.includes('bmi') ||
    lowerText.includes('cân nặng') ||
    lowerText.includes('hoạt động') ||
    lowerText.includes('tập luyện') ||
    lowerText.includes('phút')
  ) {
    return '🏃';
  }
  if (
    lowerText.includes('ăn') ||
    lowerText.includes('thực phẩm') ||
    lowerText.includes('chế độ') ||
    lowerText.includes('thực') ||
    lowerText.includes('đồ ăn')
  ) {
    return '🥗';
  }
  if (
    lowerText.includes('kiểm tra') ||
    lowerText.includes('tháng') ||
    lowerText.includes('theo dõi') ||
    lowerText.includes('định kỳ')
  ) {
    return '📅';
  }
  if (
    lowerText.includes('stress') ||
    lowerText.includes('ngủ') ||
    lowerText.includes('xã hội') ||
    lowerText.includes('giấc ngủ')
  ) {
    return '😴';
  }
  if (
    lowerText.includes('dược') ||
    lowerText.includes('thuốc') ||
    lowerText.includes('liệu pháp') ||
    lowerText.includes('insulin')
  ) {
    return '💊';
  }
  if (
    lowerText.includes('bác sĩ') ||
    lowerText.includes('chuyên khoa') ||
    lowerText.includes('tư vấn') ||
    lowerText.includes('cơ sở')
  ) {
    return '👨‍⚕️';
  }
  return '✓';
};

export function RecommendationsPanel({
  aiAdvice,
  isDoctorMode = false,
}: RecommendationsPanelProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 200);
  }, []);

  // Parse recommendations into individual items
  const parseRecommendations = (advice: string) => {
    const items = [];
    const lines = advice.split('\n').filter((line) => line.trim().length > 0);

    lines.forEach((line) => {
      const trimmedLine = line.trim();

      // Skip section headers
      if (trimmedLine.match(/^\*\*.*\*\*/) || trimmedLine.length === 0) {
        return;
      }

      // Remove markdown formatting and bullet markers
      const cleanedText = trimmedLine
        .replace(/^\*\*/, '')
        .replace(/\*\*:?$/, '')
        .replace(/^[\d\.\-\*]\s*/, '')
        .replace(/\*\*/g, '')
        .trim();

      if (cleanedText.length > 2) {
        items.push({
          text: cleanedText,
          icon: getIconForKeyword(cleanedText),
        });
      }
    });

    return items;
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
        <div
          className={`px-6 py-4 bg-gradient-to-r ${
            isDoctorMode ? 'from-amber-600 to-amber-700' : 'from-blue-600 to-blue-700'
          }`}
        >
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            {isDoctorMode ? '👨‍⚕️ Clinical Recommendations' : '💡 AI Health Recommendations'}
          </h3>
          <p className={`text-sm mt-1 ${isDoctorMode ? 'text-amber-100' : 'text-blue-100'}`}>
            {isDoctorMode ? 'Evidence-based clinical suggestions' : 'Personalized health guidance'}
          </p>
        </div>

        {/* Recommendations as Cards */}
        <div className="p-6 max-h-96 overflow-y-auto space-y-3">
          {recommendations.length === 0 ? (
            <p className="text-gray-600 text-sm">No recommendations available</p>
          ) : (
            recommendations.map((rec, idx) => (
              <div
                key={idx}
                className="animate-slide-in-up"
                style={{ animationDelay: `${idx * 60}ms` }}
              >
                <div
                  className={`flex gap-3 p-3 rounded-lg border-l-4 transition-all hover:shadow-md ${
                    isDoctorMode
                      ? 'bg-amber-50 border-l-amber-500 hover:bg-amber-100'
                      : 'bg-blue-50 border-l-blue-500 hover:bg-blue-100'
                  }`}
                >
                  {/* Icon */}
                  <div className="text-2xl flex-shrink-0 pt-0.5">{rec.icon}</div>

                  {/* Text Content */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm leading-relaxed text-gray-800 break-words">
                      {rec.text}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Note */}
        <div
          className={`px-6 py-3 border-t ${
            isDoctorMode ? 'bg-amber-50 border-amber-200' : 'bg-blue-50 border-blue-200'
          }`}
        >
          <p className="text-xs text-gray-600">
            ℹ️{' '}
            {isDoctorMode
              ? 'These are AI-generated clinical suggestions. Always apply your clinical judgment.'
              : 'These are AI-generated suggestions. Always consult with a healthcare professional for medical advice.'}
          </p>
        </div>
      </div>
    </div>
  );
}
