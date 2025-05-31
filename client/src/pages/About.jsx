import "../pages/about.css";
import "./page.css";
export default function About() {
  return (
    <>
      <div className="about h-screen pt-6 pb-2 relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center blur-sm opacity-50" style={{ backgroundImage: "url(../images/about1.jpg)" }}></div>
        <h2 className="  text-blue-500 text-center font-bold relative z-10 mb-2 sm:mb-8 md:mb-6 lg:mb-8 xl:mb-10 text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
          Palmnazi - RC
        </h2>
        <div className="relative z-10 flex flex-col md:flex-row justify-between text-center items-center">
          <div className="m-4 sm:m-2 text-center items-center">
            <h4 className="text-2xl sm:text-3xl md:text-4xl pb-2">About us</h4>
            <p className="text-base sm:text-xs md:text-xl text-black">
              Welcome to PALMNAZI RC Integrated tourism Marketing Company, an innovative, dynamic and ultimate leader in tourism promotion, local area culture, local businesses and Natural Heritage preservation and conservation of natural ecosystem in our regions across Africa. Our marketing strategy is a multifaceted, diversified and integrate resort city based approach that cover a range of services and products. This cover three thematic areas; Tourism, Local areas Businesses and natural Heritage Conservation. In broad terms these cover such areas including; hotels and lodges, Conventions & Conferences, tour operators, local businesses to boost the needs of local communities, and Cultures. The objective is to advancement of greater holistic impact of tourism to local communities and raising awareness of conservation of our unique biodiversity, within the resort cities and other holiday destinations as best offers in our regions.
            </p>
          </div>
          <div className="about-img w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 bg-cover bg-center" style={{ backgroundImage: "url(../images/aboutbusiness.jpg)" }}></div>
        </div>
      </div>

      <div className="whyus bg-black py-10">
        <h2 className="text-center text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-8 md:mb-16">
          Why Choose Us?
        </h2>
        <div className="flex flex-col md:flex-row justify-evenly items-center text-white space-y-6 md:space-y-0 md:space-x-6">
          <div className="service w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 border-2 border-gray-600 rounded-lg overflow-hidden relative">
            <div className="seviceimg w-full h-3/5 bg-cover bg-center"></div>
            <div className="p-">
              <h2 className="text-base text-center sm:text-lg md:text-xl font-semibold mb-">Premier Destinations, Scalability, Dynamic</h2>
              <p className="text-xs sm:text-sm md:text-base text-center">
                Destinations are updated frequently meeting  diverse tastes and needs of clients.
              </p>
            </div>
          </div>
          <div className="team w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 border-2 border-gray-600 rounded-lg overflow-hidden relative">
            <div className="teamimg w-full h-3/5 bg-cover bg-center"></div>
            <div className="p-4">
              <h2 className="text-base text-center  sm:text-lg md:text-xl font-semibold mb-2">
                Ultimate Business Network
                <br />
                Think-Inspire-Act
              </h2>
              <p className="text-xs sm:text-sm md:text-base text-center">
                Building Stronger, More Authentic Local Businesses and Communities Together.
              </p>
            </div>
          </div>
          <div className="deal w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 border-2 border-gray-600 rounded-lg overflow-hidden relative">
            <div className="dealimg w-full h-3/5 bg-cover bg-center"></div>
            <div className="bg-black p-4">
              <h2 className="text-base text-center  sm:text-lg md:text-xl font-semibold mb-2">
                Understanding Local Communities
              </h2>
              <p className="text-xs sm:text-sm md:text-base text-center">
                We are Local, We Love Local, We Act Local.
                <br />
                Exposing Local Cultures
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
