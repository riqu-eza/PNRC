import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import { useHistory } from 'react-router-dom';
// import { withRouter } from 'react-router-dom';

import Countylisting from "./countylisting";
import "./page.css";
import "../components/loading.css";

const ListingsByCounty = () => {
  const [uniqueCounties, setUniqueCounties] = useState([]);
  const [listingsByCounty, setListingsByCounty] = useState([]);
  const [selectedCounty, setSelectedCounty] = useState(null);
  const [countyBackgrounds, setCountyBackgrounds] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [cityinfo, setcityinfo] = useState([]);

  useEffect(() => {
    const fetchUniqueCounties = async () => {
      try {
        const res = await fetch(
          "http://localhost:3000/api/listing/unique-counties"
        );
        const data = await res.json();
        setUniqueCounties(data);

        const backgrounds = {};
        const cityInfo = {};
        for (const county of data) {
          const imageRes = await fetch(
            `http://localhost:3000/api/admin/bckimg?county=${encodeURIComponent(county)}`
          );
          const imageData = await imageRes.json();
          backgrounds[county] = imageData.imageUrls;
          cityInfo[county] = imageData.description;
          console.log(imageData);
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
  const logFetchedData = () => {
    console.log("Unique Counties:", uniqueCounties);
    console.log("Listings By County:", listingsByCounty);
    console.log("Selected County:", selectedCounty);
    console.log("County Backgrounds:", countyBackgrounds);
  };

  return (
    <>
      {isLoading ? (
        <div className="container mx-auto flex justify-center items-center h-screen">
          <div className="loader">Loading...</div>
        </div>
      ) : (
        <div className="container ">
          <div className="county-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 ml-20 mt-10">
            {uniqueCounties.map((county) => (
              <div
                key={county}
                className="county-item relative overflow-hidden border  rounded-lg"
                style={{
                  backgroundImage: `url(${countyBackgrounds[county]})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  height: "200px", // Set height to 50px
                }}
              >
                <Link
                  // to={{
                  //   pathname: `/listings/${county}`,
                  //   state: { backgroundUrl: countyBackgrounds[county] },
                  // }}
                  to={`/listings/${county}?backgroundUrl=${encodeURIComponent(countyBackgrounds[county])}`}
                  className="block w-full h-full flex items-end justify-center"
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
                    <h4 className="absolute bottom-0 bg-black bg-opacity-50 text-white p-2 countyinfo">
                      {cityinfo[county]}
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
    </>
  );
};

export default ListingsByCounty;
