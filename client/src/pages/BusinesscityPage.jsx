import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const BusinesscityPage = () => {
  const { city } = useParams();
  const [groupedData, setGroupedData] = useState({});
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [businessCount, setBusinessCount] = useState(0);
  const [productCount, setProductCount] = useState(0);
  const [totalProductViews, setTotalProductViews] = useState(0);

  const stats = [
    { id: 1, value: `${businessCount}`, description: "Businesses" },
    { id: 2, value: `${productCount}`, description: "Products" },
    { id: 3, value: `${totalProductViews}`, description: "Total Product Views" },
  ];

  useEffect(() => {
    const fetchCityData = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/api/business/city?name=${encodeURIComponent(city)}`
        );
        if (!res.ok) {
          throw new Error(`Error: ${res.statusText}`);
        }
        const data = await res.json();
        const { businessCount, productCount, totalProductViews, groupedData } = data;

        setGroupedData(groupedData);
        setBusinessCount(businessCount);
        setProductCount(productCount);
        setTotalProductViews(totalProductViews);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching city data:", error);
        setIsLoading(false);
      }
    };
    fetchCityData();
  }, [city]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!groupedData) {
    return <div>No data available for {city}</div>;
  }

  return (
    <>
      <div className="bg-white h-screen overflow-y-auto m-14 mx-20 ">
        <div className=" justify-between px-10 max-w-screen my-2 mx-auto">
          <div className="flex-grow flex items-center justify-center  ">
            <h1
              className="text-bold font-semibold text-center"
              style={{ fontSize: "30px" }}
            >
              Explore Millions of offerings tailored for your business needs in
              {city}
            </h1>
          </div>

          <div className="flex-grow grid grid-cols-1 md:grid-cols-3 gap-2  text-center  ">
            {stats.map((stat) => (
              <div key={stat.id} className="bg-white p-2 rounded-lg">
                <h2 className="text-3xl font-bold text-slate-800">
                  {stat.value}
                </h2>
                <p className="mt-2 text-lg text-gray-600">{stat.description}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="flex">
      {isLoading ? (
        <p className="m-auto">Loading...</p>
      ) : (
        <>
          <div className="w-1/4 p-4 border-r border-gray-200">
            <h2 className="text-xl font-semibold mb-4">Categories</h2>
            <ul>
              {Object.keys(groupedData).map((category, index) => (
                <li
                  key={index}
                  className={`cursor-pointer p-2 mb-2 rounded ${
                    selectedCategory === category ? 'bg-gray-200' : ''
                  }`}
                  onClick={() => {
                    setSelectedCategory(category);
                    setSelectedSubCategory(null);
                  }}
                >
                  {category}
                </li>
              ))}
            </ul>
          </div>

          {selectedCategory && (
            <div className="w-1/4 p-4 border-r border-gray-200">
              <h2 className="text-xl font-semibold mb-4">Subcategories</h2>
              <ul>
                {Object.keys(groupedData[selectedCategory]).map((subCategory, index) => (
                  <li
                    key={index}
                    className={`cursor-pointer p-2 mb-2 rounded ${
                      selectedSubCategory === subCategory ? 'bg-gray-200' : ''
                    }`}
                    onClick={() => setSelectedSubCategory(subCategory)}
                  >
                    {subCategory}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="w-1/2 p-4  ">
            <h2 className="text-xl font-semibold mb-4">Businesses</h2>
            {selectedCategory && selectedSubCategory && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {groupedData[selectedCategory][selectedSubCategory].map((business, businessIndex) => (
                  <div key={businessIndex} className="border p-4 rounded-lg">
                    <Link to={`/businesslisting/${business._id}`}>
                      {business.imageUrls && (
                        <img
                          src={business.imageUrls}
                          alt={business.name}
                          className="w-full h-40 object-cover mb-2 rounded-lg"
                        />
                      )}
                      <p className="font-medium">{business.name}</p>
                      <p className="text-sm">{business.description}</p>
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
      </div>
    </>
  );
};

export default BusinesscityPage;
