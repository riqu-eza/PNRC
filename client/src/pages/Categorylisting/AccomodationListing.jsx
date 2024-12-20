import { useState, useRef } from "react"; // Ensure useState is imported
import { FaMapMarkerAlt, FaRegClipboard } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import Amenities from "./amenities";
import RoomDisplay from "./roomdisplay";

const AccommodationListingPage = () => {
  const { state } = useLocation(); // Get the state passed from the Link
  const listing = state.listing; // Access the listing object
  const scrollContainerRef = useRef(null);
  
  const [selectedImage, setSelectedImage] = useState(listing.imageUrls[0]); // Initialize selectedImage

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -200, // Adjust the scroll amount as needed
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 200, // Adjust the scroll amount as needed
        behavior: "smooth",
      });
    }
  };

  if (!listing) {
    return <p>Loading...</p>; // Handle case where listing is not available
  }

  const {
    address,
    name,
    email,
    description,
    contact,
    imageUrls,
    amenities,
    category,
    hours,
  } = listing;

  return (
    <div className="max-w-6xl mx-auto p-4">
      {/* Hero Image Section */}
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
      {/* Address section */}
      <div className="flex justify-end  p-1 ">
        <div className="flex gap-2 font-black items-end">
          <p className="text-xl">Location</p>
          <p className="text-gray-700">
            {address.street}, {address.city}
          </p>
          <p className="text-gray-700 flex items-center">
            <FaMapMarkerAlt className="text-red-500 mr-2" />
            <a
              href={`https://www.google.com/maps?q=${address.location.lat},${address.location.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              View on Maps
            </a>
          </p>
        </div>
      </div>

      {/* Details Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        {/* Description and amenities */}
        <div className="p-1 gap-2 flex ">
          <div className="w-[40%]">
            <p className="text-gray-700 text-center text-xl">{description}</p>
          </div>
          <div className="p-1">
            <Amenities amenities={amenities} />
          </div>
        </div>

        {/* Category Section */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">
            How we can accommodate you
          </h3>
          {category.map((cat) => (
            <div key={cat._id} className="mb-4">
              {cat.subcategories.map((sub) => (
                <div
                  key={sub._id}
                  className="mb-2 border bg-slate-100 border-gray-200"
                >
                  <h5 className="text-sm text-center font-medium">
                    {sub.subcategory}
                  </h5>
                  <div className="relative">
                    {/* Scroll Buttons */}
                    <button
                      onClick={scrollLeft}
                      className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-300 p-2 rounded-full z-10"
                    >
                      &#8249; {/* Left arrow icon */}
                    </button>

                    <div
                      ref={scrollContainerRef}
                      className="flex gap-2 overflow-x-auto scrollbar-hide scroll-smooth"
                    >
                      {sub.rooms.map((room) => (
                        <RoomDisplay
                          key={room._id}
                          room={room}
                          listingemail={email}
                          listingname={name}
                          listingaddress={address}
                        />
                      ))}
                    </div>

                    <button
                      onClick={scrollRight}
                      className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full z-10"
                    >
                      &#8250; {/* Right arrow icon */}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Operating Hours Section */}
        <div className="mb-6 border p-2 flex justify-between border-gray-900 bg-gray-100 shadow-md">
          <div className="border-2 border-gray-200 shadow-md p-1 bg-gray-200">
            <h3 className="text-xl font-semibold mb-2 rounded-lg text-center p-1 bg-blue-300">
              Property Rules
            </h3>
            <div className="border-2 border-blue-100 p-1 rounded-lg bg-blue-200">
              {hours.map((hour) => (
                <div key={hour._id} className="flex gap-1">
                  <FaRegClipboard className="text-gray-700 mt-1" />
                  <p className="text-gray-700 ">
                    Check In: {hour.open}
                    <span className=""> Hrs</span> - Check Out: {hour.close}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="p-1">
            <h2>For Compliments and complaints:</h2>
            <div className="border-2 border-black p-1">
              <p className="text-gray-700 mb-2">Contact: {contact}</p>
              <p className="text-gray-700 mb-2 p-1 ">
                Email: @{" "}
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

        {/* Back to Listing Link */}
        <Link
          to={`/${listing.category[0].category}/${listing._id}`}
          className="inline-block mt-4 px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition duration-200"
        >
          Back to Listing
        </Link>
      </div>
    </div>
  );
};

export default AccommodationListingPage;
