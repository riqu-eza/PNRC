import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./itemlisting.css";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { useSelector } from "react-redux";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import {
  FaBath,
  FaBed,
  FaCar,
  FaLock,
  FaParking,
  FaRegCalendarAlt,
  FaSwimmer,
} from "react-icons/fa";
import {
  faEnvelope,
  faMapMarkerAlt,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Comments from "./commentsection/Comments";

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
  // const [comments, setComments] = useState([]);
  // const [newComment, setNewComment] = useState({
  //   author: "",
  //   content: "",
  //   listingid: "",
  // });

  const [formData, setFormData] = useState({
    arrivalDate: "",
    departureDate: "",
    numberOfPeople: "",
    comment: "",
  });

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
      window.alert("check your email for booking confimation ");

      console.log("Form data sent successfully!");
      // setTimeout(() => {
      //   setBookingSent(true);
      // }, 1000 );
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  const handleMapClick = (location) => {
    const [latitude, longitude] = location.split(",");

    const url = `https://www.google.com/maps?q=${latitude},${longitude}`;

    window.open(url, "_blank");
  };

  const handleinquireClick = async (event) => {
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
      console.log(text);

      if (response.ok) {
        console.log("Inquiry sent successfully!");
        window.location.href = `mailto:${listing.email}?subject=New Inquiry&body=${encodeURIComponent(text)}`;
      } else {
        console.error("Failed to send inquiry:", response.statusText);
      }

      setText("");
      const data = await response.json();
      console.log(data); // Handle success or error response from the API
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    // fetchComments();
  }, []);
  // comment functions
  // const fetchComments = async () => {
  //   try {
  //     const response = await fetch(
  //       "http://localhost:3000/api/comment/getcomment?listingId=${listingId}"
  //     );
  //     if (response.ok) {
  //       const data = await response.json();
  //       setComments(data);
  //     }
  //     setComments(response.data);
  //   } catch (error) {
  //     console.error("Error fetching comments:", error);
  //   }
  // };

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setNewComment({ ...newComment, [name]: value });
  // };

  // const handlecommentSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const listingid = listing._id;
  //     const response = await fetch("http://localhost:3000/api/comment/create", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },

  //       body: JSON.stringify({ ...newComment, listingid }),
  //     });
  //     const data = await response.json();
  //     // console.log("Comment succesefull", data);
  //     setComments(comments ? [...comments, data] : [data]);

  //     setNewComment({ author: "", content: "" });
  //   } catch (error) {
  //     console.error("Error adding comment:", error);
  //   }
  // };

  return (
    <main className="p-4 md:p-8">
      {errorMessage && (
        <p className="text-red-500 text-center">{errorMessage}</p>
      )}

      {loading && <p className="text-center my-7 text-2xl">Loading...</p>}
      {error && !loading && (
        <p className="text-center my-7 text-2xl">Something went wrong!</p>
      )}
      {listing && !error && !loading && (
        <>
          <div>
            <p className=" text-center  text-3xl md:text-4xl text-sky-500 font-extrabold listingname">
              {listing.name}
            </p>

            <div className="w-full md:w-3/4 mx-auto my-auto mt-4 mb-8">
              <Swiper navigation>
                {listing.imageUrls.map((url) => (
                  <SwiperSlide key={url}>
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
            </div>
          </div>
          <div className="flex flex-col max-w-full md:max-w-4xl mx-auto p-3 my-7 gap-4 itemcontent">
            <div className="flex flex-col gap-2">
              <p className="mt-1 text-sm sm:text-base md:text-lg font-bold text-black-600 text-center ">
                {listing.description}
              </p>

              <div className="flex items-center mt-2">
                <span className="text-blue-500 mr-2">{listing.address}</span>
                <FontAwesomeIcon
                  icon={faMapMarkerAlt}
                  className="text-blue-500 cursor-pointer"
                  onClick={() => handleMapClick(listing.location)}
                />
              </div>

              {/* <p>
              <span className="font-semibold text-black">
                What are you likely to find:{" "}
              </span>
              {listing.selectedSubcategory}
            </p> */}
              {listing.regularPrice && (
                <p className="bg-green-600 w-full max-w-[100px] text-white text-center p-1 rounded-md">
                  ${+listing.regularPrice} REG!!
                </p>
              )}

              {listing.offer && (
                <p className="bg-blue-500 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                  ${+listing.regularPrice - +listing.discountedPrice} OFF!!
                </p>
              )}

              <div className="flex flex-col gap-4">
                <div className="cursor-pointer text-blue-500 flex gap-2 hover:text-blue-700">
                  <div className=" items-center justify-center h-full" >
                    <p className="justify-center pt-2" > Reach us @</p>
                  </div>
                  <div>
                    <p className="mt-2 text-sm text-blue-500 font-bold hover:text-blue-700">
                      <FontAwesomeIcon icon={faPhone} /> - {listing.contact}
                    </p>
                    <p className="mt-2 text-sm text-blue-500 font-bold hover:text-blue-700">
                      <FontAwesomeIcon icon={faEnvelope} /> - {listing.email}
                    </p>
                  </div>
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
                    onClick={handleinquireClick}
                    className="bg-blue-500 text-white px-2 py-2 w-50px rounded hover:bg-blue-600"
                  >
                    Inquire
                  </button>
                </div>

                <ul className="text-blue-400 font-semibold text-xs sm:text-sm flex flex-wrap items-center gap-4 sm:gap-6">
                  {listing.furnished && (
                    <>
                      <li className="flex items-center gap-1 whitespace-nowrap">
                        <FaBed className="text-lg" />
                        {listing.rooms > 1
                          ? `${listing.rooms} rooms`
                          : `${listing.rooms} room`}
                      </li>
                      <li className="flex items-center gap-1 whitespace-nowrap">
                        <FaBed className="text-lg" />
                        {listing.bedrooms > 1
                          ? `${listing.bedrooms} Beds`
                          : `${listing.bedrooms} Bed`}
                      </li>
                      <li className="flex items-center gap-1 whitespace-nowrap">
                        <FaBath className="text-lg" />
                        {listing.bathrooms > 1
                          ? `${listing.bathrooms} baths`
                          : `${listing.bathrooms} bath`}
                      </li>
                    </>
                  )}
                  {listing.parking && (
                    <li className="flex items-center gap-1 whitespace-nowrap">
                      <FaParking className="text-lg" />
                      Parking Spot available
                    </li>
                  )}
                  {listing.recreation && (
                    <li className="flex items-center gap-1 whitespace-nowrap">
                      <FaSwimmer className="text-lg" />
                      Recreation Facilities available
                    </li>
                  )}
                  {listing.eventfacilities && (
                    <li className="flex items-center gap-1 whitespace-nowrap">
                      <FaRegCalendarAlt className="text-lg" />
                      Have your events here
                    </li>
                  )}
                  {listing.security && (
                    <li className="flex items-center gap-1 whitespace-nowrap">
                      <FaLock className="text-lg" />
                      You are safe here
                    </li>
                  )}
                  {listing.transportation && (
                    <li className="flex items-center gap-1 whitespace-nowrap">
                      <FaCar className="text-lg" />
                      We got you
                    </li>
                  )}
                </ul>
              </div>
            </div>

            {listing.furnished && (
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
          </div>

          {/* <div className="max-w-full md:max-w-md mx-auto bg-gray-100 p-4 rounded-md">
            <h2 className="text-xl font-bold mb-4">
              Friends, this was my experience
            </h2>
            <div className="max-h-60 overflow-y-auto">
              <ul>
                {comments && comments.length > 0 ? (
                  comments.map((comment) => (
                    <li key={comment._id} className="mb-2">
                      <strong className="text-blue-500">
                        {comment.author}
                      </strong>{" "}
                      <span className="text-gray-700">{comment.content}</span>
                    </li>
                  ))
                ) : (
                  <p className="text-gray-700">No comments available</p>
                )}
              </ul>
            </div>

            <form onSubmit={handlecommentSubmit} className="mt-4">
              <div className="mb-4">
                <textarea
                  placeholder="Add your comment here"
                  id="content"
                  name="content"
                  value={newComment.content}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                Add Comment
              </button>
            </form>
          </div> */}
          <Comments currentUser={currentUser} listingId={listing._id} />
        </>
      )}
    </main>
  );
}
