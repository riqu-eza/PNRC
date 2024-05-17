import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Itemlisting from "./Itemlisting";
import ListingItem from "../components/ListingItem";

const CategorySearch = () => {
  const { county, categoryname } = useParams();
  const [listings, setListings] = useState([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("County:", county);
    console.log("Category:", categoryname);
    fetchData();
  }, [county, categoryname]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/listing/${county}/${categoryname}`
      );
      if (response.ok) {
        const data = await response.json();
        setListings(data);

        console.log("API Response:", data);
      } else {
        console.error("Failed to fetch data:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div >
      <h2>Category Search Results</h2>
      <div className="flex gap-5 left-10">
        {listings.map((listing) => (
          <ListingItem key={listing._id} listing={listing} />
        ))}
      </div>
    </div>
  );
};

export default CategorySearch;
