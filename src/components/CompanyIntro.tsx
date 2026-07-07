import { CheckCircle, Shield, Award, Users, Star, Smile } from "lucide-react";

export default function CompanyIntro() {
  const stats = [
    { label: "누적 공사지원 건수", value: "8,500+", suffix: "건", desc: "행위허가 및 동의서" },
    { label: "함께하는 파트너사", value: "340+", suffix: "개소", desc: "인테리어 업체" },
    { label: "고객 만족도", value: "99.2", suffix: "%", desc: "실제 고객 조사 기준" },
    { label: "수도권 전문 지사", value: "8", suffix: "개", desc: "빠른 현장 투입" },
  ];

  return (
    <div className="space-y-16">
      {/* Hero Banner Section */}
      <section className="relative bg-gradient-to-br from-emerald-850 to-slate-900 py-20 text-white overflow-hidden rounded-2xl shadow-xl">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=1200" 
            alt="Office Business" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-4xl mx-auto px-6 text-center space-y-4">
          <span className="text-[#FF7A00] uppercase tracking-widest text-xs font-black bg-orange-500/15 px-3.5 py-1.5 rounded-full border border-orange-500/20">
            ABOUT DONGHAENG
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            인테리어 업체의 든든한 날개, <span className="text-[#FF7A00]">동행</span>입니다.
          </h1>
          <p className="text-sm sm:text-base text-slate-200 max-w-2xl mx-auto leading-relaxed">
            행위허가부터 공사동의서, 엘리베이터 보양, 소방 설치, 폐기물 처리까지.<br />
            복잡하고 번거로운 공사 행정 및 현장 지원업무는 동행에게 맡기고, 오직 아름다운 공간 창조에만 집중하세요.
          </p>
        </div>
      </section>

      {/* Core values */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
          <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center text-orange-600 border border-orange-100">
            <Shield className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-black text-slate-800">빠르고 정교한 행정</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            관할 지자체 건축과 및 소방서와의 유기적인 업무 처리 역량으로, 단 하루의 착공 딜레이도 발생하지 않도록 철저한 타임라인 관리를 실현합니다.
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
          <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 border border-emerald-100">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-black text-slate-800">검증된 전문 인력</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            친절함과 정성스러운 태도로 교육받은 동행 소속 직영 현장 매니저들이 방문하여 민원 요소를 사전에 차단하고, 높은 공사 동의율을 빠르게 수렴합니다.
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
          <div className="w-12 h-12 bg-[#f3faf6] rounded-xl flex items-center justify-center text-emerald-700 border border-emerald-200">
            <Users className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-black text-slate-800">동반 성장 (동행)</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            단순 대행사를 넘어 인테리어 소장님의 소중한 파트너로서 예산을 절감하고, 신뢰성 있는 파트너십 브랜드를 구축하도록 돕습니다.
          </p>
        </div>
      </section>

      {/* Stats Board */}
      <section className="bg-white p-10 rounded-2xl border border-slate-200/80 shadow-sm">
        <div className="text-center max-w-xl mx-auto mb-10">
          <h2 className="text-2xl font-bold text-slate-800">숫자로 증명하는 동행의 영향력</h2>
          <p className="text-xs text-slate-400 mt-2">
            수년간의 끈기 있는 실행력과 풍부한 아파트 공사지원 경험으로 쌓아 올린 신뢰의 지표입니다.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center divide-y lg:divide-y-0 lg:divide-x divide-slate-100">
          {stats.map((stat, idx) => (
            <div key={idx} className="pt-6 lg:pt-0">
              <span className="block text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight">
                {stat.value}<span className="text-[#FF7A00] text-lg font-bold ml-0.5">{stat.suffix}</span>
              </span>
              <span className="block text-xs font-semibold text-slate-600 mt-1">{stat.label}</span>
              <span className="block text-[10px] text-slate-400 mt-0.5">{stat.desc}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Greetings Block */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <div className="space-y-2">
            <span className="text-[#FF7A00] font-bold text-xs tracking-wider block">동행 CEO의 약속</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 leading-tight">
              &ldquo;인테리어 소장님의 시간은<br />더 가치 있게 쓰여야 합니다.&rdquo;
            </h2>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed">
            안녕하십니까, 공감리빌드 대표 박영자입니다.<br /><br />
            인테리어 사업은 소비자 만족도 극대화와 철저한 디테일 시공이 핵심인 고난도 비즈니스입니다. 하지만 현장에서는 자치구청 행위허가 서류 작성, 민감한 입주민 동의서 수집, 승강기 흠집 방지를 위한 엘리베이터 보양, 소방법 준수 등 수많은 행정 실무와 기초 작업으로 인해 정작 본연의 시공 관리에 에너지를 빼앗기곤 합니다.<br /><br />
            동행은 이러한 애로사항을 완벽히 해결해 드리고자 출범했습니다. 정직한 투명 단가, 실시간 진행 보고 시스템, 그리고 신속한 사후관리를 무기로 소장님들께서 최고의 마감 퀄리티를 완성할 수 있도록 든든한 동반자가 되어 드릴 것을 약속합니다.
          </p>
          <div className="flex items-center gap-3 pt-2">
            <div className="w-10 h-10 rounded-full bg-emerald-100 overflow-hidden flex items-center justify-center font-bold text-emerald-700">
              CEO
            </div>
            <div>
              <span className="block text-xs font-bold text-slate-800">박영자 대표이사</span>
              <span className="block text-[10px] text-slate-400">동행 임직원 일동 드림</span>
            </div>
          </div>
        </div>
        <div className="relative h-80 md:h-[26rem] rounded-2xl overflow-hidden bg-slate-100 shadow-sm">
          <img 
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=600" 
            alt="Interior design completion meeting" 
            className="w-full h-full object-cover"
          />
        </div>
      </section>
    </div>
  );
}
