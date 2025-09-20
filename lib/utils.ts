import { NormalizedReview, Review } from "@/interface/api";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const channelMap: Record<number, string> = {
  2018: "Airbnb",
  2002: "Homeaway",
  2005: "Booking.com",
  2007: "Expedia",
  2009: "Homeaway iCal",
  2010: "Vrbo iCal",
  2000: "Direct",
  2013: "Booking Engine",
  2015: "Custom iCal",
  2016: "Tripadvisor iCal",
  2017: "WordPress",
  2019: "Marriott",
  2020: "Partner",
  2021: "GDS",
  2022: "Google",
};

function normalizeReview(review: Review): NormalizedReview {
  return {
    id: review.id,
    type: review.type,
    status: review.status,
    rating: review.rating ?? null,
    publicReview: review.publicReview ?? null,
    reviewCategory: review.reviewCategory || [],
    date: review.departureDate || review.arrivalDate,
    guestName: review.guestName ?? "Anonymous",
    listing: review.listingName ?? "Unknown Property",
    channel: channelMap[review.channelId] || "Unknown Channel",
  };
}

// Normalized array of reviews
export function normalizeReviews(reviews: Review[]): NormalizedReview[] {
  return reviews.map(normalizeReview);
}
