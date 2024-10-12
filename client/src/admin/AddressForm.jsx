/* eslint-disable react/prop-types */
import { useEffect, useState, useRef } from "react";

const AddressForm = ({ address, setAddress }) => {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);
  const mapRef = useRef(null); // Reference to map element
  const markerRef = useRef(null); // Reference to marker

  // Function to handle input changes (street, city)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({
      ...prev,
      address: {
        ...prev.address,
        [name]: value, // Update street, city, etc.
      },
    }));
  };

  // Function to handle lat/lng and address changes
  const handleLocationChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({
      ...prev,
      address: {
        ...prev.address,
        location: {
          ...prev.address.location,
          [name]: value, // Update latitude, longitude, and location address
        },
      },
    }));
  };

  // Fetch cities on component mount
  useEffect(() => {
    fetchCities();
    initMap(); // Initialize Google Map
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchCities = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3000/api/admin/cities");
      if (!response.ok) {
        throw new Error("Failed to fetch cities");
      }
      const data = await response.json();
      setCities(data); // Ensure data is an array of cities
    } catch (error) {
      console.error("Error fetching cities:", error);
    } finally {
      setLoading(false);
    }
  };

  // Initialize Google Map
  const initMap = () => {
    const initialPosition = { lat: -1.286389, lng: 36.817223 }; // Default to Nairobi

    const map = new window.google.maps.Map(mapRef.current, {
      center: initialPosition,
      zoom: 12,
    });

    const marker = new window.google.maps.Marker({
      position: initialPosition,
      map: map,
      draggable: true, // Allow dragging the marker
    });

    markerRef.current = marker;

    // Update form when marker is dragged
    marker.addListener("dragend", () => {
      const newLat = marker.getPosition().lat();
      const newLng = marker.getPosition().lng();
      setAddress((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          location: {
            lat: newLat,
            lng: newLng,
            address: "", // Clear until reverse geocoding gets address
          },
        },
      }));
      reverseGeocode(newLat, newLng); // Fetch address from lat/lng
    });
  };

  // Reverse Geocode to get address from lat/lng
  const reverseGeocode = (lat, lng) => {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: { lat, lng } }, (results, status) => {
      if (status === "OK") {
        if (results[0]) {
          const formattedAddress = results[0].formatted_address;
          setAddress((prev) => ({
            ...prev,
            address: {
              ...prev.address,
              location: {
                ...prev.address.location,
                address: formattedAddress,
              },
            },
          }));
        }
      } else {
        console.error("Geocode failed: " + status);
      }
    });
  };

  return (
    <div className="mb-6 p-4 bg-gray-100 rounded-lg">
      <h3 className="text-xl font-semibold mb-4">Address</h3>

      <input
        type="text"
        name="street"
        placeholder="Street"
        value={address.street || ""}
        onChange={handleChange}
        required
        className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <select
        name="city"
        value={address.city || ""}
        onChange={handleChange}
        required
        className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="" disabled>
          {loading ? "Loading cities..." : "Select a city"}
        </option>
        {cities.length > 0 ? (
          cities.map((city) => (
            <option key={city._id} value={city.newcity}>
              {city.newcity}
            </option>
          ))
        ) : (
          <option value="" disabled>
            No cities available
          </option>
        )}
      </select>

      <input
        type="text"
        name="address"
        placeholder="Location Address"
        value={address.location?.address || ""}
        onChange={handleLocationChange}
        required
        className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        type="number"
        name="lat"
        placeholder="Latitude"
        value={address.location?.lat || ""}
        onChange={handleLocationChange}
        required
        className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        type="number"
        name="lng"
        placeholder="Longitude"
        value={address.location?.lng || ""}
        onChange={handleLocationChange}
        required
        className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Google Map */}
      <div
        ref={mapRef}
        style={{ height: "300px", width: "100%", marginTop: "20px" }}
        className="border border-gray-300 rounded"
      ></div>
    </div>
  );
};

export default AddressForm;
