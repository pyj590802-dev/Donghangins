import { BlogPost, InstagramPost, Review } from "./types";

export interface ServiceDetail {
  id: string;
  title: string;
  shortDesc: string;
  description: string;
  steps: string[];
  documents: string[];
  estimatedTime: string;
  icon: string;
}

export const servicesData: ServiceDetail[] = [
  {
    id: "approval",
    title: "행위허가 대행",
    shortDesc: "관리사무소 제출서류 작성 및 접수, 구청 행위허가 필증 발급 대행",
    description: "아파트 발코니 확장이나 비내력벽 철거 등 구조 변경 시 필수적인 구청 행위허가 절차를 대행합니다. 복잡한 도면 작성부터 서류 접수, 필증 발급까지 동행의 전문 인력이 신속하고 정확하게 처리해 드립니다.",
    steps: [
      "희망 공사 내용 상담 및 현장 도면(변경 전/후) 확보",
      "관리사무소 공사 신고 및 관련 동의서 수집 연계",
      "해당 자치구청(민원실 또는 건축과) 인터넷 서류 접수 및 신청",
      "구청 담당 공무원 검토 및 결재 대기",
      "행위허가증명서(필증) 발급 및 고객(인테리어 업체) 송부"
    ],
    documents: [
      "건축물의 변경 전/후 도면 (관리사무소 또는 국토부 시스템 조회)",
      "해당 동 입주민 공사 동의서 (기준 세대 비율 충족 필수)",
      "신청서 및 위임장 (동행 대행용)"
    ],
    estimatedTime: "영업일 기준 5일 ~ 10일 (관할 구청 처리 속도에 따라 상이)",
    icon: "FileText"
  },
  {
    id: "consent",
    title: "입주민 공사동의서 작성",
    shortDesc: "공사 세대 주변 및 입주민 동의서 작성 및 접수 지원",
    description: "인테리어 공사 시작 전, 관리규약에 정해진 비율 이상의 입주민 동의를 받아야 합니다. 동행의 전문 현장 매니저들이 예의 바르고 꼼꼼한 태도로 세대별 방문 및 동의서 날인을 신속하게 완료해 드립니다.",
    steps: [
      "공사 세대 및 해당 단지 관리규정(동의 비율, 범위) 확인",
      "동행 전담 현장 매니저 배치 및 방문 시간 조율",
      "세대별 가호 방문하여 공사 일정 안내, 소음 양해 및 동의 서명 수령",
      "부재 세대 대상 안내문(메모) 부착 및 재방문",
      "목표 동의율 달성 시 관리사무소에 최종 제출 및 보고"
    ],
    documents: [
      "공사 안내문 및 동의서 양식 (관리사무소 지정 양식 제공)",
      "세대 정보 및 공사 세부 일정표"
    ],
    estimatedTime: "영업일 기준 2일 ~ 4일 (단지 규모 및 주민 거주 비율에 따라 상이)",
    icon: "Users"
  },
  {
    id: "protection",
    title: "엘리베이터 보양",
    shortDesc: "입주민 불편 최소화 및 안전하고 깔끔한 보양재 설치",
    description: "공사 자재 반입 및 폐기물 배출 시 승강기 파손과 훼손을 방지하기 위한 보양 작업입니다. 고품질 플라베니아 및 코너 보호대를 사용하여 단정하고 튼튼하게 시공하며, 관리사무소의 철저한 검수 기준을 만족시킵니다.",
    steps: [
      "보양 범위 선택 (하프 보양, 전체 보양, 올 보양 등)",
      "전문 시공팀 현장 방문 및 승강기 내부 먼지 제거",
      "바닥 및 측면 고밀도 완충재(플라베니아) 재단 및 접착 작업",
      "모서리 전용 코너가드 및 틈새 밀봉 시공으로 2중 보호",
      "바닥 미끄럼 방지 매트 시공 및 공사 안내문 부착"
    ],
    documents: [
      "승강기 크기 및 내부 형태 사진 (사전 접수용)",
      "관리사무소 보양 설치 규정"
    ],
    estimatedTime: "약 1시간 ~ 2시간 (승강기 1대 기준)",
    icon: "ShieldAlert"
  },
  {
    id: "fireproof",
    title: "방화판 설치",
    shortDesc: "화재 안전 기준 및 관리규정에 맞춘 고품질 방화판/방화유리 시공",
    description: "발코니 확장 공사 후 소방법 및 건축법에 따라 대피공간 미설치 시 화재 시 열기 및 화염 확산을 방지하는 방화판 또는 방화유리를 창호 하부에 의무적으로 시공해야 합니다. 소방 기준 시험을 통과한 정품 자재만 사용하며 갑종방화문, 비상경보장치 및 방화유리를 규정에 맞춰 정밀 설치합니다.",
    steps: [
      "현장 실측 및 설치 가능 여부 확인",
      "창호 하부 방화판 또는 방화유리 설치 지지대 보강 작업",
      "갑종 방화판/방화유리 시공 및 실리콘 마감 처리",
      "방화판 성적서 및 납품확인서 발행",
      "화재경보기(단독경보형감지기) 설치 및 방화문 보강"
    ],
    documents: [
      "방화판/방화유리 시험성적서 및 정품 인증 서류 (동행 제공)",
      "시공 전/중/후 사진 대장 (구청 사용승인 신청용)"
    ],
    estimatedTime: "약 2시간 ~ 4시간 (발코니 면적에 따라 상이)",
    icon: "Flame"
  },
  {
    id: "waste",
    title: "폐기물 처리",
    shortDesc: "공사 후 발생하는 각종 폐기물 신속 수거 및 친환경 처리",
    description: "인테리어 공사 과정에서 쏟아지는 목재, 콘크리트(폐토사), 타일, 유해 자재 등을 말끔히 철거하고 수거합니다. 환경부 정식 허가 차량이 신속히 방문하여 폐기물법에 준거해 깔끔하고 안전하게 처리해 드립니다.",
    steps: [
      "폐기물 종류 및 예상 부피(톤수) 사전 상담",
      "1톤, 2.5톤 등 맞춤형 폐기물 수집 운반 차량 배차",
      "현장 매니저 주도 하에 신속한 상차 및 현장 뒷정리(빗자루 청소)",
      "지정된 폐기물 중간처리업체로 이동 및 적법 처리",
      "계량 증명서 및 처리 영수증 발행"
    ],
    documents: [
      "폐기물 사진 (대략적인 종류와 분량 확인용)",
      "처리 증명서 및 영수증 (세무 신고 대행 가능)"
    ],
    estimatedTime: "약 1시간 ~ 3시간 (상차 및 청소 포함)",
    icon: "Trash2"
  },
  {
    id: "others",
    title: "기타 공사지원",
    shortDesc: "인테리어 현장 컨디션 및 상황에 맞춘 유연한 맞춤 지원 서비스",
    description: "인테리어 현장은 매일 변수가 발생합니다. 소음 민원 중재 지원, 현장 자재 대리 수령, 자잘한 가설물 설치, 마루 보호 보양, 보수 보강용 미장 사춤 등 현장의 손길이 긴급히 필요한 다양한 현장 보조 업무를 맞춤형으로 수행합니다.",
    steps: [
      "필요한 현장 지원 업무 내용 및 기술 사양 유선/온라인 접수",
      "해당 분야 숙련 매니저 매칭 및 현장 배정",
      "현장 소장 지시 및 협의 하에 즉각적인 조력 작업 진행",
      "작업 경과 실시간 사진 공유 및 완료 보고"
    ],
    documents: [
      "특별 요청 메모 및 현장 주소 확인"
    ],
    estimatedTime: "반일(4시간) 또는 전일(8시간) 단위 협의 가능",
    icon: "Wrench"
  }
];

