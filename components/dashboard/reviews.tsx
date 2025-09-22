"use client";

import { useState, useMemo } from "react";
import { useGetAllReviews } from "@/lib/hooks/use-reviews";
import { NormalizedReview, ReviewFilters } from "@/interface/api";
import { MetricsGrid } from "./metrics-grid";
import { ReviewsChart } from "./reviews-chart";
import { PropertyPerformance } from "./property-performance";
import { ReviewsTable } from "./reviews-table";
import { DashboardHeader } from "./header";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { ErrorState } from "@/components/ui/error-state";

export const AllReviews = () => {
  const { data: reviews, isLoading, isError, refetch } = useGetAllReviews();

  const [filters, setFilters] = useState<ReviewFilters>({
    status: "all",
  });

  console.log(reviews);

  const filteredReviews = useMemo(() => {
    // Add additional safety check to ensure reviews is an array
    if (!reviews || !Array.isArray(reviews)) {
      console.log("Reviews data:", reviews, "Type:", typeof reviews);
      return [];
    }

    return reviews.filter((review: NormalizedReview) => {
      // Property filter
      if (filters.propertyName && review.listing !== filters.propertyName) {
        return false;
      }

      // Rating filter
      if (filters.rating && review.rating && review.rating < filters.rating) {
        return false;
      }

      // Category filter
      if (filters.category) {
        const hasCategory = review.reviewCategory.some(
          (cat) => cat.category === filters.category
        );
        if (!hasCategory) return false;
      }

      return true;
    });
  }, [reviews, filters]);

  const uniqueProperties = useMemo(() => {
    if (!reviews || !Array.isArray(reviews)) return [];
    return [
      ...new Set(reviews.map((review: NormalizedReview) => review.listing)),
    ];
  }, [reviews]);

  if (isLoading) {
    return (
      <div className="flex flex-col h-screen bg-background">
        <DashboardHeader />
        <main className="flex-1 overflow-y-auto p-6">
          <LoadingSpinner />
        </main>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col h-screen bg-background">
        <DashboardHeader />
        <main className="flex-1 overflow-y-auto p-6">
          <ErrorState
            title="Failed to load reviews"
            onRetry={() => refetch()}
          />
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-background">
      <DashboardHeader
        filters={filters}
        onFiltersChange={setFilters}
        properties={uniqueProperties}
      />

      <main className="flex-1 overflow-y-auto p-6 space-y-6">
        <MetricsGrid reviews={filteredReviews} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <ReviewsChart reviews={filteredReviews} />
          <PropertyPerformance reviews={filteredReviews} />
        </div>

        <ReviewsTable reviews={filteredReviews} />
      </main>
    </div>
  );
};
