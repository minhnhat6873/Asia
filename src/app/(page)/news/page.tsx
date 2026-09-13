import Navbar from "@/app/components/layout/Navbar";
import NewsSection from "@/app/(page)/(home)/NewsSection";
import Footer from "@/app/components/layout/Footer";
import { Megaphone } from "lucide-react";

export default function TruyenThongPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Page header */}
      <div className="wana-gradient py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <Megaphone size={20} className="text-white" />
            </div>
            <p className="text-[#f5c800] text-sm font-bold tracking-widest uppercase">
              Wana Stories
            </p>
          </div>
          <h1 className="text-white text-4xl font-black">Tin tức & Truyền thông</h1>
          <p className="text-white/70 text-sm mt-2">
            Cập nhật hoạt động, sự kiện và câu chuyện mới nhất từ Wana Beverage.
          </p>
        </div>
      </div>

      {/* News — full mode */}
      <div className="-mt-4 relative z-10">
        <NewsSection preview={false} />
      </div>

      <Footer />
    </main>
  );
}
