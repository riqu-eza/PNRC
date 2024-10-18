/* eslint-disable react/prop-types */
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css"; // Import Swiper styles

const MealModal = ({ meal, onClose }) => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contact: "",
    paymentMethod: "",
    mealCount: 1,
    totalPrice: meal ? meal.Price : 0, // Ensure meal.Price is defined
    mealname: meal ? meal.DishName : "", // Ensure meal.name is defined
});


  if (!meal) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleOrderClick = () => {
    setShowForm(true);
  };

  const handleConfirmOrder = async (e) => {
    e.preventDefault();
    console.log("Order confirmed:", formData);

    try {
      const res = await fetch("http://localhost:3000/api/booking/create/meal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData, // Spread formData directly
        //   mealname: meal ? meal.Dishname : "", // Add mealname here
        }),
      });
      const data = await res.json();
      console.log("created successfully", data);
      setShowForm(false);
    } catch (error) {
      console.log("error occurred", error);
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl w-full">
        <div className="flex flex-wrap">
          {" "}
          {/* Added flex-wrap */}
          {/* Left Section: Image and Meal Info */}
          <div className="flex-1 pr-4 min-w-0">
            {" "}
            {/* Ensure it doesn't shrink */}
            <Swiper spaceBetween={10} slidesPerView={1}>
              {meal.imageUrls.length > 0 ? (
                meal.imageUrls.map((url, index) => (
                  <SwiperSlide key={index}>
                    <img
                      src={url}
                      alt={meal.DishName}
                      className="rounded-lg mb-2"
                    />
                  </SwiperSlide>
                ))
              ) : (
                <div className="w-full h-40 bg-gray-200 flex items-center justify-center rounded-lg mb-2">
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
            {" "}
            {/* Added min-w-0 */}
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
            {" "}
            {/* Added min-w-0 */}
            <h3 className="text-xl font-semibold mb-2">Order Options</h3>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition mb-2"
              onClick={handleOrderClick}
            >
              Order for Delivery
            </button>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition mb-2"
              onClick={handleOrderClick}
            >
              Order for Pickup
            </button>
          </div>
        </div>

        {/* Order Form Modal */}
        {showForm && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
              <h2 className="text-2xl font-bold mb-4">Order Form</h2>
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
              <select
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-lg p-2 mb-2 w-full"
                required
              >
                <option value="">Select Payment Method</option>
                <option value="credit-card">Credit Card</option>
                <option value="paypal">PayPal</option>
                <option value="cash">Cash</option>
              </select>
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
              <div className="flex justify-between mt-4">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                  onClick={handleConfirmOrder}
                >
                  Confirm Order
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                  onClick={handleCloseForm}
                >
                  Cancel
                </button>
              </div>
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
