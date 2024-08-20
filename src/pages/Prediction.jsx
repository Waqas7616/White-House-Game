import React, { useEffect, useState } from "react";
import AppBanner from "../components/appbanner/AppBanner";
import bg from "../images/prediction.jpg";
import Predict from "../components/predict/Predict";
import dem from "../images/demTITLE.png";
import rep from "../images/repTITLE.png";
import ind from "../images/indTITLE.png";
import calender from "../images/calender.png";
import democratic from "../images/Democraticlogo.png";
import republican from "../images/Republicanlogo.png";
import independent from "../images/Independentlogo.png";
import logo1 from "../images/logo1.png";

import axios from "axios";
import { useStatePredictions } from "../utils/StateIDs";
import DownloadApp from "../components/DownloadApp";
import { useNavigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import ReactGA from "react-ga4";
import { Helmet } from "react-helmet";
import CustomSpinner from "../components/spinner";

function Prediction() {
  const navigate = useNavigate();
  const { president, vicePresident, party, voting, addVoting,clearVoting } =
    useStatePredictions();

  const [status, setStatus] = useState(null);
  const [popup, setPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [myData, setMyData] = useState(false);
  const [duplicatePopup, setDuplicatePopup] = useState(false);

const handleDuplicatePopup=()=>{
  setDuplicatePopup(false);
  clearVoting();
  setMyData(true)
}
  useEffect(() => {
    ReactGA.send({
      hitType: "pageview",
      path: window.location.pathname,
    });
  }, []);
  const [error, setError] = useState("");
  const [data, setData] = useState({
    votter_party_id: party,
    president_id: president,
    vice_president_id: vicePresident,
  });
  const [isSelectionComplete, setIsSelectionComplete] = useState(false);
  useEffect(() => {
    setData({
      votter_party_id: party,
      president_id: president,
      vice_president_id: vicePresident,
    });
  }, [president, vicePresident]);
  const token = secureLocalStorage.getItem("token");

  const handleSelectionChange = (isComplete) => {
    setIsSelectionComplete(isComplete);
  };

  const submitData = () => {
    addVoting({
      votter_party_id: party,
      president_id: president,
      vice_president_id: vicePresident,
    });
  };
  const checkDuplicateCandidates = () => {
    const selectedPresidents = new Set();
    const selectedVicePresidents = new Set();
  
    for (const vote of voting) {
      if (selectedPresidents.has(vote.president_id) || selectedVicePresidents.has(vote.vice_president_id) || vote.president_id===vote.vice_president_id) {
        return true;
      }
      selectedPresidents.add(vote.president_id);
      selectedVicePresidents.add(vote.vice_president_id);
    }
  
    return false;
  };
  // const resetSelections = () => {
  //   resetVoting();
  //   setIsSelectionComplete(false);
  // };

  const sendPrediction = () => {
    if (checkDuplicateCandidates()) {
      setDuplicatePopup(true);
      


      return;
    }
    ReactGA.event({
      category: "Election",
      action: "Election through President only",
    });
    setLoading(true);
    axios
      .post(
        "https://app.thewhitehousegame.com/api/select_party_leaders",
        {
          parties: voting,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            content_type: "application/json",
          },
        }
      )
      .then((res) => {
        setStatus(res.status);
        setLoading(false);
        if (res.status === 200) {
          navigate("/party-prediction", { state: { voting } });
        }
      })
      .catch((err) => {
        console.log("the error is :", err);
        setError(err.message);
        setPopup(err.response.status !== 200 && true);
        setLoading(false);
      });
      clearVoting();
  };
  // console.log(myData);
  return (
    <>
      {popup && (
        <div className="w-full h-screen bg-black/60 fixed z-50 top-0 left-0 flex justify-center items-center">
          <div className="popup flex flex-col items-center justify-center  bg-[#1C2452] w-full max-w-md h-auto py-8 px-6 rounded-[30px] sm:w-5/12  relative">
            <div className="text-center mb-6">
              <img className="w-[80px] h-[80px]" src={logo1} alt="" />
            </div>
            <button
              onClick={() => navigate("/login")}
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
              <h2 className="text-white text-center m-auto">{error}</h2>
            </div>

            <button
              onClick={() => navigate("/login")}
              className="bg-redish w-full sm:w-[50%] block text-white poppins5 py-3 rounded-md text-center mb-4"
            >
              Log In
            </button>
          </div>
        </div>
      )}
      {duplicatePopup && (
        <div className="w-full h-screen bg-black/60 fixed z-50 top-0 left-0 flex justify-center items-center">
          <div className="popup flex flex-col items-center justify-center  bg-[#1C2452] w-full max-w-md h-auto py-8 px-6 rounded-[30px] sm:w-5/12  relative">
            <div className="text-center mb-6">
              <img className="w-[80px] h-[80px]" src={logo1} alt="" />
            </div>
            <button
              onClick={() => {
                // resetSelections();
                setDuplicatePopup(false);
              }}
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
                Same candidate selected for multiple parties. Please change your
                selection.
              </h2>
            </div>

            <button
              onClick={handleDuplicatePopup}
              className="bg-redish w-full sm:w-[50%] block text-white poppins5 py-3 rounded-md text-center mb-4"
            >
              Close
            </button>
          </div>
        </div>
      )}
      <div className="">
        <Helmet>
          <title>The White House Game | Predict Next President</title>
          <meta
            name="keywords"
            content="2024 Presidential election, prediction, next president."
          />
          <meta
            name="description"
            content="Our game lets you predict which candidates each party will select and who the ultimate winner will be. You can also predict the Electoral College if you want to."
          />
          <meta lang="en" />
        </Helmet>
        <AppBanner
          redTitle={"MAKE A"}
          bg={bg}
          bannerTitle={"PREDICTION"}
          bannerDesc={
            <>
              Predict the next President and Vice President of the United States
              <br /> Start by predicting each party’s candidates
            </>
          }
        />
        <p className="poppins4 text-white text-center xl:w-[55%] xl:text-[30px] m-auto mt-5">
          Scroll the candidates and click to select <br />
          who you believe will be nominees on
        </p>
        <p className="poppins4 text-white/80 xl:text-[22px] text-center justify-center flex items-center gap-2 m-auto mt-5">
          <img src={calender} alt="" />
          Tuesday, November
          <span className="poppins5 text-white xl:text-[22px]">5, 2024</span>
        </p>
        <div className="resp w-10/12  m-auto flex flex-wrap gap-6 items-center justify-center mt-12">
          <div>
            <div className="flex items-center gap-3 bg-[rgba(252,222,222,0.2)] text-[10px] sm:text-[12px] md:text-[13px] xl:text-[22px] text-white w-fit px-2 py-1 rounded">
              <span className="">
                <img className="w-10" src={democratic} alt="" />
              </span>
              <h2>Democratic</h2>
            </div>
            <div>
              <Predict
                name={"Democratic"}
                titleImage={dem}
                party={"Democratic"}
                submitData={submitData}
                onSelectionChange={handleSelectionChange}
                myData={myData}
                // afterchange={(index)=>{console.log(candidateData.filter((item)=>item?.party.party_name==="Democratic")[index])}}
                // afterchange={(index) => { console.log(index) }}
              />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-3 bg-[rgba(252,222,222,0.2)] text-[10px] sm:text-[12px] md:text-[13px] xl:text-[22px] text-white w-fit px-2 py-1 rounded">
              <span className="">
                <img className="w-10" src={republican} alt="" />
              </span>
              <h2>Republican</h2>
            </div>

            <Predict
              name={"Republican"}
              titleImage={rep}
              party={"Republican"}
              submitData={submitData}
              onSelectionChange={handleSelectionChange}
              myData={myData}
            />
          </div>
          <div>
            <div className="relative">
              <div className="flex items-center gap-3 bg-[rgba(252,222,222,0.2)] text-[10px] sm:text-[12px] md:text-[13px] xl:text-[22px] text-white w-fit px-2 py-1 rounded">
                <span className="">
                  <img className="w-10" src={independent} alt="" />
                </span>
                <h2>Independent</h2>
              </div>
              <p className="absolute right-0 top-[7px] text-[10px] w-[52%] text-white">
                Select leading Independent or <br /> third party on election day
              </p>
            </div>

            <Predict
              name={"Independent"}
              titleImage={ind}
              party={"Independent('Kennedy')"}
              submitData={submitData}
              onSelectionChange={handleSelectionChange}
              myData={myData}
            />
          </div>
        </div>
        <div className="buttons flex items-center justify-center gap-4 xl:mt-[54px] mb-3 ">
          {/* <button className="rounded-[6px] text-white poppins-6 border-[1px] border-white px-5 py-2 sm:px-10 sm:py-2 ">Edit my predictions</button> */}
          {loading ? (
            <CustomSpinner />
          ) : (
            <button
              onClick={sendPrediction}
              disabled={!isSelectionComplete}
              className={`rounded-[6px] text-white poppins-6 border-[1px] border-redish px-10 py-2 bg-redish ${
                !isSelectionComplete ? "opacity-40" : ""
              }`}
            >
              Submit your prediction
            </button>
          )}
        </div>
        <DownloadApp />
      </div>
    </>
  );
}

export default Prediction;
