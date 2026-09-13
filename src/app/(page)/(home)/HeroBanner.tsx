"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import Link from "next/link";

const slides = [
  {
    id: 1,
    bg: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1600&h=700&fit=crop",
    tagline: "WANA INTERNAL PORTAL",
    title: "GROWING\nTOGETHER",
    subtitle: "Chào mừng, Nguyễn Văn A!",
    desc: "Cùng nhau tạo nên một Wana ngày càng phát triển.",
  },
  {
    id: 2,
    bg: "https://images.unsplash.com/photo-1565891741441-64926e3d6fc7?w=1600&h=700&fit=crop",
    tagline: "WANA BEVERAGE",
    title: "GOOD DRINKS,\nBRIGHTER PEOPLE",
    subtitle: "Nơi kết nối mọi thành viên",
    desc: "Khám phá thông tin nội bộ, danh bạ nhân viên và tin tức mới nhất.",
  },
  {
    id: 3,
    bg: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1600&h=700&fit=crop",
    tagline: "WANA FAMILY",
    title: "KẾT NỐI •\nPHÁT TRIỂN",
    subtitle: "Đội ngũ 500+ thành viên",
    desc: "Mỗi cá nhân là một mảnh ghép quan trọng trong hành trình phát triển của Wana.",
  },
];

export default function HeroBanner() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  const goTo = (idx: number) => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => {
      setCurrent(idx);
      setAnimating(false);
    }, 300);
  };

  const prev = () => goTo((current - 1 + slides.length) % slides.length);
  const next = () => goTo((current + 1) % slides.length);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current]);

  const slide = slides[current];

  return (
    <section className="relative w-full h-[480px] md:h-[560px] overflow-hidden">
      {/* Background */}
      <div
        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-500 ${animating ? "opacity-0" : "opacity-100"}`}
        style={{ backgroundImage: `url(${slide.bg})` }}
      />

      {/* Product images overlay (right side decoration) */}
      <div className="absolute right-0 top-0 bottom-0 w-1/2 flex items-center justify-end pr-8 pointer-events-none">
        <div className="flex gap-4 items-end opacity-90">
          {[
            "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=120&h=260&fit=crop",
            "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=120&h=300&fit=crop",
            "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=120&h=260&fit=crop",
          ].map((src, i) => (
            <div
              key={i}
              className="hidden lg:block rounded-2xl overflow-hidden shadow-2xl"
              style={{ height: i === 1 ? 280 : 240, width: 110 }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </div>

      {/* Dark overlay */}
      <div className="hero-overlay absolute inset-0" />

      {/* Content */}
      <div
        className={`relative z-10 max-w-7xl mx-auto px-6 h-full flex flex-col justify-center transition-all duration-500 ${
          animating ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
        }`}
      >
        <p className="text-[#f5c800] text-xs font-bold tracking-widest uppercase mb-3">
          {slide.tagline}
        </p>
        <h1 className="text-white text-4xl md:text-6xl font-black leading-none mb-3 whitespace-pre-line drop-shadow-lg">
          {slide.title.split("\n").map((line, i) => (
            <span key={i} className={i === 0 ? "text-[#f5c800]" : "text-white"}>
              {line}
              {i < slide.title.split("\n").length - 1 && <br />}
            </span>
          ))}
        </h1>
        <p className="text-white text-xl font-semibold mb-1 drop-shadow">{slide.subtitle}</p>
        <p className="text-white/80 text-sm mb-6 max-w-md">{slide.desc}</p>
        <Link
          href="/employees"
          className="inline-flex items-center gap-2 bg-[#c8e63a] hover:bg-[#b5d42a] text-[#1a1a1a] font-semibold text-sm px-7 py-3 rounded-full transition-all shadow-md hover:shadow-lg w-fit"
        >
          Khám phá ngay <ArrowRight size={16} />
        </Link>
      </div>

      {/* Arrows */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/20 hover:bg-white/40 text-white rounded-full flex items-center justify-center transition-all backdrop-blur-sm"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/20 hover:bg-white/40 text-white rounded-full flex items-center justify-center transition-all backdrop-blur-sm"
      >
        <ChevronRight size={20} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`h-2 rounded-full transition-all ${
              i === current ? "w-8 bg-[#f5c800]" : "w-2 bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
