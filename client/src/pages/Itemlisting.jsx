import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./itemlisting.css";
// import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper'
// import 'swiper/swiper-bundle.min.css'; // Import Swiper styles

import { useSelector } from "react-redux";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import {
  faEnvelope,
  faMapMarkerAlt,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Comments from "./commentsection/Comments";
import ImageGallery from "../utility/ImageGallery";
import { FaParking, FaShower, FaSwimmingPool, FaWifi } from "react-icons/fa";

export default function Itemlisting() {
  SwiperCore.use([Navigation]);
  const params = useParams();
  const [BookingSent] = useState(false);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const [text, setText] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState({
    arrivalDate: "",
    departureDate: "",
    numberOfPeople: "",
    comment: "",
  });
  const amenitiesIcons = {
    wifi: <FaWifi />,
    pool: <FaSwimmingPool />,
    parking: <FaParking />,
    shower: <FaShower />,
    // Add more icons as needed
  };

  useEffect(() => {
    const arrivalDateTime = new Date(formData.arrivalDate);
    const departureDateTime = new Date(formData.departureDate);

    if (departureDateTime <= arrivalDateTime) {
      setErrorMessage("Departure date must be after arrival date");
    } else {
      setErrorMessage("");
    }
  }, [formData.arrivalDate, formData.departureDate]);

  const navigate = useNavigate();
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listing/get/${params.listingId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          console.log();
          return;
        }
        setError(false);
        setListing(data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.listingId]);

  const amenitiesList =
    listing && listing.amenities ? listing.amenities.split(",") : [];

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (errorMessage) {
      return;
    }

    try {
      if (!currentUser) {
        navigate("/sign-in", { replace: true });
        return;
      }

      const userEmail = currentUser.email;
      const username = currentUser.username;
      const listingid = listing._id;
      const formDataWithUserEmail = {
        ...formData,
        userEmail: userEmail,
        listingEmail: listing.email,
        userName: username,
        listingid: listingid,
      };

      const response = await fetch("http://localhost:3000/api/booking/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentUser.token}`,
        },
        body: JSON.stringify(formDataWithUserEmail), // Send formData with user email
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      setFormData({
        arrivalDate: "",
        departureDate: "",
        numberOfPeople: "",
        comment: "",
      });
      window.alert("Check your email for booking confirmation!");

      console.log("Form data sent successfully!");
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  const handleMapClick = (location) => {
    const [latitude, longitude] = location.split(",");

    const url = `https://www.google.com/maps?q=${latitude},${longitude}`;
    window.open(url, "_blank");
  };

  const handleInquireClick = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:3000/api/inquiries/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text }),
        }
      );

      if (response.ok) {
        console.log("Inquiry sent successfully!");
        window.location.href = `mailto:${listing.email}?subject=New Inquiry&body=${encodeURIComponent(text)}`;
      } else {
        console.error("Failed to send inquiry:", response.statusText);
      }

      setText("");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <main className=" md:p-8 border-black bg-slate-200 border-2 m-1 p-1 ">
      {errorMessage && (
        <p className="text-red-500 text-center">{errorMessage}</p>
      )}

      {loading && <p className="text-center my-7 text-2xl">Loading...</p>}
      {error && !loading && (
        <p className="text-center my-7 text-2xl">Something went wrong!</p>
      )}
      {listing && !error && !loading && (
        <>
          <div className="border-black border-2" >
            <p className=" text-center text-3xl border-black border-2 md:text-4xl text-sky-400 font-extrabold listingname">
              {listing.name}
            </p>
            <div className=" border-black border-2 text-center mt-2">
              <span className="text-blue-500 mr-2">
                 {listing.address?.street}
              </span>
              <FontAwesomeIcon
                icon={faMapMarkerAlt}
                className="text-blue-500 cursor-pointer"
                onClick={() => handleMapClick(listing.address.location.address)}
              />
            </div>

            {/* Swiper for Images */}
            <ImageGallery listing={listing} />
          </div>

          {/* Listing Details */}
          <div className="flex flex-col border-black border-2 max-w-full md:max-w-4xl mx-auto p-3 my-2 gap-4 itemcontent">
            <div className="flex  border-black border-2 gap-4">
              <p className="mt-1 text-sm sm:text-base md:text-lg from-neutral-400 text-black-600 text-center">
                {listing.description}
              </p>

              <ul className="grid grid-cols-2 border-black border-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 ">
                {amenitiesList.map((amenity, index) => {
                  // Remove extra spaces and convert to lowercase for better matching
                  const formattedAmenity = amenity.trim().toLowerCase();

                  return (
                    <li
                      key={index}
                      className="flex items-center border-black border-2  whitespace-nowrap"
                    >
                      {/* Show the corresponding icon for each amenity if it exists */}
                      <span>{amenitiesIcons[formattedAmenity]}</span>
                      {/* Display the amenity name */}
                      <p>{amenity}</p>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Booking Form */}
            {/* Render Room Details */}
            {Array.isArray(listing.details?.accommodation?.rooms) && listing.details.accommodation.rooms.length > 0 ? (<div className="my-8 p-4 bg-white shadow-md rounded-md">
              <h2 className="text-lg font-semibold border-black border-2 mb-4">The Rooms We Have..</h2>
              {listing.details.accommodation.rooms.map((room, index) => (
                <div
                  key={index}
                  className="flex flex-col  border-2 border-gray-300 pb-4 mb-4"
                >
                  {/* Upper section for images */}
                  <div className="flex-1  ">
                    {room.imagesurl?.length > 0 && (
                      <Swiper navigation>
                        {room.imagesurl.map((url, imgIdx) => (
                          <SwiperSlide key={imgIdx}>
                            <div
                              className="h-[200px] md:h-[300px] lg:h-[350px]"
                              style={{
                                background: `url(${url}) center no-repeat`,
                                backgroundSize: "cover",
                              }}
                            ></div>
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    )}
                  </div>

                  {/* Lower section for room details */}
                  <div className="flex-1 p-4">
                    <h3 className="text-md font-semibold mb-2">
                      Room {index + 1}
                    </h3>
                    <p>
                      <strong>Type:</strong> {room.type}
                    </p>
                    <p>
                      <strong>Beds:</strong> {room.beds}
                    </p>
                    <p>
                      <strong>Price:</strong> ${room.price}
                    </p>
                    {room.discount && (
                      <p>
                        <strong>Discount:</strong> {room.discount}
                      </p>
                    )}
                    <p>
                      <strong>Description:</strong> {room.description}
                    </p>
                    {room.amenities.length > 0 && (
                      <div>
                        <strong>Amenities:</strong>{" "}
                        {room.amenities.join(", ")}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            ) : (
              <p>No room details available.</p>
            )}

            {listing.details.accommodation && (
              <div className="my-8 p-4 bg-white shadow-md rounded-md">
                <h2 className="text-lg font-semibold mb-4">Booking</h2>
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label
                      htmlFor="arrivalDate"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Arrival Date
                    </label>
                    <input
                      type="date"
                      id="arrivalDate"
                      name="arrivalDate"
                      className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      value={formData.arrivalDate}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="departureDate"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Departure Date
                    </label>
                    {errorMessage && (
                      <p className="text-red-500">{errorMessage}</p>
                    )}
                    <input
                      type="date"
                      id="departureDate"
                      name="departureDate"
                      className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      value={formData.departureDate}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="numberOfPeople"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Number of People
                    </label>
                    <input
                      type="number"
                      id="numberOfPeople"
                      name="numberOfPeople"
                      className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      value={formData.numberOfPeople}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="comment"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Comment
                    </label>
                    <textarea
                      id="comment"
                      name="comment"
                      className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      rows="3"
                      value={formData.comment}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Submit
                  </button>
                  {BookingSent && (
                    <p className="text-green-500 mt-2">
                      Booking sent successfully!
                    </p>
                  )}
                </form>
              </div>
            )}
            <div>
              <div className="items-center justify-center h-full">
                <p className="justify-center pt-2">Reach us @</p>
              </div>
              <div>
                <p className="mt-2 text-sm text-blue-500 font-bold hover:text-blue-700">
                  <FontAwesomeIcon icon={faPhone} /> - {listing.contact}
                </p>
                <p className="mt-2 text-sm text-blue-500 font-bold hover:text-blue-700">
                  <FontAwesomeIcon icon={faEnvelope} /> - {listing.email}
                </p>
              </div>
              <div className="flex flex-col gap-4">
                <textarea
                  value={text}
                  onChange={(event) => setText(event.target.value)}
                  placeholder="Inquire about us..."
                  rows={3}
                  cols={20}
                  className="border border-gray-300 p-2 mb-2"
                />
                <button
                  onClick={handleInquireClick}
                  className="bg-blue-500 text-white px-2 py-2 w-50px rounded hover:bg-blue-600"
                >
                  Inquire
                </button>
              </div>
            </div>
          </div>
          <div className="border-black border-2" >
            <Comments currentUser={currentUser} listingId={listing._id} />

          </div>
        </>
      )}
    </main>
  );
}
