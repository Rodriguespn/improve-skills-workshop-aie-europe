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
      className={`rounded-xl border bg-sb-card p-4 flex flex-col gap-1.5 transition-colors ${
        warning
          ? "leak-warning border-sb-danger/60"
          : "border-sb-border/70"
      }`}
    >
      <p className="text-[10px] uppercase tracking-widest font-semibold text-sb-muted">
        {label}
      </p>
      <p
        className={`text-2xl font-mono font-bold leading-tight tracking-tight ${
          warning ? "text-sb-danger" : "text-foreground"
        }`}
      >
        {value}
      </p>
      {detail && (
        <p className={`text-xs mt-0.5 ${warning ? "text-sb-danger/70" : "text-sb-muted"}`}>
          {detail}
        </p>
      )}
    </div>
  );
}
