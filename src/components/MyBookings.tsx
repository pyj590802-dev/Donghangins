import { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, query, where, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { Reservation } from "../types";
import { Calendar, Clock, MapPin, CheckCircle, AlertCircle, RefreshCw, Trash2, Edit2, ShieldAlert, User } from "lucide-react";

interface MyBookingsProps {
  user: any;
  onOpenAuth: () => void;
  onNavigateToBooking: () => void;
}

export default function MyBookings({
  user,
  onOpenAuth,
  onNavigateToBooking,
}: MyBookingsProps) {
  const [bookings, setBookings] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const fetchBookings = async () => {
    if (!user) return;
    setLoading(true);
    setError("");
    try {
      const q = query(
        collection(db, "reservations"),
        where("userId", "==", user.uid)
      );
      const querySnapshot = await getDocs(q);
      const list: Reservation[] = [];
      querySnapshot.forEach((docSnap) => {
        const data = docSnap.data();
        list.push({
          id: docSnap.id,
          companyName: data.companyName || "",
          managerName: data.managerName || "",
          contact: data.contact || "",
          email: data.email || "",
          address: data.address || "",
          serviceType: data.serviceType || "",
          date: data.date || "",
          time: data.time || "",
          memo: data.memo || "",
          status: data.status || "대기",
          createdAt: data.createdAt || "",
          userId: data.userId || ""
        });
      });
      // Sort by creation or date descending
      list.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
      setBookings(list);
    } catch (err: any) {
      console.error("Error fetching bookings: ", err);
      setError("예약 내역을 불러오는 도중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [user]);

  const handleCancelBooking = async (id: string) => {
    if (!window.confirm("정말로 이 예약을 취소하시겠습니까?")) return;
    setActionLoading(id);
    try {
      const docRef = doc(db, "reservations", id);
      await updateDoc(docRef, { status: "취소" });
      setBookings(prev => prev.map(b => b.id === id ? { ...b, status: "취소" } : b));
    } catch (err) {
      console.error(err);
      alert("취소 요청 처리에 실패했습니다.");
    } finally {
      setActionLoading(null);
    }
  };

  const handleChangeRequest = async (id: string) => {
    const newMemo = window.prompt("원하시는 변경 일자 또는 요청 사항을 간략히 적어주세요. (예: 7월 15일 오후 3시로 변경 원함)");
    if (!newMemo) return;

    setActionLoading(id);
    try {
      const docRef = doc(db, "reservations", id);
      const found = bookings.find(b => b.id === id);
      const updatedMemo = `${found?.memo ? found.memo + " | " : ""}일정변경요청: ${newMemo}`;
      await updateDoc(docRef, { memo: updatedMemo });
      setBookings(prev => prev.map(b => b.id === id ? { ...b, memo: updatedMemo } : b));
      alert("변경 요청 메모가 성공적으로 등록되었습니다. 담당 매니저가 확인 후 개별 연락드리겠습니다.");
    } catch (err) {
      console.error(err);
      alert("변경 요청에 실패했습니다.");
    } finally {
      setActionLoading(null);
    }
  };

  if (!user) {
    return (
      <div className="max-w-2xl mx-auto py-16 px-4 text-center text-slate-800">
        <div className="w-16 h-16 bg-white border border-slate-200 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
          <ShieldAlert className="w-8 h-8 text-[#FF7A00]" />
        </div>
        <h3 className="text-xl font-bold text-slate-800">예약 조회는 로그인이 필요한 서비스입니다</h3>
        <p className="text-sm text-slate-500 mt-2 max-w-sm mx-auto">
          회원가입 또는 로그인 후, 신청하셨던 모든 공사 지원 예약의 진행 상태를 간편하게 확인해 보실 수 있습니다.
        </p>
        <button
          onClick={onOpenAuth}
          className="mt-6 bg-[#FF7A00] hover:bg-[#e06c00] text-white px-6 py-2.5 rounded-lg text-sm font-semibold transition-all shadow-lg shadow-orange-500/10"
        >
          🔑 로그인 / 회원가입하기
        </button>
      </div>
    );
  }

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "예약확정":
        return "bg-indigo-50 text-indigo-700 border-indigo-200";
      case "완료":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "취소":
        return "bg-red-50 text-red-700 border-red-200";
      default:
        return "bg-amber-50 text-amber-700 border-amber-200";
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 text-slate-800">
      {/* Intro section */}
      <div className="flex flex-col sm:flex-row items-center justify-between border-b border-slate-200 pb-6 mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">📋 나의 서비스 예약 내역</h2>
          <p className="text-sm text-slate-500 mt-1">
            신청하신 공사 지원 예약 건들의 실시간 진행 상태와 상세 내역을 확인할 수 있습니다.
          </p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={fetchBookings}
            disabled={loading}
            className="p-2.5 text-slate-700 hover:text-slate-900 border border-slate-200 hover:border-slate-300 rounded-lg bg-white transition-all flex items-center space-x-1 text-sm font-semibold shadow-sm"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            <span>새로고침</span>
          </button>
          <button
            onClick={onNavigateToBooking}
            className="bg-[#FF7A00] hover:bg-[#e06c00] text-white py-2.5 px-4 rounded-lg text-sm font-bold transition-all shadow-lg shadow-orange-500/10 flex items-center space-x-1"
          >
            <span>📅 새 예약 신청</span>
          </button>
        </div>
      </div>

      {loading ? (
        <div className="py-24 text-center">
          <div className="inline-block w-8 h-8 border-4 border-[#FF7A00] border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-sm text-slate-500">예약 목록을 안전하게 불러오고 있습니다...</p>
        </div>
      ) : error ? (
        <div className="py-12 text-center text-red-600 border border-red-100 bg-red-50 rounded-xl">
          <AlertCircle className="w-8 h-8 mx-auto mb-2 text-red-500" />
          <p className="font-semibold">{error}</p>
          <button 
            onClick={fetchBookings} 
            className="mt-3 text-xs font-bold text-slate-700 underline"
          >
            다시 시도하기
          </button>
        </div>
      ) : bookings.length === 0 ? (
        <div className="py-20 text-center glass-panel rounded-2xl border border-slate-200/80 shadow-xl">
          <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <p className="text-slate-800 font-medium text-lg">아직 접수된 예약 내역이 없습니다.</p>
          <p className="text-sm text-slate-500 mt-1.5 max-w-sm mx-auto">
            원스톱 행위허가 대행, 엘리베이터 보양, 소방 설치 등 필요한 서비스를 지금 바로 신청해 보세요.
          </p>
          <button
            onClick={onNavigateToBooking}
            className="mt-6 bg-[#FF7A00] hover:bg-[#e06c00] text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-all shadow-lg shadow-orange-500/10"
          >
            📅 예약 신청하러 가기
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="glass-panel rounded-xl border border-slate-200/80 shadow-xl overflow-hidden hover:border-slate-300 transition-all bg-white"
            >
              {/* Card Header */}
              <div className="bg-slate-50/80 px-6 py-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-mono font-bold text-slate-400">ID: {booking.id.slice(0, 8)}</span>
                  <span className="text-xs text-slate-200">|</span>
                  <span className="text-xs text-slate-500 font-medium">신청일: {booking.createdAt ? booking.createdAt.split("T")[0] : "-"}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusStyle(booking.status)}`}>
                    ● {booking.status}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6 bg-white/50">
                <div className="space-y-2">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">서비스 정보</span>
                  <span className="text-base font-extrabold text-[#FF7A00] block">{booking.serviceType}</span>
                  <p className="text-sm text-slate-800 flex items-center gap-1.5">
                    <User className="w-4 h-4 text-slate-400" />
                    <span>{booking.companyName} / {booking.managerName}</span>
                  </p>
                  <p className="text-xs text-slate-500">{booking.contact}</p>
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">희망 일정 및 장소</span>
                  <p className="text-sm text-slate-800 font-semibold flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
                    <span>{booking.date}</span>
                    <Clock className="w-4 h-4 text-slate-400 shrink-0 ml-1" />
                    <span>{booking.time}</span>
                  </p>
                  <p className="text-xs text-slate-500 flex items-start gap-1.5 leading-relaxed">
                    <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                    <span>{booking.address}</span>
                  </p>
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block font-sans">고객 요청 사항</span>
                  <p className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-100 min-h-[4rem] whitespace-pre-line leading-relaxed shadow-inner">
                    {booking.memo || "특별히 기재된 요청 사항이 없습니다."}
                  </p>
                </div>
              </div>

              {/* Card Actions */}
              {booking.status !== "완료" && booking.status !== "취소" && (
                <div className="bg-slate-50/50 px-6 py-3 border-t border-slate-100 flex items-center justify-end space-x-3 text-xs">
                  <button
                    onClick={() => handleChangeRequest(booking.id)}
                    disabled={actionLoading === booking.id}
                    className="px-3.5 py-1.5 border border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg bg-white font-semibold transition-all flex items-center gap-1 cursor-pointer shadow-sm"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    <span>일정 변경 요청</span>
                  </button>
                  <button
                    onClick={() => handleCancelBooking(booking.id)}
                    disabled={actionLoading === booking.id}
                    className="px-3.5 py-1.5 border border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 rounded-lg bg-white font-semibold transition-all flex items-center gap-1 cursor-pointer shadow-sm"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>예약 취소 신청</span>
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
