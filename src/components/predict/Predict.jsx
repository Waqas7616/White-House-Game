import React, { useEffect, useState } from "react";
import PredictSlider from "./PredictSlider";
import check from "../../images/check.png";
import { useStatePredictions } from "../../utils/StateIDs";

function Predict({
  party,
  afterchange,
  submitData,
  onSelectionChange,
  myData,
  
}) {
  const { president, vicePresident } = useStatePredictions();
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [error, setError] = useState("");
  const [presdborder, setPresdborder] = useState(true);
  const [viceborder, setViceborder] = useState(true);
  const [imgData,setImgData]=useState()

  const [sliderBackground, setSliderBackground] = useState("transparent");

  useEffect(() => {
    if (onSelectionChange) {
      onSelectionChange(!presdborder && !viceborder);
    }
  }, [presdborder, viceborder, onSelectionChange]);
  useEffect(() => {
    console.log("my prop data is", imgData);
   
      setIsButtonClicked(false);
      setSliderBackground("");
      setImgData(myData)
      setPresdborder(true);
      setViceborder(true)
    
  }, [myData]);
  const handleButtonClick = () => {
    if (president !== vicePresident) {
      setIsButtonClicked(true);

      setSliderBackground(
        "linear-gradient(90deg, #ED1C24 0%, #BE1E2E 50%, #1C2452 100%)"
      );

      submitData();
      setError("");
    } else {
      setError("Please select different candidates");
    }
  };
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
        <div
          className={` m-auto rounded-lg  relative mt-12 ${
            isButtonClicked && "border-8 px-3"
          }`}
          style={{ background: sliderBackground }}
        >
          <div className="flex gap-4 items-center justify-start  m-auto mt-[50px]">
            <div className="w-[124px] h-[154px] md:w-[200px] md:h-[220px]  m-auto">
              <h4 className="poppins6 text-white xl:text-[20px]">President</h4>
              <div>
                <PredictSlider
                  party_name={party}
                  // data={data}
                  printData={""}
                  data1="president"
                  imageValue={() => setPresdborder(false)}
                  selecClass={isButtonClicked ? false : true}
                  imgData={myData}
                />
              </div>
            </div>
            <div className="w-[124px] h-[154px] md:w-[200px] md:h-[220px]  m-auto">
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
                  imgData={myData}
                />
              </div>
            </div>
          </div>
          <p className="text-redish translate-y-12 poppins5">{error}</p>
          <div className="flex justify-center relative  mt-24">
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
              <img
                onClick={() => {
                  setIsButtonClicked(false);
                  setSliderBackground("transparent");
                }}
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
