import { readFileSync, writeFileSync } from "node:fs";

const target = "src/app/(page)/(home)/NewsSection.tsx";
let source = readFileSync(target, "utf8");

const replace = (oldText, newText, label) => {
  if (!source.includes(oldText)) {
    console.error("MISSING: " + label);
    process.exitCode = 1;
    return;
  }
  source = source.replace(oldText, newText);
  console.log("ok: " + label);
};

replace(
  '  ArrowRight, Calendar, User, ChevronDown, ChevronRight, Search, ArrowDownUp',
  '  Search, ArrowDownUp, ChevronRight, X',
  "import line"
);

replace(
  '<Search size={18} className="mx-2.5 shrink-0 text-[#0d7c49]" />',
  '<Search size={20} aria-hidden="true" className="mx-2 shrink-0 text-[#0d7c49] sm:mx-3" />',
  "search icon"
);

replace(
  'placeholder="Tìm kiếm tin tức..."',
  'placeholder="Bạn muốn tìm tin gì?"',
  "search placeholder"
);

replace(
  'className="min-w-0 flex-1 bg-transparent py-1.5 text-sm text-[#16241a] outline-none placeholder:text-slate-400"',
  'aria-label="Từ khóa tin tức"\n        className="min-w-0 flex-1 bg-transparent py-2.5 text-sm text-[#16241a] outline-none placeholder:text-slate-400"',
  "search input"
);

replace(
  'className="flex min-w-0 items-center rounded-xl ' + 'border border-slate-200 bg-white p-1.5 shadow-sm"',
  'role="search"\n      aria-label="Tìm kiếm tin tức"\n      className="flex w-full min-w-0 items-center rounded-2xl bg-white p-1.5 shadow-sm ring-1 ring-[#dbe9e0] transition focus-within:ring-2 focus-within:ring-[#16894a] lg:max-w-xl"',
  "search box shell"
);

replace(
  'className="shrink-0 rounded-lg bg-[#087a43] px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#066838]"',
  'className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-[#087a43] px-3 text-sm font-bold text-white transition-colors hover:bg-[#066838] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#087a43] sm:px-5"',
  "search button shell"
);

// --- remove the duplicated icon map created by an earlier run ---
replace(
  'const categoryIcons: Record<string, typeof LayoutGrid> = {\n  "Tất cả": LayoutGrid,\n  "Sự kiện": Calendar,\n  "Tin tức": Newspaper,\n  "Nhân sự": Users,\n  "Thông báo": Megaphone,\n};\n\nconst categoryIcons',
  'const categoryIcons',
  "duplicate icon map"
);

// --- replace the old three-field filter row by line range ---
const lines = source.split("\n");
const startIndex = lines.findIndex((line) => line.includes("Category tabs (full page only)"));
if (startIndex === -1) {
  console.error("MISSING: filter row marker");
  process.exitCode = 1;
} else {
  const marker = lines.findIndex((line, index) => index > startIndex && line.includes("News Grid"));
  if (marker === -1) {
    console.error("MISSING: grid marker");
    process.exitCode = 1;
  } else {
    const block = `        {/* News discovery menu (full page only) */}
        {!preview && (
          <div className="mb-9 overflow-hidden rounded-3xl bg-white shadow-[0_12px_40px_-16px_rgba(7,61,55,0.18)] ring-1 ring-[#dce9e1]">
            <div className="flex flex-col gap-5 bg-gradient-to-br from-[#edf7ef] via-[#f7faf7] to-white p-5 sm:p-6 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
              <div className="flex items-center gap-3.5">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#073d37] text-[#f5c800] shadow-sm">
                  <Newspaper size={23} aria-hidden="true" />
                </span>
                <div>
                  <h2 className="text-lg font-extrabold tracking-tight text-[#073d37] sm:text-xl">Khám phá tin tức</h2>
                  <p className="mt-1 text-xs leading-relaxed text-slate-500 sm:text-sm">Kết nối với những câu chuyện tại Á Châu</p>
                </div>
              </div>
              <SearchBox query={searchQuery} onChange={setSearchQuery} />
            </div>
            <div className="px-5 pb-5 pt-5 sm:px-6">
              <div role="group" aria-label="Danh mục tin tức" className="flex flex-wrap gap-2">
                {newsCategories.map((category) => {
                  const Icon = categoryIcons[category] ?? Newspaper;
                  const isActive = activeCategory === category;
                  const count = news.filter((item) => category === "Tất cả" || item.category === category).length;
                  return (
                    <button
                      key={category}
                      type="button"
                      aria-pressed={isActive}
                      onClick={() => setActiveCategory(category)}
                      className={\`inline-flex min-h-11 items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#087a43] sm:gap-2.5 sm:px-4 \${isActive ? "bg-[#087a43] text-white shadow-[0_4px_12px_rgba(8,122,67,0.18)]" : "bg-[#f5f7f6] text-slate-600 hover:bg-[#edf7ef] hover:text-[#087a43]"}\`}
                    >
                      <Icon size={17} aria-hidden="true" />
                      {category}
                      <span
                        aria-label={\`\${count} bài viết\`}
                        className={\`flex h-5 min-w-5 items-center justify-center rounded-md px-1 text-[11px] font-bold \${isActive ? "bg-white/20 text-white" : "bg-white text-slate-500"}\`}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
              <div className="mt-5 flex-wrap items-center gap-x-4 gap-y-2 border-t border-[#edf1ee] pt-3">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                  <p role="status" aria-live="polite" aria-atomic="true" className="text-xs text-slate-500 sm:text-sm">
                    Hiển thị <span className="font-bold text-[#073d37]">{sortedItems.length}</span> bài viết
                    {activeCategory !== "Tất cả" && (
                      <span> trong <span className="font-semibold text-[#087a43]">{activeCategory}</span></span>
                    )}
                  </p>
                  {(searchQuery !== "" || activeCategory !== "Tất cả") && (
                    <button
                      type="button"
                      onClick={() => { setSearchQuery(""); setActiveCategory("Tất cả"); }}
                      className="inline-flex min-h-11 items-center gap-1 text-xs font-semibold text-[#087a43] hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#087a43]"
                    >
                      <X size={14} aria-hidden="true" /> Xóa bộ lọc
                    </button>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => setSortOrder((current) => current === "newest" ? "oldest" : "newest")}
                  aria-pressed={sortOrder === "oldest"}
                  aria-label={\`Sắp xếp theo ngày đăng: \${sortOrder === "newest" ? "Mới nhất" : "Cũ nhất"}. Bấm để đổi thứ tự.\`}
                  className="inline-flex min-h-11 items-center gap-2 rounded-lg px-2 text-xs font-semibold text-slate-600 transition-colors hover:bg-[#edf7ef] hover:text-[#087a43] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#087a43] sm:text-sm"
                >
                  <ArrowDownUp size={15} aria-hidden="true" className="text-[#087a43]" />
                  <span className="hidden sm:inline">Sắp xếp:</span> {sortOrder === "newest" ? "Mới nhất" : "Cũ nhất"}
                </button>
              </div>
            </div>
          </div>
        )}`;
    lines.splice(startIndex - 1, marker - (startIndex - 1), block);
    source = lines.join("\n");
    console.log("ok: filter row block replaced");
  }
}

writeFileSync(target, source);
