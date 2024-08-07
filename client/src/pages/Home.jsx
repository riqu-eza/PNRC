import { useState } from "react";
import { Link } from "react-router-dom";
import "../pages/page.css";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import { useSelector } from "react-redux";
import logo from "../imgaes/officiallogo.png";
<style></style>;
// import "./Page.css";
// import Bk from "../imges/Homebackground.jpg"

export default function Home() {
  SwiperCore.use([Navigation]);
  const { currentUser } = useSelector((state) => state.user);

  const [showLinks, setShowLinks] = useState(false);

  // useEffect(() => {
  //   const fetchOfferListings = async () => {
  //     try {
  //       const res = await fetch("/api/listing/get?offer=true&limit=4");
  //       const data = await res.json();
  //       setOfferListings(data);
  //       fetchRentListings();
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   const fetchRentListings = async () => {
  //     try {
  //       const res = await fetch("/api/listing/get?type=rent&limit=4");
  //       const data = await res.json();
  //       setRentListings(data);
  //       fetchSaleListings();
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   const toggleLinks = () => {
  //     setShowLinks(!showLinks);
  //   };
  //   const fetchSaleListings = async () => {
  //     try {
  //       const res = await fetch("/api/listing/get?type=sale&limit=4");
  //       const data = await res.json();
  //       setSaleListings(data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   fetchOfferListings();
  // }, []);
  const toggleLinks = () => {
    setShowLinks(!showLinks);
  };

  return (
    <div className="bgimage relative  ">
      <div className="bg-black opacity-60 ">
        <header>
          <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
            <Link to="/" className="">
              <img src=""></img>
            </Link>
            <ul
              className={` gap-4 sm:flex hidden ${showLinks ? "flex-col" : "hidden"}`}
            >
              <Link to="/">
                <li className="text-[rgb(41,214,236)]  no-underline px-2 text-xl transition duration-300 ease-in-out bg-transparent hover:underline ">
                  Home
                </li>
              </Link>
              <Link to="/About">
                <li className="text-[rgb(41,214,236)]  no-underline px-2 text-xl transition duration-300 ease-in-out bg-transparent hover:underline ">
                  About
                </li>
              </Link>
              <Link to="/resortcities">
                <li className="text-[rgb(41,214,236)]  no-underline px-2 text-xl transition duration-300 ease-in-out bg-transparent hover:underline">
                  Resortcities
                </li>
              </Link>
              <Link to="/bussinesspage">
                <li className="text-[rgb(41,214,236)]  no-underline px-2 text-xl transition duration-300 ease-in-out bg-transparent hover:underline ">
                  Bussiness
                </li>
              </Link>
              <Link to="/blogspage">
                <li className="text-[rgb(41,214,236)]   no-underline px-2 text-xl transition duration-300 ease-in-out bg-transparent hover:underline ">
                  Blogs
                </li>
              </Link>
              <Link to="/getstarted">
                <li className="text-[rgb(41,214,236)]   no-underline px-2 text-xl transition duration-300 ease-in-out bg-transparent hover:underline">
                  Get Started
                </li>
              </Link>
              {/* <Link to="/admin">
              <li className="text-white no-underline px-2 text-xl transition duration-300 ease-in-out bg-transparent hover:bg-blue-600 ">
                admin
              </li>
            </Link> */}
              <Link to="/profile">
                {currentUser ? (
                  <img
                    className="rounded-full h-7 w-7 object-cover hidden sm:block"
                    src={currentUser.avatar}
                    alt="profile"
                  />
                ) : (
                  <></>
                )}
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

        <div className="relative z-10 flex flex-col pt-6 justify-center gap-6 py-28 px-3 max-w-6xl mx-auto bg-cover bg-center min-h-screen  ">
          <div className=" relative flex flex-col items-center">
            <div className="block absolute w-[400px] h-[400px] -left-[30px] -top-[250px] sm:w-[350px] sm:h-[350px] sm:-left-[50px] sm:-top-[60%] lg:w-[500px] lg:h-[500px] lg:-left-[140px] lg:-top-[180px]">
              <img src={logo} alt="Logo" />
            </div>

            <h1 className="text-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-[4px] sm:tracking-[6px] md:tracking-[8px] lg:tracking-[25px] text-[rgb(41,214,236)] main-text1">
              PALMNAZI RC
            </h1>
            <h1 className="text-center text-lg sm:text-xl md:text-2xl lg:text-3xl tracking-[0.5px] sm:tracking-[1px] md:tracking-[1.5px] lg:tracking-[5px] font-extrabold text-white main-text">
              Discover Magical Destinations
            </h1>
          </div>
          <Link to={"/resortcities"} className="text-center">
            <button className="button">
              DISCOVER
              <div className="hoverEffect">
                <div></div>
              </div>
            </button>
            {/* Let&#39;s get started... */}
          </Link>
        </div>
      </div>
    </div>
  );
}
