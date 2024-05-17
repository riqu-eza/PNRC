import "../pages/about.css";

export default function About() {
  return (
    <>
      <div className="body">
        <div className="py-20 px-4 max-w-6xl mx-auto about">
          <div>
            <h1 className=" about-header">WELCOME</h1>
            <h2 className="about-content">
              To Africa Premier Tourism Marketing Company, an Innovative,
              dynamic company. The ultimate leader in promoting tourism in our
              regions <span>RESORT CITIES - RC</span>
            </h2>
          </div>
        </div>
        <div className="py-20 px-4 max-w-6xl mx-auto about-mission">
          <div>
            <h1 className=" about-header">MISSION</h1>
            <h2 className="about-content">
              Our mission is to promote responsible tourism to support local
              businesses so they can bring these benefits to local communities.
              We do that by helping brands
            </h2>
          </div>
        </div>
        <div className="py-20 px-4 max-w-6xl mx-auto about-vision">
          <div>
            <h1 className=" about-header">vision</h1>
            <h2 className="about-content">
              Our vision is to establish Palmnazi as a premier tourism
              destination, recognized for its natural beauty, cultural richness,
              and exceptional hospitality. We aim to become the leading tourism
              marketing company in the region, driving economic growth and
              empowerment for local communities.
            </h2>
          </div>
        </div>
      </div>

      {/* <Link
        to={"/BussinessPage"}
        className="text-xs sm:text-sm text-blue-800 font-bold hover:underline"
      >
        Let&#39;s Learn more...
      </Link> */}
    </>
  );
}
