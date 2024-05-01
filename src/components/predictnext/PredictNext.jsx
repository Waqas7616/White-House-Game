import React from "react";
import logo1 from "../../images/logo1.png";
import flagus from "../../images/flagus.png";
import { useNavigate } from "react-router-dom";

export const PredictNext = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="bg-[#1c2452] pb-10 relative">
        <div className="flex justify-center pt-5 relative">
          <h2 className="text-white text-[23px] font-poppins">Welcome To</h2>
          <div className="absolute top-[66%] h-[1px] bg-red-500 w-[6%] left-[530px]"></div>
          <div className="absolute top-[66%] h-[1px] bg-red-500 w-[6%] right-[520px]"></div>
        </div>

        <div className="flex justify-center pt-5 ">
          <img
            className="w-[304px] h-[271px] object-cover"
            src={logo1}
            alt=""
          />
        </div>
        <div className="flex justify-center pt-6">
          <h2 className="text-white font-poppins text-[14px] font-light w-[247px] text-center">
            Where you predict the next President of the United States
          </h2>
        </div>
        <div className="flex justify-center mb-36 relative mt-16 ">
          <button
            onClick={() => navigate("/Rules")}
            className="rounded-lg px-5 py-3 bg-red-500 w-[300px] h-[50px] text-white font-poppins"
          >
            Game Rules
          </button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="w-6 h-6 text-white absolute right-[37.5rem] top-3"
          >
            <path
              fill-rule="evenodd"
              d="M16.72 7.72a.75.75 0 0 1 1.06 0l3.75 3.75a.75.75 0 0 1 0 1.06l-3.75 3.75a.75.75 0 1 1-1.06-1.06l2.47-2.47H3a.75.75 0 0 1 0-1.5h16.19l-2.47-2.47a.75.75 0 0 1 0-1.06Z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <div class="absolute bottom-0 left-0 right-0 flex justify-center items-center">
          <img className="w-[85rem] h-[10rem]" src={flagus} alt="" />
        </div>
      </div>
    </>
  );
};
