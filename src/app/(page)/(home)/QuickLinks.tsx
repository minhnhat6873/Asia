import Link from "next/link";
import { ArrowRight, Building2, Megaphone, PartyPopper, Users } from "lucide-react";

const links = [
  { href: "/employees", icon: Users, title: "Danh sách nhân viên", desc: "Tìm kiếm và kết nối với đồng nghiệp" },
  { href: "/news", icon: Megaphone, title: "Truyền thông nội bộ", desc: "Tin tức, sự kiện, hoạt động" },
  { href: "/welcome", icon: PartyPopper, title: "Chào mừng nhân viên mới", desc: "Hành trang gia nhập Á Châu" },
  { href: "/about-wana", icon: Building2, title: "Về Á Châu", desc: "Văn hóa, giá trị, tầm nhìn" },
];

export default function QuickLinks() {
  return (
    <section className="border-b border-gray-100 bg-white py-6">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 px-6 sm:grid-cols-2 lg:grid-cols-4">
        {links.map(({ href, icon: Icon, title, desc }) => (
          <Link
            key={href}
            href={href}
            className="group flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:border-green-100 hover:shadow-md"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-50 text-[#1a7a1a]">
              <Icon size={25} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-bold leading-tight text-gray-900 transition-colors group-hover:text-[#1a7a1a]">{title}</p>
              <p className="mt-1 truncate text-xs text-gray-500">{desc}</p>
            </div>
            <ArrowRight size={18} className="shrink-0 text-[#1a7a1a] transition-transform group-hover:translate-x-1" />
          </Link>
        ))}
      </div>
    </section>
  );
}
