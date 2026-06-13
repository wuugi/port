"use client";

import { useState } from "react";
import { personInfo } from "@/lib/static-data";

function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="px-3 py-1.5 text-xs font-medium rounded-lg bg-[var(--accent-subtle)] text-[var(--accent)] hover:bg-[var(--accent)]/20 transition-colors flex items-center gap-1.5"
    >
      {copied ? (
        <>
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
          복사됨
        </>
      ) : (
        <>
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </svg>
          복사
        </>
      )}
    </button>
  );
}

function ContactCard({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href: string;
}) {
  return (
    <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-5 flex items-center gap-4">
      <div className="w-12 h-12 bg-[var(--accent-subtle)] rounded-xl flex items-center justify-center text-[var(--accent)] flex-shrink-0">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[var(--text-muted)] text-xs mb-0.5">{label}</p>
        <a
          href={href}
          className="text-[var(--text)] font-medium hover:text-[var(--accent)] transition-colors truncate block"
        >
          {value}
        </a>
      </div>
      <CopyButton value={value} />
    </div>
  );
}

export default function ContactPanel() {
  return (
    <div className="panel-enter max-w-2xl mx-auto space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-[var(--text)] mb-2">연락하기</h2>
        <p className="text-[var(--text-muted)]">협업 제안이나 채용 문의는 아래 연락처로 연락주세요.</p>
      </div>

      <div className="space-y-4">
        <ContactCard
          icon={
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          }
          label="이메일"
          value={personInfo.email}
          href={`mailto:${personInfo.email}`}
        />

        <ContactCard
          icon={
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
          }
          label="전화번호"
          value={personInfo.phone}
          href={`tel:${personInfo.phone}`}
        />
      </div>

      {/* Availability */}
      <div className="bg-[var(--accent-subtle)] border border-[var(--accent)]/20 rounded-2xl p-6 text-center">
        <div className="inline-flex items-center gap-2 mb-3">
          <span className="w-2 h-2 bg-[#4ade80] rounded-full animate-pulse" />
          <span className="text-[#4ade80] text-sm font-medium">현재 기회에 열려 있습니다</span>
        </div>
        <p className="text-[var(--text-muted)] text-sm">
          서비스 운영, 고객 경험 개선, 데이터 기반 의사결정이 필요한 곳이라면 언제든지 연락주세요.
        </p>
      </div>
    </div>
  );
}
