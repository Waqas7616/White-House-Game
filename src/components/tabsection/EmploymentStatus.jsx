import React, { useEffect, useState } from "react";
import "../banner.css";

import stats from "../../images/stats.png";

import independ from "../../images/independent.png";
import democrat from "../../images/democrat.png";
import republic from "../../images/republican.png";

import axios from "axios";

export default function EmploymentStatus() {
  const [Employment, setEmployment] = useState([]);
  const [id, setId] = useState(1);
  const [employmentStatus, setEmploymentStatus] = useState([]);

  useEffect(() => {
    axios
      .get("https://app.thewhitehousegame.com/api/get_all_user_employement")
      .then((response) => {
        setEmployment(response.data.user_employement);
      })
      .catch((error) => {});
  }, []);
  // console.log('employment',Employment)
  useEffect(() => {
    const ParamBody = new URLSearchParams({
      user_employement_id: id,
    });
    axios
      .get(`https://app.thewhitehousegame.com/api/filter?${ParamBody}`, {
        headers: {
          Accept: "application/json",
        },
      })
      .then((res) => {
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
        Party support by employment status
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
            htmlFor="search"
            className="text-whiteColor text-center poppins4 text-[14px] mb-2"
          >
            Select Employment Status
          </label>
          <div className="bg-transparent border-[1px] poppins4 text-[14px] ml-8 md:ml-0 border-whiteColor w-[226px] md:w-[263px] lg:w-[420px] px-2 py-2 rounded-[10px] text-whiteColor">
            <select
              onChange={(e) => {
                const selectedName = e.target.value;
                const selectedId = Employment.find(
                  (item) => item.employement_status === selectedName
                )?.id;
                handleId(selectedId);
              }}
              name="states"
              id="search"
              className="bg-transparent w-full outline-none"
            >
              {Employment?.map((item) => (
                <option
                  className="bg-[#1c2452]"
                  key={item.id}
                  value={item?.employement_status}
                >
                  {item?.employement_status}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* <div className="searchBar flex flex-col ">
            <label
              htmlFor="search "
              className="text-whiteColor text-center poppins4 text-[14px]"
            >
              Select Language
            </label>
            <select
              name="states"
              id="search"
              className="bg-transparent border-[1px] poppins4 text-[14px] border-whiteColor w-[263px] lg:w-[420px] px-3 py-2 rounded-[10px] text-whiteColor"
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

        {/* <div className="votes-count flex items-center justify-between">
            <img src={ballot} alt="ballot" />
            <h2 className="poppins6 text-whiteColor md:text-[36px] ms-3">
              Votes : {totalVotes}
            </h2>
          </div> */}
      </div>
      <div className="stats relative py-2 px-4 bg-white/5 rounded-[10px] mt-8">
        {employmentStatus?.data?.party_percentages.length === 0 ? (
          <p className="text-white text-center poppins5">
            No data for this employment status yet
          </p>
        ) : (
          employmentStatus?.data?.party_percentages
            .slice(0, 3)
            .map((item, index) => (
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
                        ? "#ED1C24"
                        : item.party_name === "Democratic"
                        ? "#546BED"
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
                          ? democrat
                          : item.party_name === "Democratic"
                          ? republic
                          : independ
                      }
                      alt=""
                    />
                  </div>
                  <p className="poppins4 w-[30%] sm:w-auto text-[10px] sm:text-[12px] md:text-[13px] xl:text-[22px]">
                    {item.party_name && item.party_name.split("(")[0]}
                  </p>
                  {/* <div className="bg-whiteColor rounded-full flex justify-center items-center h-[30px] w-[30px]">
                <img
                  className="w-[20px] sm:w-auto"
                  src={
                    item.party_name === "republican"
                      ? republic
                      : item.party_name === "democratic"
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
                            ? "#546BED"
                            : item.party_name === "Republican"
                            ? "#ED1C24"
                            : "white"
                        }`,
                      }}
                      className={`text-xs font-medium text-black-100 h-full text-center p-2 poppins5  leading-none rounded-[8px] `}
                    >
                      {" "}
                      {item.percentage.toFixed(1)}%
                    </div>
                  </div>
                </div>
              </div>
            ))
        )}
      </div>
    </div>
  );
}
