"use client";

import { useState, useEffect, useCallback } from "react";
import { Nav } from "@/components/nav";
import { ProfileCard } from "@/components/profile-card";
import { ReviewCard } from "@/components/review-card";
import { getSupabase, setUserContext } from "@/lib/supabase";
import { USERS } from "@/lib/users";
import { AppUser, Profile, PerformanceReview } from "@/lib/types";

export default function DashboardPage() {
  const [currentUser, setCurrentUser] = useState<AppUser>(USERS[0]);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [reviews, setReviews] = useState<PerformanceReview[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(async (user: AppUser) => {
    setLoading(true);
    setProfile(null);
    setReviews([]);

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
    setLoading(false);
  }, []);

  useEffect(() => {
    loadData(currentUser);
  }, [currentUser, loadData]);

  const handleSwitchUser = (user: AppUser) => {
    setCurrentUser(user);
  };

  const firstName = currentUser.name.split(" ")[0];
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
        {/* Welcome heading */}
        <div className="mb-8 animate-in">
          <h1 className="text-2xl font-semibold text-foreground">
            Welcome back, {firstName}
          </h1>
          <p className="text-sb-muted text-sm mt-1">
            {currentUser.department} &middot; {currentUser.role}
          </p>
        </div>

        <div className="stagger space-y-8">
          {/* Your Profile section */}
          <section>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-sb-muted mb-3">
              Your Profile
            </h2>
            {profile ? (
              <div className="max-w-sm">
                <ProfileCard profile={profile} showSalary={canSeeSalary} />
              </div>
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
          </section>
        </div>
      </main>
    </>
  );
}
