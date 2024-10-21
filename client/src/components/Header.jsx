import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect, useRef } from "react";
import "../pages/page.css";

export default function Header() {
  const [showLinks, setShowLinks] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const menuRef = useRef(null);

  // Toggle menu visibility
  const toggleLinks = () => {
    setShowLinks(!showLinks);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowLinks(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <header className="flex justify-between items-center mx-auto px-3 sm:px-6 md:px-8 lg:px-10 py-4 shadow bg-black text-white headertop">
        {/* Main visible link */}
        <Link to="/" className="text-2xl font-bold">
          Palmnazi Resort Cities
        </Link>

        {/* Always visible hamburger menu */}
        <div className="relative">
          <button className="focus:outline-none" onClick={toggleLinks}>
            {showLinks ? (
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
                  d="M6 18L18 6M6 6l12 12M6 18L18 6"
                />
              </svg>
            ) : (
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
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>

          {/* Dropdown menu for all screens */}
          {showLinks && (
            <ul
              ref={menuRef}
              className="z-20 absolute top-12 right-0 bg-white text-black p-4 rounded-md shadow-lg space-y-4 w-48"
            >
              <Link to="/" onClick={toggleLinks}>
                <li className="hover:text-blue-500 transition-colors">Home</li>
              </Link>
              <Link to="/About" onClick={toggleLinks}>
                <li className="hover:text-blue-500 transition-colors">About</li>
              </Link>
              <Link to="/resortcities" onClick={toggleLinks}>
                <li className="hover:text-blue-500 transition-colors">
                  Resort Cities
                </li>
              </Link>
              <Link to="/bussinesspage" onClick={toggleLinks}>
                <li className="hover:text-blue-500 transition-colors">
                  Business
                </li>
              </Link>
              <Link to="/blogspage" onClick={toggleLinks}>
                <li className="hover:text-blue-500 transition-colors">Blogs</li>
              </Link>
              <Link to="/getstarted" onClick={toggleLinks}>
                <li className="hover:text-blue-500 transition-colors">
                  sign-in / sign-up
                </li>
              </Link>
              {/* Show current user avatar if logged in */}
              {currentUser && (
                <Link to="/profile" onClick={toggleLinks}>
                  <li className="flex items-center gap-2 hover:text-blue-500 transition-colors">
                    <img
                      className="rounded-full h-7 w-7 object-cover"
                      src={currentUser.avatar}
                      alt="profile"
                    />
                    Profile
                  </li>
                </Link>
              )}
            </ul>
          )}
        </div>
      </header>
    </>
  );
}
