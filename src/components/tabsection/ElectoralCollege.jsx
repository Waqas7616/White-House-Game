import React, { useState } from "react";
import stats from "../../images/stats.png";
import badge from "../../images/president.png";
import ballot from "../../images/ballot.png";
import kennedy from "../../images/image 46.png";
import president from "../../images/president.png";
import democrat from "../../images/democrat.png";
import republic from "../../images/republican.png";
import independ from "../../images/independent.png";
import "../banner.css";
import VoteGraph from "./VoteGraph";
import Election2020 from "./Election2020";
import AgeGroups from "./AgeGroups";
import Ethnicity from "./Ethnicity";
import CountryOfBirth from "./CountryOfBirth";
import ByLanguage from "./ByLanguage";
import EmploymentStatus from "./EmploymentStatus";
import Military from "./Military";

export default function ElectoralCollege() {
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
  return (
    <div>
      <h2 className="orbit7 mt-8 text-whiteColor text-center w-[245px] flex justify-between items-center m-auto md:text-[60px]">
        <span>
          <img className="w-[50px]" src={stats} alt="" />{" "}
        </span>{" "}
        stats
      </h2>
      <p className="poppins5 text-whiteColor mb-4 text-center">
        Electoral College predictions
      </p>
      <p className="text-center poppins3 text-whiteColor text-[14px]">
        538 representatives elect the US President 270 needed to win
      </p>
      <div className="search-section flex flex-col  sm:flex-row  justify-between mt-12">
        <div className="badge flex items-center justify-between">
          <img src={badge} alt="" />
          <h2 className="poppins6 text-whiteColor text-[20px] md:text-[36px] ms-3">
            President
          </h2>
        </div>
        <div className="searchBar flex flex-col ">
          <label
            htmlFor="search "
            className="text-whiteColor text-center poppins4 text-[14px]"
          >
            Select State
          </label>
          <select
            name="states"
            id="search"
            className="bg-transparent border-[1px] poppins4 text-[14px] border-whiteColor  lg:w-[420px] px-3 py-2 rounded-[10px] text-whiteColor"
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
        </div>
        <div className="votes-count flex items-center justify-between">
          <img src={ballot} alt="ballot" />
          <h2 className="poppins6 text-whiteColor md:text-[36px] ms-3">
            Votes : {totalVotes}
          </h2>
        </div>
      </div>

      {/* STATS SECTION  */}
      <div className="stats relative py-5 px-4 bg-white/5 rounded-[10px] mt-8">
        {!expandedVotes ? (
          <>
            {percentages.slice(0, 3).map((item, index) => (
              <div
                key={index}
                className={`voteCount flex gap-1 sm:gap-5 items-center h-[60px] ${
                  item.party === "republican"
                    ? "republic"
                    : item.party === "democratic"
                    ? "democratic"
                    : "independent"
                } rounded-[8px] mt-8`}
              >
                <div
                  className={`president-info relative bg-${
                    item.party === "republican"
                      ? "[#546BED]"
                      : item.party === "democratic"
                      ? "redish"
                      : "whiteColor"
                  } px-1 sm:px-4  w-2/4 sm:w-1/4 h-full flex justify-between items-center rounded-l-lg`}
                >
                  <div className=" overflow-hidden overflow-y-hidden mb-[20px] md:mb-[30px] ">
                    <img
                      className="w-full h-full object-cover"
                      src={kennedy}
                      alt=""
                    />
                  </div>
                  <p className="poppins4 w-[30%] sm:w-auto overflow-hidden whitespace-nowrap sm:whitespace-normal text-ellipsis">
                    {item.name}
                  </p>
                  <div className="bg-whiteColor rounded-full flex justify-center items-center h-[30px] w-[30px]">
                    <img
                      className="w-[20px] sm:w-auto"
                      src={
                        item.party === "republican"
                          ? republic
                          : item.party === "democratic"
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
                      style={{ width: `${item.percentage}%` }}
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
            {percentages.map((item, index) => (
              <div
                key={index}
                className={`voteCount flex gap-1 sm:gap-5 items-center h-[60px] ${
                  item.party === "republican"
                    ? "republic"
                    : item.party === "democratic"
                    ? "democratic"
                    : "independent"
                } mt-8 rounded-[8px]`}
              >
                <div
                  className={`president-info relative bg-${
                    item.party === "republican"
                      ? "[#546BED]"
                      : item.party === "democratic"
                      ? "redish"
                      : "whiteColor"
                  } px-1 sm:px-4  w-2/4 sm:w-1/4 h-full flex justify-between items-center rounded-l-lg`}
                >
                  <div className=" overflow-hidden overflow-y-hidden mb-[20px] md:mb-[30px] ">
                    <img
                      className="w-full h-full object-cover"
                      src={kennedy}
                      alt=""
                    />
                  </div>
                  <p className="poppins4 w-[30%] sm:w-auto overflow-hidden whitespace-nowrap sm:whitespace-normal text-ellipsis">
                    {item.name}
                  </p>
                  <div className="bg-whiteColor rounded-full flex justify-center items-center h-[30px] w-[30px]">
                    <img
                      className="w-[20px] sm:w-auto"
                      src={
                        item.party === "republican"
                          ? republic
                          : item.party === "democratic"
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
                      style={{ width: `${item.percentage}%` }}
                      className="bg-whiteColor text-xs font-medium text-black-100 h-full text-center p-2 poppins5  leading-none rounded-[8px] w-[85%]"
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
    </div>
  );
}
