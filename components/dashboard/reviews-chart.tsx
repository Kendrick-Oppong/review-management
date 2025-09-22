"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pie, PieChart } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import type { NormalizedReview } from "@/interface/api";
import { colors } from "@/lib/constants";

interface ReviewsChartProps {
  reviews: NormalizedReview[];
}

export function ReviewsChart({ reviews = [] }: Readonly<ReviewsChartProps>) {
  // property-based distribution instead of rating distribution
  const propertyStats = reviews.reduce((acc, review) => {
    if (!review.listing || !review.rating) return acc;

    if (!acc[review.listing]) {
      acc[review.listing] = {
        name: review.listing,
        totalRating: 0,
        count: 0,
        reviews: [],
      };
    }

    acc[review.listing].totalRating += review.rating;
    acc[review.listing].count += 1;
    acc[review.listing].reviews.push(review);

    return acc;
  }, {} as Record<string, { name: string; totalRating: number; count: number; reviews: NormalizedReview[] }>);

  // Convert to chart data and sort by review count
  const chartData = Object.values(propertyStats)
    .map((property) => ({
      name: property.name,
      value: property.count,
      avgRating: Number((property.totalRating / property.count).toFixed(1)),
      fill: getPropertyColor(property.name),
    }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 8); // Show top 8 properties

  function getPropertyColor(propertyName: string): string {
    let hash = 0;
    for (let i = 0; i < propertyName.length; i++) {
      hash = propertyName.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  }

  const chartConfig = chartData.reduce((config, item) => {
    config[item.name] = {
      label: item.name,
      color: item.fill,
    };
    return config;
  }, {} as ChartConfig);

  // Add the value config
  chartConfig.value = { label: "Reviews" };

  if (chartData.length === 0) {
    return (
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Property Performance
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-chart-1"></div>
                <span className="text-muted-foreground">Reviews</span>
              </div>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-[300px] text-muted-foreground">
            <div className="text-center">
              <p className="text-sm">No property data available</p>
              <p className="text-xs">Reviews will appear here once loaded</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Property Performance
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-chart-1"></div>
              <span className="text-muted-foreground">Reviews</span>
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <ChartContainer
            config={chartConfig}
            className="aspect-square mx-auto w-[350px] max-h-[350px]"
          >
            <PieChart>
              <ChartTooltip
                cursor={true}
                content={
                  <ChartTooltipContent
                    className="font-bold"
                    formatter={(value, name) => {
                      const dataItem = chartData.find((d) => d.name === name);
                      if (dataItem) {
                        return [
                          `${dataItem.avgRating}★ - reviews`,
                          dataItem.name,
                        ];
                      }
                      return [value, name];
                    }}
                  />
                }
              />
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                innerRadius={60}
                outerRadius={120}
                paddingAngle={2}
              />
            </PieChart>
          </ChartContainer>

          <div className="md:ml-6 md:flex-1 hidden md:block">
            <h4 className="font-semibold mb-3 text-sm">Top Properties</h4>
            <ul className="space-y-2 text-sm">
              {chartData.map((item) => (
                <li
                  key={item.name}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: item.fill }}
                      ></span>
                      <span
                        className="truncate max-w-[200px]"
                        title={item.name}
                      >
                        {item.name}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <span>{item.value} reviews</span>
                    <span className="text-yellow-500">★{item.avgRating}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
