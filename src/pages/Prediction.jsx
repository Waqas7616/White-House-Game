import React, { useEffect, useState } from "react";
import AppBanner from "../components/appbanner/AppBanner";
import bg from "../images/predictbg.png";
import Predict from "../components/predict/Predict";
import dem from "../images/demTITLE.png";
import rep from "../images/repTITLE.png";
import ind from "../images/indTITLE.png";
import axios from "axios";
import { useStatePredictions } from "../utils/StateIDs";
import DownloadApp from "../components/DownloadApp";
import { useNavigate } from "react-router-dom";

function Prediction() {
  // const [candidateData, setCandidateData] = useState([]);
  // const [president, setPresident] = useState();
  const navigate = useNavigate();
  const { president, vicePresident, party, voting, addVoting } = useStatePredictions()

  const [data, setData] = useState({
    votter_party_id: party,
    president_id: president,
    vice_president_id: vicePresident,
  });
  useEffect(() => {
    setData({
      votter_party_id: party,
      president_id: president,
      vice_president_id: vicePresident,
    });
  }, [president, vicePresident])
console.log('waqas voting data',data)
  const token = localStorage.getItem("token");

  const submitData = () => {
    addVoting({
      votter_party_id: party,
      president_id: president,
      vice_president_id: vicePresident,
    });

  };
console.log('check this',voting)

  const sendPrediction = () => {
    axios
      .post(
        "https://thewhitehousegame.com/public/api/select_party_leaders",
        {
          "parties": voting
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            content_type: "application/json",
          },
        }
      )
      .then((res) => {
        alert("res is :", res.message);
      })
      .catch((err) => {
        alert("the error is :", err.message);
      });
    navigate('/party-prediction', { state: { voting } })
  }

  return (
    <div className="">
      <AppBanner
        redTitle={"YOUR"}
        bg={bg}
        bannerTitle={"PREDICTION"}
        bannerDesc={
          "Predict the next President of the United States and tell the world what you think!"
        }
      />
      <Predict
      name={'Democratic'}
        titleImage={dem}
        party={"Democratic"}
        submitData={submitData}
        
      // afterchange={(index)=>{console.log(candidateData.filter((item)=>item?.party.party_name==="Democratic")[index])}}
      // afterchange={(index) => { console.log(index) }}
      />
      <Predict
      name={'Republican'}
        titleImage={rep}
        party={"Republican"}
        submitData={submitData}
      />
      <Predict
      name={'Independent'}
        titleImage={ind}
        party={"Independent('Kennedy')"}
        submitData={submitData}


      />
      <div className="buttons flex items-center justify-center gap-4 xl:mt-[54px] mb-3 ">
        <button className="rounded-[6px] text-white poppins-6 border-[1px] border-white px-5 py-2 sm:px-10 sm:py-2 ">Edit my predictions</button>
        <button onClick={sendPrediction} className="rounded-[6px] text-white poppins-6 border-[1px] border-redish px-10 py-2 bg-redish">Next</button>
      </div>
      <DownloadApp />
    </div>
  );
}

export default Prediction;
