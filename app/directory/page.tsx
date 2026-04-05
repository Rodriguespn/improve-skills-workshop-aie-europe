"use client";

import { useState, useEffect, useCallback } from "react";
import { Nav } from "@/components/nav";
import { ProfileCard } from "@/components/profile-card";
import { getSupabase, setUserContext } from "@/lib/supabase";
import { useCurrentUser } from "@/lib/use-current-user";
import { AppUser, Profile } from "@/lib/types";

function LoadingSkeleton() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-8 w-full">
      {/* Title skeleton */}
      <div className="mb-10">
        <div className="h-8 w-52 rounded bg-sb-surface animate-pulse" />
        <div className="h-4 w-64 rounded bg-sb-surface animate-pulse mt-3" />
      </div>

      <div className="space-y-12">
        {[1, 2].map((section) => (
          <div key={section}>
            <div className="h-4 w-36 rounded bg-sb-surface animate-pulse mb-4" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {[1, 2, 3].map((card) => (
                <div key={card} className="rounded-xl border border-sb-border/70 bg-sb-card p-4 space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-sb-surface animate-pulse" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 w-28 rounded bg-sb-surface animate-pulse" />
                      <div className="h-3 w-40 rounded bg-sb-surface animate-pulse" />
                    </div>
                  </div>
                  <div className="space-y-2 pt-3 border-t border-sb-border/50">
                    <div className="h-3 w-32 rounded bg-sb-surface animate-pulse" />
                    <div className="h-3 w-28 rounded bg-sb-surface animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default function DirectoryPage() {
  const { currentUser, switchUser } = useCurrentUser();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(async (user: AppUser) => {
    setLoading(true);
    setProfiles([]);

    try {
      const supabase = getSupabase();
      await setUserContext(supabase, user.id);

      const { data } = await supabase
        .from("profiles")
        .select("*")
        .order("department")
        .order("full_name");

      setProfiles(data ?? []);
    } catch {
      // Supabase not running
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    loadData(currentUser);
  }, [currentUser, loadData]);

  const handleSwitchUser = switchUser;

  // Group profiles by department
  const grouped = profiles.reduce<Record<string, Profile[]>>((acc, profile) => {
    if (!acc[profile.department]) {
      acc[profile.department] = [];
    }
    acc[profile.department].push(profile);
    return acc;
  }, {});

  const departments = Object.keys(grouped).sort();
  const canSeeSalary = currentUser.role === "manager" || currentUser.role === "hr";

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
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Team Directory</h1>
          <p className="text-sb-muted text-sm mt-2">
            {profiles.length} people across {departments.length} departments
          </p>
        </div>

        <div className="stagger space-y-12">
          {departments.map((dept) => {
            const deptProfiles = grouped[dept];
            return (
              <section key={dept}>
                <div className="flex items-center gap-2.5 mb-4">
                  <h2 className="text-sm font-semibold uppercase tracking-wider text-sb-muted">
                    {dept}
                  </h2>
                  <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-sb-surface text-sb-muted">
                    {deptProfiles.length}
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {deptProfiles.map((profile) => {
                    // Managers only see salary for their own department; HR sees all
                    const showSalary =
                      currentUser.role === "hr" ||
                      (currentUser.role === "manager" &&
                        profile.department === currentUser.department);
                    return (
                      <ProfileCard
                        key={profile.id}
                        profile={profile}
                        showSalary={showSalary}
                      />
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>
      </main>
    </>
  );
}
