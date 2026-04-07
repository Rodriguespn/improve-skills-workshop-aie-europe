"use client";

interface StatCardProps {
  label: string;
  value: string;
  detail?: string;
}

export function StatCard({ label, value, detail }: StatCardProps) {
  return (
    <div className="rounded-xl border border-sb-border/70 bg-sb-card p-4 flex flex-col gap-1.5 transition-colors">
      <p className="text-[10px] uppercase tracking-widest font-semibold text-sb-muted">
        {label}
      </p>
      <p className="text-2xl font-mono font-bold leading-tight tracking-tight text-foreground">
        {value}
      </p>
      {detail && (
        <p className="text-xs mt-0.5 text-sb-muted">
          {detail}
        </p>
      )}
    </div>
  );
}
