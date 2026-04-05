import { Profile } from "./types";

export const roleBadgeClass: Record<Profile["role"], string> = {
  employee: "bg-sb-role-employee/20 text-sb-role-employee border border-sb-role-employee/30",
  manager: "bg-sb-green/20 text-sb-green border border-sb-green/30",
  hr: "bg-sb-role-hr/20 text-sb-role-hr border border-sb-role-hr/30",
};
