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
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 200);
  }, []);

  // Enable main page scroll when modal is open
  useEffect(() => {
    if (isExpanded) {
      // Keep body scroll enabled when modal is open
      // No scroll prevention - allow both outer and inner scrolling
    }
  }, [isExpanded]);

  // Enhanced parsing to handle GEMINI response format with clear sections
  const parseRecommendations = (advice: string): {
    sections: { title: string; items: { text: string; icon: string; priority: 'high' | 'medium' | 'low' }[] }[];
    hasError: boolean;
  } => {
    try {
      // Clean up response before parsing
      const cleanedAdvice = advice
        .replace(/```markdown/g, '')
        .replace(/```/g, '')
        .trim();
      
      const sections: { title: string; items: { text: string; icon: string; priority: 'high' | 'medium' | 'low' }[] }[] = [];
      
      // Parse the advice into sections - handle GEMINI format specifically
      const lines = cleanedAdvice.split('\n').filter((line) => line.trim().length > 0);
      let currentSection: { title: string; items: { text: string; icon: string; priority: 'high' | 'medium' | 'low' }[] } | null = null;
      
      lines.forEach((line) => {
        const trimmedLine = line.trim();
        
        // Check for section headers - handle multiple formats:
        // **Header**
        // **Header:**
        // **Header:** Content
        const sectionMatch = trimmedLine.match(/^\*\*([^*]+)\*\*(?::|$)/);
        if (sectionMatch) {
          if (currentSection) {
            sections.push(currentSection);
          }
          currentSection = {
            title: sectionMatch[1],
            items: []
          };
          
          // Check if there's content after the header on the same line
          const afterHeader = trimmedLine.replace(/^\*\*([^*]+)\*\*(?::)?\s*/, '');
          if (afterHeader.length > 5) {
            // Add the content as an item
            let priority: 'high' | 'medium' | 'low' = 'medium';
            const lowerText = afterHeader.toLowerCase();
            
            if (lowerText.includes('nguy hiểm') || lowerText.includes('khẩn') || lowerText.includes('ngay') || lowerText.includes('quan trọng') || lowerText.includes('cấp cứu') || lowerText.includes('nguy cơ') || lowerText.includes('triệu chứng')) {
              priority = 'high';
            } else if (lowerText.includes('nên') || lowerText.includes('khuyến') || lowerText.includes('gợi ý') || lowerText.includes('cần') || lowerText.includes('hãy') || lowerText.includes('mục tiêu')) {
              priority = 'medium';
            } else {
              priority = 'low';
            }
            
            currentSection.items.push({
              text: afterHeader,
              icon: getIconForKeyword(afterHeader),
              priority
            });
          }
          
          return;
        }
        
        // Skip empty lines
        if (trimmedLine.length === 0) {
          return;
        }

        // Clean and process the line
        const cleanedText = trimmedLine
          .replace(/^\*\*/, '')
          .replace(/\*\*:?$/, '')
          .replace(/^[\d\.\-\*]\s*/, '') // Remove bullet points and numbers
          .replace(/\*\*/g, '')
          .trim();

        if (cleanedText.length > 5) {
          // Determine priority based on keywords
          let priority: 'high' | 'medium' | 'low' = 'medium';
          const lowerText = cleanedText.toLowerCase();
          
          if (lowerText.includes('nguy hiểm') || lowerText.includes('khẩn') || lowerText.includes('ngay') || lowerText.includes('quan trọng') || lowerText.includes('cấp cứu') || lowerText.includes('nguy cơ') || lowerText.includes('triệu chứng')) {
            priority = 'high';
          } else if (lowerText.includes('nên') || lowerText.includes('khuyến') || lowerText.includes('gợi ý') || lowerText.includes('cần') || lowerText.includes('hãy') || lowerText.includes('mục tiêu')) {
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
      
      // Validate results
      if (sections.length === 0 || sections.every(s => s.items.length === 0)) {
        return {
          sections: [{
            title: isDoctorMode ? 'Khuyến nghị lâm sàng' : 'Lời khuyên sức khỏe',
            items: [{
              text: cleanedAdvice,
              icon: '💡',
              priority: 'medium' as const
            }]
          }],
          hasError: true
        };
      }
      
      return { sections, hasError: false };
      
    } catch (error) {
      console.error('Parse error:', error);
      return {
        sections: [{
          title: 'Lời khuyên từ AI',
          items: [{
            text: advice,
            icon: '💡',
            priority: 'medium' as const
          }]
        }],
        hasError: true
      };
    }
  };

  const { sections: recommendations, hasError: parseError } = parseRecommendations(aiAdvice);
  
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
    <>
      {/* Modal Overlay for Expanded View */}
      {isExpanded && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div
              className={`px-8 py-6 bg-gradient-to-r ${
                isDoctorMode ? 'from-amber-600 to-amber-700' : 'from-blue-600 to-blue-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                    {isDoctorMode ? '👨‍⚕️ Clinical Recommendations' : '💡 Lời khuyên sức khỏe cá nhân hóa'}
                  </h3>
                  <p className={`text-sm mt-2 ${isDoctorMode ? 'text-amber-100' : 'text-blue-100'}`}>
                    {isDoctorMode ? 'Evidence-based clinical suggestions' : 'Phân tích AI dựa trên chỉ số sức khỏe của bạn'}
                  </p>
                </div>
                <button
                  onClick={() => setIsExpanded(false)}
                  className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center transition-colors"
                >
                  <span className="text-white text-xl">✕</span>
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-8 overflow-y-auto max-h-[calc(90vh-120px)]">
              {/* Parse Error Warning */}
              {parseError && (
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <span className="text-2xl">⚠️</span>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-yellow-700">
                        Đang hiển thị ở chế độ đơn giản do format dữ liệu không chuẩn.
                      </p>
                    </div>
                  </div>
                </div>
              )}
              
              {recommendations.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-4xl mb-2">🤔</div>
                  <p className="text-gray-600 text-sm">Không có khuyến nghị nào</p>
                </div>
              ) : (
                <div className="space-y-8">
                  {/* Summary Cards for Both Modes */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-gradient-to-r from-red-50 to-orange-50 p-6 rounded-xl border border-red-200">
                      <div className="flex items-center gap-4">
                        <span className="text-3xl">🚨</span>
                        <div>
                          <p className="text-lg font-semibold text-red-800">Ưu tiên cao</p>
                          <p className="text-2xl font-bold text-red-600">
                            {recommendations.reduce((count, section) => 
                              count + section.items.filter(item => item.priority === 'high').length, 0
                            )} việc
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gradient-to-r from-amber-50 to-yellow-50 p-6 rounded-xl border border-amber-200">
                      <div className="flex items-center gap-4">
                        <span className="text-3xl">📌</span>
                        <div>
                          <p className="text-lg font-semibold text-amber-800">Trung bình</p>
                          <p className="text-2xl font-bold text-amber-600">
                            {recommendations.reduce((count, section) => 
                              count + section.items.filter(item => item.priority === 'medium').length, 0
                            )} việc
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-xl border border-blue-200">
                      <div className="flex items-center gap-4">
                        <span className="text-3xl">📋</span>
                        <div>
                          <p className="text-lg font-semibold text-blue-800">Tổng cộng</p>
                          <p className="text-2xl font-bold text-blue-600">
                            {recommendations.reduce((count, section) => count + section.items.length, 0)} lời khuyên
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Section Items */}
                  {recommendations.map((section, sectionIdx) => (
                    <div key={sectionIdx} className="space-y-4">
                      {/* Section Header */}
                      <div className={`sticky top-0 z-10 py-3 px-4 rounded-xl font-semibold text-base ${
                        isDoctorMode ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        <div className="flex items-center justify-between">
                          <span>{section.title}</span>
                          <span className="text-sm bg-white/50 px-3 py-1 rounded-full">
                            {section.items.length} mục
                          </span>
                        </div>
                      </div>
                      
                      {/* Section Items */}
                      <div className="grid gap-4">
                        {section.items.map((item, itemIdx) => (
                          <div
                            key={itemIdx}
                            className="animate-slide-in-up"
                            style={{ animationDelay: `${(sectionIdx * 100) + (itemIdx * 60)}ms` }}
                          >
                            <div
                              className={`flex gap-4 p-6 rounded-xl border-l-4 transition-all hover:shadow-lg ${getPriorityColor(item.priority)}`}
                            >
                              {/* Priority Badge */}
                              <div className="flex-shrink-0">
                                <div className={`w-3 h-3 rounded-full ${getPriorityBadge(item.priority)}`} />
                              </div>
                              
                              {/* Icon */}
                              <div className="text-3xl flex-shrink-0 pt-1">{item.icon}</div>

                              {/* Text Content */}
                              <div className="flex-1 min-w-0">
                                <p className="text-base leading-relaxed text-gray-800 break-words whitespace-pre-wrap">
                                  {item.text}
                                </p>
                                <div className="mt-3 flex items-center gap-3">
                                  <span className={`text-sm px-3 py-1 rounded-full font-medium ${
                                    item.priority === 'high' ? 'bg-red-100 text-red-700' :
                                    item.priority === 'medium' ? 'bg-amber-100 text-amber-700' :
                                    'bg-green-100 text-green-700'
                                  }`}>
                                    {item.priority === 'high' ? '🚨 Cao' : item.priority === 'medium' ? '📌 Trung bình' : '✅ Thấp'}
                                  </span>
                                </div>
                              </div>
                              
                              {/* Priority Indicator */}
                              <div className="flex-shrink-0">
                                <span className={`text-sm px-3 py-1 rounded-full font-medium ${
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
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div
              className={`px-8 py-4 border-t ${
                isDoctorMode ? 'bg-amber-50 border-amber-200' : 'bg-blue-50 border-blue-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">
                  ℹ️{' '}
                  {isDoctorMode
                    ? 'These are AI-generated clinical suggestions. Always apply your clinical judgment.'
                    : 'Đây là gợi ý từ AI. Luôn tham khảo ý kiến bác sĩ chuyên khoa để được tư vấn y tế chính xác.'}
                </p>
                
                <button
                  onClick={() => setIsExpanded(false)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isDoctorMode 
                      ? 'bg-amber-600 hover:bg-amber-700 text-white' 
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                >
                  <span>Đóng</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Original Card View (Collapsed) */}
      <div
        className={`transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
          {/* Header */}
          <div
            className={`px-6 py-4 bg-gradient-to-r ${
              isDoctorMode ? 'from-amber-600 to-amber-700' : 'from-blue-600 to-blue-700'
            }`}
          >
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              {isDoctorMode ? '👨‍⚕️ Clinical Recommendations' : '💡 Lời khuyên sức khỏe cá nhân hóa'}
            </h3>
            <p className={`text-sm mt-1 ${isDoctorMode ? 'text-amber-100' : 'text-blue-100'}`}>
              {isDoctorMode ? 'Evidence-based clinical suggestions' : 'Phân tích AI dựa trên chỉ số sức khỏe của bạn'}
            </p>
          </div>

          {/* Collapsed Recommendations Display */}
          <div className="p-6 space-y-4 max-h-[600px] overflow-y-auto">
            {recommendations.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-4xl mb-2">🤔</div>
                <p className="text-gray-600 text-sm">Không có khuyến nghị nào</p>
              </div>
            ) : (
              <div className="space-y-3">
                {/* Quick Summary */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div className="bg-gradient-to-r from-red-50 to-orange-50 p-4 rounded-lg border border-red-200">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">🚨</span>
                      <div>
                        <p className="text-sm font-semibold text-red-800">Ưu tiên cao</p>
                        <p className="text-xl font-bold text-red-600">
                          {recommendations.reduce((count, section) => 
                            count + section.items.filter(item => item.priority === 'high').length, 0
                          )} việc
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-blue-50 to-green-50 p-4 rounded-lg border border-blue-200">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">📋</span>
                      <div>
                        <p className="text-sm font-semibold text-blue-800">Tổng cộng</p>
                        <p className="text-xl font-bold text-blue-600">
                          {recommendations.reduce((count, section) => count + section.items.length, 0)} lời khuyên
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* First few items as preview */}
                {recommendations.slice(0, 2).map((section, sectionIdx) => (
                  <div key={sectionIdx} className="space-y-3">
                    <div className={`py-2 px-3 rounded-lg font-semibold text-sm ${
                      isDoctorMode ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {section.title} ({section.items.length})
                    </div>
                    {section.items.slice(0, 2).map((item, itemIdx) => (
                      <div key={itemIdx} className="flex gap-3 p-3 rounded-lg border-l-4 bg-gray-50">
                        <div className="text-xl">{item.icon}</div>
                        <p className="text-sm text-gray-700 line-clamp-2">{item.text}</p>
                      </div>
                    ))}
                    {section.items.length > 2 && (
                      <p className="text-xs text-gray-500 italic">... và {section.items.length - 2} mục khác</p>
                    )}
                  </div>
                ))}
                
                {recommendations.length > 2 && (
                  <p className="text-xs text-gray-500 text-center py-2">
                    ... và {recommendations.length - 2} nhóm khác
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Footer with Expand Button */}
          <div
            className={`px-6 py-3 border-t ${
              isDoctorMode ? 'bg-amber-50 border-amber-200' : 'bg-blue-50 border-blue-200'
            }`}
          >
            <div className="flex items-center justify-between">
              <p className="text-xs text-gray-600">
                ℹ️{' '}
                {isDoctorMode
                  ? 'These are AI-generated clinical suggestions. Always apply your clinical judgment.'
                  : 'Đây là gợi ý từ AI. Luôn tham khảo ý kiến bác sĩ chuyên khoa để được tư vấn y tế chính xác.'}
              </p>
              
              <button
                onClick={() => setIsExpanded(true)}
                className={`flex items-center gap-2 px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                  isDoctorMode 
                    ? 'bg-amber-100 hover:bg-amber-200 text-amber-700' 
                    : 'bg-blue-100 hover:bg-blue-200 text-blue-700'
                }`}
              >
                <span>🔍</span>
                Xem đầy đủ
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}