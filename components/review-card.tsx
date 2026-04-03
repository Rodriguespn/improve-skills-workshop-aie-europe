"use client";

import { PerformanceReview, Profile } from "@/lib/types";

interface ReviewCardProps {
  review: PerformanceReview;
  reviewer?: Profile;
  showPrivateNotes: boolean;
}

function StarIcon({ filled, color }: { filled: boolean; color: string }) {
  return (
    <svg
      className={`w-4 h-4 ${filled ? color : "text-sb-border"}`}
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

const RATING_COLORS: Record<number, string> = {
  1: "text-red-400",
  2: "text-orange-400",
  3: "text-yellow-400",
  4: "text-green-400",
  5: "text-sb-green-light",
};

function StarRating({ rating }: { rating: number }) {
  const color = RATING_COLORS[Math.min(Math.max(Math.round(rating), 1), 5)] ?? "text-sb-muted";
  return (
    <div className="flex items-center gap-0.5" aria-label={`Rating: ${rating} out of 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <StarIcon key={i} filled={i < rating} color={color} />
      ))}
      <span className={`ml-1 text-xs font-mono font-semibold ${color}`}>{rating}/5</span>
    </div>
  );
}

function WarningIcon() {
  return (
    <svg
      className="w-3.5 h-3.5 text-red-400 flex-shrink-0"
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
  );
}

export function ReviewCard({ review, reviewer, showPrivateNotes }: ReviewCardProps) {
  const reviewerName = reviewer?.full_name ?? review.reviewer?.full_name ?? "Unknown Reviewer";

  return (
    <div className="rounded-xl border border-sb-border bg-sb-card p-4 space-y-3">
      {/* Header row */}
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <div>
          <p className="text-xs font-semibold text-sb-muted uppercase tracking-wider">
            {review.review_period}
          </p>
          <p className="text-xs text-sb-muted mt-0.5">
            Reviewed by{" "}
            <span className="text-foreground/80 font-medium">{reviewerName}</span>
          </p>
        </div>
        <StarRating rating={review.rating} />
      </div>

      {/* Comments */}
      {review.comments && (
        <p className="text-sm text-foreground/80 leading-relaxed">{review.comments}</p>
      )}

      {/* Private notes */}
      {showPrivateNotes && review.private_notes && (
        <div className="rounded-lg border border-red-500/30 bg-red-500/5 p-3 space-y-1.5">
          <div className="flex items-center gap-1.5">
            <WarningIcon />
            <span className="text-[10px] font-semibold uppercase tracking-wider text-red-400">
              Private Notes
            </span>
          </div>
          <p className="text-sm text-red-300/80 leading-relaxed">{review.private_notes}</p>
        </div>
      )}
    </div>
  );
}
