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

  // Parse the advice into structured sections
  const parseAdvice = (advice: string) => {
    const sections = [];
    const lines = advice.split('\n').filter((line) => line.trim().length > 0);

    let currentSection = null;
    let currentContent = [];

    lines.forEach((line) => {
      const trimmedLine = line.trim();

      // Check for section headers (markdown bold text)
      if (trimmedLine.match(/^\*\*.*\*\*:/)) {
        // Save previous section
        if (currentSection) {
          sections.push({
            title: currentSection,
            content: currentContent.join('\n'),
          });
        }
        // Start new section
        currentSection = trimmedLine.replace(/\*\*|\*|:/g, '').trim();
        currentContent = [];
      } else if (trimmedLine.match(/^\*\*.*\*\*$/)) {
        // Save previous section
        if (currentSection) {
          sections.push({
            title: currentSection,
            content: currentContent.join('\n'),
          });
        }
        // New section header
        currentSection = trimmedLine.replace(/\*\*|\*|$/g, '').trim();
        currentContent = [];
      } else if (trimmedLine) {
        // Add content to current section or general content
        currentContent.push(trimmedLine);
      }
    });

    // Save last section
    if (currentSection) {
      sections.push({
        title: currentSection,
        content: currentContent.join('\n'),
      });
    }

    return sections;
  };

  const sections = parseAdvice(aiAdvice);

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
            isDoctorMode
              ? 'from-amber-600 to-amber-700'
              : 'from-blue-600 to-blue-700'
          }`}
        >
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            {isDoctorMode ? '👨‍⚕️ Clinical Recommendations' : '💡 AI Health Recommendations'}
          </h3>
          <p className={`text-sm mt-1 ${isDoctorMode ? 'text-amber-100' : 'text-blue-100'}`}>
            {isDoctorMode ? 'Evidence-based clinical suggestions' : 'Personalized health guidance'}
          </p>
        </div>

        {/* Recommendations Content */}
        <div className="p-6 max-h-96 overflow-y-auto space-y-5">
          {sections.length === 0 ? (
            <p className="text-gray-600 text-sm">No recommendations available</p>
          ) : (
            sections.map((section, idx) => (
              <div key={idx} className="animate-slide-in-up" style={{ animationDelay: `${idx * 100}ms` }}>
                {/* Section Title */}
                <div
                  className={`font-bold text-sm uppercase tracking-wider mb-2 pb-2 border-b-2 ${
                    isDoctorMode
                      ? 'text-amber-700 border-amber-200'
                      : 'text-blue-700 border-blue-200'
                  }`}
                >
                  {section.title}
                </div>

                {/* Section Content */}
                <div className="space-y-2">
                  {section.content.split('\n').map((line, lineIdx) => {
                    const cleanLine = line.replace(/^[\d\.\-\*]+\s*/, '').trim();
                    const isBullet = line.trim().match(/^[\d\.\-\*]/);

                    return (
                      <p
                        key={lineIdx}
                        className={`text-sm leading-relaxed ${
                          isBullet ? 'ml-2 text-gray-800' : 'text-gray-800'
                        }`}
                      >
                        {isBullet && <span className="font-semibold mr-1">•</span>}
                        {cleanLine}
                      </p>
                    );
                  })}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Note */}
        <div
          className={`px-6 py-3 border-t ${
            isDoctorMode
              ? 'bg-amber-50 border-amber-200'
              : 'bg-blue-50 border-blue-200'
          }`}
        >
          <p className="text-xs text-gray-600">
            ℹ️ {isDoctorMode ? 'These are AI-generated clinical suggestions. Always apply your clinical judgment.' : 'These are AI-generated suggestions. Always consult with a healthcare professional for medical advice.'}
          </p>
        </div>
      </div>
    </div>
  );
}
