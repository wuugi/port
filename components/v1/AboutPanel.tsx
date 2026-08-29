"use client";

import Image from "next/image";
import { personInfo } from "@/lib/static-data";
import { useLang } from "@/lib/lang-context";
import { ui, tPerson } from "@/lib/i18n";

/** Label beside value, not four equal boxes: these facts differ in length and in
 *  kind, and forcing them into one shape is what made the row read uneven. */
function Fact({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-[8rem_1fr] gap-1 sm:gap-6 py-3.5 first:pt-0 last:pb-0 border-t border-[var(--rule)] first:border-t-0">
      <dt className="text-xs uppercase tracking-wide text-[var(--text-muted)] sm:pt-0.5">
        {label}
      </dt>
      <dd className="space-y-0.5 min-w-0">{children}</dd>
    </div>
  );
}

export default function AboutPanel() {
  const { lang } = useLang();
  const t = ui[lang];
  const p = tPerson(personInfo, lang);

  return (
    <div className="space-y-10">
      {/* Lead: one identity block — the person, the claim, and the evidence for it. */}
      <section>
        <div className="flex flex-col sm:flex-row sm:items-start gap-6 sm:gap-8">
          {/* No frame: the photograph is its own edge, and with the panel cards
              gone a tinted border here would be the loudest box on the page. */}
          <div className="w-24 h-24 sm:w-32 sm:h-32 overflow-hidden bg-[var(--bg-card)] flex items-center justify-center flex-shrink-0">
            {personInfo.profileImage ? (
              // The source is 921×1152 but the box is 96–128 CSS px, so 128 is the
              // real intrinsic size: retina then fetches the 256px candidate rather
              // than a 640px one. `priority` keeps the LCP element eager.
              <Image
                src={personInfo.profileImage}
                alt={personInfo.name}
                width={128}
                height={128}
                priority
                className="w-full h-full object-cover object-top"
              />
            ) : (
              <span className="text-[var(--accent)] text-4xl font-bold">김</span>
            )}
          </div>

          <div className="min-w-0 flex-1">
            <h2 className="text-3xl sm:text-4xl font-bold text-[var(--text)] tracking-tight">
              {lang === "en" && personInfo.nameEn ? personInfo.nameEn : personInfo.name}
            </h2>
            <p className="mt-2 text-[var(--accent)] text-base sm:text-lg text-balance">{p.title}</p>

            {/* No artificial cap: the text fills the column the photo leaves, so
                lines break on their own rhythm instead of against a narrow gutter.
                The intro is authored as paragraphs and stays paragraphs — run
                together it is a five-sentence wall on a page meant to be scanned. */}
            <div className="mt-6 space-y-4 text-[var(--text-muted)] leading-[1.9] text-[15px] text-pretty">
              {p.intro.split("\n\n").map((para) => (
                <p key={para.slice(0, 24)}>{para}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 자격증 and 어학 are separate facts and now say so, instead of sharing one
          merged label above three flat lines. */}
      <section className="border-t border-[var(--border)] pt-2 mt-10">
        <dl>
          <Fact label={t.email}>
            <a
              href={`mailto:${personInfo.email}`}
              className="text-[var(--text)] text-sm font-medium hover:text-[var(--accent)] transition-colors break-all"
            >
              {personInfo.email}
            </a>
          </Fact>

          <Fact label={t.phone}>
            <a
              href={`tel:${personInfo.phone}`}
              className="text-[var(--text)] text-sm font-medium tabular-nums hover:text-[var(--accent)] transition-colors"
            >
              {personInfo.phone}
            </a>
          </Fact>

          <Fact label={t.education}>
            <p className="text-[var(--text)] text-sm font-medium">{p.education}</p>
            <p className="text-[var(--text-muted)] text-xs tabular-nums">
              {personInfo.educationPeriod}
            </p>
          </Fact>

          <Fact label={t.certifications}>
            {p.certifications.map((item) => (
              <p key={item} className="text-[var(--text)] text-sm">{item}</p>
            ))}
          </Fact>

          <Fact label={t.languages}>
            {p.languages.map((item) => (
              <p key={item} className="text-[var(--text)] text-sm">{item}</p>
            ))}
          </Fact>
        </dl>
      </section>
    </div>
  );
}
