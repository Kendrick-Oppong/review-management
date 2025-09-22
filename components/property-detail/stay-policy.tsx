import {
  Ban,
  Calendar,
  Clock,
  PartyPopper,
  PawPrint,
  Shield,
} from "lucide-react";
import React from "react";

export const StayPolicy = () => {
  return (
    <div className="mb-8 bg-white p-4 rounded-lg shadow">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Stay Policies</h2>

      {/* Check-in & Check-out */}
      <div className="bg-[#F1F3EE] rounded-lg p-6 mb-4">
        <div className="flex items-center mb-4">
          <Clock className="w-5 h-5 text-green-600 mr-2" />
          <h3 className="font-semibold text-gray-900">Check-in & Check-out</h3>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-3 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Check-in Time</p>
            <p className="font-semibold">3:00 PM</p>
          </div>
          <div className="bg-white p-3 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Check-out Time</p>
            <p className="font-semibold">10:00 AM</p>
          </div>
        </div>
      </div>

      {/* House Rules */}
      <div className="bg-[#F1F3EE] rounded-lg p-6 mb-4">
        <div className="flex items-center mb-4">
          <Shield className="w-5 h-5 text-gray-600 mr-2" />
          <h3 className="font-semibold text-gray-900">House Rules</h3>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center bg-white p-3 rounded-lg">
            <Ban className="w-4 h-4 mr-2" />
            <span className="text-sm">No smoking</span>
          </div>
          <div className="flex items-center bg-white p-3 rounded-lg">
            <PawPrint className="w-4 h-4 mr-2" />
            <span className="text-sm">No pets</span>
          </div>
          <div className="flex items-center bg-white p-3 rounded-lg">
            <PartyPopper className="w-4 h-4 mr-2" />
            <span className="text-sm">No parties or events</span>
          </div>
          <div className="flex items-center bg-white p-3 rounded-lg">
            <Shield className="w-4 h-4 mr-2" />
            <span className="text-sm">Security deposit required</span>
          </div>
        </div>
      </div>

      {/* Cancellation Policy */}
      <div className="bg-[#F1F3EE] rounded-lg p-6">
        <div className="flex items-center mb-4">
          <Calendar className="w-5 h-5 text-gray-600 mr-2" />
          <h3 className="font-semibold text-gray-900">Cancellation Policy</h3>
        </div>
        <div className="space-y-4">
          <div className="bg-white rounded-lg p-3">
            <h4 className="font-medium text-gray-900 mb-2">
              For stays less than 28 days
            </h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>Full refund up to 14 days before check-in</li>
              <li>No refund for bookings less than 14 days before check-in</li>
            </ul>
          </div>
          <div className="bg-white rounded-lg p-3">
            <h4 className="font-medium text-gray-900 mb-2">
              For stays of 28 days or more
            </h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>Full refund up to 30 days before check-in</li>
              <li>No refund for bookings less than 30 days before check-in</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
