import React, { useEffect, useState } from "react";
import question from "../../images/question.png";
// import title from '../../images/demTITLE.png'
import calender from "../../images/calender.png";
import PredictSlider from "./PredictSlider";
import obama from "../../images/Condidates/Barak Obama (Dem).jpg";
import west from "../../images/Condidates/Cornel West.jpg";
import check from "../../images/check.png";
import axios from "axios";
import { Await } from "react-router-dom";

function Predict({ titleImage, party, afterchange, submitData, name, onSelectionChange  }) {
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [candidateData, setCandidateData] = useState([]);
  console.log("candidateData", candidateData);
  const [presdborder, setPresdborder] = useState(true);
  const [viceborder, setViceborder] = useState(true);

  const [sliderBackground, setSliderBackground] = useState("transparent");

  useEffect(() => {
    if (onSelectionChange) {
      onSelectionChange(!presdborder && !viceborder);
    }
  }, [presdborder, viceborder, onSelectionChange]);

  // useEffect(() => {
  //   axios
  //     .get(
  //       "https://pankhay.com/thewhitehousegame/public/api/get_votter_candidate",
  //       {
  //         headers: {
  //           Accept: "application/json",
  //         },
  //       }
  //     )
  //     .then((res) => {
  //       setCandidateData(res.data.votter_candidate);
  //     })
  //     .catch((err) => {
  //       alert(err);
  //     });
  // }, []);
  const handleButtonClick = () => {
    setIsButtonClicked(true);
    setSliderBackground(
      "linear-gradient(90deg, #ED1C24 0%, #BE1E2E 50%, #1C2452 100%)"
    );
    submitData();
  };
  // const data = [obama, west];
  const getButtonBackground = (party) => {
    switch (party) {
      case "Democratic":
        return "bg-blue-500 text-white";
      case "Republican":
        return "bg-red-500 text-white";
      case "Independent":
        return "bg-green-500 text-white";
      default:
        return "bg-white !text-black";
    }
  };

  return (
    <div className="bg-[#1c2452] pb-[20px]">
      <div className=" m-auto ">
        {/* <img src={question} alt="" className="m-auto" /> */}
        {/* <img src={titleImage} alt="" className="m-auto mt-5" /> */}
        {/* <p className="poppins4 text-white text-center xl:w-[55%] xl:text-[30px] m-auto mt-5">
        Predict America’s next President and Vice President <br />Select who you predict will be the candidates on
        </p> */}
        {/* <p className="poppins4 text-white/80 xl:text-[22px] text-center justify-center flex items-center gap-2 m-auto mt-5">
          <img src={calender} alt="" />
          Tuesday, November
          <span className="poppins5 text-white xl:text-[22px]">5, 2024</span>
        </p> */}

        <div
          className={` m-auto rounded-lg  relative mt-12 ${
            isButtonClicked && "border-8 px-3"
          }`}
          style={{ background: sliderBackground }}
        >
          <div className="flex gap-4 items-center justify-start  m-auto mt-[50px]">
            <div className="w-[200px] h-[220px]  m-auto">
              <h4 className="poppins6 text-white xl:text-[20px]">President</h4>
              <div>
                <PredictSlider
                  party_name={party}
                  // data={data}
                  printData={console.log("hello")}
                  data1="president"
                  imageValue={() => setPresdborder(false)}
                  selecClass={isButtonClicked ? false : true}
                />
              </div>
            </div>
            <div className="w-[200px] h-[220px]  m-auto">
              <h4 className="poppins6 text-white xl:text-[20px]">
                Vice President
              </h4>
              <div>
                <PredictSlider
                  party_name={party}
                  afterChange={afterchange}
                  imageValue={() => setViceborder(false)}
                  data1="VicePresident"
                  selecClass={isButtonClicked ? false : true}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-center relative  mt-24">
            {/* Button */}
            {/* <button
              onClick={handleButtonClick}
              className={`rounded-lg px-5 py-3 bg-red-500 h-[40px] sm:w-[300px] sm:h-[50px] flex items-center justify-center gap-1 text-white font-poppins ml-3 ${isButtonClicked ? "hidden" : ""
                }`}
            >
              <img src={check} className="w-4" alt="" />{" "}
              {isButtonClicked ? "Selected" : "Select"}
            </button> */}
            <button
              disabled={presdborder || viceborder}
              onClick={handleButtonClick}
              className={`rounded-lg px-5 py-3 h-[40px] sm:w-[300px] sm:h-[50px] flex items-center justify-center gap-1 text-white font-poppins ml-3 ${
                isButtonClicked ? "hidden" : getButtonBackground(party)
              } ${presdborder || viceborder ? "opacity-40" : ""}`}
            >
              <img src={check} className="w-4" alt="" />{" "}
              {isButtonClicked ? "Selected" : "Select"}
            </button>

            {isButtonClicked && (
              <img onClick={()=>{setIsButtonClicked(false);setSliderBackground("transparent")}}
                className="w-12 cursor-pointer h-12 absolute left-[49%] transform -translate-x-2 -translate-y-5"
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
