// ListingsByCounty.js

import { set } from "mongoose";
import React, { useEffect, useState } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import {
  faUtensils,
  faBed,
  faTheaterMasks,
  faShoppingBag,
  faUniversity,
  faDumbbell,
  faHandsHelping,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ListingItem from "../components/ListingItem";

const Countylisting = ({ countyBackgrounds }) => {
  const { county, category } = useParams();
  const [listingsByCounty, setListingsByCounty] = useState([]);
  const [selectedCounty, setSelectedCounty] = useState([]);
  const [listingsByCategory, setListingsByCategory] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  console.log("Location object:", location);

  const queryParams = new URLSearchParams(location.search);
  const backgroundUrl = queryParams.get("backgroundUrl");
  console.log("Background URL from URL parameters:", backgroundUrl);


  const handleSearch = () => {
    navigate(`/search?searchTerm=${searchTerm}`);
  };
  // console.log("url received:" backgroundUrl)
  console.log("Background URL:", backgroundUrl);

  useEffect(() => {
    const fetchListingsByCounty = async (county) => {
      try {
        console.log("Fetching listings for county:", county);

        const res = await fetch(
          `http://localhost:3000/api/listing/get-by-county?selectedCounty=${county}`
        );
        const data = await res.json();
        console.log("Fetched data:", data);
        setListingsByCounty(data);
        setSelectedCounty(county);

        const groupedByCategory = {};

        data.forEach((listing) => {
          const category = listing.selectedCategory;
          if (!groupedByCategory[category]) {
            groupedByCategory[category] = [];
          }
          groupedByCategory[category].push(listing);
        });

        setListingsByCategory(groupedByCategory);
      } catch (error) {
        console.error(error);
      }
    };

    fetchListingsByCounty(county);
  }, [county]);

  const handleMapClick = (location) => {
    const [latitude, longitude] = location.split(",");

    const url = `https://www.google.com/maps?q=${latitude},${longitude}`;

    window.open(url, "_blank");
  };
  console.log("Selected county:", selectedCounty);
  const categories = [
    { name: "Accommodation" },
    { name: "Dining" },
    { name: "Entertainment" },
    { name: "Shopping" },
    { name: "Education" },
    { name: "Fitness" },
    { name: "Services" },
  ];

  return (
    <>
      <div
        className="bg-cover bg-center h-96 flex items-center justify-center"
        style={{ backgroundImage: `url(${backgroundUrl})` }}
      >
        <div className="w-full max-w-4xl">
          <div className="flex flex-col md:flex-row items-center justify-center md:justify-between">
            <h1 className="text-3xl font-bold text-skyblue text-center md:text-left mb-4 md:mb-0 cityhead">
              Welcome To The Magic of {selectedCounty}
            </h1>

            <button
              className="bg-blue-400 text-white px-4 py-2 rounded hover:bg-blue-700"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>

          <div className="flex flex-wrap justify-center mt-4">
            {categories.map((category, index) => (
              <div key={index} className="flex mb-4 mr-4">
                <Link
                  to={`/listings/${county}/${category.name}`}
                  className=" categoryname category-link flex items-center justify-center bg-blue-700 text-white px-4 py-2 rounded mr-2 mb-2 hover:bg-blue-400"
                >
                  <FontAwesomeIcon icon={faBed} className="mr-1" />
                  {category.name}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <h2 className="text-xl font-bold mb-4 cityhead">Let's dine....!</h2>
            {(listingsByCategory["Dining"] || [])
              .concat(listingsByCategory["Accommodation"] || [])
              .map((listing) => (
                <ListingItem key={listing._id} listing={listing} />
              ))}
          </div>
          <div>
            <h2 className="text-xl font-bold mb-4 cityhead">
              Find things you can do in {selectedCounty}
            </h2>
            {Object.entries(listingsByCategory).map(([category, listings]) => {
              if (
                category !== "Dining" &&
                category !== "Accommodation" &&
                category !== "Entertainment" &&
                category !== "Relaxation"
              ) {
                return (
                  <div key={category}>
                    {listings.map((listing) => (
                      <ListingItem key={listing._id} listing={listing} />
                    ))}
                  </div>
                );
              }
              return null;
            })}
          </div>
          <div>
            <h2 className="text-xl font-bold mb-4 cityhead ">
              Take Your Day Off
            </h2>
            {(listingsByCategory["Entertainment"] || [])
              .concat(listingsByCategory["Relaxation"] || [])
              .map((listing) => (
                <ListingItem key={listing._id} listing={listing} />
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Countylisting;
