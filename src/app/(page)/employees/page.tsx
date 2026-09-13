"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Navbar from "@/app/components/layout/Navbar";
import Footer from "@/app/components/layout/Footer";
import { employees, departments } from "@/config/employees";
import {
  Search, ChevronDown, Phone, Mail, MapPin, X,
  Briefcase, Cake, Calendar, ArrowRight, ChevronLeft,
  ChevronRight, Users, Building2, LayoutGrid
} from "lucide-react";

/* ── SIDEBAR CATEGORIES ── */
const sidebarCats = [
  { label: "Tất cả nhân viên", value: "" },
  { label: "Ban lãnh đạo", value: "Ban Giám Đốc" },
  { label: "Khối văn phòng", value: "Phòng Nhân Sự" },
  { label: "Khối sản xuất", value: "Phòng Sản Xuất" },
  { label: "Khối kinh doanh", value: "Phòng Kinh Doanh" },
  { label: "Khối marketing", value: "Phòng Marketing" },
  { label: "Khối kỹ thuật", value: "Phòng IT" },
  { label: "Khối cung ứng", value: "Phòng Logistics" },
  { label: "Khối tài chính", value: "Phòng Kế Toán" },
];

const ITEMS_PER_PAGE = 12;

export default function NhanVienPage() {
  const [search, setSearch] = useState("");
  const [activeCat, setActiveCat] = useState("");
  const [deptFilter, setDeptFilter] = useState("Tất cả phòng ban");
  const [deptOpen, setDeptOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<typeof employees[0] | null>(null);

  /* ── Filtering ── */
  const filtered = useMemo(() => {
    return employees.filter((e) => {
      const matchSearch =
        !search ||
        e.name.toLowerCase().includes(search.toLowerCase()) ||
        e.email.toLowerCase().includes(search.toLowerCase()) ||
        e.phone.includes(search) ||
        e.position.toLowerCase().includes(search.toLowerCase());
      const matchCat = !activeCat || e.department === activeCat;
      const matchDept = deptFilter === "Tất cả phòng ban" || e.department === deptFilter;
      return matchSearch && matchCat && matchDept;
    });
  }, [search, activeCat, deptFilter]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const handleCatChange = (val: string) => {
    setActiveCat(val);
    setDeptFilter("Tất cả phòng ban");
    setPage(1);
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      {/* ══════════════════════════════════
          HERO BANNER — single bg + single gradient
         ══════════════════════════════════ */}
      <section className="relative overflow-hidden" style={{ height: "300px" }}>

        {/* Full-width staff photo */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/images/employees-banner.png"
          alt="Wana Team"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: "70% center" }}
        />

        {/* Single smooth gradient: solid green left → transparent right */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to right, #0d5c0d 0%, #0d5c0d 25%, rgba(13,92,13,0.85) 35%, rgba(13,92,13,0.5) 50%, rgba(13,92,13,0.15) 65%, transparent 80%)",
          }}
        />

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex items-center">
          <div className="w-full flex items-center justify-between">

            {/* LEFT: text + stats */}
            <div className="max-w-md">
              <p className="text-[#f5c800] text-[10px] font-bold tracking-widest uppercase mb-2">
                Con người Wana
              </p>
              <h1 className="text-white text-2xl md:text-3xl font-black leading-snug mb-2">
                Cùng nhau tạo nên<br />
                <span className="text-[#f5c800]">những điều tuyệt vời</span>
              </h1>
              <p className="text-white/80 text-xs mb-4 leading-relaxed max-w-sm">
                Mỗi thành viên là một mảnh ghép quan trọng<br />
                trong hành trình phát triển của Wana.
              </p>

              {/* Stats */}
              <div className="flex items-center gap-5">
                {[
                  { icon: Users, value: "500+", label: "Nhân viên" },
                  { icon: Building2, value: "12+", label: "Phòng ban" },
                  { icon: LayoutGrid, value: "3", label: "Văn phòng" },
                ].map((s) => {
                  const Icon = s.icon;
                  return (
                    <div key={s.label} className="flex items-center gap-1.5">
                      <Icon size={16} className="text-[#f5c800] shrink-0" />
                      <div>
                        <p className="text-white font-black text-sm leading-none">{s.value}</p>
                        <p className="text-white/55 text-[10px]">{s.label}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* RIGHT: quote card */}
            <div
              className="hidden lg:block rounded-xl px-4 py-3 text-right max-w-[160px]"
              style={{
                background: "rgba(13,92,13,0.6)",
                backdropFilter: "blur(6px)",
                border: "1px solid rgba(255,255,255,0.15)",
              }}
            >
              <span className="text-[#f5c800] text-3xl font-black leading-none">&ldquo;</span>
              <p className="text-white text-xs leading-snug -mt-1">
                Con người là trái tim của Wana
              </p>
              <div className="w-6 h-0.5 bg-[#f5c800] rounded-full mt-2 ml-auto" />
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          SEARCH BAR (full width)
         ══════════════════════════════════ */}
      <div className="bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex gap-3 flex-wrap">
            {/* Search */}
            <div className="relative flex-1 min-w-64">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Tìm kiếm theo tên, email, phòng ban, chức vụ..."
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-[#1a7a1a] focus:ring-1 focus:ring-[#1a7a1a]"
              />
            </div>

            {/* Dept dropdown */}
            <div className="relative">
              <button
                onClick={() => setDeptOpen(!deptOpen)}
                className="flex items-center gap-2 px-4 py-2.5 text-sm border border-gray-200 rounded-xl hover:border-[#1a7a1a] bg-white min-w-[170px] transition-colors"
              >
                <span className="flex-1 text-left text-gray-600 truncate text-xs">{deptFilter}</span>
                <ChevronDown size={13} className="text-gray-400 shrink-0" />
              </button>
              {deptOpen && (
                <div className="absolute left-0 top-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-20 w-52 py-1">
                  {departments.map((d) => (
                    <button
                      key={d}
                      onClick={() => { setDeptFilter(d); setDeptOpen(false); setPage(1); }}
                      className={`w-full text-left px-4 py-2 text-xs hover:bg-green-50 hover:text-[#1a7a1a] transition-colors ${deptFilter === d ? "text-[#1a7a1a] font-semibold bg-green-50" : "text-gray-700"}`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Placeholder dropdowns */}
            <button className="flex items-center gap-2 px-4 py-2.5 text-xs border border-gray-200 rounded-xl text-gray-600 bg-white min-w-[140px]">
              <span className="flex-1 text-left">Tất cả chức vụ</span>
              <ChevronDown size={13} className="text-gray-400" />
            </button>
            <button className="flex items-center gap-2 px-4 py-2.5 text-xs border border-gray-200 rounded-xl text-gray-600 bg-white min-w-[140px]">
              <span className="flex-1 text-left">Tất cả văn phòng</span>
              <ChevronDown size={13} className="text-gray-400" />
            </button>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════
          MAIN CONTENT: sidebar + grid
         ══════════════════════════════════ */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex gap-6 items-start">

          {/* ── LEFT SIDEBAR ── */}
          <aside className="w-52 shrink-0 hidden lg:block">
            {/* Category list */}
            <nav className="space-y-1 mb-6">
              {sidebarCats.map((cat) => {
                const isActive = activeCat === cat.value;
                return (
                  <button
                    key={cat.value}
                    onClick={() => handleCatChange(cat.value)}
                    className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-left ${
                      isActive
                        ? "bg-[#1a7a1a] text-white shadow-sm"
                        : "text-gray-600 hover:bg-green-50 hover:text-[#1a7a1a]"
                    }`}
                  >
                    {isActive && <span className="w-1.5 h-1.5 bg-[#f5c800] rounded-full shrink-0" />}
                    {cat.label}
                  </button>
                );
              })}
            </nav>

            {/* Join Wana CTA */}
            <div className="bg-[#e8f5e9] rounded-2xl p-4 border border-green-100">
              <p className="text-[#1a7a1a] font-black text-sm mb-1">Gia nhập Wana</p>
              <p className="text-gray-500 text-xs mb-3 leading-relaxed">
                Cùng tạo nên những giá trị lớn hơn
              </p>
              <Link
                href="/welcome"
                className="inline-flex items-center gap-1.5 bg-[#1a7a1a] hover:bg-[#0d5c0d] text-white text-xs font-semibold px-4 py-2 rounded-full transition-all"
              >
                Xem cơ hội nghề nghiệp <ArrowRight size={12} />
              </Link>
            </div>
          </aside>

          {/* ── MAIN GRID ── */}
          <div className="flex-1 min-w-0">
            {/* Header row */}
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-black text-gray-900">Danh sách nhân viên</h2>
                <div className="w-8 h-0.5 bg-[#f5c800] rounded-full mt-1" />
              </div>
              <p className="text-xs text-gray-400">
                Hiển thị{" "}
                <span className="font-semibold text-gray-600">
                  {(page - 1) * ITEMS_PER_PAGE + 1}–{Math.min(page * ITEMS_PER_PAGE, filtered.length)}
                </span>{" "}
                của{" "}
                <span className="font-semibold text-[#1a7a1a]">{filtered.length}</span> nhân viên
              </p>
            </div>

            {/* Employee grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
              {paginated.map((emp, idx) => (
                <EmployeeCard
                  key={emp.id}
                  emp={emp}
                  idx={idx}
                  onClick={() => setSelected(emp)}
                />
              ))}
            </div>

            {/* No results */}
            {paginated.length === 0 && (
              <div className="text-center py-20 text-gray-400">
                <p className="text-lg font-medium">Không tìm thấy nhân viên</p>
                <p className="text-sm mt-1">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
              </div>
            )}

            {/* ── PAGINATION ── */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-8">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:border-[#1a7a1a] hover:text-[#1a7a1a] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronLeft size={14} />
                </button>

                {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                  const p = i + 1;
                  return (
                    <button
                      key={p}
                      onClick={() => setPage(p)}
                      className={`w-8 h-8 rounded-full text-xs font-semibold transition-all ${
                        page === p
                          ? "bg-[#1a7a1a] text-white shadow-sm"
                          : "border border-gray-200 text-gray-600 hover:border-[#1a7a1a] hover:text-[#1a7a1a]"
                      }`}
                    >
                      {p}
                    </button>
                  );
                })}

                {totalPages > 5 && (
                  <>
                    <span className="text-gray-400 text-sm">...</span>
                    <button
                      onClick={() => setPage(totalPages)}
                      className={`w-8 h-8 rounded-full text-xs font-semibold border border-gray-200 text-gray-600 hover:border-[#1a7a1a] hover:text-[#1a7a1a] transition-all`}
                    >
                      {totalPages}
                    </button>
                  </>
                )}

                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:border-[#1a7a1a] hover:text-[#1a7a1a] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronRight size={14} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════
          BOTTOM CTA
         ══════════════════════════════════ */}
      <section className="relative overflow-hidden mt-8">
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/images/employees-banner.png" alt="" className="w-full h-full object-cover object-top opacity-20 absolute inset-0" />
        </div>
        <div className="absolute inset-0 bg-[#0d5c0d]/90" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-[#f5c800] text-xs font-bold tracking-widest uppercase mb-2">
                Cần hỗ trợ
              </p>
              <h3 className="text-white text-2xl md:text-3xl font-black leading-tight">
                Chúng tôi luôn ở đây<br />
                <span className="text-[#f5c800]">để kết nối và đồng hành cùng bạn</span>
              </h3>
            </div>
            <div className="text-right">
              <p className="text-white/70 text-sm mb-4 max-w-xs">
                Nếu bạn cần tìm kiếm thông tin, liên hệ đồng nghiệp hoặc có bất kỳ câu hỏi nào, đừng ngần ngại!
              </p>
              <Link
                href="/news"
                className="inline-flex items-center gap-2 bg-[#f5c800] hover:bg-[#d4aa00] text-[#0d5c0d] font-bold text-sm px-6 py-3 rounded-full transition-all shadow-lg"
              >
                Liên hệ bộ phận Nhân sự <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* ── DETAIL MODAL ── */}
      {selected && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Green header */}
            <div className="wana-gradient px-6 pt-8 pb-12 relative">
              <button onClick={() => setSelected(null)} className="absolute top-4 right-4 text-white/70 hover:text-white">
                <X size={20} />
              </button>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full border-4 border-[#f5c800] overflow-hidden bg-gray-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={selected.avatar} alt={selected.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-xl">{selected.name}</h3>
                  <p className="text-[#f5c800] text-sm">{selected.position}</p>
                  <span className="text-white/70 text-xs">{selected.department}</span>
                </div>
              </div>
            </div>
            <div className="px-6 py-5 -mt-6 bg-white rounded-t-2xl relative space-y-3">
              {[
                { icon: Mail, label: "Email", value: selected.email },
                { icon: Phone, label: "Số điện thoại", value: selected.phone },
                { icon: MapPin, label: "Địa điểm", value: selected.location },
                { icon: Briefcase, label: "Phòng ban", value: selected.department },
                { icon: Cake, label: "Ngày sinh", value: selected.birthday },
                { icon: Calendar, label: "Ngày vào công ty", value: selected.joinDate },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-center gap-3 py-2 border-b border-gray-50">
                  <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center shrink-0">
                    <Icon size={15} className="text-[#1a7a1a]" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">{label}</p>
                    <p className="text-sm font-medium text-gray-800">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

/* ── EMPLOYEE CARD ── portrait style */
const avatarImages = ["/assets/images/employee-1.png", "/assets/images/employee-2.png", "/assets/images/employee-3.png", "/assets/images/default-avatar.png"];

function EmployeeCard({
  emp,
  idx,
  onClick,
}: {
  emp: (typeof employees)[0];
  idx: number;
  onClick: () => void;
}) {
  // cycle through local images, fallback to dicebear
  const localImg = avatarImages[idx % avatarImages.length];

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 cursor-pointer group card-hover"
    >
      {/* Portrait photo */}
      <div className="relative w-full aspect-[3/3.5] bg-gray-100 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={localImg}
          alt={emp.name}
          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Info */}
      <div className="p-3">
        <div className="flex items-start justify-between gap-1 mb-1">
          <div>
            <p className="font-bold text-gray-900 text-sm leading-tight">{emp.name}</p>
            <p className="text-gray-400 text-xs">{emp.position}</p>
          </div>
          <div className="w-6 h-6 bg-green-50 rounded-full flex items-center justify-center shrink-0 group-hover:bg-[#1a7a1a] transition-colors mt-0.5">
            <ArrowRight size={11} className="text-[#1a7a1a] group-hover:text-white transition-colors" />
          </div>
        </div>

        <div className="space-y-1 mt-2">
          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <Briefcase size={10} className="text-[#1a7a1a] shrink-0" />
            <span className="truncate">{emp.department}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <Mail size={10} className="text-[#1a7a1a] shrink-0" />
            <span className="truncate">{emp.email}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <Phone size={10} className="text-[#1a7a1a] shrink-0" />
            <span>{emp.phone}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
