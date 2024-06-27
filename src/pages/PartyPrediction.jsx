import React, { useState, useEffect } from "react";
import AppBanner from "../components/appbanner/AppBanner";
import bg from "../images/prediction.jpg";
import question from "../images/question.png";
import title from "../images/demTITLE.png";
import title2 from "../images/repTITLE.png";
import title3 from "../images/indTITLE.png";
import calender from "../images/calender.png";
import check from "../images/check.png";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import DownloadApp from "../components/DownloadApp";
import logo from "../images/logo1.png";
import confetti from "../images/confetti.png";
import badge from "../images/Democraticlogo.png";
import badge2 from "../images/Republicanlogo.png";
import badge3 from "../images/Independentlogo.png";
import Predict from "../components/predict/Predict";
import logo1 from "../images/logo1.png";
import secureLocalStorage from "react-secure-storage";
import ReactGA from "react-ga4";
import CustomSpinner from "../components/spinner";

function PartyPrediction() {
  const navigate = useNavigate();
  useEffect(() => {
    ReactGA.send({
      hitType: "pageview",
      path: window.location.pathname,
    });
  }, []);
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [popPresident, setPopPresident] = useState();
  const [popvicePresident, setPopvicePresident] = useState();
  const [popUp, setPopUp] = useState(false);
  const [popUps, setPopUps] = useState(false);
  const [test, setTest] = useState(false);
  const [error, setError] = useState("");
  const [sliderBackground, setSliderBackground] = useState("transparent");
  const [partyData, setPartyData] = useState({
    votter_party_id: 1,
    president_id: 2,
    vice_president_id: 3,
  });
  const [predict, setPredict] = useState(0);
  const [disabled, setDisabled] = useState(true);
  const location = useLocation();
  const data = location.state || {};
  console.log("transferred data", data);
  const [candidateData, setCandidateData] = useState([]);
  const imageUrl = "https://thewhitehousegame.com/api/public/";
  // const id=secureLocalStorage.getItem('id');
  const token = secureLocalStorage.getItem("token");
  const id = secureLocalStorage.getItem("id");
  const newdata = {
    message: "President",
  };

  useEffect(() => {
    axios
      .get(
        `https://thewhitehousegame.com/api/public/api/get_predict_party_candidate/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      )
      .then((response) => {
        setCandidateData(response?.data);
      })
      .catch((error) => {});
    setTest(true);
    setDisabled(true);
  }, [test]);

  // console.log("my data is :", candidateData);
  // console.log('ayeeeee', data.voting[0].president_id)

  const handleButtonClick = (e) => {
    // setIsButtonClicked(true);
    setSliderBackground(
      "linear-gradient(90deg, #ED1C24 0%, #BE1E2E 50%, #1C2452 100%)"
    );
    setPredict(e);
    setDisabled(false);
    // console.log("selected party", partyData);
  };
  useEffect(() => {
    if (predict === 1) {
      // Assuming candidateData is available and chosen_candidate is an array
      setPartyData((prev) => ({
        ...prev,
        votter_party_id: 1,
        president_id: candidateData?.chosen_candidate?.[0]?.voter_candidate_id,
        vice_president_id:
          candidateData?.chosen_candidate?.[1]?.voter_candidate_id,
      }));
    } else if (predict === 2) {
      setPartyData((prev) => ({
        ...prev,
        votter_party_id: 2,
        president_id: candidateData?.chosen_candidate?.[2]?.voter_candidate_id,
        vice_president_id:
          candidateData?.chosen_candidate?.[3]?.voter_candidate_id,
      }));
    } else {
      setPartyData((prev) => ({
        ...prev,
        votter_party_id: 3,
        president_id: candidateData?.chosen_candidate?.[4]?.voter_candidate_id,
        vice_president_id:
          candidateData?.chosen_candidate?.[5]?.voter_candidate_id,
      }));
    }
  }, [predict, candidateData]);

  const sendPartyData = () => {
    setLoading(true)
    ReactGA.event({
      category: "Party Selection",
      action: `${
        partyData?.voter_party_id === 1
          ? "Democratic selected"
          : partyData.votter_party_id === 2
          ? "Republican selected"
          : "Independent Selected"
      }`,
    });
    axios
      .post(
        "https://thewhitehousegame.com/api/public/api/predict_party_leader",
        partyData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "content-type": "application/json",
          },
        }
      )
      .then((res) => {
        setPopUp(true);
        setLoading(false)
      })
      .catch((err) => {
        setError(err.response.data.error);
        setPopUps(true);
        setLoading(false)
      });
  };

  useEffect(() => {
    if (candidateData?.chosen_candidate?.length > 0) {
      const President = candidateData?.chosen_candidate.find(
        (item) => item.voter_candidate_id === partyData.president_id
      );
      const vicePresident = candidateData?.chosen_candidate.find(
        (item) => item.voter_candidate_id === partyData.vice_president_id
      );
      setPopPresident(President);
      setPopvicePresident(vicePresident);
    }
  }, [candidateData, partyData.president_id, partyData.vice_president_id]);
  // console.log("selected party", partyData);

  return (
    <div className="">
      {popUps && (
        <div className="w-full h-screen bg-black/60 fixed z-50 top-0 left-0 flex justify-center items-center">
          <div className="popup flex flex-col items-center justify-center  bg-[#1C2452] w-full max-w-md h-auto py-8 px-6 rounded-[30px] sm:w-5/12  relative">
            <div className="text-center mb-6">
              <img className="w-[80px] h-[80px]" src={logo1} alt="" />
            </div>
            <button
              onClick={() => setPopUps(false)}
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
              onClick={() => navigate("/payment", { state: { newdata } })}
              className="bg-redish w-full sm:w-[50%] block text-white poppins5 py-3 rounded-md text-center mb-4"
            >
              Pay Now
            </button>
            <p className="text-gray-400 text-center text-[9px] md:text-[9px] lg:text-[11px]">
              The payment is to stop fake and multiple voting and spam. <br />{" "}
              Payments received are used to maintain our website and apps.
            </p>
          </div>
        </div>
      )}

      {popUp && (
        <div className="w-full h-screen bg-black/60 fixed z-50 top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] bottom-0 flex justify-center items-center">
          <div className="popup bg-[#1C2452] w-10/12 lg:w-6/12 xl:w-5/12 h-[95vh]  xl:h-[95vh] 2xl:h-[40vh] rounded-[30px]    ">
            <div className="popup-content ">
              <img src={logo} className="m-auto w-[90px]" alt="" />
              <h1 className="poppins6 text-white text-center">
                Who you expect to win
              </h1>
              <div
                style={{ background: `url(${confetti})` }}
                className="p-4 w-20 mb-2 rounded-full m-auto flex justify-center items-center"
              >
                <div className="party-badge bg-white rounded-full w-10 h-10 flex items-center justify-center">
                  <img
                    className="w-5"
                    src={
                      popPresident.votter_party_id === 1
                        ? badge
                        : popPresident.votter_party_id === 2
                        ? badge2
                        : badge3
                    }
                    alt=""
                  />
                </div>
              </div>
              <div
                className="flex gap-5 w-fit m-auto xl:h-[20%]  items-center justify-center p-4 border-[2px] border-white rounded-[18.5px] md:mb-4 2xl:mb-10"
                style={{
                  background:
                    "linear-gradient(90deg, #ED1C24 0%, #BE1E2E 50%, #1C2452 100%)",
                }}
              >
                <div>
                  <h1 className="text-white poppins6 mb-2">President</h1>
                  <div className="w-[100px] md:w-[150px] md:h-[120px]  overflow-hidden rounded-[10.96px]">
                    {popPresident && popPresident.voter_candidate && (
                      <img
                        className="w-full object-cover"
                        src={`${imageUrl}${popPresident.voter_candidate.candidate_image}`}
                        alt=""
                      />
                    )}
                  </div>
                </div>
                <div>
                  <h1 className="text-white poppins6 mb-2">Vice President</h1>
                  <div className="w-[100px] md:w-[150px] md:h-[120px]  overflow-hidden rounded-[10.96px]">
                    {popvicePresident && popvicePresident.voter_candidate && (
                      <img
                        className="w-full object-cover"
                        src={`${imageUrl}${popvicePresident.voter_candidate.candidate_image}`}
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
              <p className="text-white text-center poppins4 text-[13px] w-1/2 m-auto mt-3 2xl:mt-5">
                If you change your mind and would like to update your Prediction{" "}
              </p>
              <button
                onClick={() => navigate("/predict")}
                className="bg-redish px-5 m-auto mt-3 block py-2 2xl:py-3 rounded-[6px] text-[14px] poppins6 text-white text-center mb-3"
              >
                Update your predictions
              </button>
              <button
                onClick={() => setPopUp(false)}
                className="rounded-[6px] border-[1px] px-20 block m-auto py-2 2xl:py-3 mt-5 border-white poppins7 text-white text-center"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      <AppBanner
        redTitle={"YOUR"}
        bg={bg}
        bannerTitle={"PREDICTION"}
        bannerDesc={
          <>
            Predict the next President of the United States <br /> and tell the
            world what you think!
          </>
        }
      />
      <div className="bg-[#1c2452] py-[100px]">
        <div className="resp m-auto w-10/12">
          <p className="poppins4 text-white text-center xl:w-[55%] xl:text-[30px] m-auto mt-5">
            Predict America’s next President and Vice President <br />
            Select who you predict will be the candidates on
          </p>
          <p className="poppins4 text-white/80 xl:text-[22px] text-center justify-center flex items-center gap-2 m-auto mt-5">
            <img src={calender} alt="" />
            Tuesday, November
            <span className="poppins5 text-white xl:text-[22px]">5, 2024</span>
          </p>
          <div className="main-dev flex flex-wrap items-center gap-3 justify-center mt-12">
            <div>
              <div className="flex items-center m-auto gap-3 bg-[rgba(252,222,222,0.2)] text-[10px] sm:text-[12px] md:text-[13px] xl:text-[22px] text-white w-fit px-2 py-1 rounded mb-5">
                <span className="">
                  <img className="w-10" src={badge} alt="" />
                </span>
                <h2>Democratic</h2>
              </div>
              <div>
                <div
                  style={{
                    background: `${predict === 1 ? sliderBackground : ""}`,
                  }}
                  className={`w-full rounded-lg   relative ${
                    predict === 1 && "border-8 "
                  }
            `}
                >
                  <div className="flex gap-4 items-center  w-full m-auto mt-[50px] pb-28 border-8 border-transparent px-2 rounded-lg">
                    <div className="w-[124px] h-[154px] md:w-[200px] md:h-[220px] m-auto">
                      <h4 className="poppins6 text-white  xl:text-[20px] mb-2">
                        President
                      </h4>
                      <div className="w-[124px] h-[154px] md:w-[200px] md:h-[220px] rounded-[28.43px]  overflow-hidden ">
                        <img
                          className="w-[200px] !h-[220px] object-cover"
                          src={`${imageUrl}${candidateData?.chosen_candidate?.[0]?.voter_candidate?.candidate_image}`}
                          alt=""
                        />
                      </div>
                    </div>
                    <div className="w-[124px] h-[154px] md:w-[200px] md:h-[220px] m-auto">
                      <h4 className="poppins6 text-white  xl:text-[20px] mb-2">
                        Vice President
                      </h4>
                      <div className="w-[124px] h-[154px] md:w-[200px] md:h-[220px] rounded-[28.43px]  overflow-hidden   ">
                        <img
                          className="w-[124px] h-[154px] md:w-[200px] md:!h-[220px] object-cover"
                          src={`${imageUrl}${candidateData?.chosen_candidate?.[1]?.voter_candidate?.candidate_image}`}
                          alt=""
                        />
                      </div>
                    </div>
                  </div>

                  {predict === 1 && (
                    <img
                      className="w-12 h-12 absolute left-[49%] transform -translate-x-2 -bottom-5 border-[5px] rounded-full border-[#1c2452]"
                      src={check}
                      alt=""
                    />
                  )}
                </div>
                <div className="flex justify-center relative  mt-7">
                  <button
                    onClick={() => handleButtonClick(1)}
                    className={`rounded-lg px-5 py-3 bg-blue-500 h-[40px] sm:w-[300px] sm:h-[50px] flex items-center justify-center gap-1 text-white font-poppins ml-3 `}
                  >
                    <img src={check} className="w-4" alt="" /> Select
                  </button>
                </div>
              </div>
            </div>
            <div className="">
              <div className="flex items-center m-auto gap-3 bg-[rgba(252,222,222,0.2)] text-[10px] sm:text-[12px] md:text-[13px] xl:text-[22px] text-white w-fit px-2 py-1 rounded mb-5">
                <span className="">
                  <img className="w-10" src={badge2} alt="" />
                </span>
                <h2>Republican</h2>
              </div>
              <div className="">
                <div
                  style={{
                    background: `${predict === 2 ? sliderBackground : ""}`,
                  }}
                  className={`w-full rounded-lg    relative ${
                    predict === 2 && "border-8 px-2"
                  }`}
                >
                  <div className="flex gap-4 items-center justify-start w-full m-auto mt-[50px] pb-28 border-8 border-transparent px-2 rounded-lg">
                    <div className="w-[124px] h-[154px] md:w-[200px] md:h-[220px] m-auto">
                      <h4 className="poppins6 text-white  xl:text-[20px] mb-2">
                        President
                      </h4>
                      <div className="w-[124px] h-[154px] md:w-[200px] md:h-[220px] rounded-[28.43px]  overflow-hidden ">
                        <img
                          className="w-[124px] h-[154px] md:w-[200px] md:!h-[220px] object-cover"
                          src={`${imageUrl}${candidateData?.chosen_candidate?.[2]?.voter_candidate?.candidate_image}`}
                          alt=""
                        />
                      </div>
                    </div>
                    <div className="w-[124px] h-[154px] md:w-[200px] md:h-[220px] m-auto">
                      <h4 className="poppins6 text-white  xl:text-[20px] mb-2">
                        Vice President
                      </h4>
                      <div className="w-[124px] h-[154px] md:w-[200px] md:h-[220px] rounded-[28.43px]  overflow-hidden ">
                        <img
                          className="w-[124px] h-[154px] md:w-[200px] md:!h-[220px] object-cover"
                          src={`${imageUrl}${candidateData?.chosen_candidate?.[3]?.voter_candidate?.candidate_image}`}
                          alt=""
                        />
                      </div>
                    </div>
                  </div>

                  {predict === 2 && (
                    <img
                      className="w-12 h-12 absolute left-[49%] transform -translate-x-2 -bottom-5 border-[5px] rounded-full border-[#1c2452]"
                      src={check}
                      alt=""
                    />
                  )}
                </div>
                <div className="flex justify-center relative  mt-7">
                  <button
                    onClick={() => handleButtonClick(2)}
                    className={`rounded-lg px-5 py-3 bg-red-500 h-[40px] sm:w-[300px] sm:h-[50px] flex items-center justify-center gap-1 text-white font-poppins ml-3 `}
                  >
                    <img src={check} className="w-4" alt="" /> Select
                  </button>
                </div>
              </div>
            </div>

            <div className="">
              <div className="flex items-center m-auto gap-3 bg-[rgba(252,222,222,0.2)] text-[10px] sm:text-[12px] md:text-[13px] xl:text-[22px] text-white w-fit px-2 py-1 rounded mb-5">
                <span className="">
                  <img className="w-10" src={badge3} alt="" />
                </span>
                <h2>Independent</h2>
              </div>
              <div className="">
                <div
                  style={{
                    background: `${predict === 3 ? sliderBackground : ""}`,
                  }}
                  className={`w-full rounded-lg  relative ${
                    predict === 3 && "border-8 px-2"
                  }`}
                >
                  <div className="flex gap-4 items-center justify-start w-full m-auto mt-[50px] pb-28 border-8 border-transparent px-2 rounded-lg">
                    <div className="w-[124px] h-[154px] md:w-[200px] md:h-[220px] m-auto">
                      <h4 className="poppins6 text-white  xl:text-[20px] mb-2">
                        President
                      </h4>
                      <div className="w-[124px] h-[154px] md:w-[200px] md:h-[220px] rounded-[28.43px]  overflow-hidden ">
                        <img
                          className="w-[124px] h-[154px] md:w-[200px] md:!h-[220px] object-cover"
                          src={`${imageUrl}${candidateData?.chosen_candidate?.[4]?.voter_candidate?.candidate_image}`}
                          alt=""
                        />
                      </div>
                    </div>
                    <div className="w-[124px] h-[154px] md:w-[200px] md:h-[220px] m-auto">
                      <h4 className="poppins6 text-white  xl:text-[20px] mb-2">
                        Vice President
                      </h4>
                      <div className="w-[124px] h-[154px] md:w-[200px] md:h-[220px] rounded-[28.43px]  overflow-hidden ">
                        <img
                          className="w-[124px] h-[154px] md:w-[200px] md:!h-[220px] object-cover"
                          src={`${imageUrl}${candidateData?.chosen_candidate?.[5]?.voter_candidate?.candidate_image}`}
                          alt=""
                        />
                      </div>
                    </div>
                  </div>

                  {predict === 3 && (
                    <img
                      className="w-12 h-12 absolute left-[49%] transform -translate-x-2 -bottom-5 border-[5px] border-[#1c2452] rounded-full"
                      src={check}
                      alt=""
                    />
                  )}
                </div>
                <div className="flex justify-center relative  mt-7">
                  <button
                    onClick={() => handleButtonClick(3)}
                    className={`rounded-lg px-5 py-3 bg-white text-black h-[40px] sm:w-[300px] sm:h-[50px] flex items-center justify-center gap-1 font-poppins ml-3 `}
                  >
                    <img src={check} className="w-4" alt="" /> Select
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center relative gap-8 mt-8 mb-3">
        {loading?<CustomSpinner/>:
         <button
          onClick={sendPartyData}
          disabled={disabled}
          className={`rounded-lg px-5 py-3 border-[1px] border-white h-[40px] sm:w-[300px] sm:h-[50px] flex items-center justify-center gap-1 text-white font-poppins ml-3 ${
            disabled ? "opacity-40" : ""
          }`}
        >
          Submit
        </button>
        }
       
        {/* <button
          onClick={() => navigate("/electoral")}
          className={`rounded-lg px-5 py-3 bg-red-500 h-[40px] sm:w-[300px] sm:h-[50px] flex items-center justify-center gap-1 text-white font-poppins ml-3 `}
        >
          Complete electoral college
        </button> */}
      </div>

      <DownloadApp />
    </div>
  );
}

export default PartyPrediction;
