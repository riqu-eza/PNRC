/* eslint-disable react/prop-types */
import { useState } from "react";
import Amenities from "./amenities";

const RoomDisplay = ({ room, listingemail,listingname,listingaddress }) => {
  const [showBookingOverlay, setShowBookingOverlay] = useState(false);
  const [selectedImage, setSelectedImage] = useState(room.imageUrls[0]);

  const handleBookNowClick = () => {
    setShowBookingOverlay(true); // Show the overlay
  };

  const handleCloseOverlay = () => {
    setShowBookingOverlay(false); // Close the overlay
  };
  const calculateTotalPrice = () => {
    if (formData.startDate && formData.endDate) {
      const start = new Date(formData.startDate);
      const end = new Date(formData.endDate);
      const days = (end - start) / (1000 * 3600 * 24); // Calculate the difference in days
      return days * room.pricePerNight; // Assuming room.pricePerNight is provided
    }
    return 0;
  };
  console.log("listingemail", listingemail);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contactNumber: "",
    startDate: "",
    endDate: "",
    numberOfPeople: "",
    listingEmail: listingemail,
    listingName: listingname,
    listingAddress:listingaddress
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("formData", formData);
    // Perform API call with formData
    fetch("http://localhost:3000/api/booking/create/room", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...formData,
        roomId: room._id,
         // Add room ID to the booking data
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Booking successful", data);
      })
      .catch((error) => {
        console.error("Error during booking:", error);
      });
  };

  return (
    <>
      {/* Room Container */}
      <div className=" rounded-md p-3 max-w-[450px] mb-2">
        {/* Room Images */}
        {room.imageUrls.length > 0 ? (
          <div className="relative mb-2">
            <img
              src={selectedImage}
              alt={room.name}
              className="w-full h-96 object-cover rounded-lg shadow-lg"
            />
            <h2 className="absolute bottom-4 left-4 text-white text-3xl font-bold bg-black bg-opacity-50 p-2 rounded">
              {room.name}
            </h2>
            <div className="flex mt-2 space-x-2">
              {room.imageUrls.map((url, index) => (
                <img
                  key={index}
                  src={url}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-20 h-20 object-cover rounded cursor-pointer hover:opacity-80"
                  onClick={() => setSelectedImage(url)}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="w-full h-48 bg-gray-200 rounded-md mb-3 flex items-center justify-center">
            <span className="text-gray-500">No Image Available</span>
          </div>
        )}

        {/* Room Details */}
        <h6 className="font-semibold text-center text-xl">{room.roomType}</h6>
        <p className="text-gray-700 font-serif mt-1">{room.description}</p>

        {/* Amenities */}
        <div className="flex flex-wrap mt-3 space-x-2">
          <Amenities amenities={room.amenities} />
        </div>

        {/* Price and Book Button */}
        <div className="flex justify-between items-center mt-4">
          <p className="font-light text-lg">
            Price per Night: ${room.pricePerNight}
          </p>
          <button
            onClick={handleBookNowClick}
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
          >
            Book Now
          </button>
        </div>
      </div>

      {/* Booking Overlay */}
      {showBookingOverlay && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-2/3 lg:w-[80%] relative">
            {/* Close Button */}
            <button
              onClick={handleCloseOverlay}
              className="absolute top-2 right-2 text-xl font-bold"
            >
              &times;
            </button>

            {/* Overlay Content */}
            <div className="max-h-[80vh] overflow-auto" >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Room Details */}
                <div>
                  {room.imageUrls.length > 0 ? (
                    <div className="relative mb-2">
                      <img
                        src={selectedImage}
                        alt={room.name}
                        className="w-full h-96 object-cover rounded-lg shadow-lg"
                      />
                      <h2 className="absolute bottom-4 left-4 text-white text-3xl font-bold bg-black bg-opacity-50 p-2 rounded">
                        {room.name}
                      </h2>
                      <div className="flex mt-2 space-x-2">
                        {room.imageUrls.map((url, index) => (
                          <img
                            key={index}
                            src={url}
                            alt={`Thumbnail ${index + 1}`}
                            className="w-20 h-20 object-cover rounded cursor-pointer hover:opacity-80"
                            onClick={() => setSelectedImage(url)}
                          />
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="w-full h-48 bg-gray-200 rounded-md mb-3 flex items-center justify-center">
                      <span className="text-gray-500">No Image Available</span>
                    </div>
                  )}
                  <h2 className="text-2xl font-bold">{room.roomType}</h2>
                  <p className="mt-3 text-gray-600">{room.description}</p>

                  {/* Amenities in Overlay */}
                  <div className="flex flex-wrap mt-3 space-x-2">
                    <Amenities amenities={room.amenities} />
                  </div>

                  {/* Price */}
                  <p className="font-bold text-lg mt-4">
                    Price per Night: ${room.pricePerNight}
                  </p>
                </div>

                {/* Personal details and booking details */}

                {/* First Name */}
                <div>
                  <div>
                    <label className="block text-sm font-medium">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>

                  {/* Last Name */}
                  <div>
                    <label className="block text-sm font-medium">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>

                  {/* Contact Number */}
                  <div>
                    <label className="block text-sm font-medium">
                      Contact Number
                    </label>
                    <input
                      type="tel"
                      name="contactNumber"
                      value={formData.contactNumber}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                </div>
                {/* Start Date */}
                <div>
                  <div>
                    <label className="block text-sm font-medium">
                      Start Date
                    </label>
                    <input
                      type="date"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>

                  {/* End Date */}
                  <div>
                    <label className="block text-sm font-medium">
                      End Date
                    </label>
                    <input
                      type="date"
                      name="endDate"
                      value={formData.endDate}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>

                  {/* Total Price Calculation */}
                  <p className="font-bold text-lg mt-4">
                    Total Price: ${calculateTotalPrice()}
                  </p>

                  {/* Confirm Booking Button */}
                  <button
                    onClick={handleSubmit} // Call the handleBooking function on click
                    className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition"
                  >
                    Confirm Booking
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RoomDisplay;
