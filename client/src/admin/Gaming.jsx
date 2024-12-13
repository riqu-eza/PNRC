/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

const Gaming = ({ details, setDetails, addItem }) => {
  const [gamingEntries, setGamingEntries] = useState([]);
  const [gamingDetails, setGamingDetails] = useState({
    name: details.name || "",
    cost: details.cost || 0,
    age: details.age || 0,
    groupsize: details.groupsize || "",
    duration: details.duration || "",
    requiredequipments: details.requiredequipments || "",
  });

  useEffect(() => {
    setGamingDetails({
      name: details.name || "",
      cost: details.cost || 0,
      age: details.age || 0,
      groupsize: details.groupsize || "",
      duration: details.duration || "",
      requiredequipments: details.requiredequipments || "",
    });
  }, [details]);

  const handleSave = (e) => {
    e.preventDefault();
    const newEntry = { ...gamingDetails };

    setGamingEntries((prevEntries) =>
      Array.isArray(prevEntries) ? [...prevEntries, newEntry] : [newEntry]
    );
    setDetails((prevEntries) =>
      Array.isArray(prevEntries) ? [...prevEntries, newEntry] : [newEntry]
    );

    addItem(newEntry);

    setGamingDetails({
      name: "",
      cost: 0,
      age: 0,
      groupsize: "",
      duration: "",
      requiredequipments: "",
    });
  };

  return (
    <div className="p-4 border border-gray-300 rounded mt-4">
      <h5 className="text-md font-medium mb-2">Game Details</h5>

      <input
        type="text"
        value={gamingDetails.name}
        onChange={(e) =>
          setGamingDetails((prev) => ({ ...prev, name: e.target.value }))
        }
        placeholder="Game name"
        className="w-full p-2 mb-2 border border-gray-300 rounded"
      />
      <input
        type="text"
        value={gamingDetails.cost}
        onChange={(e) =>
          setGamingDetails((prev) => ({ ...prev, cost: e.target.value }))
        }
        placeholder="Cost"
        className="w-full p-2 mb-2 border border-gray-300 rounded"
      />
      <input
        type="text"
        value={gamingDetails.duration}
        onChange={(e) =>
          setGamingDetails((prev) => ({ ...prev, duration: e.target.value }))
        }
        placeholder="Duration(min)"
        className="w-full p-2 mb-2 border border-gray-300 rounded"
      />
      <input
        type="text"
        value={gamingDetails.groupsize}
        onChange={(e) =>
          setGamingDetails((prev) => ({ ...prev, groupsize: e.target.value }))
        }
        placeholder="Groupsize"
        className="w-full p-2 mb-2 border border-gray-300 rounded"
      />
      <input
        type="text"
        value={gamingDetails.requiredequipments}
        onChange={(e) =>
          setGamingDetails((prev) => ({
            ...prev,
            requiredequipments: e.target.value,
          }))
        }
        placeholder="Required Equipments"
        className="w-full p-2 mb-2 border border-gray-300 rounded"
      />

      <button
        onClick={handleSave}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Save Gaming Details
      </button>

      <div className="mt-4">
        <h6 className="font-semibold">Saved Gaming Entries:</h6>
        <ul>
          {gamingEntries.map((entry, index) => (
            <li key={index} className="border p-2 mb-2">
              <strong>{entry.name}</strong>
              <p>Cost: {entry.cost}</p>
              <p>Duration: {entry.duration}</p>
              <p>Group Size: {entry.groupsize}</p>
              <p>Required Equipments: {entry.requiredequipments}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Gaming;
