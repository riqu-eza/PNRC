import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Bussinesspage = () => {
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const fethuniquecity = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/business/cities");
        if (!res.ok) {
          throw new Error(`Error: ${res.statusText}`);
        }
        const data = await res.json();
        setCities(data);
        
      } catch (error) {
        console.error(error);
      }
    };
    fethuniquecity();
  }, []);

  return (
    <div className="h-full">
    <h3 className="text-3xl text-center p-2 bg-white text-black ">Local Business to supply your needs at :-</h3>

    <div className=" flex justify-center bg-white p-12  mx-6 max-h-screen overflow-auto ">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 
        ">
        {cities.map((city, index) => (
          <div key={index} className="p-6 bg-gray-400 shadow-lg hover:bg-blue-400 rounded-lg">
            <Link
              to={`/business/${city}`}
              className="text-center block text-2xl font-bold text-black "
            >
              {city}
            </Link>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default Bussinesspage;
