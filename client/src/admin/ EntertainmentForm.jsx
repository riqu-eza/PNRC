/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import CinemaForm from "./cinemaForm";
import MusicLivePerformances from "./MusicLivePerformances";
import Gaming from "./Gaming";
import Amusement from "./Amusement";

// eslint-disable-next-line no-unused-vars
const EntertainmentForm = ({ setEntertainmentItems, Subcategory }) => {
  const [entertainmentDetails, setEntertainmentDetails] = useState({});
  console.log("we are here......");
  console.log("sucategory", Subcategory);
  useEffect(() => {
    // Reset entertainmentDetails whenever the selected subcategory changes
    setEntertainmentDetails({});
  }, [Subcategory]);
  const addEntertainmentItem = (item) => {
    // Add the item to the parent state array
    setEntertainmentItems((prevItems) => [...prevItems, item]);
  };
  const renderSubcategoryForm = () => {
    switch (Subcategory) {
      case "Cinema & Theaters":
        return (
          <CinemaForm
            details={entertainmentDetails}
            setDetails={setEntertainmentDetails}
            addItem={addEntertainmentItem}
          />
        );
      case "Music & Live Performances":
        return (
          <MusicLivePerformances
            details={entertainmentDetails}
            setDetails={setEntertainmentDetails}
            addItem={addEntertainmentItem}
          />
        );
        case "Gaming & Indoor Fun" :
          return(
            <Gaming 
            details={entertainmentDetails}
            setDetails={setEntertainmentDetails}
            addItem={addEntertainmentItem}

             />
          );
          case "Amusement & Recreation" :
            return(
              <Amusement
              details={entertainmentDetails}
              setDetails={setEntertainmentDetails}
              addItem={addEntertainmentItem}
               />
            )
      // Add more cases for other subcategories here
      default:
        return null;
    }
  };

  return (
    <form className="bg-white p-4 border border-gray-200 rounded-lg shadow-sm">
      <h4 className="text-lg font-medium mb-2">
        Add Entertainment Details for {Subcategory}
      </h4>
      {renderSubcategoryForm()}
      {/* <button onClick={callsubmit}
        type="submit"
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        Submit
      </button> */}
    </form>
  );
};

export default EntertainmentForm;
