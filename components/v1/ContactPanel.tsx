"use client";

import { useState } from "react";
import { personInfo } from "@/lib/static-data";
import { useLang } from "@/lib/lang-context";
import { ui } from "@/lib/i18n";

function CopyButton({ value, copyLabel, copiedLabel }: { value: string; copyLabel: string; copiedLabel: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard access can be refused (insecure origin, denied permission).
      // The value stays selectable and the mailto/tel link still works, so an
      // unhandled rejection here would be worse than doing nothing.
    }
  };

  return (
    <button
      onClick={handleCopy}
      aria-live="polite"
      className="flex-shrink-0 text-xs font-medium text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors flex items-center gap-1.5"
    >
      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        {copied ? (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        ) : (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
        )}
      </svg>
      {copied ? copiedLabel : copyLabel}
    </button>
  );
}

/** The same label/value register as the About facts. Contact was the last panel
 *  still wrapping every row in its own bordered card with a tinted icon tile. */
function ContactRow({
  label,
  value,
  href,
  copyLabel,
  copiedLabel,
  numeric,
}: {
  label: string;
  value: string;
  href: string;
  copyLabel: string;
  copiedLabel: string;
  numeric?: boolean;
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-[6rem_1fr_auto] gap-1 sm:gap-6 items-baseline py-4 border-t border-[var(--border)] first:border-t-0">
      <dt className="text-xs uppercase tracking-wide text-[var(--text-muted)]">{label}</dt>
      <dd className="min-w-0">
        <a
          href={href}
          className={`text-[var(--text)] font-medium hover:text-[var(--accent)] transition-colors break-all ${
            numeric ? "tabular-nums" : ""
          }`}
        >
          {value}
        </a>
      </dd>
      <CopyButton value={value} copyLabel={copyLabel} copiedLabel={copiedLabel} />
    </div>
  );
}

export default function ContactPanel() {
  const { lang } = useLang();
  const t = ui[lang];

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <h2 className="text-2xl font-bold text-[var(--text)] text-center">{t.contactHeading}</h2>

      <dl className="bg-[var(--bg-card)] border border-[var(--border)] px-6 py-2 sm:px-8">
        <ContactRow
          label={t.email}
          value={personInfo.email}
          href={`mailto:${personInfo.email}`}
          copyLabel={t.copy}
          copiedLabel={t.copied}
        />
        <ContactRow
          label={t.phone}
          value={personInfo.phone}
          href={`tel:${personInfo.phone}`}
          copyLabel={t.copy}
          copiedLabel={t.copied}
          numeric
        />
      </dl>
    </div>
  );
}
