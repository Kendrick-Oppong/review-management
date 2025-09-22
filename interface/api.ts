type ReviewType = "guest-to-host" | "host-to-guest";

export interface NormalizedReview {
  id: number;
  type: ReviewType;
  status: string;
  rating: number | null;
  publicReview: string | null;
  reviewCategory: { category: string; rating: number }[];
  date: string; // arrivalDate or departureDate
  guestName: string;
  listing: string;
  channel: string; // mapped from channelId
}

interface ReviewCategory {
  category: string;
  rating: number;
}

export interface Review {
  id: number;
  accountId: number;
  listingMapId: number;
  reservationId: number;
  autoReviewId: number | null;
  timeDelta: number | null;
  scheduledDateTime: string | null;
  channelId: number;
  type: ReviewType;
  status: string;
  rating: number;
  externalReviewId: string;
  externalReservationId: string;
  publicReview: string;
  privateFeedback: string;
  revieweeResponse: string;
  isRevieweeRecommended: number | null;
  isCancelled: number | null;
  autoReviewTemplateId: number | null;
  reviewCategory: ReviewCategory[];
  departureDate: string;
  arrivalDate: string;
  listingName: string;
  guestName: string;
}

export interface ReviewFilters {
  status: "all" | "approved" | "pending";
  propertyName?: string;
  rating?: number;
  category?: string;
}

export interface DashboardHeaderProps {
  filters?: ReviewFilters;
  onFiltersChange?: (filters: ReviewFilters) => void;
  properties?: string[];
}
