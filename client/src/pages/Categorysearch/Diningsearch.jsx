/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import ListingItem from "../../components/ListingItem";

const DiningSearch = ({ listings, filters }) => {
  const filteredMenuItems = applyFilters(listings, filters);

  return (
    <div>
      {filteredMenuItems.map((menuItem) => (
        <ListingItem key={menuItem._id} menuItem={menuItem} />
      ))}
    </div>
  );
};

// Function to apply filters to the menu items
const applyFilters = (listings, filters) => {
  // Implement filtering logic based on the filters
  return listings; // Modify this based on filtering logic
};

export default DiningSearch;
