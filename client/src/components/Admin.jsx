import React from "react";
import { Link } from "react-router-dom";

const Admin = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <Link to="/createlisting" className="bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-lg flex items-center justify-center">
          Create Listing
        </Link>
        <Link to="/addimage" className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-lg flex items-center justify-center">
          Add city information
        </Link>
        <Link to="/addblog" className="bg-yellow-500 hover:bg-yellow-600 text-white p-4 rounded-lg flex items-center justify-center">
          Add Blog
        </Link>
        <Link to="/addcity" className="bg-purple-500 hover:bg-purple-600 text-white p-4 rounded-lg flex items-center justify-center">
          Add Resort City
        </Link>
      </div>
    </div>
  );
};

export default Admin;
