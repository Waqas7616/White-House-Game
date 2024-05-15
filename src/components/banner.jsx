import React, { useState, useEffect } from "react";

import "./banner.css";
import ios from "../images/App Store.png";
import bg from "../images/banner.png";
import playstore from "../images/Google Play.png";
import presidents from "../images/presidents.png";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CustomSlider from "./slider/Slider";
import Navbar from "./Navbar";
import text from "../images/whitehouse.png";

function Banner() {
  const [active, setActive] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
  });

  const settings = {
    dots: false,
    arrow: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slideToScroll: 1,
  };
  useEffect(() => {
    // Set up an interval to update the countdown every second
    const intervalId = setInterval(() => {
      // Get the target date (November 5, 2024 00:00:00) in milliseconds
      const countDownDate = new Date("November 5, 2024 00:00:00").getTime();
      // Get the current time in milliseconds
      const now = new Date().getTime();
      // Calculate the difference between the target date and the current time
      const distance = countDownDate - now;

      // If there is time remaining
      if (distance > 0) {
        // Calculate days, hours, and minutes remaining
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        // Update the state with the time remaining
        setTimeRemaining({ days, hours, minutes });
      } else {
        // If the countdown has reached zero, clear the interval
        clearInterval(intervalId);
        // Set the time remaining to 0
        setTimeRemaining({ days: 0, hours: 0, minutes: 0 });
      }
    }, 1000); // Update every 1000 milliseconds (1 second)

    // Clean up function to clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []); // Run this effect only once, when the component mounts

  return (
    <>
      <div className="banner">
        <div className="bg-redish hidden sm:flex">
          <div className="top-section resp  p-4 flex justify-between w-10/12 m-auto items-center ">
            {/* <div className="social-icons flex gap-3  ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M15.7956 17.77H1.97444C0.884057 17.77 0 16.8859 0 15.7956V1.97444C0 0.884057 0.884057 0 1.97444 0H15.7956C16.8859 0 17.77 0.884057 17.77 1.97444V15.7956C17.77 16.8859 16.8859 17.77 15.7956 17.77Z"
                  fill="white"
                />
                <mask id="path-2-inside-1_49_206" fill="white">
                  <path d="M13.9487 13.8214H10.7713L3.86523 3.94922H7.04261L13.9487 13.8214ZM11.1499 12.9843H12.4151L6.66401 4.78638H5.39888L11.1499 12.9843Z" />
                </mask>
                <path
                  d="M13.9487 13.8214H10.7713L3.86523 3.94922H7.04261L13.9487 13.8214ZM11.1499 12.9843H12.4151L6.66401 4.78638H5.39888L11.1499 12.9843Z"
                  fill="#ED1C24"
                />
                <path
                  d="M13.9487 13.8214V24.8214H35.0681L22.9622 7.51608L13.9487 13.8214ZM10.7713 13.8214L1.75789 20.1268L5.04202 24.8214H10.7713V13.8214ZM3.86523 3.94922V-7.05078H-17.2542L-5.14822 10.2546L3.86523 3.94922ZM7.04261 3.94922L16.0561 -2.35614L12.7719 -7.05078H7.04261V3.94922ZM11.1499 12.9843L2.14487 19.3016L5.4299 23.9843H11.1499V12.9843ZM12.4151 12.9843V23.9843H33.5688L21.4201 6.66695L12.4151 12.9843ZM6.66401 4.78638L15.6691 -1.53094L12.3841 -6.21362H6.66401V4.78638ZM5.39888 4.78638V-6.21362H-15.7548L-3.60619 11.1037L5.39888 4.78638ZM13.9487 2.82144H10.7713V24.8214H13.9487V2.82144ZM19.7848 7.51608L12.8787 -2.35614L-5.14822 10.2546L1.75789 20.1268L19.7848 7.51608ZM3.86523 14.9492H7.04261V-7.05078H3.86523V14.9492ZM-1.97085 10.2546L4.93526 20.1268L22.9622 7.51608L16.0561 -2.35614L-1.97085 10.2546ZM11.1499 23.9843H12.4151V1.98428H11.1499V23.9843ZM21.4201 6.66695L15.6691 -1.53094L-2.34107 11.1037L3.40999 19.3016L21.4201 6.66695ZM6.66401 -6.21362H5.39888V15.7864H6.66401V-6.21362ZM-3.60619 11.1037L2.14487 19.3016L20.155 6.66695L14.404 -1.53094L-3.60619 11.1037Z"
                  fill="#ED1C24"
                  mask="url(#path-2-inside-1_49_206)"
                />
                <mask id="path-4-inside-2_49_206" fill="white">
                  <path d="M4.86978 13.8211L8.42526 9.7024L7.96028 9.08588L3.86133 13.8211H4.86978Z" />
                </mask>
                <path
                  d="M4.86978 13.8211L8.42526 9.7024L7.96028 9.08588L3.86133 13.8211H4.86978Z"
                  fill="#ED1C24"
                />
                <path
                  d="M4.86978 13.8211V21.8211H8.53224L10.9255 19.0487L4.86978 13.8211ZM8.42526 9.7024L14.481 14.93L18.7011 10.0414L14.8123 4.88524L8.42526 9.7024ZM7.96028 9.08588L14.3474 4.26871L8.38849 -3.63219L1.91166 3.85001L7.96028 9.08588ZM3.86133 13.8211L-2.18728 8.58522L-13.6447 21.8211H3.86133V13.8211ZM10.9255 19.0487L14.481 14.93L2.36953 4.47476L-1.18595 8.59345L10.9255 19.0487ZM14.8123 4.88524L14.3474 4.26871L1.57318 13.903L2.03816 14.5196L14.8123 4.88524ZM1.91166 3.85001L-2.18728 8.58522L9.90994 19.057L14.0089 14.3217L1.91166 3.85001ZM3.86133 21.8211H4.86978V5.82109H3.86133V21.8211Z"
                  fill="#ED1C24"
                  mask="url(#path-4-inside-2_49_206)"
                />
                <mask id="path-6-inside-3_49_206" fill="white">
                  <path d="M9.10742 7.76039L9.55414 8.39666L13.3949 3.94922H12.4077L9.10742 7.76039Z" />
                </mask>
                <path
                  d="M9.10742 7.76039L9.55414 8.39666L13.3949 3.94922H12.4077L9.10742 7.76039Z"
                  fill="#ED1C24"
                />
                <path
                  d="M9.10742 7.76039L3.05976 2.52342L-1.02911 7.24526L2.56001 12.3573L9.10742 7.76039ZM9.55414 8.39666L3.00673 12.9936L8.90255 21.391L15.6088 13.6255L9.55414 8.39666ZM13.3949 3.94922L19.4496 9.17804L30.874 -4.05078H13.3949V3.94922ZM12.4077 3.94922V-4.05078H8.75269L6.36005 -1.28775L12.4077 3.94922ZM2.56001 12.3573L3.00673 12.9936L16.1015 3.79976L15.6548 3.1635L2.56001 12.3573ZM15.6088 13.6255L19.4496 9.17804L7.34022 -1.2796L3.49943 3.16784L15.6088 13.6255ZM13.3949 -4.05078H12.4077V11.9492H13.3949V-4.05078ZM6.36005 -1.28775L3.05976 2.52342L15.1551 12.9974L18.4554 9.18619L6.36005 -1.28775Z"
                  fill="#ED1C24"
                  mask="url(#path-6-inside-3_49_206)"
                />
              </svg>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
              >
                <path
                  d="M15.9966 0H1.7774C0.799829 0 0 0.799829 0 1.7774V15.9966C0 16.9742 0.799829 17.774 1.7774 17.774H15.9966C16.9742 17.774 17.774 16.9742 17.774 15.9966V1.7774C17.774 0.799829 16.9742 0 15.9966 0ZM5.3322 15.1079H2.6661V7.10959H5.3322V15.1079ZM3.99915 5.59881C3.11045 5.59881 2.39949 4.88785 2.39949 3.99915C2.39949 3.11045 3.11045 2.39949 3.99915 2.39949C4.88785 2.39949 5.59881 3.11045 5.59881 3.99915C5.59881 4.88785 4.88785 5.59881 3.99915 5.59881ZM15.1079 15.1079H12.4418V10.3978C12.4418 9.68686 11.8197 9.06473 11.1087 9.06473C10.3978 9.06473 9.77569 9.68686 9.77569 10.3978V15.1079H7.10959V7.10959H9.77569V8.17603C10.22 7.46508 11.1976 6.93185 11.9974 6.93185C13.686 6.93185 15.1079 8.35377 15.1079 10.0423V15.1079Z"
                  fill="white"
                />
              </svg>
            </div> */}
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
              <img src={text} className="w-32" alt="" />
            </div>
            <div className="couter ">
              <div className="flex items-center gap-6">
                <div className="flex flex-col  poppins5 text-center text-white">
                  <p className="flex gap-2 text-center">
                    {" "}
                    <span className="bg-white p-2 poppins4 rounded-lg w-[35px] h-[35px] text-black">
                      {Math.floor(timeRemaining.days / 100)}
                    </span>{" "}
                    <span className="bg-white p-2 poppins4 rounded-lg w-[35px] h-[35px] text-black">
                      {Math.floor((timeRemaining.days % 100) / 10)}
                    </span>{" "}
                    <span className="bg-white p-2 poppins4 rounded-lg w-[35px] h-[35px] text-black">
                      {timeRemaining.days % 10}
                    </span>{" "}
                  </p>
                  Days
                </div>
                <div className="  poppins5 text-center text-white">
                  {/* Hours */}
                  <p className="flex gap-2">
                    <span className="bg-white p-2 poppins4 rounded-lg w-[35px] h-[35px] text-black">
                      {Math.floor(timeRemaining.hours / 10)}
                    </span>{" "}
                    <span className="bg-white p-2 poppins4 rounded-lg w-[35px] h-[35px] text-black">
                      {timeRemaining.hours % 10}
                    </span>{" "}
                  </p>
                  <p>Hours</p>
                </div>
                <div className="text-center">
                  <p className="flex gap-2">
                    <span className="bg-white p-2 poppins4 rounded-lg w-[35px] h-[35px] text-black">
                      {Math.floor(timeRemaining.minutes / 10)}
                    </span>{" "}
                    <span className="bg-white p-2 poppins4 rounded-lg w-[35px] h-[35px] text-black">
                      {timeRemaining.minutes % 10}
                    </span>{" "}
                  </p>
                  <p className="poppins5 text-white">Minutes</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="main-banner relative overflow-hidden h-[85vh] lg:z-30">
          <Navbar />
          <div className="title-info w-10/12 m-auto  h-[80%] flex flex-col justify-center resp">
            <h1 className="text-whiteColor  sm:text-[33px] md:text-[40px] lg:text-[54px] xl-a:text-[78px] w-[50%] uppercase orbit9">
              the <span className="text-redish">white house </span>game
            </h1>
            <p className="text-whiteColor space lg:text-[16px] ">
              Predict the next President of the United States and tell the world
              what you think!
            </p>
            <div className="buttons mt-16 flex gap-4">
              <button className="border-0">
                <img
                  className="w-[6.5rem]  md:w-[10rem] lg:w-[14rem]"
                  src={ios}
                  alt=""
                />
              </button>
              <button className="border-0">
                <img
                  className="w-[6.5rem]  md:w-[10rem] lg:w-[14rem]"
                  src={playstore}
                  alt=""
                />
              </button>
            </div>
          </div>
          <img
            className="w-[50%] absolute md:-z-10 bottom-[-8%] right-0"
            src={presidents}
            alt=""
          />
        </div>
      </div>
      <CustomSlider />
    </>
  );
}

export default Banner;
