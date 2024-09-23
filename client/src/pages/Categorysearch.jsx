/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef } from "react";
import ListingItem from "../components/ListingItem";
import { useParams } from "react-router-dom";
import MapComponent from "../utility/MapComponet";

const CategorySearch = () => {
  const { county, categoryname } = useParams();

  const [listings, setListings] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [selectedSortOption, setSelectedSortOption] = useState("price");
  const [selectedRoomType, setSelectedRoomType] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPrice, setSelectedPrice] = useState(null); // Track the selected price
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000); // Default range values
  const scrollContainerRef = useRef(null);

  // Extract all unique room types and prices
  const extractRoomTypesAndPrices = (listings) => {
    const roomDetails = listings.flatMap((listing) => {
      return listing.details.accommodation.rooms.map((room) => ({
        roomType: room.type,
        price: Number(room.price), // Ensure it's a number
      }));
    });

    // Get unique room types
    const uniqueRoomTypes = [
      ...new Set(roomDetails.map((room) => room.roomType)),
    ];

    // Get min and max prices
    const prices = roomDetails.map((room) => room.price);
    const min = Math.min(...prices);
    const max = Math.max(...prices);

    // Return unique room types and the room details for further processing
    return { roomTypes: uniqueRoomTypes, roomDetails, minPrice: min, maxPrice: max };
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `http://localhost:3000/api/listing/${county}/${categoryname}`
        );
        if (response.ok) {
          const data = await response.json();
          setListings(data);
          console.log(data);

          // Extract unique subcategories and their counts
          const subcategoryCounts = data.reduce((acc, listing) => {
            const subcat = listing.subcategory;
            if (!acc[subcat]) acc[subcat] = 0;
            acc[subcat] += 1;
            return acc;
          }, {});

          setSubcategories(
            Object.entries(subcategoryCounts).map(([subcat, count]) => ({
              subcategory: subcat,
              count,
            }))
          );

          // Extract room types and price range
          const { roomTypes, minPrice, maxPrice } = extractRoomTypesAndPrices(data);
          setMinPrice(minPrice);
          setMaxPrice(maxPrice);
          setSelectedPrice(maxPrice); // Set the initial selected price to max price
        } else {
          console.error("Failed to fetch data:", response.statusText);
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [county, categoryname]);

  const handleSubcategoryClick = (subcategory) => {
    setSelectedSubcategory(subcategory);
  };

  const handleRoomTypeChange = (e) => {
    setSelectedRoomType(e.target.value);
  };

  const handlePriceChange = (e) => {
    setSelectedPrice(Number(e.target.value));
  };

  // Get the room types and details
  const { roomTypes } = extractRoomTypesAndPrices(listings);

  // Filter and sort listings based on selected subcategory, room type, and price
  const filteredListings = listings
    .filter((listing) => {
      if (!selectedSubcategory) return true;
      return listing.subcategory === selectedSubcategory;
    })
    .filter((listing) => {
      if (!selectedRoomType) return true;
      return listing.details.accommodation.rooms.some(
        (room) => room.type === selectedRoomType
      );
    })
    .filter((listing) => {
      return listing.details.accommodation.rooms.some(
        (room) => room.price <= selectedPrice
      );
    })
    .sort((a, b) => {
      if (selectedSortOption === "price") {
        return (
          a.details.accommodation.rooms[0].price -
          b.details.accommodation.rooms[0].price
        );
      } else if (selectedSortOption === "reviews") {
        return b.reviews - a.reviews; // Assuming 'reviews' is part of the listing data
      }
      return 0;
    });

  return (
    <>
      <MapComponent  />
      <div className="flex">
        {/* Left Section: Subcategories and Sort Options */}
        <div className="w-1/4 p-4 bg-gray-100 overflow-y-auto">
          <h3 className="text-lg font-semibold mb-2 text-center">
            Most Popular
          </h3>
          <ul>
            <li
              className={`flex items-center justify-between p-2 cursor-pointer hover:bg-gray-200 ${
                !selectedSubcategory ? "bg-gray-200" : ""
              }`}
              onClick={() => setSelectedSubcategory(null)}
            >
              <span>All {categoryname} available</span>
            </li>
            {subcategories.map(({ subcategory, count }) => (
              <li
                key={subcategory}
                className={`flex items-center justify-between p-2 cursor-pointer hover:bg-gray-200 ${
                  selectedSubcategory === subcategory ? "bg-gray-200" : ""
                }`}
                onClick={() => handleSubcategoryClick(subcategory)}
              >
                <span>{subcategory}</span>
                <span className="text-gray-500">({count})</span>
              </li>
            ))}
          </ul>

          {/* Room Types Dropdown */}
          <h3 className="text-lg font-semibold mt-4">Room Types</h3>
          <select
            className="p-2 mt-2 bg-white border rounded"
            value={selectedRoomType || ""}
            onChange={handleRoomTypeChange}
          >
            <option value="">All Room Types</option>
            {roomTypes.map((roomType) => (
              <option key={roomType} value={roomType}>
                {roomType}
              </option>
            ))}
          </select>

          {/* Price Range Slider */}
          <h3 className="text-lg font-semibold mt-4">Price Range(from)</h3>
          <input
            type="range"
            min={minPrice}
            max={maxPrice}
            value={selectedPrice || maxPrice}
            onChange={handlePriceChange}
            className="w-full"
          />
          <div className="flex justify-between mt-2">
            <span>${minPrice}</span>
            <span>${selectedPrice}</span>
            <span>${maxPrice}</span>
          </div>
        </div>

        {/* Right Section: Listings */}
        <div className="w-3/4 p-4">
          <h2 className="text-xl font-semibold mb-4 text-center">
            {selectedSubcategory || "All "}
          </h2>

          {isLoading ? (
            <div className="flex items-center justify-center h-screen w-screen">
              <l-jelly-triangle
                size="30"
                speed="1.75"
                color="black"
              ></l-jelly-triangle>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2  justify-evenly ">
              {filteredListings.map((listing) => (
                <ListingItem key={listing._id} listing={listing} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CategorySearch;
