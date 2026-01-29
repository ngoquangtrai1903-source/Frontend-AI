'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Navigation() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="bg-white/80 backdrop-blur-xl border-b border-purple-100/50 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
              <span className="text-white text-xl font-bold">D</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                DiabeTwin
              </h1>
              <p className="text-xs text-gray-500">Health AI</p>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                isActive('/')
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-purple-50'
              }`}
            >
              Home
            </Link>

            <Link
              href="/user-prediction"
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                isActive('/user-prediction')
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-purple-50'
              }`}
            >
              User Check
            </Link>

            <Link
              href="/doctor"
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                isActive('/doctor')
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-purple-50'
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
