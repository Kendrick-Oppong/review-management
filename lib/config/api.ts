import { NormalizedReview } from "@/interface/api";
import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

export const getAllReviews = async (): Promise<NormalizedReview[]> => {
  const endpoint = "/api/reviews/hostaway";
  const response = await api.get(endpoint);
  return response.data.result;
};
