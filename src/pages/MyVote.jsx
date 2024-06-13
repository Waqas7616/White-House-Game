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

export default function MyVote() {
  const [userVote, setUserVote] = useState([]);
  const [selected, setSelected] = useState([]);
  const [president, setPresident] = useState([]);
  const [vicePresident, setVicePresident] = useState([]);
  const [finalData, setFinalData] = useState({});
  const [lastElection, setLastElection] = useState({});
  const navigate = useNavigate();
  console.log("users voting", userVote);
  const token = localStorage.getItem("token");
  // console.log(token)
  const imageUrl = "https://thewhitehousegame.com/api/public/";

  useEffect(() => {
    axios
      .get("https://thewhitehousegame.com/api/public/api/userVotings", {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      })
      .then((response) => {
        const data = response.data;
        setUserVote(data);

        const predictedCandidateNames = data?.PredictedCandidateDetails?.map(
          (candidate) => candidate.candidate_name
        );
        console.log("shdjhsajhjs", predictedCandidateNames);
        const filteredCandidates = data?.SelectedCandidates?.filter(
          (e) => !predictedCandidateNames.includes(e.candidate_name)
        );
        console.log("sssssssssssssss", filteredCandidates);
        setSelected(filteredCandidates);
        setPresident(
          filteredCandidates?.filter((e) => e.position === "president")
        );
        setVicePresident(
          filteredCandidates?.filter((e) => e.position === "vice_president")
        );
      })
      .catch((err) => {});
  }, []);
  useEffect(() => {
    axios
      .get(
        "https://thewhitehousegame.com/api/public/api/getFinalizeCandidateElectroral",

        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      )
      .then((res) => {
        setFinalData(res.data);
        console.log(
          "finalize dat: ",
          res.data.previousElection2020.original.data
        );
        setLastElection(res.data.previousElection2020.original.data);
      })
      .catch((e) => console.log("elecotral error is", e));
  }, []);
  console.log("barwa waqas da dir:", selected);
  console.log("my ele", finalData);
  console.log("my ele22222", Object.entries(finalData));
  // const getStatesDetails=()=>{
  //   const stateName=Object.keys
  // }
  const sortedElections = Object.entries(lastElection).sort((a, b) =>
    a[0].localeCompare(b[0])
  );
  console.log("check444", sortedElections);
  const noData = !userVote?.PredictedCandidateDetails || !selected;
  return (
    <div>
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
          </>
        }
        bannerDesc2={
          <p>
            This is{" "}
            <span className="text-redish !orbit6 uppercase mt-10">
              My Prediction
            </span>
          </p>
        }
        bg={bg}
      />
      <div className="w-full pt-[30px] bg-[#1c2452]">
        <div className="resp m-auto w-10/12">
          <div className="flex flex-col md:flex-row justify-center w-[90%] md:w-[55%] m-auto">
            <img className="m-auto" src={logo} alt="" />

            <p className="poppins4 text-white/90  xl:text-[24px] mt-6 text-center  m-auto">
              This is <span className="text-redish">My Prediction</span> who the
              candidates will be and who will be our next President and Vice
              President
            </p>
          </div>
          <div className="flex flex-wrap justify-evenly gap-4">
            {noData ? (
              <div className="text-center w-full mt-5">
                <h2 className="text-xl font-bold">No data available</h2>
              </div>
            ) : (
              <>
                <div
                  // style={{
                  //   background:
                  //     "linear-gradient(90deg, #ED1C24 0%, #BE1E2E 50%, #1C2452 100%)",
                  // }}
                  className={` rounded-lg  pb-24 pt-9 mt-5 px-2 relative ${
                    userVote?.PredictedCandidateDetails?.[0]?.party_name ===
                    "Republican"
                      ? "bg-redish"
                      : userVote?.PredictedCandidateDetails?.[0]?.party_name ===
                        "Democratic"
                      ? "bg-[#546BED]"
                      : "bg-white"
                  }`}
                >
                  <div className="mx-3 mb-3 px-3 py-2 rounded flex items-center gap-4 bg-[rgba(252,222,222,0.2)] w-fit">
                    <img
                      className="w-[20px] h-[20px] sm:w-auto"
                      src={
                        userVote?.PredictedCandidateDetails?.[0]?.party_name ===
                        "Republican"
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
                      {/* w-[120px] h-[130px]  sm:w-[260px] sm:h-[270px] md:w-[300px] md:h-[310px] lg:w-[350px] lg:h-[360px] lg-a:w-[450px] lg-a:h-[460px] xl:w-[500px] xl:h-[510px] xl-a:w-[567.38px] xl-a:h-[572.84px] */}
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
                  <div className="absolute bottom-3 left-32 md:bottom-3 md:left-52">
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
                      ? "bg-redish"
                      : selected?.[0]?.party_name === "Democratic"
                      ? "bg-[#546BED]"
                      : "bg-white"
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
                      ? "bg-redish"
                      : selected?.[2]?.party_name === "Democratic"
                      ? "bg-[#546BED]"
                      : "bg-white"
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
              onClick={() => navigate("/electoral")}
            >
              Predict the Electoral College
            </button>
          </div>
        </div>
      </div>
      {/* section */}

      <div
        className="w-full py-8"
        style={{
          background:
            "linear-gradient(90.68deg, rgba(28, 36, 82, 0.3) -24.33%, rgba(190, 30, 46, 0.3) 93.83%, rgba(237, 28, 36, 0.3) 124.99%)",
        }}
      >
        {/* <div className="flex justify-center my-8 ">
          <h2 className="text-[#fff] text-[14px] md:text-[36px] orbit7 w-9/12 m-auto  text-center">
            270 to Win
          </h2>
        </div>
        <div className="flex justify-center my-8 ">
          <h2 className="text-[#fff] text-[9px] md:text-[14px] orbit7 w-9/12 m-auto  text-center">
            What our game players Predict{" "}
          </h2>
        </div>

        <div className="flex w-9/12 m-auto my-8 mb-[83px] flex-col items-center">
          <div className="flex w-full justify-around items-center mb-4">
            <span className="poppins6 text-white ">Democratic</span>
            <span className="poppins6 text-white ">Republican</span>
            <span className="poppins6 text-white ">Independent</span>
          </div>

          <div className="flex w-full">
            <div
              className="py-4 bg-[#031BBB]"
              style={{ width: democraticBarLength }}
            >
              <span className="poppins4 flex justify-center items-center">
                {statesData && statesData.Democratic
                  ? `${statesData.Democratic}`
                  : "0"}
              </span>
            </div>

            <div
              className="py-4 bg-redish"
              style={{ width: republicanBarLength }}
            >
              <span className="poppins4 flex justify-center items-center">
                {statesData && statesData.Republican
                  ? `${statesData.Republican}`
                  : "0"}
              </span>
            </div>

            <div
              className="py-4 bg-white"
              style={{ width: independentBarLength }}
            >
              <span className="poppins4 flex justify-center items-center">
                {statesData && statesData["Independent('Kennedy')"]
                  ? `${statesData["Independent('Kennedy')"]}`
                  : "0"}
              </span>
            </div>
          </div>
        </div> */}
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
          {/* <p>{Object.entries(finalData.electoral_votes_by_party).map(([index,data])=>(
          <p>{data.Democratic}</p>
        ))}</p> */}
          <div className="flex p-2 bg-[#131A41] rounded-[10.65px] mb-3 w-full">
            <div
              className="py-4 bg-[#031BBB]"
              style={{
                width: `${"33%"}`,
              }}
            >
              <span className="poppins4 flex justify-center items-center">
                {/* {statesData && statesData.Democratic
                ? `${statesData.Democratic}`
                : "0"} */}
                {finalData.electoral_votes_by_party &&
                  Object.entries(finalData.electoral_votes_by_party).find(
                    ([party_name]) => party_name === "Democratic"
                  )[1]}
              </span>
            </div>

            <div
              className="py-4 bg-redish"
              style={{
                width: `${"33%"}`,
              }}
            >
              <span className="poppins4 flex justify-center items-center">
                {/* {statesData && statesData.Republican
                ? `${statesData.Republican}`
                : "0"} */}
                {finalData.electoral_votes_by_party &&
                  Object.entries(finalData.electoral_votes_by_party).find(
                    ([party_name]) => party_name === "Republican"
                  )[1]}
              </span>
            </div>
            <div
              className="py-4 bg-white"
              style={{
                width: `${"33%"}`,
              }}
            >
              <span className="poppins4 flex justify-center items-center">
                {/* {statesData && statesData["Independent('Kennedy')"]
                ? `${statesData["Independent('Kennedy')"]}`
                : "0"} */}
                {finalData.electoral_votes_by_party &&
                  Object.entries(finalData.electoral_votes_by_party).find(
                    ([party_name]) => party_name === "Independent('Kennedy')"
                  )[1]}
              </span>
            </div>
          </div>
        </div>
        {finalData.data && (
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

                {Object.entries(finalData.data).map(([state, data]) => (
                  <div
                    className=" w-fit md:w-auto flex gap-[20px] md:justify-between border-b-[1px] py-4 px-8"
                    key={state}
                  >
                    <div className="winner flex items-center gap-3">
                      {lastElection &&
                        sortedElections.map(([title, badge], index) => (
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
                          sortedElections.map(([title, party]) => (
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
                      <p className="font-medium font-poppins text-[9px] lg:text-[27px] text-white truncate w-10 md:w-16 lg:w-44 py-3">
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
