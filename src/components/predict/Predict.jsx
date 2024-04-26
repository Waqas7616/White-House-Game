import React, { useState } from "react";
import question from "../../images/question.png";
// import title from '../../images/demTITLE.png'
import calender from "../../images/calender.png";
import PredictSlider from "./PredictSlider";
import obama from "../../images/Condidates/Barak Obama (Dem).jpg";
import west from "../../images/Condidates/Cornel West.jpg";
import check from "../../images/check.png";

function Predict({ titleImage, party }) {
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const [sliderBackground, setSliderBackground] = useState("transparent");

  const handleButtonClick = () => {
    setIsButtonClicked(true);
    setSliderBackground(
      "linear-gradient(90deg, #ED1C24 0%, #BE1E2E 50%, #1C2452 100%)"
    );
  };
  const data = [obama, west];
  return (
    <div className="bg-[#1c2452] py-[100px]">
      <div className="resp m-auto w-10/12">
        <img src={question} alt="" className="m-auto" />
        <img src={titleImage} alt="" className="m-auto mt-5" />
        <p className="poppins4 text-white text-center xl:w-[55%] xl:text-[30px] m-auto mt-5">
          Select who you think will be the Democratic Party&apos;s Presidential
          candidate on
        </p>
        <p className="poppins4 text-white/80 xl:text-[22px] text-center justify-center flex items-center gap-2 m-auto mt-5">
          <img src={calender} alt="" />
          Tuesday, November
          <span className="poppins5 text-white xl:text-[22px]">5, 2024</span>
        </p>

        <div
          className={`w-[73rem] rounded-lg  relative ${isButtonClicked&&'border-8'}`}
          style={{ background: sliderBackground }}
        >
          
          <div className="flex gap-4 items-center justify-start w-full m-auto mt-[50px]">
            <div className="xl:w-[562px] xl:h-[572px] m-auto">
              <h4 className="poppins6 text-white xl:text-[38px]">President</h4>
              <div>
                <PredictSlider
                  party_name={party}
                  data={data}
                  printData={console.log("hello")}
                />
              </div>
            </div>
            <div className="xl:w-[562px] xl:h-[572px] m-auto">
              <h4 className="poppins6 text-white xl:text-[38px]">
                Vice President
              </h4>
              <div>
                <PredictSlider party_name={party} data={data} />
              </div>
            </div>
          </div>

          
          <div className="flex justify-start relative mt-24">
            {/* Button */}
            <button
              onClick={handleButtonClick}
              className={`rounded-lg px-5 py-3 bg-red-500 w-[300px] h-[50px] text-white font-poppins ml-3 ${
                isButtonClicked ? "hidden" : ""
              }`}
            >
              {isButtonClicked ? "Selected" : "Select"}
            </button>

            
            {isButtonClicked && (
              <img
                className="w-12 h-12 absolute left-[49%] transform -translate-x-2 -translate-y-5"
                src={check}
                alt=""
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Predict;
