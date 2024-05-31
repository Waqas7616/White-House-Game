import React, { useEffect, useState } from "react";
import AppBanner from "../components/appbanner/AppBanner";
import logo from "../images/logo1.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import bg from "../images/images.jpg";
import DownloadApp from "../components/DownloadApp";
import republic from "../images/democrat.png";
import democrat from "../images/republican.png";
import independ from "../images/independent.png";
import check from "../images/check.png";


export default function MyVote() {
  const [userVote, setUserVote] = useState([]);
  const [selected, setSelected] = useState([]);
  const [president, setPresident] = useState([]);
  const [vicePresident, setVicePresident] = useState([]);
  const navigate = useNavigate();
  console.log("users voting", userVote);
  const token = localStorage.getItem("token");
  // console.log(token)
  const imageUrl = "https://thewhitehousegame.com/public/";
  

  useEffect(() => {
    axios
      .get("https://thewhitehousegame.com/public/api/userVotings", {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      })
      .then((response) => {
        const data = response.data;
        setUserVote(data);

        const predictedCandidateNames = data?.PredictedCandidateDetails?.map(
          (candidate) => candidate.candidate_name
        );
        console.log("shdjhsajhjs", predictedCandidateNames);
        const filteredCandidates = data?.SelectedCandidates?.filter(
          (e) => !predictedCandidateNames.includes(e.candidate_name)
        );
        console.log("sssssssssssssss", filteredCandidates);
        setSelected(filteredCandidates);
        setPresident(
          filteredCandidates?.filter((e) => e.position === "president")
        );
        setVicePresident(
          filteredCandidates?.filter((e) => e.position === "vice_president")
        );
      })
      .catch((err) => {});
  }, []);

  console.log("barwa waqas da dir:", selected);

  return (
    <div>
      <AppBanner
        bannerTitle={"Vote"}
        redTitle={"My"}
        bannerDesc={"America votes on Tuesday, November 5 2024"}
        bg={bg}
      />
      <div className="w-full py-[100px] bg-[#1c2452]">
        <div className="resp m-auto w-10/12">
          <div className="">
            <img className="m-auto" src={logo} alt="" />

            <p className="poppins4 text-white/90 xl:text-[24px] mt-6 text-center w-[43%] m-auto">
              This is my Prediction who the candidates will be and who will be
              our next
            </p>
          </div>
          <div className="flex gap-4">
            <div
              // style={{
              //   background:
              //     "linear-gradient(90deg, #ED1C24 0%, #BE1E2E 50%, #1C2452 100%)",
              // }}
              className={`w-full rounded-lg  pb-24 pt-9 mt-5  relative ${
                userVote?.PredictedCandidateDetails?.[0]?.party_name ===
                "Republican"
                  ? "bg-redish"
                  : userVote?.PredictedCandidateDetails?.[0]?.party_name ===
                    "Democratic"
                  ? "bg-[#546BED]"
                  : "bg-white"
              }`}
            >
              <div className="mx-3 mb-3 px-3 py-2 rounded flex items-center gap-4 bg-[rgba(252,222,222,0.2)] w-fit">
                <img
                  className="w-[20px] h-[20px] sm:w-auto"
                  src={
                    userVote?.PredictedCandidateDetails?.[0]?.party_name ===
                    "Republican"
                      ? republic
                      : userVote?.PredictedCandidateDetails?.[0]?.party_name ===
                        "Democratic"
                      ? democrat
                      : independ
                  }
                  alt=""
                />
                <h2 className="text-[10px] sm:text-[12px] md:text-[13px] xl:text-[22px]">
                  {userVote?.PredictedCandidateDetails?.[0]?.party_name}
                </h2>
              </div>
              <div className="flex gap-4 items-center justify-start w-full m-auto ">
                <div className="w-[200px] h-[220px] m-auto relative">
                  <h4 className="poppins6 text-white xl:text-[20px]">
                    President
                  </h4>
                  {/* w-[120px] h-[130px]  sm:w-[260px] sm:h-[270px] md:w-[300px] md:h-[310px] lg:w-[350px] lg:h-[360px] lg-a:w-[450px] lg-a:h-[460px] xl:w-[500px] xl:h-[510px] xl-a:w-[567.38px] xl-a:h-[572.84px] */}
                  <div className="w-[200px] h-[220px] rounded-[28.43px]  overflow-hidden   ">
                    <img
                      className="h-full w-full object-cover"
                      src={`${imageUrl}${userVote?.PredictedCandidateDetails?.[0]?.candidate_image}`}
                      alt=""
                    />
                  </div>
                  <h2
                    className={`poppins6  text-center text-[10px]  absolute bottom-0 md:ml-4 ${
                      userVote?.PredictedCandidateDetails?.[0]?.party_name ===
                      "Democratic"
                        ? "bg-[#1c2452] text-white"
                        : userVote?.PredictedCandidateDetails?.[0]
                            ?.party_name === "Republican"
                        ? "bg-redish text-white"
                        : "bg-white text-black"
                    } px-1  md:px-4 md:py-1 z-50`}
                  >
                    {userVote?.PredictedCandidateDetails?.[0]?.candidate_name}
                  </h2>
                </div>
                <div className="w-[200px] h-[220px] m-auto relative">
                  <h4 className="poppins6 text-white xl:text-[20px]">
                    Vice President
                  </h4>
                  <div className="w-[200px] h-[220px] rounded-[28.43px]   overflow-hidden   ">
                    <img
                      className="h-full w-full object-cover"
                      src={`${imageUrl}${userVote?.PredictedCandidateDetails?.[1]?.candidate_image}`}
                      alt=""
                    />
                  </div>
                  <h2
                    className={`poppins6  text-center text-[10px]  absolute bottom-0 md:ml-4 ${
                      userVote?.PredictedCandidateDetails?.[1]?.party_name ===
                      "Democratic"
                        ? "bg-[#1c2452] text-white"
                        : userVote?.PredictedCandidateDetails?.[1]
                            ?.party_name === "Republican"
                        ? " bg-redish text-white"
                        : "bg-white text-black"
                    } px-1  md:px-4 md:py-1 z-50`}
                  >
                    {userVote?.PredictedCandidateDetails?.[1]?.candidate_name}
                  </h2>
                </div>
              </div>
              <div className="absolute bottom-3 left-52">
                <img className="w-[40px] h-[40px] m-auto" src={check} alt="" />
              </div>
            </div>

            {/* other parties */}

            <div
              className={`w-full rounded-lg  pb-24 pt-9 mt-5  relative ${
                selected?.[0]?.party_name === "Republican"
                  ? "bg-redish"
                  : selected?.[0]?.party_name === "Democratic"
                  ? "bg-[#546BED]"
                  : "bg-white"
              }`}
              // style={{
              //   background:
              //     "linear-gradient(90deg, #ED1C24 0%, #BE1E2E 50%, #1C2452 100%)",
              // }}
            >
              <div className="mx-3 mb-3 px-3 py-2 rounded flex items-center gap-4 bg-[rgba(252,222,222,0.2)] w-fit">
                <img
                  className="w-[20px] h-[20px] sm:w-auto"
                  src={
                    selected?.[0]?.party_name === "Republican"
                      ? republic
                      : selected?.[0]?.party_name === "Democratic"
                      ? democrat
                      : independ
                  }
                  alt=""
                />
                <h2 className="text-[10px] sm:text-[12px] md:text-[13px] xl:text-[22px]">
                  {selected?.[0]?.party_name}
                </h2>
              </div>
              <div className="flex gap-4 items-center justify-start w-full m-auto ">
                <div className="w-[200px] h-[220px] m-auto relative">
                  <h4 className="poppins6 text-white xl:text-[20px]">
                    President
                  </h4>
                  <div className="w-[200px] h-[220px] rounded-[28.43px]   overflow-hidden   ">
                    <img
                      className="h-full w-full object-cover"
                      src={`${imageUrl}${selected?.[0]?.candidate_image}`}
                      alt=""
                    />
                  </div>
                  <h2
                    className={`poppins6  text-center text-[10px]  absolute bottom-0 md:ml-4 ${
                      selected?.[0]?.party_name === "Democratic"
                        ? "bg-[#1c2452] text-white"
                        : selected?.[0]?.party_name === "Republican"
                        ? "bg-redish text-white"
                        : "bg-white text-black"
                    } px-1  md:px-4 md:py-1 z-50`}
                  >
                    {selected?.[0]?.candidate_name}
                  </h2>
                </div>
                <div className="w-[200px] h-[220px] m-auto relative">
                  <h4 className="poppins6 text-white xl:text-[20px]">
                    Vice President
                  </h4>
                  <div className="w-[200px] h-[220px] rounded-[28.43px]  overflow-hidden   ">
                    <img
                      className="h-full w-full object-cover"
                      src={`${imageUrl}${selected?.[1]?.candidate_image}`}
                      alt=""
                    />
                  </div>
                  <h2
                    className={`poppins6  text-center text-[10px]  absolute bottom-0 md:ml-4 ${
                      selected?.[1]?.party_name === "Democratic"
                        ? " bg-[#1c2452] text-white"
                        : selected?.[1]?.party_name === "Republican"
                        ? "bg-redish text-white"
                        : "bg-white text-black"
                    } px-1  md:px-4 md:py-1 z-50`}
                  >
                    {selected?.[1]?.candidate_name}
                  </h2>
                </div>
              </div>
            </div>
            <div
              className={`w-full rounded-lg  pb-24 pt-9 mt-5  relative ${
                selected?.[2]?.party_name === "Republican"
                  ? "bg-redish"
                  : selected?.[2]?.party_name === "Democratic"
                  ? "bg-[#546BED]"
                  : "bg-white"
              }`}

              // style={{
              //   background:
              //     "linear-gradient(90deg, #ED1C24 0%, #BE1E2E 50%, #1C2452 100%)",
              // }}
            >
              <div className="mx-3 mb-3 px-3 py-2 rounded flex items-center gap-4 bg-[rgba(252,222,222,0.2)] w-fit">
                <img
                  className="w-[20px] h-[20px] sm:w-auto"
                  src={
                    selected?.[2]?.party_name === "Republican"
                      ? republic
                      : selected?.[2]?.party_name === "Democratic"
                      ? democrat
                      : independ
                  }
                  alt=""
                />
                <h2 className="text-[10px] sm:text-[12px] md:text-[13px] xl:text-[22px]">
                  {selected?.[2]?.party_name}
                </h2>
              </div>
              <div className="flex gap-4 items-center justify-start w-full m-auto ">
                <div className="w-[200px] h-[220px] m-auto relative">
                  <h4 className="poppins6 text-white xl:text-[20px]">
                    President
                  </h4>
                  <div className="w-[200px] h-[220px] rounded-[28.43px]   overflow-hidden   ">
                    <img
                      className="h-full w-full object-cover"
                      src={`${imageUrl}${selected?.[2]?.candidate_image}`}
                      alt=""
                    />
                  </div>
                  <h2
                    className={`poppins6  text-center text-[10px]  absolute bottom-0 md:ml-4 ${
                      selected?.[2]?.party_name === "Democratic"
                        ? "bg-[#1c2452]  text-white"
                        : selected?.[2]?.party_name === "Republican"
                        ? " bg-redish text-white"
                        : "bg-white text-black"
                    } px-1  md:px-4 md:py-1 z-50`}
                  >
                    {selected?.[2]?.candidate_name}
                  </h2>
                </div>
                <div className="w-[200px] h-[220px] m-auto relative">
                  <h4 className="poppins6 text-white xl:text-[20px]">
                    Vice President
                  </h4>
                  <div className="w-[200px] h-[220px] rounded-[28.43px]  overflow-hidden   ">
                    <img
                      className="h-full w-full object-cover"
                      src={`${imageUrl}${selected?.[3]?.candidate_image}`}
                      alt=""
                    />
                  </div>
                  <h2
                    className={`poppins6  text-center text-[10px]  absolute bottom-0 md:ml-4 ${
                      selected?.[3]?.party_name === "Democratic"
                        ? " bg-[#1c2452] text-white"
                        : selected?.[3]?.party_name === "Republican"
                        ? "bg-redish text-white"
                        : "bg-white text-black"
                    } px-1  md:px-4 md:py-1 z-50`}
                  >
                    {selected?.[3]?.candidate_name}
                  </h2>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center flex justify-center items-center gap-5">
            <button
              className="bg-[#ED1C24] py-[12px] px-[30px] text-white rounded-[8px] my-8"
              onClick={() => navigate("/predict")}
            >
              Update my prediction
            </button>
            <button
              className="bg-[#ED1C24] py-[12px] px-[30px] text-white rounded-[8px] my-8"
              onClick={() => navigate("/electoral")}
            >
              Predict the Electoral College
            </button>
          </div>
        </div>
      </div>
      <DownloadApp />
    </div>
  );
}
