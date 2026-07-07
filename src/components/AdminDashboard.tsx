import { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { Reservation } from "../types";
import { 
  Search, Calendar, Clock, MapPin, Phone, User, Mail, 
  FileSpreadsheet, Printer, RefreshCw, CheckCircle, 
  XCircle, Clock3, AlertCircle, Edit, Trash2, ArrowUpDown
} from "lucide-react";

export default function AdminDashboard() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [filteredReservations, setFilteredReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  
  // Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [serviceFilter, setServiceFilter] = useState("전체");
  const [statusFilter, setStatusFilter] = useState("전체");
  const [dateFilter, setDateFilter] = useState("");

  const fetchAllReservations = async () => {
    setLoading(true);
    setError("");
    try {
      const querySnapshot = await getDocs(collection(db, "reservations"));
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
      // Sort newest first
      list.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
      setReservations(list);
      setFilteredReservations(list);
    } catch (err: any) {
      console.error(err);
      setError("데이터베이스에서 예약 정보를 불러올 수 없습니다. 권한 또는 데이터 오류입니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllReservations();
  }, []);

  // Filter logic
  useEffect(() => {
    let result = [...reservations];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(r => 
        r.companyName.toLowerCase().includes(q) || 
        r.managerName.toLowerCase().includes(q) ||
        r.address.toLowerCase().includes(q) ||
        r.contact.toLowerCase().includes(q)
      );
    }

    if (serviceFilter !== "전체") {
      result = result.filter(r => r.serviceType === serviceFilter);
    }

    if (statusFilter !== "전체") {
      result = result.filter(r => r.status === statusFilter);
    }

    if (dateFilter) {
      result = result.filter(r => r.date === dateFilter);
    }

    setFilteredReservations(result);
  }, [searchQuery, serviceFilter, statusFilter, dateFilter, reservations]);

  const handleStatusChange = async (id: string, newStatus: Reservation['status']) => {
    try {
      const docRef = doc(db, "reservations", id);
      await updateDoc(docRef, { status: newStatus });
      setReservations(prev => prev.map(r => r.id === id ? { ...r, status: newStatus } : r));
    } catch (err) {
      console.error(err);
      alert("상태 변경 처리에 실패했습니다.");
    }
  };

  const handleDeleteReservation = async (id: string) => {
    if (!window.confirm("정말로 이 예약 정보를 완전히 삭제하시겠습니까? (복구 불가능)")) return;
    try {
      await deleteDoc(doc(db, "reservations", id));
      setReservations(prev => prev.filter(r => r.id !== id));
      if (selectedId === id) setSelectedId(null);
    } catch (err) {
      console.error(err);
      alert("삭제 처리에 실패했습니다.");
    }
  };

  const handleExportToExcel = () => {
    if (filteredReservations.length === 0) {
      alert("다운로드할 예약 정보가 없습니다.");
      return;
    }

    // Prepare CSV header and rows
    const headers = ["예약번호", "업체명", "담당자", "연락처", "이메일", "요청서비스", "희망날짜", "희망시간", "현장주소", "고객메모", "진행상태", "신청일"];
    const rows = filteredReservations.map(r => [
      r.id,
      r.companyName,
      r.managerName,
      `="${r.contact}"`, // Format phone number as text to prevent dropping leading zero
      r.email,
      r.serviceType,
      r.date,
      r.time,
      r.address.replace(/,/g, " "), // strip commas
      (r.memo || "").replace(/,/g, " ").replace(/\n/g, " "),
      r.status,
      r.createdAt ? r.createdAt.split("T")[0] : ""
    ]);

    // Use BOM for Excel encoding support (KOREAN letters)
    const BOM = "\uFEFF";
    const csvContent = BOM + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `동행_예약목록_엑셀_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrintReservations = () => {
    window.print();
  };

  const getStatusColor = (status: string) => {
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "예약확정":
        return <CheckCircle className="w-3.5 h-3.5" />;
      case "완료":
        return <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />;
      case "취소":
        return <XCircle className="w-3.5 h-3.5 text-red-500" />;
      default:
        return <Clock3 className="w-3.5 h-3.5 text-amber-500 animate-pulse" />;
    }
  };

  const selectedReservation = reservations.find(r => r.id === selectedId);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" id="admin-dashboard">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-6 mb-8 border-b border-gray-200 gap-4 print:hidden">
        <div>
          <h2 className="text-2xl font-black text-gray-900 tracking-tight flex items-center space-x-2">
            <span className="w-2.5 h-6 bg-[#FF7A00] rounded-xs"></span>
            <span>동행 어드민 예약 총괄 시스템</span>
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            신청된 공사지원 예약을 확인하고, 상태를 업데이트하며 리스트를 보관 관리합니다.
          </p>
        </div>
        
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={fetchAllReservations}
            disabled={loading}
            className="px-4 py-2 bg-white border border-gray-200 hover:border-gray-300 rounded-lg text-xs font-semibold text-gray-700 transition-all flex items-center gap-1 shadow-xs"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
            <span>새로고침</span>
          </button>
          
          <button
            onClick={handleExportToExcel}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold transition-all flex items-center gap-1 shadow-sm"
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>엑셀 다운로드 (.CSV)</span>
          </button>

          <button
            onClick={handlePrintReservations}
            className="px-4 py-2 bg-slate-700 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold transition-all flex items-center gap-1 shadow-sm"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>예약목록 출력</span>
          </button>
        </div>
      </div>

      {/* Grid container for table and side drawer */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Table & filters area */}
        <div className="lg:col-span-2 space-y-6 print:w-full">
          {/* Filter Bar */}
          <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm space-y-3 print:hidden">
            <div className="relative">
              <Search className="absolute left-3.5 top-3 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="업체명, 담당자명, 연락처, 현장주소로 검색..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs focus:bg-white focus:ring-2 focus:ring-[#FF7A00] focus:border-[#FF7A00] outline-none transition-all"
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-[10px] font-bold text-gray-500 mb-1">서비스 유형</label>
                <select
                  value={serviceFilter}
                  onChange={(e) => setServiceFilter(e.target.value)}
                  className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg text-xs outline-none"
                >
                  <option value="전체">전체 서비스</option>
                  <option value="행위허가 대행">행위허가 대행</option>
                  <option value="입주민 공사동의서 작성">입주민 공사동의서 작성</option>
                  <option value="엘리베이터 보양">엘리베이터 보양</option>
                  <option value="방화판 설치">방화판 설치</option>
                  <option value="폐기물 처리">폐기물 처리</option>
                  <option value="기타 공사지원">기타 공사지원</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-gray-500 mb-1">진행 상태</label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg text-xs outline-none"
                >
                  <option value="전체">전체 상태</option>
                  <option value="대기">대기</option>
                  <option value="예약확정">예약확정</option>
                  <option value="완료">완료</option>
                  <option value="취소">취소</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-gray-500 mb-1">날짜 검색</label>
                <input
                  type="date"
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg text-xs outline-none"
                />
              </div>
            </div>
          </div>

          {/* Table Container */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            {loading ? (
              <div className="py-24 text-center">
                <div className="inline-block w-8 h-8 border-4 border-[#FF7A00] border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-xs text-gray-500">예약 데이터베이스를 실시간 동기화 중입니다...</p>
              </div>
            ) : error ? (
              <div className="p-6 text-center text-red-600">
                <AlertCircle className="w-8 h-8 mx-auto mb-2" />
                <p className="font-semibold text-sm">{error}</p>
                <button onClick={fetchAllReservations} className="mt-3 text-xs text-[#183153] underline font-bold">다시 읽어오기</button>
              </div>
            ) : filteredReservations.length === 0 ? (
              <div className="py-20 text-center text-gray-400">
                <p className="text-sm">조건에 일치하는 예약 내역이 없습니다.</p>
                <p className="text-xs text-gray-400 mt-1">필터 조건을 재설정하거나 검색어를 변경해보세요.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#183153]/5 border-b border-gray-100 text-[10px] font-black text-[#183153] uppercase tracking-wider">
                      <th className="py-3.5 px-4">업체 / 현장정보</th>
                      <th className="py-3.5 px-4">희망 서비스</th>
                      <th className="py-3.5 px-4">요청 일정</th>
                      <th className="py-3.5 px-4 text-center">상태</th>
                      <th className="py-3.5 px-4 text-right print:hidden">상세</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-xs text-gray-700">
                    {filteredReservations.map((res) => (
                      <tr 
                        key={res.id} 
                        className={`hover:bg-gray-50/70 transition-colors cursor-pointer ${selectedId === res.id ? "bg-orange-50/30" : ""}`}
                        onClick={() => setSelectedId(res.id)}
                      >
                        <td className="py-3.5 px-4">
                          <div className="font-bold text-gray-900">{res.companyName}</div>
                          <div className="text-[10px] text-gray-400 truncate max-w-[200px] mt-0.5">{res.address}</div>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="font-semibold text-[#183153]">{res.serviceType}</span>
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="font-semibold">{res.date}</div>
                          <div className="text-[10px] text-gray-400">{res.time}</div>
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black border ${getStatusColor(res.status)}`}>
                            {getStatusIcon(res.status)}
                            <span>{res.status}</span>
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right print:hidden" onClick={(e) => e.stopPropagation()}>
                          <div className="flex items-center justify-end space-x-1.5">
                            <button
                              onClick={() => setSelectedId(res.id)}
                              className="px-2.5 py-1 bg-gray-100 hover:bg-gray-200 rounded-md text-[10px] font-bold text-gray-600 transition-colors"
                            >
                              조회
                            </button>
                            <button
                              onClick={() => handleDeleteReservation(res.id)}
                              className="p-1 text-red-500 hover:bg-red-50 rounded-md transition-colors"
                              title="삭제"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            <div className="px-4 py-3 bg-gray-50/50 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-500 font-medium">
              <span>검색 결과: <strong className="text-[#183153]">{filteredReservations.length}</strong>건 / 전체 예약: <strong className="text-gray-700">{reservations.length}</strong>건</span>
              <span className="text-[10px] text-gray-400 print:hidden">목록의 각 항목을 클릭하면 상세 관리가 활성화됩니다.</span>
            </div>
          </div>
        </div>

        {/* Selected detail panel & State mutation */}
        <div className="lg:col-span-1">
          {selectedReservation ? (
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden sticky top-24 print:hidden">
              {/* Drawer Header */}
              <div className="bg-[#183153] text-white p-5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-gray-300">상세 예약 주문 카드</span>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black border ${getStatusColor(selectedReservation.status)}`}>
                    {selectedReservation.status}
                  </span>
                </div>
                <h3 className="text-base font-bold mt-2 truncate">{selectedReservation.companyName}</h3>
                <p className="text-xs text-gray-300 mt-0.5">{selectedReservation.serviceType}</p>
              </div>

              {/* Drawer Body */}
              <div className="p-5 space-y-5 text-xs text-gray-700">
                <div className="space-y-3.5">
                  <div className="flex items-start gap-2.5">
                    <User className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="block text-[10px] text-gray-400 font-bold uppercase">현장 담당자</span>
                      <span className="font-semibold text-gray-800">{selectedReservation.managerName}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <Phone className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="block text-[10px] text-gray-400 font-bold uppercase">연락처</span>
                      <a href={`tel:${selectedReservation.contact}`} className="font-semibold text-gray-800 hover:underline">{selectedReservation.contact}</a>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <Mail className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="block text-[10px] text-gray-400 font-bold uppercase">이메일</span>
                      <span className="font-semibold text-gray-800">{selectedReservation.email}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="block text-[10px] text-gray-400 font-bold uppercase">현장 주소</span>
                      <span className="font-semibold text-gray-800 leading-relaxed">{selectedReservation.address}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <Calendar className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="block text-[10px] text-gray-400 font-bold uppercase">요청 일정</span>
                      <span className="font-semibold text-gray-800">{selectedReservation.date} ({selectedReservation.time})</span>
                    </div>
                  </div>
                </div>

                <hr className="border-gray-100" />

                <div>
                  <span className="block text-[10px] text-gray-400 font-bold uppercase mb-1.5">고객 특이사항 및 메모</span>
                  <div className="p-3 bg-gray-50 border border-gray-100 rounded-lg text-gray-600 whitespace-pre-wrap leading-relaxed min-h-[4.5rem]">
                    {selectedReservation.memo || "작성된 특이사항이 없습니다."}
                  </div>
                </div>

                <hr className="border-gray-100" />

                {/* State Controls */}
                <div className="space-y-2">
                  <span className="block text-[10px] text-gray-400 font-bold uppercase">진행 상태 변경</span>
                  <div className="grid grid-cols-2 gap-1.5">
                    <button
                      onClick={() => handleStatusChange(selectedReservation.id, "대기")}
                      className={`py-1.5 rounded-md font-semibold text-[11px] border transition-colors ${
                        selectedReservation.status === "대기"
                          ? "bg-amber-500 border-amber-600 text-white"
                          : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      대기 접수
                    </button>
                    <button
                      onClick={() => handleStatusChange(selectedReservation.id, "예약확정")}
                      className={`py-1.5 rounded-md font-semibold text-[11px] border transition-colors ${
                        selectedReservation.status === "예약확정"
                          ? "bg-indigo-600 border-indigo-700 text-white"
                          : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      예약확정
                    </button>
                    <button
                      onClick={() => handleStatusChange(selectedReservation.id, "완료")}
                      className={`py-1.5 rounded-md font-semibold text-[11px] border transition-colors ${
                        selectedReservation.status === "완료"
                          ? "bg-emerald-600 border-emerald-700 text-white"
                          : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      업무완료
                    </button>
                    <button
                      onClick={() => handleStatusChange(selectedReservation.id, "취소")}
                      className={`py-1.5 rounded-md font-semibold text-[11px] border transition-colors ${
                        selectedReservation.status === "취소"
                          ? "bg-red-500 border-red-600 text-white"
                          : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      예약취소
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedId(null)}
                  className="w-full py-2 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-lg text-center font-bold text-[10px] transition-colors"
                >
                  상세 닫기
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-dashed border-gray-200 p-8 text-center text-gray-400 sticky top-24 print:hidden">
              <Clock className="w-10 h-10 mx-auto text-gray-300 mb-3" />
              <p className="text-xs font-semibold">예약 세부 관리 카드가 비어있습니다.</p>
              <p className="text-[10px] text-gray-400 mt-1">왼쪽 목록에서 예약을 선택해 상태를 변경하거나 담당자 정보를 조회하세요.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
