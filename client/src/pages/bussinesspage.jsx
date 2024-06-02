
import React from 'react';
import { Link } from 'react-router-dom';
import team1 from '../imgaes/city.png'
import "./text.css";
const MyComponent = () => {
  return (
    <>
      <div className="container mx-auto p-6 min-h-screen ">
        {/* <div className="market">
        <h1 className='pt-16 text-8xl'>We Got You</h1>
      </div> */}
        {/* Main Section with Links and Content */}
        <div className="flex justify-center mb-10">
          {/* Left Section with Links */}
          <div className="w-1/3  rounded-lg p-4 m-6 text-center">
            <nav className="flex flex-col space-y-4">
              <Link to="#link1" className="text-blue-500 hover:underline"> --brand--</Link>
              <Link to="#link2" className="text-blue-500 hover:underline">Content Marketing</Link>
              <Link to="#link3" className="text-blue-500 hover:underline">Data & Analytics</Link>
              <Link to="#link4" className="text-blue-500 hover:underline">Digital Marketing</Link>
              <Link to="#link5" className="text-blue-500 hover:underline">Marketing Automation</Link>
              <Link to="#link6" className="text-blue-500 hover:underline">Event Marketing</Link>
              <Link to="#link7" className="text-blue-500 hover:underline">Multi-location Marketing</Link>

            </nav>
          </div>
          {/* Vertical Line */}
          <div className="border-r-2 border-gray-300 mx-6"></div>
          {/* Right Section with Content */}
          <div className="w-2/3    p-4">
            <div class="main">
              <h1>Palmnazi ResortCity</h1>
              <blockquote>
                <p>
                  one of my collegues is conviced that having a wide range of types to choose from is a complet waste of
                  time
                </p>
              </blockquote>
              <div class="cols">
                <p>In the heart of the bustling city, amidst the towering skyscrapers and busy streets, lies a quaint
                  little café. Its facade, adorned with colorful flowers, invites passersby to step inside and escape the
                  chaos of the urban jungle. As you enter, the aroma of freshly brewed coffee fills the air, mingling with
                  the sweet scent of pastries baking in the oven. The cozy interior, with its warm lighting and
                  comfortable seating, beckons you to settle in and unwind. It's a sanctuary from the hustle and bustle
                  outside, a place where time seems to slow down, and conversations flow freely. Here, amidst the hustle
                  and bustle, one finds solace in a simple cup of coffee and the company of friends."</p>
              </div>
              <div class="colophon">
                this web thing was set in <strong>Georgia</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Videos Section */}
        <div className="flex flex-col lg:flex-row justify-center items-center lg:space-x-6 mb-10">
          {/* Video 1 */}
          <div className="flex flex-col items-center mb-6 lg:mb-0">
            <div className="w-full lg:w-96 mb-4">
              <iframe
                className="w-full rounded-lg shadow-lg"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="YouTube video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="w-full lg:w-96 p-4  rounded-lg shadow">
              <h3 className="text-xl font-bold mb-2 text-gray-800">Video 1 Title</h3>
              <p className="text-gray-700">
                This is a description of the first video. It provides an overview of the content
                and what viewers can expect to learn or see in the video.
              </p>
            </div>
          </div>

          {/* Video 2 */}
          <div className="flex flex-col items-center">
            <div className="w-full lg:w-96 mb-4">
              <iframe
                className="w-full rounded-lg shadow-lg"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="YouTube video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="w-full lg:w-96 p-4  rounded-lg shadow">
              <h3 className="text-xl font-bold mb-2 text-gray-800">Video 2 Title</h3>
              <p className="text-gray-700">
                This is a description of the second video. It provides an overview of the content
                and what viewers can expect to learn or see in the video.
              </p>
            </div>
          </div>
        </div>
        {/* meet the team */}
        <h2 className='text-center text-3xl p-8'>Meet The Team</h2>

        <div className="flex gap-8">
          <div className=" p-4 bg-white shadow-md rounded-lg text-center">
            <img
              src={team1} // Replace with your image path
              alt="Team Member"
              className="w-24 h-24 mx-auto rounded-full"
            />
            <h2 className="mt-4 text-xl font-semibold">John Doe</h2>
            <p className="mt-2 text-gray-600">
              John is a software engineer with over 10 years of experience in full-stack development.
            </p>
          </div>
          <div className=" p-4 bg-white shadow-md rounded-lg text-center">
            <img
              src= {team1} // Replace with your image path
              alt="Team Member"
              className="w-24 h-24 mx-auto rounded-full"
            />
            <h2 className="mt-4 text-xl font-semibold">John Doe</h2>
            <p className="mt-2 text-gray-600">
              John is a software engineer with over 10 years of experience in full-stack development.
            </p>
          </div>
          {/* <div className="team"></div> */}
          <div className=" p-4 bg-white shadow-md rounded-lg text-center">
            <img
              src={team1} // Replace with your image path
              alt="Team Member"
              className="w-24 h-24 mx-auto rounded-full"
            />
            <h2 className="mt-4 text-xl font-semibold">John Doe</h2>
            <p className="mt-2 text-gray-600">
              John is a software engineer with over 10 years of experience in full-stack development.
            </p>
          </div>
          <div className=" p-4 bg-white shadow-md rounded-lg text-center">
            <img
              src={team1} // Replace with your image path
              alt="Team Member"
              className="w-24 h-24 mx-auto rounded-full"
            />
            <h2 className="mt-4 text-xl font-semibold">John Doe</h2>
            <p className="mt-2 text-gray-600">
              John is a software engineer with over 10 years of experience in full-stack development.
            </p>
          </div>
        </div>
        {/* CEO and CTO Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* CEO Section */}
          <div className="p-6">
            <h2 className="text-2xl font-bold text-center mb-4 text-gray-800 underline">From the CEO's Desk</h2>
            <p className="text-gray-700 mb-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur euismod orci nec
              ullamcorper facilisis. Phasellus finibus fermentum nulla, in scelerisque lorem luctus nec.
              Suspendisse potenti. Morbi non bibendum nibh. Ut eu sapien nec nisi cursus aliquam ut a urna.
            </p>
            <p className="text-gray-700 mb-6">
              Praesent nec viverra risus. Nam et felis tristique, malesuada nunc ac, fermentum lorem. Duis
              consectetur semper justo, in cursus nunc hendrerit in. Curabitur ac suscipit libero, at
              consequat eros.
            </p>
            <div className="mt-6">
              <p className="text-gray-700 mb-2">Best regards,</p>
              <p className="text-gray-700 font-bold">CEO Name</p>
              <img
                src="ceo-signature.png"
                alt="CEO Signature"
                className="mt-4 h-16"
              />
            </div>
          </div>

          {/* CTO Section */}
          <div className="p-6 rounded-lg ">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center underline">From the CTO's Desk</h2>
            <p className="text-gray-700 mb-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur euismod orci nec
              ullamcorper facilisis. Phasellus finibus fermentum nulla, in scelerisque lorem luctus nec.
              Suspendisse potenti. Morbi non bibendum nibh. Ut eu sapien nec nisi cursus aliquam ut a urna.
            </p>
            <p className="text-gray-700 mb-6">
              Praesent nec viverra risus. Nam et felis tristique, malesuada nunc ac, fermentum lorem. Duis
              consectetur semper justo, in cursus nunc hendrerit in. Curabitur ac suscipit libero, at
              consequat eros.
            </p>
            <div className="mt-6">
              <p className="text-gray-700 mb-2">Best regards,</p>
              <p className="text-gray-700 font-bold">CTO Name</p>
              <img
                src="cto-signature.png"
                alt="CTO Signature"
                className="mt-4 h-16"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyComponent;
