import React, { useState, useEffect } from "react";
import AppBanner from "../components/appbanner/AppBanner";
import bg from "../images/predictbg.png";
import question from "../images/question.png";
import title from "../images/demTITLE.png";
import title2 from "../images/repTITLE.png";
import title3 from "../images/indTITLE.png";
import calender from "../images/calender.png";
import check from "../images/check.png";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import DownloadApp from "../components/DownloadApp";

function PartyPrediction() {
  const navigate = useNavigate();
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [sliderBackground, setSliderBackground] = useState("transparent");
  const [partyData, setPartyData] = useState({
    votter_party_id: 1,
    president_id: 2,
    vice_president_id: 3,
  });
  const [predict, setPredict] = useState(0);
  const location = useLocation();
  const data = location.state || {};
  console.log("transferred data", data);
  const [candidateData, setCandidateData] = useState([]);
  const imageUrl = "https://pankhay.com/thewhitehousegame/public/";
  // const id=localStorage.getItem('id');
  const token = localStorage.getItem("token");
  const id = localStorage.getItem("id");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://pankhay.com/thewhitehousegame/public/api/get_predict_party_candidate/${id}`,

          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }
        );
        setCandidateData(response.data);
        navigate("/party-prediction");
      } catch (error) {
        console.log("Error: ", error);
      }
    };
    fetchData();
  }, []);

  console.log("my data is :", candidateData);
  // console.log(data.voting[0].president_id)

  const handleButtonClick = (e) => {
    // setIsButtonClicked(true);
    setSliderBackground(
      "linear-gradient(90deg, #ED1C24 0%, #BE1E2E 50%, #1C2452 100%)"
    );
    setPredict(e);

    console.log("selected party", partyData);
  };
  useEffect(() => {
    if (predict === 1) {
      // Assuming candidateData is available and chosen_candidate is an array
      setPartyData((prev) => ({
        ...prev,
        votter_party_id: 1,
        president_id: candidateData?.chosen_candidate?.[0]?.voter_candidate_id,
        vice_president_id:
          candidateData?.chosen_candidate?.[1]?.voter_candidate_id,
      }));
    } else if (predict === 2) {
      setPartyData((prev) => ({
        ...prev,
        votter_party_id: 2,
        president_id: candidateData?.chosen_candidate?.[2]?.voter_candidate_id,
        vice_president_id:
          candidateData?.chosen_candidate?.[3]?.voter_candidate_id,
      }));
    } else {
      setPartyData((prev) => ({
        ...prev,
        votter_party_id: 3,
        president_id: candidateData?.chosen_candidate?.[4]?.voter_candidate_id,
        vice_president_id:
          candidateData?.chosen_candidate?.[5]?.voter_candidate_id,
      }));
    }
  }, [predict, candidateData]);

  const sendPartyData = () => {
    axios
      .post(
        "https://pankhay.com/thewhitehousegame/public/api/predict_party_leader",
        partyData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "content-type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log("my response message is :", res.message);
      })
      .catch((err) => {
        console.log("my error message is :", err);
      });
  };

  console.log("selected party", partyData);

  return (
    <div>
      <AppBanner
        redTitle={"YOUR"}
        bg={bg}
        bannerTitle={"PREDICTION"}
        bannerDesc={
          "Predict the next President of the United States and tell the world what you think!"
        }
      />
      <div className="bg-[#1c2452] py-[100px]">
        <div className="resp m-auto w-10/12">
          <img src={question} alt="" className="m-auto" />
          <img src={title} alt="" className="m-auto mt-5" />
          <p className="poppins4 text-white text-center xl:w-[55%] xl:text-[30px] m-auto mt-5">
            Select who you think will be the Democratic Party&apos;s
            Presidential candidate on
          </p>
          <p className="poppins4 text-white/80 xl:text-[22px] text-center justify-center flex items-center gap-2 m-auto mt-5">
            <img src={calender} alt="" />
            Tuesday, November
            <span className="poppins5 text-white xl:text-[22px]">5, 2024</span>
          </p>

          <div
            style={{ background: `${predict === 1 && sliderBackground}` }}
            className={`w-full rounded-lg  pb-24  relative ${
              predict === 1 && "border-8 "
            }
            `}
          >
            <div className="flex gap-4 items-center justify-start w-full m-auto mt-[50px]">
              <div className="w-[120px] h-[130px] sm:w-[260px] sm:h-[270px] md:w-[300px] md:h-[310px] lg:w-[350px] lg:h-[360px] lg-a:w-[450px] lg-a:h-[460px] xl:w-[500px] xl:h-[510px] xl-a:w-[562px] xl-a:h-[572px] m-auto">
                <h4 className="poppins6 text-white xl:text-[38px]">
                  President
                </h4>
                <div className="w-[120px] h-[130px]  sm:w-[260px] sm:h-[270px] md:w-[300px] md:h-[310px] lg:w-[350px] lg:h-[360px] lg-a:w-[450px] lg-a:h-[460px] xl:w-[500px] xl:h-[510px] xl-a:w-[567.38px] xl-a:h-[572.84px] rounded-[28.43px] border-[10px] border-transparent overflow-hidden hover:border-[10px]  ">
                  <img
                    className="h-full w-full object-cover"
                    src={`${imageUrl}${candidateData?.chosen_candidate?.[0]?.voter_candidate?.candidate_image}`}
                    alt=""
                  />
                </div>
              </div>
              <div className="w-[120px] h-[130px] sm:w-[260px] sm:h-[270px] md:w-[300px] md:h-[310px] lg:w-[350px] lg:h-[360px] lg-a:w-[450px] lg-a:h-[460px] xl:w-[500px] xl:h-[510px] xl-a:w-[562px] xl-a:h-[572px] m-auto">
                <h4 className="poppins6 text-white xl:text-[38px]">
                  Vice President
                </h4>
                <div className="w-[120px] h-[130px]  sm:w-[260px] sm:h-[270px] md:w-[300px] md:h-[310px] lg:w-[350px] lg:h-[360px] lg-a:w-[450px] lg-a:h-[460px] xl:w-[500px] xl:h-[510px] xl-a:w-[567.38px] xl-a:h-[572.84px] rounded-[28.43px] border-[10px] border-transparent overflow-hidden hover:border-[10px]  ">
                  <img
                    className="h-full w-full object-cover"
                    src={`${imageUrl}${candidateData?.chosen_candidate?.[1]?.voter_candidate?.candidate_image}`}
                    alt=""
                  />
                </div>
              </div>
            </div>

            {predict === 1 && (
              <img
                className="w-12 h-12 absolute left-[49%] transform -translate-x-2 -bottom-5 border-[5px] rounded-full border-[#1c2452]"
                src={check}
                alt=""
              />
            )}
          </div>
          <div className="flex justify-center relative  mt-2">
            {/* Button */}
            <button
              onClick={() => handleButtonClick(1)}
              className={`rounded-lg px-5 py-3 bg-red-500 h-[40px] sm:w-[300px] sm:h-[50px] flex items-center justify-center gap-1 text-white font-poppins ml-3 `}
            >
              <img src={check} className="w-4" alt="" /> Select
            </button>
          </div>
        </div>
      </div>
      <div className="bg-[#1c2452] py-[100px]">
        <div className="resp m-auto w-10/12">
          <img src={question} alt="" className="m-auto" />
          <img src={title2} alt="" className="m-auto mt-5" />
          <p className="poppins4 text-white text-center xl:w-[55%] xl:text-[30px] m-auto mt-5">
            Select who you think will be the Democratic Party&apos;s
            Presidential candidate on
          </p>
          <p className="poppins4 text-white/80 xl:text-[22px] text-center justify-center flex items-center gap-2 m-auto mt-5">
            <img src={calender} alt="" />
            Tuesday, November
            <span className="poppins5 text-white xl:text-[22px]">5, 2024</span>
          </p>

          <div
            style={{ background: `${predict === 2 && sliderBackground}` }}
            className={`w-full rounded-lg  pb-24  relative ${
              predict === 2 && "border-8"
            }`}
          >
            <div className="flex gap-4 items-center justify-start w-full m-auto mt-[50px]">
              <div className="w-[120px] h-[130px] sm:w-[260px] sm:h-[270px] md:w-[300px] md:h-[310px] lg:w-[350px] lg:h-[360px] lg-a:w-[450px] lg-a:h-[460px] xl:w-[500px] xl:h-[510px] xl-a:w-[562px] xl-a:h-[572px] m-auto">
                <h4 className="poppins6 text-white xl:text-[38px]">
                  President
                </h4>
                <div className="w-[120px] h-[130px]  sm:w-[260px] sm:h-[270px] md:w-[300px] md:h-[310px] lg:w-[350px] lg:h-[360px] lg-a:w-[450px] lg-a:h-[460px] xl:w-[500px] xl:h-[510px] xl-a:w-[567.38px] xl-a:h-[572.84px] rounded-[28.43px] border-[10px] border-transparent overflow-hidden hover:border-[10px]  ">
                  <img
                    className="w-full h-full object-cover"
                    src={`${imageUrl}${candidateData?.chosen_candidate?.[2]?.voter_candidate?.candidate_image}`}
                    alt=""
                  />
                </div>
              </div>
              <div className="w-[120px] h-[130px] sm:w-[260px] sm:h-[270px] md:w-[300px] md:h-[310px] lg:w-[350px] lg:h-[360px] lg-a:w-[450px] lg-a:h-[460px] xl:w-[500px] xl:h-[510px] xl-a:w-[562px] xl-a:h-[572px] m-auto">
                <h4 className="poppins6 text-white xl:text-[38px]">
                  Vice President
                </h4>
                <div className="w-[120px] h-[130px]  sm:w-[260px] sm:h-[270px] md:w-[300px] md:h-[310px] lg:w-[350px] lg:h-[360px] lg-a:w-[450px] lg-a:h-[460px] xl:w-[500px] xl:h-[510px] xl-a:w-[567.38px] xl-a:h-[572.84px] rounded-[28.43px] border-[10px] border-transparent overflow-hidden hover:border-[10px]  ">
                  <img
                    className="w-full h-full object-cover"
                    src={`${imageUrl}${candidateData?.chosen_candidate?.[3]?.voter_candidate?.candidate_image}`}
                    alt=""
                  />
                </div>
              </div>
            </div>

            {predict === 2 && (
              <img
                className="w-12 h-12 absolute left-[49%] transform -translate-x-2 -bottom-5 border-[5px] rounded-full border-[#1c2452]"
                src={check}
                alt=""
              />
            )}
          </div>
          <div className="flex justify-center relative  mt-2">
            {/* Button */}
            <button
              onClick={() => handleButtonClick(2)}
              className={`rounded-lg px-5 py-3 bg-red-500 h-[40px] sm:w-[300px] sm:h-[50px] flex items-center justify-center gap-1 text-white font-poppins ml-3 `}
            >
              <img src={check} className="w-4" alt="" /> Select
            </button>
          </div>
        </div>
      </div>

      <div className="bg-[#1c2452] py-[100px]">
        <div className="resp m-auto w-10/12">
          <img src={question} alt="" className="m-auto" />
          <img src={title3} alt="" className="m-auto mt-5" />
          <p className="poppins4 text-white text-center xl:w-[55%] xl:text-[30px] m-auto mt-5">
            Select who you think will be the Democratic Party&apos;s
            Presidential candidate on
          </p>
          <p className="poppins4 text-white/80 xl:text-[22px] text-center justify-center flex items-center gap-2 m-auto mt-5">
            <img src={calender} alt="" />
            Tuesday, November
            <span className="poppins5 text-white xl:text-[22px]">5, 2024</span>
          </p>

          <div
            style={{ background: `${predict === 3 && sliderBackground}` }}
            className={`w-full rounded-lg pb-24 relative ${
              predict === 3 && "border-8"
            }`}
          >
            <div className="flex gap-4 items-center justify-start w-full m-auto mt-[50px]">
              <div className="w-[120px] h-[130px] sm:w-[260px] sm:h-[270px] md:w-[300px] md:h-[310px] lg:w-[350px] lg:h-[360px] lg-a:w-[450px] lg-a:h-[460px] xl:w-[500px] xl:h-[510px] xl-a:w-[562px] xl-a:h-[572px] m-auto">
                <h4 className="poppins6 text-white xl:text-[38px]">
                  President
                </h4>
                <div className="w-[120px] h-[130px]  sm:w-[260px] sm:h-[270px] md:w-[300px] md:h-[310px] lg:w-[350px] lg:h-[360px] lg-a:w-[450px] lg-a:h-[460px] xl:w-[500px] xl:h-[510px] xl-a:w-[567.38px] xl-a:h-[572.84px] rounded-[28.43px] border-[10px] border-transparent overflow-hidden hover:border-[10px]  ">
                  <img
                    className="h-full w-full object-cover"
                    src={`${imageUrl}${candidateData?.chosen_candidate?.[4]?.voter_candidate?.candidate_image}`}
                    alt=""
                  />
                </div>
              </div>
              <div className="w-[120px] h-[130px] sm:w-[260px] sm:h-[270px] md:w-[300px] md:h-[310px] lg:w-[350px] lg:h-[360px] lg-a:w-[450px] lg-a:h-[460px] xl:w-[500px] xl:h-[510px] xl-a:w-[562px] xl-a:h-[572px] m-auto">
                <h4 className="poppins6 text-white xl:text-[38px]">
                  Vice President
                </h4>
                <div className="w-[120px] h-[130px]  sm:w-[260px] sm:h-[270px] md:w-[300px] md:h-[310px] lg:w-[350px] lg:h-[360px] lg-a:w-[450px] lg-a:h-[460px] xl:w-[500px] xl:h-[510px] xl-a:w-[567.38px] xl-a:h-[572.84px] rounded-[28.43px] border-[10px] border-transparent overflow-hidden hover:border-[10px]  ">
                  <img
                    className="h-full w-full object-cover"
                    src={`${imageUrl}${candidateData?.chosen_candidate?.[5]?.voter_candidate?.candidate_image}`}
                    alt=""
                  />
                </div>
              </div>
            </div>

            {predict === 3 && (
              <img
                className="w-12 h-12 absolute left-[49%] transform -translate-x-2 -bottom-5 border-[5px] border-[#1c2452] rounded-full"
                src={check}
                alt=""
              />
            )}
          </div>
          <div className="flex justify-center relative  mt-2">
            {/* Button */}
            <button
              onClick={() => handleButtonClick(3)}
              className={`rounded-lg px-5 py-3 bg-red-500 h-[40px] sm:w-[300px] sm:h-[50px] flex items-center justify-center gap-1 text-white font-poppins ml-3 `}
            >
              <img src={check} className="w-4" alt="" /> Select
            </button>
          </div>
        </div>
      </div>

      <div className="flex justify-center relative gap-8 mt-8 mb-3">
        {/* Button */}
        <button
          onClick={sendPartyData}
          className={`rounded-lg px-5 py-3 border-[1px] border-white h-[40px] sm:w-[300px] sm:h-[50px] flex items-center justify-center gap-1 text-white font-poppins ml-3 `}
        >
          Done
        </button>
        <button
          onClick={() => navigate("/electoral")}
          className={`rounded-lg px-5 py-3 bg-red-500 h-[40px] sm:w-[300px] sm:h-[50px] flex items-center justify-center gap-1 text-white font-poppins ml-3 `}
        >
          Complete electoral college
        </button>
      </div>
      <DownloadApp />
    </div>
  );
}

export default PartyPrediction;
