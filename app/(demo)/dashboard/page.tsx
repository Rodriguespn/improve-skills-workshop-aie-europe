"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { Nav } from "@/components/nav";
import { ProfileCard } from "@/components/profile-card";
import { ReviewCard } from "@/components/review-card";
import { getSupabase, setUserContext } from "@/lib/supabase";
import { useCurrentUser } from "@/lib/use-current-user";
import { AppUser, Profile, PerformanceReview } from "@/lib/types";

function LoadingSkeleton() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-8 w-full">
      {/* Welcome heading skeleton */}
      <div className="mb-10">
        <div className="h-8 w-64 rounded bg-sb-surface animate-pulse" />
        <div className="h-4 w-40 rounded bg-sb-surface animate-pulse mt-3" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-8">
        {/* Profile skeleton */}
        <div>
          <div className="h-4 w-24 rounded bg-sb-surface animate-pulse mb-3" />
          <div className="rounded-xl border border-sb-border/70 bg-sb-card p-4 space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-sb-surface animate-pulse" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-32 rounded bg-sb-surface animate-pulse" />
                <div className="h-3 w-48 rounded bg-sb-surface animate-pulse" />
              </div>
            </div>
            <div className="space-y-2 pt-3 border-t border-sb-border/50">
              <div className="h-3 w-40 rounded bg-sb-surface animate-pulse" />
              <div className="h-3 w-36 rounded bg-sb-surface animate-pulse" />
            </div>
          </div>
        </div>

        {/* Reviews skeleton */}
        <div>
          <div className="h-4 w-28 rounded bg-sb-surface animate-pulse mb-3" />
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-xl border border-sb-border/70 bg-sb-card p-4 space-y-3">
                <div className="flex items-center gap-2">
                  <div className="h-4 w-24 rounded bg-sb-surface animate-pulse" />
                  <div className="h-4 w-16 rounded bg-sb-surface animate-pulse" />
                </div>
                <div className="h-3 w-full rounded bg-sb-surface animate-pulse" />
                <div className="h-3 w-3/4 rounded bg-sb-surface animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

export default function DashboardPage() {
  const { currentUser, switchUser } = useCurrentUser();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [reviews, setReviews] = useState<PerformanceReview[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(async (user: AppUser) => {
    setLoading(true);
    setProfile(null);
    setReviews([]);

    try {
      const supabase = getSupabase();
      await setUserContext(supabase, user.id);

      const { data: profileData } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      const { data: reviewsData } = await supabase
        .from("performance_reviews")
        .select("*, reviewer:profiles!performance_reviews_reviewer_id_fkey(*)")
        .eq("reviewee_id", user.id)
        .order("created_at", { ascending: false });

      setProfile(profileData ?? null);
      setReviews(reviewsData ?? []);
    } catch {
      // Supabase not running
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    loadData(currentUser);
  }, [currentUser, loadData]);

  const handleSwitchUser = switchUser;

  const firstName = currentUser.name.split(" ")[0];
  const canSeeSalary = currentUser.role === "manager" || currentUser.role === "hr";
  const [showRaw, setShowRaw] = useState(false);

  // Detect if the API returned private_notes the current user shouldn't see
  const leakedNotes = useMemo(() => {
    if (currentUser.role === "hr") return [];
    return reviews.filter((r) => r.private_notes && r.reviewer_id !== currentUser.id);
  }, [reviews, currentUser]);

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
        {/* Welcome heading */}
        <div className="mb-10 animate-in">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Welcome back, {firstName}
          </h1>
          <p className="text-sb-muted text-sm mt-2">
            {currentUser.department} &middot; {currentUser.role}
          </p>
        </div>

        <div className="stagger grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-8">
          {/* Your Profile section */}
          <section>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-sb-muted mb-3">
              Your Profile
            </h2>
            {profile ? (
              <ProfileCard profile={profile} showSalary={canSeeSalary} />
            ) : (
              <p className="text-sb-muted text-sm">No profile found.</p>
            )}
          </section>

          {/* Your Reviews section */}
          <section>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-sb-muted mb-3">
              Your Reviews
            </h2>
            {reviews.length === 0 ? (
              <p className="text-sb-muted text-sm">No reviews yet.</p>
            ) : (
              <div className="space-y-3">
                {reviews.map((review) => (
                  <ReviewCard
                    key={review.id}
                    review={review}
                    showPrivateNotes={false}
                  />
                ))}
              </div>
            )}

            {/* Private notes leak indicator */}
            {leakedNotes.length > 0 && (
              <div className="mt-4 rounded-xl border border-sb-danger/40 bg-sb-danger/10 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-sb-danger flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <p className="text-sm font-semibold text-sb-danger">Private Notes in API Response</p>
                      <p className="text-sm text-sb-danger-muted/80 mt-0.5">
                        The UI hides private notes, but the API returned <code className="text-xs bg-sb-danger/20 px-1 py-0.5 rounded">private_notes</code> for {leakedNotes.length} review{leakedNotes.length > 1 ? "s" : ""}. As <strong>{currentUser.role}</strong>, you should not have access to reviewer-only notes.
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={(e) => { e.stopPropagation(); setShowRaw((v) => !v); }}
                    className="text-xs text-sb-danger font-mono px-2 py-1 rounded border border-sb-danger/30 hover:bg-sb-danger/10 transition-colors flex-shrink-0 cursor-pointer"
                  >
                    {showRaw ? "Hide" : "Show"} raw
                  </button>
                </div>
                {showRaw && (
                  <div className="mt-3 rounded-lg bg-sb-card border border-sb-border p-3 overflow-x-auto">
                    <pre className="text-xs font-mono text-sb-danger-muted/80 whitespace-pre-wrap">
{leakedNotes.map((r) => `// ${r.review_period} — should be reviewer-only\nprivate_notes: "${r.private_notes}"\n`).join("\n")}
                    </pre>
                  </div>
                )}
              </div>
            )}
          </section>
        </div>
      </main>
    </>
  );
}
