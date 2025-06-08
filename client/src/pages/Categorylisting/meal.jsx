/* eslint-disable react/prop-types */
import { useState } from "react";
import MealModal from "./mealModal";

const Menu = ({ subcategories, listingemail, listingname, listingaddress }) => {
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to handle subcategory selection
  const handleSubcategorySelect = (subcategory) => {
    setSelectedSubcategory(subcategory);
  };

  // Filter menu items based on the selected subcategory
  const filteredMenuItems = selectedSubcategory
    ? subcategories.find((subcat) => subcat.subcategory === selectedSubcategory)
        ?.menuItems || []
    : subcategories.flatMap((subcat) => subcat.menuItems); // Show all if no subcategory is selected

  // Function to open modal with selected meal details
  const handleViewMore = (meal) => {
    setSelectedMeal(meal);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMeal(null);
  };

  if (!Array.isArray(subcategories) || subcategories.length === 0) {
    return <p>No subcategories available.</p>; // Fallback if no subcategories
  }

  return (
    <div className="max-w-6xl mx-auto p-4 ">
      <h1 className="text-3xl font-bold mb-6 ">Menu</h1>

      {/* Subcategory Bar */}
      <div className="mb-4 flex space-x-4 p-1 ">
        {subcategories.map((subcat) => (
          <button
            key={subcat._id}
            className={` px-4 py-2 rounded-lg ${
              selectedSubcategory === subcat.subcategory
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            } transition hover:bg-blue-500 hover:text-white`}
            onClick={() => handleSubcategorySelect(subcat.subcategory)}
          >
            {subcat.subcategory}
          </button>
        ))}
        <button
          className={` border-2 border-black px-4 py-2 rounded-lg ${
            selectedSubcategory === null
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700"
          } transition hover:bg-blue-500 hover:text-white`}
          onClick={() => handleSubcategorySelect(null)} // Show all menu items
        >
          All
        </button>
      </div>

      {/* Render filtered menu items */}
      <div className="max-h-2xl overflow-y-auto p-1 border-2 border-black">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredMenuItems.map((item) => (
            <div
              key={item._id}
              className="flex flex-col p-4 rounded-lg shadow-lg hover:shadow-xl transition gap-1 mb-4"
            >
              <h3 className=" text-xl font-bold">{item.DishName}</h3>
              <p className=" text-gray-600 mb-2">{item.description}</p>
              <p className="text-lg font-semibold text-green-500">
                ${item.Price}
              </p>

              {/* Display dish image if available */}
              {item.imageUrls.length > 0 && (
                <img
                  src={item.imageUrls[0]}
                  alt={item.DishName}
                  className=" w-full h-40 object-cover rounded-lg mb-4"
                />
              )}

              <button
                className=" bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                onClick={() => handleViewMore(item)} // Open modal with item details
              >
                View More
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Render the MealModal if it's open */}
      {isModalOpen && (
        <MealModal
          meal={selectedMeal}
          listingemail={listingemail}
          listingname={listingname}
          listingaddress={listingaddress}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default Menu;
