import { cn } from "@/lib/utils";
import { Star } from "lucide-react";
import { Badge } from "./badge";

export function RatingBadge({ rating }: Readonly<{ rating: number | null }>) {
  if (!rating) return <Badge variant="secondary">No Rating</Badge>;

  return (
    <Badge
      variant="outline"
      className={cn(
        "flex items-center gap-1",
        rating >= 4
          ? "text-green-400 border-green-400/20 bg-green-400/10"
          : rating >= 3
          ? "text-yellow-400 border-yellow-400/20 bg-yellow-400/10"
          : "text-red-400 border-red-400/20 bg-red-400/10"
      )}
    >
      <Star className="w-3 h-3 fill-current" />
      {rating}
    </Badge>
  );
}
