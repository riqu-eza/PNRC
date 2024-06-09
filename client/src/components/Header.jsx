// import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import "../pages/page.css";

export default function Header() {
  // const [searchTerm, setSearchTerm] = useState("");
  const [showLinks, setShowLinks] = useState(false);
  const { currentUser } = useSelector((state) => state.user);

  // const navigate = useNavigate();
  // const location = useLocation();

  const toggleLinks = () => {
    setShowLinks(!showLinks);
  };

  return (
    <header className=" flex justify-between  mx-auto px-3 sm:6 md:px-8 lg:px-10 py-4 shadow bg-grey-300 ">
      <Link to="/" className=" sm:text-2xl" >
        <h1>Palmnazi Resortities</h1>
      </Link>
      <ul
        className="hidden sm:flex justify-between items-center text-lg gap-6"

      >
        <Link to="/">
          <li className="text-black no-underline  transition duration-300 ease-in-out bg-transparent hover:underline ">
            Home
          </li>
        </Link>
        <Link to="/About">
          <li className="text-black no-underline   transition duration-300 ease-in-out bg-transparent hover:underline">
            About
          </li>
        </Link>
        <Link to="/resortcities">
          <li className="text-black no-underline   transition duration-300 ease-in-out bg-transparent hover:underline ">
            Resortcities
          </li>
        </Link>
        <Link to="/bussinesspage">
          <li className="text-black no-underline   transition duration-300 ease-in-out bg-transparent hover:underline ">
            Bussiness
          </li>
        </Link>
        <Link to="/blogspage">
          <li className="text-black no-underline  transition duration-300 ease-in-out bg-transparent hover:underline ">
            Blogs
          </li>
        </Link>
        <Link to="/getstarted">
          <li className="text-black no-underline   transition duration-300 ease-in-out bg-transparent hover:underline">
            Get Started
          </li>
        </Link>
        {/* <Link to="/admin">
          <li className="text-white no-underline px-2  transition duration-300 ease-in-out bg-transparent hover:bg-blue-600 ">
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
    </header>
  );
}
