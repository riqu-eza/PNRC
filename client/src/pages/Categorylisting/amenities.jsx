/* eslint-disable react/prop-types */
import { FaWifi, FaParking, FaSwimmer, FaUtensils, FaTv } from "react-icons/fa";

// Define the amenities and their corresponding icons
const amenitiesIconMap = {
  wifi: <FaWifi className="text-blue-500" />,
  parking: <FaParking className="text-yellow-500" />,
  pool: <FaSwimmer className="text-blue-700" />,
  restaurant: <FaUtensils className="text-green-500" />,
  tv: <FaTv className="text-gray-500" />,
  // Add more amenities and icons as needed
};

const Amenities = ({ amenities }) => {
  let amenitiesArray = [];

  // Check if amenities is a string or an array
  if (typeof amenities === 'string') {
    amenitiesArray = amenities.split(',').map(item => item.trim().toLowerCase());
  } else if (Array.isArray(amenities)) {
    amenitiesArray = amenities.map(item => item.trim().toLowerCase());
  }

  return (
    <div className="mt-4 p-1">
      <h3 className="text-lg text-center font-semibold mb-2">Amenities</h3>
      <ul className="flex flex-wrap gap-4">
        {amenitiesArray.map((amenity, index) => (
          <li key={index} className="flex items-center gap-2">
            {amenitiesIconMap[amenity] || (
              <span className="text-gray-500">•</span>  // Default if no icon is found
            )}
            <span className="capitalize">{amenity}</span>  {/* Display the amenity name */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Amenities;
