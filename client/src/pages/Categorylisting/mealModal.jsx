/* eslint-disable react/prop-types */
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css"; // Import Swiper styles

const MealModal = ({ meal, onClose, listingemail, listingname, listingaddress }) => {
  const [showForm, setShowForm] = useState(false);
  const [orderType, setOrderType] = useState(""); // 'delivery' or 'pickup'
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contact: "",
    mealCount: 1,
    totalPrice: meal ? meal.Price : 0,
    mealname: meal ? meal.DishName : "",
    listingEmail: listingemail,
    listingName: listingname,
    listingAddress: listingaddress,
    orderType: "", // Will be set when user clicks delivery/pickup
  });

  if (!meal) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleOrderClick = (type) => {
    setOrderType(type);
    setFormData((prev) => ({ ...prev, orderType: type }));
    setShowForm(true);
  };

  const handleConfirmOrder = async (e) => {
    e.preventDefault();
    console.log("Order confirmed:", formData);

    try {
      const res = await fetch("/api/booking/create/meal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          totalPrice: formData.totalPrice * formData.mealCount, // Calculate final price
        }),
      });
      const data = await res.json();
      console.log("created successfully", data);
      setShowForm(false);
      onClose(); // Close the modal after successful order
    } catch (error) {
      console.log("error occurred", error);
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setOrderType("");
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 overflow-y-auto py-10">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex flex-wrap">
          {/* Left Section: Image and Meal Info */}
          <div className="flex-1 pr-4 min-w-0">
            <Swiper spaceBetween={10} slidesPerView={1}>
              {meal.imageUrls.length > 0 ? (
                meal.imageUrls.map((url, index) => (
                  <SwiperSlide key={index}>
                    <img
                      src={url}
                      alt={meal.DishName}
                      className="rounded-lg mb-2 w-full h-64 object-cover"
                    />
                  </SwiperSlide>
                ))
              ) : (
                <div className="w-full h-64 bg-gray-200 flex items-center justify-center rounded-lg mb-2">
                  No Image Available
                </div>
              )}
            </Swiper>
            <h2 className="text-2xl font-bold mb-2">{meal.DishName}</h2>
            <p className="text-lg mb-2">
              <strong>Description:</strong> {meal.description}
            </p>
            <p className="text-lg mb-2">
              <strong>Price:</strong> ${meal.Price}
            </p>
          </div>
          {/* Middle Section: Additional Details */}
          <div className="flex-1 px-4 border-l border-gray-300 min-w-0">
            <h3 className="text-xl font-semibold mb-2">Additional Details</h3>
            <p className="text-lg mb-2">
              <strong>Dietary Information:</strong> {meal.DietaryInformation}
            </p>
            <p className="text-lg mb-2">
              <strong>Serving Time:</strong> {meal.ServingTime}
            </p>
            <p className="text-lg mb-2">
              <strong>Serving Size:</strong> {meal.ServingSize}
            </p>
            <p className="text-lg mb-2">
              <strong>Preparation Time:</strong> {meal.PreparationTime} mins
            </p>
          </div>
          {/* Right Section: Ordering Buttons */}
          <div className="flex flex-col pl-4 min-w-0">
            <h3 className="text-xl font-semibold mb-2">Order Options</h3>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition mb-2"
              onClick={() => handleOrderClick("delivery")}
            >
              Order for Delivery
            </button>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition mb-2"
              onClick={() => handleOrderClick("pickup")}
            >
              Order for Pickup
            </button>
          </div>
        </div>

        {/* Order Form Modal */}
        {showForm && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
              <h2 className="text-2xl font-bold mb-4">
                Order Form - {orderType === "delivery" ? "Delivery" : "Pickup"}
              </h2>
              <form onSubmit={handleConfirmOrder}>
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-lg p-2 mb-2 w-full"
                  required
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-lg p-2 mb-2 w-full"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-lg p-2 mb-2 w-full"
                  required
                />
                <input
                  type="text"
                  name="contact"
                  placeholder="Contact Number"
                  value={formData.contact}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-lg p-2 mb-2 w-full"
                  required
                />
                <input
                  type="number"
                  name="mealCount"
                  placeholder="Count"
                  value={formData.mealCount}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-lg p-2 mb-2 w-full"
                  min="1"
                  required
                />
                <p className="text-lg mb-2">
                  <strong>Total Price:</strong> $
                  {formData.totalPrice * formData.mealCount}
                </p>
                <input
                  type="hidden"
                  name="orderType"
                  value={orderType}
                />
                <div className="flex justify-between mt-4">
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                  >
                    Confirm Order
                  </button>
                  <button
                    type="button"
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                    onClick={handleCloseForm}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Close Button */}
        <button
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default MealModal;