export const blogPosts: BlogPost[] = [
  {
    id: "blog-1",
    title: "아파트 발코니 확장 행위허가 신청 절차와 주의해야 할 소방법 가이드",
    excerpt: "발코니를 확장하고 거실을 넓게 쓰고 싶으신가요? 구청 행위허가 신청부터 소방 필증(방화판, 대피공간 등) 설치 기준까지, 셀프 인테리어와 전문 업체가 꼭 알아야 할 고시 사항을 정리해 드립니다.",
    date: "2026-07-02",
    link: "https://blog.naver.com/donghaeng_interior/223405991",
    imageUrl: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "blog-2",
    title: "공사동의서 주민 방문 비결: 민원 없이 매끄럽게 80% 동의 수령하는 꿀팁",
    excerpt: "입주민 동의서 작성을 위해 집집마다 방문할 때 가장 빈번하게 발생하는 민원 유형과 이를 사전에 방지하는 멘트 가이드. 동행 현장 매니저들이 직접 밝히는 세련된 소통 기술을 대공개합니다.",
    date: "2026-06-28",
    link: "https://blog.naver.com/donghaeng_interior/223401284",
    imageUrl: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "blog-3",
    title: "승강기 전체 보양 vs 하프 보양 차이점 및 관리사무소별 보양 규정 비교",
    excerpt: "관리사무소마다 검수 기준이 다른 엘리베이터 보양 방식! 어떤 곳은 천장까지 덮는 '올 보양'을 요구하고, 어떤 곳은 바닥과 하부만 보호하는 '하프 보양'으로 충분합니다. 비용 아끼는 보양 팁을 알아보세요.",
    date: "2026-06-20",
    link: "https://blog.naver.com/donghaeng_interior/223395721",
    imageUrl: "https://images.unsplash.com/photo-1581094288338-2314dddb7eed?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "blog-4",
    title: "인테리어 폐기물 수거 시 상차 꿀팁과 톤백 마대자루 올바른 사용법",
    excerpt: "폐기물 처리 비용을 획기적으로 줄이기 위해서는 철저한 분리 배출과 상차 스킬이 필요합니다. 목재와 폐석재를 적절히 배분하여 트럭 적재함 크기에 꽉 채우는 요령을 사진과 함께 확인해 보세요.",
    date: "2026-06-15",
    link: "https://blog.naver.com/donghaeng_interior/223389402",
    imageUrl: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80&w=600"
  }
];

