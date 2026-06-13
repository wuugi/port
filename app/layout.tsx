import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/lib/theme-context";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "김현욱 포트폴리오 | Operation Manager",
  description:
    "6년차 서비스 오퍼레이터, 고객 경험과 데이터를 보는 Operation Manager 김현욱의 포트폴리오입니다.",
  keywords: ["포트폴리오", "오퍼레이션 매니저", "서비스 운영", "고객 경험", "데이터 분석"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
