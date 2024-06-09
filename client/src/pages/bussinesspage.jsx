import { useEffect, useState } from "react"
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
        console.log("receiced data:", data)


      } catch (error) {
        console.error(error);

      }
    };
    fethuniquecity();
  }, []);

  console.log(cities);

  return (
    <div>
      {cities.map((city, index) => (
        <div key={index}>
          <Link to={`/business/${city}`}>
            {city}
          </Link>

        </div>

      ))};
    </div>
  )
};

export default Bussinesspage