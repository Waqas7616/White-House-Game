import React, { useEffect, useState } from "react";
import AppBanner from "../components/appbanner/AppBanner";
import electoral from "../images/electoral.png";
import vector from "../images/bg-vector.png";
import DownloadApp from "../components/DownloadApp";
import circle from "../images/Ellipse 3.png";
import state from "../images/statemap.png";
import flag from "../images/flag.png";
import question from "../images/question.png";
import democratic from "../images/democraticflag.png";
import republican from "../images/republicflag.png";
import independent from "../images/independentflag.png";
import {
  useStatePredictions,
  StatePredictionsProvider,
} from "../utils/StateIDs";
import axios from "axios";
import Prediction from "./Prediction";
import StateWinner from "../components/statewinner/StateWinner";

function ElectoralCollege() {
  const { state_predictions, addPrediction, clearPredictions } =
    useStatePredictions();
  const [step, setStep] = useState(0);
  const [previousData, setPreviousData] = useState([]);
  const [selectedButtonId, setSelectedButtonId] = useState(null);

  const handleClick = (stateId, partyId) => {
    // Add prediction
    addPrediction({
      state_id: stateId,
      party_id: partyId,
    });
    setSelectedButtonId(partyId);
  };
  const token = localStorage.getItem("token");
  const imageUrl = "http://thewhitehousegame.com/public/";
  useEffect(() => {
    axios
      .get("http://thewhitehousegame.com/public/api/getStateParty", {
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
  }, [state_predictions]);

  const handleSteps = () => {
    setSelectedButtonId(0);
    if (step < previousData?.states?.length - 1) {
      setStep(step + 1);
      setSelectedButtonId(null);
      console.log("Incrementing step:", step + 1);
    } else if (step === previousData?.states?.length - 1) {
      axios
        .post(
          "http://thewhitehousegame.com/public/api/submit_electoral_college_prediction",
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
          console.log("API response:", response);
          // Handle success response
        })
        .catch((error) => {
          console.error("API error:", error);
          // Handle error
        });
    }
  };

  // const submitData = () => {
  //     axios.post('http://pankhay.com/thewhitehousegame/public/api/submit_electoral_college_prediction', {
  //         "state_predictions": state_predictions
  //     }, {
  //         headers: {
  //             Authorization: `Bearer ${token}`,
  //             Accept: 'application/json',
  //             'Content-Type': 'application/json'
  //         }
  //     })
  //         .then((response) => {
  //             alert(response);
  //         })
  //         .catch((err) => {
  //             alert(err);
  //         });

  // }

  return (
    <div className=" bg-[#1c2452]">
      <AppBanner
        bannerTitle={"College"}
        redTitle={"Electoral"}
        bg={electoral}
        bannerDesc={
          "Predict the next President of the United States and tell the world what you think!"
        }
      />

      <div className="voting w-10/12  resp m-auto py-[102px] bg-[#1c2452]">
        <div className="state-data  mb-[110px] m-auto px-[120px] h-72 sm:h-64 bg-redish rounded-[18.06px] relative flex flex-col justify-center  sm:flex sm:flex-row sm:justify-evenly items-center">
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

        <div className="question relative px-[72px] py-14 sm:px-[120px] sm:py-16 bg-[#131A41] rounded-[18.06px]">
          <img
            src={question}
            alt=""
            className="absolute top-[-20%] left-[50%] translate-x-[-50%]"
          />
          <h4 className="text-white text-center poppins6 py-5 sm:py-0 text-[17px] sm:text-[36px]">
            Who do you predict will win?
          </h4>
          <h2 className="text-white text-center poppins6 text-[20.4px]">
            {previousData?.states?.[step]?.name}
          </h2>
        </div>

        <div className="badges my-[77px]">
          <h6 className="text-white text-right mb-8">{`${step + 1} of ${
            previousData?.states?.length
          }`}</h6>
          <div className="flex justify-between gap-3 ">
            <div
              className={`${
                selectedButtonId === 1 ? "border-red-600 border-[10px]" : ""
              }  rounded-[54px] border-[10px] border-[#1c2452]`}
              onClick={() => handleClick(previousData?.states?.[step]?.id, 1)}
            >
              <img src={democratic} className="" alt="" />
            </div>
            <div
              className={`${
                selectedButtonId === 2 ? "border-red-600 border-[10px]" : ""
              }  rounded-[54px] border-[10px] border-[#1c2452] `}
              onClick={() => handleClick(previousData?.states?.[step]?.id, 2)}
            >
              <img src={republican} alt="" />
            </div>
            <div
              className={`${
                selectedButtonId === 3 ? "border-red-600 border-[10px]" : ""
              }  rounded-[54px] border-[10px] border-[#1c2452]`}
              onClick={() => handleClick(previousData?.states?.[step]?.id, 3)}
            >
              <img src={independent} alt="" />
            </div>
          </div>
        </div>
        <button
          onClick={handleSteps}
          className={`btn bg-redish m-auto w-[258px] sm:w-[346px] block px-8 mb-[108px] py-2 text-white uppercase rounded-[6px] ${
            selectedButtonId === null ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={selectedButtonId === null}
        >
          {step === previousData?.states?.length - 1 ? "submit" : "next"}
        </button>

        <div className="flex p-2 bg-[#131A41] rounded-[10.65px] mb-[83px]">
          <div className="py-4 bg-[#031BBB] w-[50%]"></div>
          <div className="py-4 bg-white w-[15%]"></div>
          <div className="py-4 bg-redish w-[35%]"></div>
        </div>

        <div className="result-card ">
          <h2 className="text-white mb-12 poppins6 text-[25.4px] md:text-[56.4px]">
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
                    Republic
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
                  <p className="poppins6 hidden sm:hidden md:hidden lg:block sm:text-[22px] text-[#131A41] opacity-70 absolute left-1">
                    Others
                  </p>
                  <div className="value poppins4 text-[14px] sm:text-[22px] -ml-5 sm:ml-14 text-[#131A41] opacity-70 ">
                    <p className="flex items-center gap-3 ">
                      {/* <svg width="71" height="26" viewBox="0 0 71 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M15.4206 25.6655C13.236 25.4884 11.2068 24.5159 9.75432 22.9501C8.96506 22.1374 7.99225 21.5067 6.90942 21.1056C6.22945 20.8731 5.4907 20.8463 4.7942 21.029C4.0977 21.2116 3.47739 21.5947 3.01777 22.126L3.02935 22.1091L0.5625 20.5403C1.3621 19.5248 2.47213 18.7704 3.73985 18.3811C5.00757 17.9918 6.37071 17.9866 7.64164 18.3663C9.19979 18.8624 10.6063 19.7158 11.7378 20.8512C13.8044 22.6294 14.9993 23.4987 17.5612 22.2647C19.7316 21.2117 20.4122 18.9459 21.1994 16.3282C22.089 13.3783 23.0881 10.0337 26.6565 8.38845C27.3986 7.9969 28.2265 7.77582 29.074 7.74245C29.9214 7.70908 30.7654 7.86437 31.5388 8.19624C32.7182 8.81181 33.7672 9.63089 34.6327 10.6118C36.3614 12.3419 37.5325 13.3725 39.7637 12.7987C42.3018 12.1456 44.0736 9.89267 45.949 7.50814C48.2425 4.59214 50.8414 1.28858 55.3082 0.864535C55.5944 0.837679 55.8789 0.825195 56.1606 0.825195C63.7868 0.825195 69.874 10.3108 70.1379 10.7292L67.5985 12.1879C67.5437 12.1002 62.113 3.65214 56.174 3.65214C55.9833 3.65214 55.7916 3.66115 55.5989 3.67906C52.4307 3.9773 50.4335 6.51584 48.3194 9.20286C46.2246 11.8658 44.0586 14.6191 40.5346 15.5252C36.4888 16.5669 34.1732 14.2533 32.4831 12.5571C30.7174 10.7903 29.8575 10.0452 27.9451 10.9273C25.573 12.0227 24.8656 14.3746 24.0472 17.0998C23.1933 19.9465 22.2238 23.1778 18.9029 24.7849C17.832 25.3381 16.6383 25.64 15.4206 25.6655Z" fill="url(#paint0_linear_650_2374)" />
                                                <defs>
                                                    <linearGradient id="paint0_linear_650_2374" x1="58.7276" y1="5.1971" x2="50.1242" y2="32.2101" gradientUnits="userSpaceOnUse">
                                                        <stop stop-color="#131A41" />
                                                        <stop offset="1" stop-color="white" stop-opacity="0.2" />
                                                    </linearGradient>
                                                </defs>
                                            </svg> */}
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
                  <p className="poppins6 hidden sm:hidden md:hidden lg:block sm:text-[22px] text-white">
                    Republic
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
                  <p className="poppins6 hidden sm:hidden md:hidden lg:block sm:text-[22px] text-[#131A41] absolute left-1 opacity-70">
                    Others
                  </p>
                  <div className="value poppins4 text-[14px] sm:text-[22px] -ml-5 sm:ml-2   text-[#131A41] opacity-70">
                    <p className="flex items-center gap-3">
                      {/* <svg width="71" height="26" viewBox="0 0 71 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M15.4206 25.6655C13.236 25.4884 11.2068 24.5159 9.75432 22.9501C8.96506 22.1374 7.99225 21.5067 6.90942 21.1056C6.22945 20.8731 5.4907 20.8463 4.7942 21.029C4.0977 21.2116 3.47739 21.5947 3.01777 22.126L3.02935 22.1091L0.5625 20.5403C1.3621 19.5248 2.47213 18.7704 3.73985 18.3811C5.00757 17.9918 6.37071 17.9866 7.64164 18.3663C9.19979 18.8624 10.6063 19.7158 11.7378 20.8512C13.8044 22.6294 14.9993 23.4987 17.5612 22.2647C19.7316 21.2117 20.4122 18.9459 21.1994 16.3282C22.089 13.3783 23.0881 10.0337 26.6565 8.38845C27.3986 7.9969 28.2265 7.77582 29.074 7.74245C29.9214 7.70908 30.7654 7.86437 31.5388 8.19624C32.7182 8.81181 33.7672 9.63089 34.6327 10.6118C36.3614 12.3419 37.5325 13.3725 39.7637 12.7987C42.3018 12.1456 44.0736 9.89267 45.949 7.50814C48.2425 4.59214 50.8414 1.28858 55.3082 0.864535C55.5944 0.837679 55.8789 0.825195 56.1606 0.825195C63.7868 0.825195 69.874 10.3108 70.1379 10.7292L67.5985 12.1879C67.5437 12.1002 62.113 3.65214 56.174 3.65214C55.9833 3.65214 55.7916 3.66115 55.5989 3.67906C52.4307 3.9773 50.4335 6.51584 48.3194 9.20286C46.2246 11.8658 44.0586 14.6191 40.5346 15.5252C36.4888 16.5669 34.1732 14.2533 32.4831 12.5571C30.7174 10.7903 29.8575 10.0452 27.9451 10.9273C25.573 12.0227 24.8656 14.3746 24.0472 17.0998C23.1933 19.9465 22.2238 23.1778 18.9029 24.7849C17.832 25.3381 16.6383 25.64 15.4206 25.6655Z" fill="url(#paint0_linear_650_2374)" />
                                                <defs>
                                                    <linearGradient id="paint0_linear_650_2374" x1="58.7276" y1="5.1971" x2="50.1242" y2="32.2101" gradientUnits="userSpaceOnUse">
                                                        <stop stop-color="#131A41" />
                                                        <stop offset="1" stop-color="white" stop-opacity="0.2" />
                                                    </linearGradient>
                                                </defs>
                                            </svg> */}
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
                  <p className="poppins6 hidden sm:hidden md:hidden lg:block sm:text-[22px] text-white">
                    Republic
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
                  <p className="poppins6 hidden sm:hidden md:hidden lg:block text-[22px] text-[#131A41] absolute left-1 opacity-70">
                    Others
                  </p>
                  <div className="value poppins4 text-[14px] sm:text-[22px] -ml-5 sm:ml-0 text-[#131A41] opacity-70">
                    <p className="flex items-center gap-3 -ml-5 sm:ml-4">
                      {/* <svg width="71" height="26" viewBox="0 0 71 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M15.4206 25.6655C13.236 25.4884 11.2068 24.5159 9.75432 22.9501C8.96506 22.1374 7.99225 21.5067 6.90942 21.1056C6.22945 20.8731 5.4907 20.8463 4.7942 21.029C4.0977 21.2116 3.47739 21.5947 3.01777 22.126L3.02935 22.1091L0.5625 20.5403C1.3621 19.5248 2.47213 18.7704 3.73985 18.3811C5.00757 17.9918 6.37071 17.9866 7.64164 18.3663C9.19979 18.8624 10.6063 19.7158 11.7378 20.8512C13.8044 22.6294 14.9993 23.4987 17.5612 22.2647C19.7316 21.2117 20.4122 18.9459 21.1994 16.3282C22.089 13.3783 23.0881 10.0337 26.6565 8.38845C27.3986 7.9969 28.2265 7.77582 29.074 7.74245C29.9214 7.70908 30.7654 7.86437 31.5388 8.19624C32.7182 8.81181 33.7672 9.63089 34.6327 10.6118C36.3614 12.3419 37.5325 13.3725 39.7637 12.7987C42.3018 12.1456 44.0736 9.89267 45.949 7.50814C48.2425 4.59214 50.8414 1.28858 55.3082 0.864535C55.5944 0.837679 55.8789 0.825195 56.1606 0.825195C63.7868 0.825195 69.874 10.3108 70.1379 10.7292L67.5985 12.1879C67.5437 12.1002 62.113 3.65214 56.174 3.65214C55.9833 3.65214 55.7916 3.66115 55.5989 3.67906C52.4307 3.9773 50.4335 6.51584 48.3194 9.20286C46.2246 11.8658 44.0586 14.6191 40.5346 15.5252C36.4888 16.5669 34.1732 14.2533 32.4831 12.5571C30.7174 10.7903 29.8575 10.0452 27.9451 10.9273C25.573 12.0227 24.8656 14.3746 24.0472 17.0998C23.1933 19.9465 22.2238 23.1778 18.9029 24.7849C17.832 25.3381 16.6383 25.64 15.4206 25.6655Z" fill="url(#paint0_linear_650_2374)" />
                                                <defs>
                                                    <linearGradient id="paint0_linear_650_2374" x1="58.7276" y1="5.1971" x2="50.1242" y2="32.2101" gradientUnits="userSpaceOnUse">
                                                        <stop stop-color="#131A41" />
                                                        <stop offset="1" stop-color="white" stop-opacity="0.2" />
                                                    </linearGradient>
                                                </defs>
                                            </svg> */}
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
