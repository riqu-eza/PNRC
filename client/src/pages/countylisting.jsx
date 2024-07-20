// ListingsByCounty.js

import { useEffect, useState } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Countylisting = ({ countyBackgrounds }) => {
  const { county } = useParams();
  const [ListingsByCounty, setListingsByCounty] = useState([]);
  const [selectedCounty, setSelectedCounty] = useState([]);
  const [ListingsByCategory, setListingsByCategory] = useState({});
  const [searchTerm] = useState("");
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
    <div className="h-screen">
      <div
        className="flex flex-col gap-6 sm:gap-12 md:gap-24 bg-cover bg-center h-96 items-center text-center justify-between"
        style={{ backgroundImage: `url(${backgroundUrl})` }}
      >
        <h1 className="text-2xl sm:text-3xl md:text-4xl text-white font-bold px-4">
          Welcome To The Magic of {selectedCounty}
        </h1>
        <div className="flex flex-wrap justify-center gap-2 md:gap-4">
          {categories.map((category, index) => (
            <div key={index} className="flex">
              <Link
                to={`/listings/${county}/${category.name}`}
                className="categoryname category-link bg-black text-white px-4 py-2 rounded hover:bg-gray-400 text-sm sm:text-base md:text-lg"
              >
                {category.name}
              </Link>
            </div>
          ))}
          <button
            className="bg-black text-white px-4 py-2 text-sm sm:text-base md:text-lg rounded hover:bg-gray-400"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>

      <div className="p-4 md:p-6 lg:px-12  bg-black flex items-center justify-center">
        <p className="text-white text-base md:text-lg lg:text-2xl text-center mx-4 md:mx-12 lg:mx-20">
          {cityInfo}
        </p>
      </div>
    </div>
  );
};

export default Countylisting;
