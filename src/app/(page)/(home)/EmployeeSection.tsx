"use client";

import { useState } from "react";
import Link from "next/link";
import { employees, departments } from "@/config/employees";
import {
  Search, ChevronDown, Phone, Mail, MapPin, Briefcase,
  X, Cake, Calendar, ArrowRight
} from "lucide-react";

interface Props {
  preview?: boolean;
}

export default function EmployeeSection({ preview = false }: Props) {
  const [search, setSearch] = useState("");
  const [dept, setDept] = useState("Tất cả phòng ban");
  const [selected, setSelected] = useState<typeof employees[0] | null>(null);
  const [deptOpen, setDeptOpen] = useState(false);

  const filtered = employees.filter((e) => {
    const matchSearch =
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.department.toLowerCase().includes(search.toLowerCase()) ||
      e.position.toLowerCase().includes(search.toLowerCase());
    const matchDept = dept === "Tất cả phòng ban" || e.department === dept;
    return matchSearch && matchDept;
  });

  const displayed = preview ? filtered.slice(0, 4) : filtered;

  return (
    <section className="py-14 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        {preview ? (
          /* ── PREVIEW LAYOUT (Home page) ── 2-column: left text | right cards */
          <div className="flex flex-col lg:flex-row gap-10">

            {/* LEFT: Big heading + button */}
            <div className="lg:w-56 shrink-0 flex flex-col justify-between">
              <div>
                <p className="section-label mb-3">Con người Wana</p>
                <h2 className="text-4xl font-black text-gray-900 leading-tight mb-4">
                  Gặp gỡ<br />những thành<br />viên của<br />Wana
                </h2>
                {/* Green underline */}
                <div className="w-10 h-1 bg-[#1a7a1a] rounded-full mb-6" />
                <p className="text-gray-500 text-sm leading-relaxed">
                  Mỗi cá nhân là một mảnh ghép quan trọng tạo nên hành trình phát triển của Wana.
                </p>
              </div>
              <div className="mt-8">
                <Link
                  href="/employees"
                  className="inline-flex items-center gap-2 bg-[#0d5c0d] hover:bg-[#1a7a1a] text-white font-semibold text-sm px-6 py-3 rounded-full transition-all"
                >
                  Xem tất cả nhân viên <ArrowRight size={16} />
                </Link>
              </div>
            </div>

            {/* RIGHT: Search bar + Employee cards */}
            <div className="flex-1 min-w-0">
              {/* Search + filter row */}
              <div className="flex items-center gap-3 mb-6">
                <div className="relative flex-1">
                  <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Tìm kiếm theo tên, phòng ban, chức vụ..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-[#1a7a1a] focus:ring-1 focus:ring-[#1a7a1a]"
                  />
                </div>
                {/* Dept filter */}
                <div className="relative shrink-0">
                  <button
                    onClick={() => setDeptOpen(!deptOpen)}
                    className="flex items-center gap-2 px-4 py-2.5 text-sm border border-gray-200 rounded-xl hover:border-[#1a7a1a] bg-white transition-colors min-w-[160px]"
                  >
                    <span className="flex-1 text-left text-gray-700 truncate text-xs">{dept}</span>
                    <ChevronDown size={13} className="text-gray-400 shrink-0" />
                  </button>
                  {deptOpen && (
                    <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-20 w-52 py-1">
                      {departments.map((d) => (
                        <button
                          key={d}
                          onClick={() => { setDept(d); setDeptOpen(false); }}
                          className={`w-full text-left px-4 py-2 text-xs hover:bg-green-50 hover:text-[#1a7a1a] transition-colors ${
                            dept === d ? "text-[#1a7a1a] font-semibold bg-green-50" : "text-gray-700"
                          }`}
                        >
                          {d}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Cards grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {displayed.map((emp) => (
                  <EmployeeCard key={emp.id} emp={emp} onClick={() => setSelected(emp)} />
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* ── FULL PAGE LAYOUT ── */
          <>
            {/* Header row */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
              <div>
                <p className="section-label mb-2">Con người Wana</p>
                <h2 className="text-4xl font-black text-gray-900 leading-tight">
                  Danh bạ nhân viên
                </h2>
                <div className="w-10 h-1 bg-[#1a7a1a] rounded-full mt-3" />
              </div>
              {/* Search + filter */}
              <div className="flex items-center gap-3 flex-wrap">
                <div className="relative">
                  <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Tìm theo tên, phòng ban, chức vụ..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-9 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl w-72 focus:outline-none focus:border-[#1a7a1a]"
                  />
                </div>
                <div className="relative">
                  <button
                    onClick={() => setDeptOpen(!deptOpen)}
                    className="flex items-center gap-2 px-4 py-2.5 text-sm border border-gray-200 rounded-xl hover:border-[#1a7a1a] bg-white transition-colors min-w-[180px]"
                  >
                    <span className="flex-1 text-left text-gray-700 truncate">{dept}</span>
                    <ChevronDown size={14} className="text-gray-400 shrink-0" />
                  </button>
                  {deptOpen && (
                    <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-20 w-52 py-1">
                      {departments.map((d) => (
                        <button
                          key={d}
                          onClick={() => { setDept(d); setDeptOpen(false); }}
                          className={`w-full text-left px-4 py-2 text-sm hover:bg-green-50 hover:text-[#1a7a1a] transition-colors ${
                            dept === d ? "text-[#1a7a1a] font-semibold bg-green-50" : "text-gray-700"
                          }`}
                        >
                          {d}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {displayed.map((emp) => (
                <EmployeeCard key={emp.id} emp={emp} onClick={() => setSelected(emp)} />
              ))}
            </div>

            {displayed.length === 0 && (
              <div className="text-center py-20 text-gray-400">
                <p className="text-lg">Không tìm thấy nhân viên phù hợp</p>
              </div>
            )}

            <p className="text-sm text-gray-400 mt-6">
              Hiển thị <span className="font-semibold text-[#1a7a1a]">{displayed.length}</span> / {employees.length} nhân viên
            </p>
          </>
        )}
      </div>

      {/* ── Employee Detail Modal ── */}
      {selected && (
        <div
          className="fixed inset-0 bg-black/50 modal-backdrop z-50 flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Green header */}
            <div className="wana-gradient px-6 pt-8 pb-12 relative">
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 text-white/70 hover:text-white"
              >
                <X size={20} />
              </button>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full border-4 border-[#f5c800] overflow-hidden">
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

            {/* Body */}
            <div className="px-6 py-5 -mt-6 bg-white rounded-t-2xl relative">
              <div className="space-y-3">
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
        </div>
      )}
    </section>
  );
}

/* ── Employee Card ── portrait photo style */
function EmployeeCard({
  emp,
  onClick,
}: {
  emp: (typeof employees)[0];
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className="bg-white border border-gray-100 rounded-2xl overflow-hidden cursor-pointer shadow-sm card-hover"
    >
      {/* Portrait photo */}
      <div className="w-full aspect-[3/4] bg-gray-100 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={emp.avatar}
          alt={emp.name}
          className="w-full h-full object-cover object-top"
        />
      </div>

      {/* Info */}
      <div className="p-3">
        <p className="font-bold text-gray-900 text-sm leading-tight">{emp.name}</p>
        <p className="text-gray-400 text-xs mt-0.5 mb-2">{emp.position}</p>

        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <span className="text-[#1a7a1a]">🏢</span>
            <span className="truncate">{emp.department}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <Mail size={11} className="text-[#1a7a1a] shrink-0" />
            <span className="truncate">{emp.email}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <Phone size={11} className="text-[#1a7a1a] shrink-0" />
            <span>{emp.phone}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
