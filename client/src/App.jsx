import { BrowserRouter, Routes, Route, } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Profile from "./pages/Profile";
import About from "./pages/About";
import PrivateRoute from "./components/PrivateRoute";
import CreateListing from "./pages/CreateListing";
import UpdateListing from "./pages/UpdateListing";
import Bussinesspage from "./pages/bussinesspage";
import ListingsByCounty from "./pages/Listingbycounty";
import Countylisting from "./pages/countylisting";
import Bloglisting from "./pages/bloglisting";
import Itemlisting from "./pages/Itemlisting";
import AdminImageUploadPage from "./components/AdminImagesCreate";
import Categorysearch from "./pages/Categorysearch";
import Search from "./pages/Search";
import Blogs from "./pages/Blogs";
import Admin from "./components/Admin";
import City from "./pages/city";
import Footer from "./components/Footer";
import AppLayout from "./components/Applayout";
import { UserProvider } from "./components/Adminuser";
import CreateBusinessListing from "./components/businessadmin";
// import Adminblog from "./components/bloglisting";

export default function App() {

  return (

    <UserProvider>

      < BrowserRouter >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route element={<AppLayout />} >
            <Route path="/getstarted" element={<SignUp />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} > </Route>
            <Route path="/bussinesspage" element={<Bussinesspage />} />
            <Route path="/about" element={<About />} />
            <Route path="/resortcities" element={<ListingsByCounty />} />
            <Route path="/listings/:county" element={< Countylisting />}></Route>
            <Route path="/blogspage" element={<Blogs />} ></Route>
            <Route path="/listing/:listingId" element={<Itemlisting />} />
            <Route path="/addimage" element={<AdminImageUploadPage />} ></Route>
            <Route path="/listings/:county/:categoryname" element={<Categorysearch />} />
            <Route path="/search" element={<Search />} ></Route>
            <Route path="/addcity" element={<City />}></Route>
            <Route path="/admin" element={<Admin />} ></Route>
            <Route path="/addblog" element={<Bloglisting />} ></Route>
            <Route path="/createlisting" element={<CreateListing />} />
            <Route path="/link1" element={<CreateBusinessListing/>} ></Route>
          </Route>
          {/* <Route path="/listing/:listingId" element={<Listing />} /> */}
          <Route element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/create-listing" element={<CreateListing />} />
            <Route
              path="/update-listing/:listingId"
              element={<UpdateListing />}
            />
          </Route>
        </Routes>
        <Footer />
      </BrowserRouter >
    </UserProvider>
  );
}
