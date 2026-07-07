import { useState, useEffect, FormEvent } from "react";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { servicesData } from "../data";
import { Calendar, Clock, MapPin, Phone, User, Mail, FileText, CheckCircle, AlertCircle } from "lucide-react";

interface BookingFormProps {
  user: any;
  preSelectedService?: string;
  onSuccess: () => void;
  onOpenAuth: () => void;
}

export default function BookingForm({
  user,
  preSelectedService = "",
  onSuccess,
  onOpenAuth,
}: BookingFormProps) {
  const [companyName, setCompanyName] = useState("");
  const [managerName, setManagerName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [memo, setMemo] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Set pre-selected service type and user details if logged in
  useEffect(() => {
    if (preSelectedService) {
      const found = servicesData.find(s => s.id === preSelectedService || s.title === preSelectedService);
      if (found) {
        setServiceType(found.title);
      } else {
        setServiceType(preSelectedService);
      }
    } else if (servicesData.length > 0) {
      setServiceType(servicesData[0].title);
    }
  }, [preSelectedService]);

  useEffect(() => {
    if (user) {
      setCompanyName(user.displayName || "");
      setEmail(user.email || "");
    }
  }, [user]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!user) {
      setError("예약을 신청하기 전에 로그인이 필요합니다.");
      onOpenAuth();
      return;
    }

    if (!companyName || !managerName || !contact || !email || !address || !serviceType || !date || !time) {
      setError("모든 필수 항목(*)을 입력해 주세요.");
      return;
    }

    setLoading(true);

    try {
      const reservationData = {
        companyName,
        managerName,
        contact,
        email,
        address,
        serviceType,
        date,
        time,
        memo,
        status: "대기",
        userId: user.uid || "anonymous",
        createdAt: new Date().toISOString()
      };

      // Add to Firestore
      const docRef = await addDoc(collection(db, "reservations"), reservationData);
      console.log("Document written with ID: ", docRef.id);
      
      setSuccess(true);
      // Reset optional fields
      setAddress("");
      setDate("");
      setTime("");
      setMemo("");
      
      setTimeout(() => {
        setSuccess(false);
        onSuccess();
      }, 3500);

    } catch (err: any) {
      console.error("Firestore Error: ", err);
      setError("서버와의 연결이 원활하지 않습니다. 다시 시도해 주세요.");
    } finally {
      setLoading(false);
    }
  };

  const getSelectedServiceDetails = () => {
    return servicesData.find(s => s.title === serviceType);
  };

  const selectedService = getSelectedServiceDetails();

  return (
    <div className="max-w-4xl mx-auto glass-panel rounded-2xl shadow-2xl border border-slate-200/80 overflow-hidden text-slate-800">
      {/* Intro header */}
      <div className="bg-slate-50/50 border-b border-slate-200/80 px-6 py-8 text-center">
        <h2 className="text-2xl font-bold tracking-tight text-slate-800">📅 공사지원 서비스 예약하기</h2>
        <p className="text-sm text-slate-500 mt-2 max-w-xl mx-auto">
          필요한 날짜와 시간, 현장 정보를 입력해 주시면 전문 담당 매니저가 신속하게 내용을 확인하고 일정을 조율해 드립니다.
        </p>
      </div>

      <div className="p-6 sm:p-10">
        {success ? (
          <div className="py-12 text-center max-w-md mx-auto">
            <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-100">
              <CheckCircle className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold text-slate-800">예약 신청이 성공적으로 완료되었습니다!</h3>
            <p className="text-sm text-slate-500 mt-2">
              담당자가 기재해주신 연락처로 곧 상담 및 일정 확정 전화를 드릴 예정입니다. 조금만 기다려 주십시오.
            </p>
            <div className="mt-6 p-4 bg-orange-50/50 rounded-lg text-xs text-left text-slate-600 border border-orange-100 shadow-xs">
              <span className="font-bold block mb-1 text-orange-700">💡 예약 진행 상황 확인 안내</span>
              상단 메뉴의 <span className="font-semibold text-slate-800 underline cursor-pointer" onClick={() => onSuccess()}>'예약조회'</span> 페이지에서 현재 접수 상태를 실시간으로 확인하실 수 있습니다.
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-3.5 bg-red-50 text-red-600 text-sm rounded-lg flex items-start space-x-2 border border-red-100">
                <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {!user && (
              <div className="p-4 bg-orange-50 border border-orange-200 rounded-xl text-sm text-slate-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex items-start space-x-2">
                  <AlertCircle className="w-5 h-5 text-[#FF7A00] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold">로그인이 필요한 서비스입니다</p>
                    <p className="text-xs text-slate-500 mt-0.5">예약 정보를 저장하고 변경/취소 현황을 확인하려면 로그인이 필요합니다.</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={onOpenAuth}
                  className="bg-[#FF7A00] hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-xs font-bold transition-all shrink-0 shadow-md"
                >
                  로그인 후 예약하기
                </button>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column: Business & Contact Info */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-slate-800 border-l-4 border-[#FF7A00] pl-2 mb-4">신청업체 정보</h3>
                
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1.5">업체명 (또는 개인 성함) *</label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      required
                      disabled={!user}
                      placeholder="예: 라온디자인"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:bg-white focus:ring-2 focus:ring-[#FF7A00] focus:border-[#FF7A00] outline-none transition-all disabled:opacity-50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1.5">현장 담당자명 *</label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      required
                      disabled={!user}
                      placeholder="예: 김성진 실장"
                      value={managerName}
                      onChange={(e) => setManagerName(e.target.value)}
                      className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:bg-white focus:ring-2 focus:ring-[#FF7A00] focus:border-[#FF7A00] outline-none transition-all disabled:opacity-50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1.5">연락처 *</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                    <input
                      type="tel"
                      required
                      disabled={!user}
                      placeholder="예: 010-1234-5678"
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                      className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:bg-white focus:ring-2 focus:ring-[#FF7A00] focus:border-[#FF7A00] outline-none transition-all disabled:opacity-50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1.5">이메일 주소 *</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                    <input
                      type="email"
                      required
                      disabled={!user}
                      placeholder="example@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:bg-white focus:ring-2 focus:ring-[#FF7A00] focus:border-[#FF7A00] outline-none transition-all disabled:opacity-50"
                    />
                  </div>
                </div>
              </div>

              {/* Right Column: Site & Service Details */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-slate-800 border-l-4 border-[#FF7A00] pl-2 mb-4">공사 지원 요청 세부 정보</h3>

                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1.5">서비스 선택 *</label>
                  <div className="relative">
                    <FileText className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                    <select
                      value={serviceType}
                      disabled={!user}
                      onChange={(e) => setServiceType(e.target.value)}
                      className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-[#FF7A00] focus:border-[#FF7A00] outline-none transition-all disabled:opacity-50 appearance-none cursor-pointer"
                    >
                      {servicesData.map((s) => (
                        <option key={s.id} value={s.title} className="bg-white text-slate-800">{s.title}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1.5">현장 주소 (아파트명, 동호수 필수) *</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      required
                      disabled={!user}
                      placeholder="예: 서울시 서초구 서초아파트 104동 1205호"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:bg-white focus:ring-2 focus:ring-[#FF7A00] focus:border-[#FF7A00] outline-none transition-all disabled:opacity-50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1.5">희망 날짜 *</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
                      <input
                        type="date"
                        required
                        disabled={!user}
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full pl-9 pr-2 py-2.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 focus:bg-white focus:ring-2 focus:ring-[#FF7A00] focus:border-[#FF7A00] outline-none transition-all disabled:opacity-50 cursor-pointer"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1.5">희망 시간 *</label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
                      <input
                        type="time"
                        required
                        disabled={!user}
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="w-full pl-9 pr-2 py-2.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 focus:bg-white focus:ring-2 focus:ring-[#FF7A00] focus:border-[#FF7A00] outline-none transition-all disabled:opacity-50 cursor-pointer"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1.5">요청사항 (메모) - 선택</label>
                  <textarea
                    rows={2}
                    disabled={!user}
                    placeholder="예: 엘리베이터가 노후되어 보양에 신경 써주세요, 60% 이상 동의 수령 요망 등"
                    value={memo}
                    onChange={(e) => setMemo(e.target.value)}
                    className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:bg-white focus:ring-2 focus:ring-[#FF7A00] focus:border-[#FF7A00] outline-none transition-all disabled:opacity-50 resize-none"
                  ></textarea>
                </div>
              </div>
            </div>

            {/* Selected Service Extra Guidance */}
            {selectedService && (
              <div className="mt-6 p-4 bg-orange-50/40 rounded-xl border border-orange-100 flex items-start space-x-3 text-xs text-slate-600 shadow-sm">
                <FileText className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <span className="font-bold block text-sm text-slate-800">📋 {selectedService.title} 안내사항</span>
                  <p className="text-slate-600">{selectedService.shortDesc}</p>
                  <p className="text-slate-600 font-medium mt-1">
                    <span className="text-orange-600 font-extrabold">⏱️ 예상 소요 시간:</span> {selectedService.estimatedTime}
                  </p>
                  {selectedService.documents.length > 0 && (
                    <div className="mt-1">
                      <span className="font-bold text-slate-700">필요 준비 서류:</span>
                      <ul className="list-disc list-inside mt-0.5 text-slate-500 space-y-0.5">
                        {selectedService.documents.map((doc, idx) => (
                          <li key={idx}>{doc}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="pt-4 border-t border-slate-200">
              <button
                type="submit"
                disabled={loading || !user}
                className="w-full bg-[#FF7A00] hover:bg-[#e06c00] disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed text-white py-3.5 rounded-xl font-bold text-base transition-all shadow-lg shadow-orange-500/10 flex items-center justify-center space-x-2"
              >
                <span>{loading ? "예약 처리 중..." : "📅 동행 서비스 예약 신청 완료하기"}</span>
              </button>
              <p className="text-[10px] text-slate-400 text-center mt-2.5">
                예약 신청 완료 후, 기재해주신 번호로 담당 매니저가 전화를 걸어 최종 금액과 정확한 일정을 확정해 드립니다.
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
