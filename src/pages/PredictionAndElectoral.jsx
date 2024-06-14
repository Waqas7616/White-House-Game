
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
import secureLocalStorage from "react-secure-storage";
import ReactGA from 'react-ga4'

function PredictionAndElectoral() {
  
    const navigate = useNavigate();
    const { president, vicePresident, party, voting, addVoting } = useStatePredictions()
    useEffect(()=>{
      ReactGA.pageview(window.location.pathname);
        },[])
    const [data, setData] = useState({
      votter_party_id: party,
      president_id: president,
      vice_president_id: vicePresident,
    });

    const [isSelectionComplete, setIsSelectionComplete] = useState(false);


    useEffect(() => {
      setData({
        votter_party_id: party,
        president_id: president,
        vice_president_id: vicePresident,
      });
    }, [president, vicePresident])
    const token = secureLocalStorage.getItem("token");
  
    const handleSelectionChange = (isComplete) => {
      setIsSelectionComplete(isComplete);
    };

    const submitData = () => {
      addVoting({
        votter_party_id: party,
        president_id: president,
        vice_president_id: vicePresident,
      });
  
    };
  
    const sendPrediction = () => {
      axios
        .post(
          "https://thewhitehousegame.com/api/public/api/select_party_leaders",
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
        })
        .catch((err) => {
          console.log("the error is :", err.message);
        });
      navigate('/electoral')
    }
  
    return (
      <div className="">
        <AppBanner
          redTitle={"MAKE A"}
          bg={bg}
          bannerTitle={"PREDICTION"}
          bannerDesc={
            <>Predict the next President and Vice President of the United States<br/>538 delegates to the Electoral College decide<br/></>
          }
          bannerDesc2={<>US President and Vice President<br/>Start by predicting each party’s candidates<br/>Then predict which party wins each state<br/>This is will determine the 538 delegates to the Electoral College</>}
        />
         <p className="poppins4 text-white text-center xl:w-[55%] xl:text-[30px] m-auto mt-5">
         Scroll the candidates and click to select <br />who you believe will be nominees on
          </p>
          <p className="poppins4 text-white/80 xl:text-[22px] text-center justify-center flex items-center gap-2 m-auto mt-5">
            <img src={calender} alt="" />
            Tuesday, November
            <span className="poppins5 text-white xl:text-[22px]">5, 2024</span>
          </p>
         <div className="resp w-10/12 m-auto flex flex-wrap items-center gap-6 justify-center mt-12">
         <div>
          <div className="flex items-center gap-3 bg-[rgba(252,222,222,0.2)] text-[10px] sm:text-[12px] md:text-[13px] xl:text-[22px] text-white w-fit px-2 py-1 rounded"><span className=""><img className="w-10" src={democratic} alt="" /></span>
          <h2>Democratic</h2>
          </div>
        <Predict
        name={'Democratic'}
          titleImage={dem}
          party={"Democratic"}
          submitData={submitData}
        onSelectionChange={handleSelectionChange}
          
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
        onSelectionChange={handleSelectionChange}

        />
         </div>
         <div>
          <div className="relative">
         <div className="flex items-center gap-3 bg-[rgba(252,222,222,0.2)] text-[10px] sm:text-[12px] md:text-[13px] xl:text-[22px] text-white w-fit px-2 py-1 rounded"><span className=""><img className="w-10" src={independent} alt="" /></span>
          <h2>Independent</h2>
          </div>
          <p className="absolute right-0 top-[7px] text-[10px] w-[52%] text-white">Select leading Independent or <br/>third party on election day</p>
          </div>
        <Predict
        name={'Independent'}
          titleImage={ind}
          party={"Independent('Kennedy')"}
          submitData={submitData}
          onSelectionChange={handleSelectionChange}
  
  
        />
        </div>
        </div>
        <div className="buttons flex flex-col items-center justify-center gap-4 xl:mt-4  ">
          {/* <button className="rounded-[6px] text-white poppins-6 border-[1px] border-white px-5 py-2 sm:px-10 sm:py-2 ">Edit my predictions</button> */}
          <button onClick={sendPrediction} disabled={!isSelectionComplete} className={`rounded-[6px] text-white poppins-6 border-[1px] border-redish px-10 py-2 bg-redish ${!isSelectionComplete?"opacity-40":""}`}>Next</button>
          <small className="text-white">Now predict the Electoral College</small>
        </div>
        <DownloadApp />
      </div>
   
  )
}

export default PredictionAndElectoral