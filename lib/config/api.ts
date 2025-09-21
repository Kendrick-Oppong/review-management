import { NormalizedReview } from "@/interface/api";
import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

export const getAllReviews = async (): Promise<NormalizedReview[]> => {
  const endpoint = "/api/reviews/hostaway";
  return (await api.get(endpoint)).data;
};
