/* eslint-disable react/prop-types */
// MenuItemForm.jsx
import { useState } from "react";

const MenuItemForm = ({ setMenuItems , meals }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [dishType, setDishType] = useState("");

  const handleAddMenuItem = () => {
    if(name && description && price && dishType){

      const newMeal = {
        name,
        description,
        price,
        dishType
      };

      setMenuItems((prev)  =>[...prev, newMeal]);

      setName("");
      setDescription("");
      setPrice("");
      setDishType("");
    } else {
      alert("Please fill in all fields.")
    }
   
  };

  return (
    <div className="mb-6 p-4 bg-gray-50 rounded-lg shadow-lg">
      <h5 className="text-lg font-semibold mb-4">Menu Item Details</h5>

      <div className="space-y-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Dish Name"
          required
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          required
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price"
          required
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="text"
          value={dishType}
          onChange={(e) => setDishType(e.target.value)}
          placeholder="Dish Type"
          required
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="button"
          onClick={handleAddMenuItem}
          className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Add Menu Item
        </button>
      </div>
      {meals.length > 0 && (
        <div className="mt-6">
          <h6 className="text-lg font-semibold mb-4">Added meals</h6>
          <ul className="space-y-2">
            {meals.map((meal, idx) => (
              <li key={idx} className="p-2 bg-gray-100 rounded-lg">
                <strong>{meal.name}</strong> 
                
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MenuItemForm;
