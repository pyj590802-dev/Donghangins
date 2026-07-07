import { useState, FormEvent } from "react";
import { faqsData } from "../data";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { HelpCircle, ChevronDown, ChevronUp, Mail, Send, CheckCircle, PhoneCall, FileText } from "lucide-react";

export default function FaqAndCs() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [qaName, setQaName] = useState("");
  const [qaContact, setQaContact] = useState("");
  const [qaEmail, setQaEmail] = useState("");
  const [qaSubject, setQaSubject] = useState("");
  const [qaMessage, setQaMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const toggleFaq = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  const handleContactSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!qaName || !qaContact || !qaMessage) {
      setError("성함, 연락처, 문의 내용을 입력해 주세요.");
      return;
    }

    setLoading(true);

    try {
      await addDoc(collection(db, "questions"), {
        name: qaName,
        contact: qaContact,
        email: qaEmail,
        subject: qaSubject || "기타 공사지원 일반문의",
        message: qaMessage,
        createdAt: new Date().toISOString(),
        status: "대기"
      });

      setSuccess(true);
      setQaName("");
      setQaContact("");
      setQaEmail("");
      setQaSubject("");
      setQaMessage("");

      setTimeout(() => {
        setSuccess(false);
      }, 4000);
    } catch (err: any) {
      console.error(err);
      setError("문의 등록에 실패했습니다. 다시 시도해 주세요.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start text-slate-800">
      {/* Left Column: FAQ Accordion (Cols 7) */}
      <div className="lg:col-span-7 space-y-6">
        <div>
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-1.5">
            <HelpCircle className="w-5 h-5 text-[#FF7A00]" />
            <span>자주 묻는 질문 (FAQ)</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">행위허가, 공사동의서 및 보양 진행 시 파트너 소장님들이 가장 자주 여쭤보시는 질문입니다.</p>
        </div>

        <div className="space-y-3">
          {faqsData.map((faq, idx) => (
            <div
              key={idx}
              className="glass-panel rounded-xl border border-slate-200/80 shadow-md overflow-hidden transition-all duration-200"
            >
              <button
                onClick={() => toggleFaq(idx)}
                className="w-full text-left px-5 py-4 font-bold text-xs sm:text-sm text-slate-800 hover:bg-slate-50/50 flex items-center justify-between gap-4"
              >
                <span>{faq.question}</span>
                {openIndex === idx ? (
                  <ChevronUp className="w-4 h-4 text-[#FF7A00] shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                )}
              </button>
              
              {openIndex === idx && (
                <div className="px-5 pb-5 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CS Call Center Panel */}
        <div className="bg-orange-50/50 border border-orange-100 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
          <div className="space-y-1 text-center sm:text-left">
            <span className="text-[10px] text-orange-700 font-extrabold uppercase tracking-wide">전화 상담 서비스</span>
            <h4 className="text-sm font-bold text-slate-800">이메일 접수보다 빠른 상담이 필요하신가요?</h4>
            <p className="text-xs text-slate-500">동행의 친절한 어드바이저가 언제든 직통으로 답변해 드립니다.</p>
          </div>
          <a
            href="tel:010-7782-7299"
            className="bg-[#FF7A00] hover:bg-[#e06c00] text-white py-2.5 px-4 rounded-xl text-xs font-black tracking-wider transition-all flex items-center gap-1.5 shadow-lg shadow-orange-500/10 hover:scale-105"
          >
            <PhoneCall className="w-4 h-4 text-white" />
            <span>010-7782-7299</span>
          </a>
        </div>
      </div>

      {/* Right Column: 1:1 Q&A Contact Form (Cols 5) */}
      <div className="lg:col-span-5 glass-panel border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-xl">
        <div className="border-b border-slate-100 pb-4 mb-5">
          <h2 className="text-lg font-bold text-slate-800 flex items-center gap-1.5">
            <Mail className="w-5 h-5 text-[#FF7A00]" />
            <span>1:1 이메일 간편 문의</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">상담을 신청하시면 1시간 이내로 확인 전화를 드립니다.</p>
        </div>

        {success ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center border border-emerald-100 text-emerald-600 mx-auto">
              <CheckCircle className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-bold text-slate-800">문의 사항이 잘 접수되었습니다.</h4>
            <p className="text-xs text-slate-500 leading-normal">
              남겨주신 번호로 담당 기술 총괄 매니저가 연락처 및 일정을 상세 검토 후 회신 드리겠습니다. 감사합니다.
            </p>
          </div>
        ) : (
          <form onSubmit={handleContactSubmit} className="space-y-4">
            {error && (
              <div className="p-3 bg-red-50 text-red-600 text-xs rounded-lg font-semibold border border-red-100">
                {error}
              </div>
            )}

            <div>
              <label className="block text-[10px] font-bold text-slate-600 mb-1">성함 또는 업체명 *</label>
              <input
                type="text"
                required
                placeholder="예: 라온디자인 강소장"
                value={qaName}
                onChange={(e) => setQaName(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:bg-white focus:ring-2 focus:ring-[#FF7A00] outline-none transition-all"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-bold text-slate-600 mb-1">연락처 *</label>
                <input
                  type="tel"
                  required
                  placeholder="예: 010-1234-5678"
                  value={qaContact}
                  onChange={(e) => setQaContact(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:bg-white focus:ring-2 focus:ring-[#FF7A00] outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-600 mb-1">이메일 주소</label>
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={qaEmail}
                  onChange={(e) => setQaEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:bg-white focus:ring-2 focus:ring-[#FF7A00] outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-600 mb-1">문의 제목</label>
              <input
                type="text"
                placeholder="예: 승강기 전체보양 견적 문의"
                value={qaSubject}
                onChange={(e) => setQaSubject(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:bg-white focus:ring-2 focus:ring-[#FF7A00] outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-600 mb-1">문의 상세 내용 *</label>
              <textarea
                rows={4}
                required
                placeholder="공사 위치, 필요한 서비스 항목(예: 동의서+보양), 특이 규정 등을 상세히 적어주시면 훨씬 수월한 상담이 가능합니다."
                value={qaMessage}
                onChange={(e) => setQaMessage(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:bg-white focus:ring-2 focus:ring-[#FF7A00] outline-none transition-all resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#FF7A00] hover:bg-[#e06c00] text-white py-2.5 rounded-lg text-xs font-bold transition-all shadow-lg shadow-orange-500/10 flex items-center justify-center gap-1"
            >
              <Send className="w-3.5 h-3.5 text-white" />
              <span>{loading ? "전송하는 중..." : "상담 문의 신청하기"}</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
