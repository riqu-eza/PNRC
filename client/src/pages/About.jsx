import "../pages/about.css";
export default function About() {
  return (
    <>
      <div className="about h-screen pt-6 pb-2 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center blur-sm opacity-50 "
          style={{ backgroundImage: "url(../imgaes/about1.jpg)" }}
        ></div>
        <h2 className="text-blue-500 text-center font-bold relative z-10 mb-6 sm:mb-8 md:mb-10 lg:mb-12 xl:mb-16 text-5xl sm:text-8xl md:text-7xl lg:text-9xl xl:text-9xl">
          Palmnazi - RC
        </h2>

        <div className="relative z-10  flex-col md:flex-row justify-between text-center items-center">
          <div className="m-8 text-center items-center  ">
            <h1 className="text-3xl font-bold  text-black mb-2">
              Africa Premier Tourism Marketing Company
            </h1>
            <h1 className="text-3xl font-bold text-black mb-2">
              An Innovative, Dynamic Company.
            </h1>
            <h1 className="text-3xl font-bold text-black mb-2">
              The Ultimate Leader in Promoting Tourism
            </h1>
            <h1 className="text-3xl font-bold text-black mb-4">
              In Our Regions RESORT CITIES-RC
            </h1>
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
