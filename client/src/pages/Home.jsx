import { useState } from "react";
import { Link } from "react-router-dom";
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

  const toggleLinks = () => {
    setShowLinks(!showLinks);
  };

  return (
    <div className="bgimage relative  bg-cover bg-center min-h-screen ">
      <header className="fixed top-0 left-0 w-full  m-4  z-50 bg-transparent">
        <div className="flex justify-between items-center max-w-6xl mx-auto p-4">
          <Link to="/" className="">
            <img src={logo} alt="Official Logo" className="h-16 w-auto" />
          </Link>
          <ul
            className={`flex items-center gap-6 ${showLinks ? "flex-col" : "hidden"} sm:flex`}
          >
            <Link to="/">
              <li className="text-cyan-400 text-lg hover:text-white transition duration-300 ease-in-out">
                Home
              </li>
            </Link>
            <Link to="/About">
              <li className="text-cyan-400 text-lg hover:text-white transition duration-300 ease-in-out">
                About
              </li>
            </Link>
            <Link to="/resortcities">
              <li className="text-cyan-400 text-lg hover:text-white transition duration-300 ease-in-out">
                Resort Cities
              </li>
            </Link>
            <Link to="/bussinesspage">
              <li className="text-cyan-400 text-lg hover:text-white transition duration-300 ease-in-out">
                Business
              </li>
            </Link>
            <Link to="/blogspage">
              <li className="text-cyan-400 text-lg hover:text-white transition duration-300 ease-in-out">
                Blogs
              </li>
            </Link>
            <Link to="/getstarted">
              <li className="text-cyan-400 text-lg hover:text-white transition duration-300 ease-in-out">
                Get Started
              </li>
            </Link>
            {currentUser && (
              <Link to="/profile">
                <img
                  className="rounded-full h-8 w-8 object-cover"
                  src={currentUser.avatar}
                  alt="Profile"
                />
              </Link>
            )}
            <li className="text-white text-lg sm:hidden" onClick={toggleLinks}>
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
      <div className="bg-black opacity-70 ">
        <div className="relative z-10 flex flex-col pt-6 justify-center align-middle gap-6  px-3 max-w-screen mx-auto bg-cover bg-center h-screen  ">
          <div className=" relative flex flex-col items-center justify-center mt-36 ml-24 ">
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
