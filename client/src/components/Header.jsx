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
    <>
      <header className=" flex justify-between  mx-auto px-3 sm:6 md:px-8 lg:px-10 py-4 shadow bg-black text-white headertop ">
        <Link to="/" className=" sm:text-2xl">
          <h1>Palmnazi Resort cities</h1>
        </Link>
        <div className="md:hidden">
          {showLinks ? (
            <button className="" onClick={toggleLinks}>
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
                  d="M6 18L18 6M6 6l12 12M6 18L18 6"
                />
              </svg>
            </button>
          ) : (
            <button className="" onClick={toggleLinks}>
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
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          )}
        </div>
        <ul className="hidden md:flex text-lg gap-6">
          <Link to="/">
            <li className="hidden md:inline  no-underline  transition duration-300 ease-in-out bg-transparent hover:underline ">
              Home
            </li>
          </Link>
          <Link to="/About">
            <li className="hidden md:inline  no-underline   transition duration-300 ease-in-out bg-transparent hover:underline">
              About
            </li>
          </Link>
          <Link to="/resortcities">
            <li className="hidden md:inline  no-underline   transition duration-300 ease-in-out bg-transparent hover:underline ">
              Resortcities
            </li>
          </Link>
          <Link to="/bussinesspage">
            <li className="hidden md:inline  no-underline   transition duration-300 ease-in-out bg-transparent hover:underline ">
              Business
            </li>
          </Link>
          <Link to="/blogspage">
            <li className="hidden md:inline  no-underline  transition duration-300 ease-in-out bg-transparent hover:underline ">
              Blog
            </li>
          </Link>
          <Link to="/getstarted">
            <li className="hidden md:inline  no-underline   transition duration-300 ease-in-out bg-transparent hover:underline">
              Get Started
            </li>
          </Link>
          {/* <Link to="/admin">
          <li className="hidden md:inline text-white no-underline px-2  transition duration-300 ease-in-out bg-transparent hover:bg-blue-600 ">
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
        </ul>
      </header>
      {showLinks && (
        <ul className="z-20 absolute top-12 right-0 md:hidden flex flex-col bg-white p-3 shadow-md mx-1 text-lg gap-6">
        <Link to="/" onClick={toggleLinks}>
          <li className="text-black no-underline  transition duration-300 ease-in-out bg-transparent hover:underline ">
            Home
          </li>
        </Link>
        <Link to="/About" onClick={toggleLinks}>
          <li className="text-black no-underline   transition duration-300 ease-in-out bg-transparent hover:underline">
            About
          </li>
        </Link>
        <Link to="/resortcities" onClick={toggleLinks}>
          <li className="text-black no-underline   transition duration-300 ease-in-out bg-transparent hover:underline ">
            Resortcities
          </li>
        </Link>
        <Link to="/bussinesspage" onClick={toggleLinks}>
          <li className="text-black no-underline   transition duration-300 ease-in-out bg-transparent hover:underline ">
            Business
          </li>
        </Link>
        <Link to="/blogspage" onClick={toggleLinks}>
          <li className="text-black no-underline  transition duration-300 ease-in-out bg-transparent hover:underline ">
            Blogs
          </li>
        </Link>
        <Link to="/getstarted" onClick={toggleLinks}>
          <li className="text-black no-underline   transition duration-300 ease-in-out bg-transparent hover:underline">
            Get Started
          </li>
        </Link>
        {/* <Link to="/admin" onClick={toggleLinks}>
        <li className="text-white no-underline px-2  transition duration-300 ease-in-out bg-transparent hover:bg-blue-600 ">
          admin
        </li>
      </Link> */}
        {/* <Link to="/profile" onClick={toggleLinks}>
          {currentUser ? (
            <img
              className="rounded-full h-7 w-7 object-cover hidden sm:block"
              src={currentUser.avatar}
              alt="profile"
            />
          ) : (
            <></>
          )}
        </Link> */}
      </ul>
      )}
    </>
  );
}
