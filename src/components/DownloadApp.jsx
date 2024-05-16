import React from "react";
import bg from "../images/AppFrame.png";
import mobile from "../images/Moblie.png";
import logo from "../images/logo1.png";
import app from "../images/App.png";
import play from "../images/Play.png";

export default function DownloadApp() {
  return (
    <div className="bg-[#1C2452] pt-20 pb-4">
      <div
        className="w-10/12 resp m-auto rounded-[48px]  flex items-center justify-start relative pr-14"
        style={{
          background: `url(${bg})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <div className="flex items-center  w-full  ">
          <div className="hidden md:block">
            <img src={mobile} alt="" className="rounded-[48px]" />
          </div>
          <div className="text-center sm:text-justify pt-4 sm:pt-0 lg:-ml-10 ">
            <h2 className="text-[12px] sm:text-[20px] md:text-[15px] lg:text-[18px] xl:text-[31px] xl-a:text-[41px]  pl-[20px] lg:pl-0  text-[#fff]  orbit9">
              Download{" "}
              <span className="text-redish ">The White House Game </span>
              <br />
              And make your voice heard!
            </h2>
            <p className="text-[#fff] pt-3 sm:pt-1 pl-[20px] lg:pl-0 text-[8px] md:text-[10px] lg:text-[10px] xl:text-[14px] xl-a:text-[18px] acer:text-[20px] 2xl:text-[25px] lg:w-[432px] xl:w-[625px] 2xl:w-[906px]">
              Predict who you think will win. Open an account and if you change
              your mind, update your choice. This game is for THINKING people
            </p>
            <div className="mt-8 flex justify-center items-center sm:flex sm:justify-normal gap-3 pb-5 ps-3 sm:ps-0 lg:ps-0 sm:pb-5 ">
              <img className="w-[5rem] sm:w-[10rem]" src={app} alt="app" />
              <img className="w-[5rem] sm:w-[10rem]" src={play} alt="play" />
            </div>
          </div>
        </div>
      </div>

      {/* -----FOOTER----- */}
      <div className="footer w-10/12 resp m-auto mt-20 pb-4 border-b-[1px] border-[rgba(255,255,255,0.6)]">
        <div className="flex flex-col gap-4 md:gap-6 lg:gap-6 md:flex-row justify-between items-center">
          <div className="logo">
            <img src={logo} alt="" />
          </div>
          <div>
            <div className="flex gap-3 sm:gap-8 mx-5 sm:mx-0">
              {/* <h2 className="text-[8px] text-nowrap lg:text-[12px] poppins4 text-[#fff]">
                Contact Us
              </h2> */}
              <h2 className="text-[8px] text-nowrap lg:text-[12px] poppins4 text-[#fff]">
                Privacy Policy
              </h2>
              <h2 className="text-[8px] text-nowrap lg:text-[12px] poppins4 text-[#fff]">
                Terms and Conditions
              </h2>
              <h2 className="text-[8px] text-nowrap lg:text-[12px] poppins4 text-[#fff]">
                White House Shop
              </h2>
            </div>
            <div className="flex items-center justify-center gap-4 mt-4">
              <i className="text-white fa-brands fa-facebook-f"></i>
              <i className="text-white fa-brands fa-twitter"></i>
              <i className="text-white fa-brands fa-linkedin-in"></i>
              <i className="text-white fa-brands fa-instagram"></i>
            </div>
          </div>
          <div>
            <h2 className="text-[#fff] orbit7 text-[14px] lg:text-[18px]">
              Join White House News
            </h2>
            <p className="text-[#fff] poppins4 text-[11px] lg:text-[14px] my-1">
              Our free monthly newsletter
            </p>
            <div className="bg-[#fff] flex justify-between pl-2 rounded-l-[6px]">
              <input
                className="border-0 bg-transparent text-[10px] lg:text-[13px] outline-none"
                type="text"
                placeholder="Enter your email"
              />
              <button
                className="bg-redish text-[10px] lg:text-[13px] text-[#fff] p-3 poppins5 "
                style={{
                  background:
                    "linear-gradient(90deg, #ED1C24 0%, #1C2452 100%)",
                }}
              >
                JOIN
              </button>
            </div>
          </div>
        </div>
        {/* <hr className="bg-[red] h-[1px]" /> */}
      </div>
      <p className="text-[14px] text-[#fff] poppins3 text-center mt-3 pb-20">
      The White House Game © 2024. All rights reserved. Sitemap
      </p>

    </div>
  );
}
