import React from "react";
import { Link } from "react-router-dom";

const Bussinesspage = () => {
  return (
    <>
    <div className="mb-4">
          

        </div>
    <div className="flex justify-between items-center">
      <div className="w-1/2 p-8">
        <h2 className="text-3xl font-bold mb-4">
          Local Marketing That Really Reaches Nearby Customers
        </h2>
        <p className="text-lg mb-4">
          Stop struggling to drive nearby customers to your business. Use MyArea
          Network to drive engaged locals to your storefront.
        </p>
        
        <p className="text-lg mb-4">
          Local customers are looking for brands like you. We help them find
          you.
        </p>
        <p className="text-lg mb-4">
          If you're like most businesses, you know where your customers are
          geographically, but you don't know where they are online.
        </p>
        {/* Add more content here */}
      </div>
      <div className="w-1/2">
        <img src="your-image.jpg" alt="Your Image" className="w-full h-auto" />
      </div>
    </div>
    </>
  );
};

export default Bussinesspage;
