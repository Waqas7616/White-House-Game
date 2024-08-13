import React, { useEffect, useState } from "react";
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
import axios from "axios";

export default function CountryOfBirth() {
  const imageUrl = "https://app.thewhitehousegame.com/api/";

  const [CountryBirth, setCountryBirth] = useState([]);
  const [countryOfBirth, setCountryOfBirth] = useState([]);
  const [president, setPresident] = useState([]);
  const [id, setId] = useState(187);

  useEffect(() => {
    axios
      .get("https://app.thewhitehousegame.com/api/get_all_user_country_birth")
      .then((response) => {
        //   console.log("Age Group:", response.data.user_country_birth
        // );

        setCountryBirth(response.data.user_country_birth);
      })
      .catch((error) => {
        console.error("Error fetching Country Birth:", error);
      });
  }, []);

  useEffect(() => {
    const ParamBody = new URLSearchParams({
      user_country_birth_id: id,
    });
    axios
      .get(`https://app.thewhitehousegame.com/api/filter?${ParamBody}`, {
        headers: {
          Accept: "application/json",
        },
      })
      .then((res) => {
        setCountryOfBirth(res.data);
        setPresident(
          res.data.data.candidate_percentages
            .filter((item) => item.position === "president")
            .sort((a, b) => b.percentage - a.percentage)
        );
      })
      .catch((err) => {
        console.error("Error:", err);
      });
  }, [id]);
  const handleId = (selectedId) => {
    setId(selectedId);
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
        Party support by country of birth
      </p>
      <div className="search-section flex flex-col  sm:flex-row  justify-center my-16">
        <div className="searchBar flex flex-col ">
          <label
            htmlFor="search"
            className="text-whiteColor text-center poppins4 text-[14px] mb-2"
          >
            Select Country Of Birth
          </label>
          <div className="bg-transparent border-[1px] poppins4 text-[14px] ml-8 md:ml-0 border-whiteColor w-[226px] md:w-[263px] lg:w-[420px] px-2 py-2 rounded-[10px] text-whiteColor">
            <select
              onChange={(e) => {
                const selectedName = e.target.value;
                const selectedId = CountryBirth.find(
                  (item) => item.name === selectedName
                )?.id;
                handleId(selectedId);
              }}
              name="states"
              id="search"
              className="bg-transparent w-full outline-none"
            >
              {CountryBirth?.map((item) => (
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
      </div>
      <div className="stats relative py-5 px-4 bg-white/5 rounded-[10px] mt-8">
        {president.length === 0 ? (
          <p className="poppins5 text-center text-white">
            No one from this country has made predictions yet
          </p>
        ) : (
          president.map((item, index) => (
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
                className={`president-info relative ${
                  item.party_name === "Republican"
                    ? "bg-redish"
                    : item.party_name === "Democratic"
                    ? "bg-[#546BED]"
                    : "bg-whiteColor"
                } px-1 sm:px-4  w-2/4 sm:w-1/4 h-full flex justify-between items-center rounded-l-lg`}
              >
                <div className=" overflow-hidden overflow-y-hidden w-[50px] h-[60px] ">
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
                        ? democrat
                        : item.party_name === "Democratic"
                        ? republic
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
