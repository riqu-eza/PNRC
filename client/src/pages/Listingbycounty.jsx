import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "ldrs/jellyTriangle";

import "./page.css";
import "../components/loading.css";

const ListingsByCounty = () => {
  const [uniqueCounties, setUniqueCounties] = useState([]);
  const [listingsByCounty, setListingsByCounty] = useState([]);
  const [selectedCounty, setSelectedCounty] = useState(null);
  const [countyBackgrounds, setCountyBackgrounds] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [cityinfo, setcityinfo] = useState([]);
  const [introVisible, setIntroVisible] = useState(true);

  useEffect(() => {
    const fetchUniqueCounties = async () => {
      try {
        const res = await fetch(
          "http://localhost:3000/api/listing/unique-counties"
        );
        const data = await res.json();
        setUniqueCounties(data);
        //  console.log(data);
        const backgrounds = {};
        const cityInfo = {};
        for (const county of data) {
          const imageRes = await fetch(
            `http://localhost:3000/api/admin/bckimg?county=${encodeURIComponent(county)}`
          );
          const imageData = await imageRes.json();
          backgrounds[county] = imageData.imageUrls;
          cityInfo[county] = imageData.description;
        }

        setCountyBackgrounds(backgrounds);
        setcityinfo(cityInfo);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchUniqueCounties();
  }, []);

  const fetchListingsByCounty = async (county) => {
    const backgroundUrl = countyBackgrounds[county];
    console.log("State data to be passed:", { backgroundUrl });

    try {
      const res = await fetch(
        `http://localhost:3000/api/listing/get?selectedCounty=${county}`
      );
      const data = await res.json();
      setListingsByCounty(data);
      setSelectedCounty(county);
    } catch (error) {
      console.error(error);
    }
  };
  const truncateText = (text, wordLimit) => {
    const words = text.split(" ");
    if (words.length <= wordLimit) {
      return text;
    }
    return words.slice(0, wordLimit).join(" ") + " ...";
  };
  // console.log("Unique Counties:", uniqueCounties);
  // console.log("Listings By County:", listingsByCounty);
  // console.log("Selected County:", selectedCounty);
  // console.log("County Backgrounds:", countyBackgrounds);

  return (
    <>
      {introVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
          <div className="bg-white p-8 rounded-md text-center max-w-md">
            <h2 className="text-2xl font-bold">
              Welcome to Our Resort Cities!
            </h2>
            <p className="mt-4">Discover the most beautiful destinations...</p>
            <button
              className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-md"
              onClick={() => setIntroVisible(false)}
            >
              Explore Cities
            </button>
          </div>
        </div>
      )}

      {!introVisible && (
        <div>
          <h1 className="text-center text-3xl m-2 text-bold text-blue-400 ">
            Welcome to our Resort Cities Destinations
          </h1>
          {isLoading ? (
            <div className="flex items-center justify-center h-screen w-screen">
              <l-jelly-triangle
                size="30"
                speed="1.75"
                color="black"
              ></l-jelly-triangle>
            </div>
          ) : (
            <div className=" ">
              <div className=" max-h-[calc(100vh-4rem)] overflow-y-auto  scrollbar-hidden grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 m-8  mt-10">
                {uniqueCounties.map((county) => (
                  <div
                    key={county}
                    className="county-item relative overflow-hidden border  rounded-lg"
                    style={{
                      backgroundImage: `url(${countyBackgrounds[county]})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      height: "250px",
                    }}
                  >
                    <Link
                      // to={{
                      //   pathname: `/listings/${county}`,
                      //   state: { backgroundUrl: countyBackgrounds[county] },
                      // }}
                      to={`/listings/${county}?backgroundUrl=${encodeURIComponent(countyBackgrounds[county])}&county=${encodeURIComponent(county)}&countyInfo=${encodeURIComponent(cityinfo[county])}`}
                      className="block w-full h-full  items-end justify-center"
                      onClick={() => {
                        console.log(
                          "Navigating to /listings/${county} with background URL:",
                          countyBackgrounds[county]
                        );

                        fetchListingsByCounty(county);
                      }}
                    >
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="absolute top-0  text-3xl font-bold uppercase countyname">
                          {county}
                        </span>
                        <h4 className="absolute bottom-0  bg-black bg-opacity-30 text-center text-white  countyinfo">
                          {truncateText(cityinfo[county], 15)}
                        </h4>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>

              {selectedCounty && (
                <div className="listings-container">
                  <h2 className="text-xl font-bold mb-4">
                    {selectedCounty} Listings
                  </h2>
                  {listingsByCounty.map((listing) => (
                    <div key={listing._id} className="listing-item">
                      {/* Display listing details here */}
                    </div>
                  ))}
                </div>
              )}
              {/* <Countylisting countyBackgrounds={countyBackgrounds} /> */}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ListingsByCounty;
