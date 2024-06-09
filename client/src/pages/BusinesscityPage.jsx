import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const BusinesscityPage = () => {
    const { city } = useParams();
    const [cityData, setCityData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const stats = [
        { id: 1, value: '200M+', description: 'products' },
        { id: 2, value: '200K+', description: 'suppliers' },
        { id: 3, value: '5,900', description: 'product categories' },
        { id: 4, value: '200+', description: 'countries and regions' },
    ];
    useEffect(() => {
        const fetchCityData = async () => {
            try {
                const res = await fetch(`http://localhost:3000/api/business/city?name=${encodeURIComponent(city)}`);
                if (!res.ok) {
                    throw new Error(`Error: ${res.statusText}`);
                }
                const data = await res.json();
                setCityData(data);
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

    if (!cityData) {
        return <div>No data available for {city}</div>;
    }

    return (
        <div className="bg-white" >
            <div className="flex justify-between  px-10 max-w-screen  my-10 mx-auto">
                <div className="flex-grow flex items-center justify-center  w-2/3 px-40">
                    <h1 className="text-bold font-semibold text-center "style={{
                        fontSize: "54px"
                    }}>Explore Millions of offerings   tailored for your business needs  in  {city}</h1>
                </div>

                <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-6 p-6   w-1/3">
                    {stats.map(stat => (
                        <div key={stat.id} className="bg-white p-6 rounded-lg ">
                            <h2 className="text-3xl font-bold text-black-800">{stat.value}</h2>
                            <p className="mt-2 text-lg text-gray-600">{stat.description}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div>
                {cityData.map((business) => (
                    <div key={business._id}>
                        <h2>{business.name}</h2>
                        <p>{business.description}</p>
                        <p>Contact: {business.contact}</p>
                        <p>Address: {business.address}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BusinesscityPage;
