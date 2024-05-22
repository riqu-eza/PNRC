import { FaSearch } from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import "../pages/page.css";

export default function Header() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showLinks, setShowLinks] = useState(false);
  const { currentUser } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const location = useLocation();

  const toggleLinks = () => {
    setShowLinks(!showLinks);
  };

  return (
    <header  >
    <div className="flex justify-between items-center max-w-6xl mx-auto p-3 bg-blue-500 rounded-xl">
      <Link to="/" className="logo" >
        <img src="" ></img>
      </Link>
      <ul
        className={`flex gap-4 sm:flex hidden ${showLinks ? "flex-col" : "hidden"}`}

      >
        <Link to="/">
          <li className="text-white no-underline px-2 text-xl transition duration-300 ease-in-out bg-transparent hover:bg-blue-600 ">
            Home
          </li>
        </Link>
        <Link to="/About">
          <li className="text-white no-underline px-2 text-xl transition duration-300 ease-in-out bg-transparent hover:bg-blue-600 ">
            About
          </li>
        </Link>
        <Link to="/resortcities">
          <li className="text-white no-underline px-2 text-xl transition duration-300 ease-in-out bg-transparent hover:bg-blue-600 ">
            Resortcities
          </li>
        </Link>
        <Link to="/bussinesspage">
          <li className="text-white no-underline px-2 text-xl transition duration-300 ease-in-out bg-transparent hover:bg-blue-600 ">
            Bussiness
          </li>
        </Link>
        <Link to="/blogspage">
          <li className="text-white no-underline px-2 text-xl transition duration-300 ease-in-out bg-transparent hover:bg-blue-600 ">
            Blogs
          </li>
        </Link>
        <Link to="/getstarted">
          <li className="text-white no-underline px-2 text-xl transition duration-300 ease-in-out bg-transparent hover:bg-blue-600 ">
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
          ) : (<></>)}
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
  );
}
