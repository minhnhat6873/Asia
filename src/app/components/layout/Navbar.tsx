"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, ChevronDown } from "lucide-react";
import { useState } from "react";
import InternalSystemsMenu from "./InternalSystemsMenu";

const navLinks = [
  { href: "/", label: "Trang chủ" },
  { href: "/employees", label: "Nhân viên" },
  { href: "/news", label: "Truyền thông" },
  { href: "/welcome", label: "Chào mừng" },
  { href: "/about-wana", label: "Về Á Châu" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20 gap-6">

          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0">
            <Image
              src="/assets/images/asia-logo.png"
              alt="Asia Food & Beverage JSC"
              width={56}
              height={56}
              className="h-14 w-14 object-contain"
              priority
            />

          </Link>



          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            <nav className="flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-2 text-base font-medium transition-all ${
                    isActive
                      ? "text-[#1a7a1a] font-semibold"
                      : "text-gray-600 hover:text-[#1a7a1a]"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-0.5 bg-[#1a7a1a] rounded-full" />
                  )}
                </Link>
              );
            })}
            </nav>
            <InternalSystemsMenu />
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative">
              {searchOpen ? (
                <input
                  type="text"
                  placeholder="Tìm kiếm..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onBlur={() => setSearchOpen(false)}
                  autoFocus
                  className="w-48 pl-3 pr-8 py-1.5 text-sm border border-gray-300 rounded-full focus:outline-none focus:border-[#1a7a1a]"
                />
              ) : (
                <button
                  onClick={() => setSearchOpen(true)}
                  className="p-2 text-gray-500 hover:text-[#1a7a1a] hover:bg-green-50 rounded-full transition-colors"
                >
                  <Search size={20} />
                </button>
              )}
            </div>

            {/* User */}
            <div className="flex items-center gap-2.5 pl-3 border-l border-gray-200 cursor-pointer group">
              {/* Avatar - dùng ảnh thật nếu có */}
              <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-[#f5c800] shrink-0">
                <Image
                  src="/assets/images/default-avatar.png"
                  alt="Nguyễn Văn A"
                  width={36}
                  height={36}
                  className="object-cover w-full h-full"
                  onError={(e) => {
                    // fallback nếu ảnh lỗi
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-semibold text-gray-800 leading-tight">Nguyễn Văn A</p>
                <p className="text-xs text-gray-500 leading-tight">IT Department</p>
              </div>
              <ChevronDown size={14} className="text-gray-400 group-hover:text-[#1a7a1a] transition-colors" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
