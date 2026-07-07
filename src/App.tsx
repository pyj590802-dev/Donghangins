import { useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase";
import { servicesData, reviewsData } from "./data";

// Import custom components
import Header from "./components/Header";
import Footer from "./components/Footer";
import AuthModal from "./components/AuthModal";
import BookingForm from "./components/BookingForm";
import MyBookings from "./components/MyBookings";
import AdminDashboard from "./components/AdminDashboard";
import CompanyIntro from "./components/CompanyIntro";
import ServiceDetailView from "./components/ServiceDetailView";
import BlogAndInstagram from "./components/BlogAndInstagram";
import FaqAndCs from "./components/FaqAndCs";

import { 
  Calendar, Phone, Clock, ShieldCheck, UserCheck, 
  Sparkles, CheckSquare, Star, ArrowRight, ArrowUpRight,
  BookOpen, Instagram, ClipboardCheck, MessageSquare
} from "lucide-react";

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>("home");
  const [user, setUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isAuthOpen, setIsAuthOpen] = useState<boolean>(false);
  const [preSelectedService, setPreSelectedService] = useState<string>("");

  useEffect(() => {
    // Listen to Firebase auth state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        // Automatically give admin rights if email contains 'admin'
        if (currentUser.email && currentUser.email.toLowerCase().includes("admin")) {
          setIsAdmin(true);
        }
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setIsAdmin(false);
      setCurrentTab("home");
    } catch (err) {
      console.error("로그아웃 실패:", err);
    }
  };

  const handleAdminLoginSimulated = () => {
    setIsAdmin(true);
    setUser({
      uid: "admin-demo-id",
      email: "admin@donghaeng.com",
      displayName: "동행 최고관리자",
      isDemo: true
    });
    setCurrentTab("home");
  };

  const handleSelectServiceForBooking = (serviceTitle: string) => {
    setPreSelectedService(serviceTitle);
    setCurrentTab("booking");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Helper function to render different views
  const renderTabContent = () => {
    if (isAdmin && currentTab === "admin-dashboard") {
      return <AdminDashboard />;
    }

    switch (currentTab) {
      case "about":
        return <CompanyIntro />;
      case "services":
        return <ServiceDetailView onSelectServiceForBooking={handleSelectServiceForBooking} />;
      case "booking":
        return (
          <BookingForm 
            user={user} 
            preSelectedService={preSelectedService} 
            onSuccess={() => {
              setPreSelectedService("");
              setCurrentTab("my-bookings");
            }}
            onOpenAuth={() => setIsAuthOpen(true)}
          />
        );
      case "my-bookings":
        return (
          <MyBookings 
            user={user} 
            onOpenAuth={() => setIsAuthOpen(true)} 
            onNavigateToBooking={() => {
              setPreSelectedService("");
              setCurrentTab("booking");
            }} 
          />
        );
      case "faq":
        return <FaqAndCs />;
      case "blog":
      case "instagram":
        return <BlogAndInstagram />;
      case "home":
      default:
        return renderHomeTab();
    }
  };

  const renderHomeTab = () => {
    return (
      <div className="space-y-24 text-slate-800">
        {/* Hero Section */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-850 to-slate-900 border border-emerald-950/20 text-white py-20 sm:py-28 px-6 sm:px-12 shadow-2xl">
          <div className="absolute inset-0 z-0 opacity-20">
            <img 
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1600" 
              alt="Apartment Interior Construction" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center space-x-1.5 bg-white/10 px-3.5 py-1.5 rounded-full backdrop-blur-md border border-white/10">
              <Sparkles className="w-3.5 h-3.5 text-[#FF7A00]" />
              <span className="text-[10px] font-black uppercase tracking-wider text-gray-200">
                인테리어의 시작부터 마무리까지, 함께하는 동행
              </span>
            </div>

            <div className="space-y-4">
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight text-white">
                인테리어 공사의 모든 지원업무,<br />
                <span className="text-[#FF7A00]">동행</span>이 대신합니다.
              </h1>
              <p className="text-xs sm:text-base text-white/80 max-w-2xl mx-auto font-medium leading-relaxed">
                행위허가부터 입주민 동의서, 엘리베이터 보양, 방화판 설치, 폐기물 처리까지.<br />
                인테리어 업체가 시공 퀄리티에만 100% 집중할 수 있도록 동행이 곁을 지킵니다.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <button
                onClick={() => {
                  setPreSelectedService("");
                  setCurrentTab("booking");
                }}
                className="w-full sm:w-auto bg-[#FF7A00] hover:bg-[#e06c00] text-white font-bold py-3.5 px-8 rounded-xl text-sm transition-all duration-200 shadow-lg shadow-orange-500/20 flex items-center justify-center space-x-1 hover:scale-105"
              >
                <span>📅 예약 신청하기</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => setCurrentTab("faq")}
                className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white font-bold py-3.5 px-8 rounded-xl text-sm transition-all duration-200 border border-white/20 flex items-center justify-center space-x-1 hover:scale-105"
              >
                <span>📞 상담 & FAQ 조회</span>
              </button>
            </div>
          </div>
        </section>

        {/* Why Donghaeng Section */}
        <section className="space-y-12">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-[#FF7A00] font-black text-xs uppercase tracking-widest block">WHY DONGHAENG</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">왜 인테리어 공사 지원팀은 동행이여야 하는가?</h2>
            <p className="text-xs text-slate-500">수많은 현장에서 소장님들이 극찬하는 동행만의 핵심 강점입니다.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <ClipboardCheck className="w-5.5 h-5.5" />,
                title: "✓ 한번에 해결 (One-Stop)",
                desc: "행위허가 대행부터 폐기물 청소까지 여러 외주 업체를 복잡하게 수소문할 필요가 전혀 없습니다.",
                bg: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=400"
              },
              {
                icon: <Clock className="w-5.5 h-5.5" />,
                title: "✓ 빠른 기동력과 대응",
                desc: "갑자기 잡힌 촉박한 공사 일정도 당사만의 직영 배차망을 통해 번개처럼 접수하고 현장에 투입합니다.",
                bg: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&q=80&w=400"
              },
              {
                icon: <ShieldCheck className="w-5.5 h-5.5" />,
                title: "✓ 대단지 민원 사전방지",
                desc: "아파트 관리사무소장, 과반수 입주민 등 까다로운 행정 합의를 부드럽고 원활하게 성사시킵니다.",
                bg: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=400"
              },
              {
                icon: <Calendar className="w-5.5 h-5.5" />,
                title: "✓ 유연한 일정 맞춤",
                desc: "소장님이 원하는 정확한 날짜, 약속된 시간에 한 치의 오차 없이 지원 서비스를 시작합니다.",
                bg: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&q=80&w=400"
              }
            ].map((box, idx) => (
              <div key={idx} className="relative overflow-hidden rounded-2xl border border-slate-200/80 shadow-md group h-full min-h-[180px] flex flex-col justify-between">
                {/* Background image */}
                <div 
                  className="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110 filter blur-[2px] brightness-75"
                  style={{ backgroundImage: `url(${box.bg})` }}
                />
                {/* Frost Overlay */}
                <div className="absolute inset-0 z-10 bg-slate-950/60" />
                {/* Content */}
                <div className="relative z-20 p-6 space-y-3 text-white">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center text-[#FF7A00] border border-white/20 shrink-0">
                    {box.icon}
                  </div>
                  <h3 className="text-sm font-bold text-white">{box.title}</h3>
                  <p className="text-xs text-slate-100 leading-relaxed font-medium">
                    {box.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Services Cards Grid */}
        <section className="space-y-12">
          <div className="flex flex-col sm:flex-row items-center justify-between border-b border-slate-200 pb-4 gap-4">
            <div>
              <span className="text-[#FF7A00] font-black text-xs uppercase tracking-widest block">OUR SERVICES</span>
              <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight mt-1">
                동행이 수행하는 인테리어 지원 업무
              </h2>
            </div>
            <button
              onClick={() => setCurrentTab("services")}
              className="text-xs font-bold text-slate-500 hover:text-[#FF7A00] flex items-center gap-1 shrink-0 transition-colors"
            >
              <span>전체 서비스 상세 조회</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesData.map((service, index) => {
              // Map background images to services
              const images = [
                "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=500", // 행위허가
                "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=500", // 공사동의서
                "https://images.unsplash.com/photo-1581094288338-2314dddb7eed?auto=format&fit=crop&q=80&w=500", // 엘리베이터 보양
                "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=500", // 방화판
                "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80&w=500", // 폐기물
                "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=500"  // 기타
              ];
              const bgImg = images[index] || images[0];

              return (
                <div
                  key={service.id}
                  className="relative overflow-hidden rounded-2xl border border-slate-200/80 shadow-md group h-[280px] flex flex-col justify-between"
                >
                  {/* Background image with brightness reduction on hover */}
                  <div 
                    className="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105 filter brightness-[0.4]"
                    style={{ backgroundImage: `url(${bgImg})` }}
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 z-10 bg-gradient-to-t from-slate-950 via-slate-900/50 to-transparent" />
                  
                  {/* Card Content */}
                  <div className="relative z-20 p-6 space-y-2 text-white">
                    <div className="inline-flex items-center justify-center bg-white/20 border border-white/20 rounded-md px-2.5 py-1 text-white font-extrabold text-[10px] uppercase">
                      {service.title.slice(0, 2)}
                    </div>
                    <h3 className="text-base font-extrabold text-white drop-shadow-sm">{service.title}</h3>
                    <p className="text-xs text-slate-200 font-medium leading-relaxed drop-shadow-sm line-clamp-3">
                      {service.shortDesc}
                    </p>
                  </div>

                  <div className="relative z-20 p-6 pt-0 border-t border-white/10 flex items-center justify-between gap-2">
                    <button
                      onClick={() => {
                        setActiveServiceTabAndId(service.id);
                      }}
                      className="text-[11px] font-bold text-slate-300 hover:text-white"
                    >
                      상세보기
                    </button>
                    <button
                      onClick={() => handleSelectServiceForBooking(service.title)}
                      className="bg-[#FF7A00] hover:bg-[#e06c00] text-white py-1.5 px-4 rounded-lg text-xs font-bold transition-all shadow-md shadow-orange-500/10 hover:scale-105"
                    >
                      📅 신청하기
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Suggested For Section */}
        <section className="bg-white border border-slate-200/80 rounded-3xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-stretch shadow-md">
          <div className="lg:col-span-5 bg-slate-50/70 border-r border-slate-200/50 text-slate-800 p-8 sm:p-12 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-[#FF7A00] font-bold text-xs tracking-wider block uppercase">TARGET CUSTOMER</span>
              <h2 className="text-2xl font-black leading-tight text-slate-800">이런 파트너사에게 적극 권장합니다.</h2>
              <p className="text-xs text-slate-500 leading-relaxed">
                시간이 돈인 인테리어 현장! 자잘한 업무들은 아웃소싱하시고 오직 현장 마감 퀄리티와 브랜딩에 집중하세요.
              </p>
            </div>
            <div className="hidden lg:block text-xs text-slate-400 mt-8">
              ※ 동행은 전국 우수 인테리어 프랜차이즈, 디자인 에이전시, 공방의 공식 파트너사로 활동하고 있습니다.
            </div>
          </div>

          <div className="lg:col-span-7 p-8 sm:p-12 space-y-5 flex flex-col justify-center bg-white">
            {[
              "인테리어 공사 일정이 중첩되어 직원들이 너무 바쁜 업체",
              "비내력벽 철거 행위허가 대행 서류 작성이 복잡하고 번거로운 분",
              "공사 동의서 서명을 위해 야간 방문할 전담 인력이 부족한 업체",
              "민감한 입주민 소음 민원 중재 및 관리에 전념하고 싶으신 소장님",
              "공사 지원업무를 일련의 체계화된 대행으로 가볍고 똑똑하게 외주 처리하고 싶으신 대표님"
            ].map((text, idx) => (
              <div key={idx} className="flex items-start space-x-3 text-xs sm:text-sm text-slate-700">
                <CheckSquare className="w-5 h-5 text-[#FF7A00] shrink-0 mt-0.5" />
                <span className="font-semibold">{text}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Flow chart (Icons) */}
        <section className="space-y-12">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-[#FF7A00] font-black text-xs uppercase tracking-widest block">PROCESS FLOW</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">신속하고 정확한 5단계 진행 절차</h2>
            <p className="text-xs text-slate-500">예약부터 마무리에 이르는 동행의 정돈된 워크플로우를 안내해 드립니다.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-6 text-center relative">
            {[
              { num: "①", title: "예약 접수", desc: "원하는 서비스와 현장 정보 입력 후 간편 제출" },
              { num: "②", title: "전문가 상담", desc: "단지별 관리규정 및 소방 사양 실시간 유선 조율" },
              { num: "③", title: "일정 확정", desc: "착공 스케줄에 차질 없도록 최적 매니저 즉시 매칭" },
              { num: "④", title: "밀착 현장지원", desc: "주민 동의 수렴 및 보양/소방 완벽 시공" },
              { num: "⑤", title: "결과 완료 보고", desc: "실시간 현장 사진첩 및 구청 제출서류 발송 완료" }
            ].map((step, idx) => (
              <div key={idx} className="bg-white border border-slate-200/80 p-5 rounded-xl shadow-sm relative">
                <span className="text-xl font-bold text-[#FF7A00] block mb-2">{step.num}</span>
                <h4 className="text-xs font-black text-slate-800 mb-1.5">{step.title}</h4>
                <p className="text-[10px] text-slate-500 leading-normal">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Real Customer Reviews */}
        <section className="space-y-12">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-[#FF7A00] font-black text-xs uppercase tracking-widest block">REVIEWS</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">현장 파트너 소장님들의 진짜 후기</h2>
            <p className="text-xs text-slate-500">동행의 품질을 신뢰하고 정기 제휴로 함께해주시는 생생한 소리입니다.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviewsData.map((review) => (
              <div
                key={review.id}
                className="bg-white border border-slate-200/80 rounded-2xl p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-all"
              >
                <div className="space-y-4">
                  {review.projectImageUrl && (
                    <div className="h-48 w-full overflow-hidden rounded-xl mb-4 relative">
                      <img 
                        src={review.projectImageUrl} 
                        alt="시공 완료 현장 사진" 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2.5 left-2.5 bg-[#FF7A00] text-white text-[9px] font-black px-2 py-0.5 rounded shadow-xs">
                        시공 현장
                      </div>
                    </div>
                  )}
                  <div className="flex text-amber-400 space-x-0.5">
                    {[...Array(review.stars)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium italic">
                    &ldquo;{review.content}&rdquo;
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                  <div>
                    <span className="font-bold text-slate-800">{review.author}</span>
                    <span className="text-slate-400 ml-1.5">{review.company}</span>
                  </div>
                  <span className="text-slate-400 font-mono text-[10px]">{review.date}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Secondary Call to Action banner */}
        <section className="bg-gradient-to-br from-slate-900 to-emerald-950 rounded-3xl p-8 sm:p-12 border border-slate-800/20 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl text-white">
          <div className="space-y-2 text-center sm:text-left">
            <span className="text-[#FF7A00] font-black text-xs tracking-wider uppercase">READY TO COOPERATE</span>
            <h3 className="text-xl sm:text-2xl font-black text-white leading-tight">
              복잡한 공사 행정 및 조율 업무,<br />이제 동행에게 맡기고 공사에만 집중하세요.
            </h3>
            <p className="text-xs text-slate-200">
              필요한 날짜와 시간을 등록해 주시면, 동행이 정직하게 빈틈없이 완벽 준비하겠습니다.
            </p>
          </div>
          <button
            onClick={() => {
              setPreSelectedService("");
              setCurrentTab("booking");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="w-full sm:w-auto bg-[#FF7A00] hover:bg-orange-600 text-white py-3.5 px-8 rounded-xl text-xs font-black shadow-lg shadow-orange-500/20 transition-all hover:scale-105 shrink-0"
          >
            📅 예약하러 가기
          </button>
        </section>
      </div>
    );
  };

  const setActiveServiceTabAndId = (serviceId: string) => {
    setCurrentTab("services");
    // Handled in ServiceDetailView to show correct expanded card
    setTimeout(() => {
      const el = document.querySelector(`[key='${serviceId}']`);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-[#f3faf6] text-slate-800 flex flex-col justify-between font-sans relative overflow-hidden">
      {/* Decorative background elements matching Frosted Glass theme */}
      <div className="absolute top-[-100px] left-[-100px] w-[400px] h-[400px] bg-[#FF7A00] opacity-5 blur-[120px] rounded-full pointer-events-none z-0"></div>
      <div className="absolute bottom-[200px] right-[-100px] w-[500px] h-[500px] bg-emerald-300 opacity-20 blur-[150px] rounded-full pointer-events-none z-0"></div>
      <div className="absolute top-[30%] left-[50%] -translate-x-1/2 w-[600px] h-[600px] bg-teal-200 opacity-15 blur-[180px] rounded-full pointer-events-none z-0"></div>
      
      {/* Navigation header */}
      <div className="relative z-10">
        <Header
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
          user={user}
          isAdmin={isAdmin}
          onOpenAuth={() => setIsAuthOpen(true)}
          onLogout={handleLogout}
          toggleAdminMode={() => {
            setIsAdmin(!isAdmin);
            if (!isAdmin) {
              handleAdminLoginSimulated();
            } else {
              handleLogout();
            }
          }}
        />
      </div>

      {/* Main viewport */}
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 sm:py-16 relative z-10">
        {renderTabContent()}
      </main>

      {/* Footer metadata */}
      <div className="relative z-10">
        <Footer setCurrentTab={setCurrentTab} />
      </div>

      {/* Auth Modal Container */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onSuccess={(loggedInUser) => {
          setUser(loggedInUser);
          if (loggedInUser.email && loggedInUser.email.toLowerCase().includes("admin")) {
            setIsAdmin(true);
          }
        }}
        onAdminLoginSimulated={handleAdminLoginSimulated}
      />
    </div>
  );
}
