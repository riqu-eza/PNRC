import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/swiper-bundle.min.css';
// import 'swiper/swiper.min.css';

const BusinessDetailPage = () => {
  const { id } = useParams();
  const [business, setBusiness] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleMapClick = (location) => {
    const [latitude, longitude] = location.split(",");

    const url = `https://www.google.com/maps?q=${latitude},${longitude}`;

    window.open(url, "_blank");
  };
  useEffect(() => {
    const fetchBusinessData = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/business/${id}`);
        if (!res.ok) {
          throw new Error("Failed to fetch business data");
        }

        const data = await res.json();
        setBusiness(data);
        setLoading(false);
      } catch (error) {
        console.error("Error:", error);
        setLoading(false);
      }
    };

    fetchBusinessData();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!business) {
    return <p>Business not found</p>;
  }
//   const { businessDetails: details, productsGroupedByName } = businessDetails;

  return (
    <div className="text-center p-4">
      <h1 className="text-3xl font-bold mb-4">{business.name}</h1>

      <div className="flex flex-col md:flex-row justify-center mb-2">
        <p className="md:mr-4"> Phone No: {business.contact}</p>
        <p> Email: @{business.email}</p>
      </div>

      <div className="flex flex-col md:flex-row justify-center mb-2">
        <p className="md:mr-4"> finds as at: {business.address}</p>
        <FontAwesomeIcon
          icon={faMapMarkerAlt}
          className="text-blue-500 cursor-pointer"
          onClick={() => handleMapClick(business.location)}
        />
      </div>

      <p className="mb-4">{business.description}</p>

      {/* Display products if any */}
      {business.products && business.products.length > 0 && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Products</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {business.products.map((product, index) => (
              <li key={index} className="p-4 border rounded-lg">
                {product.productImage && product.productImage.length > 0 && (
                  <Swiper spaceBetween={10} slidesPerView={1} className="mb-2">
                    {product.productImage.map((image, imgIndex) => (
                      <SwiperSlide key={imgIndex}>
                        <img
                          src={image}
                          alt={product.productName}
                          className="w-full h-40 object-cover rounded-lg"
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                )}
                <p className="font-semibold">{product.productName}</p>
                <p className="text-sm text-gray-600">{product.productPrice}</p>
                <p className="text-sm">{product.productDescription}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default BusinessDetailPage;
