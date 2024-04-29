import React from "react";
import rules from "../../images/rules.png";
import rulesone from "../../images/rulesone.png";
import right from "../../images/right.png";

export const Rules = () => {
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
            option 1
          </h2>
          <div className="absolute top-[71%] h-[1px] bg-redish w-[4%] left-[585px]"></div>
          <div className="absolute top-[69%] h-[1px] bg-redish w-[4%] right-[584px]"></div>
        </div>

        <div className="flex justify-center items-center pt-5">
          <p className="font-poppins text-[13px] text-white w-[221px] text-center opacity-[80%] font-normal">
            Predict the winning President/Vice President and party
          </p>
        </div>

        <div className="flex justify-center items-center pt-5 relative">
          <h2 className="font-poppins text-[13px] text-white font-bold opacity-[90%]">
            option 2
          </h2>
          <div className="absolute top-[71%] h-[1px] bg-redish w-[4%] left-[585px]"></div>
          <div className="absolute top-[69%] h-[1px] bg-redish w-[4%] right-[584px]"></div>
        </div>

        <div className="flex justify-center items-center pt-5 pb-36">
          <p className="font-poppins text-[13px] text-white w-[295px] text-center opacity-[80%] font-normal">
            Predict the winning President/Vice President and party in each state
          </p>
        </div>

        <div class="absolute bottom-0 left-0 right-0 flex justify-center items-center ">
          <img className="w-[85rem] h-[13rem]" src={rulesone} alt="" />
        </div>
        <div className="absolute flex justify-end items-center right-10 bottom-10 cursor-pointer ">
          <img src={right} alt="" />
        </div>
      </div>
    </>
  );
};
