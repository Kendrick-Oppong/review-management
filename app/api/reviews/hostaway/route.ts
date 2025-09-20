import { NextResponse } from "next/server";
import staticReviews from "@/lib/data.json";
import { Review } from "@/interface/api";
import { normalizeReviews } from "@/lib/utils";

export const dynamic = "force-static";

export async function GET() {
  try {
    const token = process.env.HOSTAWAY_ACCESS_TOKEN;
    const baseUrl = process.env.HOSTAWAY_BASE_URL;

    if (!baseUrl || !token) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing HOSTAWAY_BASE_URL or HOSTAWAY_ACCESS_TOKEN",
        },
        { status: 500 }
      );
    }

    const hostawayRes = await fetch(`${baseUrl}/reviews`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const hostAwayData = await hostawayRes.json();

    // Raw reviews: either from Hostaway or static fallback
    const rawReviews =
      hostAwayData?.result && hostAwayData.result.length > 0
        ? (hostAwayData.result as Review[])
        : (staticReviews as Review[]);

    // Normalized data
    const reviews = normalizeReviews(rawReviews);

    return NextResponse.json({
      success: true,
      result: reviews,
    });
  } catch (error) {
    console.error("Error fetching reviews:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to load reviews",
      },
      { status: 500 }
    );
  }
}
