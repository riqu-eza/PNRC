// src/components/Footer.jsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "./footer.css";
import { FaCopyright, FaFacebook, FaInstagram, FaLinkedin, FaMobile, FaPhone, FaTwitter } from 'react-icons/fa';
const Footer = () => {
  const [form, setForm] = useState({ name: "", email: "" });

  const handlesubscribe = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/api/news/create', {
        method: "post",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify(form)
      });
      const data = await response.json();
      console.log("Post created");
      window.alert(subscribed);

    } catch (error) {
      console.error("Error creating post:", error)
    }
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
      <div className="footerhead">
        <h1 className='text-center text-3xl m-12'>Subscribe to our news later to get udpated and new trends!</h1>
        <p className='m-8 text-center text-grey-300'>Join Our Database NOW</p>
        <form action="" onSubmit={handlesubscribe} className='text-center m-16'  >
          <input type="text" id='name' placeholder='Name' value={form.name} className='m-8 ' onChange={handleChange} />
          <input type="email" id='email' placeholder='EmailAddress' value={form.email} className='m-8' onChange={handleChange} />
          <button type='submit'>Subscribe</button>
        </form>
      </div>
      <div className="container mx-auto flex flex-col md:flex-row justify-center items-center text-center md:text-center space-y-6 md:space-y-0">
        {/* Left Section */}
        <div className="w-full md:w-1/2 px-4">
          <div>
            <h3 className="text-lg font-semibold mb-2 ">Gives Us  a Call</h3>
            <p className='m-4'>+254 - 794369806</p>
          </div>

        </div>

        {/* Vertical Line */}
        <div className="hidden md:block w-px h-32 bg-gray-600 mx-4"></div>

        {/* Right Section */}
        <div className="w-full md:w-1/2 px-4">
          <h3 className="text-lg font-semibold mb-2">Come & drop by ;</h3>
          <p className=''> 4th floor palmnazi plaza <br /> Mombasa</p>
          <div className="flex justify-center m-4 space-x-4">
            <a href="https://www.facebook.com" className="hover:text-gray-400">
              <FaFacebook />
            </a>
            <a href="https://www.twitter.com" className="hover:text-gray-400">
              <FaTwitter />
            </a>
            <a href="https://www.instagram.com" className="hover:text-gray-400">
              <FaInstagram />
            </a>
            <a href="https://www.linkedin.com" className="hover:text-gray-400">
              <FaLinkedin />
            </a>
          </div>

        </div>
        <div className="hidden md:block w-px h-32 bg-gray-600 mx-4"></div>
        <div className="w-full md:w-1/2 px-4">
          <h3 className="text-lg font-semibold mb-2">Send us a Message</h3>
          <p>info@palmnazi.co.ke</p>
          <p>P.O.Box 2234-Nairobi </p>

        </div>
      </div>
      < p className=' text-center'>Copyright  2024 @Palmnazi </p>
      <p className='text-center text-grey'>Designed & Developed & Maitained by Kang`ethe wa Muthunga</p>

    </footer>
  );
};

export default Footer;
