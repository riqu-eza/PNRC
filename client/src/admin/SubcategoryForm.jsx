/* eslint-disable react/prop-types */
import { useState } from "react";
import MenuItemForm from "./MenuItemForm";
import RoomForm from "./RoomForm";

const SubcategoryForm = ({
  category,
  subcategories,
  availableSubcategories,
  setSubcategories,
}) => {
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [menuItems, setMenuItems] = useState([]);
  const [rooms, setRooms] = useState([]);

  const handleAddSubcategory = () => {
    if (selectedSubcategory) {
      const newSubcategory = {
        subcategory: selectedSubcategory,
        menuItems,
        rooms,
      };
      setSubcategories([...subcategories, newSubcategory]); // Append new subcategory
      setSelectedSubcategory("");
      setMenuItems([]);
      setRooms([]);
    } else {
      alert("Please select a subcategory.");
    }
  };

  const renderFormForCategory = () => {
    switch (category) {
      case "Accommodation":
        return <RoomForm setRooms={setRooms} rooms={rooms} />;
      case "Dining":
        return <MenuItemForm setMenuItems={setMenuItems} meals={menuItems} />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-sm">
      <h4 className="text-lg font-medium mb-2">{category} - Subcategory</h4>

      <select
        value={selectedSubcategory}
        onChange={(e) => setSelectedSubcategory(e.target.value)}
        className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="" disabled>
          Select a Subcategory
        </option>
        {availableSubcategories.map((subcat, idx) => (
          <option key={idx} value={subcat}>
            {subcat}
          </option>
        ))}
      </select>

      {selectedSubcategory && renderFormForCategory()}

      <button
        type="button"
        onClick={handleAddSubcategory}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        Add Subcategory
      </button>

      {/* Render list of added subcategories */}
      <div className="mt-4">
        {subcategories.map((subcat, idx) => (
          <div key={idx} className="p-2 bg-gray-100 rounded mb-2">
            <strong>{subcat.subcategory}</strong> {/* Display subcategory */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubcategoryForm;
