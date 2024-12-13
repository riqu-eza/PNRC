/* eslint-disable react/prop-types */
import { useState } from "react";

const MusicLivePerformances = ({ details, setDetails , addItem}) => {
  // Initialize the form data and performances state
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    location: { venueName: "", address: "" },
    performers: [{ name: "", genre: "" }],
    cost: "",
    ticketing: {
      prices: [{ type: "", price: "" }],
      availability: { startDate: "", endDate: "" },
      isSoldOut: false,
    },
  });

  const [performances, setPerformances] = useState(
    Array.isArray(details) ? details : []
  );

  // Update form state for simple and nested fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: { ...prev[parent], [child]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Update nested array fields (performers, ticket prices)
  const handleArrayChange = (e, index, field, arrayName) => {
    const { value } = e.target;
    setFormData((prev) => {
      const updatedArray = [...prev[arrayName]];
      updatedArray[index][field] = value;
      return { ...prev, [arrayName]: updatedArray };
    });
  };

  // Add items to performers or ticket prices
  const addItemToArray = (arrayName, itemTemplate) => {
    setFormData((prev) => ({
      ...prev,
      [arrayName]: [...prev[arrayName], itemTemplate],
    }));
  };

  // Save the current form data as a performance
  const handleSavePerformance = (e) => {
    e.preventDefault();

    // Update performances and details
    const updatedPerformances = [...performances, formData];
    setPerformances(updatedPerformances);
    setDetails(updatedPerformances);
    addItem(updatedPerformances);
    // Reset form data
    setFormData({
      title: "",
      date: "",
      location: { venueName: "", address: "" },
      performers: [{ name: "", genre: "" }],
      cost: "",
      ticketing: {
        prices: [{ type: "", price: "" }],
        availability: { startDate: "", endDate: "" },
        isSoldOut: false,
      },
    });
  };

  return (
    <div className="p-4 border border-gray-300 rounded mt-4">
      <h5 className="text-md font-medium mb-2">Add New Performance</h5>

      {/* Title */}
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleInputChange}
        placeholder="Event Title"
        className="w-full p-2 mb-2 border border-gray-300 rounded"
      />

      {/* Date */}
      <input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleInputChange}
        className="w-full p-2 mb-2 border border-gray-300 rounded"
      />

      {/* Location */}
      <input
        type="text"
        name="location.venueName"
        value={formData.location.venueName}
        onChange={handleInputChange}
        placeholder="Venue Name"
        className="w-full p-2 mb-2 border border-gray-300 rounded"
      />
      <input
        type="text"
        name="location.address"
        value={formData.location.address}
        onChange={handleInputChange}
        placeholder="Venue Address"
        className="w-full p-2 mb-2 border border-gray-300 rounded"
      />

      {/* Performers */}
      <h6 className="mt-4 font-medium">Performers</h6>
      {formData.performers.map((performer, index) => (
        <div key={index} className="flex gap-2 mb-2">
          <input
            type="text"
            value={performer.name}
            onChange={(e) => handleArrayChange(e, index, "name", "performers")}
            placeholder="Performer Name"
            className="w-1/2 p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            value={performer.genre}
            onChange={(e) => handleArrayChange(e, index, "genre", "performers")}
            placeholder="Performer Genre"
            className="w-1/2 p-2 border border-gray-300 rounded"
          />
        </div>
      ))}
      <button
        type="button"
        onClick={() =>
          addItemToArray("performers", { name: "", genre: "" })
        }
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Add Performer
      </button>

      {/* Save Button */}
      <button
        onClick={handleSavePerformance}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Save Performance
      </button>

      {/* Display Saved Performances */}
      <div className="mt-6">
        <h5 className="text-md font-medium mb-2">Saved Performances</h5>
        {performances.map((performance, index) => (
          <div
            key={index}
            className="p-4 border border-gray-300 rounded mb-4 bg-gray-100"
          >
            <h6 className="font-bold">{performance.title}</h6>
            <p>Date: {performance.date}</p>
            <p>Venue: {performance.location.venueName}</p>
            <p>Address: {performance.location.address}</p>
            <p>Cost: ${performance.cost}</p>
            <p>Performers:</p>
            <ul>
              {performance.performers.map((performer, idx) => (
                <li key={idx}>
                  {performer.name} ({performer.genre})
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MusicLivePerformances;
