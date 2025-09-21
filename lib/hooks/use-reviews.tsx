import { useQuery } from "@tanstack/react-query";
import { getAllReviews } from "../config/api";

export const useGetAllReviews = () => {
  return useQuery({
    queryKey: ["reviews"],
    queryFn: () => getAllReviews(),
  });
};
