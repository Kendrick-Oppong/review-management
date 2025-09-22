import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@radix-ui/react-popover";
import {
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  Select,
} from "@/components/ui/select";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";

import { CalendarIcon, Users, Badge, Ticket } from "lucide-react";
import { Label } from "recharts";
import { Card, CardHeader, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import { DateRange } from "react-day-picker";

export const BookingCard = () => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date("2025-6-14"),
    to: new Date("2025-12-10"),
  });
  const [guests, setGuests] = useState(4);
  const [couponCode, setCouponCode] = useState("");

  // nights and pricing
  const calculateNights = () => {
    if (dateRange?.from && dateRange?.to) {
      const timeDiff = dateRange.to.getTime() - dateRange.from.getTime();
      return Math.ceil(timeDiff / (1000 * 3600 * 24));
    }
    return 57;
  };

  const nights = calculateNights();
  const pricePerNight = 131.35; // £7,487 / 57 nights
  const totalPrice = pricePerNight * nights;
  const discount = Math.floor(totalPrice * 0.2);
  const cleaningFee = 87;
  const finalTotal = totalPrice - discount + cleaningFee;

  const formatDate = (date?: Date) => {
    if (!date) return "";
    return date.toLocaleDateString("en-GB", {
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="lg:col-span-1">
      <div className="sticky top-24">
        <Card className="shadow-lg border pt-0 border-gray-200">
          <CardHeader className="bg-[#284E4C] text-white py-5 rounded-t-xl">
            <h3 className="text-xl font-bold">Book Your Stay</h3>
            <p className="text-teal-100 text-sm">Select dates to see prices</p>
          </CardHeader>

          <CardContent className="p-6 space-y-4">
            {/* Date Range Selection */}
            <div className="flex w-full gap-2 items-center">
              <div className="relative">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal h-12 bg-gray-50"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4 text-gray-500" />
                      {dateRange?.from && dateRange?.to ? (
                        <span className="text-gray-900">
                          {formatDate(dateRange.from)} -{" "}
                          {formatDate(dateRange.to)}
                        </span>
                      ) : (
                        <span className="text-gray-500">Select dates</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarComponent
                      mode="range"
                      defaultMonth={dateRange?.from}
                      selected={dateRange}
                      onSelect={setDateRange}
                      numberOfMonths={2}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Guest Selection */}
              <div className="bg-gray-50 w-full p-3 rounded-lg">
                <Select
                  value={guests.toString()}
                  onValueChange={(value) => setGuests(parseInt(value))}
                >
                  <SelectTrigger className="w-full border-none bg-transparent h-6">
                    <Users className="w-4 h-4 text-gray-500" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="3">3</SelectItem>
                    <SelectItem value="4">4</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Booking Summary */}
            <div className="space-y-3 pt-2">
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <Label className="text-gray-600">Check-in</Label>
                  <p className="font-semibold">{formatDate(dateRange?.from)}</p>
                </div>
                <div>
                  <Label className="text-gray-600">Check-out</Label>
                  <p className="font-semibold">{formatDate(dateRange?.to)}</p>
                </div>
                <div>
                  <Label className="text-gray-600">Guests</Label>
                  <p className="font-semibold">{guests} guests</p>
                </div>
              </div>

              {/* Pricing Breakdown */}
              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Price per night ({nights} nights)</span>
                  <span>£{totalPrice.toLocaleString()}</span>
                </div>

                <div className="flex justify-between text-sm bg-green-100 rounded-sm p-2">
                  <div className="flex items-center space-x-1">
                    20% length of stay discount
                  </div>
                  <span>-£{discount.toLocaleString()}</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span>Cleaning fee</span>
                  <span>£{cleaningFee}</span>
                </div>
              </div>

              {/* Coupon Code */}
              <div className="border-t pt-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Ticket className="w-4 h-4 text-gray-500" />
                  <p className="text-sm text-gray-600">Have a coupon?</p>
                </div>
                <div className="flex space-x-2">
                  <Input
                    placeholder="Enter code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-1"
                  />
                  <Button variant="outline" size="sm">
                    Apply
                  </Button>
                </div>
              </div>

              {/* Total */}
              <div className="border-t pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">total</span>
                  <div className="text-right">
                    <div className="text-2xl font-bold">
                      £{finalTotal.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">
                      You saved £{discount.toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-4">
                <Button className="w-full bg-[#284E4C] hover:bg-teal-800 h-12 text-white">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  Book Now
                </Button>

                <Button variant="outline" className="w-full h-12">
                  💬 Send Inquiry
                </Button>

                <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                  <span>Instant booking confirmation</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
