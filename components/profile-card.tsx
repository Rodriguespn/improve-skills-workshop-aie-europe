"use client";

import { Profile } from "@/lib/types";
import { roleBadgeClass } from "@/lib/styles";

interface ProfileCardProps {
  profile: Profile;
  showSalary: boolean;
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function formatSalary(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function ProfileCard({ profile, showSalary }: ProfileCardProps) {
  return (
    <div className="card-glow group rounded-xl border border-sb-border/70 bg-sb-card p-4 transition-all duration-300 hover:border-sb-green/20 hover:-translate-y-0.5">
      <div className="flex items-start gap-3">
        {/* Avatar */}
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-sb-green/25 to-sb-green/10 border border-sb-green/20 flex items-center justify-center">
          <span className="text-sm font-semibold text-sb-green">
            {getInitials(profile.full_name)}
          </span>
        </div>

        {/* Name + role */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-sm font-semibold text-foreground tracking-tight truncate">
              {profile.full_name}
            </h3>
            <span
              className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium flex-shrink-0 ${roleBadgeClass[profile.role]}`}
            >
              {profile.role}
            </span>
          </div>
          <p className="text-xs text-sb-muted truncate mt-0.5">{profile.email}</p>
        </div>
      </div>

      {/* Details */}
      <div className="mt-3 pt-3 border-t border-sb-border/50 space-y-1.5">
        <DetailRow
          icon={
            <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path
                fillRule="evenodd"
                d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 01-1.581.814L10 14.197l-4.419 2.617A1 1 0 014 16V4z"
                clipRule="evenodd"
              />
            </svg>
          }
          label="Department"
          value={profile.department}
        />
        <DetailRow
          icon={
            <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path
                fillRule="evenodd"
                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                clipRule="evenodd"
              />
            </svg>
          }
          label="Hired"
          value={formatDate(profile.hire_date)}
        />
        {showSalary && (
          <DetailRow
            icon={
              <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z"
                  clipRule="evenodd"
                />
              </svg>
            }
            label="Salary"
            value={formatSalary(profile.salary)}
          />
        )}
      </div>
    </div>
  );
}

function DetailRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-2 text-xs text-sb-muted">
      <span className="text-sb-muted/60 flex-shrink-0">{icon}</span>
      <span className="text-sb-muted/70">{label}:</span>
      <span className="text-foreground/80 truncate">{value}</span>
    </div>
  );
}
