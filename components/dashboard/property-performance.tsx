"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Building2,
  Star,
  TrendingUp,
  TrendingDown,
  MessageSquare,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { NormalizedReview } from "@/interface/api";

interface PropertyPerformanceProps {
  reviews: NormalizedReview[];
}

export function PropertyPerformance({
  reviews = [],
}: Readonly<PropertyPerformanceProps>) {
  const safeReviews = reviews || [];

  const propertyStats = safeReviews.reduce((acc, review) => {
    if (!review.listing) return acc; // Skip reviews without property names

    const property = review.listing;
    if (!acc[property]) {
      acc[property] = {
        name: property,
        reviews: [],
        totalRating: 0,
        ratingCount: 0,
        issues: 0,
      };
    }

    acc[property].reviews.push(review);
    if (review.rating) {
      acc[property].totalRating += review.rating;
      acc[property].ratingCount += 1;
    }

    // Count issues (ratings below 3)
    if (review.rating && review.rating < 3) {
      acc[property].issues += 1;
    }

    return acc;
  }, {} as Record<string, { name: string; reviews: NormalizedReview[]; totalRating: number; ratingCount: number; issues: number }>);

  const properties = Object.values(propertyStats)
    .map((prop) => ({
      name: prop.name,
      rating:
        prop.ratingCount > 0
          ? Number((prop.totalRating / prop.ratingCount).toFixed(1))
          : 0,
      reviews: prop.reviews.length,
      trend: "up" as const,
      change: "+0.1",
      occupancy: Math.min(
        95,
        60 +
          (prop.ratingCount > 0 ? (prop.totalRating / prop.ratingCount) * 8 : 0)
      ),
      issues: prop.issues,
    }))
    .slice(0, 4);

  if (properties.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="w-5 h-5" />
            Property Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Building2 className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">
              No property data available
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full col-span-2 lg:col-span-1">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building2 className="w-5 h-5" />
          Property Performance
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {properties.map((property, index) => (
            <div key={index} className="space-y-3">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-sm truncate">
                    {property.name}
                  </h4>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 mt-1">
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">
                        {property.rating}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageSquare className="w-3 h-3 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        {property.reviews} reviews
                      </span>
                    </div>
                    <Badge
                      variant="outline"
                      className={cn(
                        "flex items-center gap-1 text-xs",
                        property.trend === "up"
                          ? "text-green-400 border-green-400/20 bg-green-400/10"
                          : "text-red-400 border-red-400/20 bg-red-400/10"
                      )}
                    >
                      {property.trend === "up" ? (
                        <TrendingUp className="w-2 h-2" />
                      ) : (
                        <TrendingDown className="w-2 h-2" />
                      )}
                      {property.change}
                    </Badge>
                  </div>
                </div>

                {property.issues > 0 && (
                  <Badge variant="destructive" className="text-xs">
                    {property.issues} issues
                  </Badge>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">
                    Guest Satisfaction
                  </span>
                  <span className="font-medium">
                    {Math.round(property.occupancy)}%
                  </span>
                </div>
                <Progress value={property.occupancy} className="h-2" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
