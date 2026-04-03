"use client";

interface StatCardProps {
  label: string;
  value: string;
  detail?: string;
  warning?: boolean;
}

export function StatCard({ label, value, detail, warning }: StatCardProps) {
  return (
    <div
      className={`rounded-xl border bg-sb-card p-4 flex flex-col gap-1 transition-colors ${
        warning
          ? "leak-warning border-red-400/60"
          : "border-sb-border"
      }`}
    >
      <p className="text-[10px] uppercase tracking-widest font-semibold text-sb-muted">
        {label}
      </p>
      <p
        className={`text-2xl font-mono font-bold leading-tight ${
          warning ? "text-red-400" : "text-foreground"
        }`}
      >
        {value}
      </p>
      {detail && (
        <p className={`text-xs mt-0.5 ${warning ? "text-red-400/70" : "text-sb-muted"}`}>
          {detail}
        </p>
      )}
    </div>
  );
}
