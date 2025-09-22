"use client"

import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { STORAGE_KEY } from "../constants";

export function useApprovedReviews() {
  const queryClient = useQueryClient();
  const [approved, setApproved] = useState<number[]>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        try {
          return JSON.parse(stored);
        } catch (err) {
          console.error("Failed to parse approved reviews", err);
        }
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(approved));
    queryClient.invalidateQueries({ queryKey: ["reviews"] });
  }, [approved, queryClient]);

  const toggleApproval = (id: number) => {
    setApproved((prev) =>
      prev.includes(id) ? prev.filter((rid) => rid !== id) : [...prev, id]
    );
  };

  return { approved, toggleApproval };
}
