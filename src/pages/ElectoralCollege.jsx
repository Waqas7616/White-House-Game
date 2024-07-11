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
import logo1 from "../images/logo1.png";
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
import { useNavigate } from "react-router-dom";
import usa from "../images/usa-outline.svg";
import usflag from "../images/usflag.webp";
import secureLocalStorage from "react-secure-storage";
import ReactGA from "react-ga4";
import CustomSpinner from "../components/spinner";
import check from "../images/check.png";
import { Helmet } from "react-helmet";
import logo from "../images/logo1.png";
import badge from "../images/Democraticlogo.png";
import confetti from "../images/confetti.png";
import badge2 from "../images/Republicanlogo.png";
import badge3 from "../images/Independentlogo.png";
import calender from "../images/calender.png";

const initialElectoralCount = {
  Democratic: 0,
  Republican: 0,
  Independent: 0,
  total: 538,
};

function ElectoralCollege() {
  const navigate = useNavigate();

  const { state_predictions, addPrediction, clearPredictions } =
    useStatePredictions();
  useEffect(() => {
    ReactGA.send({
      hitType: "pageview",
      path: window.location.pathname,
    });
  }, []);
  const myData = secureLocalStorage.getItem("electoral_data");
  const myStep = secureLocalStorage.getItem("electoral_step");
  const [step, setStep] = useState(myStep || 0);
  const [partyClick, setPartyClick] = useState(false);
  const [forceUpdate, setForceUpdate] = useState(0);
  const [electoralCount, setElectoralCount] = useState(() => {
    const storedCount = secureLocalStorage.getItem("electoralCount");
    return storedCount ? JSON.parse(storedCount) : initialElectoralCount;
  });
  const [demLength, setDemLength] = useState();
  const [repLength, setRepLength] = useState();
  const [indLength, setIndLength] = useState();
  const [previousData, setPreviousData] = useState([]);
  const [selectedButtonId, setSelectedButtonId] = useState(null);
  const [error, setError] = useState("");
  const [popUp, setPopUp] = useState(false);
  const [popUp1, setPopup1] = useState(false);
  const [loading, setLoading] = useState(false);
  const [winners, setWinners] = useState([]);

  useEffect(() => {
    setDemLength((electoralCount.Democratic / electoralCount.total) * 100);
    setRepLength((electoralCount.Republican / electoralCount.total) * 100);
    setIndLength((electoralCount.Independent / electoralCount.total) * 100);
  }, [electoralCount]);

  const handleRemoval = (partyId) => {
    setSelectedButtonId(null);
    setPartyClick(false);
    clearPredictions();
    setElectoralCount((prev) => ({
      ...prev,
      Democratic:
        partyId === 1
          ? previousData?.states?.[step]?.name === "Maine" ||
            previousData?.states?.[step]?.name === "Nebraska"
            ? prev.Democratic -
              previousData?.states?.[step]?.electrical_collage_number_1
            : prev.Democratic -
              previousData?.states?.[step]?.electrical_collage_number
          : prev.Democratic,
      Republican:
        partyId === 2
          ? previousData?.states?.[step]?.name === "Maine" ||
            previousData?.states?.[step]?.name === "Nebraska"
            ? prev.Republican -
              previousData?.states?.[step]?.electrical_collage_number_1
            : prev.Republican -
              previousData?.states?.[step]?.electrical_collage_number
          : prev.Republican,
      Independent:
        partyId === 3
          ? previousData?.states?.[step]?.name === "Maine" ||
            previousData?.states?.[step]?.name === "Nebraska"
            ? prev.Independent -
              previousData?.states?.[step]?.electrical_collage_number_1
            : prev.Independent -
              previousData?.states?.[step]?.electrical_collage_number
          : prev.Independent,
    }));
  };

  const handleClick = (stateId, partyId) => {
    setPartyClick(true);
    // Add prediction
    if (!partyClick) {
      addPrediction({
        state_id: stateId,
        party_id: partyId,
      });

      setSelectedButtonId(partyId);
      setElectoralCount((prev) => ({
        ...prev,
        Democratic:
          partyId === 1
            ? previousData?.states?.[step]?.name === "Maine" ||
              previousData?.states?.[step]?.name === "Nebraska"
              ? prev.Democratic +
                previousData?.states?.[step]?.electrical_collage_number_1
              : prev.Democratic +
                previousData?.states?.[step]?.electrical_collage_number
            : prev.Democratic,
        Republican:
          partyId === 2
            ? previousData?.states?.[step]?.name === "Maine" ||
              previousData?.states?.[step]?.name === "Nebraska"
              ? prev.Republican +
                previousData?.states?.[step]?.electrical_collage_number_1
              : prev.Republican +
                previousData?.states?.[step]?.electrical_collage_number
            : prev.Republican,
        Independent:
          partyId === 3
            ? previousData?.states?.[step]?.name === "Maine" ||
              previousData?.states?.[step]?.name === "Nebraska"
              ? prev.Independent +
                previousData?.states?.[step]?.electrical_collage_number_1
              : prev.Independent +
                previousData?.states?.[step]?.electrical_collage_number
            : prev.Independent,
      }));
    }
  };

  const token = secureLocalStorage.getItem("token");
  const imageUrl = "https://thewhitehousegame.com/api/public/";

  useEffect(() => {
    axios
      .get("https://thewhitehousegame.com/api/public/api/getStateParty", {
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

  // useEffect(() => {
  // }, [state_predictions]);

  const newdata = {
    message: "Electoral",
  };

  const handleSteps = () => {
    setPartyClick(false);
    setSelectedButtonId(0);
    if (step < previousData?.states?.length - 1) {
      setStep(step + 1);
      setSelectedButtonId(null);
    } else if (step === previousData?.states?.length - 1) {
      setLoading(true);
      ReactGA.event({
        category: "Election",
        action: "Prediction made through Electoral",
      });
      axios
        .post(
          "https://thewhitehousegame.com/api/public/api/submit_electoral_college_prediction",
          {
            state_predictions: state_predictions || myData,
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
          setWinners(response.data.finalizedCandidates);
          setPopup1(true);
          setLoading(false);
          console.log("winners", response.data.finalizedCandidates);
        })
        .catch((error) => {
          // console.error("API error:", error.response.data.error);
          setError(error?.response?.data?.error);
          setPopUp(true);
          setLoading(false);
          // Handle error
        });
      secureLocalStorage.setItem(
        "electoralCount",
        JSON.stringify(electoralCount)
      );
    }
  };

  const [statesData, setStatesData] = useState({});

  useEffect(() => {
    axios
      .get("https://thewhitehousegame.com/api/public/api/getVoterPartyCount", {
        headers: {
          Accept: "application/json",
        },
      })
      .then((res) => {
        // console.log("states ka data hai:", res.data.electoral_votes_by_party);
        setStatesData(res.data.electoral_votes_by_party);
      })
      .catch((err) => {});
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

  const handleUpdatePrediction = () => {
    clearPredictions();
    setStep(0);
    setElectoralCount((prev) => ({
      ...prev,
      Democratic: 0,
      Republican: 0,
      Independent: 0,
    }));
    secureLocalStorage.removeItem("electoral_data");
    secureLocalStorage.removeItem("electoral_step");
    secureLocalStorage.removeItem("electoralCount");
  };
  const sortedData = previousData?.states?.sort(
    (a, b) => a.name !== "USA" && a.name.localeCompare(b.name)
  );

  return (
    <>
      <Helmet>
        <title>The White House Game | Electoral College</title>
        <meta
          name="keywords"
          content="2024 Presidential election, predict, Electoral College, predict, play."
        />
        <meta
          name="description"
          content="If you enjoy politics then you will enjoy predicting who will be the next President. Predict each party to win the states and whoever gets 270 votes rules The Free World."
        />
        <meta lang="en" />
      </Helmet>
      <div className=" bg-[#1c2452]">
        {popUp && (
          <div className="w-full h-screen bg-black/60 fixed z-50 top-0 left-0 flex justify-center items-center">
            <div className="popup flex flex-col items-center justify-center  bg-[#1C2452] w-full max-w-md h-auto py-8 px-6 rounded-[30px] sm:w-5/12 sm:h-[55vh] relative">
              <div className="text-center mb-6">
                <img className="w-[80px] h-[80px]" src={logo1} alt="" />
              </div>
              <button
                onClick={() => setPopUp(false)}
                className="absolute top-4 right-4 text-white hover:text-gray-400 transition-colors duration-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <div className="text-center mb-5">
                <h2 className="text-white text-center m-auto">
                  Payment of{" "}
                  <span className="font-extrabold text-white">$1.49</span> is
                  required to <br /> submit your prediction
                </h2>
              </div>
              <button
                onClick={() => {
                  navigate("/payment", { state: { newdata } });
                  secureLocalStorage.setItem(
                    "electoral_data",
                    state_predictions
                  );
                  secureLocalStorage.setItem("electoral_step", step);
                }}
                className="bg-redish w-full sm:w-[50%] block text-white poppins5 py-3 rounded-md text-center mb-4"
              >
                Pay Now
              </button>
              <p className="text-gray-400 text-center text-[11px]">
                The payment is to stop fake and multiple voting and spam. <br />{" "}
                Payments received are used to maintain our website and apps.
              </p>
            </div>
          </div>
        )}

        {popUp1 && (
          <div className="w-full h-screen bg-black/60 fixed z-50 top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] bottom-0 flex justify-center items-center">
            <div className="popup bg-[#1C2452] px-16 rounded-[30px] py-2 md:py-3 lg:py-4 xl:py-8 2xl:py-12   ">
              <div className="popup-content ">
                <img
                  src={logo}
                  className="m-auto w-[45px] lg:w-[50px] xl:w-[90px]"
                  alt=""
                />
                <h1 className="poppins6 text-white text-center text-[13px] xl:text-[16px]">
                  Who you expect to win
                </h1>
                <div
                  style={{ background: `url(${confetti})` }}
                  className="p-4 w-20 mb-2 rounded-full m-auto flex justify-center items-center"
                >
                  <div className="party-badge bg-white rounded-full xl:w-10 xl:h-10 md:w-[30px] md:h-[30px] flex items-center justify-center">
                    <img
                      className="w-5"
                      src={
                        winners[0]?.id === 1
                          ? badge
                          : winners[0]?.id === 2
                          ? badge2
                          : badge3
                      }
                      alt=""
                    />
                  </div>
                </div>
                <div
                  className="flex gap-5 w-fit m-auto  items-center justify-center p-4 border-[2px] border-white rounded-[18.5px] md:mb-4 2xl:mb-10"
                  style={{
                    background:
                      "linear-gradient(90deg, #ED1C24 0%, #BE1E2E 50%, #1C2452 100%)",
                  }}
                >
                  <div>
                    <h1 className="text-white text-[12px] xl:text-[16px] poppins6 mb-2">
                      President
                    </h1>
                    <div className="w-[100px] h-[100px] md:w-[90px] md:h-[90px] lg:w-[100px] lg:h-[100] xl:w-[110px] xl:h-[120px]  overflow-hidden rounded-[10.96px]">
                      {winners && (
                        <img
                          className="w-[100px] h-[100px] md:w-[90px] md:h-[90px] lg:w-[100px] lg:h-[100] xl:w-[110px] xl:h-[120px] object-cover"
                          src={`${imageUrl}${winners[0]?.voted_candidates?.candidate_image}`}
                          alt=""
                        />
                      )}
                    </div>
                  </div>
                  <div>
                    <h1 className="text-white text-[12px] xl:text-[16px] poppins6 mb-2">
                      Vice President
                    </h1>
                    <div className="w-[100px] h-[100px] md:w-[90px] md:h-[90px] lg:w-[100px] lg:h-[100] xl:w-[110px] xl:h-[120px]  overflow-hidden rounded-[10.96px]">
                      {winners && (
                        <img
                          className="w-[100px] h-[100px] md:w-[90px] md:h-[90px] lg:w-[100px] lg:h-[100] xl:w-[110px] xl:h-[120px] object-cover"
                          src={`${imageUrl}${winners[1]?.voted_candidates?.candidate_image}`}
                          alt=""
                        />
                      )}
                    </div>
                  </div>
                </div>

                <p className="text-white text-center poppins4 text-[12px] xl:text-[14px] 2xl:text-[16px]">
                  A lot can happen before election day
                </p>
                <p className="poppins4 text-white/80 text-[12px] xl:text-[14px] 2xl:text-[16px] text-center justify-center flex items-center gap-2 m-auto mb-1 2xl:mt-2">
                  <img className="w-[15px]" src={calender} alt="" />
                  Tuesday, November
                  <span className="poppins4 text-white xl:text-[15px]">
                    5, 2024
                  </span>
                </p>
                <p className="text-white text-center poppins4 text-[13px] m-auto mt-3 2xl:mt-5">
                  If you would like to change your Prediction{" "}
                </p>
                <button
                  onClick={() => navigate("/predict")}
                  className="bg-redish px-5 m-auto mt-3 block py-2 2xl:py-3 rounded-[6px] text-[14px] poppins6 text-white text-center mb-3"
                >
                  Update your predictions
                </button>
                <button
                  onClick={() => navigate("/")}
                  className="rounded-[6px] border-[1px] px-20 block m-auto py-2 2xl:py-3 mt-5 border-white poppins7 text-white text-center"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
        <AppBanner
          bannerTitle={"College"}
          redTitle={"Electoral"}
          bg={electoral}
          bannerDesc={
            <>
              The Electoral College has{" "}
              <span className="text-redish orbit7">538</span> delegates <br />
              Whoever wins <span className="text-redish orbit7">270</span>{" "}
              decides who will be
              <br />
              President of the United States
              <br />
              <span className="!mt-12">Predict who wins each State </span>
            </>
          }
        />

        <div className="voting w-10/12  resp m-auto py-[102px] bg-[#1c2452]">
          <div className="state-data  mb-6 m-auto px-[120px] h-72 sm:h-64 bg-redish rounded-[18.06px] relative flex flex-col justify-center  sm:flex sm:flex-row sm:justify-evenly items-center">
            {sortedData?.[step].name === undefined ? (
              <CustomSpinner />
            ) : (
              <>
                <img src={circle} alt="" className="absolute right-0" />
                <div className="map  w-fit">
                  <img
                    className="object-contain "
                    src={
                      sortedData?.[step]?.name === "USA"
                        ? usa
                        : `${imageUrl}${sortedData?.[step]?.map_url}`
                    }
                    alt=""
                  />
                </div>
                <div className="info flex flex-col sm:flex sm:flex-row  md:justify-center gap-5 items-center">
                  <div className="flag pt-5 sm:pt-0">
                    <img
                      className="w-12 sm:w-[95px]"
                      src={
                        sortedData?.[step]?.name === "USA"
                          ? usflag
                          : `${imageUrl}${sortedData?.[step]?.image_url}`
                      }
                      alt=""
                    />
                  </div>
                  <div className="name">
                    <h6 className="poppins6 text-white text-center text-[20px] sm:text-[33px]">
                      {sortedData?.[step]?.name === "USA"
                        ? "United States of America"
                        : sortedData?.[step]?.name}
                      {/* United States of America */}
                    </h6>
                    <p className="poppins4 text-white text-center text-[12px] sm:text-[28px]">
                      {sortedData?.[step]?.name === "USA"
                        ? "Click submit for your predictions"
                        : sortedData?.[step]?.name === "Maine" ||
                          sortedData?.[step]?.name === "Nebraska"
                        ? `${sortedData?.[step]?.electrical_collage_number_1} Electoral College Votes`
                        : `${sortedData?.[step]?.electrical_collage_number} Electoral College Votes`}
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="flex mb-2 justify-end w-full h-12">
            <div onClick={() => handleRemoval(selectedButtonId)}>
              {partyClick && <EditButton />}{" "}
            </div>
          </div>
          <div className="flex flex-col items-start lg:flex lg:flex-row lg:items-start ">
            <div className="question flex flex-col justify-center gap-3 items-center sm:w-[361px] sm:h-[201px] md:w-[361px] md:h-[284px] lg:w-[330px] lg:h-[186px] lg-a:w-[346px] lg-a:h-[230px] xl:w-[346px] xl:h-[300px] xl-a::w-[346px] xl-a:h-[304px]  2xl:w-[311px] 2xl:h-[324px] bg-[#131A41] rounded-[40px] xl:rounded-[54px] border-[10px] border-[#1c2452] px-7 py-4">
              {previousData && sortedData && sortedData[step] && (
                <img
                  src={`${imageUrl}${sortedData?.[step]?.state_image_url}`}
                  // src={abc}
                  alt=""
                  className="w-12 lg:w-12 xl:w-20 2xl:w-24 object-cover mt-3"
                />
              )}
              <div className="mx-auto ">
                <h4 className="text-white text-center poppins6  text-[17px] sm:text-[16px] lg:text-[15px] xl:text-[19px]  ">
                  Who do you predict will win?
                </h4>
              </div>
              <div>
                <h2 className="text-redish text-center poppins6 text-[19.4px] ">
                  {sortedData?.[step]?.name}
                </h2>
              </div>
            </div>

            <div className="badges mb-4">
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
                  onClick={() => handleClick(sortedData?.[step]?.id, 1)}
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
                  onClick={() => handleClick(sortedData?.[step]?.id, 2)}
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
                  onClick={() => handleClick(sortedData?.[step]?.id, 3)}
                >
                  <img src={independent} alt="" />
                </div>
              </div>
            </div>
          </div>
          {loading ? (
            <div className="flex items-center justify-center  w-full mt-3 mb-4 mx-auto">
              <CustomSpinner />
            </div>
          ) : (
            <div className="flex items-center justify-center  w-full mt-3 mb-4 mx-auto">
              <button
                onClick={() => {
                  if (step > 0) {
                    setStep(step - 1);
                    setSelectedButtonId(null);
                  }
                }}
                className={`bg-redish p-2 rounded-l-[6px] ${
                  selectedButtonId === null ? "" : "opacity-50"
                }`}
                // disabled={selectedButtonId === null}
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
                  selectedButtonId === null
                    ? "opacity-50 cursor-not-allowed"
                    : ""
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
                  selectedButtonId === null
                    ? "cursor-not-allowed"
                    : "opacity-50"
                }`}
                disabled={selectedButtonId === null}
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
          )}
          <div className="m-auto text-center my-4 mt-8">
            <button
              className="bg-redish text-white px-6 py-2 rounded "
              onClick={handleUpdatePrediction}
            >
              {" "}
              Update Prediction
            </button>
          </div>
          <h2 className="text-white  poppins6 text-[25.4px] md:text-[36.4px] mb-2">
            Your Electoral College Tally
          </h2>
          <div className="flex justify-between">
            <div className="flex flex-col md:flex-row gap-5 items-center mb-4">
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
            <p className="poppins5 text-white pr-5">270 to win</p>
          </div>
          <div className="flex p-2 bg-[#131A41] rounded-[10.65px] mb-3 w-full">
            <div
              className="py-4 bg-[#031BBB] text-white"
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
              className="py-4 bg-redish text-white"
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
                      width: `${sortedData?.[step]?.previous_election_state?.[0]?.vote_percentage}%`,
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
                          sortedData?.[step]?.previous_election_state?.[0]
                            ?.vote_percentage
                        }
                      </p>
                    </div>
                  </div>
                  <div
                    className={`py-6 flex justify-between px-4 bg-redish `}
                    style={{
                      width: `${sortedData?.[step]?.previous_election_state?.[1]?.vote_percentage}%`,
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
                          sortedData?.[step]?.previous_election_state?.[1]
                            ?.vote_percentage
                        }
                      </p>
                    </div>
                  </div>
                  <div
                    className="py-6 flex flex-col sm:flex sm:justify-between relative px-10 sm:px-20 items-center rounded-r-[10.65px] bg-white "
                    style={{
                      width: `${sortedData?.[step]?.previous_election_state?.[2]?.vote_percentage}%`,
                    }}
                  >
                    <p className="poppins4 hidden sm:hidden md:hidden lg:block sm:text-[22px] text-[#131A41] opacity-70 absolute left-1">
                      Others
                    </p>
                    <div className="value poppins4 text-[14px] sm:text-[22px] -ml-5 sm:ml-14 text-[#131A41] opacity-70 ">
                      <p className="flex items-center gap-3 ">
                        {
                          sortedData?.[step]?.previous_election_state?.[2]
                            ?.vote_percentage
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
                      width: `${sortedData?.[step]?.previous_election_state?.[3]?.vote_percentage}%`,
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
                          sortedData?.[step]?.previous_election_state?.[3]
                            ?.vote_percentage
                        }
                      </p>
                    </div>
                  </div>
                  <div
                    className="py-6 flex justify-between px-4 bg-redish "
                    style={{
                      width: `${sortedData?.[step]?.previous_election_state?.[4]?.vote_percentage}%`,
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
                          sortedData?.[step]?.previous_election_state?.[4]
                            ?.vote_percentage
                        }
                      </p>
                    </div>
                  </div>
                  <div
                    className="py-6 flex justify-between px-10 sm:px-20 relative items-center rounded-r-[10.65px] bg-white "
                    style={{
                      width: `${sortedData?.[step]?.previous_election_state?.[5]?.vote_percentage}%`,
                    }}
                  >
                    <p className="poppins4 hidden sm:hidden md:hidden lg:block sm:text-[22px] text-[#131A41] absolute left-1 opacity-70">
                      Others
                    </p>
                    <div className="value poppins4 text-[14px] sm:text-[22px] -ml-5 sm:ml-2   text-[#131A41] opacity-70">
                      <p className="flex items-center gap-3">
                        {
                          sortedData?.[step]?.previous_election_state?.[5]
                            ?.vote_percentage
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
                      width: `${sortedData?.[step]?.previous_election_state?.[6]?.vote_percentage}%`,
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
                          sortedData?.[step]?.previous_election_state?.[6]
                            ?.vote_percentage
                        }
                      </p>
                    </div>
                  </div>
                  <div
                    className="py-6 flex justify-between px-4 bg-redish "
                    style={{
                      width: `  ${sortedData?.[step]?.previous_election_state?.[7]?.vote_percentage}%`,
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
                          sortedData?.[step]?.previous_election_state?.[7]
                            ?.vote_percentage
                        }
                      </p>
                    </div>
                  </div>
                  <div
                    className="py-6 flex justify-between px-10 sm:px-20 items-center relative rounded-r-[10.65px] bg-white "
                    style={{
                      width: `  ${sortedData?.[step]?.previous_election_state?.[8]?.vote_percentage}%`,
                    }}
                  >
                    <p className="poppins4 hidden sm:hidden md:hidden lg:block text-[22px] text-[#131A41] absolute left-1 opacity-70">
                      Others
                    </p>
                    <div className="value poppins4 text-[14px] sm:text-[22px] -ml-5 sm:ml-0 text-[#131A41] opacity-70">
                      <p className="flex items-center gap-3 -ml-0 sm:ml-4">
                        {
                          sortedData?.[step]?.previous_election_state?.[8]
                            ?.vote_percentage
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
    </>
  );
}

export default ElectoralCollege;
