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
        className="w-10/12 m-auto rounded-[48px]  flex items-center justify-start relative pr-2"
        style={{
          background: `url(${bg})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <div className="flex items-center  w-full ">
          <div>
            <img src={mobile} alt="" className="rounded-[48px]" />
          </div>
          <div className="">
            <h2 className="text-[18px] sm:text-[20px] md:text-[23px] lg:text-[41px]  text-[#fff]  orbit9">
              Download{" "}
              <span className="text-redish ">The White House Game </span>
              <br />
              And make your voice heard!
            </h2>
            <p className="text-[#fff] text-[10px] md:text-[14px] lg:text-[16px] lg:w-[700px] xl:w-[800px]">
              Predict who you think will win. Open an account and if you change
              your mind, update your choice. This game is for THINKING people
            </p>
            <div className="mt-8 flex items-center gap-3">
        <img src={app} alt="app" />
        <img src={play} alt="play" />
      </div>
          </div>
        </div>
      </div>

      {/* -----FOOTER----- */}
      <div className="footer w-10/12 m-auto mt-20 pb-4 border-b-[1px] border-[rgba(255,255,255,0.6)]">
        <div className="flex flex-col gap-4 md:gap-0 md:flex-row justify-between items-center">
          <div className="logo">
            <img src={logo} alt="" />
          </div>
          <div>
            <div className="flex gap-4">
              <h2 className="text-[12px] lg:text-[16px] poppins4 text-[#fff]">
                Contact Us
              </h2>
              <h2 className="text-[12px] lg:text-[16px] poppins4 text-[#fff]">
                Privacy Policy
              </h2>
              <h2 className="text-[12px] lg:text-[16px] poppins4 text-[#fff]">
                Terms and Conditions
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
      <p className="text-[14px] text-[#fff] poppins3 text-center mt-3">
        THE WHITE HOUSE GAME. COPYRIGHT © 2024. ALL RIGHTS RESERVED
      </p>
      
    </div>
  );
}
