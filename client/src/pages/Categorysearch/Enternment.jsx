/* eslint-disable react/prop-types */
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import ListingItem from "../../components/ListingItem";

const EntertainmentSearch = ({ listings }) => {
  // Filter state values
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const { county, categoryname } = useParams();

  // Flatten the nested listings structure to pull out all EntertainmentItems.
  // Each item is enriched with the listing _id and listing name.
  const entertainmentItems = listings.flatMap((listing) =>
    listing.category.flatMap((cat) =>
      cat.subcategories.flatMap((sub) => {
        if (sub.EntertainmentItems && sub.EntertainmentItems.length > 0) {
          return sub.EntertainmentItems.map((item) => ({
            ...item,
            listingId: listing._id,
            listingName: listing.name,
          }));
        }
        return [];
      })
    )
  );

  // Filter logic:
  let filteredItems = entertainmentItems;
  if (selectedSubcategory) {
    filteredItems = filteredItems.filter(
      (item) => item.subcategory === selectedSubcategory
    );
  }
  if (minPrice) {
    filteredItems = filteredItems.filter(
      (item) => parseFloat(item.price) >= parseFloat(minPrice)
    );
  }
  if (maxPrice) {
    filteredItems = filteredItems.filter(
      (item) => parseFloat(item.price) <= parseFloat(maxPrice)
    );
  }

  // Build a list of unique subcategories available from the data.
  const uniqueSubcategories = Array.from(
    new Set(entertainmentItems.map((item) => item.subcategory))
  );

  return (
    <div className="flex flex-col md:flex-row mt-5">
      {/* Filter Sidebar */}
      <aside className="md:w-[20%] p-4 border-b md:border-b-0 md:border-r">
        <h2 className="text-2xl font-bold mb-4">Filters</h2>
        {/* Subcategory Filter */}
        <div className="mb-4">
          <label className="block font-medium mb-1">Subcategory</label>
          <select
            className="w-full border p-2 rounded"
            value={selectedSubcategory}
            onChange={(e) => setSelectedSubcategory(e.target.value)}
          >
            <option value="">All</option>
            {uniqueSubcategories.map((sub, idx) => (
              <option key={idx} value={sub}>
                {sub}
              </option>
            ))}
          </select>
        </div>
        {/* Price Filters */}
        <div className="mb-4">
          <label className="block font-medium mb-1">Min Price</label>
          <input
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="w-full border p-2 rounded"
            placeholder="Minimum Price"
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-1">Max Price</label>
          <input
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-full border p-2 rounded"
            placeholder="Maximum Price"
          />
        </div>
      </aside>

      {/* Products Grid */}
      <main className="md:w-[80%] p-4">
        <div>
          <h2>
            {categoryname} in {county}
          </h2>
        </div>
        {filteredItems.length > 0 ? (
          // The outer div sets a max-height and enables vertical scrolling.
          // On small screens, it shows roughly 2 rows (4 items when 2 columns).
          // On large screens, it shows roughly 2 rows (8 items when 4 columns).
          <div className="overflow-y-auto max-h-[400px] lg:max-h-[600px]">
            {/* Grid: default to 2 columns (for small screens), then 4 columns on large screens */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
              {filteredItems.map((item, index) => (
                <Link
                  key={`${item.listingId}-${index}`}
                  to={`/${county}/${categoryname}/${item.listingId}`}
                >
                  <ListingItem listing={item} />
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-xl">No items found matching your filters.</p>
        )}
      </main>
    </div>
  );
};

export default EntertainmentSearch;
