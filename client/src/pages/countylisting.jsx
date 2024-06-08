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
    { name: "Relaxation"}
  ];

  return (
    <>
      <div
        className="flex flex-col  gap-24 bg-cover bg-center h-96  items-center  text-center justify-between py-3"
        style={{ backgroundImage: `url(${backgroundUrl})` }}
      >
        <h1 className="text-4xl font-bold cityhead">
          Welcome To The Magic of {selectedCounty}
        </h1>
        <div className="flex ">
          {categories.map((category, index) => (
            <div key={index} className="flex mb-4 mr-4">
              <Link
                to={`/listings/${county}/${category.name}`}
                className=" categoryname category-link bg-blue-700 text-white px-4 py-2 rounded mr-2 mb-2 hover:bg-blue-400"
              >
                {category.name}
              </Link>
            </div>
          ))}
          <button
            className="bg-blue-400 text-white px-2 rounded hover:bg-blue-700"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>

      </div>

      <div className="h-44 bg-black flex  items-center justify-center" >
        <p className="text-white w-1/2 text-center justify-center items-center  ">
          {cityInfo}
        </p>
      </div>
      {/* <div className="container mx-auto px-4">
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
      </div> */}
    </>
  );
};

export default Countylisting;
