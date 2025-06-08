import { FaMapMarkerAlt, FaRegClipboard } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import Amenities from "./amenities";
import Menu from "./meal";
import { useState } from "react";

const DiningListingPage = () => {
  const { state } = useLocation();

  // Add a fallback to avoid destructuring undefined 'state' or 'listing'
  const listing = state?.listing || {};
  console.log("DiningListingPage", listing);

  // Destructure with default values to avoid errors
  const {
    address = {},
    name = "Unknown",
    email = "",
    description = "",
    contact = "",
    imageUrls = [], // Make sure this is destructured before using it
    amenities = [],
    category = [],
    hours = [],
  } = listing;

  // Set the first image as the default hero image
  const [selectedImage, setSelectedImage] = useState(imageUrls[0]);

  const subcategories = category.length > 0 ? category[0].subcategories : []; // Default to empty if no categories

  return (
    <>
      <div className="max-w-6xl mx-auto p-4 ">
        {/* Hero Image */}
        <div className="relative">
          {/* Main Hero Image */}
          <div className="w-full h-96">
            <img
              src={selectedImage}
              alt={name}
              className="w-full h-full object-cover rounded-lg shadow-lg"
            />
            <h2 className="absolute top-4 left-4 text-white text-3xl font-bold bg-black bg-opacity-50 p-2 rounded">
              {name}
            </h2>
          </div>

          {/* Thumbnail Images */}
          <div className="flex space-x-2 mt-4">
            {imageUrls.map((url, index) => (
              <div
                key={index}
                className="w-24 h-24 overflow-hidden cursor-pointer"
              >
                <img
                  src={url}
                  alt={`Thumbnail ${index + 1}`}
                  className={`w-full h-full object-cover rounded-lg shadow-lg ${
                    selectedImage === url ? "border-2 border-blue-500" : ""
                  }`}
                  onClick={() => setSelectedImage(url)} // Update the hero image on click
                />
              </div>
            ))}
          </div>
        </div>

        {/* Address Section */}
        <div className="flex justify-end p-1">
          <div className="flex gap-2 font-black items-end">
            <p className="text-xl">Location</p>
            <p className="text-gray-700">
              {address.street}, {address.city}
            </p>
            <p className="text-gray-700 flex items-center">
              <FaMapMarkerAlt className="text-red-500 mr-2" />
              {address.mapurl?.length > 0 ? (
                <div
                  className="w-full my-4"
                  dangerouslySetInnerHTML={{ __html: address.mapurl[0] }}
                />
              ) : (
                <p className="text-gray-500">Map location not available</p>
              )}
            </p>
          </div>
        </div>

        {/* Details Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          {/* Description and Amenities */}
          <div className="p-1 gap-2 flex">
            <div className="w-[40%]">
              <p className="text-gray-700 text-center text-xl">{description}</p>
            </div>
            <div className="p-1">
              <Amenities amenities={amenities} />
            </div>
          </div>

          {/* Category Section */}
          <div className="mb-6 p-1">
            <div className="border bg-gray-100 shadow-lg">
              <Menu
                subcategories={subcategories}
                listingemail={email}
                listingname={name}
                listingaddress={address}
              />
            </div>
          </div>

          {/* Operating Hours */}
          <div className="mb-6 border p-2 flex justify-between border-gray-900 bg-gray-100 shadow-md">
            <div className="border-2 border-gray-200 shadow-md p-1 bg-gray-200">
              <h3 className="text-xl font-semibold mb-2 rounded-lg text-center p-1 bg-blue-300">
                Property Rules
              </h3>
              <div className="border-2 border-blue-100 p-1 rounded-lg bg-blue-200">
                {hours.map((hour) => (
                  <div key={hour._id} className="flex gap-1">
                    <FaRegClipboard className="text-gray-700 mt-1" />
                    <p className="text-gray-700">
                      Opens: {hour.open} <span className="">Hrs</span> - Closes:{" "}
                      {hour.close}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-1">
              <h2>For Compliments and Complaints:</h2>
              <div className="border-2 border-black p-1">
                <p className="text-gray-700 mb-2">Contact: {contact}</p>
                <p className="text-gray-700 mb-2 p-1">
                  Email:{" "}
                  <a
                    href={`mailto:${email}`}
                    className="text-blue-500 hover:underline"
                  >
                    {email}
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DiningListingPage;
