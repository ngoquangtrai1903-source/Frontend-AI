'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Navigation() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity duration-150">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-xl font-bold">D</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">DiabeTwin</h1>
              <p className="text-xs text-gray-500">Health AI</p>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-1">
            <Link
              href="/"
              className={`px-4 py-2 rounded-md font-medium transition-all duration-150 ${
                isActive('/')
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              Home
            </Link>

            <Link
              href="/user-prediction"
              className={`px-4 py-2 rounded-md font-medium transition-all duration-150 ${
                isActive('/user-prediction')
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              User Check
            </Link>

            <Link
              href="/doctor"
              className={`px-4 py-2 rounded-md font-medium transition-all duration-150 ${
                isActive('/doctor')
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              Doctor
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
