import type { Metadata, Viewport } from "next";
import "./globals.css";
import { PageTransition } from "@/components/PageTransition";

export const metadata: Metadata = {
  title: "DiabeTwin - Hệ thống Dự đoán Tiểu đường AI",
  description: "Công nghệ AI tiên tiến giúp đánh giá nguy cơ tiểu đường chính xác và khoa học",
  keywords: "tiểu đường, AI, machine learning, y tế, chẩn đoán, sức khỏe",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#2563eb",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Playfair+Display:wght@700;900&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body className="antialiased font-sans" suppressHydrationWarning>
        <PageTransition>
          {children}
        </PageTransition>
      </body>
    </html>
  );
}
