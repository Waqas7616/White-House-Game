import React, { useEffect, useState } from "react";
import statsone from "../../images/statsone.png";
import badge from "../../images/president.svg";
import ballot from "../../images/vote.svg";
import kennedy from "../../images/image 46.png";
import president from "../../images/president.png";
import democrat from "../../images/Democratic_Party-logo-108C42372F-seeklogo 1.svg";
import republic from "../../images/Republicanlogo 1.svg";
import independ from "../../images/Constitution_Party_(USA)_logo 1.svg";
import "../banner.css";
import VoteGraph from "./VoteGraph";
import Election2020 from "./Election2020";
import AgeGroups from "./AgeGroups";
import Ethnicity from "./Ethnicity";
import CountryOfBirth from "./CountryOfBirth";
import ByLanguage from "./ByLanguage";
import EmploymentStatus from "./EmploymentStatus";
import Military from "./Military";
import axios from "axios";

export default function ElectoralCollege() {
  const [expandedVotes, setExpandedVotes] = useState(false);
  const [viceVotes, setViceVotes] = useState(false);
  const imageUrl = "https://thewhitehousegame.com/public/";

  const [allstates, setAllStates] = useState([]);
  const [id, setId] = useState(1);
  const [stats, setStats] = useState([]);
  const [president, setPresident] = useState();
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

  useEffect(() => {
    axios
      .get("https://thewhitehousegame.com/public/api/get_user_state")
      .then((response) => {
        setAllStates(response.data.user_state);
        // console.log("all states123", response.data.user_state);
      })
      .catch((error) => {});
  }, []);
  useEffect(() => {
    const ParamBody = new URLSearchParams({
      user_state_id: id,
    });
    axios
      .get(
        `https://thewhitehousegame.com/public/api/filter?${ParamBody}`,
        {
          headers: {
            Accept: "application/json",
          },
        }
      )
      .then((res) => {
        setStats(res.data);
        setPresident(
          res?.data?.data?.candidate_percentages.filter(
            (item) => item.position === "president"
          )
        );
      })
      .catch((err) => {
        console.error("Error:", err);
      });
  }, [id]);
  const handleId = (selectedId) => {
    setId(selectedId);
  };
  
  console.log("chup sha", president);
  



  return (
    <div>
      <h2 className="orbit7 mt-8 text-whiteColor text-center w-[245px] flex justify-between items-center m-auto md:text-[60px]">
        <span>
          <img className="w-[50px]" src={statsone} alt="" />{" "}
        </span>{" "}
        stats
      </h2>
      <p className="poppins5 text-whiteColor mb-4 text-center">
        Electoral College predictions
      </p>
      <p className="text-center poppins3 text-whiteColor text-[16px] pt-4">
        538 representatives elect the US President
      </p>
      <p className="text-center poppins3 text-whiteColor text-[16px] pt-2">
         270 are needed to win
      </p>
      <div className="search-section flex flex-col  sm:flex-row  justify-between mt-12">
        <div className="badge flex items-center justify-between">
          <img className="w-8 h-8 lg:w-14 lg:h-14 object-cover " src={badge} alt="" />
          <h2 className="poppins6 text-whiteColor text-[20px] md:text-[25px] lg:text-[36px] ms-3">
            President
          </h2>
        </div>
        <div className="searchBar flex flex-col items-center mb-0 lg:mb-7">
          <label
            htmlFor="search "
            className="text-whiteColor text-center poppins4 text-[14px] mb-2"
          >
            Select State
          </label>
          <div  className="bg-transparent border-[1px] poppins4 text-[14px] ml-8 md:ml-0 border-whiteColor w-[230px] lg:w-[420px] px-2 py-2 rounded-[10px] text-whiteColor">
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
                        className="bg-[#1c2452]"
                        key={item.id}
                        value={item?.name}
                      >
                        {item?.name}
                      </option>
                    ))}
                  </select>
          </div>
        </div>
        <div className="votes-count flex items-center justify-between mt-5 md:mt-0">
          <img className="w-6 h-6 lg:w-10 lg:h-10 object-cover" src={ballot} alt="ballot" />
          <h2 className="poppins6 text-whiteColor md:text-[28px] lg:text-[36px] ms-3">
            Votes : {stats?.data?.totalPredictions}
          </h2>
        </div>
      </div>

      {/* STATS SECTION  */}
      <div className="stats relative py-5 px-4 bg-white/5 rounded-[10px] mt-8">
        {!expandedVotes ? (
          <>
            {president &&president?.length===0?
            <p className="text-center text-white poppins5">No one voted from this state yet</p>: president?.slice(0, 3).map((item, index) => (
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
                      ? "redish"
                      : item.party_name === "Democratic"
                      ? "[#546BED]"
                      : "whiteColor"
                  } px-1 sm:px-4  w-2/4 sm:w-1/4 h-full flex justify-between items-center rounded-l-lg`}
                >
                  <div className=" overflow-hidden overflow-y-hidden w-[50px] h-[60px] ">
                    <img
                      className="w-full h-full object-cover"
                      src={`${imageUrl}${item.candidate_image}`}
                      alt=""
                    />
                  </div>
                  <p className="poppins4 w-[30%] sm:w-auto overflow-hidden whitespace-nowrap sm:whitespace-normal text-ellipsis sm:text-nowrap">
                  {item.candidate_name}
                  </p>
                  <div className="bg-whiteColor rounded-full flex justify-center items-center h-[30px] w-[30px]">
                    <img
                      className="w-[20px] sm:w-auto"
                      src={
                        item.party_name === "Republican"
                          ? republic
                          : item.party_name === "Democratic"
                          ?  democrat
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
                                    ? "#ED1C24"
                                    : item.party_name === "Democratic"
                                    ? "#546BED"
                                    : "white"
                                }`,
                              }}
                              className="bg-whiteColor text-xs font-medium text-black-100 h-full text-center p-2 poppins5  leading-none rounded-[8px] "
                            >
                              {" "}
                              {item.percentage&&item.percentage===100?item.percentage:item.percentage.toFixed(1)}%
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
                />
              </svg>
            </button>
          </>      
        ) : (
          <>
            {president && president?.map((item, index) => (
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
                      ? "redish"
                      : item.party_name === "Democratic"
                      ? "[#546BED]"
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
                  <p className="poppins4 w-[30%] sm:w-auto overflow-hidden whitespace-nowrap sm:whitespace-normal text-ellipsis sm:text-nowrap">
                    {item.candidate_name}
                  </p>
                  <div className="bg-whiteColor rounded-full flex justify-center items-center h-[30px] w-[30px]">
                    <img
                      className="w-[20px] sm:w-auto"
                      src={
                        item.party_name === "Republican"
                          ?  republic
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
                                    ? "#ED1C24"
                                    : item.party_name === "Democratic"
                                    ? "#546BED"
                                    : "white"
                                }`,
                              }}
                              className="bg-whiteColor text-xs font-medium text-black-100 h-full text-center p-2 poppins5  leading-none rounded-[8px] "
                            >
                              {" "}
                              {item.percentage&&item.percentage===100?item.percentage:item.percentage.toFixed(1)}%
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
