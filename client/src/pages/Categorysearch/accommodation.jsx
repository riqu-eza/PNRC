/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import GoogleMapReact from "google-map-react";
import ListingItem from "../../components/ListingItem";
import { Link, useParams } from "react-router-dom";

const AccommodationSearch = ({ listings }) => {
  const { county, categoryname } = useParams();
  const [filteredListings, setFilteredListings] = useState(listings);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedRoomType, setSelectedRoomType] = useState(null);
  console.log("The accomodationlisting", listings);
  const getUniqueSubcategoryCount = (subcategory) => {
    const uniqueListings = listings.filter((listing) =>
      listing.category.some((cat) =>
        cat.subcategories.some((subcat) => subcat.subcategory === subcategory)
      )
    );
    return uniqueListings.length;
  };

  const applyFilters = () => {
    let newFilteredListings = listings;

    if (selectedSubcategory) {
      newFilteredListings = newFilteredListings.filter((listing) =>
        listing.category.some((cat) =>
          cat.subcategories.some(
            (subcat) => subcat.subcategory === selectedSubcategory
          )
        )
      );
    }

    newFilteredListings = newFilteredListings.filter((listing) =>
      listing.category.some((cat) =>
        cat.subcategories.some((subcat) =>
          subcat.rooms.some(
            (room) =>
              room.pricePerNight >= priceRange[0] &&
              room.pricePerNight <= priceRange[1]
          )
        )
      )
    );

    if (selectedRoomType) {
      newFilteredListings = newFilteredListings.filter((listing) =>
        listing.category.some((cat) =>
          cat.subcategories.some((subcat) =>
            subcat.rooms.some((room) => room.roomType === selectedRoomType)
          )
        )
      );
    }

    setFilteredListings(newFilteredListings);
  };

  const handleMapChange = ({ center, zoom }) => {
    // Implement map-based filtering logic
  };

  return (
    <div className="flex mx-28  mt-2 bg-gray-100 border  h-screen">
      {/* Left Filter Section */}
      <div className="w-[30%] p-3 space-y-6  m-1 max-h-[] overflow-y-scroll  overflow-x-hidden">
        {/* Google Map */}
        <div className="h-72 mb-4  shadow-lg">
          <GoogleMapReact
            defaultCenter={{ lat: 0, lng: 0 }}
            defaultZoom={10}
            onChange={handleMapChange}
          >
            {filteredListings.map((listing) => (
              <Marker
                key={listing._id}
                lat={listing.address.location.lat}
                lng={listing.address.location.lng}
                text={listing.name}
              />
            ))}
          </GoogleMapReact>
        </div>

        {/* Subcategory Filter */}
        <div className=" p-1 ">
          <h4 className="font-bold  p-1 text-center text-2xl m-2">Popular </h4>
          <button
            className={`block w-[300px] text-xl  m-1  p-2 rounded-md cursor-pointer 
          ${!selectedSubcategory ? "bg-blue-500 text-white" : "bg-gray-100 hover:bg-gray-200"}
        `}
            onClick={() => {
              setSelectedSubcategory(null);
              applyFilters();
            }}
          >
            All
          </button>
          <div className="space-y-2  p-1  overflow-y-auto max-h-40">
            {listings
              .flatMap((listing) => listing.category)
              .flatMap((cat) => cat.subcategories)
              .filter(
                (subcat, index, self) =>
                  index ===
                  self.findIndex((s) => s.subcategory === subcat.subcategory)
              )
              .map((subcat) => (
                <button
                  key={subcat.subcategory}
                  className={`block w-full text-left px-4 py-2  rounded-md cursor-pointer 
                ${selectedSubcategory === subcat.subcategory ? "bg-blue-500 text-white" : "bg-gray-100 hover:bg-gray-200"}
              `}
                  onClick={() => {
                    setSelectedSubcategory(subcat.subcategory);
                    applyFilters();
                  }}
                >
                  {subcat.subcategory} (
                  {getUniqueSubcategoryCount(subcat.subcategory)})
                </button>
              ))}
          </div>
        </div>

        {/* Price Range Filter */}
        <div className=" p-1 ">
          <h4 className="font-bold  text-center text-lg mb-2">Price Range</h4>
          <button
            className="block w-full  px-4 py-2 rounded-md  cursor-pointer bg-gray-100 hover:bg-gray-200"
            onClick={() => {
              setPriceRange([0, 10000]);
              applyFilters();
            }}
          >
            All
          </button>
          <input
            type="range"
            min="0"
            max="10000"
            value={priceRange[1]}
            className="w-full  "
            onChange={(e) => {
              setPriceRange([0, e.target.value]);
              applyFilters();
            }}
          />
          <span className="block mt-2">Up to ${priceRange[1]}</span>
        </div>

        {/* Room Type Filter */}
        <div className=" p-1 ">
          <h4 className="font-boldtext-center  text-lg mb-2">Room Type</h4>
          <button
            className={`block w-full text-left px-4  py-2 rounded-md  cursor-pointer 
          ${!selectedRoomType ? "bg-blue-500 text-white" : "bg-gray-100 hover:bg-gray-200"}
        `}
            onClick={() => {
              setSelectedRoomType(null);
              applyFilters();
            }}
          >
            All
          </button>
          <div className="space-y-2  p-1  overflow-y-auto max-h-40">
            {listings
              .flatMap((listing) => listing.category)
              .flatMap((cat) => cat.subcategories)
              .flatMap((subcat) => subcat.rooms)
              .filter(
                (room, index, self) =>
                  index === self.findIndex((r) => r.roomType === room.roomType)
              )
              .map((room) => (
                <button
                  key={room.roomType}
                  className={`block w-full text-left px-4 py-2 rounded-md border cursor-pointer 
                ${selectedRoomType === room.roomType ? "bg-blue-500 text-white" : "bg-gray-100 hover:bg-gray-200"}
              `}
                  onClick={() => {
                    setSelectedRoomType(room.roomType);
                    applyFilters();
                  }}
                >
                  {room.roomType}
                </button>
              ))}
          </div>
        </div>
      </div>

      {/* Right Listings Section */}
      <div className="w-[] p-2  space-y-4 m-1 ">
        <div className="">
          <h2>
            {categoryname} in {county}{" "}
          </h2>
        </div>
        <div className="">
          <div className="grid grid-cols-3 gap-2">
            {filteredListings.map((listing) => {
              console.log("Sending listing:", listing); // Log the listing data
              return (
                <Link
                  to={`/${county}/${categoryname}/${listing._id}`} // Dynamic path based on category
                  state={{ listing }} // Pass listing data via state
                  key={listing._id}
                >
                  <ListingItem listing={listing} />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

const Marker = ({ text }) => <div>{text}</div>;

export default AccommodationSearch;
