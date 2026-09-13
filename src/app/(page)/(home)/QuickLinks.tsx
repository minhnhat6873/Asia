import Link from "next/link";
import { Users, Megaphone, PartyPopper, Info, ArrowRight } from "lucide-react";

const links = [
  {
    href: "/employees",
    icon: Users,
    title: "Danh sách nhân viên",
    desc: "Tìm kiếm và kết nối với đồng nghiệp",
    iconBg: "bg-green-100",
    iconColor: "text-[#1a7a1a]",
  },
  {
    href: "/news",
    icon: Megaphone,
    title: "Truyền thông nội bộ",
    desc: "Tin tức, sự kiện, hoạt động",
    iconBg: "bg-green-100",
    iconColor: "text-[#1a7a1a]",
  },
  {
    href: "/welcome",
    icon: PartyPopper,
    title: "Chào mừng nhân viên mới",
    desc: "Hành trang gia nhập Wana",
    iconBg: "bg-green-100",
    iconColor: "text-[#1a7a1a]",
  },
  {
    href: "/about-wana",
    icon: Info,
    title: "Về Wana",
    desc: "Văn hóa, giá trị, tầm nhìn",
    iconBg: "bg-green-100",
    iconColor: "text-[#1a7a1a]",
  },
];

export default function QuickLinks() {
  return (
    <section className="py-6 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="flex flex-col gap-3 p-6 rounded-2xl border border-gray-100 bg-white card-hover shadow-sm group"
              >
                {/* Icon */}
                <div className={`w-14 h-14 rounded-xl ${link.iconBg} flex items-center justify-center shrink-0`}>
                  <Icon size={28} className={link.iconColor} />
                </div>

                {/* Text */}
                <div className="flex-1">
                  <p className="text-base font-bold text-gray-900 group-hover:text-[#1a7a1a] transition-colors leading-snug">
                    {link.title}
                  </p>
                  <p className="text-sm text-gray-400 mt-1">{link.desc}</p>
                </div>

                {/* Arrow */}
                <div>
                  <ArrowRight
                    size={18}
                    className="text-[#1a7a1a] group-hover:translate-x-1 transition-transform"
                  />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
