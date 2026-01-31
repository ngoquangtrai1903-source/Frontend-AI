'use client';

import { useEffect, useState } from 'react';

export function PageTransition({ children }: { children: React.ReactNode }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="page-transition">
      {children}
    </div>
  );
}
