"use client";

import { useApprovedReviews } from "@/lib/hooks/use-approve-reviews";
import { NormalizedReview } from "@/interface/api";
import { useGetAllReviews } from "@/lib/hooks/use-reviews";
import { LoadingSpinner } from "../ui/loading-spinner";
import { ErrorState } from "../ui/error-state";
import { useMemo } from "react";

export function GuestReviews() {
  const { approved } = useApprovedReviews();
  const {
    data: reviews = [],
    isLoading,
    isError,
    refetch,
  } = useGetAllReviews();

  const publicReviews = useMemo(() => {
    return reviews.filter((review: NormalizedReview) =>
      approved.includes(review.id)
    );
  }, [reviews, approved]);

  if (isLoading) {
    return (
      <section className="py-8">
        <div className="flex-1 overflow-y-auto p-6">
          <LoadingSpinner />
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="py-8">
        <main className="flex-1 overflow-y-auto p-6">
          <ErrorState
            title="Failed to load reviews"
            onRetry={() => refetch()}
          />
        </main>
      </section>
    );
  }

  if (publicReviews.length === 0) {
    return null;
  }

  return (
    <section className="mb-8 bg-white p-4 rounded-lg shadow">
      <h3 className="text-xl font-semibold mb-4">Guest Reviews</h3>

      <div className="grid gap-4">
        {publicReviews.map((review) => (
          <div
            key={review.id}
            className="p-4 border border-border rounded-lg bg-card shadow-sm"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">{review.guestName}</span>
              <span className="text-sm text-muted-foreground">
                {new Date(review.date).toLocaleDateString()}
              </span>
            </div>

            {/* Content */}
            {review.publicReview && (
              <p className="text-sm leading-relaxed">{review.publicReview}</p>
            )}

            {/* Category Ratings */}
            {review.reviewCategory.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {review.reviewCategory.map((category) => (
                  <span
                    key={category.category}
                    className="px-2 py-1 text-xs border rounded"
                  >
                    {category.category}: {category.rating}/5
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
