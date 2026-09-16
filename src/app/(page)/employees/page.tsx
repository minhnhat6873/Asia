"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/app/components/layout/Navbar";
import Footer from "@/app/components/layout/Footer";
import { departments, employees } from "@/config/employees";
import EmployeeDirectory from "./EmployeeDirectory";
import EmployeeFilters from "./EmployeeFilters";
import EmployeeProfile from "./EmployeeProfile";
import EmployeeStats from "./EmployeeStats";
import EmployeesHero from "./EmployeesHero";

const allDepartments = departments;
const allPositions = ["Tất cả chức vụ", ...Array.from(new Set(employees.map((employee) => employee.position)))];

// Tách ra component riêng vì useSearchParams() cần Suspense boundary
function EmployeesContent() {
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(() => searchParams.get("search") ?? "");
  const [department, setDepartment] = useState(() => {
    const fromUrl = searchParams.get("department");
    return fromUrl && allDepartments.includes(fromUrl) ? fromUrl : "Tất cả phòng ban";
  });
  const [position, setPosition] = useState("Tất cả chức vụ");
  const [newestFirst, setNewestFirst] = useState(true);
  const [selected, setSelected] = useState(employees[0]);

  const filteredEmployees = useMemo(() => {
    const keyword = search.trim().toLowerCase();
    return employees.filter((employee) => {
      const matchesKeyword = !keyword || [employee.name, employee.email, employee.department, employee.position, employee.phone]
        .some((value) => value.toLowerCase().includes(keyword));
      const matchesDepartment = department === "Tất cả phòng ban" || employee.department === department;
      const matchesPosition = position === "Tất cả chức vụ" || employee.position === position;
      return matchesKeyword && matchesDepartment && matchesPosition;
    }).sort((first, second) => {
      const toTimestamp = (date: string) => {
        const [day, month, year] = date.split("/").map(Number);
        return Date.UTC(year, month - 1, day);
      };
      const difference = toTimestamp(second.joinDate) - toTimestamp(first.joinDate);
      return newestFirst ? difference : -difference;
    });
  }, [search, department, position, newestFirst]);

  return (
    <>
      <EmployeesHero />
      <div className="mx-auto max-w-[1440px] px-5 py-5 md:px-8 md:py-7">
        <EmployeeFilters
          search={search}
          department={department}
          position={position}
          departments={allDepartments}
          positions={allPositions}
          newestFirst={newestFirst}
          onSearchChange={setSearch}
          onDepartmentChange={setDepartment}
          onPositionChange={setPosition}
          onToggleSort={() => setNewestFirst((current) => !current)}
        />
        <div className="mt-4 grid gap-4 xl:grid-cols-[minmax(0,1fr)_360px]">
          <div className="space-y-5">
            <EmployeeStats />
            <EmployeeDirectory employees={filteredEmployees} selectedId={selected.id} onSelect={setSelected} />
          </div>
          <EmployeeProfile employee={selected} />
        </div>
      </div>
    </>
  );
}

export default function EmployeesPage() {
  return (
    <main className="min-h-screen bg-[#f7faf8]">
      <Navbar />
      <Suspense fallback={<div className="flex min-h-screen items-center justify-center">Đang tải...</div>}>
        <EmployeesContent />
      </Suspense>
      <Footer />
    </main>
  );
}

