// ListingsByCounty.js

import react, { useEffect, useState } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Countylisting = ({ countyBackgrounds }) => {
  const { county, cityinfo } = useParams();
  const [listingsByCounty, setListingsByCounty] = useState([]);
  const [selectedCounty, setSelectedCounty] = useState([]);
  const [listingsByCategory, setListingsByCategory] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  // const countyInfo = queryParams.get("countyInfo");

  const navigate = useNavigate();
  const location = useLocation();
  console.log("Location object:", location);

  const queryParams = new URLSearchParams(location.search);
  const backgroundUrl = queryParams.get("backgroundUrl");
  const cityInfo = queryParams.get("countyInfo");

  console.log("Background URL from URL parameters:", backgroundUrl);
  console.log("Background URL from URL parameters:", cityInfo);

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

  console.log("Selected county:", selectedCounty);
  const categories = [
    { name: "Accommodation" },
    { name: "Dining" },
    { name: "Entertainment" },
    { name: "Shopping" },
    { name: "Education" },
    { name: "Fitness" },
    { name: "Services" },
    { name: "Relaxation" },
  ];

  return (
    <div className="">
      <div
    
        className="flex flex-col  gap-24 bg-cover bg-center h-96 items-center  text-center justify-between "
        style={{ backgroundImage: `url(${backgroundUrl})` }}
      >
        <h1 className="text-4xl font-bold cityhead">
          Welcome To The Magic of {selectedCounty}
        </h1>
        <div className="flex ">
          {categories.map((category, index) => (
            <div key={index} className="flex mr-4">
              <Link
                to={`/listings/${county}/${category.name}`}
                className=" categoryname category-link bg-black text-white px-4 py-2 rounded mr-2 mb-2 hover:bg-gray-400"
              >
                {category.name}
              </Link>
            </div>
          ))}
          <button
            className="bg-black text-white px-2 text-bolder rounded  hover:bg-gray-400"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>

      <div className=" p-6 bg-black flex  items-center justify-center">
        <p className="text-white  text-center justify-center   items-center  ">
          {cityInfo}
        </p>
      </div>
    </div>
  );
};

export default Countylisting;
