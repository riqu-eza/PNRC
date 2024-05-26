import "../pages/about.css";

export default function About() {



  return (
    <>
      <p className="text-grey-300 text-center">simply Amazing place</p>
      <h2 className="text-black-900 text-bold text-center text-8xl">Few Words About Us</h2>
      <div class="flex justify-between m-16">
        <div>
          <h1 class="text-2xl font-bold mb-4 m-10">Pellentesque sit amet elementum accumsan sit amet mattis eget, tristique at leo. Vivamus massa. Tempor massa et laoreet. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h1>
          <h3 class="text-sm leading-6 mt-10 mb-10 m-10">Pellentesque sit amet elementum accumsan sit amet mattis eget, tristique at leo. Vivamus massa. Tempor massa et laoreet. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu laoreet ante, sollicitudin volutpat quam. Vestibulum posuere malesuada ultrices. In pulvinar rhoncus lacus at aliquet. Nunc vitae lacus varius, auctor nisi sit amet, consectetur mauris. Curabitur sodales semper est, vel faucibus urna laoreet vel. Ut justo diam, sodales non pulvinar at, vulputate quis neque. Etiam aliquam purus vel ultricies consequat.</h3>
        </div>
        <div class="about-img">
        </div>
      </div>
      <div class="flex justify-between mt-28 m-16">
        <div class="flex flex-col items-center">
          <div class="icon1  "></div>
          <div class="text-2xl font-bold">3003</div>
          <div class="text-base">Destination Ready</div>
        </div>
        <div class="flex flex-col items-center ">
          <div class="icon2"></div>
          <div class="text-2xl font-bold">2546</div>
          <div class="text-base">visitors</div>
        </div>
        <div class="flex flex-col items-center ">
          <div class="icon3"></div>
          <div class="text-2xl font-bold">3456</div>
          <div class="text-base text-xl">Resort cities</div>
        </div>
        <div class="flex flex-col items-center">
          <div class="icon4"></div>
          <div class="text-2xl font-bold">4564</div>
          <div class="text-base">Marketing Done</div>
        </div>
      </div>
      <div className="whyus">
        <h2 className="text-center m-16 text-5xl text-black">Why Choose Us?</h2>
        <div className="flex justify-evenly ">
          <div className="service">
            <div className="seviceimg"></div>
            <h2 className="text-center m-6 text-xl underline text-black">fast Service</h2>
            <p className="m-6">Pellentesque sit amet elementum ccumsan sit amet mattis eget, tristique at leo.</p>
          </div>
          <div className="team">
            <div className="teamimg"></div>
          
            <h2 className="text-center m-6 text-xl underline text-black" >Best Deals</h2>
            <p className="m-6">Pellentesque sit amet elementum ccumsan sit amet mattis eget, tristique at leo.</p>
          </div>
          <div className="deal">
            <div className="dealimg"></div>
            <div className="bg--900">
            <h2  className="text-center m-6 text-xl underline text-black">Good Team
            </h2> 
            <p className="m-6">Pellentesque sit amet elementum ccumsan sit amet mattis eget, tristique at leo.</p>
            </div>
           
          </div>
        </div>
      </div>



    </>
  );
}
