import  { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import ListingItem from "../components/ListingItem";
import "ldrs/jellyTriangle";

const CategorySearch = () => {
  const { county, categoryname } = useParams();
  const [listings, setListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const scrollContainerRef = useRef(null);

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

  const scrollLeft = () => {
    scrollContainerRef.current.scrollBy({
      left: -400, // Adjust scroll distance as needed
      behavior: 'smooth',
    });
  };

  const scrollRight = () => {
    scrollContainerRef.current.scrollBy({
      left: 400, // Adjust scroll distance as needed
      behavior: 'smooth',
    });
  };

  return (
    <div className="h-screen bg-gray-100 overflow-hidden">
  <h2 className="text-center text-2xl md:text-3xl lg:text-4xl font-semibold mt-4 mb-6">
    {categoryname} in {county}
  </h2>
  {isLoading ? (
    <div className="flex items-center justify-center h-screen w-screen">
      <l-jelly-triangle
        size="30"
        speed="1.75"
        color="black"
      ></l-jelly-triangle>
    </div>
  ) : (
    <div className="relative flex items-center justify-center mt-6 mx-4 md:mx-8 lg:mx-12">
      <button
        onClick={scrollLeft}
        className="absolute left-0 z-10 p-2 m-2 bg-gray-200 rounded-full shadow-md hover:bg-gray-300 focus:outline-none"
      >
        &larr;
      </button>
      <div
        ref={scrollContainerRef}
        className="grid grid-flow-col auto-cols-max gap-4 overflow-x-auto border-black border-t border-b p-2"
        style={{ maxWidth: 'calc(100vw - 3rem)' }} 
      >
        {listings.map((listing) => (
          <ListingItem key={listing._id} listing={listing} />
        ))}
      </div>
      <button
        onClick={scrollRight}
        className="absolute right-0 z-10 p-2 m-2 bg-gray-200 rounded-full shadow-md hover:bg-gray-300 focus:outline-none"
      >
        &rarr;
      </button>
    </div>
  )}
</div>

  );
};

export default CategorySearch;
