"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Expand, X, ChevronLeft, ChevronRight } from "lucide-react";
import { images, sideImages } from "@/lib/constants";

export const PropertyGallery = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showAllPhotos, setShowAllPhotos] = useState(false);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <>
      {/* Main Grid */}
      <div className="grid grid-cols-1 gap-4 relative  rounded-lg overflow-hidden sm:grid-cols-4 sm:gap-4 min-h-[400px] sm:min-h-[600px]">
        {/* Main Large Image */}
        <div className="relative col-span-1 sm:col-span-2 cursor-pointer">
          <Image
            src={images[currentImageIndex]}
            alt={`Property main view ${currentImageIndex + 1}`}
            fill
            className="w-full h-full object-cover"
          />
          {/* Mobile Navigation Arrows */}
          <div className="absolute inset-0 flex items-center justify-between px-4 sm:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={prevImage}
              className="text-white bg-black/30 p-2"
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={nextImage}
              className="text-white bg-black/30 p-2"
            >
              <ChevronRight className="w-6 h-6" />
            </Button>
          </div>
        </div>

        {/* 4 Smaller Side Images (hidden on mobile, shown on sm+) */}
        <div className="hidden sm:grid sm:col-span-2 sm:grid-cols-2 sm:gap-4">
          {sideImages.map((image, index) => (
            <div
              key={index + 1}
              className="relative cursor-pointer"
              onClick={() => {
                setCurrentImageIndex(index + 1);
                setShowAllPhotos(true);
              }}
            >
              <Image
                src={image}
                fill
                alt={`Property view ${index + 2}`}
                className="w-full h-full object-cover"
              />
              {index === 3 && (
                <div className="absolute inset-0 bottom-6 right-6 flex items-end justify-end bg-opacity-50">
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-white/95 font-semibold hover:bg-white text-black border-0 text-xs px-3 py-1.5"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowAllPhotos(true);
                    }}
                  >
                    <Expand />
                    View all photos
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Mobile View All Button */}
        <div className="sm:hidden flex justify-start absolute bottom-4 left-4 w-full">
          <Button
            variant="outline"
            size="sm"
            className="bg-white/95 font-semibold hover:bg-white text-black border-0 text-xs px-3 py-1.5"
            onClick={() => setShowAllPhotos(true)}
          >
            <Expand />
            View all
          </Button>
        </div>
      </div>

      {/* Modal for Fullscreen Gallery */}
      {showAllPhotos && (
        <div className="fixed inset-0 bg-black/80 z-50 flex flex-col">
          <div className="max-w-[90%] my-auto mx-auto w-full bg-black">
            {/* Header */}
            <div className="flex items-center justify-between p-4 text-white">
              <div className="text-lg font-medium">
                {currentImageIndex + 1} / {images.length}
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAllPhotos(false)}
                className="text-white hover:bg-white/20 hover:text-white p-2"
              >
                <X className="w-6 h-6" />
              </Button>
            </div>

            {/* Main Image */}
            <div className="flex-1 flex items-center justify-center p-4 relative">
              <img
                src={images[currentImageIndex]}
                alt={`Property view ${currentImageIndex + 1}`}
                className="max-w-full max-h-full object-contain"
              />
              {/* Nav Arrows */}
              <Button
                variant="ghost"
                size="sm"
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 hover:text-white p-2"
              >
                <ChevronLeft className="w-6 h-6" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 hover:text-white p-2"
              >
                <ChevronRight className="w-6 h-6" />
              </Button>
            </div>

            {/* Thumbnails */}
            <div className="p-4 bg-black/80">
              <div className="flex space-x-2 overflow-x-auto max-w-full">
                {images.map((image, index) => (
                  <button
                    key={image}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-16 relative h-12 rounded overflow-hidden transition-all ${
                      currentImageIndex === index
                        ? "ring-2 ring-white opacity-100"
                        : "opacity-70 hover:opacity-90"
                    }`}
                  >
                    <Image
                      src={image}
                      fill
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Progress Bar */}
            <div className="px-4 pb-4">
              <div className="w-full bg-gray-700 rounded-full h-1">
                <div
                  className="bg-white h-1 rounded-full transition-all duration-300"
                  style={{
                    width: `${
                      ((currentImageIndex + 1) / images.length) * 100
                    }%`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
