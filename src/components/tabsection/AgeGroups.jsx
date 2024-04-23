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

export default function AgeGroups() {
  const [AgeGroup, setAgeGroup] = useState([]);
  useEffect(() => {
    axios
      .get("https://pankhay.com/thewhitehousegame/public/api/get_user_age")
      .then((response) => {
        // console.log("Age Group:", response.data.user_age);

        setAgeGroup(response.data.user_age);
      })
      .catch((error) => {
        console.error("Error fetching Age Group:", error);
      });
  }, []);



  const candidateData = [
    {
      name: "Kennedy",
      party: "independent",
      votes: "100",
      male: "83",
      female: "17",
    },
    {
      name: "Obama",
      party: "republican",
      votes: "140",
      male: "90",
      female: "50",
    },
    {
      name: "Sanders",
      party: "democratic",
      votes: "130",
      male: "110",
      female: "20",
    },
  ];
  const totalVotes = 345;
  const formerTotalVotes = 531;
  const percentages = candidateData.map((candidate, index) => {
    const currentpercentage = Math.round(
      (parseInt(candidate.votes, 10) / parseInt(totalVotes, 10)) * 100
    );
    const malepercentage = Math.round(
      (parseInt(candidate.lastVotes, 10) / parseInt(formerTotalVotes, 10)) * 100
    );
    const femalepercentage = Math.round(
      (parseInt(candidate.pollingStation, 10) /
        parseInt(formerTotalVotes, 10)) *
        100
    );

    return {
      name: candidate.name,
      party: candidate.party,
      votes: candidate.votes,
      malepercentage: malepercentage,
      currentpercentage: currentpercentage,
      femalepercentage: femalepercentage,
      percentageDifference: malepercentage - femalepercentage,
    };
  });
  return (
    <div>
      <div>
        <h2 className="orbit7 mt-8 text-whiteColor text-center w-[245px] flex justify-between items-center m-auto md:text-[60px]">
          <span>
            <img className="w-[50px]" src={stats} alt="" />{" "}
          </span>{" "}
          stats
        </h2>
        <p className="poppins5 text-whiteColor mb-4 text-center">
          Party support by age groups
        </p>
        <div className="search-section flex flex-col  sm:flex-row  justify-between my-16">
          <div className="badge flex items-center justify-between">
            <img src={badge} alt="" />
            <h2 className="poppins6 text-whiteColor md:text-[28px] lg:text-[36px] ms-3">
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
              className="bg-transparent border-[1px] poppins4 text-[14px] border-whiteColor w-[230px] lg:w-[420px] px-3 py-2 rounded-[10px] text-whiteColor"
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

<div className="searchBar flex flex-col ">
          <label
            htmlFor="search"
            className="text-whiteColor text-center poppins4 text-[14px]"
          >
            Select Age Group
          </label>
          <select
            name="states"
            id="search"
            className="bg-transparent border-[1px] poppins4 text-[14px] border-whiteColor w-[263px] lg:w-[420px] px-3 py-2 rounded-[10px] text-whiteColor"
          >
            <option className="bg-[#000]" value="">
              Select Age Group
            </option>
            {AgeGroup?.map((item) => (
              <option className="bg-[#000]" key={item.id} value={item?.range}>
                {item?.range}
              </option>
            ))}
          </select>
        </div>


          <div className="votes-count flex items-center justify-between sm:mt-0 mt-5">
            <img src={ballot} alt="ballot" />
            <h2 className="poppins6 text-whiteColor md:text-[28px] lg:text-[36px] ms-3">
              Votes : {totalVotes}
            </h2>
          </div>
        </div>
        <h2 className="text-[#fff] text-[36px] orbit7 w-9/12 m-auto my-12 text-center">
          Age 18-24
        </h2>
        <div className="stats relative py-2 px-4 bg-white/5 rounded-[10px] mt-8">
          <>
            {percentages.slice(0, 3).map((item, index) => (
              <div
                key={index}
                className={`voteCount ${
                  item.party === "republican"
                    ? "republic"
                    : item.party === "democratic"
                    ? "democratic"
                    : "independent"
                } flex gap-1 sm:gap-5 items-center h-[60px] rounded-[8px] my-8`}
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
                  className={`president-info relative px-1 sm:px-4  w-2/4 sm:w-1/4 h-full flex justify-between items-center rounded-l-lg `}
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
                    {item.percentageDifference}%
                  </p>
                  <div className=" rounded-full flex justify-center items-center h-[30px] w-[30px] ">
                    <img
                      className=" sm:w-auto"
                      src={item.percentageDifference > 0 ? up : down}
                      alt=""
                    />
                  </div>
                </div>
                <div className="president-votes w-3/4">
                  <div className="w-[98%] h-[62px]  rounded-r-lg  flex flex-col justify-center">
                    <div className="w-100 bg-[#454C72] rounded-[8px]">
                      <div
                        style={{
                          width: `${item.currentpercentage}%`,
                          background: `${
                            item.party === "republican"
                              ? "#546BED"
                              : item.party === "democratic"
                              ? "#ED1C24"
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
                          {item.currentpercentage}%{" "}
                        </p>
                      </div>
                    </div>
                    <div className="w-100 bg-[#454C72] rounded-[8px] mt-1">
                      <div
                        style={{
                          width: `${item.formerpercentage}%`,
                          background: `${
                            item.party === "republican"
                              ? "#546BED"
                              : item.party === "democratic"
                              ? "#ED1C24"
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
                          {item.formerpercentage}%
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </>
        </div>
        <h2 className="text-[#fff] text-[36px] orbit7 w-9/12 m-auto my-12 text-center">
          Age 25-44
        </h2>
        <div className="stats relative py-2 px-4 bg-white/5 rounded-[10px] mt-8">
          <>
            {percentages.slice(0, 3).map((item, index) => (
              <div
                key={index}
                className={`voteCount ${
                  item.party === "republican"
                    ? "republic"
                    : item.party === "democratic"
                    ? "democratic"
                    : "independent"
                } flex gap-1 sm:gap-5 items-center h-[60px] rounded-[8px] my-8`}
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
                  className={`president-info relative px-1 sm:px-4  w-2/4 sm:w-1/4 h-full flex justify-between items-center rounded-l-lg `}
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
                    {item.percentageDifference}%
                  </p>
                  <div className=" rounded-full flex justify-center items-center h-[30px] w-[30px] ">
                    <img
                      className=" sm:w-auto"
                      src={item.percentageDifference > 0 ? up : down}
                      alt=""
                    />
                  </div>
                </div>
                <div className="president-votes w-3/4">
                  <div className="w-[98%] h-[62px]  rounded-r-lg  flex flex-col justify-center">
                    <div className="w-100 bg-[#454C72] rounded-[8px]">
                      <div
                        style={{
                          width: `${item.currentpercentage}%`,
                          background: `${
                            item.party === "republican"
                              ? "#546BED"
                              : item.party === "democratic"
                              ? "#ED1C24"
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
                          {item.currentpercentage}%{" "}
                        </p>
                      </div>
                    </div>
                    <div className="w-100 bg-[#454C72] rounded-[8px] mt-1">
                      <div
                        style={{
                          width: `${item.formerpercentage}%`,
                          background: `${
                            item.party === "republican"
                              ? "#546BED"
                              : item.party === "democratic"
                              ? "#ED1C24"
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
                          {item.formerpercentage}%
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </>
        </div>
        <h2 className="text-[#fff] text-[36px] orbit7 w-9/12 m-auto my-12 text-center">
          Age 45-64
        </h2>
        <div className="stats relative py-2 px-4 bg-white/5 rounded-[10px] mt-8">
          <>
            {percentages.slice(0, 3).map((item, index) => (
              <div
                key={index}
                className={`voteCount ${
                  item.party === "republican"
                    ? "republic"
                    : item.party === "democratic"
                    ? "democratic"
                    : "independent"
                } flex gap-1 sm:gap-5 items-center h-[60px] rounded-[8px] my-8`}
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
                  className={`president-info relative px-1 sm:px-4  w-2/4 sm:w-1/4 h-full flex justify-between items-center rounded-l-lg `}
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
                    {item.percentageDifference}%
                  </p>
                  <div className=" rounded-full flex justify-center items-center h-[30px] w-[30px] ">
                    <img
                      className=" sm:w-auto"
                      src={item.percentageDifference > 0 ? up : down}
                      alt=""
                    />
                  </div>
                </div>
                <div className="president-votes w-3/4">
                  <div className="w-[98%] h-[62px]  rounded-r-lg  flex flex-col justify-center">
                    <div className="w-100 bg-[#454C72] rounded-[8px]">
                      <div
                        style={{
                          width: `${item.currentpercentage}%`,
                          background: `${
                            item.party === "republican"
                              ? "#546BED"
                              : item.party === "democratic"
                              ? "#ED1C24"
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
                          {item.currentpercentage}%{" "}
                        </p>
                      </div>
                    </div>
                    <div className="w-100 bg-[#454C72] rounded-[8px] mt-1">
                      <div
                        style={{
                          width: `${item.formerpercentage}%`,
                          background: `${
                            item.party === "republican"
                              ? "#546BED"
                              : item.party === "democratic"
                              ? "#ED1C24"
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
                          {item.formerpercentage}%
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </>
        </div>
        <h2 className="text-[#fff] text-[36px] orbit7 w-9/12 m-auto my-12 text-center">
          Age 65+
        </h2>
        <div className="stats relative py-2 px-4 bg-white/5 rounded-[10px] mt-8">
          <>
            {percentages.slice(0, 3).map((item, index) => (
              <div
                key={index}
                className={`voteCount ${
                  item.party === "republican"
                    ? "republic"
                    : item.party === "democratic"
                    ? "democratic"
                    : "independent"
                } flex gap-1 sm:gap-5 items-center h-[60px] rounded-[8px] my-8`}
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
                  className={`president-info relative px-1 sm:px-4  w-2/4 sm:w-1/4 h-full flex justify-between items-center rounded-l-lg `}
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
                    {item.percentageDifference}%
                  </p>
                  <div className=" rounded-full flex justify-center items-center h-[30px] w-[30px] ">
                    <img
                      className=" sm:w-auto"
                      src={item.percentageDifference > 0 ? up : down}
                      alt=""
                    />
                  </div>
                </div>
                <div className="president-votes w-3/4">
                  <div className="w-[98%] h-[62px]  rounded-r-lg  flex flex-col justify-center">
                    <div className="w-100 bg-[#454C72] rounded-[8px]">
                      <div
                        style={{
                          width: `${item.currentpercentage}%`,
                          background: `${
                            item.party === "republican"
                              ? "#546BED"
                              : item.party === "democratic"
                              ? "#ED1C24"
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
                          {item.currentpercentage}%{" "}
                        </p>
                      </div>
                    </div>
                    <div className="w-100 bg-[#454C72] rounded-[8px] mt-1">
                      <div
                        style={{
                          width: `${item.formerpercentage}%`,
                          background: `${
                            item.party === "republican"
                              ? "#546BED"
                              : item.party === "democratic"
                              ? "#ED1C24"
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
                          {item.formerpercentage}%
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </>
        </div>
      </div>
    </div>
  );
}
