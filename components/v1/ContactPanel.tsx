"use client";

import { useState } from "react";
import { personInfo } from "@/lib/static-data";
import { useLang } from "@/lib/lang-context";
import { ui } from "@/lib/i18n";

function CopyButton({ value, copyLabel, copiedLabel }: { value: string; copyLabel: string; copiedLabel: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="px-3 py-1.5 text-xs font-medium border border-[var(--accent)]/40 text-[var(--accent)] hover:bg-[var(--accent-subtle)] transition-colors flex items-center gap-1.5"
    >
      {copied ? (
        <>
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          {copiedLabel}
        </>
      ) : (
        <>
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          {copyLabel}
        </>
      )}
    </button>
  );
}

function ContactCard({ icon, label, value, href, copyLabel, copiedLabel }: {
  icon: React.ReactNode; label: string; value: string; href: string; copyLabel: string; copiedLabel: string;
}) {
  return (
    <div className="bg-[var(--bg-card)] border border-[var(--border)] p-5 flex items-center gap-4">
      <div className="w-12 h-12 bg-[var(--accent-subtle)] border border-[var(--accent)]/20 flex items-center justify-center text-[var(--accent)] flex-shrink-0">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[var(--text-muted)] text-xs mb-0.5">{label}</p>
        <a href={href} className="text-[var(--text)] font-medium hover:text-[var(--accent)] transition-colors truncate block">
          {value}
        </a>
      </div>
      <CopyButton value={value} copyLabel={copyLabel} copiedLabel={copiedLabel} />
    </div>
  );
}

export default function ContactPanel() {
  const { lang } = useLang();
  const t = ui[lang];

  return (
    <div className="panel-enter max-w-2xl mx-auto space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-[var(--text)] mb-2">{t.contactHeading}</h2>
        <p className="text-[var(--text-muted)]">{t.contactSubheading}</p>
      </div>

      <div className="space-y-4">
        <ContactCard
          icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>}
          label={t.email} value={personInfo.email} href={`mailto:${personInfo.email}`}
          copyLabel={t.copy} copiedLabel={t.copied}
        />
        <ContactCard
          icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>}
          label={t.phone} value={personInfo.phone} href={`tel:${personInfo.phone}`}
          copyLabel={t.copy} copiedLabel={t.copied}
        />
      </div>

      <div className="bg-[var(--accent-subtle)] border border-[var(--accent)]/20 p-6 text-center">
        <div className="inline-flex items-center gap-2 mb-3">
          <span className="w-2 h-2 bg-[var(--color-green)] rounded-full animate-pulse" />
          <span className="text-[var(--color-green)] text-sm font-medium">{t.openToOpportunities}</span>
        </div>
        <p className="text-[var(--text-muted)] text-sm">{t.openToOpportunitiesDesc}</p>
      </div>
    </div>
  );
}
