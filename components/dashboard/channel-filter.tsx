"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { NormalizedReview } from "@/interface/api";

interface ChannelFilterProps {
  reviews: NormalizedReview[];
  selectedChannel: string;
  onChannelChange: (value: string) => void;
}

export function ChannelFilter({
  reviews,
  selectedChannel,
  onChannelChange,
}: Readonly<ChannelFilterProps>) {
  //    unique channels from reviews data
  const availableChannels = Array.from(
    new Set(
      reviews
        .map((review) => review.channel)
        .filter((channel): channel is string => Boolean(channel))
    )
  ).sort();

  return (
    <Select value={selectedChannel} onValueChange={onChannelChange}>
      <SelectTrigger className="w-full sm:w-40">
        <SelectValue placeholder="Channel" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All Channels</SelectItem>
        {availableChannels.map((channel) => (
          <SelectItem key={channel} value={channel}>
            {channel}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
