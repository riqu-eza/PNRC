import travel from "../imgaes/blogtravel.jpg";
import culture from "../imgaes/blogculture.jpg";
import business from "../imgaes/blogbusiness.jpg";
import { Link } from "react-router-dom";

export const Blog = () => {


  const blogs = [
    { id: 1, name: "Travel", img: [travel] },
    { id: 2, name: "Business", img: [business] },
    { id: 3, name: "Culture", img: [culture] },
  ];

  return (
    <div className="h-screen" >
      <h3 className="text-2xl text-center p-2 bg-white text-black ">
        {" "}
        This Blog is to share and interact in Travel, Business and Culture space
        at our Resort Cities. Every Voice, advice and concern matters here.
        Enjoy browsing our blog and please give a feedback or leave a comment{" "}
      </h3>
      <div className=" flex justify-center bg-white p-2 ">
        <div className="flex-grow grid grid-cols-1 border md:grid-cols-3 gap-6 p-6 w-1/3">
          {blogs.map((stat) => (
            <div key={blogs.id} className="bg-white p-6  rounded-lg">
              <Link  to={`/blog/${stat.name}`} >
                <div className="items-center flex flex-col " >
                  <img
                    src={stat.img}
                    alt={stat.name}
                    className="w-80 h-40 object-cover rounded-lg align-center"
                  ></img>
                  <h2 className="text-3xl border bg-black rounded-lg w-80 text-white text-center p-4 font-bold">
                    {stat.name}
                  </h2>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
      {/*  */}
    </div>
  );
};
