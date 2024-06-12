import React, { useEffect, useState } from "react";
import { Card, Typography } from "@material-tailwind/react";
// import democrat from "../../images/democrat.png";
import flag from "../../images/flag.png";
import axios from "axios";
import Democraticlogo from "../../images/Democraticlogo.png";
import Independentlogo from "../../images/Independentlogo.png";
import Republicanlogo from "../../images/Republicanlogo.png";
import { useLocation } from "react-router-dom";

const TABLE_HEAD = ["2020", "State", "2024"];

// const StateWinner = () => {
//   const [statesData, setStatesData] = useState([]);
//   const [originalData, setOriginalData] = useState({});

//   useEffect(() => {
//     axios
//       .get("http://thewhitehousegame.com/public/api/getVoterPartyCount", {
//         headers: {
//           Accept: "application/json",
//         },
//       })
//       .then((res) => {
//         console.log("state result data:", res.data.data);
//         setOriginalData(res.data.data);
//         const parsedData = [];

//         for (const state in res.data.data) {
//           const parties = res.data.data[state];

//           const stateParties = Object.entries(parties).map(
//             ([party_name, count]) => ({
//               party_name: party_name,
//               count: count,
//             })
//           );

//           parsedData.push({
//             state: state,
//             parties: stateParties,
//           });
//         }

//         parsedData.sort((a, b) => a.state.localeCompare(b.state));

//         setStatesData(parsedData);
//       })
//       .catch((err) => {
//         console.log("Error fetching data:", err);
//       });
//   }, []);
//   console.log("hamzaaa123", statesData);
//   console.log("original data;", originalData);

//   const voteCount = (state) => {
//     if (originalData[state]) {
//       const parties = Object.keys(originalData[state]);
//       const count = Object.values(originalData[state]);

//       const maxCount = Math.max(...count);
//       const largeIndex = count.indexOf(maxCount);
//       const largeParty = parties[largeIndex];
//       const electricalCollege = originalData[state].electrical_collage; // Access electrical_collage
//       const sliced = count.slice(1, largeIndex);

//       return {
//         largeParty,
//         maxCount,
//         electricalCollege,
//         parties,
//         count,
//         sliced,
//       };
//     }
//     return {};
//   };
//   console.log(voteCount("Georgia").sliced);
//   return (
//     <>
//       <div className="resp m-auto w-10/12">
//         <div className="text-center">
//           <h2 className="text-[#fff] text-[14px] md:text-[36px] orbit7 w-9/12 m-auto my-12 text-center">
//             State Winner
//           </h2>
//         </div>
//         <div
//           className="overflow-y-scroll h-[20rem] lg:h-[45rem] rounded-xl bg-[#272f5b] mt-5"
//           style={{ scrollbarWidth: "thin", scrollbarColor: "#FFFFFF #272f5b" }}
//         >
//           <table className="text-sm text-center w-full">
//             {/* Table Header */}
//             <thead
//               className="text-[40px] text-white uppercase bg-[#272f5b]  sticky top-0"
//               style={{ zIndex: 1 }}
//             >
//               <tr className="bg-[#272f5b]  border-b-2 dark:bg-gray-800 dark:border-gray-700">
//                 <th className="px-6 py-3 lg:py-10 text-[9px] lg:text-[22px]">
//                   2020
//                 </th>
//                 <th className="px-6 py-3 lg:py-10 text-[9px] lg:text-[22px]">
//                   State
//                 </th>
//                 <th className="px-6 py-3 lg:py-10 text-[9px] lg:text-[22px]">
//                   2024
//                 </th>
//               </tr>
//             </thead>
//             {/* Table Body */}
//             <tbody className="">
//               {statesData.map((stateData, index) => (
//                 <tr
//                   key={index}
//                   className="even:bg-blue-gray-50/50 bg-[#272f5b] border-b border-[rgba(255,255,255,.2)] dark:bg-gray-800 dark:border-gray-700"
//                 >
//                   <td className="p-4 flex items-center justify-center py-1 lg:py-10">
//                     <Typography
//                       variant="small"
//                       color="blue-gray"
//                       className="text-white text-center font-poppins font-medium text-[9px] lg:text-[22px]"
//                     >
//                       {stateData.parties.party_name}
//                     </Typography>
//                   </td>
//                   <td className="p-4">
//                     <Typography
//                       variant="small"
//                       color="blue-gray"
//                       className="font-medium font-poppins text-[9px] lg:text-[22px] text-white text-center"
//                     >
//                       {stateData.state}
//                     </Typography>
//                   </td>
//                   <td className="p-4 flex justify-center items-center text-center">
//                     {/* Display party logo based on party name */}
//                     {stateData.parties[0].party_name === "Democratic" && (
//                       <img
//                         className="object-cover w-4 h-4 lg:w-10 lg:h-10"
//                         src={Republicanlogo}
//                         alt="Democratic"
//                       />
//                     )}
//                     {stateData.parties[0].party_name === "Republican" && (
//                       <img
//                         className="w-5 h-5 lg:w-10 lg:h-10"
//                         src={Democraticlogo}
//                         alt="Republican"
//                       />
//                     )}
//                     {stateData.parties[0].party_name ===
//                       "Independent('Kennedy')" && (
//                       <img
//                         className="w-5 h-5 lg:w-10 lg:h-10"
//                         src={Independentlogo}
//                         alt="Independent('Kennedy')"
//                       />
//                     )}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </>
//   );
// };

