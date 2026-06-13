import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-navy-900 flex items-center justify-center p-6">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-3">김현욱 포트폴리오</h1>
          <p className="text-slate-400 text-lg">고객 경험과 데이터를 보는 Operation Manager (6년차)</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* V1 Card */}
          <Link href="/v1" className="group block">
            <div className="relative bg-navy-800 border border-slate-700 rounded-2xl p-6 hover:border-indigo-500 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/10">
              <div className="absolute -top-3 left-4">
                <span className="bg-indigo-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                  추천
                </span>
              </div>
              <div className="mt-2">
                <div className="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-indigo-500/20 transition-colors">
                  <svg
                    className="w-6 h-6 text-indigo-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h7"
                    />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-white mb-2">V1: 카드 + 메뉴 레이아웃</h2>
                <p className="text-slate-400 text-sm leading-relaxed">
                  고정 상단 네비게이션과 패널 전환 방식. 다크 테마, 섹션별 정보를 탭으로 전환하며 확인.
                </p>
              </div>
              <div className="mt-4 flex items-center text-indigo-400 text-sm font-medium group-hover:text-indigo-300 transition-colors">
                보러가기
                <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>

          {/* V2 Card */}
          <Link href="/v2" className="group block">
            <div className="bg-navy-800 border border-slate-700 rounded-2xl p-6 hover:border-violet-500 transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/10">
              <div className="w-12 h-12 bg-violet-500/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-violet-500/20 transition-colors">
                <svg
                  className="w-6 h-6 text-violet-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-white mb-2">V2: 스크롤 레이아웃</h2>
              <p className="text-slate-400 text-sm leading-relaxed">
                라이트 테마, 스크롤 기반 섹션 탐색. 히어로 섹션, 타임라인, 스킬 바를 포함한 전통적 포트폴리오 형식.
              </p>
              <div className="mt-4 flex items-center text-violet-400 text-sm font-medium group-hover:text-violet-300 transition-colors">
                보러가기
                <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>
        </div>

        <p className="text-center text-slate-600 text-sm mt-8">
          © 2026 김현욱. All rights reserved.
        </p>
      </div>
    </main>
  );
}