export const instagramPosts: InstagramPost[] = [
  {
    id: "insta-1",
    imageUrl: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&q=80&w=500",
    likes: 142,
    caption: "[행위허가 완료] 대치동 아파트 45평형 비내력벽 철거 및 발코니 확장 행위허가 필증 완료! 신속하고 정확한 대행으로 예정일에 맞춘 착공을 지원했습니다. #동행 #행위허가대행 #인테리어지원",
    link: "https://www.instagram.com/p/C_donghaeng1/"
  },
  {
    id: "insta-2",
    imageUrl: "https://images.unsplash.com/photo-1503174971373-b1f69850bded?auto=format&fit=crop&q=80&w=500",
    likes: 189,
    caption: "[엘리베이터 보양] 성수동 고급 주상복합 하프 보양 현장. 코너 가드를 아끼지 않고 튼튼히 덧대어 자재 반입 중 흔들림에도 파손 걱정 NO! 관리소장님 대만족 👍 #엘리베이터보양 #동행보양 #성수인테리어",
    link: "https://www.instagram.com/p/C_donghaeng2/"
  },
  {
    id: "insta-3",
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=500",
    likes: 124,
    caption: "[입주민 동의서] 서초 래미안 240세대 동의서 완료 완료! 친절함과 세심함으로 무장해 민원 발생 제로를 기록했습니다. 공사 시작은 동행과 함께 상쾌하게 시작하세요. #공사동의서대행 #동행 #아파트인테리어",
    link: "https://www.instagram.com/p/C_donghaeng3/"
  },
  {
    id: "insta-4",
    imageUrl: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=500",
    likes: 156,
    caption: "[방화판 설치] 건축법 기준에 맞춰 완벽한 창호 하부 방화판 설치 및 화재경보기 연동 완료. 구청 준공용 사진첩까지 완벽 정리해 드렸습니다. #방화판 #방화유리 #동행소방설비 #확장공사",
    link: "https://www.instagram.com/p/C_donghaeng4/"
  }
];

