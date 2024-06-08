import React, { useEffect, useState } from "react";
import AppBanner from "../components/appbanner/AppBanner";
import bg from "../images/prediction.jpg";
import Predict from "../components/predict/Predict";
import dem from "../images/demTITLE.png";
import rep from "../images/repTITLE.png";
import ind from "../images/indTITLE.png";
import calender from "../images/calender.png";
import democratic from '../images/Democraticlogo.png'
import republican from '../images/Republicanlogo.png'
import independent from '../images/Independentlogo.png'

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
          <>Predict the next President of the United States <br/> and tell the world what you think!</>
        }
      />
       <p className="poppins4 text-white text-center xl:w-[55%] xl:text-[30px] m-auto mt-5">
        Predict America’s next President and Vice President <br />Select who you predict will be the candidates on
        </p>
        <p className="poppins4 text-white/80 xl:text-[22px] text-center justify-center flex items-center gap-2 m-auto mt-5">
          <img src={calender} alt="" />
          Tuesday, November
          <span className="poppins5 text-white xl:text-[22px]">5, 2024</span>
        </p>
       <div className="resp w-10/12 m-auto flex items-center justify-between mt-12">
       <div>
        <div className="flex items-center gap-3 bg-[rgba(252,222,222,0.2)] text-[10px] sm:text-[12px] md:text-[13px] xl:text-[22px] text-white w-fit px-2 py-1 rounded"><span className=""><img className="w-10" src={democratic} alt="" /></span>
        <h2>Democratic</h2>
        </div>
      <Predict
      name={'Democratic'}
        titleImage={dem}
        party={"Democratic"}
        submitData={submitData}
        
      // afterchange={(index)=>{console.log(candidateData.filter((item)=>item?.party.party_name==="Democratic")[index])}}
      // afterchange={(index) => { console.log(index) }}
      />
      </div>
      <div>

      <div className="flex items-center gap-3 bg-[rgba(252,222,222,0.2)] text-[10px] sm:text-[12px] md:text-[13px] xl:text-[22px] text-white w-fit px-2 py-1 rounded"><span className=""><img className="w-10" src={republican} alt="" /></span>
        <h2>Republican</h2>
        </div>
      <Predict
      name={'Republican'}
        titleImage={rep}
        party={"Republican"}
        submitData={submitData}
      />
       </div>
       <div>
        <div className="relative">
       <div className="flex items-center gap-3 bg-[rgba(252,222,222,0.2)] text-[10px] sm:text-[12px] md:text-[13px] xl:text-[22px] text-white w-fit px-2 py-1 rounded"><span className=""><img className="w-10" src={independent} alt="" /></span>
        <h2>Independent</h2>
        </div>
        <p className="absolute right-0 top-[7px] text-[10px] w-[52%] text-white">Select who you believe will be the <br/> leading Independent candidates on election day</p>
        </div>
      <Predict
      name={'Independent'}
        titleImage={ind}
        party={"Independent('Kennedy')"}
        submitData={submitData}


      />
      </div>
      </div>
      <div className="buttons flex items-center justify-center gap-4 xl:mt-[54px] mb-3 ">
        {/* <button className="rounded-[6px] text-white poppins-6 border-[1px] border-white px-5 py-2 sm:px-10 sm:py-2 ">Edit my predictions</button> */}
        <button onClick={sendPrediction} className="rounded-[6px] text-white poppins-6 border-[1px] border-redish px-10 py-2 bg-redish">Submit my prediction</button>
      </div>
      <DownloadApp />
    </div>
  );
}

export default Prediction;
