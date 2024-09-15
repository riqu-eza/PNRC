import { useState, useEffect, useRef } from "react";
import ListingItem from "../components/ListingItem";
import { useParams } from "react-router-dom";

const CategorySearch = () => {
  const { county, categoryname } = useParams();

  const [listings, setListings] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [selectedSortOption, setSelectedSortOption] = useState("price"); // Default sort by price
  const [isLoading, setIsLoading] = useState(true);
  const scrollContainerRef = useRef(null);

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

  const handleSortOptionChange = (e) => {
    setSelectedSortOption(e.target.value);
  };

  const scrollLeft = () => {
    scrollContainerRef.current.scrollBy({
      left: -400,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    scrollContainerRef.current.scrollBy({
      left: 400,
      behavior: "smooth",
    });
  };

  // Filter and sort listings based on selected subcategory and sort option
  const filteredListings = listings
    .filter((listing) => {
      if (!selectedSubcategory) return true;
      return listing.subcategory === selectedSubcategory;
    })
    .sort((a, b) => {
      if (selectedSortOption === "price") {
        return a.details.accommodation.rooms[0].price - b.details.accommodation.rooms[0].price;
      } else if (selectedSortOption === "reviews") {
        return b.reviews - a.reviews; // Assuming 'reviews' is part of the listing data
      }
      return 0;
    });

  return (
    <div className="flex">
      {/* Left Section: Subcategories and Sort Options */}
      <div className="w-1/4 p-4 bg-gray-100 overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">Filters</h2>

        <h3 className="text-lg font-semibold mb-2">Subcategories</h3>
        <ul>
          <li
            className={`flex items-center justify-between p-2 cursor-pointer hover:bg-gray-200 ${
              !selectedSubcategory ? "bg-gray-200" : ""
            }`}
            onClick={() => setSelectedSubcategory(null)}
          >
            <span>All Subcategories</span>
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

        {/* Sort Options */}
        <h3 className="text-lg font-semibold mt-4">Sort by</h3>
        <select
          className="p-2 mt-2 bg-white border rounded"
          value={selectedSortOption}
          onChange={handleSortOptionChange}
        >
          <option value="price">Price (Low to High)</option>
          <option value="reviews">Reviews (High to Low)</option>
        </select>
      </div>

      {/* Right Section: Listings */}
      <div className="w-3/4 p-4">
        <h2 className="text-xl font-semibold mb-4">
          Listings in {selectedSubcategory || "All Subcategories"}
        </h2>

        {isLoading ? (
          <div className="flex items-center justify-center h-screen w-screen">
            <l-jelly-triangle size="30" speed="1.75" color="black"></l-jelly-triangle>
          </div>
        ) : (
          <div className="relative flex items-center justify-center">
            <button
              onClick={scrollLeft}
              className="absolute left-0 z-10 p-2 m-2 bg-gray-200 rounded-full shadow-md hover:bg-gray-300 focus:outline-none"
            >
              &larr;
            </button>

            <div
              ref={scrollContainerRef}
              className="grid grid-flow-col auto-cols-max gap-4 overflow-x-auto border-black border-t border-b p-2"
              style={{ maxWidth: "calc(100vw - 3rem)" }}
            >
              {filteredListings.map((listing) => (
                <ListingItem key={listing._id} listing={listing} />
              ))}
            </div>

            <button
              onClick={scrollRight}
              className="absolute right-0 z-10 p-2 m-2 bg-gray-200 rounded-full shadow-md hover:bg-gray-300 focus:outline-none"
            >
              &rarr;
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategorySearch;
