/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import GoogleMapReact from "google-map-react";

import ListingItem from "../../components/ListingItem";

const Diningsearch = ({ listings }) => {
  const { county, categoryname } = useParams();

  const [uniqueSubcategories, setUniqueSubcategories] = useState([]);
  const [filteredListings, setFilteredListings] = useState(listings);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);

  // Extract unique subcategories and their counts
  useEffect(() => {
    const subcategoryCounts = {};
    listings.forEach((listing) => {
      listing.category.forEach((cat) => {
        cat.subcategories.forEach((subcat) => {
          subcategoryCounts[subcat.subcategory] =
            (subcategoryCounts[subcat.subcategory] || 0) + 1;
        });
      });
    });

    setUniqueSubcategories(Object.entries(subcategoryCounts));
    setFilteredListings(listings); // Initialize with all listings
  }, [listings]);

  // Handle subcategory click and filter listings
  const handleSubcategoryClick = (subcategory) => {
    setSelectedSubcategory(subcategory);

    if (subcategory === "All") {
      // Reset to show all listings when "All" is clicked
      setFilteredListings(listings);
    } else {
      const filtered = listings.filter((listing) =>
        listing.category.some((cat) =>
          cat.subcategories.some((subcat) => subcat.subcategory === subcategory)
        )
      );

      setFilteredListings(filtered); // Update the listings based on subcategory
    }
  };

  // Map change handler (you can implement map-based filtering here)
  const handleMapChange = ({ center, zoom }) => {
    // Implement map-based filtering logic if needed
  };

  return (
    <div
      style={{ display: "flex" }}
      className="border mx-28 mt-2 p-2 gap-2 h-screen bg-gray-100 "
    >
      {/* Filters Section */}
      <div className=" w-[40%] p-2 overflow-y-scroll ">
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
        <div className=" p-2">
          <h4 className="font-bold p-1 text-center text-2xl m-2">Popular </h4>
          <div
            onClick={() => handleSubcategoryClick("All")}
            style={{ cursor: "pointer" }}
            className={` p-2 ${
              selectedSubcategory === "All" ? "bg-blue-200" : ""
            }`}
          >
            All
          </div>
          {uniqueSubcategories.map(([subcategory, count]) => (
            <div
              key={subcategory}
              onClick={() => handleSubcategoryClick(subcategory)}
              style={{ cursor: "pointer" }}
              className={` p-2 ${
                selectedSubcategory === subcategory ? "bg-blue-200" : ""
              }`}
            >
              {subcategory} ({count})
            </div>
          ))}
        </div>
      </div>

      {/* Listings Section */}
      <div className="w-full p-2 space-y-4 m-1">
        <div>
          <h2>
            {categoryname} in {county}
          </h2>
        </div>
        <div>
          <div className="grid grid-cols-3 gap-2">
            {filteredListings.map((listings) => {
              return (
                <Link
                  to={`/${county}/${categoryname}/${listings._id}`} // Dynamic path based on category
                  state={{ listings }} // Pass listing data via state
                  key={listings._id}
                >
                  <ListingItem listing={listings} />
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

export default Diningsearch;
