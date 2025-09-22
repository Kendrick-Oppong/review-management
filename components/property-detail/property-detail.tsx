"use client";

import { Users, Bed, Bath } from "lucide-react";

import { Header } from "./header";
import { AboutProperty } from "./about-property";
import { Amenities } from "./amenities";
import { StayPolicy } from "./stay-policy";
import { BookingCard } from "./booking-card";
import { PropertyGallery } from "./gallery";
import { GuestReviews } from "./guest-reviews";

export const PropertyDetail = () => {
  return (
    <div className="min-h-screen bg-[#FFFDF6]">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <PropertyGallery />
          {/* Property Title */}
          <div className="my-10">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Elegant 1 Bed Apartment in the Heart of Lisbon
            </h1>
            <div className="flex items-center font-medium space-x-4 text-sm text-gray-600">
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-1" />
                <span>4 Guests</span>
              </div>
              <div className="flex items-center">
                <Bed className="w-4 h-4 mr-1" />
                <span>1 Bedrooms</span>
              </div>
              <div className="flex items-center">
                <Bath className="w-4 h-4 mr-1" />
                <span>1 Bathrooms</span>
              </div>
              <div className="flex items-center">
                <Bed className="w-4 h-4 mr-1" />
                <span>2 Beds</span>
              </div>
            </div>
          </div>
        </div>

        {/* Grid Layout for Property Details and Booking Card */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <AboutProperty />
            <Amenities />

            <StayPolicy />
            <GuestReviews />
          </div>

          <BookingCard />
        </div>
      </div>
    </div>
  );
};
