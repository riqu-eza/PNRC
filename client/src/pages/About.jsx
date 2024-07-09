import "../pages/about.css";
export default function About() {
  return (
    <>
      <div className="about h-screen pt-6 pb-2 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center blur-sm opacity-50 "
          style={{ backgroundImage: "url(../imgaes/about1.jpg)" }}
        ></div>
        <h2 className="text-blue-500 text-center font-bold relative z-10 mb-2 sm:mb-8 md:mb-6 lg:mb-8 xl:mb-10 text-3xl sm:text-8xl md:text-6xl lg:text-8xl xl:text-7xl">
          Palmnazi - RC
        </h2>

        <div className="relative z-10  flex-col md:flex-row justify-between text-center items-center">
          <div className="m-8 text-center items-center  ">
            <h4 className="text-4xl pb-2" >    About us;</h4>
            <p className="text-xl" >
         Welcome to PALMNAZI RC Integrated tourism Marketing Company, an innovative, dynamic and ultimate leader in tourism promotion, local area culture, local businesses and Natural Heritage  preservation and conservation of natural ecosystem in our regions across Africa. Our marketing strategy is a multifaceted, diversified and integrate resort city based  approach that cover a range of services and products. This cover three thematic areas; Tourism, Local areas Businesses and natural Heritage Conservation. In broad terms these cover such areas including; hotels and lodges, Conventions & Conferences, tour operators, local businesses to boost the needs of local communities,, and Cultures. The objective is to advancement of greater holistic impact of tourism to local communities and raising awareness of conservation of our unique biodiversity, within the resort cities and other holiday destinations as best offers in our regions.
            </p>
          </div>
          <div
            className="about-img w-64 h-64 bg-cover bg-center"
            style={{ backgroundImage: "url(../imgaes/aboutbusiness.jpg)" }}
          ></div>
        </div>
      </div>

      <div className="whyus bg-black py-10">
        <h2 className="text-center text-5xl font-bold text-white mb-16">
          Why Choose Us?
        </h2>
        <div className="flex flex-col md:flex-row justify-evenly items-center text-white">
          <div className="service w-80 h-80 border-2 border-gray-600 rounded-lg overflow-hidden relative">
            <div className="seviceimg w-full h-3/5 bg-cover bg-center teamimg"></div>
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">
                Premier Destinations, Scalability, Dynamic
              </h2>
              <p className="text-sm text-center">
                Destinations are updated frequently meeting diverse tastes and
                needs of clients. <br/> 
                
                
              </p>
            </div>
          </div>
          <div className="team w-80 h-80 border-2 border-gray-600 rounded-lg overflow-hidden relative">
            <div className=" w-full h-3/5 bg-cover bg-center seviceimg  "></div>
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">
                Ultimate Business Network
                <br />
                Think-Inspire-Act
              </h2>
              <p className="text-sm text-center">
                Building Stronger, More Authentic Local Businesses and
                Communities Together.
              </p>
            </div>
          </div>
          <div className="deal w-80 h-80 border-2 border-gray-600 rounded-lg overflow-hidden relative">
            <div className="dealimg w-full h-3/5 bg-cover bg-center dealimg"></div>
            <div className="bg-black p-4">
              <h2 className="text-xl font-semibold mb-2">
                Understanding Local Communities
              </h2>
              <p className="text-sm text-center">
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
