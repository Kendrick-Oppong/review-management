"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Star,
  MessageSquare,
  Eye,
  AlertTriangle,
  Building2,
  Users,
} from "lucide-react";
import { useMemo } from "react";
import type { NormalizedReview } from "@/interface/api";
import { useApprovedReviews } from "@/lib/hooks/use-approve-reviews";

interface MetricsGridProps {
  reviews: NormalizedReview[];
}

export function MetricsGrid({ reviews = [] }: Readonly<MetricsGridProps>) {
  const { approved } = useApprovedReviews();

  const metrics = useMemo(() => {
    const totalReviews = reviews.length;
    const reviewsWithRating = reviews.filter((r) => r.rating && r.rating > 0);
    const averageRating =
      reviewsWithRating.length > 0
        ? (
            reviewsWithRating.reduce((sum, r) => sum + (r.rating || 0), 0) /
            reviewsWithRating.length
          ).toFixed(1)
        : "0.0";

    const publicReviews = reviews.filter((r) => approved.includes(r.id)).length;
    const pendingReviews = totalReviews - publicReviews;

    const uniqueProperties = new Set(reviews.map((r) => r.listing)).size;
    const guestToHostReviews = reviews.filter(
      (r) => r.type === "guest-to-host"
    ).length;
    const responseRate =
      totalReviews > 0
        ? ((guestToHostReviews / totalReviews) * 100).toFixed(1)
        : "0.0";

    return [
      {
        title: "Total Reviews",
        value: totalReviews.toString(),
        icon: MessageSquare,
        description: "from Hostaway API",
      },
      {
        title: "Average Rating",
        value: averageRating,
        icon: Star,
        description: "across all properties",
      },
      {
        title: "Public Reviews",
        value: publicReviews.toString(),
        icon: Eye,
        description: "approved for display",
      },
      {
        title: "Pending Approval",
        value: pendingReviews.toString(),
        icon: AlertTriangle,
        description: "awaiting review",
      },
      {
        title: "Active Properties",
        value: uniqueProperties.toString(),
        icon: Building2,
        description: "with recent reviews",
      },
      {
        title: "Response Rate",
        value: `${responseRate}%`,
        icon: Users,
        description: "host responses",
      },
    ];
  }, [reviews, approved]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {metrics.map((metric) => (
        <Card key={metric.title} className="relative overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {metric.title}
            </CardTitle>
            <metric.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">{metric.value}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {metric.description}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
