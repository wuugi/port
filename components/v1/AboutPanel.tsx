"use client";

import { personInfo } from "@/lib/static-data";
import type { ActivePanel } from "@/lib/types";

interface AboutPanelProps {
  onNavigate: (panel: ActivePanel) => void;
}

export default function AboutPanel({ onNavigate }: AboutPanelProps) {
  return (
    <div className="panel-enter grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Left: Profile Info */}
      <div className="space-y-6">
        <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-20 h-20 rounded-2xl bg-[var(--accent-subtle)] border border-[var(--accent)]/30 flex items-center justify-center flex-shrink-0">
              <span className="text-[var(--accent)] text-2xl font-bold">김</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[var(--text)]">{personInfo.name}</h2>
              <p className="text-[var(--accent)] text-sm mt-1">{personInfo.title}</p>
            </div>
          </div>

          <div className="space-y-4">
            <InfoRow
              icon={
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              }
              label="이메일"
              value={personInfo.email}
            />
            <InfoRow
              icon={
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              }
              label="전화번호"
              value={personInfo.phone}
            />
          </div>
        </div>

        {/* Education */}
        <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-6">
          <h3 className="text-[var(--text)] font-semibold mb-4 flex items-center gap-2">
            <svg className="w-4 h-4 text-[var(--accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
            </svg>
            학력
          </h3>
          <div className="space-y-1">
            <p className="text-[var(--text)] font-medium">{personInfo.education}</p>
            <p className="text-[var(--text-muted)] text-sm">{personInfo.educationPeriod}</p>
          </div>
        </div>

        {/* Certifications & Languages */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-5">
            <h3 className="text-[var(--text)] font-semibold mb-3 text-sm">자격증</h3>
            <div className="space-y-1">
              {personInfo.certifications.map((cert) => (
                <p key={cert} className="text-[var(--text-muted)] text-sm">{cert}</p>
              ))}
            </div>
          </div>
          <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-5">
            <h3 className="text-[var(--text)] font-semibold mb-3 text-sm">어학</h3>
            <div className="space-y-1">
              {personInfo.languages.map((lang) => (
                <p key={lang} className="text-[var(--text-muted)] text-sm">{lang}</p>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right: Intro */}
      <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-6 flex flex-col">
        <h3 className="text-[var(--text)] font-semibold mb-4 flex items-center gap-2">
          <svg className="w-4 h-4 text-[var(--accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          자기소개
        </h3>
        <p className="text-[var(--text-muted)] leading-relaxed text-[15px] flex-1">
          {personInfo.intro}
        </p>

        {/* Key Highlights */}
        <div className="mt-6 grid grid-cols-3 gap-3">
          {[
            { label: "경력", value: "6년차" },
            { label: "자격증", value: "SQLD" },
            { label: "TOEIC", value: "920" },
          ].map((item) => (
            <div key={item.label} className="bg-[var(--accent-subtle)] rounded-xl p-3 text-center">
              <p className="text-[var(--accent)] font-bold text-lg">{item.value}</p>
              <p className="text-[var(--text-muted)] text-xs mt-0.5">{item.label}</p>
            </div>
          ))}
        </div>

        {/* Navigation CTAs */}
        <div className="mt-6 pt-5 border-t border-[var(--border)]">
          <p className="text-[var(--text-muted)] text-xs mb-3">더 알아보기</p>
          <div className="flex gap-3">
            <button
              onClick={() => onNavigate("career")}
              className="flex-1 py-2.5 rounded-xl border border-[var(--accent)]/40 text-[var(--accent)] text-sm font-medium hover:bg-[var(--accent-subtle)] transition-all"
            >
              Career →
            </button>
            <button
              onClick={() => onNavigate("projects")}
              className="flex-1 py-2.5 rounded-xl bg-[var(--accent)] text-sm font-medium hover:opacity-90 transition-all"
              style={{ color: "#0a1a14" }}
            >
              Projects →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 bg-[var(--accent-subtle)] rounded-lg flex items-center justify-center text-[var(--accent)] flex-shrink-0">
        {icon}
      </div>
      <div>
        <p className="text-[var(--text-muted)] text-xs">{label}</p>
        <p className="text-[var(--text)] text-sm font-medium">{value}</p>
      </div>
    </div>
  );
}
