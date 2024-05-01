import React, { useEffect, useState } from "react";
import AppBanner from "../components/appbanner/AppBanner";
import bg from "../images/predictbg.png";
import Predict from "../components/predict/Predict";
import dem from "../images/demTITLE.png";
import rep from "../images/repTITLE.png";
import ind from "../images/indTITLE.png";
import axios from "axios";

export function Prediction() {
  const [candidateData, setCandidateData] = useState([]);
  const [data, setData] = useState({
    votter_party_id: 1,
    president_id: 2,
    vice_president_id: 3,
  });
  useEffect(() => {
    axios
      .get(
        "https://pankhay.com/thewhitehousegame/public/api/get_votter_candidate",
        {
          headers: {
            Accept: "application/json",
          },
        }
      )
      .then((res) => {
        setCandidateData(res.data.votter_candidate);
      })
      .catch((err) => {
        alert(err);
      });
  }, []);
  const token = localStorage.getItem("token");

  const submitData = () => {
    axios
      .post(
        "https://pankhay.com/thewhitehousegame/public/api/select_party_leaders",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            content_type: "application/json",
          },
        }
      )
      .then((res) => {
        alert("res is :", res);
      })
      .catch((err) => {
        alert("the error is :", err);
      });
  };

  cosnt;
  handleAfterChange = () => {};

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
      <Predict
        titleImage={dem}
        party={"Democratic"}
        submitData={submitData}
        afterchange={handleAfterChange}
      />
      <Predict
        titleImage={rep}
        party={"Republican"}
        submitData={submitData}
        afterchange={(index) =>
          console.log(
            candidateData?.filter(
              (item) => item.party.party_name === "Republican"
            )[index]
          )
        }
      />
      <Predict
        titleImage={ind}
        submitData={submitData}
        party={"Independent('Kennedy')"}
        afterchange={(index) =>
          console.log(
            candidateData?.filter(
              (item) => item.party.party_name === "Independent('Kennedy')"
            )[index]
          )
        }
      />
      <div className="buttons flex items-center justify-center gap-4 xl:mt-[54px]">
        <button className="rounded-[6px] text-white"></button>
        <button className="rounded-[6px] text-white"></button>
      </div>
    </div>
  );
}
