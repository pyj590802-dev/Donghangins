import { useState, FormEvent } from "react";
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  updateProfile,
  sendPasswordResetEmail
} from "firebase/auth";
import { auth, googleProvider, signInWithPopup } from "../firebase";
import { X, Mail, Lock, User, AlertCircle, CheckCircle, ArrowRight } from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: any) => void;
  onAdminLoginSimulated: () => void;
}

export default function AuthModal({
  isOpen,
  onClose,
  onSuccess,
  onAdminLoginSimulated,
}: AuthModalProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isReset, setIsReset] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleGoogleLogin = async () => {
    setError("");
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      onSuccess(result.user);
      onClose();
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Google 로그인 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleEmailAction = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    if (!email) {
      setError("이메일을 입력해 주세요.");
      setLoading(false);
      return;
    }

    if (isReset) {
      try {
        await sendPasswordResetEmail(auth, email);
        setSuccess("비밀번호 재설정 이메일이 발송되었습니다. 메일함을 확인해 주세요.");
      } catch (err: any) {
        setError(err.message || "비밀번호 재설정 메일 발송에 실패했습니다.");
      } finally {
        setLoading(false);
      }
      return;
    }

    if (!password) {
      setError("비밀번호를 입력해 주세요.");
      setLoading(false);
      return;
    }

    try {
      if (isSignUp) {
        if (!name) {
          setError("이름(또는 업체명)을 입력해 주세요.");
          setLoading(false);
          return;
        }
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, { displayName: name });
        onSuccess(userCredential.user);
        setSuccess("성공적으로 회원가입 되었습니다!");
        setTimeout(() => {
          onClose();
        }, 1000);
      } else {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        onSuccess(userCredential.user);
        setSuccess("성공적으로 로그인 되었습니다!");
        setTimeout(() => {
          onClose();
        }, 1000);
      }
    } catch (err: any) {
      console.error(err);
      if (err.code === "auth/user-not-found" || err.code === "auth/wrong-password" || err.code === "auth/invalid-credential") {
        setError("이메일 또는 비밀번호가 올바르지 않습니다.");
      } else if (err.code === "auth/email-already-in-use") {
        setError("이미 사용 중인 이메일 주소입니다.");
      } else if (err.code === "auth/weak-password") {
        setError("비밀번호는 최소 6자 이상이어야 합니다.");
      } else {
        setError("인증 요청 중 에러가 발생했습니다.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemoLogin = (role: 'user' | 'admin') => {
    setError("");
    setSuccess("");
    if (role === 'admin') {
      onAdminLoginSimulated();
      setSuccess("관리자 체험 모드로 로그인 되었습니다.");
      setTimeout(() => {
        onClose();
      }, 1000);
    } else {
      // Login with a predefined test account or simulated
      const mockUser = {
        uid: "demo-user-id-123",
        email: "demo-interior@donghaeng.com",
        displayName: "라온인테리어",
        isDemo: true
      };
      onSuccess(mockUser);
      setSuccess("데모 회원 계정으로 로그인 되었습니다.");
      setTimeout(() => {
        onClose();
      }, 1000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
      <div 
        className="relative w-full max-w-md bg-slate-950/85 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 overflow-hidden transform transition-all text-white"
        id="auth-modal-container"
      >
        {/* Header */}
        <div className="bg-white/5 border-b border-white/10 px-6 py-5 text-white flex justify-between items-center">
          <div>
            <h3 className="text-lg font-bold">
              {isReset ? "비밀번호 찾기" : isSignUp ? "동행 파트너 회원가입" : "동행 파트너 로그인"}
            </h3>
            <p className="text-xs text-white/60 mt-0.5">
              {isReset ? "등록하신 이메일 주소로 전송합니다." : "더 빠르고 신속한 공사 지원업무를 만나보세요."}
            </p>
          </div>
          <button 
            onClick={onClose}
            className="text-white/60 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {error && (
            <div className="mb-4 p-3 bg-red-950/40 text-red-300 text-sm rounded-lg flex items-start space-x-2 border border-red-500/20">
              <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="mb-4 p-3 bg-emerald-950/40 text-emerald-300 text-sm rounded-lg flex items-start space-x-2 border border-emerald-500/20">
              <CheckCircle className="w-4 h-4 mt-0.5 shrink-0" />
              <span>{success}</span>
            </div>
          )}

          <form onSubmit={handleEmailAction} className="space-y-4">
            {isSignUp && !isReset && (
              <div>
                <label className="block text-xs font-semibold text-white/70 mb-1">업체명 또는 이름</label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-4 h-4 text-white/40" />
                  <input
                    type="text"
                    required
                    placeholder="예: 라온디자인 (이하우 실장)"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder-white/40 focus:bg-white/10 focus:ring-2 focus:ring-[#FF7A00] focus:border-[#FF7A00] outline-none transition-all"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-white/70 mb-1">이메일 주소</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-4 h-4 text-white/40" />
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder-white/40 focus:bg-white/10 focus:ring-2 focus:ring-[#FF7A00] focus:border-[#FF7A00] outline-none transition-all"
                />
              </div>
            </div>

            {!isReset && (
              <div>
                <label className="block text-xs font-semibold text-white/70 mb-1">비밀번호</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-4 h-4 text-white/40" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder-white/40 focus:bg-white/10 focus:ring-2 focus:ring-[#FF7A00] focus:border-[#FF7A00] outline-none transition-all"
                  />
                </div>
              </div>
            )}

            {/* Forget password trigger */}
            {!isSignUp && !isReset && (
              <div className="text-right">
                <button
                  type="button"
                  onClick={() => setIsReset(true)}
                  className="text-xs text-white/40 hover:text-[#FF7A00] underline"
                >
                  비밀번호를 잊으셨나요?
                </button>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#FF7A00] hover:bg-[#e06c00] text-white py-2.5 rounded-lg font-semibold text-sm transition-all shadow-lg shadow-orange-500/10 flex items-center justify-center space-x-1"
            >
              <span>{loading ? "처리 중..." : isReset ? "이메일 전송" : isSignUp ? "회원가입" : "로그인"}</span>
              {!loading && <ArrowRight className="w-4 h-4" />}
            </button>
          </form>

          {/* Social login divider */}
          {!isReset && (
            <>
              <div className="relative my-5">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-white/10"></span>
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="bg-slate-950 px-3 text-white/40">또는 간편 로그인</span>
                </div>
              </div>

              {/* Google login Button */}
              <button
                onClick={handleGoogleLogin}
                disabled={loading}
                className="w-full flex items-center justify-center space-x-2 bg-white/5 border border-white/10 hover:bg-white/10 text-white py-2.5 rounded-lg text-sm font-medium transition-colors shadow-xs mb-3"
              >
                <img 
                  src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png" 
                  alt="Google Logo" 
                  className="w-4 h-4"
                />
                <span>Google 계정으로 로그인</span>
              </button>
            </>
          )}

          {/* Quick Demo Accounts for evaluation */}
          <div className="mt-4 p-3.5 bg-white/5 rounded-xl border border-white/10">
            <span className="block text-xs font-semibold text-white/60 mb-2">⚡ 원클릭 빠른 테스트 체험</span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleQuickDemoLogin('user')}
                className="bg-white/5 hover:bg-[#FF7A00]/20 border border-white/10 text-white hover:border-[#FF7A00] text-xs py-2 px-3 rounded-lg font-semibold transition-colors"
              >
                데모 인테리어업체
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemoLogin('admin')}
                className="bg-[#FF7A00] hover:bg-[#e06c00] text-white text-xs py-2 px-3 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-1 shadow-md shadow-orange-500/10"
              >
                <Lock className="w-3 h-3" />
                <span>관리자 데모</span>
              </button>
            </div>
          </div>

          {/* Modal toggle foot */}
          <div className="mt-6 text-center text-xs text-white/40 border-t border-white/10 pt-4">
            {isReset ? (
              <button 
                onClick={() => { setIsReset(false); setIsSignUp(false); }} 
                className="text-[#FF7A00] font-bold hover:underline"
              >
                로그인 화면으로 돌아가기
              </button>
            ) : isSignUp ? (
              <span>
                이미 계정이 있으신가요?{" "}
                <button 
                  onClick={() => setIsSignUp(false)} 
                  className="text-[#FF7A00] font-bold hover:underline ml-1"
                >
                  로그인하기
                </button>
              </span>
            ) : (
              <span>
                처음이신가요?{" "}
                <button 
                  onClick={() => setIsSignUp(true)} 
                  className="text-[#FF7A00] font-bold hover:underline ml-1"
                >
                  간편 회원가입
                </button>
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
