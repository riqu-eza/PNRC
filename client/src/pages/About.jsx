import "../pages/about.css";
export default function About() {
  return (
    <>
      <div className="about h-screen  pt-6 pb-4">
        <h2 className="text-black text-bold text-center aboutheader   text-9xl">
          {" "}
          Palmnazi -Rc
        </h2>
        <div className="justify-between aboutcon">
          <div className="m-8">
            <h1 className="text-3xl font-bold text-black  text-center">
              {" "}
              Africa Premier Tourism Marketing Company
            </h1>
            <h1 className="text-3xl font-bold text-black   text-center ">
              {" "}
              An Innovative, Dynamic Company.{" "}
            </h1>
            <h1 className="text-3xl font-bold text-black   text-center ">
              The ultimate Leader in Promoting Tourism{" "}
            </h1>
            <h1 className="text-3xl font-bold text-black mb-4  text-center ">
              {" "}
              in our regions RESORT CITIES-RC
            </h1>
            {/* <h3 class="text-2sm text-black leading-6 mt-10 mb-10 m-10">Pellentesque sit amet elementum accumsan sit amet mattis eget, tristique at leo. Vivamus massa. Tempor massa et laoreet. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu laoreet ante, sollicitudin volutpat quam. Vestibulum posuere malesuada ultrices. In pulvinar rhoncus lacus at aliquet. Nunc vitae lacus varius, auctor nisi sit amet, consectetur mauris. Curabitur sodales semper est, vel faucibus urna laoreet vel. Ut justo diam, sodales non pulvinar at, vulputate quis neque. Etiam aliquam purus vel ultricies consequat.</h3> */}
          </div>
          <div className="about-img"></div>
        </div>

        {/* <div className="flex justify-evenly mt-28 m-16 mb-4">
          <div className="flex flex-col items-center">
            <div className="icon1  "></div>
            <div className="text-2xl font-bold text-3xl text-black">001</div>
            <div className="text-base text-xl">Destination Ready</div>
          </div>
          <div className="flex flex-col items-center ">
            <div className="icon2"></div>
            <div className="text-2xl font-bold  text-black">001</div>
            <div className="text-base ">Visitors</div>
          </div>
          <div className="flex flex-col items-center ">
            <div className="icon3"></div>
            <div className="text-2xl font-bold  text-black">005</div>
            <div className="text-base text-xl">Resort Cities</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="icon4"></div>
            <div className="text-2xl font-bold text-3xl text-black">000</div>
            <div className="text-base text-xl" >Marketing Done</div>
          </div>
        </div> */}
      </div>
      <div className="whyus pb-10">
        <h2 className="text-center m-16 text-5xl font-bold text-white">
          Why Choose Us?
        </h2>
        <div className="flex justify-evenly text-white">
          <div className="service">
            <div className="seviceimg"> </div>
            <h2 className="text-center m-2 text-xl  text-white">
              Premier Destinations, Scalability, Dynamic{" "}
            </h2>
            <p className="m-8 text-3sm text-center text-white">
              {" "}
              Destination are updated frequently meeting diverse tastes and
              needs of clients. <br /> Destinations meeting your budget{" "}
            </p>
          </div>
          <div className="team">
            <div className="teamimg"></div>

            <h2 className="text-center m-2 text-xl  text-white">
              Ultimate Business Network <br />
              Think-Inspire-Act
            </h2>
            <p className="m-8 text-3sm text-center tet-white">
              {" "}
              Building Stronger, more Authentic Local Businesses and Communities
              Together.
            </p>
          </div>
          <div className="deal">
            <div className="dealimg"></div>
            <div className="bg--900">
              <h2 className="text-center m-2 text-xl  text-white">
                Understanding Local Communities
              </h2>
              <p className="m-8 text-3sm text-center text-white ">
                We are Local, We Love Local, We act Local. <br /> Exposing Local
                Cultures{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
