import { useState } from "react";
import { Menu, X, User, LogOut, Lock } from "lucide-react";

interface HeaderProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  user: any;
  isAdmin: boolean;
  onOpenAuth: () => void;
  onLogout: () => void;
  toggleAdminMode: () => void;
}

export default function Header({
  currentTab,
  setCurrentTab,
  user,
  isAdmin,
  onOpenAuth,
  onLogout,
  toggleAdminMode,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: "home", label: "홈" },
    { id: "about", label: "회사소개" },
    { id: "services", label: "서비스" },
    { id: "booking", label: "예약하기" },
    { id: "my-bookings", label: "예약조회" },
    { id: "blog", label: "블로그" },
    { id: "instagram", label: "인스타그램" },
    { id: "faq", label: "고객센터" },
  ];

  const handleTabClick = (tabId: string) => {
    setCurrentTab(tabId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/70 border-b border-slate-200/80 text-slate-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div 
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => handleTabClick("home")}
          >
            <div className="w-10 h-10 rounded-lg bg-[#FF7A00] flex items-center justify-center font-bold text-xl text-white shadow-md">
              동
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-slate-800 block">동행</span>
              <span className="text-[10px] text-slate-500 -mt-1 block font-medium">인테리어 공사지원 파트너</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  currentTab === item.id
                    ? "bg-[#FF7A00] text-white shadow-sm"
                    : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="hidden lg:flex items-center space-x-3">
            {/* Admin Demo Button */}
            <button
              onClick={toggleAdminMode}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 ${
                isAdmin
                  ? "bg-emerald-600 border-emerald-500 text-white shadow-sm"
                  : "bg-slate-100 border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-200"
              }`}
            >
              <Lock className="w-3.5 h-3.5" />
              <span>{isAdmin ? "관리자 모드 On" : "관리자 Demo"}</span>
            </button>

            {user ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-1 text-sm text-slate-700">
                  <User className="w-4 h-4 text-[#FF7A00]" />
                  <span className="max-w-[120px] truncate">{user.displayName || user.email?.split("@")[0] || "회원"}</span>
                </div>
                <button
                  onClick={onLogout}
                  className="p-2 text-slate-600 hover:text-slate-800 rounded-md hover:bg-slate-100 transition-colors"
                  title="로그아웃"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="bg-[#FF7A00] hover:bg-[#e06c00] text-white px-5 py-2 rounded-md text-sm font-semibold transition-all duration-200 shadow-lg shadow-orange-500/10 hover:scale-105"
              >
                로그인 / 가입
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center lg:hidden space-x-2">
            <button
              onClick={toggleAdminMode}
              className={`flex items-center space-x-1 px-2.5 py-1 rounded-full text-[10px] font-semibold border transition-all duration-200 ${
                isAdmin
                  ? "bg-emerald-600 border-emerald-500 text-white"
                  : "bg-slate-100 border-slate-200 text-slate-600"
              }`}
            >
              <Lock className="w-2.5 h-2.5" />
              <span>{isAdmin ? "관리자" : "관리자 데모"}</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-600 hover:text-slate-800 hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden backdrop-blur-lg bg-white/95 border-t border-slate-200/80 px-2 pt-2 pb-4 space-y-1 shadow-inner">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleTabClick(item.id)}
              className={`block w-full text-left px-4 py-2.5 rounded-md text-base font-medium transition-colors ${
                currentTab === item.id
                  ? "bg-[#FF7A00] text-white"
                  : "text-slate-700 hover:bg-slate-100"
              }`}
            >
              {item.label}
            </button>
          ))}
          
          <div className="pt-4 pb-2 border-t border-slate-200 px-4">
            {user ? (
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-slate-800 text-sm">
                  <User className="w-4 h-4 text-[#FF7A00]" />
                  <span>{user.displayName || user.email?.split("@")[0]} 님</span>
                </div>
                <button
                  onClick={onLogout}
                  className="flex items-center space-x-1 text-sm text-red-500 hover:text-red-600"
                >
                  <LogOut className="w-4 h-4" />
                  <span>로그아웃</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAuth();
                }}
                className="w-full text-center bg-[#FF7A00] hover:bg-[#e06c00] text-white py-2.5 rounded-md text-sm font-semibold transition-colors shadow-lg"
              >
                로그인 / 회원가입
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
