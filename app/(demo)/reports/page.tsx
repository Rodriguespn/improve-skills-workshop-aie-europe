"use client";

import { useState, useEffect, useCallback } from "react";
import { Nav } from "@/components/nav";
import { StatCard } from "@/components/stat-card";
import { getSupabase, setUserContext } from "@/lib/supabase";
import { useCurrentUser } from "@/lib/use-current-user";
import { AppUser, DepartmentStats } from "@/lib/types";

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatRating(value: number | null | undefined): string {
  return (value ?? 0).toFixed(2);
}

const PLACEHOLDER_DEPARTMENTS = [
  { department: "Engineering" },
  { department: "Product" },
  { department: "HR" },
] as DepartmentStats[];

function LoadingSkeleton() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-8 w-full">
      {/* Title skeleton */}
      <div className="mb-10">
        <div className="h-8 w-60 rounded bg-sb-surface animate-pulse" />
        <div className="h-4 w-56 rounded bg-sb-surface animate-pulse mt-3" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="rounded-xl border border-sb-border/70 bg-sb-card p-5 space-y-4">
            <div className="h-5 w-32 rounded bg-sb-surface animate-pulse" />
            <div className="grid grid-cols-2 gap-3">
              {[1, 2, 3, 4].map((j) => (
                <div key={j} className="rounded-lg bg-sb-surface/50 p-3 space-y-2">
                  <div className="h-3 w-16 rounded bg-sb-surface animate-pulse" />
                  <div className="h-5 w-20 rounded bg-sb-surface animate-pulse" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default function ReportsPage() {
  const { currentUser, switchUser } = useCurrentUser();
  const [stats, setStats] = useState<DepartmentStats[]>([]);
  const [viewExists, setViewExists] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(async (user: AppUser) => {
    setLoading(true);
    setStats([]);
    setError(null);
    setViewExists(false);

    try {
      const supabase = getSupabase();
      await setUserContext(supabase, user.id);

      const { data, error: queryError } = await supabase
        .from("department_stats")
        .select("*");

      if (queryError) {
        if (
          queryError.message?.includes("does not exist") ||
          queryError.message?.includes("Could not find") ||
          queryError.code === "42P01" ||
          queryError.code === "PGRST204"
        ) {
          setViewExists(false);
        } else {
          setError(queryError.message);
          setViewExists(false);
        }
      } else {
        setStats(data ?? []);
        setViewExists(true);
      }
    } catch {
      // Supabase not running or network error — show empty state
      setViewExists(false);
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    loadData(currentUser);
  }, [currentUser, loadData]);

  const handleSwitchUser = switchUser;


  if (loading) {
    return (
      <>
        <Nav currentUser={currentUser} onSwitchUser={handleSwitchUser} />
        <div role="status" aria-live="polite">
          <LoadingSkeleton />
        </div>
      </>
    );
  }

  return (
    <>
      <Nav currentUser={currentUser} onSwitchUser={handleSwitchUser} />
      <main id="main-content" className="max-w-6xl mx-auto px-6 py-8 w-full">
        {/* Title */}
        <div className="mb-10 animate-in">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Department Reports</h1>
          <p className="text-sb-muted text-sm mt-2">
            Aggregated statistics by department
          </p>
        </div>

        {/* Error state */}
        {error && (
          <div className="rounded-xl border border-sb-danger/30 bg-sb-danger/5 p-6 mb-6">
            <p className="text-sm font-semibold text-sb-danger mb-1">Query Error</p>
            <p className="text-sm text-sb-danger-muted/80">{error}</p>
          </div>
        )}

        {/* Department cards — placeholders when view doesn't exist yet */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 stagger">
          {(viewExists ? stats.filter((d) => d.avg_rating > 0) : PLACEHOLDER_DEPARTMENTS).map((dept) => (
            <div
              key={dept.department}
              className="rounded-xl border border-sb-border/70 bg-sb-card p-5 space-y-4"
            >
              <h3 className="text-base font-semibold text-foreground">
                {dept.department}
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <StatCard
                  label="Headcount"
                  value={viewExists ? String(dept.headcount) : "—"}
                />
                <StatCard
                  label="Avg Rating"
                  value={viewExists ? formatRating(dept.avg_rating) : "—"}
                  detail={viewExists ? "out of 5.0" : undefined}
                />
                <StatCard
                  label="Salary Range"
                  value={viewExists ? `${formatCurrency(dept.min_salary)} – ${formatCurrency(dept.max_salary)}` : "—"}
                />
                <StatCard
                  label="Avg Salary"
                  value={viewExists ? formatCurrency(dept.avg_salary) : "—"}
                />
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
