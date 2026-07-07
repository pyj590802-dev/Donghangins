export interface Reservation {
  id: string;
  companyName: string;
  managerName: string;
  contact: string;
  email: string;
  address: string;
  serviceType: string;
  date: string;
  time: string;
  memo: string;
  status: '대기' | '예약확정' | '완료' | '취소';
  createdAt: string;
  userId: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  link: string;
  imageUrl: string;
}

export interface InstagramPost {
  id: string;
  imageUrl: string;
  likes: number;
  caption: string;
  link: string;
}

export interface Review {
  id: string;
  stars: number;
  content: string;
  author: string;
  company: string;
  date: string;
  projectImageUrl?: string;
}
