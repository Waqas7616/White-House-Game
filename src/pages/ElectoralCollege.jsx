import React, { useEffect, useState } from "react";
import AppBanner from "../components/appbanner/AppBanner";
import electoral from "../images/Usa.jpg";
import vector from "../images/bg-vector.png";
import DownloadApp from "../components/DownloadApp";
import circle from "../images/Ellipse 3.png";
import state from "../images/statemap.png";
import flag from "../images/flag.png";
import question from "../images/question.png";
import democratic from "../images/democraticflag.png";
import republican from "../images/republicflag.png";
import independent from "../images/independentflag.png";
import close from "../images/closeMenu.png";
import {
  useStatePredictions,
  StatePredictionsProvider,
} from "../utils/StateIDs";
import axios from "axios";
import Prediction from "./Prediction";
import StateWinner from "../components/statewinner/StateWinner";
import abc from "../images/Alabamas 1.svg";
import EditButton from "../components/EditButton";

const initialElectoralCount = {
  Democratic: 0,
  Republican: 0,
  Independent: 0,
  total: 538,
};

function ElectoralCollege() {
  const { state_predictions, addPrediction, clearPredictions } =
    useStatePredictions();
  const [step, setStep] = useState(0);
  const [partyClick, setPartyClick] = useState(false);
  const [forceUpdate, setForceUpdate] = useState(0);
  const [electoralCount, setElectoralCount] = useState(() => {
    const storedCount = localStorage.getItem("electoralCount");
    return storedCount ? JSON.parse(storedCount) : initialElectoralCount;
  });
  const [demLength, setDemLength] = useState();
  const [repLength, setRepLength] = useState();
  const [indLength, setIndLength] = useState();
  const [previousData, setPreviousData] = useState([]);
  const [selectedButtonId, setSelectedButtonId] = useState(null);

  useEffect(() => {
    setDemLength((electoralCount.Democratic / electoralCount.total) * 100);
    setRepLength((electoralCount.Republican / electoralCount.total) * 100);
    setIndLength((electoralCount.Independent / electoralCount.total) * 100);

    console.log("the lengthy:", demLength);
  }, [electoralCount]);
 

  const handleRemoval=(partyId)=>{
    setSelectedButtonId(null);
    setPartyClick(false)
    clearPredictions();
    setElectoralCount((prev) => ({
      ...prev,
      Democratic:
        partyId === 1
          ? prev.Democratic -
            previousData?.states?.[step]?.electrical_collage_number
          : prev.Democratic,
      Republican:
        partyId === 2
          ? prev.Republican -
            previousData?.states?.[step]?.electrical_collage_number
          : prev.Republican,
      Independent:
        partyId === 3
          ? prev.Independent -
            previousData?.states?.[step]?.electrical_collage_number
          : prev.Independent,
    }));
  }
  

  const handleClick = (stateId, partyId) => {
    console.log("states data :",stateId, partyId)
    setPartyClick(true);
    // Add prediction
    if (!partyClick) {
      addPrediction({
        state_id: stateId,
        party_id: partyId,
      });
    console.log("states data : nnn",)

      setSelectedButtonId(partyId);
      setElectoralCount((prev) => ({
        ...prev,
        Democratic:
          partyId === 1
            ? prev.Democratic +
              previousData?.states?.[step]?.electrical_collage_number
            : prev.Democratic,
        Republican:
          partyId === 2
            ? prev.Republican +
              previousData?.states?.[step]?.electrical_collage_number
            : prev.Republican,
        Independent:
          partyId === 3
            ? prev.Independent +
              previousData?.states?.[step]?.electrical_collage_number
            : prev.Independent,
      }));
    }
  };

  const token = localStorage.getItem("token");
  const imageUrl = "https://thewhitehousegame.com/public/";

  useEffect(() => {
    axios
      .get("https://thewhitehousegame.com/public/api/getStateParty", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "Application/json",
        },
      })
      .then((response) => {
        setPreviousData(response.data);
      })
      .catch((error) => {
        console.log(
          "Following errors occured while fetching previous data",
          error
        );
      });
  }, []);

  useEffect(() => {
    console.log("hello predictions", state_predictions);
    console.log("hello results", previousData);
    console.log('hello button id:',selectedButtonId)
  }, [state_predictions]);

  const handleSteps = () => {
    setPartyClick(false);
    setSelectedButtonId(0);
    if (step < previousData?.states?.length - 1) {
      setStep(step + 1);
      setSelectedButtonId(null);
    } else if (step === previousData?.states?.length - 1) {
      axios
        .post(
          "https://thewhitehousegame.com/public/api/submit_electoral_college_prediction",
          {
            state_predictions: state_predictions,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          // console.log("API response:", response);
          // Handle success response
        })
        .catch((error) => {
          console.error("API error:", error);
          // Handle error
        });
        localStorage.setItem("electoralCount", JSON.stringify(electoralCount));
    }
  };

  const [statesData, setStatesData] = useState({});

  useEffect(() => {
    axios
      .get("https://thewhitehousegame.com/public/api/getVoterPartyCount", {
        headers: {
          Accept: "application/json",
        },
      })
      .then((res) => {
        // console.log("states ka data hai:", res.data.electoral_votes_by_party);
        setStatesData(res.data.electoral_votes_by_party);
      })
      .catch((err) => {
        console.log("error hai:", err);
      });
  }, []);

  const maxVotes = Math.max(
    statesData.Democratic,
    statesData.Republican,
    statesData["Independent('Kennedy')"]
  );
  const democraticBarLength =
    maxVotes === statesData.Democratic
      ? "100%"
      : `${(statesData.Democratic / maxVotes) * 100}%`;
  const republicanBarLength =
    maxVotes === statesData.Republican
      ? "100%"
      : `${(statesData.Republican / maxVotes) * 100}%`;
  const independentBarLength =
    maxVotes === statesData["Independent('Kennedy')"]
      ? "100%"
      : `${(statesData["Independent('Kennedy')"] / maxVotes) * 100}%`;

  const voteCount = (state) => {
    if (statesData[state]) {
      const parties = Object.keys(statesData[state]);
      const count = Object.values(statesData[state]).filter(
        (value) => typeof value === "number"
      );
      const maxCount = Math.max(...count);
      const largeIndex = count.indexOf(maxCount);
      const largeParty = parties[largeIndex];
      const electricalCollege = statesData[state].electrical_collage; // Access electrical_collage
      return { largeParty, maxCount, electricalCollege, parties };
    }
    return {};
  };

  const [statesDatas, setStatesDatas] = useState({});

  useEffect(() => {
    axios
      .get("https://thewhitehousegame.com/public/api/getVoterPartyCount", {
        headers: {
          Accept: "application/json",
        },
      })
      .then((res) => {
        // console.log("states ka data hai:", res.data.electoral_votes_by_party);
        setStatesDatas(res.data.electoral_votes_by_party);
      })
      .catch((err) => {
        console.log("error hai:", err);
      });
  }, []);

  //   const maxVotes = Math.max(statesDatas.Democratic, statesDatas.Republican, statesDatas["Independent('Kennedy')"]);
  // const democraticBarLength = maxVotes === statesDatas.Democratic ? '100%' : `${(statesDatas.Democratic / maxVotes) * 100}%`;
  // const republicanBarLength = maxVotes === statesDatas.Republican ? '100%' : `${(statesDatas.Republican / maxVotes) * 100}%`;
  // const independentBarLength = maxVotes === statesDatas["Independent('Kennedy')"] ? '100%' : `${(statesDatas["Independent('Kennedy')"] / maxVotes) * 100}%`;

  return (
    <div className=" bg-[#1c2452]">
      <AppBanner
        bannerTitle={"College"}
        redTitle={"Electoral"}
        bg={electoral}
        bannerDesc={
 <>538 Electoral College delegates <br/>decide who will be<br/>President of the United States</>
        }
      />

      <div className="voting w-10/12  resp m-auto py-[102px] bg-[#1c2452]">
        <div className="state-data  mb-6 m-auto px-[120px] h-72 sm:h-64 bg-redish rounded-[18.06px] relative flex flex-col justify-center  sm:flex sm:flex-row sm:justify-evenly items-center">
          <img src={circle} alt="" className="absolute right-0" />
          <div className="map ">
            <img
              className="w-12 sm:w-[150px]"
              src={`${imageUrl}${previousData?.states?.[step]?.map_url}`}
              alt=""
            />
          </div>
          <div className="info flex flex-col sm:flex sm:flex-row  md:justify-center gap-5 items-center">
            <div className="flag pt-5 sm:pt-0">
              <img
                className="w-12 sm:w-[100px]"
                src={`${imageUrl}${previousData?.states?.[step]?.image_url}`}
                alt=""
              />
            </div>
            <div className="name">
              <h6 className="poppins6 text-white text-center text-[20px] sm:text-[33px]">
                {previousData?.states?.[step]?.name}
              </h6>
              <p className="poppins4 text-white text-center text-[12px] sm:text-[28px]">
                {/* 9 Electoral College votes */}
                {previousData?.states?.[step]?.electrical_collage_number}{" "}
                Electoral College votes
              </p>
            </div>
          </div>
        </div>
        <div className="flex mb-2 justify-end w-full">
          <div onClick={()=>handleRemoval(selectedButtonId)}>{partyClick && (
                  <EditButton/>
                )}{" "}</div>
            
          </div>
        <div className="flex flex-col items-start lg:flex lg:flex-row lg:items-start ">
          <div className="question flex flex-col justify-center gap-4 items-center sm:w-[361px] sm:h-[201px] md:w-[361px] md:h-[284px] lg:w-[330px] lg:h-[186px] lg-a:w-[346px] lg-a:h-[230px] xl:w-[346px] xl:h-[300px] xl-a::w-[346px] xl-a:h-[304px]  2xl:w-[311px] 2xl:h-[324px] bg-[#131A41] rounded-[40px] xl:rounded-[54px] border-[10px] border-[#1c2452] px-7 py-4">
            {previousData &&
              previousData?.states &&
              previousData?.states[step] && (
                <img
                  src={`${imageUrl}${previousData?.states?.[step]?.state_image_url}`}
                  // src={abc}
                  alt=""
                  className="w-12 lg:w-12 xl:w-20 2xl:w-24 object-cover mt-3"
                />
              )}
            <div className="m-auto ">
              <h4 className="text-white text-center poppins6  text-[17px] sm:text-[16px] lg:text-[15px] xl:text-[19px]  ">
                Who do you predict will win?
              </h4>
            </div>
            <div>
              <h2 className="text-redish text-center poppins6 text-[19.4px] ">
                {previousData?.states?.[step]?.name}
              </h2>
            </div>
          </div>

         
          <div className="badges mb-10">
          
            <div className="flex flex-col lg:flex lg:flex-row lg:justify-between lg:gap-3 ">
              <div
                className={`${
                  selectedButtonId === 1
                    ? "border-red-600 border-[10px] relative"
                    : ""
                } rounded-[54px] border-[10px] border-[#1c2452] ${
                  selectedButtonId !== 1 && selectedButtonId !== null
                    ? "opacity-50"
                    : ""
                }`}
                onClick={() => handleClick(previousData?.states?.[step]?.id, 1)}
              >
                
                <img src={democratic} className="" alt="" />
              </div>
              <div
                className={`${
                  selectedButtonId === 2 ? "border-red-600 border-[10px]" : ""
                } rounded-[54px] border-[10px] border-[#1c2452] ${
                  selectedButtonId !== 2 && selectedButtonId !== null
                    ? "opacity-50"
                    : ""
                }`}
                onClick={() => handleClick(previousData?.states?.[step]?.id, 2)}
              >
                <img src={republican} alt="" />
              </div>
              <div
                className={`${
                  selectedButtonId === 3 ? "border-red-600 border-[10px]" : ""
                } rounded-[54px] border-[10px] border-[#1c2452] ${
                  selectedButtonId !== 3 && selectedButtonId !== null
                    ? "opacity-50"
                    : ""
                }`}
                onClick={() => handleClick(previousData?.states?.[step]?.id, 3)}
              >
                <img src={independent} alt="" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center  w-full mt-5 mb-[60px] mx-auto">
          <button
            onClick={() => {
              if (step > 0) {
                setStep(step - 1);
                setSelectedButtonId(null);
                // console.log("Decrementing step:", step - 1);
              }
            }}
            className={`bg-redish p-2 rounded-l-[6px] ${
              selectedButtonId === null ? "" : "opacity-50"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5 8.25 12l7.5-7.5"
              />
            </svg>
          </button>

          <button
            onClick={handleSteps}
            className={`btn bg-redish w-[258px] sm:w-[200px] px-8 py-2 text-white uppercase ${
              selectedButtonId === null ? "opacity-50 cursor-not-allowed" : ""
            } flex justify-center items-center`}
            disabled={selectedButtonId === null}
          >
            <span>
              {step === previousData?.states?.length - 1 ? "Submit" : ""}
            </span>
            <h6 className="text-white mb-0 ml-2 text-[16px] lowercase">{`${
              step + 1
            } of ${previousData?.states?.length}`}</h6>
          </button>

          <button
            onClick={handleSteps}
            className={`bg-redish p-2 rounded-r-[6px] ${
              selectedButtonId === null ? "" : "opacity-50"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>
        </div>

        {/* <button
  className={`btn bg-redish m-auto w-[258px] sm:w-[346px] block px-8 py-2 text-white uppercase rounded-[6px] ${
    selectedButtonId === null ? "opacity-50 cursor-not-allowed" : ""
  } flex justify-between items-center`}
  disabled={selectedButtonId === null}
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className="size-6 cursor-pointer"
    onClick={(e) => {
      e.stopPropagation(); // Prevent the button's onClick from triggering
      if (step > 0) {
        setStep(step - 1);
        setSelectedButtonId(null);
        console.log("Decrementing step:", step - 1);
      }
    }}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
  </svg>

  <span>
    {step === previousData?.states?.length - 1 ? "Submit" : "Next"}
  </span>
  <h6 className="text-white mb-0 ml-2">{`${step + 1} of ${
    previousData?.states?.length
  }`}</h6>

  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className="size-6 cursor-pointer"
    onClick={(e) => {
      e.stopPropagation(); // Prevent the button's onClick from triggering
      handleSteps();
    }}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
  </svg>
</button> */}

        {/* <button
  className={`btn bg-redish m-auto w-[258px] sm:w-[346px] block px-8 py-2 text-white uppercase rounded-[6px] ${
    selectedButtonId === null ? "opacity-50 cursor-not-allowed" : ""
  } flex justify-between items-center`}
  disabled={selectedButtonId === null}
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className="size-6 cursor-pointer"
    onClick={(e) => {
      e.stopPropagation(); // Prevent the button's onClick from triggering
      if (step > 0) {
        setStep(step - 1);
        setSelectedButtonId(null);
        console.log("Decrementing step:", step - 1);
      }
    }}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
  </svg>

  <span>
    {step === previousData?.states?.length - 1 ? "Submit" : ""}
  </span>
  <h6 className="text-white mb-0 ml-2">{`${step + 1} of ${
    previousData?.states?.length
  }`}</h6>

  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className="size-6 cursor-pointer"
    onClick={(e) => {
      e.stopPropagation(); // Prevent the button's onClick from triggering
      handleSteps();
    }}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
  </svg>
</button> */}

        {/* <div className="flex p-2 bg-[#131A41] rounded-[10.65px] mb-[83px]">
          <div className="py-4 bg-[#031BBB] w-[50%]">
          <span className="poppins4">
              {!statesData[step].Democratic
                ? "0%"
                : `${Math.round(statesData[step].Democratic)}%`}
            </span>
          </div>
          <div className="py-4 bg-white w-[15%]">
          
            <span className="poppins4">
              {!statesData[step]["Independent('Kennedy')"]
                ? "0%"
                : `${Math.round(statesData[step]["Independent('Kennedy')"])}%`}
            </span>
          </div>
          <div className="py-4 bg-redish w-[35%]">
          <span className="poppins4">
              {!statesData[step].Republican
                ? "0%"
                : `${Math.round(statesData[step].Republican)}%`}
            </span>
          </div>
        </div> */}

        {/* <div className="flex p-2 bg-[#131A41] rounded-[10.65px] mb-[83px] w-full">
  <div>
    
  <div className="py-4 bg-[#031BBB]" style={{ width: democraticBarLength }}>
    <span className="poppins6 text-white flex justify-center items-center" >
      {statesDatas && statesDatas.Democratic ? `${statesDatas.Democratic}` : "0"}
    </span>
  </div>
  </div>
  
  <div className="py-4 bg-redish" style={{ width: republicanBarLength }}>
    <span className="poppins6 text-white flex justify-center items-center" >
      {statesDatas && statesDatas.Republican ? `${statesDatas.Republican}` : "0"}
    </span>
  </div>
  <div className="py-4 bg-white" style={{ width: independentBarLength }}>
    <span className="poppins6 flex justify-center items-center" >
      {statesDatas && statesDatas["Independent('Kennedy')"] ? `${statesDatas["Independent('Kennedy')"]}` : "0"}
    </span>
  </div>
</div>  */}

        {/* <div className="flex p-2 bg-[#131A41] rounded-[10.65px] mb-[83px]">
  <div className="py-4 bg-[#031BBB] w-[50%]">
    <span className="poppins4 flex justify-center items-center">
      {statesData && statesData.Democratic ? `${statesData.Democratic}` : "0"}
    </span>
  </div>
  <div className="py-4 bg-white w-[15%]">
    <span className="poppins4 flex justify-center items-center">
      {statesData && statesData["Independent('Kennedy')"] ? `${statesData["Independent('Kennedy')"]}` : "0"}
    </span>
  </div>
  <div className="py-4 bg-redish w-[35%]">
    <span className="poppins4 flex justify-center items-center">
      {statesData && statesData.Republican ? `${statesData.Republican}` : "0"}
    </span>
  </div>
</div> */}
        <h2 className="text-white mb-3 poppins6 text-[25.4px] md:text-[36.4px]">
          Your Electoral College Tally
        </h2>
        <div className="flex gap-5 items-center mb-4">
          <div className="dem flex gap-3 items-center">
            <div className="w-8 h-2 bg-[#031BBB]"></div>
            <p className="poppins5 text-white">Democratic</p>
          </div>
          <div className="dem flex gap-3 items-center">
            <div className="w-8 h-2 bg-redish"></div>
            <p className="poppins5 text-white">Republican</p>
          </div>
          <div className="dem flex gap-3 items-center">
            <div className="w-8 h-2 bg-white"></div>
            <p className="poppins5 text-white">Independent</p>
          </div>
        </div>
        <div className="flex p-2 bg-[#131A41] rounded-[10.65px] mb-8 w-full">
          <div
            className="py-4 bg-[#031BBB]"
            style={{
              width: `${
                demLength || repLength || indLength > 0
                  ? `${demLength}%`
                  : "33%"
              }`,
            }}
          >
            <span className="poppins4 flex justify-center items-center">
              {/* {statesData && statesData.Democratic
                ? `${statesData.Democratic}`
                : "0"} */}
              {electoralCount.Democratic > 0 && electoralCount.Democratic}
            </span>
          </div>

          <div
            className="py-4 bg-redish"
            style={{
              width: `${
                demLength || repLength || indLength > 0
                  ? `${repLength}%`
                  : "33%"
              }`,
            }}
          >
            <span className="poppins4 flex justify-center items-center">
              {/* {statesData && statesData.Republican
                ? `${statesData.Republican}`
                : "0"} */}
              {electoralCount.Republican > 0 && electoralCount.Republican}
            </span>
          </div>
          <div
            className="py-4 bg-white"
            style={{
              width: `${
                demLength || repLength || indLength > 0
                  ? `${indLength}%`
                  : "33%"
              }`,
            }}
          >
            <span className="poppins4 flex justify-center items-center">
              {/* {statesData && statesData["Independent('Kennedy')"]
                ? `${statesData["Independent('Kennedy')"]}`
                : "0"} */}
              {electoralCount.Independent > 0 && electoralCount.Independent}
            </span>
          </div>
        </div>
        <div className="result-card ">
          <h2 className="text-white mb-4 poppins6 text-[25.4px] md:text-[36.4px]">
            Past results
          </h2>
          <div className="result rounded-[10.65px] bg-[#131A41] px-8 py-5">
            <div className="2020">
              <p className="text-white mb-2 poppins4 text-[20px] md:text-[42.4px]">
                2020
              </p>
              <div className="flex  bg-[#131A41] rounded-[10.65px] mb-[23px] w-full">
                <div
                  className={`py-6 rounded-l-[10.65px] px-4 bg-[#5b4fd1]   flex justify-between items-center`}
                  style={{
                    width: `${previousData?.states?.[step]?.previous_election_state?.[0]?.vote_percentage}%`,
                  }}
                >
                  <p className="text-white poppins4 hidden sm:hidden md:hidden lg:block sm:text-[22px] opacity-70">
                    Democratic
                  </p>
                  <div className="value ">
                    <p className="flex items-center gap-3 px-2 sm:px-0 poppins4 text-[14px] sm:text-[28px] text-white opacity-70">
                      <svg
                        width="51"
                        height="26"
                        viewBox="0 0 71 26"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="hidden sm:hidden md:hidden lg:block"
                      >
                        <path
                          d="M15.4011 25.6655C13.2165 25.4884 11.1873 24.5159 9.73479 22.9501C8.94553 22.1374 7.97272 21.5067 6.88989 21.1056C6.20992 20.8731 5.47117 20.8463 4.77467 21.029C4.07817 21.2116 3.45786 21.5947 2.99824 22.126L3.00982 22.1091L0.542969 20.5403C1.34257 19.5248 2.4526 18.7704 3.72032 18.3811C4.98804 17.9918 6.35118 17.9866 7.62211 18.3663C9.18026 18.8624 10.5868 19.7158 11.7183 20.8512C13.7849 22.6294 14.9798 23.4987 17.5416 22.2647C19.7121 21.2117 20.3927 18.9459 21.1799 16.3282C22.0694 13.3783 23.0685 10.0337 26.637 8.38845C27.3791 7.9969 28.207 7.77582 29.0544 7.74245C29.9019 7.70908 30.7458 7.86437 31.5193 8.19624C32.6987 8.81181 33.7477 9.63089 34.6132 10.6118C36.3418 12.3419 37.513 13.3725 39.7442 12.7987C42.2823 12.1456 44.0541 9.89267 45.9295 7.50814C48.223 4.59214 50.8218 1.28858 55.2887 0.864535C55.5748 0.837679 55.8594 0.825195 56.1411 0.825195C63.7672 0.825195 69.8545 10.3108 70.1184 10.7292L67.579 12.1879C67.5241 12.1002 62.0935 3.65214 56.1545 3.65214C55.9637 3.65214 55.7721 3.66115 55.5793 3.67906C52.4112 3.9773 50.414 6.51584 48.2999 9.20286C46.2051 11.8658 44.0391 14.6191 40.5151 15.5252C36.4693 16.5669 34.1537 14.2533 32.4636 12.5571C30.6979 10.7903 29.838 10.0452 27.9255 10.9273C25.5535 12.0227 24.8461 14.3746 24.0277 17.0998C23.1738 19.9465 22.2042 23.1778 18.8834 24.7849C17.8124 25.3381 16.6188 25.64 15.4011 25.6655Z"
                          fill="url(#paint0_linear_650_2370)"
                        />
                        <defs>
                          <linearGradient
                            id="paint0_linear_650_2370"
                            x1="58.708"
                            y1="5.1971"
                            x2="50.1047"
                            y2="32.2101"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop stop-color="white" />
                            <stop
                              offset="1"
                              stop-color="white"
                              stop-opacity="0.2"
                            />
                          </linearGradient>
                        </defs>
                      </svg>
                      {
                        previousData?.states?.[step]
                          ?.previous_election_state?.[0]?.vote_percentage
                      }
                    </p>
                  </div>
                </div>
                <div
                  className={`py-6 flex justify-between px-4 bg-redish `}
                  style={{
                    width: `${previousData?.states?.[step]?.previous_election_state?.[1]?.vote_percentage}%`,
                  }}
                >
                  <p className="text-white poppins4 hidden sm:hidden md:hidden lg:block truncate sm:text-[22px]">
                    Republican
                  </p>
                  <div className="value ">
                    <p className="flex items-center gap-3 poppins4 text-center text-[14px] sm:text-[28px] text-white">
                      <svg
                        width="71"
                        height="26"
                        viewBox="0 0 71 26"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="hidden sm:hidden md:hidden lg:block"
                      >
                        <path
                          d="M15.4011 25.6655C13.2165 25.4884 11.1873 24.5159 9.73479 22.9501C8.94553 22.1374 7.97272 21.5067 6.88989 21.1056C6.20992 20.8731 5.47117 20.8463 4.77467 21.029C4.07817 21.2116 3.45786 21.5947 2.99824 22.126L3.00982 22.1091L0.542969 20.5403C1.34257 19.5248 2.4526 18.7704 3.72032 18.3811C4.98804 17.9918 6.35118 17.9866 7.62211 18.3663C9.18026 18.8624 10.5868 19.7158 11.7183 20.8512C13.7849 22.6294 14.9798 23.4987 17.5416 22.2647C19.7121 21.2117 20.3927 18.9459 21.1799 16.3282C22.0694 13.3783 23.0685 10.0337 26.637 8.38845C27.3791 7.9969 28.207 7.77582 29.0544 7.74245C29.9019 7.70908 30.7458 7.86437 31.5193 8.19624C32.6987 8.81181 33.7477 9.63089 34.6132 10.6118C36.3418 12.3419 37.513 13.3725 39.7442 12.7987C42.2823 12.1456 44.0541 9.89267 45.9295 7.50814C48.223 4.59214 50.8218 1.28858 55.2887 0.864535C55.5748 0.837679 55.8594 0.825195 56.1411 0.825195C63.7672 0.825195 69.8545 10.3108 70.1184 10.7292L67.579 12.1879C67.5241 12.1002 62.0935 3.65214 56.1545 3.65214C55.9637 3.65214 55.7721 3.66115 55.5793 3.67906C52.4112 3.9773 50.414 6.51584 48.2999 9.20286C46.2051 11.8658 44.0391 14.6191 40.5151 15.5252C36.4693 16.5669 34.1537 14.2533 32.4636 12.5571C30.6979 10.7903 29.838 10.0452 27.9255 10.9273C25.5535 12.0227 24.8461 14.3746 24.0277 17.0998C23.1738 19.9465 22.2042 23.1778 18.8834 24.7849C17.8124 25.3381 16.6188 25.64 15.4011 25.6655Z"
                          fill="url(#paint0_linear_650_2370)"
                        />
                        <defs>
                          <linearGradient
                            id="paint0_linear_650_2370"
                            x1="58.708"
                            y1="5.1971"
                            x2="50.1047"
                            y2="32.2101"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop stop-color="white" />
                            <stop
                              offset="1"
                              stop-color="white"
                              stop-opacity="0.2"
                            />
                          </linearGradient>
                        </defs>
                      </svg>{" "}
                      {
                        previousData?.states?.[step]
                          ?.previous_election_state?.[1]?.vote_percentage
                      }
                    </p>
                  </div>
                </div>
                <div
                  className="py-6 flex flex-col sm:flex sm:justify-between relative px-10 sm:px-20 items-center rounded-r-[10.65px] bg-white "
                  style={{
                    width: `${previousData?.states?.[step]?.previous_election_state?.[2]?.vote_percentage}%`,
                  }}
                >
                  <p className="poppins4 hidden sm:hidden md:hidden lg:block sm:text-[22px] text-[#131A41] opacity-70 absolute left-1">
                    Others
                  </p>
                  <div className="value poppins4 text-[14px] sm:text-[22px] -ml-5 sm:ml-14 text-[#131A41] opacity-70 ">
                    <p className="flex items-center gap-3 ">
                      {
                        previousData?.states?.[step]
                          ?.previous_election_state?.[2]?.vote_percentage
                      }
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="2016">
              <p className="text-white mb-2 poppins4 text-[20px] md:text-[42.4px]">
                2016
              </p>
              <div className="flex  bg-[#131A41] rounded-[10.65px] mb-[23px]">
                <div
                  className="py-6 rounded-l-[10.65px] px-4 bg-[#5b4fd1]  flex justify-between items-center"
                  style={{
                    width: `${previousData?.states?.[step]?.previous_election_state?.[3]?.vote_percentage}%`,
                  }}
                >
                  <p className="text-white poppins4 hidden sm:hidden md:hidden lg:block sm:text-[22px] opacity-70">
                    Democratic
                  </p>
                  <div className="value ">
                    <p className="flex items-center gap-3 poppins4 text-[14px] sm:text-[28px] text-white opacity-70">
                      <svg
                        width="71"
                        height="26"
                        viewBox="0 0 71 26"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="hidden sm:hidden md:hidden lg:block"
                      >
                        <path
                          d="M15.4011 25.6655C13.2165 25.4884 11.1873 24.5159 9.73479 22.9501C8.94553 22.1374 7.97272 21.5067 6.88989 21.1056C6.20992 20.8731 5.47117 20.8463 4.77467 21.029C4.07817 21.2116 3.45786 21.5947 2.99824 22.126L3.00982 22.1091L0.542969 20.5403C1.34257 19.5248 2.4526 18.7704 3.72032 18.3811C4.98804 17.9918 6.35118 17.9866 7.62211 18.3663C9.18026 18.8624 10.5868 19.7158 11.7183 20.8512C13.7849 22.6294 14.9798 23.4987 17.5416 22.2647C19.7121 21.2117 20.3927 18.9459 21.1799 16.3282C22.0694 13.3783 23.0685 10.0337 26.637 8.38845C27.3791 7.9969 28.207 7.77582 29.0544 7.74245C29.9019 7.70908 30.7458 7.86437 31.5193 8.19624C32.6987 8.81181 33.7477 9.63089 34.6132 10.6118C36.3418 12.3419 37.513 13.3725 39.7442 12.7987C42.2823 12.1456 44.0541 9.89267 45.9295 7.50814C48.223 4.59214 50.8218 1.28858 55.2887 0.864535C55.5748 0.837679 55.8594 0.825195 56.1411 0.825195C63.7672 0.825195 69.8545 10.3108 70.1184 10.7292L67.579 12.1879C67.5241 12.1002 62.0935 3.65214 56.1545 3.65214C55.9637 3.65214 55.7721 3.66115 55.5793 3.67906C52.4112 3.9773 50.414 6.51584 48.2999 9.20286C46.2051 11.8658 44.0391 14.6191 40.5151 15.5252C36.4693 16.5669 34.1537 14.2533 32.4636 12.5571C30.6979 10.7903 29.838 10.0452 27.9255 10.9273C25.5535 12.0227 24.8461 14.3746 24.0277 17.0998C23.1738 19.9465 22.2042 23.1778 18.8834 24.7849C17.8124 25.3381 16.6188 25.64 15.4011 25.6655Z"
                          fill="url(#paint0_linear_650_2370)"
                        />
                        <defs>
                          <linearGradient
                            id="paint0_linear_650_2370"
                            x1="58.708"
                            y1="5.1971"
                            x2="50.1047"
                            y2="32.2101"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop stop-color="white" />
                            <stop
                              offset="1"
                              stop-color="white"
                              stop-opacity="0.2"
                            />
                          </linearGradient>
                        </defs>
                      </svg>{" "}
                      {
                        previousData?.states?.[step]
                          ?.previous_election_state?.[3]?.vote_percentage
                      }
                    </p>
                  </div>
                </div>
                <div
                  className="py-6 flex justify-between px-4 bg-redish "
                  style={{
                    width: `${previousData?.states?.[step]?.previous_election_state?.[4]?.vote_percentage}%`,
                  }}
                >
                  <p className="poppins4 hidden sm:hidden md:hidden lg:block sm:text-[22px] text-white">
                    Republican
                  </p>
                  <div className="value ">
                    <p className="flex items-center gap-3 poppins4 text-[14px] sm:text-[28px] text-white">
                      <svg
                        width="71"
                        height="26"
                        viewBox="0 0 71 26"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="hidden sm:hidden md:hidden lg:block"
                      >
                        <path
                          d="M15.4011 25.6655C13.2165 25.4884 11.1873 24.5159 9.73479 22.9501C8.94553 22.1374 7.97272 21.5067 6.88989 21.1056C6.20992 20.8731 5.47117 20.8463 4.77467 21.029C4.07817 21.2116 3.45786 21.5947 2.99824 22.126L3.00982 22.1091L0.542969 20.5403C1.34257 19.5248 2.4526 18.7704 3.72032 18.3811C4.98804 17.9918 6.35118 17.9866 7.62211 18.3663C9.18026 18.8624 10.5868 19.7158 11.7183 20.8512C13.7849 22.6294 14.9798 23.4987 17.5416 22.2647C19.7121 21.2117 20.3927 18.9459 21.1799 16.3282C22.0694 13.3783 23.0685 10.0337 26.637 8.38845C27.3791 7.9969 28.207 7.77582 29.0544 7.74245C29.9019 7.70908 30.7458 7.86437 31.5193 8.19624C32.6987 8.81181 33.7477 9.63089 34.6132 10.6118C36.3418 12.3419 37.513 13.3725 39.7442 12.7987C42.2823 12.1456 44.0541 9.89267 45.9295 7.50814C48.223 4.59214 50.8218 1.28858 55.2887 0.864535C55.5748 0.837679 55.8594 0.825195 56.1411 0.825195C63.7672 0.825195 69.8545 10.3108 70.1184 10.7292L67.579 12.1879C67.5241 12.1002 62.0935 3.65214 56.1545 3.65214C55.9637 3.65214 55.7721 3.66115 55.5793 3.67906C52.4112 3.9773 50.414 6.51584 48.2999 9.20286C46.2051 11.8658 44.0391 14.6191 40.5151 15.5252C36.4693 16.5669 34.1537 14.2533 32.4636 12.5571C30.6979 10.7903 29.838 10.0452 27.9255 10.9273C25.5535 12.0227 24.8461 14.3746 24.0277 17.0998C23.1738 19.9465 22.2042 23.1778 18.8834 24.7849C17.8124 25.3381 16.6188 25.64 15.4011 25.6655Z"
                          fill="url(#paint0_linear_650_2370)"
                        />
                        <defs>
                          <linearGradient
                            id="paint0_linear_650_2370"
                            x1="58.708"
                            y1="5.1971"
                            x2="50.1047"
                            y2="32.2101"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop stop-color="white" />
                            <stop
                              offset="1"
                              stop-color="white"
                              stop-opacity="0.2"
                            />
                          </linearGradient>
                        </defs>
                      </svg>{" "}
                      {
                        previousData?.states?.[step]
                          ?.previous_election_state?.[4]?.vote_percentage
                      }
                    </p>
                  </div>
                </div>
                <div
                  className="py-6 flex justify-between px-10 sm:px-20 relative items-center rounded-r-[10.65px] bg-white "
                  style={{
                    width: `${previousData?.states?.[step]?.previous_election_state?.[5]?.vote_percentage}%`,
                  }}
                >
                  <p className="poppins4 hidden sm:hidden md:hidden lg:block sm:text-[22px] text-[#131A41] absolute left-1 opacity-70">
                    Others
                  </p>
                  <div className="value poppins4 text-[14px] sm:text-[22px] -ml-5 sm:ml-2   text-[#131A41] opacity-70">
                    <p className="flex items-center gap-3">
                      {
                        previousData?.states?.[step]
                          ?.previous_election_state?.[5]?.vote_percentage
                      }
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="2012 poppins4 text-[20px] md:text-[42.4px]">
              <p className="text-white mb-2">2012</p>
              <div className="flex  bg-[#131A41] rounded-[10.65px] mb-[23px]">
                <div
                  className="py-6 rounded-l-[10.65px] px-4 bg-[#5b4fd1]  flex justify-between items-center"
                  style={{
                    width: `${previousData?.states?.[step]?.previous_election_state?.[6]?.vote_percentage}%`,
                  }}
                >
                  <p className="text-white poppins4 hidden sm:hidden md:hidden lg:block text-[22px] opacity-70">
                    Democratic
                  </p>
                  <div className="value ">
                    <p className="flex items-center gap-3 poppins4 text-[14px] sm:text-[28px] text-white opacity-70">
                      <svg
                        width="71"
                        height="26"
                        viewBox="0 0 71 26"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="hidden sm:hidden md:hidden lg:block"
                      >
                        <path
                          d="M15.4011 25.6655C13.2165 25.4884 11.1873 24.5159 9.73479 22.9501C8.94553 22.1374 7.97272 21.5067 6.88989 21.1056C6.20992 20.8731 5.47117 20.8463 4.77467 21.029C4.07817 21.2116 3.45786 21.5947 2.99824 22.126L3.00982 22.1091L0.542969 20.5403C1.34257 19.5248 2.4526 18.7704 3.72032 18.3811C4.98804 17.9918 6.35118 17.9866 7.62211 18.3663C9.18026 18.8624 10.5868 19.7158 11.7183 20.8512C13.7849 22.6294 14.9798 23.4987 17.5416 22.2647C19.7121 21.2117 20.3927 18.9459 21.1799 16.3282C22.0694 13.3783 23.0685 10.0337 26.637 8.38845C27.3791 7.9969 28.207 7.77582 29.0544 7.74245C29.9019 7.70908 30.7458 7.86437 31.5193 8.19624C32.6987 8.81181 33.7477 9.63089 34.6132 10.6118C36.3418 12.3419 37.513 13.3725 39.7442 12.7987C42.2823 12.1456 44.0541 9.89267 45.9295 7.50814C48.223 4.59214 50.8218 1.28858 55.2887 0.864535C55.5748 0.837679 55.8594 0.825195 56.1411 0.825195C63.7672 0.825195 69.8545 10.3108 70.1184 10.7292L67.579 12.1879C67.5241 12.1002 62.0935 3.65214 56.1545 3.65214C55.9637 3.65214 55.7721 3.66115 55.5793 3.67906C52.4112 3.9773 50.414 6.51584 48.2999 9.20286C46.2051 11.8658 44.0391 14.6191 40.5151 15.5252C36.4693 16.5669 34.1537 14.2533 32.4636 12.5571C30.6979 10.7903 29.838 10.0452 27.9255 10.9273C25.5535 12.0227 24.8461 14.3746 24.0277 17.0998C23.1738 19.9465 22.2042 23.1778 18.8834 24.7849C17.8124 25.3381 16.6188 25.64 15.4011 25.6655Z"
                          fill="url(#paint0_linear_650_2370)"
                        />
                        <defs>
                          <linearGradient
                            id="paint0_linear_650_2370"
                            x1="58.708"
                            y1="5.1971"
                            x2="50.1047"
                            y2="32.2101"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop stop-color="white" />
                            <stop
                              offset="1"
                              stop-color="white"
                              stop-opacity="0.2"
                            />
                          </linearGradient>
                        </defs>
                      </svg>{" "}
                      {
                        previousData?.states?.[step]
                          ?.previous_election_state?.[6]?.vote_percentage
                      }
                    </p>
                  </div>
                </div>
                <div
                  className="py-6 flex justify-between px-4 bg-redish "
                  style={{
                    width: `  ${previousData?.states?.[step]?.previous_election_state?.[7]?.vote_percentage}%`,
                  }}
                >
                  <p className="poppins4 hidden sm:hidden md:hidden lg:block sm:text-[22px] text-white">
                    Republican
                  </p>
                  <div className="value ">
                    <p className="flex items-center gap-3 poppins4 text-[14px] sm:text-[28px] text-white">
                      <svg
                        width="71"
                        height="26"
                        viewBox="0 0 71 26"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="hidden sm:hidden md:hidden lg:block"
                      >
                        <path
                          d="M15.4011 25.6655C13.2165 25.4884 11.1873 24.5159 9.73479 22.9501C8.94553 22.1374 7.97272 21.5067 6.88989 21.1056C6.20992 20.8731 5.47117 20.8463 4.77467 21.029C4.07817 21.2116 3.45786 21.5947 2.99824 22.126L3.00982 22.1091L0.542969 20.5403C1.34257 19.5248 2.4526 18.7704 3.72032 18.3811C4.98804 17.9918 6.35118 17.9866 7.62211 18.3663C9.18026 18.8624 10.5868 19.7158 11.7183 20.8512C13.7849 22.6294 14.9798 23.4987 17.5416 22.2647C19.7121 21.2117 20.3927 18.9459 21.1799 16.3282C22.0694 13.3783 23.0685 10.0337 26.637 8.38845C27.3791 7.9969 28.207 7.77582 29.0544 7.74245C29.9019 7.70908 30.7458 7.86437 31.5193 8.19624C32.6987 8.81181 33.7477 9.63089 34.6132 10.6118C36.3418 12.3419 37.513 13.3725 39.7442 12.7987C42.2823 12.1456 44.0541 9.89267 45.9295 7.50814C48.223 4.59214 50.8218 1.28858 55.2887 0.864535C55.5748 0.837679 55.8594 0.825195 56.1411 0.825195C63.7672 0.825195 69.8545 10.3108 70.1184 10.7292L67.579 12.1879C67.5241 12.1002 62.0935 3.65214 56.1545 3.65214C55.9637 3.65214 55.7721 3.66115 55.5793 3.67906C52.4112 3.9773 50.414 6.51584 48.2999 9.20286C46.2051 11.8658 44.0391 14.6191 40.5151 15.5252C36.4693 16.5669 34.1537 14.2533 32.4636 12.5571C30.6979 10.7903 29.838 10.0452 27.9255 10.9273C25.5535 12.0227 24.8461 14.3746 24.0277 17.0998C23.1738 19.9465 22.2042 23.1778 18.8834 24.7849C17.8124 25.3381 16.6188 25.64 15.4011 25.6655Z"
                          fill="url(#paint0_linear_650_2370)"
                        />
                        <defs>
                          <linearGradient
                            id="paint0_linear_650_2370"
                            x1="58.708"
                            y1="5.1971"
                            x2="50.1047"
                            y2="32.2101"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop stop-color="white" />
                            <stop
                              offset="1"
                              stop-color="white"
                              stop-opacity="0.2"
                            />
                          </linearGradient>
                        </defs>
                      </svg>{" "}
                      {
                        previousData?.states?.[step]
                          ?.previous_election_state?.[7]?.vote_percentage
                      }
                    </p>
                  </div>
                </div>
                <div
                  className="py-6 flex justify-between px-10 sm:px-20 items-center relative rounded-r-[10.65px] bg-white "
                  style={{
                    width: `  ${previousData?.states?.[step]?.previous_election_state?.[8]?.vote_percentage}%`,
                  }}
                >
                  <p className="poppins4 hidden sm:hidden md:hidden lg:block text-[22px] text-[#131A41] absolute left-1 opacity-70">
                    Others
                  </p>
                  <div className="value poppins4 text-[14px] sm:text-[22px] -ml-5 sm:ml-0 text-[#131A41] opacity-70">
                    <p className="flex items-center gap-3 -ml-5 sm:ml-4">
                      {
                        previousData?.states?.[step]
                          ?.previous_election_state?.[8]?.vote_percentage
                      }
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <StateWinner />

      <DownloadApp />
    </div>
  );
}

export default ElectoralCollege;
