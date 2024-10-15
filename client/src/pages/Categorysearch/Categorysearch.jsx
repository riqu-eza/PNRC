import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AccommodationSearch from "./accommodation";
import DiningSearch from "./Diningsearch"



const CategorySearch = () => {
  const { county, categoryname } = useParams();
  const [listings, setListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  console.log("categorylist", listings);
  console.log( categoryname )
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `http://localhost:3000/api/listing/${county}/${categoryname}`
        );
        if (response.ok) {
          const data = await response.json();
          setListings(data);
        } else {
          console.error("Failed to fetch data:", response.statusText);
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [county, categoryname]);

  // Select the appropriate component based on the category
  const renderCategoryComponent = () => {
    switch (categoryname.toLowerCase()) {
      case "accommodation":
        return <AccommodationSearch listings={listings} />;
      case "dining":
        return <DiningSearch listings={listings} />;
      default:
        return <div>Category not found</div>;
    }
  };

  return (
    <div>{isLoading ? <div>Loading...</div> : renderCategoryComponent()}</div>
  );
};

export default CategorySearch;
