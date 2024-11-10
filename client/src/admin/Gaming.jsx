/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

const Gaming = ({ details, setDetails }) => {
  // Initialize gamingDetails state with details prop values
  const [gamingEntries, setGamingEntries] = useState([]);

  const [gamingDetails, setGamingDetails] = useState({
    name: details.name || "",   // Use an empty string if details.name is undefined
    cost: details.cost || 0  ,
    age: details.age || 0,
    groupsize: details.groupsize || "",
    duration: details.duration || "",
    requiredequipments: details.requiredequipments
  });

  useEffect(() =>{
    setGamingDetails
  },[details]);

  const handleSave = (e) =>{
    e.preventDefault();
    const newEntry = {
        gamingDetails
    };

setGamingEntries((prevEntries) =>[...(prevEntries || []), newEntry]);
setDetails((prevEntries) => [...(prevEntries || []), newEntry]); // Update parent details

setGamingDetails("");

  }

  return (
    <>
       <div className="p-4 border border-gray-300 rounded mt-4">
      <h5 className="text-md font-medium mb-2">Cinema Details</h5>

      <input
        type="text"
        value={gamingDetails.name}
        onChange={(e) => setGamingDetails(e.target.value)}
        placeholder="Movie Title"
        className="w-full p-2 mb-2 border border-gray-300 rounded"
      />
      <input
        type="text"
        value={gamingDetails.cost}
        onChange={(e) => setGamingDetails(e.target.value)}
        placeholder="Movie Title"
        className="w-full p-2 mb-2 border border-gray-300 rounded"
      />
      <input
        type="text"
        value={gamingDetails.duration}
        onChange={(e) => setGamingDetails(e.target.value)}
        placeholder="cinema Hall"
        className="w-full p-2 mb-2 border border-gray-300 rounded"
      />
      <input
        type="text"
        value={gamingDetails.groupsize}
        onChange={(e) => setGamingDetails(e.target.value)}
        placeholder="showtimes"
        className="w-full p-2 mb-2 border border-gray-300 rounded"
      />
      <input
        type="text"
        value={gamingDetails.requiredequipments}
        onChange={(e) => setGamingDetails(e.target.value)}
        placeholder="ticketPrice"
        className="w-full p-2 mb-2 border border-gray-300 rounded"
      />
    
      {/* Other input fields */}

      <button
        onClick={handleSave}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Save gaming Details
      </button>

      {/* Display saved entries */}
      <div className="mt-4">
        <h6 className="font-semibold">Saved Gaming Entries:</h6>
        <ul>
          {gamingEntries.map((entry, index) => (
            <li key={index} className="border p-2 mb-2">
              <strong>{entry.movieTitle}</strong> at {entry.cinemaHall}
              {/* Render other details */}
            </li>
          ))}
        </ul>
      </div>
    </div>
    </>
  );
}

export default Gaming;
