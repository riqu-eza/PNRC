import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../pages/page.css";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import ListingItem from "../components/ListingItem";
import { useSelector } from "react-redux";
<style>
  
</style>;
// import "./Page.css";
// import Bk from "../imges/Homebackground.jpg"

export default function Home() {
  SwiperCore.use([Navigation]);
  const { currentUser } = useSelector((state) => state.user);

  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  const [showLinks, setShowLinks] = useState(false);

  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch("/api/listing/get?offer=true&limit=4");
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchRentListings = async () => {
      try {
        const res = await fetch("/api/listing/get?type=rent&limit=4");
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };
    const toggleLinks = () => {
      setShowLinks(!showLinks);
    };
    const fetchSaleListings = async () => {
      try {
        const res = await fetch("/api/listing/get?type=sale&limit=4");
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOfferListings();
  }, []);
  const toggleLinks = () => {
    setShowLinks(!showLinks);
  };

  return (
    <div className="bg-image relative ">
      <header className="bg-transparent-800 ">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/" className="logo" >
          <img src="" ></img>
        </Link>
        <ul
          className={`flex gap-4 sm:flex hidden ${showLinks ? "flex-col" : "hidden"}`}
        >
          <Link to="/">
            <li className="text-white no-underline px-2 text-lg transition duration-300 ease-in-out bg-transparent hover:text-blue-500 hover:text-lg">
              Home
            </li>
          </Link>
          <Link to="/About">
            <li className="text-white no-underline px-2 text-lg transition duration-300 ease-in-out bg-transparent hover:text-blue-400 hover:text-lg">
              About
            </li>
          </Link>
          <Link to="/resortcities">
            <li className="text-white no-underline px-2 text-lg transition duration-300 ease-in-out bg-transparent hover:text-blue-400 hover:text-lg">
              Resortcities
            </li>
          </Link>
          <Link to="/bussinesspage">
            <li className="text-white no-underline px-2 text-lg transition duration-300 ease-in-out bg-transparent hover:text-blue-400 hover:text-lg">
              Bussiness
            </li>
          </Link>
          <Link to="/blogspage">
            <li className="text-white no-underline px-2 text-lg transition duration-300 ease-in-out bg-transparent hover:text-blue-400 hover:text-lg">
              Blogs
            </li>
          </Link>
          <Link to="/getstarted">
            <li className="text-white no-underline px-2 text-lg transition duration-300 ease-in-out bg-transparent hover:text-blue-400 hover:text-lg">
              Get Started
            </li>
          </Link>
          <Link to="/admin">
            <li className="text-white no-underline px-2 text-lg transition duration-300 ease-in-out bg-transparent hover:text-blue-400 hover:text-lg">
              admin
            </li>
          </Link>
          <Link to="/profile">
            {currentUser ? (
              <img
                className="rounded-full h-7 w-7 object-cover hidden sm:block"
                src={currentUser.avatar}
                alt="profile"
              />
            ) :(<></>)}
          </Link>
          <li
            className="text-white no-underline px-2 text-lg transition duration-300 ease-in-out bg-transparent hover:text-blue-400 hover:text-lg sm:hidden"
            onClick={toggleLinks}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </li>
        </ul>
      </div>
    </header>
      <div className="absolute inset-0 bg-gray-900 opacity-50 pointer-events-none"></div>
      <div className="relative z-10 flex flex-col gap-6 py-28 px-3 max-w-6xl mx-auto bg-cover bg-center">
        <h1 className="main-text1">PALMNAZI RC</h1>
        <h1 className="main-text ">Discover Magical Destinations</h1>

        <Link to={"/resortcities"} className="text-center">
          <button class="button">
            DISCOVER
            <div class="hoverEffect">
              <div></div>
            </div>
          </button>
          {/* Let&#39;s get started... */}
        </Link>
      </div>
      {/* <Swiper navigation>
        {offerListings &&
          offerListings.length > 0 &&
          offerListings.map((listing) => (
            // eslint-disable-next-line react/jsx-key
            <SwiperSlide>
              <div
                style={{
                  background: `url(${listing.imageUrls[0]}) center no-repeat`,
                  backgroundSize: "cover",
                }}
                className="h-[500px]"
                key={listing._id}
              ></div>
            </SwiperSlide>
          ))}
      </Swiper> */}
      {/* <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10">
        {offerListings && offerListings.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">
                Recent offers
              </h2>
              <Link
                className="text-sm text-blue-800 hover:underline"
                to={"/search?offer=true"}
              >
                Show more offers
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {offerListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {rentListings && rentListings.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">
                Recent places for rent
              </h2>
              <Link
                className="text-sm text-blue-800 hover:underline"
                to={"/search?type=rent"}
              >
                Show more places for rent
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {rentListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {saleListings && saleListings.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">
                Recent places for sale
              </h2>
              <Link
                className="text-sm text-blue-800 hover:underline"
                to={"/search?type=sale"}
              >
                Show more places for sale
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {saleListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>  */}
    </div>
  );
}
