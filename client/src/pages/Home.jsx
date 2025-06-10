/* eslint-disable react/prop-types */
import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

// Swiper (if you need it)
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
SwiperCore.use([Navigation]);
import "swiper/css/bundle";

// Images

export default function Home() {
  const { currentUser } = useSelector((state) => state.user);
  const [showLinks, setShowLinks] = useState(false);

  const toggleLinks = () => setShowLinks((prev) => !prev);

  return (
    <div className="bgimage relative bg-cover bg-center min-h-screen">
      {/* NAV HEADER */}
      <header className="fixed top-0 left-0 w-full m-4 z-50 bg-transparent">
        <div className="relative flex justify-center items-center">
          {/* NAV LINKS */}
          <ul
            className={`
              flex items-center gap-6
              ${showLinks ? "flex-col items-start" : "hidden"}
              sm:flex sm:flex-row sm:justify-center sm:gap-6
            `}
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
                sign~up
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
          </ul>

          {/* HAMBURGER / X ICON (small screens only) */}
          <button
            onClick={toggleLinks}
            className="sm:hidden text-red-700 text-lg z-50 absolute right-4 top-4"
            aria-label="Toggle menu"
          >
            {showLinks ? (
              // "X" icon
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              // Hamburger icon
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
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
            )}
          </button>

          {/* Small-Screen Slide-In Menu */}
          {showLinks && (
           <div className="sm:hidden fixed top-0 left-0 w-2/3 h-auto bg-gradient-to-b from-gray-900 to-gray-800 text-white flex flex-col pt-6 pb-6 rounded-tr-lg shadow-lg transition-transform duration-300 ease-in-out">
           {/* Navigation Links */}
           <ul className="flex flex-col gap-6 px-6">
             <Link to="/" onClick={toggleLinks}>
               <li className="flex items-center gap-4 text-lg hover:text-cyan-400 transition duration-300 ease-in-out">
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
                     d="M3 10h18M9 21H7a4 4 0 01-4-4V7a4 4 0 014-4h10a4 4 0 014 4v10a4 4 0 01-4 4h-2"
                   />
                 </svg>
                 Home
               </li>
             </Link>
             <Link to="/About" onClick={toggleLinks}>
               <li className="flex items-center gap-4 text-lg hover:text-cyan-400 transition duration-300 ease-in-out">
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
                     d="M12 8c1.5 0 3 .5 3 2.5S13.5 14 12 14s-3-.5-3-2.5S10.5 8 12 8z"
                   />
                 </svg>
                 About
               </li>
             </Link>
             <Link to="/resortcities" onClick={toggleLinks}>
               <li className="flex items-center gap-4 text-lg hover:text-cyan-400 transition duration-300 ease-in-out">
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
                     d="M3 15h6m6 0h6M9 15V9m6 6v-6M3 9h6m6 0h6M3 21v-6m6 6v-6m6 6v-6m6 6v-6"
                   />
                 </svg>
                 Resort Cities
               </li>
             </Link>
             <Link to="/bussinesspage" onClick={toggleLinks}>
               <li className="flex items-center gap-4 text-lg hover:text-cyan-400 transition duration-300 ease-in-out">
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
                     d="M8 16l-3-3 3-3m8 6l3-3-3-3M3 12h18"
                   />
                 </svg>
                 Business
               </li>
             </Link>
             <Link to="/blogspage" onClick={toggleLinks}>
               <li className="flex items-center gap-4 text-lg hover:text-cyan-400 transition duration-300 ease-in-out">
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
                     d="M4 4v16h16V4H4z"
                   />
                 </svg>
                 Blogs
               </li>
             </Link>
             <Link to="/getstarted" onClick={toggleLinks}>
               <li className="flex items-center gap-4 text-lg hover:text-cyan-400 transition duration-300 ease-in-out">
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
                     d="M10 12h4m0 0h-4m0 0v-4m0 4v4m6-4a6 6 0 11-12 0 6 6 0 0112 0z"
                   />
                 </svg>
                 Sign~up
               </li>
             </Link>
         
             {currentUser && (
               <Link to="/profile" onClick={toggleLinks}>
                 <li className="mt-4">
                   <img
                     className="rounded-full h-12 w-12 object-cover border-2 border-cyan-400"
                     src={currentUser.avatar}
                     alt="Profile"
                   />
                 </li>
               </Link>
             )}
           </ul>
         </div>
         
          
          )}
          </div>
        </header>

      {/* Dark overlay */}
      <div className="bg-black opacity-60 min-h-screen">
        {/* Main container */}
        <div className="relative z-10 flex flex-col  justify-center items-center gap-2 px-3 max-w-screen mx-auto bg-cover bg-center h-screen">
          {/* Small-Screen Logo (90x90) */}
          <div className="block sm:hidden ">
            <img
              src="/images/officiallogo.png"
            
              alt="Logo"
              className="w-130 h-130 object-contain mx-auto"
            />
          </div>

          {/* Large-Screen Logo (150x150) */}
          <div className="hidden sm:block absolute w-[400px] h-[400px] -left-2 top-[40%] transform -translate-y-1/2">
            <img
              src="/images/officiallogo.png"
              alt="Logo"
              className="w-full h-full object-contain"
            />
          </div>

          {/* Headings */}
          <div className="relative flex flex-col items-center justify-center mt-2 sm:mt-0">
            <h1 className="text-center text-3xl sm:text-4xl md:text-3xl lg:text-6xl tracking-[4px] sm:tracking-[6px] md:tracking-[8px] lg:tracking-[25px] text-[rgb(41,214,236)] main-text1">
              PALMNAZI RC
            </h1>
            <h1 className="text-center text-lg sm:text-xl md:text-2xl lg:text-3xl tracking-[0.5px] sm:tracking-[1px] md:tracking-[1.5px] lg:tracking-[5px] font-extrabold text-white main-text mt-2">
              Discover Magical Destinations
            </h1>
          </div>

          {/* Discover Button */}
          <Link to="/resortcities" className="text-center">
            <button className="button">
              DISCOVER
              <div className="hoverEffect">
                <div></div>
              </div>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
