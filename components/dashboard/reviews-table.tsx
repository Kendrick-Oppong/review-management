"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

import { Search, Eye, MessageSquare } from "lucide-react";
import { NormalizedReview } from "@/interface/api";
import { ChannelFilter } from "./channel-filter";
import { RatingFilter } from "./rating-filter";
import { ReviewList } from "./review-list";
import { useApprovedReviews } from "@/lib/hooks/use-approve-reviews";
import { ConfirmApprovalDialog } from "./confirm-approval";
import Link from "next/link";

interface ReviewsTableProps {
  reviews: NormalizedReview[];
}

export function ReviewsTable({ reviews = [] }: Readonly<ReviewsTableProps>) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedChannel, setSelectedChannel] = useState("all");
  const [selectedRating, setSelectedRating] = useState("all");
  const [selectedReviews, setSelectedReviews] = useState<number[]>([]);

  const { approved, toggleApproval } = useApprovedReviews();

  const filteredReviews = useMemo(() => {
    return reviews.filter((review) => {
      if (!review) return false;

      const matchesSearch =
        review.publicReview?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.guestName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.listing?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesChannel =
        selectedChannel === "all" || review.channel === selectedChannel;
      const matchesRating =
        selectedRating === "all" ||
        (selectedRating === "5" && review.rating === 5) ||
        (selectedRating === "4" && review.rating === 4) ||
        (selectedRating === "3" && review.rating === 3) ||
        (selectedRating === "low" && review.rating && review.rating < 3);

      return matchesSearch && matchesChannel && matchesRating;
    });
  }, [reviews, searchTerm, selectedChannel, selectedRating]);

  const handleSelectionChange = (reviewId: number, checked: boolean) => {
    if (checked) {
      setSelectedReviews([...selectedReviews, reviewId]);
    } else {
      setSelectedReviews(selectedReviews.filter((id) => id !== reviewId));
    }
  };

  if (!reviews || reviews.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Reviews Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No reviews available</h3>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-wrap space-y-4 sm:space-y-0 items-center justify-between">
          <CardTitle className="flex flex-wrap items-center gap-2">
            Reviews Management
            <Badge variant="outline">{filteredReviews.length} reviews</Badge>
          </CardTitle>
          <div className="flex flex-wrap items-center gap-2">
            <Button variant="outline" className="border-primary">
              <Link href="/">View Property Details</Link>
            </Button>
            {selectedReviews.length > 0 && (
              <ConfirmApprovalDialog
                isApproved={approved.some((id) => selectedReviews.includes(id))}
                count={selectedReviews.length}
                onConfirm={() => {
                  selectedReviews.forEach((id) => toggleApproval(id));
                  setSelectedReviews([]);
                }}
              >
                <Button size="sm" className="dark:text-white">
                  <Eye className="w-4 h-4 mr-2" />
                  Selected ({selectedReviews.length})
                </Button>
              </ConfirmApprovalDialog>
            )}
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col gap-4 mt-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="relative flex-1 max-w-sm w-full sm:w-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search reviews, guests, properties..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <ChannelFilter
                reviews={reviews}
                selectedChannel={selectedChannel}
                onChannelChange={setSelectedChannel}
              />

              <RatingFilter
                selectedRating={selectedRating}
                onRatingChange={setSelectedRating}
              />
            </div>
          </div>
        </div>
      </CardHeader>

      <ReviewList
        reviews={filteredReviews}
        selectedReviews={selectedReviews}
        approved={approved}
        onSelectionChange={handleSelectionChange}
        onApprovalToggle={toggleApproval}
      />
    </Card>
  );
}
