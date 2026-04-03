"use client";

import { useState, useEffect, useCallback } from "react";
import { Nav } from "@/components/nav";
import { ProfileCard } from "@/components/profile-card";
import { getSupabase, setUserContext } from "@/lib/supabase";
import { USERS } from "@/lib/users";
import { AppUser, Profile } from "@/lib/types";

export default function DirectoryPage() {
  const [currentUser, setCurrentUser] = useState<AppUser>(USERS[0]);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(async (user: AppUser) => {
    setLoading(true);
    setProfiles([]);

    const supabase = getSupabase();
    await setUserContext(supabase, user.id);

    const { data } = await supabase
      .from("profiles")
      .select("*")
      .order("department")
      .order("full_name");

    setProfiles(data ?? []);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadData(currentUser);
  }, [currentUser, loadData]);

  const handleSwitchUser = (user: AppUser) => {
    setCurrentUser(user);
  };

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
          <h1 className="text-2xl font-semibold text-foreground">Team Directory</h1>
          <p className="text-sb-muted text-sm mt-1">
            {profiles.length} people across {departments.length} departments
          </p>
        </div>

        <div className="stagger space-y-10">
          {departments.map((dept) => {
            const deptProfiles = grouped[dept];
            return (
              <section key={dept}>
                <h2 className="text-sm font-semibold uppercase tracking-wider text-sb-muted mb-3">
                  {dept} ({deptProfiles.length})
                </h2>
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
