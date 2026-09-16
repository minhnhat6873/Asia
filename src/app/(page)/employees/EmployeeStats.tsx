import { Building2, UsersRound, ChartNoAxesColumnIncreasing } from "lucide-react";

const stats = [
  { label: "Nhân viên", value: "500+", icon: UsersRound },
  { label: "Phòng ban", value: "12", icon: Building2 },
  { label: "Đang hoạt động", value: "95%", icon: ChartNoAxesColumnIncreasing },
];

export default function EmployeeStats() {
  return (
    <section className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      {stats.map(({ label, value, icon: Icon }) => (
        <article key={label} className="flex items-center gap-3 rounded-xl border border-slate-100 bg-white p-3 shadow-sm">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-50 text-[#16894a]">
            <Icon size={23} strokeWidth={2.3} />
          </div>
          <div>
            <p className="text-xl font-black leading-none text-[#08723d]">{value}</p>
            <p className="mt-0.5 text-xs text-slate-500">{label}</p>
          </div>
        </article>
      ))}
    </section>
  );
}
