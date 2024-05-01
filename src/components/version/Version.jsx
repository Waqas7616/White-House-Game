import React from "react";

import Layer from "../../images/Layer.png";
import { useNavigate } from "react-router-dom";

import { Card } from "@material-tailwind/react";


export const Version = () => {
    const navigate  = useNavigate();

    const handlenavigate = () => {
        navigate('/predict');
    }
  return (
    <>
      <Card className="max-w-[30rem] flex justify-center mx-auto mt-6 mb-6 ">
        <div className="bg-[#1c2452]  rounded-lg">
          

          <div className="flex justify-center items-center pt-5">
            <img src={Layer} alt="" />
          </div>
          <div className="flex justify-center pt-10">
            <h2 className="text-white text-[19px] font-poppins">
              Which option do you want to play
            </h2>
          </div>
          <div className="flex justify-center items-center text-center pt-5  mx-16">
            <div class="inline-flex items-center">
              <label
                class="relative flex items-center p-3 rounded-full cursor-pointer"
                htmlFor="red"
              >
                <input
                  name="gender"
                  type="radio"
                  class="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-blue-gray-200 text-red-500 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-red-500 checked:before:bg-red-500 hover:before:opacity-10"
                  id="male"
                
                // onClick={()=>navigate("/predict")}
                onClick={handlenavigate}
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
                class="mt-px font-poppins text-white cursor-pointer select-none text-[16px]"
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
                  name="gender"
                  type="radio"
                  class="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-blue-gray-200 text-red-500 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-red-500 checked:before:bg-red-500 hover:before:opacity-10"
                  id="male"
                  value="1"
                //   onClick={() => navigate("/predict")}
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
                class="mt-px font-poppins text-white cursor-pointer select-none text-[14px] "
                htmlFor="react"
              >
                Predict President and Electoral College
              </label>
            </div>
          </div>
          <div className="flex justify-center pb-10 mt-10 ">
            <button onClick={handlenavigate} className="rounded-lg px-5 py-3 bg-red-500 w-[250px] h-[50px] text-white font-poppins">
              Next
            </button>
            
          </div>
        </div>
      </Card>
    </>
  );
};