export const reviewsData: Review[] = [
  {
    id: "rev-1",
    stars: 5,
    content: "행위허가와 입주민 동의서 때문에 이틀 삼일을 길바닥에서 날리곤 했는데, 동행 덕분에 저희 직원들은 공사 현장에만 집중할 수 있어 너무 든든합니다. 일 처리도 공유방에서 실시간 사진으로 보고해주셔서 신뢰가 갑니다.",
    author: "김*우 대표",
    company: "라온인테리어 디자인",
    date: "2026-07-01",
    projectImageUrl: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: "rev-2",
    stars: 5,
    content: "아파트 단지가 워낙 깐깐해서 엘리베이터 보양 규정이 까다로웠는데, 전용 보양재로 정말 칼각으로 시공해 주셔서 관리소장님한테 한 소리도 안 들었네요. 폐기물 처리까지 원스톱으로 해결되어 다음 공사도 예약 예정입니다.",
    author: "이지* 실장",
    company: "디자인스튜디오 모던",
    date: "2026-06-25",
    projectImageUrl: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: "rev-3",
    stars: 5,
    content: "소비자 미팅하고 현장 챙기느라 바쁜 와중에 갑자기 급한 공사 일정이 잡혔는데, 일정도 최대한 맞춰 조율해 주시고 서류 접수까지 번개같이 처리해주셨습니다. 덕분에 착공 일정 딜레이 없이 무사히 잘 끝마쳤습니다.",
    author: "박*호 실장",
    company: "아우룸 하우징",
    date: "2026-06-18",
    projectImageUrl: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=400"
  }
];

export const faqsData = [
  {
    question: "동행 서비스는 서울/경기 지역만 가능한가요?",
    answer: "현재 서울 전역, 경기 및 인천 대부분의 수도권 지역에서 직영 지사가 상주하여 빠르게 대응하고 있습니다. 지방 공사의 경우 단지의 규모와 일정 조율에 따라 출장 서비스가 가능하오니 고객센터 또는 실시간 예약 상담을 통해 문의해주시기 바랍니다."
  },
  {
    question: "행위허가 대행 시 도면은 저희가 꼭 준비해야 하나요?",
    answer: "아파트 관리사무소 또는 국토교통부 건축물대장 시스템을 통해 해당 세대의 오리지널 준공 도면을 확보할 수 있다면 가장 좋습니다. 도면 수집이 어렵거나 분실된 단지의 경우, 동행이 직접 구청 도면을 열람·청구하거나 간단한 실측 도면 설계를 자체적으로 연계 지원하므로 편하게 의뢰해 주시면 됩니다."
  },
  {
    question: "공사동의서 진행 시 며칠 전까지 예약해야 하나요?",
    answer: "가장 권장하는 일정은 공사 시작일(착공일) 기준 최소 1주일에서 10일 전 예약입니다. 단지의 동의율 요건(예: 과반수 이상, 60% 이상 등)을 채우기 위해 2~3일간 집중 방문 기간이 소요되며, 관리사무소 승인 단계까지 고려해야 안정적인 공사 시작이 가능하기 때문입니다. 일정이 촉박한 경우 긴급 쾌속 상담을 통해 지원해드립니다."
  },
  {
    question: "예약을 진행한 후 일정이 변경되거나 취소하고 싶을 때는 어떻게 하나요?",
    answer: "홈페이지에 회원가입 후 로그인하시면 '예약조회' 메뉴에서 실시간으로 예약의 상태를 확인하고, 일정 변경 및 예약 취소 요청을 직접 진행할 수 있습니다. 이미 현장 투입이 완료되었거나 서류가 구청에 접수된 이후에는 일부 수수료가 발생할 수 있으니 변경 사항 발생 시 즉시 고객센터나 마이페이지를 통해 알려주십시오."
  }
];
