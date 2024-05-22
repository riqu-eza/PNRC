// src/components/Footer.jsx

import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-blue-400 text-white py-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-center items-center text-center md:text-center space-y-6 md:space-y-0">
        {/* Left Section */}
        <div className="w-full md:w-1/2 px-4">
          <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
          <p className="mb-2">123 Main Street, City, Country</p>
          <p className="mb-2">Email: example1@example.com</p>
          <p className="mb-2">Email: example2@example.com</p>
          <div className="flex justify-center md:justify-start space-x-4">
            <a href="https://www.facebook.com" className="hover:text-gray-400">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://www.twitter.com" className="hover:text-gray-400">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://www.instagram.com" className="hover:text-gray-400">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://www.linkedin.com" className="hover:text-gray-400">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>
        
        {/* Vertical Line */}
        <div className="hidden md:block w-px h-32 bg-gray-600 mx-4"></div>

        {/* Right Section */}
        <div className="w-full md:w-1/2 px-4">
          <h3 className="text-lg font-semibold mb-2">Palmnazi</h3>
          <ul className="mb-4">
            <li className="mb-1">
              <Link to="/" className="hover:text-gray-400">Home</Link>
            </li>
            <li className="mb-1">
              <Link to="/about" className="hover:text-gray-400">About</Link>
            </li>
            <li className="mb-1">
              <Link to="/services" className="hover:text-gray-400">Services</Link>
            </li>
          </ul>
          <h3 className="text-lg font-semibold mb-2">Supporters</h3>
          <ul className='flex text-center'>
            <li className="mb-1">
              <Link to="/supporter1" className="hover:text-gray-400">Supporter 1</Link>
            </li>
            <li className="mb-1">
              <Link to="/supporter2" className="hover:text-gray-400">Supporter 2</Link>
            </li>
            <li className="mb-1">
              <Link to="/supporter3" className="hover:text-gray-400">Supporter 3</Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
