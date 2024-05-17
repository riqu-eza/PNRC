import React, { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa"; // Import the delete icon

const City = () => {
  const [showAddCity, setShowAddCity] = useState(false);
  const [showViewCities, setShowViewCities] = useState(false);
  const [cities, setCities] = useState([]);
  const [newCity, setNewCity] = useState("");

  const handleAddCity = () => {
    setShowAddCity(true);
    setShowViewCities(false);
  };

  const handleViewCities = () => {
    setShowViewCities(true);
    setShowAddCity(false);
  };

  const handleCityNameChange = (event) => {
    setNewCity(event.target.value);
  };

  const handleSubmitCity = async () => {
    if (!newCity) return;

    try {
      const response = await fetch("http://localhost:3000/api/admin/city", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newcity: newCity }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `HTTP error! status: ${response.status} - ${errorData.message}`
        );
      }

      const data = await response.json();
      // setCities([...cities, data.newcity]); // Assuming the server returns the added city in the response
      setNewCity("");
      setShowAddCity(false);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      alert(`There was a problem adding the city: ${error.message}`);
    }
  };

  useEffect(() => {
    fetchCities(); // Invoke fetchCities properly
  }, []); // Ensure empty dependency array to fetch data only once

  const fetchCities = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/admin/cities");
      if (!response.ok) {
        throw new Error("Failed to fetch cities");
      }
      const data = await response.json();
      setCities(data);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-center mb-6">Resort Cities</h1>
        <div className="flex justify-center space-x-4 mb-6">
          <button
            onClick={handleAddCity}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add City
          </button>
          <button
            onClick={handleViewCities}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            View Cities
          </button>
        </div>

        {showAddCity && (
          <div className="mb-6">
            <input
              type="text"
              placeholder="Enter city name"
              value={newCity}
              onChange={handleCityNameChange}
              className="border p-2 rounded w-full mb-4"
            />
            <button
              onClick={handleSubmitCity}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Submit
            </button>
          </div>
        )}

        {showViewCities && (
          <div>
            <h2 className="text-2xl font-bold mb-4">City List</h2>
            <ul className="list-disc list-inside">
              {cities.map((city) => (
                <li key={city._id} className="mb-2">
                  {city.newcity}{" "}
                  {/* <button
                    className="absolute  bg-red-500 text-white p-1 rounded-md ml-8"
                    onClick={() => onDelete(city._id)}
                  >
                    <FaTimes />
                  </button> */}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default City;
