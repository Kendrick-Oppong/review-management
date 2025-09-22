"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Search,
  Star,
  Eye,
  EyeOff,
  MessageSquare,
  Calendar,
  Building2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { NormalizedReview } from "@/interface/api";

interface ReviewsTableProps {
  reviews: NormalizedReview[];
}

export function ReviewsTable({ reviews = [] }: Readonly<ReviewsTableProps>) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedChannel, setSelectedChannel] = useState("all");
  const [selectedRating, setSelectedRating] = useState("all");
  const [selectedReviews, setSelectedReviews] = useState<number[]>([]);
  const [publicReviews, setPublicReviews] = useState<Set<number>>(new Set());

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

  const togglePublicDisplay = (reviewId: number) => {
    const newPublicReviews = new Set(publicReviews);
    if (newPublicReviews.has(reviewId)) {
      newPublicReviews.delete(reviewId);
    } else {
      newPublicReviews.add(reviewId);
    }
    setPublicReviews(newPublicReviews);
  };

  const getRatingBadge = (rating: number | null) => {
    if (!rating) return <Badge variant="secondary">No Rating</Badge>;

    return (
      <Badge
        variant="outline"
        className={cn(
          "flex items-center gap-1",
          rating >= 4
            ? "text-green-400 border-green-400/20 bg-green-400/10"
            : rating >= 3
            ? "text-yellow-400 border-yellow-400/20 bg-yellow-400/10"
            : "text-red-400 border-red-400/20 bg-red-400/10"
        )}
      >
        <Star className="w-3 h-3 fill-current" />
        {rating}
      </Badge>
    );
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
            <p className="text-muted-foreground">
              Connect to Hostaway API to load reviews
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            Reviews Management
            <Badge variant="outline">{filteredReviews.length} reviews</Badge>
          </CardTitle>

          <div className="flex items-center gap-2">
            {selectedReviews.length > 0 && (
              <Button size="sm">
                <Eye className="w-4 h-4 mr-2" />
                Approve Selected ({selectedReviews.length})
              </Button>
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
              <Select
                value={selectedChannel}
                onValueChange={setSelectedChannel}
              >
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Channel" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Channels</SelectItem>
                  <SelectItem value="Airbnb">Airbnb</SelectItem>
                  <SelectItem value="Booking.com">Booking.com</SelectItem>
                  <SelectItem value="Homeaway">Homeaway</SelectItem>
                  <SelectItem value="Expedia">Expedia</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedRating} onValueChange={setSelectedRating}>
                <SelectTrigger className="w-full sm:w-32">
                  <SelectValue placeholder="Rating" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Ratings</SelectItem>
                  <SelectItem value="5">5 Stars</SelectItem>
                  <SelectItem value="4">4 Stars</SelectItem>
                  <SelectItem value="3">3 Stars</SelectItem>
                  <SelectItem value="low">Below 3</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          {filteredReviews.map((review) => (
            <div
              key={review.id}
              className={cn(
                "flex flex-col sm:flex-row items-start gap-4 p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors",
                selectedReviews.includes(review.id) &&
                  "border-primary bg-primary/5"
              )}
            >
              <Checkbox
                className="dark:text-white"
                checked={selectedReviews.includes(review.id)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setSelectedReviews([...selectedReviews, review.id]);
                  } else {
                    setSelectedReviews(
                      selectedReviews.filter((id) => id !== review.id)
                    );
                  }
                }}
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
                    {getRatingBadge(review.rating)}
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(review.date).toLocaleDateString()}
                    </span>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => togglePublicDisplay(review.id)}
                      className={cn(
                        "flex items-center gap-1",
                        publicReviews.has(review.id)
                          ? "text-green-400 hover:text-green-300"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      {publicReviews.has(review.id) ? (
                        <>
                          <Eye className="w-4 h-4" />
                          Public
                        </>
                      ) : (
                        <>
                          <EyeOff className="w-4 h-4" />
                          Hidden
                        </>
                      )}
                    </Button>
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
          ))}
        </div>

        {filteredReviews.length === 0 && (
          <div className="text-center py-12">
            <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No reviews found</h3>
            <p className="text-muted-foreground">
              Try adjusting your filters or search terms
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
