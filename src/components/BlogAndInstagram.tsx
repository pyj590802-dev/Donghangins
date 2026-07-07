import { blogPosts, instagramPosts } from "../data";
import { BookOpen, Instagram, ArrowUpRight, Heart, Share2, Eye } from "lucide-react";

export default function BlogAndInstagram() {
  return (
    <div className="space-y-16">
      {/* Blog section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-gray-200 pb-4">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center border border-emerald-100 text-emerald-600">
              <BookOpen className="w-4.5 h-4.5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">네이버 공식 블로그 연동</h2>
              <p className="text-xs text-gray-400 mt-0.5">동행 공식 블로그의 유익한 인테리어 상식 및 가이드북 최신 글을 확인하세요.</p>
            </div>
          </div>
          <a
            href="https://blog.naver.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-bold text-emerald-600 hover:underline flex items-center gap-1 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-100 transition-all"
          >
            <span>공식 블로그 이동</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {blogPosts.map((post) => (
            <a
              key={post.id}
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-xl border border-gray-100 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all overflow-hidden flex flex-col group"
            >
              <div className="relative h-44 bg-gray-100 overflow-hidden shrink-0">
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-3 left-3 bg-emerald-600 text-white text-[9px] font-black px-2 py-1 rounded-sm uppercase tracking-wider">
                  Naver Blog
                </span>
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <span className="text-[10px] text-gray-400 font-semibold">{post.date}</span>
                  <h3 className="text-xs font-bold text-gray-900 leading-snug group-hover:text-emerald-600 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-[11px] text-gray-500 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
                <div className="pt-3 mt-4 border-t border-gray-50 flex items-center justify-between text-[10px] text-gray-400">
                  <span className="font-semibold text-emerald-600">자세히 보기</span>
                  <Eye className="w-3.5 h-3.5" />
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Instagram section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-gray-200 pb-4">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-pink-50 flex items-center justify-center border border-pink-100 text-pink-600">
              <Instagram className="w-4.5 h-4.5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">공식 인스타그램 피드</h2>
              <p className="text-xs text-gray-400 mt-0.5">실시간 현장 보양, 주민 동의 완료 현장을 매일 포스팅하고 있습니다.</p>
            </div>
          </div>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-bold text-pink-600 hover:underline flex items-center gap-1 bg-pink-50 px-3 py-1.5 rounded-lg border border-pink-100 transition-all"
          >
            <span>인스타 팔로우</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {instagramPosts.map((post) => (
            <a
              key={post.id}
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-xl border border-gray-100 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all overflow-hidden flex flex-col group"
            >
              <div className="relative h-60 bg-gray-100 overflow-hidden shrink-0">
                <img
                  src={post.imageUrl}
                  alt={post.caption}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-4 text-white">
                  <div className="flex items-center space-x-1 font-bold text-sm">
                    <Heart className="w-4 h-4 fill-white" />
                    <span>{post.likes}</span>
                  </div>
                  <div className="flex items-center space-x-1 font-bold text-sm">
                    <Share2 className="w-4 h-4" />
                  </div>
                </div>
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <p className="text-xs text-gray-700 line-clamp-3 leading-relaxed">
                  {post.caption}
                </p>
                <div className="pt-3 mt-4 border-t border-gray-50 flex items-center justify-between text-[10px] text-[#FF7A00] font-black uppercase tracking-wider">
                  <span>@donghaeng_official</span>
                  <Instagram className="w-3.5 h-3.5 text-pink-500" />
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
