import type { Employee } from "@/config/employees";

export function getEmployeeAvatar(employee: Employee) {
  return employee.id <= 7 ? `/assets/images/employee-${employee.id}.png` : "/assets/images/default-avatar.png";
}

export function getEmployeeCode(employee: Employee) {
  return `ACF${String(employee.id).padStart(4, "0")}`;
}
