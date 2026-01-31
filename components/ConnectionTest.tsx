'use client';

import { useEffect, useState } from 'react';
import { healthCheck } from '@/lib/api';

export function ConnectionTest() {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const [apiUrl, setApiUrl] = useState('');

  useEffect(() => {
    const testConnection = async () => {
      setApiUrl(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000');
      const connected = await healthCheck();
      setIsConnected(connected);
    };

    testConnection();
  }, []);

  if (isConnected === null) {
    return (
      <div className="p-4 bg-gray-100 rounded-lg text-center">
        Kiểm tra kết nối backend...
      </div>
    );
  }

  if (isConnected) {
    return (
      <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
        <p className="font-semibold">✓ Kết nối backend thành công</p>
        <p className="text-sm">{apiUrl}</p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
      <p className="font-semibold">✗ Không thể kết nối backend</p>
      <p className="text-sm mb-3">{apiUrl}</p>
      <div className="text-xs space-y-2">
        <p>Hãy kiểm tra:</p>
        <ul className="list-disc list-inside">
          <li>Backend đang chạy trên port 8000?</li>
          <li>Không có lỗi syntax trong clinical-input.py</li>
          <li>Dòng "a   pp.add_middleware" được sửa thành "app.add_middleware"</li>
          <li>Kiểm tra terminal backend có thông báo "Uvicorn running"</li>
        </ul>
      </div>
    </div>
  );
}
