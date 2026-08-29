import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/lib/theme-context";
import { LangProvider } from "@/lib/lang-context";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "김현욱 포트폴리오 | Operation Manager",
  // Matches the page: no years-of-experience claim, since the record says
  // 5년 3개월 and this is the line a search result shows first.
  description:
    "서비스 이슈를 데이터로 분석하고 고객 여정 전반을 설계해온 Operation Manager 김현욱의 포트폴리오입니다. 마이다스인 · 자비스앤빌런즈(삼쩜삼) · 플렉스.",
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
        <ThemeProvider>
          <LangProvider>{children}</LangProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
