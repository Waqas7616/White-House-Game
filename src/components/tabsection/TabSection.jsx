import React, { useEffect, useState } from "react";
import statsone from '../../images/statsone.png'
import badge from "../../images/president.png";
import ballot from "../../images/ballot.png";
import kennedy from "../../images/image 46.png";

import democrat from "../../images/democrat.png";
import republic from "../../images/republican.png";
import independ from "../../images/independent.png";
import "../banner.css";
import VoteGraph from "./VoteGraph";
import Election2020 from "./Election2020";
import Map from "../Map";
import AgeGroups from "./AgeGroups";
import Ethnicity from "./Ethnicity";
import CountryOfBirth from "./CountryOfBirth";
import ByLanguage from "./ByLanguage";
import EmploymentStatus from "./EmploymentStatus";
import Military from "./Military";
import ElectoralCollege from "./ElectoralCollege";
import axios from "axios";
import StateWinner from "../statewinner/StateWinner";

function TabSection() {
  const imageUrl = "https://pankhay.com/thewhitehousegame/public/";

  const [allstates, setAllStates] = useState([]);
  const [id, setId] = useState(1);
  const [stats, setStats] = useState([]);
  const [president, setPresident] = useState();
  const [vicePresident, setVicePresident] = useState();

  useEffect(() => {
    axios
      .get("https://pankhay.com/thewhitehousegame/public/api/get_user_state")
      .then((response) => {
        setAllStates(response.data.user_state);
      })
      .catch((error) => {});
  }, []);
  useEffect(() => {
    const ParamBody = new URLSearchParams({
      user_state_id: id,
    });
    axios
      .get(
        `https://pankhay.com/thewhitehousegame/public/api/filter?${ParamBody}`,
        {
          headers: {
            Accept: "application/json",
          },
        }
      )
      .then((res) => {
        setStats(res.data);
        console.log("statsssss", stats);
      })
      .catch((err) => {
        console.error("Error:", err);
      });
  }, [id]);
  const handleId = (selectedId) => {
    setId(selectedId);
  };

  const [tabs, setTabs] = useState(0);
  const [expandedVotes, setExpandedVotes] = useState(false);
  const [viceVotes, setViceVotes] = useState(false);
  const expandVotes = () => {
    setExpandedVotes(!expandedVotes);
    console.log("votes", expandedVotes);
  };
  const expandViceVotes = () => {
    setViceVotes(!viceVotes);
  };

  const candidateData = [
    { name: "Kennedy", party: "independent", votes: "140" },
    { name: "Obama", party: "republican", votes: "40" },
    { name: "Sanders", party: "democratic", votes: "40" },
    { name: "West", party: "democratic", votes: "20" },

    { name: "Burgum", party: "republican", votes: "5" },
  ];
  const totalVotes = 245;
  const percentages = candidateData.map((candidate, index) => ({
    name: candidate.name,
    party: candidate.party,
    votes: candidate.votes,
    percentage: Math.round((candidate.votes / totalVotes) * 100),
  }));
  // console.log("all data", percentages);

  useEffect(() => {
    if (stats?.data) {
      setPresident(
        stats?.data?.candidate_percentages.filter(
          (item) => item.position === "president"
        )
      );
      setVicePresident(
        stats?.data?.candidate_percentages.filter(
          (item) => item.position === "vice_president"
        )
      );
    }
  }, [id]);
  console.log("takra sha", president);
  console.log("tinga ka", vicePresident);
  return (
    <div className="w-full bg-[#1c2452] py-8">
      <div className="w-10/12 m-auto resp ">
        <div className="w-full overflow-x-auto lg:overflow-x-hidden tabs">
          <div
            className="flex items-center gap-3 sm:flex sm:justify-between sm:items-center  py-5   w-[27rem] sm:w-full "
            style={{ scrollBehavior: "smooth" }}
          >
            <h2
              className={`tab-link text-whiteColor poppins4 relative  text-[13px] cursor-pointer md:text-[17px] ${
                tabs === 0 ? "active" : ""
              }`}
              onClick={() => setTabs(0)}
            >
              All
            </h2>
            <h2
              className={`tab-link whitespace-nowrap text-whiteColor poppins4 relative  text-[13px] cursor-pointer md:text-[17px] ${
                tabs === 1 ? "active" : ""
              }`}
              onClick={() => setTabs(1)}
            >
              Electoral College
            </h2>
            <h2
              className={`tab-link text-whiteColor poppins4 relative  text-[13px] cursor-pointer md:text-[17px] ${
                tabs === 2 ? "active" : ""
              }`}
              onClick={() => setTabs(2)}
            >
              Sex
            </h2>
            <h2
              className={`tab-link whitespace-nowrap text-whiteColor poppins4 relative  text-[13px] cursor-pointer md:text-[17px] ${
                tabs === 3 ? "active" : ""
              }`}
              onClick={() => setTabs(3)}
            >
              2020 Election
            </h2>
            <h2
              className={`tab-link whitespace-nowrap text-whiteColor poppins4 relative  text-[13px] cursor-pointer md:text-[17px] ${
                tabs === 4 ? "active" : ""
              }`}
              onClick={() => setTabs(4)}
            >
              Age groups
            </h2>
            <h2
              className={`tab-link text-whiteColor poppins4 relative  text-[13px] cursor-pointer md:text-[17px] ${
                tabs === 5 ? "active" : ""
              }`}
              onClick={() => setTabs(5)}
            >
              Ethnicity
            </h2>
            <h2
              className={`tab-link whitespace-nowrap text-whiteColor poppins4 relative  text-[13px] cursor-pointer md:text-[17px] ${
                tabs === 6 ? "active" : ""
              }`}
              onClick={() => setTabs(6)}
            >
              Country of birth
            </h2>
            <h2
              className={`tab-link text-whiteColor poppins4 relative  text-[13px] cursor-pointer md:text-[17px] ${
                tabs === 7 ? "active" : ""
              }`}
              onClick={() => setTabs(7)}
            >
              Language
            </h2>
            <h2
              className={`tab-link whitespace-nowrap text-whiteColor poppins4 relative  text-[13px] cursor-pointer md:text-[17px] ${
                tabs === 8 ? "active" : ""
              }`}
              onClick={() => setTabs(8)}
            >
              Employment status
            </h2>
            <h2
              className={`tab-link text-whiteColor poppins4 relative  text-[13px] cursor-pointer md:text-[17px] ${
                tabs === 9 ? "active" : ""
              }`}
              onClick={() => setTabs(9)}
            >
              Military
            </h2>
          </div>
        </div>
        <div className="tab-content ">
          <div
            className={`all-tab-content  ${tabs === 0 ? "block" : "hidden"}`}
          >
            <h2 className="orbit7 mt-8 text-whiteColor text-center w-[245px] flex justify-between items-center m-auto md:text-[60px]">
        <span>
          <img className="w-[50px]" src={statsone} alt="" />{" "}
        </span>{" "}
        stats
      </h2>
            <p className="poppins5 text-whiteColor mb-4 text-center">
              Who our players expect to win on November 5, 2024
            </p>
            <div className="search-section flex flex-col  sm:flex-row  justify-between">
              <div className="badge flex items-center justify-between">
                <img className="w-8 h-8 lg:w-14 lg:h-14 object-cover" src={badge} alt="" />
                <h2 className="poppins6 text-whiteColor md:text-[28px] lg:text-[34px] ms-3">
                  President
                </h2>
              </div>
              {/* <div className="searchBar flex flex-col justify-center items-center ">
                <label
                  htmlFor="search "
                  className="text-whiteColor text-center poppins4 text-[14px]"
                >
                  Select State
                </label>
                <select
                  name="states"
                  id="search"
                  className="bg-transparent border-[1px] poppins4 text-[14px] border-whiteColor w-[230px] lg:w-[359px] px-3 py-2 rounded-[10px] text-whiteColor"
                >
                  <option className="bg-[#000] " value="">
                    Select State
                  </option>
                  <option className="bg-[#000] " value="ny">
                    New york
                  </option>
                  <option className="bg-[#000] " value="hst">
                    Houston
                  </option>
                </select>
              </div> */}

              <div className="searchBar flex  flex-col items-center ">
                <label
                  htmlFor="search"
                  className="text-whiteColor text-center poppins4 text-[14px] mb-2"
                >
                  Select States
                </label>
                <div className="bg-transparent border-[1px] poppins4 text-[14px] border-whiteColor w-[263px] lg:w-[420px]  md:ml-0 px-2 py-2  rounded-[10px] text-whiteColor">
                  <select
                    onChange={(e) => {
                      const selectedName = e.target.value;
                      const selectedId = allstates.find(
                        (item) => item.name === selectedName
                      )?.id;
                      handleId(selectedId);
                    }}
                    name="states"
                    id="search"
                    className="bg-transparent w-full outline-none"
                  >
                    {/* <option className="bg-[#000]" value="">
                    Select All States
                  </option> */}
                    {allstates?.map((item) => (
                      <option
                        className="bg-[#000]"
                        key={item.id}
                        value={item?.name}
                      >
                        {item?.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="votes-count flex items-center justify-between sm:mt-0 mt-5">
                <img className="w-8 h-8 lg:w-10 lg:h-10 object-cover" src={ballot} alt="ballot" />
                <h2 className="poppins6 text-whiteColor md:text-[28px] lg:text-[36px] ms-3">
                  Votes : {totalVotes}
                </h2>
              </div>
            </div>

            {/* STATS SECTION  */}
            <div className="stats relative py-5 px-4 bg-white/5 rounded-[10px] mt-8">
              {!expandedVotes ? (
                <>
                  {president &&
                    president?.slice(0, 3).map((item, index) => (
                      <div
                        key={index}
                        className={`voteCount flex gap-1 sm:gap-5 items-center h-[60px] ${
                          item.party_name === "Republican"
                            ? "republic"
                            : item.party_name === "Democratic"
                            ? "democratic"
                            : "independent"
                        } rounded-[8px] mt-8`}
                      >
                        <div
                          className={`president-info relative bg-${
                            item.party_name === "Republican"
                              ? "[#546BED]"
                              : item.party_name === "Democratic"
                              ? "redish"
                              : "whiteColor"
                          } px-1 sm:px-4  w-2/4 sm:w-1/4 h-full flex justify-between items-center rounded-l-lg`}
                        >
                          <div className=" overflow-hidden overflow-y-hidden w-[50px] h-[60px]">
                            <img
                              className="w-full h-full object-cover"
                              src={`${imageUrl}${item.candidate_image}`}
                              alt=""
                            />
                          </div>
                          <p className="poppins4 w-[30%] sm:w-auto overflow-hidden whitespace-nowrap sm:whitespace-normal text-ellipsis">
                            {item.candidate_name}
                          </p>
                          <div className="bg-whiteColor rounded-full flex justify-center items-center h-[30px] w-[30px]">
                            <img
                              className="w-[20px] sm:w-auto"
                              src={
                                item.party_name === "Depublican"
                                  ? republic
                                  : item.party_name === "Democratic"
                                  ? democrat
                                  : independ
                              }
                              alt=""
                            />
                          </div>
                        </div>
                        <div className="president-votes w-3/4">
                          <div className="w-[98%] h-[31px] bg-[#454C72] rounded-[8px] dark:bg-gray-700">
                            <div
                              style={{
                                width: `${item.percentage}%`,
                                background: `${
                                  item.party_name === "Republican"
                                    ? "#546BED"
                                    : item.party_name === "Democratic"
                                    ? "#ED1C24"
                                    : "white"
                                }`,
                              }}
                              className="bg-whiteColor text-xs font-medium text-black-100 h-full text-center p-2 poppins5  leading-none rounded-[8px] "
                            >
                              {" "}
                              {item.percentage}%
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}

                  {/* <div className="voteCount flex gap-1 sm:gap-5 items-center h-[60px] mt-8  bg-[#ED1C244D] rounded-l-lg">
                  <div className="president-info relative bg-redish px-1 sm:px-4 w-2/4 sm:w-1/4 h-full flex justify-between  items-center rounded-l-lg">
                    <div className=' overflow-hidden overflow-y-hidden mb-[20px] ' ><img className='w-full h-full object-cover' src={kennedy} alt="" /></div>
                    <p className="poppins4 text-whiteColor w-[30%] sm:w-auto overflow-hidden text-ellipsis whitespace-nowrap  ">Robbert F. Kennedy</p>
                    <img className='w-[20px] sm:w-auto' src={president} alt="" />

                  </div>
                  <div className="president-votes w-3/4">
                    <div class="w-[98%] h-[31px] bg-[#454C72] rounded-full dark:bg-gray-700">
                      <div class="bg-redish text-xs font-medium text-whiteColor h-full text-center p-2 poppins5  leading-none rounded-full" style={{ width: "45%" }}> 45%</div>
                    </div>
                  </div>
                </div> */}
                  <button
                    className="absolute bottom-[-20px] left-[50%]"
                    onClick={expandVotes}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="40"
                      height="40"
                      viewBox="0 0 72 72"
                      fill="none"
                    >
                      <circle cx="36" cy="36" r="36" fill="#272F5B" />
                      <path
                        d="M36.4022 54.8707L27.5334 46.0019L25 48.5353L36.4022 59.9375L47.8043 48.5353L45.2709 46.0019L36.4022 54.8707Z"
                        fill="white"
                      />
                    </svg>
                  </button>
                </>
              ) : (
                <>
                  {president &&
                    president?.map((item, index) => (
                      <div
                        key={index}
                        className={`voteCount flex gap-1 sm:gap-5 items-center h-[60px] ${
                          item.party_name === "Republican"
                            ? "republic"
                            : item.party_name === "Democratic"
                            ? "democratic"
                            : "independent"
                        } mt-8 rounded-[8px]`}
                      >
                        <div
                          className={`president-info relative bg-${
                            item.party_name === "Republican"
                              ? "[#546BED]"
                              : item.party_name === "Democratic"
                              ? "redish"
                              : "whiteColor"
                          } px-1 sm:px-4  w-2/4 sm:w-1/4 h-full flex justify-between items-center rounded-l-lg`}
                        >
                          <div className=" overflow-hidden overflow-y-hidden w-[50px] h-[60px]">
                            <img
                              className="w-full h-full object-cover"
                              src={`${imageUrl}${item.candidate_image}`}
                              alt=""
                            />
                          </div>
                          <p className="poppins4 w-[30%] sm:w-auto overflow-hidden whitespace-nowrap sm:whitespace-normal text-ellipsis">
                            {item.candidate_name}
                          </p>
                          <div className="bg-whiteColor rounded-full flex justify-center items-center h-[30px] w-[30px]">
                            <img
                              className="w-[20px] sm:w-auto"
                              src={
                                item.party_name === "Republican"
                                  ? republic
                                  : item.party_name === "Democratic"
                                  ? democrat
                                  : independ
                              }
                              alt=""
                            />
                          </div>
                        </div>
                        <div className="president-votes w-3/4">
                          <div className="w-[98%] h-[31px] bg-[#454C72] rounded-[8px] dark:bg-gray-700">
                            <div
                              style={{
                                width: `${item.percentage}%`,
                                background: `${
                                  item.party_name === "Republican"
                                    ? "#546BED"
                                    : item.party_name === "Democratic"
                                    ? "#ED1C24"
                                    : "white"
                                }`,
                              }}
                              className="bg-whiteColor text-xs font-medium text-black-100 h-full text-center p-2 poppins5  leading-none rounded-[8px] "
                            >
                              {" "}
                              {item.percentage}%
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  <button
                    className="absolute bottom-[-20px] left-[50%]"
                    onClick={expandVotes}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="40"
                      height="40"
                      viewBox="0 0 72 72"
                      fill="none"
                    >
                      <circle cx="36" cy="36" r="36" fill="#272F5B" />
                      <path
                        d="M36.4022 54.8707L27.5334 46.0019L25 48.5353L36.4022 59.9375L47.8043 48.5353L45.2709 46.0019L36.4022 54.8707Z"
                        fill="white"
                        transform="rotate(180 36 50)"
                      />
                    </svg>
                  </button>
                </>
              )}
            </div>

            {/* VICE PRESIDENT SECITON  */}

            <div className="search-section flex flex-col sm:items-none  sm:flex-row  justify-between mt-16">
              <div className="badge flex items-center justify-between">
                <img className="w-8 h-8 lg:w-14 lg:h-14 object-cover" src={badge} alt="" />
                <h2 className="poppins6 text-whiteColor text-nowrap md:text-[23px] lg:text-[30px] ms-3">
                  Vice President
                </h2>
              </div>
              {/* <div className="searchBar flex flex-col justify-center items-center ">
                <label
                  htmlFor="search "
                  className="text-whiteColor text-center poppins4 text-[14px]"
                >
                  Select State
                </label>
                <select
                  name="states"
                  id="search"
                  className="bg-transparent border-[1px] poppins4 text-[14px] border-whiteColor w-[230px] lg:w-[359px] px-3 py-2 rounded-[10px] text-whiteColor"
                >
                  <option className="bg-[#000]" value="">
                    Select State
                  </option>
                  <option className="bg-[#000]" value="ny">
                    New york
                  </option>
                  <option className="bg-[#000]" value="hst">
                    Houston
                  </option>
                </select>
              </div> */}

              <div className="searchBar flex flex-col items-center mx-5 ">
                <label
                  htmlFor="search"
                  className="text-whiteColor text-center poppins4 text-[14px] mb-2"
                >
                  Select  States
                </label>
                <div className="bg-transparent border-[1px] poppins4 text-[14px] border-whiteColor  md:ml-0 w-[263px] lg:w-[420px] px-2 py-2 rounded-[10px] text-whiteColor">
                <select
                  onChange={(e) => {
                    const selectedName = e.target.value;
                    const selectedId = allstates.find(
                      (item) => item.name === selectedName
                    )?.id;
                    handleId(selectedId);
                  }}
                  name="states"
                  id="search"
                  className="bg-transparent w-full outline-none"
                >
                  {allstates?.map((item) => (
                    <option
                      className="bg-[#000]"
                      key={item.id}
                      value={item?.name}
                    >
                      {item?.name}
                    </option>
                  ))}
                </select>
                </div>
              </div>

              <div className="votes-count flex items-center justify-between sm:ms-10 sm:mt-0 mt-5">
                <img className="w-8 h-8 lg:w-10 lg:h-10 object-cover" src={ballot} alt="ballot" />
                <h2 className="poppins6 text-whiteColor md:text-[28px] lg:text-[36px] ms-3">
                  Votes : {totalVotes}
                </h2>
              </div>
            </div>

            {/* STATS SECTION  */}
            <div className="stats relative py-5 px-4 bg-white/5 rounded-[10px] mt-8">
              {!viceVotes ? (
                <>
                  {vicePresident &&
                    vicePresident?.slice(0, 3).map((item, index) => (
                      <div
                        key={index}
                        className={`voteCount flex gap-1 sm:gap-5 items-center h-[60px] ${
                          item.party_name === "Republican"
                            ? "republic"
                            : item.party_name === "Democratic"
                            ? "democratic"
                            : "independent"
                        } rounded-[8px] mt-8`}
                      >
                        <div
                          className={`president-info relative bg-${
                            item.party_name === "Republican"
                              ? "[#546BED]"
                              : item.party_name === "Democratic"
                              ? "redish"
                              : "whiteColor"
                          } px-1 sm:px-4  w-2/4 sm:w-1/4 h-full flex justify-between items-center rounded-l-lg`}
                        >
                          <div className="overflow-hidden overflow-y-hidden w-[50px] h-[60px]">
                            <img
                              className="w-full h-full object-cover"
                              src={`${imageUrl}${item.candidate_image}`}
                              alt=""
                            />
                          </div>
                          <p className="poppins4 w-[30%] sm:w-auto overflow-hidden whitespace-nowrap sm:whitespace-normal text-ellipsis">
                            {item.candidate_name}
                          </p>
                          <div className="bg-whiteColor rounded-full flex justify-center items-center h-[30px] w-[30px]">
                            <img
                              className="w-[20px] sm:w-auto"
                              src={
                                item.party_name === "Republican"
                                  ? republic
                                  : item.party_name === "Democratic"
                                  ? democrat
                                  : independ
                              }
                              alt=""
                            />
                          </div>
                        </div>
                        <div className="president-votes w-3/4">
                          <div className="w-[98%] h-[31px] bg-[#454C72] rounded-[8px] dark:bg-gray-700">
                            <div
                              style={{
                                width: `${item.percentage}%`,
                                background: `${
                                  item.party_name === "Republican"
                                    ? "#546BED"
                                    : item.party_name === "Democratic"
                                    ? "#ED1C24"
                                    : "white"
                                }`,
                              }}
                              className="bg-whiteColor text-xs font-medium text-black-100 h-full text-center p-2 poppins5  leading-none rounded-[8px] "
                            >
                              {" "}
                              {item.percentage}%
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}

                  {/* <div className="voteCount flex gap-1 sm:gap-5 items-center h-[60px] mt-8  bg-[#ED1C244D] rounded-l-lg">
                  <div className="president-info relative bg-redish px-1 sm:px-4 w-2/4 sm:w-1/4 h-full flex justify-between  items-center rounded-l-lg">
                    <div className=' overflow-hidden overflow-y-hidden mb-[20px] ' ><img className='w-full h-full object-cover' src={kennedy} alt="" /></div>
                    <p className="poppins4 text-whiteColor w-[30%] sm:w-auto overflow-hidden text-ellipsis whitespace-nowrap  ">Robbert F. Kennedy</p>
                    <img className='w-[20px] sm:w-auto' src={president} alt="" />

                  </div>
                  <div className="president-votes w-3/4">
                    <div class="w-[98%] h-[31px] bg-[#454C72] rounded-full dark:bg-gray-700">
                      <div class="bg-redish text-xs font-medium text-whiteColor h-full text-center p-2 poppins5  leading-none rounded-full" style={{ width: "45%" }}> 45%</div>
                    </div>
                  </div>
                </div> */}
                  <button
                    className="absolute bottom-[-20px] left-[50%]"
                    onClick={expandViceVotes}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="40"
                      height="40"
                      viewBox="0 0 72 72"
                      fill="none"
                    >
                      <circle cx="36" cy="36" r="36" fill="#272F5B" />
                      <path
                        d="M36.4022 54.8707L27.5334 46.0019L25 48.5353L36.4022 59.9375L47.8043 48.5353L45.2709 46.0019L36.4022 54.8707Z"
                        fill="white"
                      />
                    </svg>
                  </button>
                </>
              ) : (
                <>
                  {vicePresident &&
                    vicePresident?.map((item, index) => (
                      <div
                        key={index}
                        className={`voteCount flex gap-1 sm:gap-5 items-center h-[60px] ${
                          item.party_name === "Republican"
                            ? "republic"
                            : item.party_name === "Democratic"
                            ? "democratic"
                            : "independent"
                        } rounded-[8px] mt-8`}
                      >
                        <div
                          className={`president-info relative bg-${
                            item.party_name === "Republican"
                              ? "[#546BED]"
                              : item.party_name === "Democratic"
                              ? "redish"
                              : "whiteColor"
                          } px-1 sm:px-4  w-2/4 sm:w-1/4 h-full flex justify-between items-center rounded-l-lg`}
                        >
                          <div className="overflow-hidden overflow-y-hidden w-[50px] h-[60px]">
                            <img
                              className="w-full h-full object-cover"
                              src={`${imageUrl}${item.candidate_image}`}
                              alt=""
                            />
                          </div>
                          <p className="poppins4 w-[30%] sm:w-auto overflow-hidden whitespace-nowrap sm:whitespace-normal text-ellipsis">
                            {item.candidate_name}
                          </p>
                          <div className="bg-whiteColor rounded-full flex justify-center items-center h-[30px] w-[30px]">
                            <img
                              className="w-[20px] sm:w-auto"
                              src={
                                item.party_name === "Republican"
                                  ? republic
                                  : item.party_name === "Democratic"
                                  ? democrat
                                  : independ
                              }
                              alt=""
                            />
                          </div>
                        </div>
                        <div className="president-votes w-3/4">
                          <div className="w-[98%] h-[31px] bg-[#454C72] rounded-[8px] dark:bg-gray-700">
                            <div
                              style={{
                                width: `${item.percentage}%`,
                                background: `${
                                  item.party_name === "Republican"
                                    ? "#546BED"
                                    : item.party_name === "Democratic"
                                    ? "#ED1C24"
                                    : "white"
                                }`,
                              }}
                              className="bg-whiteColor text-xs font-medium text-black-100 h-full text-center p-2 poppins5  leading-none rounded-[8px] "
                            >
                              {" "}
                              {item.percentage}%
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  <button
                    className="absolute bottom-[-20px] left-[50%]"
                    onClick={expandViceVotes}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="40"
                      height="40"
                      viewBox="0 0 72 72"
                      fill="none"
                    >
                      <circle cx="36" cy="36" r="36" fill="#272F5B" />
                      <path
                        d="M36.4022 54.8707L27.5334 46.0019L25 48.5353L36.4022 59.9375L47.8043 48.5353L45.2709 46.0019L36.4022 54.8707Z"
                        fill="white"
                        transform="rotate(180 36 50)"
                      />
                    </svg>
                  </button>
                </>
              )}
            </div>
          </div>
          <div
            className={`all-tab-content  ${tabs === 1 ? "block" : "hidden"}`}
          >
            <ElectoralCollege />
          </div>
          <div
            className={`all-tab-content  ${tabs === 2 ? "block" : "hidden"}`}
          >
            <VoteGraph />
          </div>
          <div
            className={`all-tab-content  ${tabs === 3 ? "block" : "hidden"}`}
          >
            <Election2020 />
          </div>
          <div
            className={`all-tab-content  ${tabs === 4 ? "block" : "hidden"}`}
          >
            <AgeGroups />
          </div>
          <div
            className={`all-tab-content  ${tabs === 5 ? "block" : "hidden"}`}
          >
            <Ethnicity />
          </div>
          <div
            className={`all-tab-content  ${tabs === 6 ? "block" : "hidden"}`}
          >
            <CountryOfBirth />
          </div>
          <div
            className={`all-tab-content  ${tabs === 7 ? "block" : "hidden"}`}
          >
            <ByLanguage />
          </div>
          <div
            className={`all-tab-content  ${tabs === 8 ? "block" : "hidden"}`}
          >
            <EmploymentStatus />
          </div>
          <div
            className={`all-tab-content  ${tabs === 9 ? "block" : "hidden"}`}
          >
            <Military />
          </div>
        </div>
      </div>
      
      <div
        className="w-full py-8"
        style={{
          background:
            "linear-gradient(90.68deg, rgba(28, 36, 82, 0.3) -24.33%, rgba(190, 30, 46, 0.3) 93.83%, rgba(237, 28, 36, 0.3) 124.99%)",
        }}
      >
        <div className="flex justify-center my-20 ">
            <h2 className="text-white font-poppins font-black text-[14px] lg:text-[35px]">270 to win</h2>
          </div>
        <div className="flex w-9/12 m-auto my-5">
          
          <div className="flex-1">
            {" "}
            <h3 className="text-center text-white poppins5 mb-2 text-[10px] lg:text-[24px]">Democratic</h3>
            <div className="dem py-5  bg-redish"></div>
          </div>
          <div className="flex-1">
            {" "}
            <h3 className="text-center text-white poppins5 mb-2 text-[10px] lg:text-[24px]">Republican</h3>
            <div className="rep py-5 bg-blue-800"></div>
          </div>
          <div className="flex-1">
            <h3 className="text-center text-white poppins5 mb-2 text-[10px] lg:text-[24px]">
              Independent
            </h3>
            <div className="ind py-5  bg-white"></div>
          </div>
        </div>
        <div className="w-10/12 m-auto mt-12">
          <Map />
        </div>
        <div className="w-10/12 m-auto mt-12">
          <StateWinner />
        </div>
      </div>
    </div>
  );
}

export default TabSection;
