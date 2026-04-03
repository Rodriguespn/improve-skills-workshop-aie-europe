"use client";

import { useState, useEffect, useCallback } from "react";
import { Nav } from "@/components/nav";
import { StatCard } from "@/components/stat-card";
import { getSupabase, setUserContext } from "@/lib/supabase";
import { USERS } from "@/lib/users";
import { AppUser, DepartmentStats } from "@/lib/types";

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatRating(value: number): string {
  return value.toFixed(2);
}

export default function ReportsPage() {
  const [currentUser, setCurrentUser] = useState<AppUser>(USERS[0]);
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

  const handleSwitchUser = (user: AppUser) => {
    setCurrentUser(user);
  };

  const isLeaking =
    viewExists &&
    currentUser.role !== "hr" &&
    stats.some((s) => s.avg_salary > 0);

  if (loading) {
    return (
      <>
        <Nav currentUser={currentUser} onSwitchUser={handleSwitchUser} />
        <div className="flex flex-1 items-center justify-center">
          <p className="text-sb-muted">Loading...</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Nav currentUser={currentUser} onSwitchUser={handleSwitchUser} />
      <main className="max-w-6xl mx-auto px-6 py-8 w-full">
        {/* Title */}
        <div className="mb-8 animate-in">
          <h1 className="text-2xl font-semibold text-foreground">Department Reports</h1>
          <p className="text-sb-muted text-sm mt-1">
            Aggregated statistics by department
          </p>
        </div>

        {/* Error state */}
        {error && (
          <div className="rounded-xl border border-red-500/30 bg-red-500/5 p-6 mb-6">
            <p className="text-sm font-semibold text-red-400 mb-1">Query Error</p>
            <p className="text-sm text-red-300/80">{error}</p>
          </div>
        )}

        {/* Empty state — view doesn&apos;t exist yet */}
        {!viewExists && !error && (
          <div className="rounded-xl border border-sb-border bg-sb-card p-10 flex flex-col items-center gap-4 text-center">
            <svg
              className="w-12 h-12 text-sb-muted/40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
              />
            </svg>
            <div>
              <p className="text-sm font-semibold text-foreground mb-1">
                No department_stats view found
              </p>
              <p className="text-sm text-sb-muted max-w-md">
                This page will display data once an agent creates the reporting view.
              </p>
            </div>
          </div>
        )}

        {/* Stats exist */}
        {viewExists && (
          <div className="space-y-6">
            {/* Data leak warning banner */}
            {isLeaking && (
              <div className="rounded-xl border border-red-500/40 bg-red-500/10 p-4 flex items-start gap-3">
                <svg
                  className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                <div>
                  <p className="text-sm font-semibold text-red-400">Data Leak Detected</p>
                  <p className="text-sm text-red-300/80 mt-0.5">
                    As a <strong>{currentUser.role}</strong>, you should not have access to salary
                    data in this view. The <code className="text-xs bg-red-500/20 px-1 py-0.5 rounded">department_stats</code> view
                    is missing <code className="text-xs bg-red-500/20 px-1 py-0.5 rounded">security_invoker = true</code>,
                    which means it runs with the definer&apos;s privileges instead of the caller&apos;s,
                    bypassing row-level security.
                  </p>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 stagger">
              {stats.map((dept) => (
                <div
                  key={dept.department}
                  className="rounded-xl border border-sb-border bg-sb-card p-5 space-y-4"
                >
                  <h3 className="text-base font-semibold text-foreground">
                    {dept.department}
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    <StatCard
                      label="Headcount"
                      value={String(dept.headcount)}
                    />
                    <StatCard
                      label="Avg Rating"
                      value={formatRating(dept.avg_rating)}
                      detail="out of 5.0"
                    />
                    <StatCard
                      label="Salary Range"
                      value={`${formatCurrency(dept.min_salary)} – ${formatCurrency(dept.max_salary)}`}
                      warning={isLeaking}
                    />
                    <StatCard
                      label="Avg Salary"
                      value={formatCurrency(dept.avg_salary)}
                      warning={isLeaking}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </>
  );
}
