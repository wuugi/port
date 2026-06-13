"use client";

import { personInfo } from "@/lib/static-data";

export default function AboutSection() {
  return (
    <section id="about" className="py-24 bg-white px-4">
      <div className="max-w-5xl mx-auto">
        <SectionHeader title="About Me" subtitle="소개" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 border border-indigo-100">
              <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-3xl font-black">김</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 text-center">{personInfo.name}</h3>
              <p className="text-indigo-600 text-sm text-center mt-1">Operation Manager</p>

              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <span className="text-gray-400">이메일</span>
                  <a href={`mailto:${personInfo.email}`} className="text-gray-700 hover:text-indigo-600 transition-colors truncate">
                    {personInfo.email}
                  </a>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <span className="text-gray-400">전화</span>
                  <span className="text-gray-700">{personInfo.phone}</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-indigo-100">
                <p className="text-xs text-gray-500 mb-1">학력</p>
                <p className="text-sm font-medium text-gray-800">{personInfo.education}</p>
                <p className="text-xs text-gray-500 mt-0.5">{personInfo.educationPeriod}</p>
              </div>

              <div className="mt-4 pt-4 border-t border-indigo-100 flex gap-2 flex-wrap">
                {personInfo.certifications.map((cert) => (
                  <span key={cert} className="px-2 py-1 bg-white rounded-lg text-xs text-gray-700 border border-indigo-100 shadow-sm">
                    {cert}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Intro */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
              <h4 className="text-gray-900 font-semibold mb-3">자기소개</h4>
              <p className="text-gray-600 leading-relaxed">{personInfo.intro}</p>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {[
                { label: "경력", value: "6년차", icon: "💼" },
                { label: "자격증", value: "SQLD", icon: "📜" },
                { label: "TOEIC", value: "920", icon: "🌐" },
              ].map((item) => (
                <div key={item.label} className="bg-white border border-gray-200 rounded-xl p-4 text-center shadow-sm">
                  <span className="text-2xl">{item.icon}</span>
                  <p className="text-lg font-bold text-gray-900 mt-1">{item.value}</p>
                  <p className="text-gray-500 text-xs">{item.label}</p>
                </div>
              ))}
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
              <h4 className="text-gray-700 text-sm font-semibold mb-2">어학</h4>
              <div className="flex gap-2 flex-wrap">
                {personInfo.languages.map((lang) => (
                  <span key={lang} className="px-3 py-1 bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-full">
                    {lang}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function SectionHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="text-center">
      <p className="text-indigo-600 font-medium text-sm uppercase tracking-widest mb-2">{subtitle}</p>
      <h2 className="text-3xl sm:text-4xl font-black text-gray-900">{title}</h2>
      <div className="w-16 h-1 bg-indigo-600 rounded-full mx-auto mt-4" />
    </div>
  );
}
