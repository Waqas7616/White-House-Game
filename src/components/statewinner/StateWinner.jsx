import React, { useEffect, useState } from "react";
import axios from "axios";
import Democraticlogo from "../../images/Democraticlogo.png";
import Independentlogo from "../../images/Independentlogo.png";
import Republicanlogo from "../../images/Republicanlogo.png";
import { useLocation } from "react-router-dom";

const StateWinner = () => {
  const location = useLocation();
  const [statesData, setStatesData] = useState([]);
  const [originalData, setOriginalData] = useState({});
  const [newData,setNewData]=useState({})

  const ImageUrl = "https://thewhitehousegame.com/api/public/";

  useEffect(() => {
    axios
      .get("https://thewhitehousegame.com/api/public/api/getVoterPartyCount", {
        headers: {
          Accept: "application/json",
        },
      })
      .then((res) => {
        setOriginalData(res.data.data_of_2020.data);
        setNewData(res?.data?.data)
        const parsedData = [];

        for (const state in res.data.data) {
          const parties = res.data.data[state];
          const stateParties = Object.entries(parties).map(
            ([party_name, count]) => ({
              party_name: party_name,
              count: count,
            })
          );
          parsedData.push({
            state: state,
            parties: stateParties,
            electricalCollege: parties.electrical_collage,
            map_url: parties.map_url,
          });
        }

        parsedData.sort((a, b) => a.state.localeCompare(b.state));

        setStatesData(parsedData);
      })
      .catch((err) => {
        console.log("Error fetching data:", err);
      });
  }, []);

  const filteredArray = statesData.filter((state) => state.state !== "USA");

  return (
    <>
      <div className="m-auto w-10/12">
        <div className="text-center">
          <h2 className="text-[#fff] text-[14px] md:text-[36px] orbit7 w-9/12 m-auto mt-3 text-center">
            State Winners
          </h2>
        </div>
        <div className="flex justify-center mb-9 ">
          <h2 className="text-[#fff] text-[9px] md:text-[14px] orbit7 w-9/12 m-auto  text-center">
            {location.pathname === "/"
              ? "What our players are predicting"
              : "Who you are predicting will win"}{" "}
          </h2>
        </div>
        <div
          className="overflow-y-scroll h-[20rem] lg:h-[45rem] rounded-xl bg-[#272f5b] mt-5"
          style={{ scrollbarWidth: "thin", scrollbarColor: "#FFFFFF #272f5b" }}
        >
          <table className="text-sm text-center w-full">
            <thead
              className="text-[40px] text-white  bg-[#272f5b] sticky top-0 "
              style={{ zIndex: 1 }}
            >
              <tr className="bg-[#272f5b] border-b-2 dark:bg-gray-800 dark:border-gray-700">
                <th className="px-6 orbit7 py-3 lg:py-10 text-[9px] lg:text-[22px]">
                  <div className="flex justify-center items-center">
                    <span>2020 Winner</span>
                  </div>
                </th>
                <th className="px-6 orbit7 py-3 lg:py-10 text-[9px] lg:text-[25px]">
                  <div className="flex justify-center items-center ">
                    <span>State</span>
                  </div>
                </th>
                <th className="px-6 orbit7 py-3 lg:py-10 text-[9px] lg:text-[22px]">
                  <div className="flex justify-center items-center">
                    <span>
                      {location.pathname === "/"
                        ? "2024 Prediction"
                        : "Your Prediction"}
                    </span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="w-full">
              {filteredArray.map((stateData, index) => (
                <tr
                  key={index}
                  className="even:bg-blue-gray-50/50 bg-[#272f5b] border-b  text-white "
                >
                  <td className="px-6 py-3 lg:py-10  flex justify-center items-center gap-5 ">
                    {originalData[stateData.state] &&
                      originalData[stateData.state].winning_party ===
                        "Democratic" && (
                        <span className="bg-white rounded-full p-2 w-[30px] h-[30px] md:w-[45px] md:h-[45px] flex justify-center items-center">
                          <img
                            loading="lazy"
                            className=" w-4 h-4 lg:w-6 lg:h-6"
                            src={Democraticlogo}
                            alt="Democratic"
                          />
                        </span>
                      )}
                    {originalData[stateData.state] &&
                      originalData[stateData.state].winning_party ===
                        "Republican" && (
                        <span className="bg-white rounded-full p-2 w-[30px] h-[30px] md:w-[45px] md:h-[45px] flex justify-center items-center">
                          <img
                            loading="lazy"
                            className="w-4 h-4 lg:w-7 lg:h-7"
                            src={Republicanlogo}
                            alt="Republican"
                          />
                        </span>
                      )}
                    {originalData[stateData.state] &&
                      originalData[stateData.state].winning_party ===
                        "Independent" && (
                        <span className="bg-white rounded-full p-1 w-[30px] h-[30px] md:w-[45px] md:h-[45px] flex justify-center items-center">
                          <img
                            loading="lazy"
                            className="w-4 h-4 lg:w-8 lg:h-8"
                            src={Independentlogo}
                            alt="Independent('Kennedy')"
                          />
                        </span>
                      )}
                    <span className="text-white font-poppins font-medium text-[9px] lg:text-[19px]">
                      {originalData[stateData.state] &&
                        originalData[stateData.state].winning_party}
                    </span>
                  </td>

                  <td className="px-6 py-3 lg:py-1 ml-6 ">
                    <div className="flex items-center justify-center  gap-3">
                      <span className="w-14 h-14 flex items-center object-cover">
                        {stateData.map_url ? (
                          <img
                            loading="lazy"
                            src={`${ImageUrl}${stateData.map_url}`}
                            alt={`${stateData.state} State Winner`}
                          />
                        ) : (
                          <p>No image available</p>
                        )}
                      </span>
                      <span className="font-medium font-poppins text-[9px] lg:text-[27px] text-white truncate py-3 ">
                        {stateData.state.split("(")[0].trim()}
                        {/* {stateData.state.includes(
                          "Nebraska Congressional District 2"
                        )
                          ? "District 2"
                          : stateData.state.split("(")[0].trim()} */}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-3 lg:py-10 flex-1">
                    <span className="mr-2 lg:mr-4 flex items-center justify-center">
                      {newData[stateData.state].winning_party === "Democratic" && (
                        <div className="flex items-center gap-3">
                          <span className="text-white font-poppins font-medium text-[9px] lg:text-[19px]">
                          {newData[stateData.state].winning_party}
                          </span>
                          <span className="bg-white rounded-full p-2 w-[30px] h-[30px] md:w-[45px] md:h-[45px] flex justify-center items-center">
                            <img
                              loading="lazy"
                              className=" w-4 h-4 lg:w-7 lg:h-7 "
                              src={Democraticlogo}
                              alt="Democratic"
                            />
                          </span>
                        </div>
                      )}
                      {newData[stateData.state].winning_party === "Republican" && (
                        <div className="flex items-center gap-3">
                          <span className="text-white font-poppins font-medium text-[9px] lg:text-[19px] ">
                          {newData[stateData.state].winning_party}
                          </span>
                          <span className="bg-white rounded-full p-2 w-[30px] h-[30px] md:w-[45px] md:h-[45px] flex justify-center items-center">
                            <img
                              loading="lazy"
                              className="w-4 h-4 lg:w-7 lg:h-7"
                              src={Republicanlogo}
                              alt="Republican"
                            />
                          </span>
                        </div>
                      )}
                      {newData[stateData.state].winning_party === "Independent('Kennedy')" && (
                        <div className="flex items-center gap-3">
                          <span className="text-white font-poppins font-medium text-[9px] lg:text-[19px]">
                            {newData[stateData.state].winning_party.split('(')[0]}
                          </span>
                          <span className="bg-white rounded-full p-1 w-[30px] h-[30px] md:w-[45px] md:h-[45px] flex justify-center items-center">
                            <img
                              loading="lazy"
                              className="w-4 h-4 lg:w-8 lg:h-8"
                              src={Independentlogo}
                              alt="Independent('Kennedy')"
                            />
                          </span>
                        </div>
                      )}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default StateWinner;
