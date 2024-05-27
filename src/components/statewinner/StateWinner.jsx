import React, { useEffect, useState } from "react";
import { Card, Typography } from "@material-tailwind/react";
// import democrat from "../../images/democrat.png";
import flag from "../../images/flag.png";
import axios from "axios";
import Democraticlogo from "../../images/Democraticlogo.png";
import Independentlogo from "../../images/Independentlogo.png";
import Republicanlogo from "../../images/Republicanlogo.png";

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
  const [statesData, setStatesData] = useState([]);
  const [originalData, setOriginalData] = useState({});
  const ImageUrl = "https://thewhitehousegame.com/public/";

  useEffect(() => {
    axios
      .get("https://thewhitehousegame.com/public/api/getVoterPartyCount", {
        headers: {
          Accept: "application/json",
        },
      })
      .then((res) => {
        console.log("state result data:", res.data.data);
        setOriginalData(res.data.data);
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
            state_image_url: parties.state_image_url, // state image url ko include karna
          });
        }

        // electrical collage ke hisaab se descending order mein sort karna
        // parsedData.sort((a, b) => b.electricalCollege - a.electricalCollege);
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
    return parties.reduce((prev, current) =>
      prev.count > current.count ? prev : current
    ).party_name;
  };

  return (
    <>
      <div className="resp m-auto w-10/12">
        <div className="text-center">
          <h2 className="text-[#fff] text-[14px] md:text-[36px] orbit7 w-9/12 m-auto my-12 text-center">
            State Winner
          </h2>
        </div>
        <div
          className="overflow-y-scroll h-[20rem] lg:h-[45rem] rounded-xl bg-[#272f5b] mt-5"
          style={{ scrollbarWidth: "thin", scrollbarColor: "#FFFFFF #272f5b" }}
        >
          <table className="text-sm text-center w-full">
            <thead
              className="text-[40px] text-white uppercase bg-[#272f5b]  sticky top-0"
              style={{ zIndex: 1 }}
            >
              <tr className="bg-[#272f5b]  border-b-2 dark:bg-gray-800 dark:border-gray-700">
                <th className="px-6 py-3 lg:py-10 text-[9px] lg:text-[22px]">
                  2020
                </th>
                <th className="px-6 py-3 lg:py-10 text-[9px] lg:text-[22px]">
                  State
                </th>
                <th className="px-6 py-3 lg:py-10 text-[9px] lg:text-[22px]">
                  2024
                </th>
              </tr>
            </thead>
            <tbody>
              {statesData.map((stateData, index) => (
                <tr
                  key={index}
                  className="even:bg-blue-gray-50/50 bg-[#272f5b] border-b border-[rgba(255,255,255,.2)] dark:bg-gray-800 dark:border-gray-700"
                >
                  <td className="p-4 flex items-center justify-center py-1 lg:py-10">
                    <span className="text-white text-center font-poppins font-medium text-[9px] lg:text-[22px]">
                      {getLeadingParty(stateData.parties)}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="font-medium font-poppins text-[9px] lg:text-[22px] text-white text-center">
                      {stateData.state}
                    </span>
                  </td>
                  {/* <td className="p-4 flex flex-col items-center text-center">
                    {stateData.state_image_url && (
                      <img
                        className="w-10 h-10 lg:w-20 lg:h-20 mb-2"
                        src={`${ImageUrl}${stateData.state_image_url}`}
                        alt={`${stateData.state} image`}
                      />
                    )}
                    <span className="text-white text-center font-poppins font-medium text-[9px] lg:text-[22px]">
                      Electoral College: {stateData.electricalCollege}
                    </span>
                  </td> */}
                  <td className="p-4 flex justify-center items-center text-center">
                    {/* Display party logo based on party name */}
                    {getLeadingParty(stateData.parties) === "Democratic" && (
                      <img
                        className="object-cover w-4 h-4 lg:w-10 lg:h-10"
                        src={Democraticlogo}
                        alt="Democratic"
                      />
                    )}
                    {getLeadingParty(stateData.parties) === "Republican" && (
                      <img
                        className="w-5 h-5 lg:w-10 lg:h-10"
                        src={Republicanlogo}
                        alt="Republican"
                      />
                    )}
                    {getLeadingParty(stateData.parties) ===
                      "Independent('Kennedy')" && (
                      <img
                        className="w-5 h-5 lg:w-10 lg:h-10"
                        src={Independentlogo}
                        alt="Independent('Kennedy')"
                      />
                    )}
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
