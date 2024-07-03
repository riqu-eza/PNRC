// src/components/Footer.jsx

import  { useState } from 'react';
import {  } from 'react-router-dom';
import "./footer.css";
import {  FaFacebook, FaInstagram, FaLinkedin,  FaTwitter } from 'react-icons/fa';
const Footer = () => {
  const [form, setForm] = useState({ name: "", email: "" });

  const handlesubscribe = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/api/letter/create', {
        method: "post",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify(form)
      });
      const data = await response.json();
      console.log("Post created", data);
      window.alert('subscribed');

    } catch (error) {
      console.error("Error creating post:", error)
    }
    setForm({ name:"", email:''});
  };
  const handleChange = (event) => {
    const { id, value } = event.target;
    setForm(prevForm => ({
      ...prevForm,
      [id]: value
    }));
  };
  return (
    <footer className="bg-blue-400 text-white p-8 footer">
  <div className="container mx-auto">
    {/* Newsletter Subscription Section */}
    <div className="text-center mb-12">
      <h1 className="text-3xl mb-4">Subscribe to our newsletter to get updates and new trends!</h1>
      <p className="text-gray-300 mb-8">Join Our Database NOW</p>
      <form action="" onSubmit={handlesubscribe} className="flex flex-col md:flex-row justify-center items-center">
        <input
          type="text"
          id="name"
          placeholder="Name"
          value={form.name}
          className="m-2 px-4 py-2 w-full md:w-64 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
          onChange={handleChange}
        />
        <input
          type="email"
          id="email"
          placeholder="Email Address"
          value={form.email}
          className="m-2 px-4 py-2 w-full md:w-64 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
          onChange={handleChange}
        />
        <button
          type="submit"
          className="m-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-600"
        >
          Subscribe
        </button>
      </form>
    </div>

    {/* Footer Sections */}
    <div className="flex flex-col md:flex-row justify-center items-start md:items-center text-center md:text-left">
      {/* Left Section */}
      <div className="w-full md:w-1/3 px-4 mb-6 md:mb-0">
        <div className="flex flex-col md:flex-row items-center md:items-start">
          {/* <FaPhone className="text-blue-600 text-2xl mr-2" /> */}
          <div>
            <h3 className="text-lg font-semibold mb-1">Gives Us a Call</h3>
            <p className="text-gray-300">+254 - 794369806</p>
          </div>
        </div>
      </div>

      {/* Vertical Line */}
      <div className="hidden md:block w-px h-32 bg-gray-600 mx-4"></div>

      {/* Center Section */}
      <div className="w-full md:w-1/3 px-4 mb-6 md:mb-0">
        <h3 className="text-lg font-semibold mb-2">Come & Drop By</h3>
        <p>4th Floor PalmNazi Plaza<br />Mombasa</p>
        <div className="flex justify-center md:justify-start space-x-4 mt-4">
          <a href="https://www.facebook.com" className="text-white hover:text-gray-300">
            <FaFacebook className="text-2xl" />
          </a>
          <a href="https://www.twitter.com" className="text-white hover:text-gray-300">
            <FaTwitter className="text-2xl" />
          </a>
          <a href="https://www.instagram.com" className="text-white hover:text-gray-300">
            <FaInstagram className="text-2xl" />
          </a>
          <a href="https://www.linkedin.com" className="text-white hover:text-gray-300">
            <FaLinkedin className="text-2xl" />
          </a>
        </div>
      </div>

      {/* Vertical Line */}
      <div className="hidden md:block w-px h-32 bg-gray-600 mx-4"></div>

      {/* Right Section */}
      <div className="w-full md:w-1/3 px-4 mb-6 md:mb-0">
        <h3 className="text-lg font-semibold mb-2">Send Us a Message</h3>
        <p>info@palmnazi.co.ke</p>
        <p>P.O. Box 2234 - Nairobi</p>
      </div>
    </div>

    {/* Footer Bottom */}
    <p className="text-center mt-8 text-gray-100">Copyright 2024 @PalmNazi</p>
    {/* Optional Footer Credit */}
    {/* <p className="text-center text-gray-300 mt-2">Designed & Developed & Maintained by Kang`ethe wa Muthunga</p> */}
  </div>
</footer>

  );
};

export default Footer;
