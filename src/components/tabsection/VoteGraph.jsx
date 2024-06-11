import React, { useState, useEffect } from "react";
import kennedy from "../../images/image 46.png";
import stats from "../../images/stats.png";
import badge from "../../images/president.svg";
import ballot from "../../images/vote.svg";
import male from "../../images/Condidates/Male.png";
import female from "../../images/Condidates/Female.png";
import independ from "../../images/Constitution_Party_(USA)_logo 1.svg";
import democrat from "../../images/Democratic_Party-logo-108C42372F-seeklogo 1.svg";
import republic from "../../images/Republicanlogo 1.svg";
import axios from "axios";

export default function VoteGraph() {
  const imageUrl = "https://thewhitehousegame.com/public/";

  const [expendedCandidates, setExpandedCandidates] = useState(false);
  const [id, setId] = useState(1);
  // const [gender, setGender] = useState([
  //   { id: 1, name: "Male" },
  //   { id: 2, name: "Female" },
  // ]);
  const [allstates, setAllStates] = useState([]);

  const [candidatedata, setCandidateData] = useState([]);

  const expendCandidate = () => {
    setExpandedCandidates(!expendedCandidates);
  };
  useEffect(() => {
    axios
      .get("https://thewhitehousegame.com/public/api/get_user_state")
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
        `https://thewhitehousegame.com/public/api/filter?${ParamBody}`,
        {
          headers: {
            Accept: "application/json",
          },
        }
      )
      .then((res) => {
        setCandidateData(res.data);
      })
      .catch((err) => {
        console.error("Error:", err);
      });
  }, [id]);
  const handleId = (selectedId) => {
    setId(selectedId);
  };
  const candidateData = [
    {
      name: "Kennedy",
      party: "independent",
      votes: "140",
      male: "90",
      female: "50",
    },
    {
      name: "Obama",
      party: "republican",
      votes: "40",
      male: "10",
      female: "30",
    },
    {
      name: "Sanders",
      party: "democratic",
      votes: "40",
      male: "20",
      female: "20",
    },
    { name: "West", party: "democratic", votes: "20", male: "15", female: "5" },

    { name: "Burgum", party: "republican", votes: "5", male: "5", female: "0" },
  ];
  const totalVotes = 245;
  const percentages = candidateData.map((candidate, index) => ({
    name: candidate.name,
    party: candidate.party,
    votes: candidate.votes,
    malepercentage: Math.round((candidate.male / candidate.votes) * 100),
    femalepercentage: Math.round((candidate.female / candidate.votes) * 100),
  }));
  return (
    <div>
      <h2 className="orbit7 mt-8 text-whiteColor text-center w-[245px] flex justify-between items-center m-auto md:text-[60px]">
        <span>
          <img className="w-[50px]" src={stats} alt="" />{" "}
        </span>{" "}
        stats
      </h2>
      <p className="poppins5 text-whiteColor mb-4 text-center">By Sex</p>
      <p className="text-center poppins3 text-whiteColor text-[14px]">
        How Males and Females indent to vote
      </p>
      <div className="search-section flex flex-col  sm:flex-row  justify-between mt-12">
        <div className="badge flex items-center justify-between">
          <img className="w-8 h-8 lg:w-14 lg:h-14 object-cover" src={badge} alt="" />
          <h2 className="poppins6 text-whiteColor text-[20px] md:text-[25px] lg:text-[36px] ms-3">
            President
          </h2>
        </div>
        <div className="searchBar flex flex-col justify-center items-center ">
          <label
            htmlFor="search "
            className="text-whiteColor text-center poppins4 text-[14px] mb-2"
          >
            Select State
          </label>
          <div className="bg-transparent border-[1px] poppins4 text-[14px] border-whiteColor w-[263px] lg:w-[420px] px-2 py-2 rounded-[10px] text-whiteColor">
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
              <option className="bg-[#1c2452]" key={item.id} value={item?.name}>
                {item?.name}
              </option>
            ))}
          </select>
          </div>
        </div>
        <div className="votes-count flex items-center justify-between sm:mt-0 mt-5">
          <img className="w-8 h-8 lg:w-10 lg:h-10 object-cover" src={ballot} alt="ballot" />
          <h2 className="poppins6 text-whiteColor md:text-[28px] lg:text-[36px] ms-3">
            Votes : {candidatedata?.data?.totalPredictions}
          </h2>
        </div>
      </div>
      <div className="stats relative py-8 px-4 bg-white/5 rounded-[10px] mt-8">
        {!expendedCandidates ? (
          <>
            {candidatedata?.data?.candidate_percentages.filter((item)=>item.position==="president")
              .slice(0, 3)
              .map((item, index) => (
                <div
                  key={index}
                  className={`voteCount flex gap-1 sm:gap-5 items-center h-[60px]  rounded-[8px] mt-8 ${
                    item.party_name === "Republican"
                      ? "republic"
                      : item.party_name === "Democratic"
                      ? "democratic"
                      : "independent"
                  }`}
                >
                  <div
                    style={{
                      background: `${
                        item.party_name === "Republican"
                          ? "#ED1C24"
                          : item.party_name === "Democratic"
                          ? "#546BED"
                          : "white"
                      }`,
                    }}
                    className={`president-info relative px-1 sm:px-4  w-2/4 sm:w-1/4 h-full flex justify-between items-center rounded-l-lg `}
                  >
                    <div className=" overflow-hidden w-[50px] h-[60px] overflow-y-hidden ">
                      <img
                        className="w-full h-full object-cover"
                        src={`${imageUrl}${item.candidate_image}`}
                        alt=""
                      />
                    </div>
                    <p className="poppins4 w-[30%] sm:w-auto overflow-hidden whitespace-nowrap sm:whitespace-normal text-ellipsis">
                      {item.candidate_name}
                    </p>
                    <div className="bg-whiteColor rounded-full flex justify-center items-center h-[30px] w-[30px] shadow-xl shadow-[#0000004d]">
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
                    <div className="w-[98%] h-[62px]  rounded-r-lg  flex flex-col justify-center ">
                      <div className="w-100 bg-[#454C72] rounded-[8px]">
                        <div
                          style={{
                            width: `${item.male_ratio}%`,
                            background: `${
                              item.party_name === "Republican"
                                ? "#ED1C24"
                                : item.party_name === "Democratic"
                                ? "#546BED"
                                : "white"
                            }`,
                          }}
                          className={` w-[80%] text-xs font-medium text-black-100 h-6 text-center p-1 pl-4 poppins5  leading-none rounded-[8px] flex items-center gap-5 `}
                        >
                          <div className="text-[#65D2E6] text-[15px] poppins4 italic flex items-center ">
                            <img src={male} alt="" />
                            Male
                          </div>
                          <p className="flex-1 text-center">
                            {" "}
                            {item.male_ratio && item.male_ratio.toFixed(2)}%
                          </p>
                        </div>
                      </div>
                      <div className="w-100 bg-[#454C72] rounded-[8px] mt-1">
                        <div
                          style={{
                            width: `${item.female_ratio}%`,
                            background: `${
                              item.party_name === "Republican"
                                ? "#ED1C24"
                                : item.party_name === "Democratic"
                                ? "#546BED"
                                : "white"
                            }`,
                          }}
                          className={` w-[80%] text-xs font-medium text-black-100 h-6 text-center p-1 pl-4 poppins5  leading-none rounded-[8px] flex items-center gap-5 `}
                        >
                          <div className="text-[#F0788C] text-[15px] poppins4 italic flex items-center ">
                            <img src={female} alt="" />
                            Female
                          </div>
                          <p className="flex-1 text-center">
                            {Math.round(item.female_ratio)}%
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            <button
              className="absolute bottom-[-20px] left-[50%]"
              onClick={expendCandidate}
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
            {candidatedata?.data?.candidate_percentages.filter((item)=>item.position==="president").map((item, index) => (
              <div
                key={index}
                className={`voteCount flex gap-1 sm:gap-5 items-center h-[60px]  rounded-[8px] mt-8 ${
                  item.party_name === "Republican"
                    ? "republic"
                    : item.party_name === "Democratic"
                    ? "democratic"
                    : "independent"
                }`}
              >
                <div
                  style={{
                    background: `${
                      item.party_name === "Republican"
                        ? "#ED1C24"
                        : item.party_name === "Democratic"
                        ? "#546BED"
                        : "white"
                    }`,
                  }}
                  className={`president-info relative px-1 sm:px-4  w-2/4 sm:w-1/4 h-full flex justify-between items-center rounded-l-lg `}
                >
                  <div className=" overflow-hidden w-[50px] h-[60px] overflow-y-hidden  ">
                    <img
                      className="w-full h-full object-cover"
                      src={`${imageUrl}${item.candidate_image}`}
                      alt=""
                    />
                  </div>
                  <p className="poppins4 w-[30%] sm:w-auto overflow-hidden whitespace-nowrap sm:whitespace-normal text-ellipsis">
                    {item.candidate_name.split(" ")[1]}
                  </p>
                  <div className="bg-whiteColor rounded-full flex justify-center items-center h-[30px] w-[30px] shadow-xl shadow-[#0000004d]">
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
                  <div className="w-[98%] h-[62px]  rounded-r-lg  flex flex-col justify-center ">
                    <div className="w-100 bg-[#454C72] rounded-[8px]">
                      <div
                        style={{
                          width: `${item.male_ratio}%`,
                          background: `${
                            item.party_name === "Republican"
                              ? "#ED1C24"
                              : item.party_name === "Democratic"
                              ? "#546BED"
                              : "white"
                          }`,
                        }}
                        className={` w-[80%] text-xs font-medium text-black-100 h-6 text-center p-1 pl-4 poppins5  leading-none rounded-[8px] flex items-center gap-5 `}
                      >
                        <div className="text-[#65D2E6] text-[15px] poppins4 italic flex items-center ">
                          <img src={male} alt="" />
                          Male
                        </div>
                        <p className="flex-1 text-center">
                          {" "}
                          {item.male_ratio}%
                        </p>
                      </div>
                    </div>
                    <div className="w-100 bg-[#454C72] rounded-[8px] mt-1">
                      <div
                        style={{
                          width: `${item.female_ratio}%`,
                          background: `${
                            item.party_name === "Republican"
                              ? "#ED1C24"
                              : item.party_name === "Democratic"
                              ? "#546BED"
                              : "white"
                          }`,
                        }}
                        className={` w-[80%] text-xs font-medium text-black-100 h-6 text-center p-1 pl-4 poppins5  leading-none rounded-[8px] flex items-center gap-5 `}
                      >
                        <div className="text-[#F0788C] text-[15px] poppins4 italic flex items-center ">
                          <img src={female} alt="" />
                          Female
                        </div>
                        <p className="flex-1 text-center">
                          {item.female_ratio}%
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <button
              className="absolute bottom-[-20px] left-[50%]"
              onClick={expendCandidate}
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
