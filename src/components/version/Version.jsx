import React, { useState } from "react";

import Layer from "../../images/Layer.png";
import { useNavigate } from "react-router-dom";

import { Card } from "@material-tailwind/react";
import secureLocalStorage from "react-secure-storage";


export const Version = () => {
    const navigate  = useNavigate();
    const path=secureLocalStorage.getItem('election_path');

    const [selectedOption, setSelectedOption] = useState(null);

    const handleNavigate = () => {
        if (selectedOption === "predict") {
            navigate('/predict');
        } else if (selectedOption === "electoral") {
            navigate('/predictandelectoral');
        }
    };

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
    };


    // const handlenavigate = () => {
    //     navigate('/predict');
    // }
  return (
    <>
      <Card className="max-w-[18rem] lg:max-w-[30rem] flex justify-center mx-auto lg:mt-6 lg:mb-6  ">
        <div className="bg-[#1c2452]  rounded-lg">
          

          <div className="flex justify-center items-center pt-3 lg:pt-5">
            <img className="w-10 h-10 lg:w-20 lg:h-20" src={Layer} alt="" />
          </div>
          <div className="flex justify-center pt-3 lg:pt-10">
            <h2 className="text-white text-[12px]  lg:text-[19px] font-poppins">
            Tell us who you think will win
            </h2>
          </div>
          <div className="flex justify-center items-center text-center pt-3 lg:pt-5 mr-7 lg:mr-0">
            <div class="inline-flex items-center">
              <label
                class="relative flex items-center p-3 rounded-full cursor-pointer"
                htmlFor="red"
              >
                <input
                  name="option"
                  type="radio"
                  class="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-blue-gray-200 text-red-500 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-red-500 checked:before:bg-red-500 hover:before:opacity-10"
                  id="predict"
                
                // onClick={()=>navigate("/predict")}
                onClick={() => handleOptionSelect("predict")}
                />
                <span class="absolute text-red-500 transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-3.5 w-3.5"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                  >
                    <circle data-name="ellipse" cx="8" cy="8" r="8"></circle>
                  </svg>
                </span>
              </label>
              <label
                class="mt-px font-poppins text-white cursor-pointer select-none text-[9px] whitespace-nowrap lg:text-[16px]"
                htmlFor="react"
              >
                Predict who will be next President
              </label>
            </div>
          </div>
          <div className="flex justify-center items-center text-center pt-5 mx-14">
            <div class="inline-flex items-center">
              <label
                class="relative flex items-center p-3 rounded-full cursor-pointer"
                htmlFor="red"
              >
                <input
                  name="option"
                  type="radio"
                  class="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-blue-gray-200 text-red-500 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-red-500 checked:before:bg-red-500 hover:before:opacity-10"
                  id="electoral"
                  value="1"
                  onClick={() => handleOptionSelect("electoral")}
                />
                <span class="absolute text-red-500 transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-3.5 w-3.5"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                  >
                    <circle data-name="ellipse" cx="8" cy="8" r="8"></circle>
                  </svg>
                </span>
              </label>
              <label
                class="mt-px font-poppins text-white cursor-pointer select-none text-[9px] whitespace-nowrap lg:text-[14px] "
                htmlFor="react"
              >
                Predict President and Electoral College
              </label>
            </div>
          </div>
          <div className="flex justify-center pb-10 mt-10 ">
            <button onClick={handleNavigate} className="rounded-lg px-5 py-3 bg-red-500 w-[250px] h-[50px] text-white font-poppins">
              Next
            </button>
            
          </div>
        </div>
      </Card>
    </>
  );
};