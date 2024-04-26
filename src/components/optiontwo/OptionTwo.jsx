import React from "react";
import Vector from "../../images/Vector.png";
import rules from "../../images/rules.png";
import rulesone from "../../images/rulesone.png";

import Layer from "../../images/Layer.png";
import Vectorone from "../../images/Vectorone.png";


export const OptionTwo = () => {
  return (
    <>
      <div className="bg-[#1c2452] pb-10 relative">
        <div className="flex justify-center items-center pt-10">
          <img src={rules} alt="" />
        </div>
        <div className="flex justify-center items-center mt-10">
          <h2 className="font-poppins text-[22px] text-white">
            Rules of the game
          </h2>
        </div>
        <div className="flex justify-center items-center pt-5">
          <h2 className="font-poppins text-[13px] text-white font-semibold opacity-[95%]">
            There are two options
          </h2>
        </div>
        <div className="flex justify-center items-center pt-5 relative ">
          <h2 className="font-poppins text-[13px] text-white font-bold opacity-[90%]">
            option 2
          </h2>
          <div className="absolute top-[71%] h-[1px] bg-redish w-[4%] left-[585px]"></div>
          <div className="absolute top-[69%] h-[1px] bg-redish w-[4%] right-[584px]"></div>
        </div>

        <div className="flex justify-center items-center pt-5">
          <img src={Layer} alt="" />
        </div>

        <div className="flex justify-center items-center pt-5">
          <p className="font-poppins text-[13px] text-white w-[221px] text-center opacity-[80%] font-normal">
            Predict President and Electoral College
          </p>
        </div>

        <div className="flex justify-center items-center pt-5">
          <p className="font-poppins text-[13px] text-white w-[295px] text-center opacity-[80%] font-normal">
            As well as predicting President and Vice President
          </p>
        </div>

        <div className="flex justify-center items-center ml-64">
          <img src={Vector} alt="" />
        </div>

        <div className="flex justify-center items-center pt-5">
          <p className="font-poppins text-[13px] text-white  text-center opacity-[80%] font-normal">
            Go through all states and predict which party will win.
          </p>
        </div>

        <div className="flex justify-start items-center ml-[29rem]">
          <img src={Vectorone} alt="" />
        </div>

        <div className="flex justify-center items-center pt-5 ">
          <p className="font-poppins text-[13px] text-white w-[295px] text-center opacity-[80%] font-normal">
            You can also create an account and change your prediction as we get
            closer to
          </p>
        </div>

        <div className="flex justify-center items-center pt-5">
          <h2 className="text-[18px] text-white font-semibold">
            Election day 2024
          </h2>
        </div>
        <div className="flex justify-center items-center pt-5">
          <h2 className="text-[13px] text-white font-normal ">
            Thats really is it
          </h2>
        </div>

        <div className="flex justify-center items-center pt-5 ">
          <h2 className="text-[18px] text-white font-semibold">
            so lets start
          </h2>
        </div>

        <div className="flex justify-center mb-36 relative mt-16 pb-[39rem] ">
          <button className="rounded-lg px-5 py-3 bg-red-500 w-[300px] h-[50px] text-white font-poppins">
            Lets Start
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

        <div class="absolute bottom-0 left-0 right-0 flex justify-center items-center ">
          <img className="w-[85rem] h-[43rem]" src={rulesone} alt="" />
        </div>
        
      </div>
    </>
  );
};
