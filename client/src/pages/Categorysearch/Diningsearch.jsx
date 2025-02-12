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
  const [selectedSubcategory, setSelectedSubcategory] = useState("");

  // Extract unique subcategories and their counts.
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

  // Handle subcategory click and filter listings.
  const handleSubcategoryClick = (subcategory) => {
    setSelectedSubcategory(subcategory);

    if (subcategory === "All") {
      // Reset to show all listings when "All" is clicked.
      setFilteredListings(listings);
    } else {
      const filtered = listings.filter((listing) =>
        listing.category.some((cat) =>
          cat.subcategories.some((subcat) => subcat.subcategory === subcategory)
        )
      );
      setFilteredListings(filtered);
    }
  };

  // Map change handler (map-based filtering logic can be added here if needed)
  const handleMapChange = ({ center, zoom }) => {
    // Implement map-based filtering logic if needed
  };

  return (
    <div className="flex flex-col md:flex-row mt-5">
      {/* Filter Sidebar */}
      <aside className="md:w-1/4 p-4 border-b md:border-b-0 md:border-r bg-gray-100">
        {/* Google Map */}
        <div className="mb-4 h-72 shadow-lg">
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
        <div>
          <h4 className="font-bold text-center text-2xl mb-4">Popular</h4>
          <div
            onClick={() => handleSubcategoryClick("All")}
            className={`cursor-pointer p-2 ${
              selectedSubcategory === "All" ? "bg-blue-200" : ""
            }`}
          >
            All
          </div>
          {uniqueSubcategories.map(([subcategory, count]) => (
            <div
              key={subcategory}
              onClick={() => handleSubcategoryClick(subcategory)}
              className={`cursor-pointer p-2 ${
                selectedSubcategory === subcategory ? "bg-blue-200" : ""
              }`}
            >
              {subcategory} ({count})
            </div>
          ))}
        </div>
      </aside>

      {/* Listings Section */}
      <main className="md:w-3/4 p-4">
        <div className="mb-4">
          <h2 className="text-2xl font-semibold">
            {categoryname} in {county}
          </h2>
        </div>
        {filteredListings.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
            {filteredListings.map((listing) => (
              <Link
                key={listing._id}
                to={`/${county}/${categoryname}/${listing._id}`}
                state={{ listing }}
              >
                <ListingItem listing={listing} />
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-xl">No listings found matching your filters.</p>
        )}
      </main>
    </div>
  );
};

const Marker = ({ text }) => <div>{text}</div>;

export default Diningsearch;
