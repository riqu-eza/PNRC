import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";

/* eslint-disable react/prop-types */
export default function ListingItem({ listing }) {
  const handleMapClick = (location) => {
    const [latitude, longitude] = location.split(",");
    const url = `https://www.google.com/maps?q=${latitude},${longitude}`;
    window.open(url, "_blank");
  };

  return (
    <div className="bg-white shadow-md hover:shadow-lg  transition-shadow overflow-hidden rounded-lg w-[200px] sm:w-[230px] md:w-[260px] lg:w-[300px]">
      <Link to={`/listing/${listing._id}`} className="">
        <div className="">
          {/* Updated to check for imageUrls array */}
          {listing.imageUrls && listing.imageUrls.length > 0 ? (
            <img
              src={listing.imageUrls[0]} // Show first image in the array
              alt="listing cover"
              className="h-[220px] sm:h-[250px] md:h-[280px] lg:h-[200px] w-full object-cover hover:scale-105 transition-scale duration-300"
            />
          ) : (
            <div className="h-[220px] sm:h-[250px] md:h-[280px] lg:h-[200px] w-full bg-gray-300 flex items-center justify-center">
              <p className="text-gray-500">No Image Available</p>
            </div>
          )}

          <div className="p-3 flex flex-col gap-2 w-full">
            <p className="text-lg font-semibold text-slate-700 truncate">
              {listing.name}
            </p>
            <div className="flex items-center gap-1">
              <p className="text-sm text-gray-600 truncate w-full">
                {listing.description}
              </p>
            </div>
            
            {/* Address: Render street, city, and postal code */}
            {listing.address && (
              <div className="flex flex-col text-sm text-gray-600">
                <span>{listing.address.street}</span>
                <span>{listing.address.city}, {listing.address.postal_code}</span>
              </div>
            )}

            {/* Map Icon for location */}
            {listing.location && (
              <div className="flex items-center mt-2">
                <span className="text-gray-500 mr-2">Open in Maps</span>
                <FontAwesomeIcon
                  icon={faMapMarkerAlt}
                  className="text-blue-500 cursor-pointer"
                  onClick={() => handleMapClick(listing.location)}
                />
              </div>
            )}
            
            {/* Optional: Display offer and pricing */}
            {/* {listing.offer && (
              <p className="text-slate-500 mt-2 font-semibold">
                {listing.discountedPrice
                  ? `$${listing.discountedPrice.toLocaleString("en-US")}`
                  : `$${listing.regularPrice.toLocaleString("en-US")}`}
                {listing.type === "rent" && " / month"}
              </p>
            )} */}

            {/* Optional: Bedrooms and Bathrooms */}
            {/* <div className="text-slate-700 flex gap-4">
              <div className="font-bold text-xs">
                {listing.bedrooms > 1 ? `${listing.bedrooms} beds` : `${listing.bedrooms} bed`}
              </div>
              <div className="font-bold text-xs">
                {listing.bathrooms > 1 ? `${listing.bathrooms} baths` : `${listing.bathrooms} bath`}
              </div>
            </div> */}
          </div>
        </div>
      </Link>
    </div>
  );
}
