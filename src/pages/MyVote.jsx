import React, { useEffect, useState } from "react";
import AppBanner from "../components/appbanner/AppBanner";
import logo from "../images/logo1.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import bg from "../images/images.jpg";
import DownloadApp from "../components/DownloadApp";
import republic from "../images/democrat.png";
import democrat from "../images/republican.png";
import independ from "../images/independent.png";
import check from "../images/check.png";
import calender from "../images/calender.png";
import StateWinner from "../components/statewinner/StateWinner";
import Map from "../components/Map";
import Democraticlogo from "../images/Democraticlogo.png";
import Independentlogo from "../images/Independentlogo.png";
import Republicanlogo from "../images/Republicanlogo.png";
import secureLocalStorage from "react-secure-storage";
import ReactGA from "react-ga4";
import { Helmet } from "react-helmet";
import CustomSpinner from "../components/spinner";

export default function MyVote() {
  useEffect(() => {
    ReactGA.send({
      hitType: "pageview",
      path: window.location.pathname,
    });
  }, []);
  const [userVote, setUserVote] = useState([]);
  const [selected, setSelected] = useState([]);
  const [president, setPresident] = useState([]);
  const [vicePresident, setVicePresident] = useState([]);
  const [finalData, setFinalData] = useState({});
  const [lastElection, setLastElection] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const token = secureLocalStorage.getItem("token");

  const imageUrl = "https://app.thewhitehousegame.com/";

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://app.thewhitehousegame.com/api/userVotings", {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      })
      .then((response) => {
        const data = response.data;
        setUserVote(data);
        setLoading(false);

        const predictedCandidateNames = data?.PredictedCandidateDetails?.map(
          (candidate) => candidate.candidate_name
        );
        const filteredCandidates = data?.SelectedCandidates?.filter(
          (e) => !predictedCandidateNames.includes(e.candidate_name)
        );
        setSelected(filteredCandidates);
        setPresident(
          filteredCandidates?.filter((e) => e.position === "president")
        );
        setVicePresident(
          filteredCandidates?.filter((e) => e.position === "vice_president")
        );
      })
      .catch((err) => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    axios
      .get(
        "https://app.thewhitehousegame.com/api/getFinalizeCandidateElectroral",

        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      )
      .then((res) => {
        setFinalData(res.data);

        setLastElection(res.data.previousElection2020.original.data);
      })
      .catch((e) => console.log("elecotral error is", e));
  }, []);
  // const getStatesDetails=()=>{
  //   const stateName=Object.keys
  // }
  const sortedElections = Object.entries(lastElection)?.sort((a, b) =>
    a[0].localeCompare(b[0])
  );

  // console.log(finalData)
  const newdata = finalData?.data ? Object.entries(finalData?.data) : null;
  const elecotral = finalData?.electoral_votes_by_party
    ? Object.entries(finalData?.electoral_votes_by_party)
    : null;
  const filtered = newdata !== null && newdata.pop();
  if (newdata) {
    newdata.sort((a, b) => {
      if (a[0] < b[0]) {
        return -1;
      }
      if (a[0] > b[0]) {
        return 1;
      }
      return 0;
    });
  }
  // console.log("filter", sortedElections);
  return (
    <div>
      <Helmet>
        <title>The White House Game | My Vote Next President</title>
        <meta
          name="keywords"
          content="2024 Presidential election, prediction, next president."
        />
        <meta
          name="description"
          content="American voters elect an Electoral College which chooses the President. The White House Game lets you predict who the party candidates will be and who you think will win."
        />
        <meta lang="en" />
      </Helmet>
      <AppBanner
        bannerTitle={"Vote"}
        redTitle={"My"}
        bannerDesc={
          <>
            America votes
            <br />
            <span className="flex justify-center items-center mb-12">
              <img src={calender} alt="" />
              Tuesday, November 5 2024
            </span>
            <br />{" "}
            <span className="flex justify-center items-center">
              This is my prediction
            </span>
          </>
        }
        // bannerDesc2={
        //   <p>
        //     This is{" "}
        //     <span className="text-redish !orbit6 uppercase mt-10">
        //       My Prediction
        //     </span>
        //   </p>
        // }
        bg={bg}
      />
      <div className="w-full pt-[30px] bg-[#1c2452]">
        <div className="resp m-auto w-10/12">
          <div className="flex flex-col md:flex-row justify-center w-[90%] md:w-[55%] m-auto">
            <img className="m-auto" src={logo} alt="" />

            <p className="poppins4 text-white/90  xl:text-[24px] mt-6 text-center  m-auto">
              This is <span className="text-redish">my Prediction</span> who the
              candidates will be and who will be our next President and Vice
              President
            </p>
          </div>
          <div className="flex flex-wrap justify-evenly gap-4">
            {loading ? (
              <CustomSpinner />
            ) : (
              <>
                {userVote?.SelectedCandidates?.length === 0 ||
                userVote?.SelectedCandidates === undefined ? (
                  <div className="text-center w-full mt-5">
                    <h2 className="text-xl poppins6 text-white">
                      You have not made any predictions yet !
                    </h2>
                  </div>
                ) : (
                  <>
                    <div
                      className={` rounded-lg  pb-24 pt-9 mt-5 px-2 relative ${
                        userVote?.PredictedCandidateDetails?.[0]?.party_name ===
                        "Republican"
                          ? "bg-redish order-2"
                          : userVote?.PredictedCandidateDetails?.[0]
                              ?.party_name === "Democratic"
                          ? "bg-[#546BED] order-1"
                          : "bg-white order-3"
                      }`}
                    >
                      <div className="mx-3 mb-3 px-3 py-2 rounded flex items-center gap-4 bg-[rgba(252,222,222,0.2)] w-fit">
                        <img
                          className="w-[20px] h-[20px] sm:w-auto"
                          src={
                            userVote?.PredictedCandidateDetails?.[0]
                              ?.party_name === "Republican"
                              ? republic
                              : userVote?.PredictedCandidateDetails?.[0]
                                  ?.party_name === "Democratic"
                              ? democrat
                              : independ
                          }
                          alt=""
                        />
                        <h2 className="text-[10px] sm:text-[12px] md:text-[13px] xl:text-[22px]">
                          {
                            userVote?.PredictedCandidateDetails?.[0]?.party_name.split(
                              "("
                            )[0]
                          }
                        </h2>
                      </div>
                      <div className="flex gap-4 items-center justify-start w-[269px] md:w-full m-auto ">
                        <div className="w-[128px] h-[164px] md:w-[200px] md:h-[220px] m-auto relative">
                          <h4 className="poppins6  xl:text-[20px] mb-2">
                            President
                          </h4>
                          <div className="w-[124px] h-[154px] md:w-[200px] md:!h-[220px] rounded-[28.43px]  overflow-hidden   ">
                            <img
                              className="w-[124px] h-[154px] md:w-[200px] md:!h-[220px] object-cover"
                              src={`${imageUrl}${userVote?.PredictedCandidateDetails?.[0]?.candidate_image}`}
                              alt=""
                            />
                          </div>
                          <h2
                            className={`poppins6  text-center text-[10px]  absolute -bottom-4 md:ml-4 ${
                              userVote?.PredictedCandidateDetails?.[0]
                                ?.party_name === "Democratic"
                                ? "bg-[#1c2452] text-white"
                                : userVote?.PredictedCandidateDetails?.[0]
                                    ?.party_name === "Republican"
                                ? "bg-redish text-white"
                                : "bg-white text-black"
                            } px-1  md:px-4 md:py-1 z-50`}
                          >
                            {
                              userVote?.PredictedCandidateDetails?.[0]
                                ?.candidate_name
                            }
                          </h2>
                        </div>
                        <div className="w-[200px] h-[166px] md:w-[200px] md:h-[220px] m-auto relative">
                          <h4 className="poppins6  xl:text-[20px] mb-2">
                            Vice President
                          </h4>
                          <div className="w-[124px] h-[154px] md:w-[200px] md:!h-[220px] rounded-[28.43px]   overflow-hidden   ">
                            <img
                              className="w-[124px] h-[154px] md:w-[200px] md:!h-[220px] object-cover"
                              src={`${imageUrl}${userVote?.PredictedCandidateDetails?.[1]?.candidate_image}`}
                              alt=""
                            />
                          </div>
                          <h2
                            className={`poppins6  text-center text-[10px]  absolute -bottom-4 md:ml-4 ${
                              userVote?.PredictedCandidateDetails?.[1]
                                ?.party_name === "Democratic"
                                ? "bg-[#1c2452] text-white"
                                : userVote?.PredictedCandidateDetails?.[1]
                                    ?.party_name === "Republican"
                                ? " bg-redish text-white"
                                : "bg-white text-black"
                            } px-1  md:px-4 md:py-1 z-50`}
                          >
                            {
                              userVote?.PredictedCandidateDetails?.[1]
                                ?.candidate_name
                            }
                          </h2>
                        </div>
                      </div>
                      <div className="absolute bottom-3 left-32 md:bottom-3 md:left-48">
                        <img
                          className="w-[40px] h-[40px] m-auto"
                          src={check}
                          alt=""
                        />
                      </div>
                    </div>

                    {/* other parties */}

                    <div
                      className={` rounded-lg px-2 pb-24 pt-9 mt-5  relative opacity-50 ${
                        selected?.[0]?.party_name === "Republican"
                          ? "bg-redish order-2"
                          : selected?.[0]?.party_name === "Democratic"
                          ? "bg-[#546BED] order-1"
                          : "bg-white order-3"
                      }`}
                    >
                      <div className="mx-3 mb-3 px-3 py-2 rounded flex items-center gap-4 bg-[rgba(252,222,222,0.2)] w-fit">
                        <img
                          className="w-[20px] h-[20px] sm:w-auto"
                          src={
                            selected?.[0]?.party_name === "Republican"
                              ? republic
                              : selected?.[0]?.party_name === "Democratic"
                              ? democrat
                              : independ
                          }
                          alt=""
                        />
                        <h2 className="text-[10px] sm:text-[12px] md:text-[13px] xl:text-[22px]">
                          {selected?.[0]?.party_name.split("(")[0]}
                        </h2>
                      </div>
                      <div className="flex gap-4 items-center justify-start w-[269px] md:w-full m-auto ">
                        <div className="w-[128px] h-[164px] md:w-[200px] md:h-[220px] m-auto relative">
                          <h4 className="poppins6  xl:text-[20px] mb-2">
                            President
                          </h4>
                          <div className="w-[128px] h-[164px] md:w-[200px] md:h-[220px] rounded-[28.43px] object-cover  overflow-hidden   ">
                            <img
                              className="w-[124px] h-[154px] md:w-[200px] md:!h-[220px] object-cover"
                              src={`${imageUrl}${selected?.[0]?.candidate_image}`}
                              alt=""
                            />
                          </div>
                          <h2
                            className={`poppins6  text-center text-[10px]  absolute -bottom-4 md:ml-4 ${
                              selected?.[0]?.party_name === "Democratic"
                                ? "bg-[#1c2452] text-white"
                                : selected?.[0]?.party_name === "Republican"
                                ? "bg-redish text-white"
                                : "bg-white text-black"
                            } px-1  md:px-4 md:py-1 z-50`}
                          >
                            {selected?.[0]?.candidate_name}
                          </h2>
                        </div>
                        <div className="w-[124px] h-[154px] md:w-[200px] md:!h-[220px] m-auto relative">
                          <h4 className="poppins6  xl:text-[20px] mb-2">
                            Vice President
                          </h4>
                          <div className="w-[124px] h-[154px] md:w-[200px] md:!h-[220px] rounded-[28.43px]  overflow-hidden   ">
                            <img
                              className="w-[124px] h-[154px] md:w-[200px] md:!h-[220px] object-cover"
                              src={`${imageUrl}${selected?.[1]?.candidate_image}`}
                              alt=""
                            />
                          </div>
                          <h2
                            className={`poppins6  text-center text-[10px]  absolute -bottom-4 md:ml-4 ${
                              selected?.[1]?.party_name === "Democratic"
                                ? " bg-[#1c2452] text-white"
                                : selected?.[1]?.party_name === "Republican"
                                ? "bg-redish text-white"
                                : "bg-white text-black"
                            } px-1  md:px-4 md:py-1 z-50`}
                          >
                            {selected?.[1]?.candidate_name}
                          </h2>
                        </div>
                      </div>
                    </div>
                    <div
                      className={`px-2 rounded-lg  pb-24 pt-9 mt-5  relative opacity-50 ${
                        selected?.[2]?.party_name === "Republican"
                          ? "bg-redish order-2"
                          : selected?.[2]?.party_name === "Democratic"
                          ? "bg-[#546BED] order-1"
                          : "bg-white order-3"
                      }`}

                      // style={{
                      //   background:
                      //     "linear-gradient(90deg, #ED1C24 0%, #BE1E2E 50%, #1C2452 100%)",
                      // }}
                    >
                      <div className="mx-3 mb-3 px-3 py-2 rounded flex items-center gap-4 bg-[rgba(252,222,222,0.2)] w-fit">
                        <img
                          className="w-[20px] h-[20px] sm:w-auto"
                          src={
                            selected?.[2]?.party_name === "Republican"
                              ? republic
                              : selected?.[2]?.party_name === "Democratic"
                              ? democrat
                              : independ
                          }
                          alt=""
                        />
                        <h2 className="text-[10px] sm:text-[12px] md:text-[13px] xl:text-[22px]">
                          {selected?.[2]?.party_name.split("(")[0]}
                        </h2>
                      </div>
                      <div className="flex gap-4 items-center justify-start w-[269px] md:w-full m-auto ">
                        <div className="w-[128px] h-[164px] md:w-[200px] md:h-[220px] m-auto relative">
                          <h4 className="poppins6  xl:text-[20px] mb-2">
                            President
                          </h4>
                          <div className="w-[128px] h-[164px] md:w-[200px] md:h-[220px] rounded-[28.43px]   overflow-hidden   ">
                            <img
                              className="w-[124px] h-[154px] md:w-[200px] md:!h-[220px] object-cover"
                              src={`${imageUrl}${selected?.[2]?.candidate_image}`}
                              alt=""
                            />
                          </div>
                          <h2
                            className={`poppins6  text-center text-[10px]  absolute -bottom-4 md:ml-4 ${
                              selected?.[2]?.party_name === "Democratic"
                                ? "bg-[#1c2452]  text-white"
                                : selected?.[2]?.party_name === "Republican"
                                ? " bg-redish text-white"
                                : "bg-white text-black"
                            } px-1  md:px-4 md:py-1 z-50`}
                          >
                            {selected?.[2]?.candidate_name}
                          </h2>
                        </div>
                        <div className="w-[124px] h-[154px] md:w-[200px] md:!h-[220px] m-auto relative">
                          <h4 className="poppins6  xl:text-[20px] mb-2">
                            Vice President
                          </h4>
                          <div className="w-[124px] h-[154px] md:w-[200px] md:!h-[220px] rounded-[28.43px]  overflow-hidden   ">
                            <img
                              className="w-[124px] h-[154px] md:w-[200px] md:!h-[220px] object-cover"
                              src={`${imageUrl}${selected?.[3]?.candidate_image}`}
                              alt=""
                            />
                          </div>
                          <h2
                            className={`poppins6  text-center text-[10px]  absolute -bottom-4 md:ml-4 ${
                              selected?.[3]?.party_name === "Democratic"
                                ? " bg-[#1c2452] text-white"
                                : selected?.[3]?.party_name === "Republican"
                                ? "bg-redish text-white"
                                : "bg-white text-black"
                            } px-1  md:px-4 md:py-1 z-50`}
                          >
                            {selected?.[3]?.candidate_name}
                          </h2>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </>
            )}
          </div>

          <div className="text-center flex justify-center items-center gap-5">
            <button
              className="bg-[#ED1C24] py-[12px] px-[30px] text-white rounded-[8px] text-[9px] md:text-[16px] my-8"
              onClick={() => navigate("/predict")}
            >
              Update my prediction
            </button>
            <button
              className="bg-[#ED1C24] py-[12px] px-[30px] text-white rounded-[8px] text-[9px] md:text-[16px] my-8"
              onClick={() => navigate("/predictandelectoral")}
            >
              Predict the Electoral College
            </button>
          </div>
        </div>
      </div>
      {/* section */}

      <div
        className="w-full py-8"
        style={
          newdata?.length > 0
            ? {
                background:
                  "linear-gradient(90.68deg, rgba(28, 36, 82, 0.3) -24.33%, rgba(190, 30, 46, 0.3) 93.83%, rgba(237, 28, 36, 0.3) 124.99%)",
              }
            : {}
        }
      >
        {elecotral?.length > 0 && (
          <div className="m-auto w-10/12">
            <h2 className="text-white  poppins6 text-[25.4px] md:text-[36.4px]">
              My Electoral College Prediction
            </h2>

            <div className="flex justify-between flex-wrap">
              <div className="flex gap-5 items-center mb-4 flex-wrap">
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
                  width: `${"33%"}`,
                }}
              >
                <span className="poppins4 flex justify-center items-center">
                  {Object.entries(finalData.electoral_votes_by_party).find(
                    ([party_name]) => party_name === "Democratic"
                  )
                    ? Object.entries(finalData?.electoral_votes_by_party).find(
                        ([party_name]) => party_name === "Democratic"
                      )[1]
                    : 0}
                </span>
              </div>

              <div
                className="py-4 bg-redish text-white"
                style={{
                  width: `${"33%"}`,
                }}
              >
                <span className="poppins4 flex justify-center items-center">
                  {Object.entries(finalData.electoral_votes_by_party).find(
                    ([party_name]) => party_name === "Republican"
                  )
                    ? Object.entries(finalData?.electoral_votes_by_party).find(
                        ([party_name]) => party_name === "Republican"
                      )[1]
                    : 0}
                </span>
              </div>
              <div
                className="py-4 bg-white"
                style={{
                  width: `${"33%"}`,
                }}
              >
                <span className="poppins4 flex justify-center items-center">
                  {Object.entries(finalData.electoral_votes_by_party).find(
                    ([party_name]) => party_name === "Independent('Kennedy')"
                  )
                    ? Object.entries(finalData.electoral_votes_by_party).find(
                        ([party_name]) =>
                          party_name === "Independent('Kennedy')"
                      )[1]
                    : 0}
                </span>
              </div>
            </div>
          </div>
        )}

        {newdata?.length > 0 && (
          <>
            <div className="w-10/12 m-auto mt-12">
              <Map />
            </div>

            <div className="w-10/12 m-auto mt-8">
              <h1 className="text-white text-center orbit7 text-[35px]">
                State Winners
              </h1>
              <p className="text-white text-center orbit7 text-[18px]">
                Who i am predicting
              </p>
              <div
                style={{
                  scrollbarWidth: "thin",
                  scrollbarColor: "#FFFFFF #272f5b",
                }}
                className="flex flex-col mt-4 px-5  bg-[#272f5b] overflow-y-scroll h-[20rem] lg:h-[45rem] rounded-[10px]"
              >
                <div className="flex items-center w-fit md:w-auto justify-between  border-b-[3px] py-3">
                  <div className="firs-col">
                    <h1 className="px-6 orbit7 py-3 lg:py-10 text-[9px] lg:text-[25px] text-white">
                      2020
                    </h1>
                  </div>
                  <div className="firs-col">
                    <h1 className="px-6 orbit7 py-3 lg:py-10 text-[9px] lg:ml-[100px] lg:text-[25px] text-white">
                      States
                    </h1>
                  </div>
                  <div className="firs-col">
                    <h1 className="px-6 orbit7 py-3 lg:py-10 text-[9px] lg:text-[25px] text-white whitespace-nowrap">
                      2024 My Predictions
                    </h1>
                  </div>
                </div>

                {newdata?.map(([state, data]) => (
                  <div
                    className=" w-fit md:w-auto flex gap-[20px] md:justify-between border-b-[1px] py-4 px-8"
                    key={state}
                  >
                    <div className="winner flex items-center gap-3">
                      {lastElection &&
                        sortedElections?.map(([title, badge], index) => (
                          <React.Fragment key={index}>
                            {title === state && (
                              <span className="bg-white rounded-full p-1 w-[30px] h-[30px] md:w-[45px] md:h-[45px] flex justify-center items-center">
                                <img
                                  className="w-4 h-4 lg:w-8 lg:h-8"
                                  src={
                                    badge.winning_party === "Democratic"
                                      ? Democraticlogo
                                      : badge.winning_party === "Republican"
                                      ? Republicanlogo
                                      : Independentlogo
                                  }
                                  alt={badge.winning_party}
                                />
                              </span>
                            )}
                          </React.Fragment>
                        ))}

                      <p className="text-white font-poppins font-medium text-[9px] lg:text-[19px]">
                        {lastElection &&
                          sortedElections?.map(([title, party]) => (
                            <div className="flex items-center gap-3">
                              {state === title ? party.winning_party : null}
                            </div>
                          ))}
                      </p>
                    </div>
                    <div className="state flex items-center gap-3 ">
                      <img
                        className="w-14 text-center"
                        src={`${imageUrl}${data.map_url}`}
                        alt=""
                      />
                      <p className="font-medium font-poppins text-[9px] lg:text-[27px] text-white  py-3">
                        {state}
                      </p>
                    </div>
                    <div className="prediction flex gap-3 items-center">
                      <p className="text-white font-poppins font-medium text-[9px] lg:text-[19px]">
                        {data.winning_party.split("(")[0]}
                      </p>
                      <span className="bg-white rounded-full p-2 w-[30px] h-[30px] md:w-[45px] md:h-[45px] flex justify-center items-center">
                        <img
                          className="object-cover w-4 h-4 lg:w-7 lg:h-7"
                          src={
                            data.winning_party === "Democratic"
                              ? Democraticlogo
                              : data.winning_party === "Republican"
                              ? Republicanlogo
                              : Independentlogo
                          }
                          alt="Democratic"
                        />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      <DownloadApp />
    </div>
  );
}
