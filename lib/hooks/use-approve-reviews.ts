"use client";

import { useSyncExternalStore } from "react";
import { STORAGE_KEY } from "../constants";

let globalApproved: number[] = [];
const listeners = new Set<() => void>();

// Initializing from localStorage
if (typeof window !== "undefined") {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      globalApproved = JSON.parse(stored);
    } catch (err) {
      console.error("Failed to parse approved reviews", err);
    }
  }
}

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

const getSnapshot = () => globalApproved;

const getServerSnapshot = () => [];

const updateApproved = (newApproved: number[]) => {
  globalApproved = newApproved;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(newApproved));
  listeners.forEach((listener) => listener());
};

export function useApprovedReviews() {
  const approved = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggleApproval = (id: number) => {
    const newApproved = approved.includes(id)
      ? approved.filter((rid) => rid !== id)
      : [...approved, id];
    updateApproved(newApproved);
  };

  return { approved, toggleApproval };
}
