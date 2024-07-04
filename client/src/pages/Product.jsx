import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaStar } from "react-icons/fa";

const Product = () => {
  const { productId } = useParams();
  const [productData, setProductData] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ rating: 0, comment: "" });
  const [message, setMessage] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/business/product/${productId}`
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProductData(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [productId]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/reviews/${productId}`
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setReviews(data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, [productId]);

  const handleReviewChange = (e) => {
    setNewReview({ ...newReview, [e.target.name]: e.target.value });
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/api/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...newReview, productId })
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setReviews([...reviews, data]);
      setNewReview({ rating: 0, comment: "" });
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  const handleChatOpen = () => setIsChatOpen(!isChatOpen);

  const handleSendMessage = () => {
    // Implement the chat message sending logic here
    console.log("Message sent:", message);
    setMessage("");  // Clear the input after sending
  };

  if (!productData) {
    return <p>Loading...</p>;
  }

  const { product, businessDetails } = productData;

  return (
    <div className="p-4 max-w-screen-lg mx-auto">
      <div className="flex flex-col lg:flex-row">
        {/* Product Images and Rating */}
        <div className="w-full lg:w-1/2 flex flex-col items-center">
          <img
            src={product.productImage[0]}
            alt={product.productName}
            className="w-full h-80 object-contain mb-2 rounded-lg shadow-md"
          />
          <div className="flex space-x-2 overflow-x-auto">
            {product.productImage.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={product.productName}
                className="w-24 h-24 object-cover rounded-lg border cursor-pointer"
              />
            ))}
          </div>
          {/* Ratings and Reviews */}
          <div className="mt-4 w-full">
            <div className="flex items-center justify-center">
              <FaStar className="text-yellow-500" />
              <span className="ml-2 text-lg">4.5/5 (20 Reviews)</span>
            </div>
            <p className="text-sm mt-2 text-center">Check out what others are saying about this product.</p>

            {/* Display Reviews */}
            <div className="mt-4">
              {reviews.map((review, index) => (
                <div key={index} className="mb-4 p-2 border rounded-lg">
                  <div className="flex items-center">
                    <FaStar className={`text-${review.rating >= 1 ? 'yellow' : 'gray'}-500`} />
                    <FaStar className={`text-${review.rating >= 2 ? 'yellow' : 'gray'}-500`} />
                    <FaStar className={`text-${review.rating >= 3 ? 'yellow' : 'gray'}-500`} />
                    <FaStar className={`text-${review.rating >= 4 ? 'yellow' : 'gray'}-500`} />
                    <FaStar className={`text-${review.rating >= 5 ? 'yellow' : 'gray'}-500`} />
                    <span className="ml-2 text-lg">{review.comment}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Submit New Review */}
            <form onSubmit={handleReviewSubmit} className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Write a Review</h3>
              <div className="flex items-center mb-2">
                <label htmlFor="rating" className="mr-2">Rating:</label>
                <select
                  id="rating"
                  name="rating"
                  value={newReview.rating}
                  onChange={handleReviewChange}
                  className="border p-1 rounded"
                >
                  <option value="0">Select Rating</option>
                  <option value="1">1 Star</option>
                  <option value="2">2 Stars</option>
                  <option value="3">3 Stars</option>
                  <option value="4">4 Stars</option>
                  <option value="5">5 Stars</option>
                </select>
              </div>
              <textarea
                name="comment"
                value={newReview.comment}
                onChange={handleReviewChange}
                rows="4"
                className="w-full p-2 border border-gray-300 rounded-lg mb-2"
                placeholder="Write your review here..."
              ></textarea>
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded-lg"
              >
                Submit Review
              </button>
            </form>
          </div>
        </div>

        {/* Product Details and Business Details */}
        <div className="w-full lg:w-1/2 lg:pl-4">
          <h1 className="text-3xl font-bold mb-2">{product.productName}</h1>
          <p className="text-lg text-green-600 font-semibold mb-4">{product.productPrice}</p>
          <p className="text-base mb-4">{product.productDescription}</p>

          {/* Business Details */}
          <div className="p-4 border rounded-lg bg-gray-100 mb-4">
            <h2 className="text-xl font-semibold mb-2">Business Details</h2>
            <p className="flex items-center mb-2">
              <FaMapMarkerAlt className="mr-2 text-blue-500" />
              {businessDetails.address}
            </p>
            <p className="flex items-center mb-2">
              <FaPhoneAlt className="mr-2 text-green-500" />
              {businessDetails.contact}
            </p>
            <p className="flex items-center mb-2">
              <FaEnvelope className="mr-2 text-red-500" />
              {businessDetails.email}
            </p>
            <p className="mb-2">{businessDetails.description}</p>
            <a
              href={`https://www.google.com/maps?q=${businessDetails.location}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              View on Google Maps
            </a>
          </div>
        </div>
      </div>

      {/* Chat Feature */}
      <div className="mt-4">
        <button
          onClick={handleChatOpen}
          className="bg-blue-500 text-white py-2 px-4 rounded-lg mb-4"
        >
          {isChatOpen ? "Close Chat" : "Chat with Us"}
        </button>

        {isChatOpen && (
          <div className="fixed bottom-4 right-4 bg-white border rounded-lg shadow-lg p-4 max-w-sm w-full">
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">Chat with Us</h3>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows="4"
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="Type your message here..."
              ></textarea>
            </div>
            <button
              onClick={handleSendMessage}
              className="bg-green-500 text-white py-2 px-4 rounded-lg"
            >
              Send
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Product;
