"use client";

import { useState } from "react";
import { personInfo } from "@/lib/static-data";
import { SectionHeader } from "./AboutSection";

function CopyButton({ value, light = true }: { value: string; light?: boolean }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="px-3 py-1.5 text-xs font-medium rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-colors flex items-center gap-1.5 border border-indigo-200"
    >
      {copied ? (
        <>
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          복사됨
        </>
      ) : (
        <>
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          복사
        </>
      )}
    </button>
  );
}

export default function ContactSection() {
  return (
    <section id="contact" className="py-24 bg-white px-4">
      <div className="max-w-2xl mx-auto">
        <SectionHeader title="Contact" subtitle="연락하기" />

        <div className="mt-12 space-y-4">
          <div className="bg-gray-50 rounded-2xl border border-gray-200 p-5 flex items-center gap-4">
            <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-500 flex-shrink-0">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-gray-400 text-xs mb-0.5">이메일</p>
              <a href={`mailto:${personInfo.email}`} className="text-gray-800 font-medium hover:text-indigo-600 transition-colors">
                {personInfo.email}
              </a>
            </div>
            <CopyButton value={personInfo.email} />
          </div>

          <div className="bg-gray-50 rounded-2xl border border-gray-200 p-5 flex items-center gap-4">
            <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-500 flex-shrink-0">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-gray-400 text-xs mb-0.5">전화번호</p>
              <a href={`tel:${personInfo.phone}`} className="text-gray-800 font-medium hover:text-indigo-600 transition-colors">
                {personInfo.phone}
              </a>
            </div>
            <CopyButton value={personInfo.phone} />
          </div>
        </div>

        {/* Open to Work */}
        <div className="mt-8 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl border border-indigo-100 p-6 text-center">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            <span className="text-emerald-600 text-sm font-semibold">현재 기회에 열려 있습니다</span>
          </div>
          <p className="text-gray-600 text-sm leading-relaxed">
            서비스 운영, 고객 경험 개선, 데이터 기반 의사결정이 필요한 곳이라면 언제든지 연락주세요.
          </p>
          <a
            href={`mailto:${personInfo.email}`}
            className="inline-flex items-center gap-2 mt-4 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-medium transition-colors"
          >
            이메일 보내기
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>

        <p className="text-center text-gray-400 text-xs mt-8">
          © 2026 김현욱. All rights reserved.
        </p>
      </div>
    </section>
  );
}
