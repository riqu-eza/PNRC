/* eslint-disable react/prop-types */
import  { useEffect, useState } from "react";

const ImageGallery = ({ listing }) => {
  const [randomImages, setRandomImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  // Shuffle and get 5 random images for initial render
  useEffect(() => {
    if (listing.imageUrls?.length > 0) {
      const shuffledImages = [...listing.imageUrls].sort(() => 0.5 - Math.random());
      setRandomImages(shuffledImages.slice(0, 5)); // Get 5 random images
      setSelectedImage(shuffledImages[0]); // Set the first random image as default
    }
  }, [listing.imageUrls]);

  return (
    <div className="w-full md:w-3/4 mx-auto  my-auto mt-4 mb-8">
      {/* Upper Section - Display the selected image */}
      <div className="grid grid-cols-2 md:grid-cols-3   m-1 gap-2 mb-4 h-[300px]">
        {selectedImage ? (
          <div
            className="col-span-3 bg-cover bg-center"
            style={{
              backgroundImage: `url(${selectedImage})`,
              height: "100%", // Full height
            }}
          ></div>
        ) : (
          randomImages.length > 0 &&
          randomImages.map((url, index) => (
            <div
              key={index}
              className={`${
                index % 2 === 0 ? "col-span-2" : "col-span-1"
              } bg-cover bg-center`}
              style={{
                backgroundImage: `url(${url})`,
                height: index % 2 === 0 ? "200px" : "150px", // Varying heights
              }}
            ></div>
          ))
        )}
      </div>

      {/* Lower Section - Scrollable Thumbnail Gallery */}
      <div className="flex  m-1 overflow-x-scroll space-x-2 py-2">
        {listing.imageUrls?.length > 0 ? (
          listing.imageUrls.map((url, index) => (
            <div
              key={index}
              className="flex-shrink-0 cursor-pointer  bg-cover bg-center"
              style={{
                backgroundImage: `url(${url})`,
                width: "80px", // Thumbnail size
                height: "30px",
              }}
              onClick={() => setSelectedImage(url)} // Set clicked image as selected
            ></div>
          ))
        ) : (
          <p>No images available</p>
        )}
      </div>
    </div>
  );
};

export default ImageGallery;
