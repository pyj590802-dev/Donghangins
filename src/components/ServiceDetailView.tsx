import { useState } from "react";
import { ServiceDetail, servicesData } from "../data";
import { CheckCircle2, FileText, ArrowRight, Clock, HelpCircle, ShieldAlert } from "lucide-react";

interface ServiceDetailViewProps {
  onSelectServiceForBooking: (serviceTitle: string) => void;
}

export default function ServiceDetailView({ onSelectServiceForBooking }: ServiceDetailViewProps) {
  const [activeService, setActiveService] = useState<string>(servicesData[0].id);

  const currentService = servicesData.find(s => s.id === activeService) || servicesData[0];

  return (
    <div className="space-y-10">
      {/* Introduction */}
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">🛠️ 동행 원스톱 공사지원 서비스</h2>
        <p className="text-sm text-slate-500 mt-2">
          공사 인허가부터 마감 청소/폐기물 처리까지 원스톱으로 제공되는 신뢰의 지원 솔루션입니다.
        </p>
      </div>

      {/* Grid selector + detail layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left selector menu (Cols 4) */}
        <div className="lg:col-span-4 space-y-2">
          {servicesData.map((service) => (
            <button
              key={service.id}
              onClick={() => setActiveService(service.id)}
              className={`w-full text-left px-5 py-4 rounded-xl border font-bold text-sm transition-all duration-200 flex items-center justify-between group ${
                activeService === service.id
                  ? "bg-white border-[#FF7A00] text-slate-800 shadow-lg"
                  : "bg-white/60 border-slate-200 text-slate-700 hover:bg-white hover:border-slate-300"
              }`}
            >
              <span>{service.title}</span>
              <ArrowRight className={`w-4 h-4 transition-transform duration-200 ${
                activeService === service.id 
                  ? "text-[#FF7A00] translate-x-1" 
                  : "text-slate-400 group-hover:translate-x-1"
              }`} />
            </button>
          ))}
        </div>

        {/* Right detail panel (Cols 8) */}
        <div className="lg:col-span-8 glass-panel rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-xl space-y-6 text-slate-800">
          <div className="space-y-2">
            <span className="text-xs font-extrabold text-orange-700 tracking-wider uppercase bg-orange-50 border border-orange-100 px-2.5 py-1 rounded-md">
              SERVICE DETAILED SPEC
            </span>
            <h3 className="text-2xl font-black text-orange-600">{currentService.title}</h3>
            <p className="text-xs text-slate-500 font-medium leading-relaxed">
              {currentService.shortDesc}
            </p>
          </div>

          <hr className="border-slate-100" />

          {/* Description */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">서비스 상세 개요</h4>
            <p className="text-sm text-slate-600 leading-relaxed font-normal">
              {currentService.description}
            </p>
          </div>

          {/* Process steps */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">진행 절차 및 가이드</h4>
            <div className="relative border-l border-slate-200 pl-4 ml-2 space-y-4">
              {currentService.steps.map((step, idx) => (
                <div key={idx} className="relative">
                  <div className="absolute -left-[25px] top-0.5 w-4 h-4 rounded-full bg-[#FF7A00] border-2 border-[#f3faf6] flex items-center justify-center">
                    <span className="text-[8px] font-black text-white">{idx + 1}</span>
                  </div>
                  <p className="text-xs font-medium text-slate-600 leading-normal pl-2">{step}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Documents & Estimate */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
            {currentService.documents.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                  <FileText className="w-3.5 h-3.5 text-indigo-500" />
                  <span>필요 준비 서류</span>
                </h4>
                <ul className="space-y-1.5">
                  {currentService.documents.map((doc, idx) => (
                    <li key={idx} className="text-xs text-slate-600 flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{doc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#FF7A00]" />
                <span>예상 완료 소요 시간</span>
              </h4>
              <p className="text-xs text-slate-700 font-bold bg-[#FF7A00]/10 p-3 rounded-xl border border-[#FF7A00]/20 inline-block">
                ⏱️ {currentService.estimatedTime}
              </p>
              <p className="text-[10px] text-slate-400 leading-normal">
                ※ 현장 단지의 관리사무소 재량 및 관할 지자체 건축과 행정 결재 기간에 따라 일정 수준 달라질 수 있습니다.
              </p>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100 flex justify-end">
            <button
              onClick={() => onSelectServiceForBooking(currentService.title)}
              className="bg-[#FF7A00] hover:bg-[#e06c00] text-white py-3 px-6 rounded-xl font-bold text-sm transition-all shadow-lg shadow-orange-500/10 flex items-center space-x-1.5"
            >
              <span>📅 {currentService.title} 서비스 바로 예약하기</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
