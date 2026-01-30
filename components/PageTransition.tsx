'use client';

import { useEffect, useState } from 'react';

export function PageTransition({ children }: { children: React.ReactNode }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className={isVisible ? 'page-transition' : ''}>
      {children}
    </div>
  );
}
