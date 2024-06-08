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
    <div className="bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]">
      <Link to={`/listing/${listing._id}`} className="" >
        <div className="" >
        <img
          src={listing.imageUrls[0]}
          alt="listing cover"
          className="h-[320px sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300"
        />
        
        <div className="p-3 flex flex-col gap-2 w-full">
          <p className="text-lg font-semibold text-slate-700 truncate">
            {listing.name}
          </p>
          <div className="flex items-center gap-1">
            <p className="text-sm text-gray-600 truncate w-full">
              {listing.description}
            </p>
          </div>
          <div className="flex items-center mt-2">
            <span className="text-gray-500 mr-2">{listing.address}</span>
            <FontAwesomeIcon
              icon={faMapMarkerAlt}
              className="text-blue-500 cursor-pointer"
              onClick={() => handleMapClick(listing.location)}
            />
          </div>
          {/* <p className="text-slate-500 mt-2 font-semibold">
            $
            {listing.offer
              ? listing.discountedPrice.toLocaleString("en-US")
              : listing.regularPrice.toLocaleString("en-US")}
            {listing.type === "rent" && " / month"}
          </p> */}
          {/* <div className="text-slate-700 flex gap-4">
            <div className="font-bold text-xs">
              {listing.bedrooms > 1
                ? `${listing.bedrooms} beds`
                : `${listing.bedrooms} bed`}
            </div>
            <div className="font-bold text-xs">
              {listing.bathrooms > 1
                ? `${listing.bathrooms} beds`
                : `${listing.bathrooms} bed`}
            </div>
          </div> */}
        </div>
        </div>
      </Link>
    </div>
  );
}