// export default StateWinner;

const StateWinner = () => {
  const location = useLocation();
  const [statesData, setStatesData] = useState([]);
  const [originalData, setOriginalData] = useState({});
  const [step, setStep] = useState("");

  const ImageUrl = "https://thewhitehousegame.com/public/";

  useEffect(() => {
    axios
      .get("https://thewhitehousegame.com/public/api/getVoterPartyCount", {
        headers: {
          Accept: "application/json",
        },
      })
      .then((res) => {
        console.log("state result data:", res.data.data_of_2020.original.data);
        setOriginalData(res.data.data_of_2020.original.data);
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
            electricalCollege: parties.electrical_collage, // electrical collage ko include karna
            map_url: parties.map_url, // state image url ko include karna
          });
        }

        parsedData.sort((a, b) => a.state.localeCompare(b.state));

        setStatesData(parsedData);
      })
      .catch((err) => {
        console.log("Error fetching data:", err);
      });
  }, []);
  console.log("hamzaaa123", statesData);
  console.log("original data;", originalData);

  const getLeadingParty = (parties) => {
    if (!parties || parties.length === 0) return "";
    return parties
      .reduce((prev, current) => (prev.count > current.count ? prev : current))
      .party_name.split("(")[0]
      .trim();
  };

  return (
    <>
      {/* <div className="m-auto w-10/12">
        <div className="text-center">
          <h2 className="text-[#fff] text-[14px] md:text-[36px] orbit7 w-9/12 m-auto mt-3 text-center">
            State Winners
          </h2>
        </div>
        <div className="flex justify-center mb-9 ">
          <h2 className="text-[#fff] text-[9px] md:text-[14px] orbit7 w-9/12 m-auto  text-center">
            What our players are predicting{" "}
          </h2>
        </div>
        <div
          className="overflow-y-scroll h-[20rem] lg:h-[45rem] rounded-xl bg-[#272f5b] mt-5"
          style={{ scrollbarWidth: "thin", scrollbarColor: "#FFFFFF #272f5b" }}
        >
          <table className="text-sm text-center w-full">
            <thead
              className="text-[40px] text-white uppercase bg-[#272f5b] sticky top-0"
              style={{ zIndex: 1 }}
            >
              <tr className="bg-[#272f5b] border-b-2 dark:bg-gray-800 dark:border-gray-700">
                <th className="px-6 py-3 lg:py-10 text-[9px] lg:text-[22px]">
                  <div className="flex justify-center items-center">
                    <span>2020 winner</span>
                  </div>
                </th>
                <th className="px-6 py-3 lg:py-10 text-[9px] lg:text-[22px]">
                  <div className="flex justify-center items-center">
                    <span>State</span>
                  </div>
                </th>
                <th className="px-6 py-3 lg:py-10 text-[9px] lg:text-[22px]">
                  <div className="flex justify-center items-center">
                    <span>2024 prediction</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {statesData.map((stateData, index) => (
                <tr
                  key={index}
                  className="even:bg-blue-gray-50/50 bg-[#272f5b] border-b border-[rgba(255,255,255,.2)] dark:bg-gray-800 dark:border-gray-700"
                >
                  <td className="px-6 py-3 lg:py-10  flex justify-center items-center gap-5">
                    {originalData[stateData.state] && originalData[stateData.state].winning_party === "Democratic" && (
                      <img
                        className="object-cover w-4 h-4 lg:w-10 lg:h-10"
                        src={Democraticlogo}
                        alt="Democratic"
                      />
                    )}
                    {originalData[stateData.state] && originalData[stateData.state].winning_party === "Republican" && (
                      <img
                        className="w-5 h-5 lg:w-10 lg:h-10"
                        src={Republicanlogo}
                        alt="Republican"
                      />
                    )}
                    {originalData[stateData.state] && originalData[stateData.state].winning_party === "Independent" && (
                      <img
                        className="w-5 h-5 lg:w-10 lg:h-10"
                        src={Independentlogo}
                        alt="Independent('Kennedy')"
                      />
                    )}
                    <span className="text-white font-poppins font-medium text-[9px] lg:text-[14px]">
                    {originalData[stateData.state] && originalData[stateData.state].winning_party}
                    </span>
                  </td>

                  <td className="px-6 py-3 lg:py-10 ml-6">
                    <span className="font-medium font-poppins text-[9px] lg:text-[22px] text-white">
                      {stateData.state.split("(")[0].trim()}
                    </span>
                  </td>
                  <td className="px-6 py-3 lg:py-10 flex justify-center items-center">
                    <span className="mr-2 lg:mr-4">
                      {getLeadingParty(stateData.parties) === "Democratic" && (
                        <div className="flex items-center gap-3">
                          <img
                            className="object-cover w-4 h-4 lg:w-10 lg:h-10"
                            src={Democraticlogo}
                            alt="Democratic"
                          />
                          <span className="text-white font-poppins font-medium text-[9px] lg:text-[14px]">
                            {getLeadingParty(stateData.parties)}
                          </span>
                        </div>
                      )}
                      {getLeadingParty(stateData.parties) === "Republican" && (
                        <div className="flex items-center gap-3">
                          <img
                            className="w-5 h-5 lg:w-10 lg:h-10"
                            src={Republicanlogo}
                            alt="Republican"
                          />
                          <span className="text-white font-poppins font-medium text-[9px] lg:text-[14px]">
                            {getLeadingParty(stateData.parties)}
                          </span>
                        </div>
                      )}
                      {getLeadingParty(stateData.parties) === "Independent" && (
                        <div className="flex items-center gap-3">
                          <img
                            className="w-5 h-5 lg:w-10 lg:h-10"
                            src={Independentlogo}
                            alt="Independent('Kennedy')"
                          />
                          <span className="text-white font-poppins font-medium text-[9px] lg:text-[14px]">
                            {getLeadingParty(stateData.parties)}
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
      </div>  */}

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
                        ? "Your Prediction"
                        : "2024 Your Prediction"}
                    </span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="w-full">
              {statesData.map((stateData, index) => (
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
                            src={`${ImageUrl}${stateData.map_url}`}
                            alt={`${stateData.state} State Winner`}
                          />
                        ) : (
                          <p>No image available</p>
                        )}
                      </span>
                      <span className="font-medium font-poppins text-[9px] lg:text-[27px] text-white truncate py-3 ">
                        {stateData.state.split("(")[0].trim()}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-3 lg:py-10 flex-1">
                    <span className="mr-2 lg:mr-4 flex items-center justify-center">
                      {getLeadingParty(stateData.parties) === "Democratic" && (
                        <div className="flex items-center gap-3">
                          <span className="text-white font-poppins font-medium text-[9px] lg:text-[19px]">
                            {getLeadingParty(stateData.parties)}
                          </span>
                          <span className="bg-white rounded-full p-2 w-[30px] h-[30px] md:w-[45px] md:h-[45px] flex justify-center items-center">
                            <img
                              className=" w-4 h-4 lg:w-7 lg:h-7 "
                              src={Democraticlogo}
                              alt="Democratic"
                            />
                          </span>
                        </div>
                      )}
                      {getLeadingParty(stateData.parties) === "Republican" && (
                        <div className="flex items-center gap-3">
                          <span className="text-white font-poppins font-medium text-[9px] lg:text-[19px] ">
                            {getLeadingParty(stateData.parties)}
                          </span>
                          <span className="bg-white rounded-full p-2 w-[30px] h-[30px] md:w-[45px] md:h-[45px] flex justify-center items-center">
                            <img
                              className="w-4 h-4 lg:w-7 lg:h-7"
                              src={Republicanlogo}
                              alt="Republican"
                            />
                          </span>
                        </div>
                      )}
                      {getLeadingParty(stateData.parties) === "Independent" && (
                        <div className="flex items-center gap-3">
                          <span className="text-white font-poppins font-medium text-[9px] lg:text-[19px]">
                            {getLeadingParty(stateData.parties)}
                          </span>
                          <span className="bg-white rounded-full p-1 w-[30px] h-[30px] md:w-[45px] md:h-[45px] flex justify-center items-center">
                            <img
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

{/* 
<div className="m-auto w-10/12">
  <div className="text-center">
    <h2 className="text-[#fff] text-[14px] md:text-[36px] orbit7 w-9/12 m-auto mt-3 text-center">
      State Winners
    </h2>
  </div>
  <div className="flex justify-center mb-9">
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
    <div className="text-sm text-center w-full">
      <div
        className="text-[40px] text-white  bg-[#272f5b] sticky top-0 "
        style={{ zIndex: 1 }}
      >
        <div className="flex bg-[#272f5b] border-b-2 dark:bg-gray-800 dark:border-gray-700">
          <div className="px-6 orbit7 py-3 lg:py-10 text-[9px] lg:text-[22px] flex justify-center items-center">
            <span>2020 Winner</span>
          </div>
          <div className="px-6 orbit7 py-3 lg:py-10 text-[9px] lg:text-[25px] flex justify-center items-center">
            <span>State</span>
          </div>
          <div className="px-6 orbit7 py-3 lg:py-10 text-[9px] lg:text-[22px] flex justify-center items-center">
            <span>
              {location.pathname === "/"
                ? "Your Prediction"
                : "2024 Your Prediction"}
            </span>
          </div>
        </div>
      </div>
      <div className="w-full">
        {statesData.map((stateData, index) => (
          <div
            key={index}
            className="even:bg-blue-gray-50/50 bg-[#272f5b] border-b border-[rgba(255,255,255,.2)] dark:bg-gray-800 dark:border-gray-700 flex"
          >
            <div className="px-6 py-3 lg:py-10  flex  justify-center items-center gap-5 ">
              {originalData[stateData.state] &&
                originalData[stateData.state].winning_party ===
                  "Democratic" && (
                  <span className="bg-white rounded-full p-2">
                    <img
                      className="object-cover w-4 h-4 lg:w-7 lg:h-7"
                      src={Democraticlogo}
                      alt="Democratic"
                    />
                  </span>
                )}
              {originalData[stateData.state] &&
                originalData[stateData.state].winning_party ===
                  "Republican" && (
                  <span className="bg-white rounded-full p-2">
                    <img
                      className="w-4 h-4 lg:w-7 lg:h-7"
                      src={Republicanlogo}
                      alt="Republican"
                    />
                  </span>
                )}
              {originalData[stateData.state] &&
                originalData[stateData.state].winning_party ===
                  "Independent" && (
                  <span className="bg-white rounded-full p-1">
                    <img
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
            </div>

            <div className="px-6 py-3 lg:py-1 ml-6 flex  justify-center items-center">
              <span className="">
                {stateData.map_url ? (
                  <img
                    src={`${ImageUrl}${stateData.map_url}`}
                    alt={`${stateData.state} State Winner`}
                  />
                ) : (
                  <p>No image available</p>
                )}
              </span>
              <span className="font-medium font-poppins text-[9px] lg:text-[27px] text-white truncate py-3">
                {stateData.state.split("(")[0].trim()}
              </span>
            </div>

            <div className="px-6 py-3 lg:py-10 flex-1 flex flex-col justify-center items-center">
              <span className="mr-2 lg:mr-4 flex items-center justify-center">
                {getLeadingParty(stateData.parties) === "Democratic" && (
                  <div className="flex items-center gap-3">
                    <span className="text-white font-poppins font-medium text-[9px] lg:text-[19px]">
                      {getLeadingParty(stateData.parties)}
                    </span>
                    <span className="bg-white rounded-full p-2">
                      <img
                        className="object-cover w-4 h-4 lg:w-7 lg:h-7"
                        src={Democraticlogo}
                        alt="Democratic"
                      />
                    </span>
                  </div>
                )}
                {getLeadingParty(stateData.parties) === "Republican" && (
                  <div className="flex items-center gap-3">
                    <span className="text-white font-poppins font-medium text-[9px] lg:text-[19px]">
                      {getLeadingParty(stateData.parties)}
                    </span>
                    <span className="bg-white rounded-full p-2">
                      <img
                        className="w-4 h-4 lg:w-7 lg:h-7"
                        src={Republicanlogo}
                        alt="Republican"
                      />
                    </span>
                  </div>
                )}
                {getLeadingParty(stateData.parties) === "Independent" && (
                  <div className="flex items-center gap-3">
                    <span className="text-white font-poppins font-medium text-[9px] lg:text-[19px]">
                      {getLeadingParty(stateData.parties)}
                    </span>
                    <span className="bg-white rounded-full p-1">
                      <img
                        className="w-4 h-4 lg:w-8 lg:h-8"
                        src={Independentlogo}
                        alt="Independent('Kennedy')"
                      />
                    </span>
                  </div>
                )}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
</div> */}
    </>
  );
};

export default StateWinner;

{
  /* <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal text-white"
                    >
                      {Math.max(
                        ...stateData.parties.map((party) => party.count)
                      )}
                    </Typography> */
}
