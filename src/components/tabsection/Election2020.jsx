import React, { useState } from "react";
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

export default function Election2020() {
  const [expendedCandidates, setExpandedCandidates] = useState(false);
  const expendCandidate = () => {
    setExpandedCandidates(!expendedCandidates);
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
      2020 Election 2024
      </p>
      <p className="text-center poppins3 text-whiteColor text-[14px]">What our app voters are predicting</p>
      <div className="search-section text-center">
        <div className="votes-count flex items-center justify-end">
          <img src={ballot} alt="ballot" />
          <h2 className="poppins6 text-whiteColor md:text-[36px] ms-3">
            Votes : {totalVotes}
          </h2>
        </div>
        <h2 className="text-[#fff] text-[14px] md:text-[36px] orbit7 w-9/12 m-auto my-8">
          Who’s up and who’s down comparing last election to this year’s
          intentions
        </h2>
      </div>
      <div className="stats relative py-2 px-4 bg-white/5 rounded-[10px] mt-8">
        <>
          {percentages.slice(0, 3).map((item, index) => (
            <div
              key={index}
              className={`voteCount ${item.party==='republican'?'republic':item.party==='democratic'?'democratic':'independent'} flex gap-1 sm:gap-5 items-center h-[60px] rounded-[8px] my-8`}
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
                <p className="poppins4 w-[30%] sm:w-auto text-[10px] sm:text-[12px] lg:[14px] xl:[22px] pl-1 sm:pl-0">
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
                        {2020}
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
                        {2024}
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
      <h2 className="text-[#fff] text-[14px] md:text-[36px] orbit7 w-9/12 m-auto my-12 text-center">
        Who voted at a polling station on election day 2020
      </h2>
      <div className="stats relative py-2 px-4 bg-white/5 rounded-[10px] mt-8">
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
              className={`president-info relative  px-1 sm:px-4  w-2/4 sm:w-1/4 h-full flex gap-1 xl:gap-10 items-center rounded-l-lg`}
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
              <p className="poppins4 w-[30%] sm:w-auto text-[10px] sm:text-[12px] lg:[14px] xl:[22px] pl-1 sm:pl-0">
                {item.party}
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
      </div>
      <h2 className="text-[#fff] text-[14px] md:text-[36px] orbit7 w-9/12 m-auto my-12 text-center">
        Who voted using a Mail-in ballot or drop-box in 2020
      </h2>
      <div className="stats relative py-2 px-4 bg-white/5 rounded-[10px] mt-8">
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
              className={`president-info relative  px-1 sm:px-4  w-2/4 sm:w-1/4 h-full flex gap-1 xl:gap-10 items-center rounded-l-lg`}
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
              <p className="poppins4 w-[30%] sm:w-auto text-[10px] sm:text-[12px] lg:[14px] xl:[22px] pl-1 sm:pl-0">
                {item.party}
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
      </div>
    </div>
  );
}
