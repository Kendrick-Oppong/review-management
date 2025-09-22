"use client";

import { CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { MessageSquare, Building2, Calendar, Eye, EyeOff } from "lucide-react";
import { ReviewListProps } from "@/interface/api";
import { Badge } from "../ui/badge";
import { RatingBadge } from "../ui/rating-badge";
import { cn } from "@/lib/utils";
import { ConfirmApprovalDialog } from "./confirm-approval";

export function ReviewList({
  reviews,
  selectedReviews,
  approved,
  onSelectionChange,
  onApprovalToggle,
}: Readonly<ReviewListProps>) {
  if (reviews.length === 0) {
    return (
      <CardContent>
        <div className="text-center py-12">
          <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">No reviews found</h3>
          <p className="text-muted-foreground">
            Try adjusting your filters or search terms
          </p>
        </div>
      </CardContent>
    );
  }

  return (
    <CardContent>
      <div className="space-y-4">
        {reviews.map((review) => {
          const isSelected = selectedReviews.includes(review.id);
          const isApproved = approved.includes(review.id);

          return (
            <div
              key={review.id}
              className={cn(
                "flex flex-col sm:flex-row items-start gap-4 p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors",
                isSelected && "border-primary bg-primary/5"
              )}
            >
              <Checkbox
                className="dark:text-white"
                checked={isSelected}
                onCheckedChange={(checked) =>
                  onSelectionChange(review.id, checked as boolean)
                }
              />

              <div className="flex-1 space-y-3 w-full">
                {/* Header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-muted-foreground" />
                      <span className="font-medium">{review.listing}</span>
                    </div>
                    <Badge variant="default" className="dark:text-white">
                      {review.channel}
                    </Badge>
                    <RatingBadge rating={review.rating} />
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(review.date).toLocaleDateString()}
                    </span>
                    <ConfirmApprovalDialog
                      isApproved={isApproved}
                      onConfirm={() => onApprovalToggle(review.id)}
                    >
                      <Button
                        variant="ghost"
                        size="sm"
                        className={cn(
                          "flex items-center gap-1",
                          isApproved
                            ? "text-green-400 hover:text-green-300"
                            : "text-muted-foreground hover:text-foreground"
                        )}
                      >
                        {isApproved ? (
                          <>
                            <Eye className="w-4 h-4" /> Public
                          </>
                        ) : (
                          <>
                            <EyeOff className="w-4 h-4" /> Hidden
                          </>
                        )}
                      </Button>
                    </ConfirmApprovalDialog>
                  </div>
                </div>

                {/* Guest Info */}
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>Guest: {review.guestName}</span>
                  <span>•</span>
                  <span>{review.type}</span>
                </div>

                {/* Review Content */}
                {review.publicReview && (
                  <div className="bg-muted/50 p-3 rounded-lg">
                    <p className="text-sm leading-relaxed">
                      {review.publicReview}
                    </p>
                  </div>
                )}

                {/* Category Ratings */}
                {review.reviewCategory.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {review.reviewCategory.map((category) => (
                      <Badge
                        key={category.category}
                        variant="outline"
                        className="text-xs"
                      >
                        {category.category}: {category.rating}/5
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </CardContent>
  );
}
