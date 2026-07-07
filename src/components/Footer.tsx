interface FooterProps {
  setCurrentTab: (tab: string) => void;
}

export default function Footer({ setCurrentTab }: FooterProps) {
  return (
    <footer className="bg-black/35 backdrop-blur-md text-white/80 border-t border-white/10 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-white/10">
          {/* Brand Info */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 rounded-md bg-[#FF7A00] flex items-center justify-center font-bold text-md text-white">
                동
              </div>
              <span className="text-lg font-bold text-white tracking-wider">동행</span>
            </div>
            <p className="text-sm text-white/60 mb-2">
              인테리어 공사의 시작부터 마무리까지, 든든한 파트너 동행이 함께 성장해 나가겠습니다.
            </p>
            <p className="text-xs text-white/40">
              © 2024 GonggamRebuild. All rights reserved.
            </p>
          </div>

          {/* Business & CS Info */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">
              고객센터 & 상담안내
            </h3>
            <div className="space-y-1.5 text-sm">
              <p className="text-lg font-bold text-[#FF7A00]">010-7782-7299</p>
              <p className="text-xs text-white/50">
                운영시간: 평일/주말 07:00 ~ 21:00
              </p>
              <p className="text-xs text-white/50">
                이메일: <a href="mailto:pyj590802@gmail.com" className="hover:text-white underline">pyj590802@gmail.com</a>
              </p>
              <p className="text-xs text-white/50">
                팩스: 0504-170-0532
              </p>
            </div>
          </div>

          {/* Quick Menu & Terms */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">
              회사 정보
            </h3>
            <div className="text-xs space-y-1.5 text-white/50">
              <p>상호: 공감리빌드 (GonggamRebuild)</p>
              <p>대표자: 박영자 | 개인정보관리책임자: 김현재</p>
              <p>사업자등록번호: 401-17-52733</p>
              <p>통신판매업신고번호: 향후 바꿈</p>
              <p>주소: 서울특별시 중랑구 답십리로 395 1층</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between pt-6 text-xs text-white/50">
          <div className="flex space-x-6 mb-4 sm:mb-0">
            <button 
              onClick={() => setCurrentTab("about")} 
              className="hover:text-white hover:underline transition-colors text-left"
            >
              회사소개
            </button>
            <button 
              onClick={() => setCurrentTab("faq")} 
              className="hover:text-white hover:underline transition-colors text-left"
            >
              자주 묻는 질문
            </button>
            <a href="#privacy" className="hover:text-white hover:underline">
              개인정보처리방침
            </a>
            <a href="#terms" className="hover:text-white hover:underline">
              이용약관
            </a>
          </div>
          <div>
            <p className="text-white/30">
              본 웹사이트의 모든 시공 및 상담 자료는 특허 및 상표권의 보호를 받습니다.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
