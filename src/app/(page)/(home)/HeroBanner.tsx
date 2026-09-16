import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function HeroBanner() {
  return (
    <section className="relative isolate min-h-[360px] overflow-hidden md:min-h-[500px]">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/assets/images/home-1.png')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/25 to-transparent" />

      <div className="relative z-10 mx-auto flex min-h-[360px] max-w-7xl items-center px-6 md:min-h-[500px]">
        <div className="max-w-xl text-white">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.35em] text-[#f5c800]">
            Asia Internal Portal
          </p>
          <h1 className="text-4xl font-black leading-tight drop-shadow-lg md:text-6xl">
            Asia Food &amp; Beverage
          </h1>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-white/90 md:text-base">
            Kết nối đội ngũ, cập nhật thông tin và cùng phát triển mỗi ngày.
          </p>
          <Link
            href="/employees"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#c8e63a] px-7 py-3 text-sm font-semibold text-[#1a1a1a] shadow-md transition-colors hover:bg-[#b5d42a]"
          >
            Khám phá ngay <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
