import { amenities } from "@/lib/constants";

export const Amenities = () => {
  return (
    <div className="mb-8 bg-white p-4 rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-900">Amenities</h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {amenities.map((amenity) => (
          <div key={amenity.label} className="flex items-center space-x-3 py-2">
            <amenity.icon className="w-5 h-5 text-gray-600" />
            <span className="text-gray-700">{amenity.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
