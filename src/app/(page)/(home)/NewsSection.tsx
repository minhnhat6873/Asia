"use client";

import { useState } from "react";
import Link from "next/link";
import { news, newsCategories, NewsItem } from "@/config/news";
import { ArrowRight, X, Calendar, User, ChevronRight } from "lucide-react";

interface Props {
  preview?: boolean;
}

const categoryBadgeClass: Record<string, string> = {
  "Sự kiện": "badge-event",
  "Tin tức": "badge-news",
  "Nhân sự": "badge-hr",
  "Thông báo": "badge-announce",
};

export default function NewsSection({ preview = false }: Props) {
  const [activeCategory, setActiveCategory] = useState("Tất cả");
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);

  const filtered = news.filter(
    (n) => activeCategory === "Tất cả" || n.category === activeCategory
  );

  const displayed = preview ? filtered.filter((n) => n.featured).slice(0, 3) : filtered;

  return (
    <section className={`py-12 ${preview ? "bg-gray-50" : "bg-white"}`}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="section-label mb-1">Wana Stories</p>
            <h2 className="text-3xl font-black text-gray-900">Tin tức & Truyền thông</h2>
            <p className="text-gray-500 text-sm mt-1">
              Cập nhật hoạt động, sự kiện và câu chuyện mới nhất tại Wana.
            </p>
          </div>
          {preview && (
            <Link
              href="/news"
              className="flex items-center gap-1 text-sm font-semibold text-[#1a7a1a] hover:underline shrink-0"
            >
              Xem tất cả <ArrowRight size={14} />
            </Link>
          )}
        </div>

        {/* Category tabs (full page only) */}
        {!preview && (
          <div className="flex gap-2 flex-wrap mb-8">
            {newsCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? "bg-[#1a7a1a] text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-green-50 hover:text-[#1a7a1a]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {displayed.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedNews(item)}
              className="relative rounded-2xl overflow-hidden h-64 cursor-pointer group shadow-md card-hover"
            >
              {/* Background image */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.image}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Overlay */}
              <div className="news-overlay absolute inset-0" />

              {/* Content */}
              <div className="absolute inset-0 p-5 flex flex-col justify-between">
                {/* Top: badge */}
                <div>
                  <span className={`inline-block text-xs px-2.5 py-1 rounded-full font-semibold ${categoryBadgeClass[item.category]}`}>
                    {item.category}
                  </span>
                </div>

                {/* Bottom: title + date */}
                <div>
                  <h3 className="text-white font-bold text-sm leading-snug mb-2 line-clamp-2">
                    {item.title}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-white/70 text-xs">{item.date}</span>
                    <div className="w-7 h-7 bg-[#f5c800] rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <ChevronRight size={14} className="text-gray-900" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No results */}
        {displayed.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            <p>Không có bài viết nào trong danh mục này</p>
          </div>
        )}

        {/* Result count (full page) */}
        {!preview && (
          <p className="text-sm text-gray-500 mt-6">
            Hiển thị <span className="font-semibold text-[#1a7a1a]">{displayed.length}</span> bài viết
          </p>
        )}
      </div>

      {/* News Detail Modal */}
      {selectedNews && (
        <div
          className="fixed inset-0 bg-black/60 modal-backdrop z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedNews(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image */}
            <div className="relative h-56">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={selectedNews.image} alt={selectedNews.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <button
                onClick={() => setSelectedNews(null)}
                className="absolute top-4 right-4 w-8 h-8 bg-black/40 hover:bg-black/60 text-white rounded-full flex items-center justify-center"
              >
                <X size={16} />
              </button>
              <span className={`absolute bottom-4 left-4 text-xs px-2.5 py-1 rounded-full font-semibold ${categoryBadgeClass[selectedNews.category]}`}>
                {selectedNews.category}
              </span>
            </div>

            {/* Content */}
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-3">{selectedNews.title}</h2>
              <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                <span className="flex items-center gap-1">
                  <Calendar size={12} /> {selectedNews.date}
                </span>
                <span className="flex items-center gap-1">
                  <User size={12} /> {selectedNews.author}
                </span>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed">{selectedNews.content}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
