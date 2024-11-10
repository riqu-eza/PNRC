/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

const Amusement = ({ details, setDetails }) => {
  // Iniize gamingDetails state with details prop values
  const [entries, setEntries] = useState([]);

  const [data, setData] = useState({
    name: details.name || "",   // Use an empty string if details.name is undefined
    cost: details.cost || 0  ,
    age: details.age || 0,
    groupsize: details.groupsize || "",
    attractions: details.attractions || "",
    duration: details.duration || "",
  });

  useEffect(() =>{
    setData
  },[details]);

  const handleSave = (e) =>{
    e.preventDefault();
    const newEntry = {
        data
    };

setEntries((prevEntries) =>[...(prevEntries || []), newEntry]);
setDetails((prevEntries) => [...(prevEntries || []), newEntry]); // Update parent details

setData("");

  }

  return (
    <>
       <div className="p-4 border border-gray-300 rounded mt-4">
      <h5 className="text-md font-medium mb-2">Cinema Details</h5>

      <input
        type="text"
        value={data.name}
        onChange={(e) => setData(e.target.value)}
        placeholder="Movie Title"
        className="w-full p-2 mb-2 border border-gray-300 rounded"
      />
      <input
        type="text"
        value={data.cost}
        onChange={(e) => setData(e.target.value)}
        placeholder="Movie Title"
        className="w-full p-2 mb-2 border border-gray-300 rounded"
      />
      <input
        type="text"
        value={data.duration}
        onChange={(e) => setData(e.target.value)}
        placeholder="cinema Hall"
        className="w-full p-2 mb-2 border border-gray-300 rounded"
      />
      <input
        type="text"
        value={data.groupsize}
        onChange={(e) => setData(e.target.value)}
        placeholder="showtimes"
        className="w-full p-2 mb-2 border border-gray-300 rounded"
      />
      <input
        type="text"
        value={data.attractions}
        onChange={(e) => setData(e.target.value)}
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
        <h6 className="font-semibold">Saved  Entries:</h6>
        <ul>
          {entries.map((entry, index) => (
            <li key={index} className="border p-2 mb-2">
              <strong>{entry.details.name}</strong> at 
              {/* Render other details */}
            </li>
          ))}
        </ul>
      </div>
    </div>
    </>
  );
}

export default Amusement;
