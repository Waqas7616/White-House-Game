import React, { useState, useEffect } from "react";
import Navbar from "../Navbar";
import text from "../../images/whitehouse.png";
import { Link } from "react-router-dom";

import { useLocation } from "react-router-dom";
import MobileNav from "../MobileNav";

function AppBanner({
  bannerDesc,
  bannerDesc2,
  bannerTitle,
  redTitle,
  bg,
}) {
  const location = useLocation();
  const [active, setActive] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
  });

  useEffect(() => {
    
    const intervalId = setInterval(() => {
      
      const countDownDate = new Date("November 5, 2024 00:00:00").getTime();
      
      const now = new Date().getTime();
      
      const distance = countDownDate - now;

      
      if (distance > 0) {
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        
        setTimeRemaining({ days, hours, minutes });
      } else {
        
        clearInterval(intervalId);
        
        setTimeRemaining({ days: 0, hours: 0, minutes: 0 });
      }
    }, 1000); 

    
    return () => clearInterval(intervalId);
  }, []); 
  return (
    <div className="banner">
      
      <div className="bg-redish hidden sm:flex">
        <div className="top-section resp  px-4 py-3 flex justify-between w-10/12 m-auto items-center ">
          
          <div className="languages flex items-center gap-6 bg-[#131841] w-60 h-10 rounded-[5px] p-1">
            <button
              className={` w-full h-full ${
                active === 0
                  ? "bg-[#1A2250] rounded-[5px] border-[1px] border-[rgba(255,255,255,.2)] text-white"
                  : "text-[rgba(255,255,255,.6)]"
              }`}
              onClick={() => setActive(0)}
            >
              English
            </button>
            <button
              className={` w-full h-full ${
                active === 1
                  ? "bg-[#1A2250] rounded-[5px] border-[1px] border-[rgba(255,255,255,.2)] text-white"
                  : "text-[rgba(255,255,255,.6)]"
              }`}
              onClick={() => setActive(1)}
            >
              Español
            </button>
          </div>

          <div className="whiteHouseText">
            <Link to="/">
              <img src={text} className="w-44" alt="" />
            </Link>
          </div>

          <div className="couter ">
            <h2 className="poppins5 text-center text-white mb-2">
              Voting starts
            </h2>

            <div className="flex items-center gap-6">
              <div className="flex flex-col  poppins5 text-center text-white">
                <p className="flex gap-2 text-center">
                  {" "}
                  <span className="bg-[#131841] p-2 poppins6 rounded-lg w-[35px] h-[35px] text-white">
                    {Math.floor(timeRemaining.days / 100)}
                  </span>{" "}
                  <span className="bg-[#131841] p-2 poppins6 rounded-lg w-[35px] h-[35px] text-white">
                    {Math.floor((timeRemaining.days % 100) / 10)}
                  </span>{" "}
                  <span className="bg-[#131841] p-2 poppins6 rounded-lg w-[35px] h-[35px] text-white">
                    {timeRemaining.days % 10}
                  </span>{" "}
                </p>
                Days
              </div>
              <div className="  poppins5 text-center text-white">
                
                <p className="flex gap-2">
                  <span className="bg-[#131841] p-2 poppins6 rounded-lg w-[35px] h-[35px] text-white">
                    {Math.floor(timeRemaining.hours / 10)}
                  </span>{" "}
                  <span className="bg-[#131841] p-2 poppins6 rounded-lg w-[35px] h-[35px] text-white">
                    {timeRemaining.hours % 10}
                  </span>{" "}
                </p>
                <p>Hours</p>
              </div>
              <div className="text-center">
                <p className="flex gap-2">
                  <span className="bg-[#131841] p-2 poppins6 rounded-lg w-[35px] h-[35px] text-white">
                    {Math.floor(timeRemaining.minutes / 10)}
                  </span>{" "}
                  <span className="bg-[#131841] p-2 poppins6 rounded-lg w-[35px] h-[35px] text-white">
                    {timeRemaining.minutes % 10}
                  </span>{" "}
                </p>
                <p className="poppins5 text-white">Minutes</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="app-banner  overflow-hidden h-[71.9vh] "
        style={{
          background: `linear-gradient(91deg, rgba(0, 0, 0, 0.65) 33.57%, rgba(0, 0, 0, 0.32) 118.84%), url(${bg})`,
        }}
      >
        <div className="hidden lg:block">
          <Navbar />
        </div>
        <div className="block lg:hidden">
          <MobileNav />
        </div>
        <div className="flex flex-col text-center items-center justify-center h-[80%]">
          <h1 className="text-whiteColor  sm:text-[33px] md:text-[40px] lg:text-[54px] xl-a:text-[78px] xl:w-[90%] 2xl:w-[50%] uppercase orbit9">
            {" "}
            <span className="text-redish ">{redTitle}</span> {bannerTitle}
          </h1>
          <p
            className={`text-whiteColor space   orbit6 w-[90%] xl:w-[66%] 2xl:w-[36%] text-[10px]  ${
              location.pathname === "/predictandelectoral"
                ? "xl:text-[20px]"
                : "xl:text-[25px]"
            }`}
          >
            {bannerDesc}
          </p>
          <p
            className={`text-whiteColor  space  orbit6 mt-20 w-[90%] xl:w-[66%] 2xl:w-[36%] text-[10px]  ${
              location.pathname === "/predictandelectoral"
                ? "xl:text-[15px]"
                : "xl:text-[25px]"
            }`}
          >
            {bannerDesc2}
          </p>
        </div>
      </div>
    </div>
  );
}

export default AppBanner;
