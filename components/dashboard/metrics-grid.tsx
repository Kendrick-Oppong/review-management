"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUp,
  TrendingDown,
  Star,
  MessageSquare,
  Eye,
  AlertTriangle,
  Building2,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { NormalizedReview } from "@/interface/api";

interface MetricsGridProps {
  reviews: NormalizedReview[];
}

export function MetricsGrid({ reviews = [] }: Readonly<MetricsGridProps>) {
  const totalReviews = reviews.length;
  const reviewsWithRating = reviews.filter((r) => r.rating && r.rating > 0);
  const averageRating =
    reviewsWithRating.length > 0
      ? (
          reviewsWithRating.reduce((sum, r) => sum + (r.rating || 0), 0) /
          reviewsWithRating.length
        ).toFixed(1)
      : "0.0";

  const publicReviews = reviews.filter((r) => r.status === "published").length;
  const pendingReviews = reviews.filter((r) => r.status === "pending").length;
  const uniqueProperties = new Set(reviews.map((r) => r.listing)).size;
  const guestToHostReviews = reviews.filter(
    (r) => r.type === "guest-to-host"
  ).length;
  const responseRate =
    totalReviews > 0
      ? ((guestToHostReviews / totalReviews) * 100).toFixed(1)
      : "0.0";

  const metrics = [
    {
      title: "Total Reviews",
      value: totalReviews.toString(),
      change: "+12.5%",
      trend: "up" as const,
      icon: MessageSquare,
      description: "from Hostaway API",
    },
    {
      title: "Average Rating",
      value: averageRating,
      change: "+0.2",
      trend: "up" as const,
      icon: Star,
      description: "across all properties",
    },
    {
      title: "Public Reviews",
      value: publicReviews.toString(),
      change: "+8.3%",
      trend: "up" as const,
      icon: Eye,
      description: "approved for display",
    },
    {
      title: "Pending Approval",
      value: pendingReviews.toString(),
      change: "-15.2%",
      trend: "down" as const,
      icon: AlertTriangle,
      description: "awaiting review",
    },
    {
      title: "Active Properties",
      value: uniqueProperties.toString(),
      change: "+2",
      trend: "up" as const,
      icon: Building2,
      description: "with recent reviews",
    },
    {
      title: "Response Rate",
      value: `${responseRate}%`,
      change: "+2.1%",
      trend: "up" as const,
      icon: Users,
      description: "host responses",
    },
  ];

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
              <Badge
                variant="outline"
                className={cn(
                  "flex items-center gap-1",
                  metric.trend === "up"
                    ? "text-green-400 border-green-400/20 bg-green-400/10"
                    : "text-red-400 border-red-400/20 bg-red-400/10"
                )}
              >
                {metric.trend === "up" ? (
                  <TrendingUp className="w-3 h-3" />
                ) : (
                  <TrendingDown className="w-3 h-3" />
                )}
                {metric.change}
              </Badge>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
