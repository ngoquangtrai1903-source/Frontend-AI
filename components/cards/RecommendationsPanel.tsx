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

  // Enhanced parsing for better structure
  const parseRecommendations = (advice: string) => {
    const sections: { title: string; items: { text: string; icon: string; priority: 'high' | 'medium' | 'low' }[] }[] = [];
    const lines = advice.split('\n').filter((line) => line.trim().length > 0);
    
    let currentSection: { title: string; items: { text: string; icon: string; priority: 'high' | 'medium' | 'low' }[] } | null = null;
    
    lines.forEach((line) => {
      const trimmedLine = line.trim();
      
      // Check for section headers
      const sectionMatch = trimmedLine.match(/^\*\*([^*]+)\*\*:?$/);
      if (sectionMatch) {
        if (currentSection) {
          sections.push(currentSection);
        }
        currentSection = {
          title: sectionMatch[1],
          items: []
        };
        return;
      }
      
      // Skip empty lines or just headers
      if (trimmedLine.length === 0 || trimmedLine.match(/^\*\*.*\*\*$/)) {
        return;
      }

      // Clean and process the line
      const cleanedText = trimmedLine
        .replace(/^\*\*/, '')
        .replace(/\*\*:?$/, '')
        .replace(/^[\d\.\-\*]\s*/, '')
        .replace(/\*\*/g, '')
        .trim();

      if (cleanedText.length > 2) {
        // Determine priority based on keywords
        let priority: 'high' | 'medium' | 'low' = 'medium';
        const lowerText = cleanedText.toLowerCase();
        
        if (lowerText.includes('nguy hiểm') || lowerText.includes('khẩn') || lowerText.includes('ngay') || lowerText.includes('quan trọng')) {
          priority = 'high';
        } else if (lowerText.includes('nên') || lowerText.includes('khuyến') || lowerText.includes('gợi ý')) {
          priority = 'medium';
        } else {
          priority = 'low';
        }
        
        const item = {
          text: cleanedText,
          icon: getIconForKeyword(cleanedText),
          priority
        };
        
        if (currentSection) {
          currentSection.items.push(item);
        } else {
          // Create default section if none exists
          if (!sections.length) {
            sections.push({ title: isDoctorMode ? 'Khuyến nghị lâm sàng' : 'Lời khuyên sức khỏe', items: [] });
          }
          sections[0].items.push(item);
        }
      }
    });
    
    if (currentSection) {
      sections.push(currentSection);
    }
    
    return sections;
  };

  const recommendations = parseRecommendations(aiAdvice);
  
  const getPriorityColor = (priority: 'high' | 'medium' | 'low') => {
    switch (priority) {
      case 'high':
        return isDoctorMode ? 'border-red-500 bg-red-50 hover:bg-red-100' : 'border-orange-500 bg-orange-50 hover:bg-orange-100';
      case 'medium':
        return isDoctorMode ? 'border-amber-500 bg-amber-50 hover:bg-amber-100' : 'border-blue-500 bg-blue-50 hover:bg-blue-100';
      case 'low':
        return isDoctorMode ? 'border-yellow-500 bg-yellow-50 hover:bg-yellow-100' : 'border-green-500 bg-green-50 hover:bg-green-100';
    }
  };
  
  const getPriorityBadge = (priority: 'high' | 'medium' | 'low') => {
    switch (priority) {
      case 'high':
        return 'bg-red-500 text-white';
      case 'medium':
        return 'bg-amber-500 text-white';
      case 'low':
        return 'bg-green-500 text-white';
    }
  };

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

        {/* Enhanced Recommendations Display */}
        <div className="p-6 space-y-4 max-h-[600px] overflow-y-auto">
          {recommendations.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-4xl mb-2">🤔</div>
              <p className="text-gray-600 text-sm">Không có khuyến nghị nào</p>
            </div>
          ) : (
            recommendations.map((section, sectionIdx) => (
              <div key={sectionIdx} className="space-y-3">
                {/* Section Header */}
                <div className={`sticky top-0 z-10 py-2 px-3 rounded-lg font-semibold text-sm ${
                  isDoctorMode ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'
                }`}>
                  {section.title}
                </div>
                
                {/* Section Items */}
                {section.items.map((item, itemIdx) => (
                  <div
                    key={itemIdx}
                    className="animate-slide-in-up"
                    style={{ animationDelay: `${(sectionIdx * 100) + (itemIdx * 60)}ms` }}
                  >
                    <div
                      className={`flex gap-3 p-4 rounded-lg border-l-4 transition-all hover:shadow-md ${getPriorityColor(item.priority)}`}
                    >
                      {/* Priority Badge */}
                      <div className="flex-shrink-0">
                        <div className={`w-2 h-2 rounded-full ${getPriorityBadge(item.priority)}`} />
                      </div>
                      
                      {/* Icon */}
                      <div className="text-2xl flex-shrink-0 pt-0.5">{item.icon}</div>

                      {/* Text Content */}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm leading-relaxed text-gray-800 break-words whitespace-pre-wrap">
                          {item.text}
                        </p>
                      </div>
                      
                      {/* Priority Indicator */}
                      <div className="flex-shrink-0">
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                          item.priority === 'high' ? 'bg-red-100 text-red-700' :
                          item.priority === 'medium' ? 'bg-amber-100 text-amber-700' :
                          'bg-green-100 text-green-700'
                        }`}>
                          {item.priority === 'high' ? 'Cao' : item.priority === 'medium' ? 'Trung bình' : 'Thấp'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
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
