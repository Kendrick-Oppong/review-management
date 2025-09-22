import { cn } from "@/lib/utils";

export function LoadingSpinner({ className }: Readonly<{ className?: string }>) {
  return (
    <div className="flex flex-col items-center gap-2 justify-center h-64">
      <div
        className={cn(
          "animate-spin rounded-full border-b-3 border-primary h-12 w-12",
          className
        )}
          />
          <p>Loading...</p>
    </div>
  );
}
