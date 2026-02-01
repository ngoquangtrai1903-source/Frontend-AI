'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export function Navigation() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isActive = (path: string) => {
    if (!mounted) return false;
    return pathname === path;
  };

  // Render placeholder during SSR to avoid hydration mismatch
  const navLinks = (
    <div className="flex items-center gap-1 overflow-x-auto">
      <Link
        href="/"
        className={`px-2 sm:px-4 py-2 rounded-md font-medium transition-all duration-150 whitespace-nowrap text-sm sm:text-base ${
          isActive('/')
            ? 'bg-blue-600 text-white shadow-sm'
            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
        }`}
      >
        Home
      </Link>

      <Link
        href="/user-prediction"
        className={`px-2 sm:px-4 py-2 rounded-md font-medium transition-all duration-150 whitespace-nowrap text-sm sm:text-base ${
          isActive('/user-prediction')
            ? 'bg-blue-600 text-white shadow-sm'
            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
        }`}
      >
        <span className="hidden sm:inline">User Check</span>
        <span className="sm:hidden">Check</span>
      </Link>

      <Link
        href="/doctor"
        className={`px-2 sm:px-4 py-2 rounded-md font-medium transition-all duration-150 whitespace-nowrap text-sm sm:text-base ${
          isActive('/doctor')
            ? 'bg-blue-600 text-white shadow-sm'
            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
        }`}
      >
        Doctor
      </Link>

      <Link
        href="/about"
        className={`px-2 sm:px-4 py-2 rounded-md font-medium transition-all duration-150 whitespace-nowrap text-sm sm:text-base ${
          isActive('/about')
            ? 'bg-blue-600 text-white shadow-sm'
            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
        }`}
      >
        About
      </Link>
    </div>
  );

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 sm:gap-3 hover:opacity-80 transition-opacity duration-150 flex-shrink-0">
            <div className="w-8 sm:w-10 h-8 sm:h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-white text-lg sm:text-xl font-bold">D</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg sm:text-2xl font-bold text-gray-900">DiabeTwin</h1>
              <p className="text-xs text-gray-500">Health AI</p>
            </div>
          </Link>

          {/* Navigation Links - only rendered after mount to prevent hydration mismatch */}
          {mounted ? navLinks : <div className="w-32 sm:w-96 h-10" />}
        </div>
      </div>
    </nav>
  );
}
