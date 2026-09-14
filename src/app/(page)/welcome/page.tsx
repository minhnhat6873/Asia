import Navbar from "@/app/components/layout/Navbar";
import Footer from "@/app/components/layout/Footer";
import { PartyPopper, CheckCircle, ArrowRight } from "lucide-react";
//alo

const newMembers = [
  {
    name: "Lý Văn L",
    position: "IT Support",
    dept: "Phòng IT",
    joinDate: "10/06/2023",
    avatar:
      "https://api.dicebear.com/9.x/avataaars/svg?seed=LyVanL&backgroundColor=c0aede",
  },
  {
    name: "Trịnh Thị K",
    position: "Content Creator",
    dept: "Phòng Marketing",
    joinDate: "20/03/2023",
    avatar:
      "https://api.dicebear.com/9.x/avataaars/svg?seed=TrinhThiK&backgroundColor=ffd5dc",
  },
  {
    name: "Tô Thị O",
    position: "Recruiter",
    dept: "Phòng Nhân Sự",
    joinDate: "15/02/2022",
    avatar:
      "https://api.dicebear.com/9.x/avataaars/svg?seed=ToThiO&backgroundColor=ffd5dc",
  },
  {
    name: "Ngô Văn I",
    position: "Sales Executive",
    dept: "Phòng Kinh Doanh",
    joinDate: "01/09/2022",
    avatar:
      "https://api.dicebear.com/9.x/avataaars/svg?seed=NgoVanI&backgroundColor=b6e3f4",
  },
  {
    name: "Nguyễn Văn A",
    position: "Software Developer",
    dept: "Phòng IT",
    joinDate: "01/06/2022",
    avatar:
      "https://api.dicebear.com/9.x/avataaars/svg?seed=NguyenVanA&backgroundColor=b6e3f4",
  },
];

const onboardingSteps = [
  {
    step: 1,
    title: "Hoàn thiện hồ sơ nhân sự",
    desc: "Nộp đầy đủ giấy tờ cá nhân tại Phòng Nhân Sự.",
    done: true,
  },
  {
    step: 2,
    title: "Nhận thiết bị làm việc",
    desc: "Liên hệ Phòng IT để nhận laptop, badge và tài khoản.",
    done: true,
  },
  {
    step: 3,
    title: "Tham gia buổi định hướng",
    desc: "Buổi định hướng tổ chức vào thứ Hai tuần đầu tiên.",
    done: false,
  },
  {
    step: 4,
    title: "Gặp gỡ đội nhóm",
    desc: "Được giới thiệu với team và manager trực tiếp.",
    done: false,
  },
  {
    step: 5,
    title: "Tham quan nhà máy & văn phòng",
    desc: "Tìm hiểu quy trình sản xuất và văn hóa Wana.",
    done: false,
  },
];

export default function ChaoMungPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero */}
      <div className="wana-gradient py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-[#f5c800] rounded-full flex items-center justify-center">
              <PartyPopper size={32} className="text-[#0d5c0d]" />
            </div>
          </div>
          <p className="text-[#f5c800] text-xs font-bold tracking-widest uppercase mb-3">
            Welcome to Wana
          </p>
          <h1 className="text-white text-4xl md:text-5xl font-black mb-4">
            Chào mừng thành viên mới! 🎉
          </h1>
          <p className="text-white/80 text-base max-w-xl mx-auto">
            bạn vừa gia nhập một gia đình tuyệt vời. Chúng tôi rất vui khi có
            bạn đồng hành trên hành trình{" "}
            <strong className="text-[#f5c800]">Growing Together</strong> của
            Wana.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Onboarding Checklist */}
          <div>
            <h2 className="text-2xl font-black text-gray-900 mb-2">
              Lộ trình Onboarding
            </h2>
            <p className="text-gray-500 text-sm mb-6">
              Các bước cần hoàn thành trong tuần đầu tiên
            </p>
            <div className="space-y-3">
              {onboardingSteps.map((step) => (
                <div
                  key={step.step}
                  className={`flex items-start gap-4 p-4 rounded-xl border transition-all ${
                    step.done
                      ? "bg-green-50 border-green-200"
                      : "bg-white border-gray-100 hover:border-[#1a7a1a]/30"
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-bold text-sm ${
                      step.done
                        ? "bg-[#1a7a1a] text-white"
                        : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    {step.done ? <CheckCircle size={16} /> : step.step}
                  </div>
                  <div>
                    <p
                      className={`font-semibold text-sm ${step.done ? "text-[#1a7a1a] line-through" : "text-gray-800"}`}
                    >
                      {step.title}
                    </p>
                    <p className="text-gray-500 text-xs mt-0.5">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* New Members */}
          <div>
            <h2 className="text-2xl font-black text-gray-900 mb-2">
              Thành viên mới gần đây
            </h2>
            <p className="text-gray-500 text-sm mb-6">
              Những gương mặt vừa gia nhập Wana
            </p>
            <div className="space-y-3">
              {newMembers.map((m) => (
                <div
                  key={m.name}
                  className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-100 shadow-sm card-hover"
                >
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#f5c800] shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={m.avatar}
                      alt={m.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 text-sm">
                      {m.name}
                    </p>
                    <p className="text-gray-500 text-xs">
                      {m.position} · {m.dept}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-400">Ngày vào</p>
                    <p className="text-xs font-semibold text-[#1a7a1a]">
                      {m.joinDate}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Welcome message */}
        <div className="mt-12 bg-[#f5c800]/10 border border-[#f5c800]/30 rounded-2xl p-8 text-center">
          <p className="text-[#0d5c0d] text-2xl font-black mb-2">
            "Growing Together — Cùng nhau phát triển"
          </p>
          <p className="text-gray-600 text-sm max-w-xl mx-auto">
            Tại Wana, mỗi cá nhân đều được trân trọng và tạo điều kiện để phát
            triển hết tiềm năng. Chào mừng bạn đến với hành trình đáng nhớ này!
          </p>
        </div>
      </div>

      <Footer />
    </main>
  );
}
