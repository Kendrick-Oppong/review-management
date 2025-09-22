"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface RatingFilterProps {
  selectedRating: string;
  onRatingChange: (value: string) => void;
}

export function RatingFilter({
  selectedRating,
  onRatingChange,
}: Readonly<RatingFilterProps>) {
  return (
    <Select value={selectedRating} onValueChange={onRatingChange}>
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
  );
}
