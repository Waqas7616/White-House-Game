import React, { useEffect, useState } from "react";
import "../banner.css";
import kennedy from "../../images/image 46.png";
import stats from "../../images/stats.png";
import badge from "../../images/president.png";
import ballot from "../../images/ballot.png";
import male from "../../images/Condidates/Male.png";
import female from "../../images/Condidates/Female.png";
import independ from "../../images/independent.png";
import democrat from "../../images/democrat.png";
import republic from "../../images/republican.png";
import up from "../../images/greenarrow.png";
import down from "../../images/redarrow.png";
import axios from "axios";

export default function Military() {
  const [id, setId] = useState(1);
  const [employmentStatus, setEmploymentStatus] = useState([]);
  useEffect(() => {
    const ParamBody = new URLSearchParams({
      is_veteran: "yes",
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
        console.log("employment response :", res.data);
        setEmploymentStatus(res.data);
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
          votes: "100",
          lastVotes: "283",
          pollingStation: "50",
        },
        {
          name: "Obama",
          party: "republican",
          votes: "140",
          lastVotes: "99",
          pollingStation: "30",
        },
        {
          name: "Sanders",
          party: "democratic",
          votes: "5",
          lastVotes: "149",
          pollingStation: "20",
        },
      ];
      const totalVotes = 345;
      const formerTotalVotes = 531;
      const percentages = candidateData.map((candidate, index) => {
        const currentpercentage = Math.round(
          (parseInt(candidate.votes, 10) / parseInt(totalVotes, 10)) * 100
        );
        const formerpercentage = Math.round(
          (parseInt(candidate.lastVotes, 10) / parseInt(formerTotalVotes, 10)) * 100
        );
        const pollingpercentage = Math.round(
          (parseInt(candidate.pollingStation, 10) /
            parseInt(formerTotalVotes, 10)) *
            100
        );
    
        return {
          name: candidate.name,
          party: candidate.party,
          votes: candidate.votes,
          pollingStation: pollingpercentage,
          currentpercentage: currentpercentage,
          formerpercentage: formerpercentage,
          percentageDifference: formerpercentage - currentpercentage,
        };
      });
  return (
    <div>
       <h2 className="orbit7 mt-8 text-whiteColor text-center w-[245px] flex justify-between items-center m-auto md:text-[60px]">
          <span>
            <img className="w-[50px]" src={stats} alt="" />{" "}
          </span>{" "}
          stats
        </h2>
        <p className="poppins5 text-whiteColor mb-4 text-center">
        Party support within the military
        </p>
        
        <div className="search-section flex flex-col  sm:flex-row  justify-center my-16">
          {/* <div className="badge flex items-center justify-between">
            <img src={badge} alt="" />
            <h2 className="poppins6 text-whiteColor md:text-[36px] ms-3">
              President
            </h2>
          </div> */}
          <div className="searchBar flex flex-col ">
            <label
              htmlFor="search "
              className="text-whiteColor text-center poppins4 text-[14px]"
            >
              Select Language
            </label>
            <select
              name="states"
              id="search"
              className="bg-transparent border-[1px] poppins4 text-[14px] ml-8 md:ml-0 mt-3 md:mt-0 border-whiteColor w-[226px] sm:w-[263px] lg:w-[420px] px-3 py-2 rounded-[10px] text-whiteColor"
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
          {/* <div className="votes-count flex items-center justify-between">
            <img src={ballot} alt="ballot" />
            <h2 className="poppins6 text-whiteColor md:text-[36px] ms-3">
              Votes : {totalVotes}
            </h2>
          </div> */}
        </div>
        {/* <h2 className="text-[#fff] text-[36px] orbit7 w-9/12 m-auto my-12 text-center">
        Serving military
        </h2> */}
      {/* <div className="stats relative py-2 px-4 bg-white/5 rounded-[10px] mt-8">
        {percentages.slice(0, 3).map((item, index) => (
          <div
            key={index}
            className={`voteCount flex gap-1 sm:gap-5 items-center h-[60px] ${
              item.party === "republican"
                ? "republic"
                : item.party === "democratic"
                ? "democratic"
                : "independent"
            } rounded-[8px] my-8`}
          >
            <div
              style={{
                background: `${
                  item.party === "republican"
                    ? "#546BED"
                    : item.party === "democratic"
                    ? "#ED1C24"
                    : "white"
                }`,
              }}
              className={`president-info relative  px-1 sm:px-4  w-2/4 sm:w-1/4 h-full flex gap-20 items-center rounded-l-lg`}
            >
              <div className="bg-whiteColor rounded-full flex justify-center items-center h-[30px] w-[30px] shadow-xl shadow-[#0000004d]">
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
              <p className="poppins4 w-[30%] sm:w-auto overflow-hidden whitespace-nowrap sm:whitespace-normal text-ellipsis">
                {item.party}
              </p>
              
            </div>
            <div className="president-votes w-3/4">
              <div className="w-[98%] h-[31px] bg-[#454C72] rounded-[8px] dark:bg-gray-700">
                <div
                  style={{
                    width: `${item.pollingStation}%`,
                    background: `${
                      item.party === "democratic"
                        ? "#ED1C24"
                        : item.party === "republican"
                        ? "#546BED"
                        : "white"
                    }`,
                  }}
                  className={`text-xs font-medium text-black-100 h-full text-center p-2 poppins5  leading-none rounded-[8px] `}
                >
                  {" "}
                  {item.pollingStation}%
                </div>
              </div>
            </div>
          </div>
        ))}
      </div> */}

      <h2 className="text-[#fff] text-[14px] md:text-[36px] orbit7 w-9/12 m-auto my-12 text-center">
      Military Veterans
        </h2>
      <div className="stats relative py-2 px-4 bg-white/5 rounded-[10px] mt-8">
        {employmentStatus?.data?.party_percentages.map((item, index) => (
          <div
            key={index}
            className={`voteCount flex gap-1 sm:gap-5 items-center h-[60px] ${
              item.party_name === "Republican"
                ? "republic"
                : item.party_name === "Democratic"
                ? "democratic"
                : "independent"
            } rounded-[8px] my-8`}
          >
            <div
              style={{
                background: `${
                  item.party_name === "Republican"
                    ? "#546BED"
                    : item.party_name === "Democratic"
                    ? "#ED1C24"
                    : "white"
                }`,
              }}
              className={`president-info relative  px-1 sm:px-4  w-2/4 sm:w-1/4 h-full flex gap-2 xl:gap-10 items-center rounded-l-lg`}
            >
              <div className="bg-whiteColor rounded-full flex justify-center items-center h-[30px] w-[30px] shadow-xl shadow-[#0000004d]">
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
              <p className="poppins4 w-[30%] sm:w-auto text-[10px] sm:text-[12px] md:text-[13px] xl:text-[22px] sm:whitespace-normal text-ellipsis">
              {item.party_name.split('(')[0]}
              </p>
              {/* <div className="bg-whiteColor rounded-full flex justify-center items-center h-[30px] w-[30px]">
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
              </div> */}
            </div>
            <div className="president-votes w-3/4">
              <div className="w-[98%] h-[31px] bg-[#454C72] rounded-[8px] dark:bg-gray-700">
                <div
                  style={{
                    width: `${item.percentage}%`,
                    background: `${
                      item.party_name === "Democratic"
                        ? "#ED1C24"
                        : item.party_name === "Republican"
                        ? "#546BED"
                        : "white"
                    }`,
                  }}
                  className={`text-xs font-medium text-black-100 h-full text-center p-2 poppins5  leading-none rounded-[8px] `}
                >
                  {" "}
                  {item.percentage}%
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
