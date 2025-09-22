"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { DashboardHeaderProps } from "@/interface/api";

export function DashboardHeader({
  filters,
  onFiltersChange,
  properties = [],
}: Readonly<DashboardHeaderProps>) {
  const currentFilters = filters || { status: "all" as const };

  return (
    <header className="flex flex-col lg:flex-row items-start lg:items-center justify-between p-4 border-b border-gray-400 dark:border-border bg-popover  dark:bg-card gap-4">
      <div className="flex items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Reviews Dashboard
          </h1>
          <p className="text-sm text-muted-foreground">
            Monitor and manage property reviews across all channels
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full lg:w-auto">
        {filters && onFiltersChange && (
          <>
            {/* Property Filter */}
            <Select
              value={currentFilters.propertyName || "all"}
              onValueChange={(value) =>
                onFiltersChange?.({
                  ...currentFilters,
                  propertyName: value === "all" ? undefined : value,
                })
              }
            >
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="All Properties" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Properties</SelectItem>
                {properties.map((property) => (
                  <SelectItem key={property} value={property}>
                    {property}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Rating Filter */}
            <Select
              value={currentFilters.rating?.toString() || "all"}
              onValueChange={(value) =>
                onFiltersChange?.({
                  ...currentFilters,
                  rating: value === "all" ? undefined : Number.parseInt(value),
                })
              }
            >
              <SelectTrigger className="w-full sm:w-32">
                <SelectValue placeholder="Min Rating" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Ratings</SelectItem>
                <SelectItem value="5">5+ Stars</SelectItem>
                <SelectItem value="4">4+ Stars</SelectItem>
                <SelectItem value="3">3+ Stars</SelectItem>
                <SelectItem value="2">2+ Stars</SelectItem>
                <SelectItem value="1">1+ Stars</SelectItem>
              </SelectContent>
            </Select>
          </>
        )}

        {/* Theme Toggle */}
        <ModeToggle />
      </div>
    </header>
  );
}
