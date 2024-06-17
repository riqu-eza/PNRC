import { useState, useEffect } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";

const BusinessDetails = () => {
  const { id } = useParams();
  const [businessDetails, setBusinessDetails] = useState(null);
  const [selectedProductName, setSelectedProductName] = useState(null);

  useEffect(() => {
    const fetchBusiness = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/business/${id}`
        );
        const data = await response.json();
        setBusinessDetails(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching business:", error);
      }
    };

    fetchBusiness();
  }, [id]);

  const handleMapClick = (location) => {
    const [latitude, longitude] = location.split(",");

    const url = `https://www.google.com/maps?q=${latitude},${longitude}`;

    window.open(url, "_blank");
  };

  if (!businessDetails) {
    return <p>Loading...</p>;
  }

  const {
    businessDetails: details,
    keyProducts,
    allProducts,
  } = businessDetails;

  if (!details || !keyProducts || !allProducts) {
    return <p>Loading...</p>;
  }

  const displayedProducts = selectedProductName
    ? keyProducts.find((group) => group.productName === selectedProductName)
        .products
    : allProducts;

  return (
    <div className="text-center p-4 h-screen ">
      <h1 className="text-3xl font-bold mb-4">{details.name}</h1>

      <div className="flex flex-col md:flex-row justify-center mb-2">
        <p className="md:mr-4  ">
          {" "}
          <span className="text-slate-700">Phone No:</span> {details.contact}
        </p>
        <p className="">
          {" "}
          <span className="text-slate-700">Email us @</span> {details.email}
        </p>
      </div>

      <div className="flex flex-col md:flex-row justify-center items-center mb-2">
        <span className="text-gray-500 mr-2">{details.address}</span>
        <FaMapMarkerAlt
          className="text-black cursor-pointer"
          onClick={() => handleMapClick(details.location)}
        />
      </div>

      <p className="mb-4">{details.description}</p>

      <div
        className="flex  justify-center"
        style={{ width: "80%", margin: "0 auto" }}
      >
        <div
          className="key-products flex flex-col border-r mb-4"
          style={{ width: "35%", padding: "1rem" }}
        >
          <h2 className="text-2xl  font-semibold mb-4">Key Products</h2>

          {keyProducts.map((productGroup, index) => (
            <button
              key={index}
              className={`p-2 m-2 border rounded ${
                selectedProductName === productGroup.productName
                  ? "bg-gray-200"
                  : ""
              }`}
              onClick={() => setSelectedProductName(productGroup.productName)}
            >
              {productGroup.productName} ({productGroup.count})
            </button>
          ))}
        </div>

        {/* displaying products */}
        <div
          className=" overflow-y-auto"
          style={{ width: "65%", padding: "1rem", maxHeight: "80vh" }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {displayedProducts.map((product, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <Swiper spaceBetween={10} slidesPerView={1} className="mb-2">
                  {product.productImage.map((image, imgIndex) => (
                    <SwiperSlide key={imgIndex}>
                      <img
                        src={image}
                        alt={product.productname}
                        className="w-full h-40 object-cover rounded-lg"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
                <p className="font-semibold">{product.productName}</p>
                <p className="text-sm text-gray-600">{product.productPrice}</p>
                <p className="text-sm">{product.productDescription}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessDetails;
