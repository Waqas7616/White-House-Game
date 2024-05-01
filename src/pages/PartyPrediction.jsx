import React, { useState, useEffect } from 'react'
import AppBanner from '../components/appbanner/AppBanner'
import bg from "../images/predictbg.png";
import question from "../images/question.png";
import title from '../images/demTITLE.png'
import title2 from '../images/repTITLE.png'
import title3 from '../images/indTITLE.png'
import calender from "../images/calender.png";
import check from "../images/check.png";
import { useLocation } from 'react-router-dom';
import axios from 'axios';

function PartyPrediction() {
    const [isButtonClicked, setIsButtonClicked] = useState(false)
    const [sliderBackground, setSliderBackground] = useState("transparent");
    const location = useLocation();
    const data = location.state || {}
    console.log('transferred data', data)
    const [candidateData, setCandidateData] = useState([]);
    const imageUrl = "https://pankhay.com/thewhitehousegame/public/";
    // const id=localStorage.getItem('id');
    const token = localStorage.getItem('token')
    const id = 6

    useEffect(() => {
        const fetchData = async () => {
            try {


                const response = await axios.get(
                    `http://192.168.18.53:8081/api/get_predict_party_candidate/${id}`,

                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            Accept: "application/json",
                        },
                    }
                );
                setCandidateData(response.data);
            } catch (error) {
                console.log("Error: ", error);
            }
        };
        fetchData();

    }, []);

    console.log("my data is :", candidateData);
    // console.log(data.voting[0].president_id)

    const handleButtonClick = () => {
        setIsButtonClicked(true);
        setSliderBackground(
          "linear-gradient(90deg, #ED1C24 0%, #BE1E2E 50%, #1C2452 100%)"
        );


    };

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
                        Select who you think will be the Democratic Party&apos;s Presidential
                        candidate on
                    </p>
                    <p className="poppins4 text-white/80 xl:text-[22px] text-center justify-center flex items-center gap-2 m-auto mt-5">
                        <img src={calender} alt="" />
                        Tuesday, November
                        <span className="poppins5 text-white xl:text-[22px]">5, 2024</span>
                    </p>

                    <div style={{ background: sliderBackground }}
                        className={`w-full rounded-lg  pb-24  relative ${isButtonClicked&&"border-8 "}
            `}

                    >
                        <div className="flex gap-4 items-center justify-start w-full m-auto mt-[50px]">
                            <div className="w-[120px] h-[130px] sm:w-[260px] sm:h-[270px] md:w-[300px] md:h-[310px] lg:w-[350px] lg:h-[360px] lg-a:w-[450px] lg-a:h-[460px] xl:w-[500px] xl:h-[510px] xl-a:w-[562px] xl-a:h-[572px] m-auto">
                                <h4 className="poppins6 text-white xl:text-[38px]">President</h4>
                                <div className="w-[120px] h-[130px]  sm:w-[260px] sm:h-[270px] md:w-[300px] md:h-[310px] lg:w-[350px] lg:h-[360px] lg-a:w-[450px] lg-a:h-[460px] xl:w-[500px] xl:h-[510px] xl-a:w-[567.38px] xl-a:h-[572.84px] rounded-[28.43px] border-[10px] border-transparent overflow-hidden hover:border-[10px]  ">
                                    <img className='h-full w-full object-cover' src={`${imageUrl}${candidateData?.chosen_candidate?.[0]?.voter_candidate?.candidate_image}`} alt="" />
                                </div>
                            </div>
                            <div className="w-[120px] h-[130px] sm:w-[260px] sm:h-[270px] md:w-[300px] md:h-[310px] lg:w-[350px] lg:h-[360px] lg-a:w-[450px] lg-a:h-[460px] xl:w-[500px] xl:h-[510px] xl-a:w-[562px] xl-a:h-[572px] m-auto">
                                <h4 className="poppins6 text-white xl:text-[38px]">
                                    Vice President
                                </h4>
                                <div className="w-[120px] h-[130px]  sm:w-[260px] sm:h-[270px] md:w-[300px] md:h-[310px] lg:w-[350px] lg:h-[360px] lg-a:w-[450px] lg-a:h-[460px] xl:w-[500px] xl:h-[510px] xl-a:w-[567.38px] xl-a:h-[572.84px] rounded-[28.43px] border-[10px] border-transparent overflow-hidden hover:border-[10px]  ">
                                    <img className='h-full w-full object-cover' src={`${imageUrl}${candidateData?.chosen_candidate?.[1]?.voter_candidate?.candidate_image}`} alt="" />
                                </div>
                            </div>
                        </div>

                        {isButtonClicked && <img
                                className="w-12 h-12 absolute left-[49%] transform -translate-x-2 -bottom-5 border-[5px] rounded-full border-[#1c2452]"
                                src={check}
                                alt=""
                            />}
                    </div>
                    <div className="flex justify-start relative mt-24">
                            {/* Button */}
                            <button
                                onClick={handleButtonClick}
                                className={`rounded-lg px-5 py-3 bg-red-500 h-[40px] sm:w-[300px] sm:h-[50px] flex items-center justify-center gap-1 text-white font-poppins ml-3 `}
                            >
                                <img src={check} className="w-4" alt="" />{" "}
                                Select
                            </button>

                            


                        </div>
                </div>
            </div>
            <div className="bg-[#1c2452] py-[100px]">
                <div className="resp m-auto w-10/12">
                    <img src={question} alt="" className="m-auto" />
                    <img src={title2} alt="" className="m-auto mt-5" />
                    <p className="poppins4 text-white text-center xl:w-[55%] xl:text-[30px] m-auto mt-5">
                        Select who you think will be the Democratic Party&apos;s Presidential
                        candidate on
                    </p>
                    <p className="poppins4 text-white/80 xl:text-[22px] text-center justify-center flex items-center gap-2 m-auto mt-5">
                        <img src={calender} alt="" />
                        Tuesday, November
                        <span className="poppins5 text-white xl:text-[22px]">5, 2024</span>
                    </p>

                    <div style={{background:sliderBackground}}
                        className={`w-full rounded-lg  pb-24  relative ${isButtonClicked&&"border-8"}`}

                    >
                        <div className="flex gap-4 items-center justify-start w-full m-auto mt-[50px]">
                            <div className="w-[120px] h-[130px] sm:w-[260px] sm:h-[270px] md:w-[300px] md:h-[310px] lg:w-[350px] lg:h-[360px] lg-a:w-[450px] lg-a:h-[460px] xl:w-[500px] xl:h-[510px] xl-a:w-[562px] xl-a:h-[572px] m-auto">
                                <h4 className="poppins6 text-white xl:text-[38px]">President</h4>
                                <div className="w-[120px] h-[130px]  sm:w-[260px] sm:h-[270px] md:w-[300px] md:h-[310px] lg:w-[350px] lg:h-[360px] lg-a:w-[450px] lg-a:h-[460px] xl:w-[500px] xl:h-[510px] xl-a:w-[567.38px] xl-a:h-[572.84px] rounded-[28.43px] border-[10px] border-transparent overflow-hidden hover:border-[10px]  ">
                                    <img className='w-full h-full object-cover' src={`${imageUrl}${candidateData?.chosen_candidate?.[2]?.voter_candidate?.candidate_image}`} alt="" />
                                </div>
                            </div>
                            <div className="w-[120px] h-[130px] sm:w-[260px] sm:h-[270px] md:w-[300px] md:h-[310px] lg:w-[350px] lg:h-[360px] lg-a:w-[450px] lg-a:h-[460px] xl:w-[500px] xl:h-[510px] xl-a:w-[562px] xl-a:h-[572px] m-auto">
                                <h4 className="poppins6 text-white xl:text-[38px]">
                                    Vice President
                                </h4>
                                <div className="w-[120px] h-[130px]  sm:w-[260px] sm:h-[270px] md:w-[300px] md:h-[310px] lg:w-[350px] lg:h-[360px] lg-a:w-[450px] lg-a:h-[460px] xl:w-[500px] xl:h-[510px] xl-a:w-[567.38px] xl-a:h-[572.84px] rounded-[28.43px] border-[10px] border-transparent overflow-hidden hover:border-[10px]  ">
                                    <img className='w-full h-full object-cover' src={`${imageUrl}${candidateData?.chosen_candidate?.[3]?.voter_candidate?.candidate_image}`} alt="" />
                                </div>
                            </div>
                        </div>

                        {isButtonClicked&& <img
                                className="w-12 h-12 absolute left-[49%] transform -translate-x-2 -bottom-5 border-[5px] rounded-full border-[#1c2452]"
                                src={check}
                                alt=""
                            />}
                    </div>
                    <div className="flex justify-start relative mt-24">
                            {/* Button */}
                            <button
                                  onClick={handleButtonClick}
                                className={`rounded-lg px-5 py-3 bg-red-500 h-[40px] sm:w-[300px] sm:h-[50px] flex items-center justify-center gap-1 text-white font-poppins ml-3 `}
                            >
                                <img src={check} className="w-4" alt="" />{" "}
                                Select
                            </button>


                           

                        </div>
                </div>
            </div>

            <div className="bg-[#1c2452] py-[100px]">
                <div className="resp m-auto w-10/12">
                    <img src={question} alt="" className="m-auto" />
                    <img src={title3} alt="" className="m-auto mt-5" />
                    <p className="poppins4 text-white text-center xl:w-[55%] xl:text-[30px] m-auto mt-5">
                        Select who you think will be the Democratic Party&apos;s Presidential
                        candidate on
                    </p>
                    <p className="poppins4 text-white/80 xl:text-[22px] text-center justify-center flex items-center gap-2 m-auto mt-5">
                        <img src={calender} alt="" />
                        Tuesday, November
                        <span className="poppins5 text-white xl:text-[22px]">5, 2024</span>
                    </p>

                    <div style={{background:sliderBackground}}
                        className={`w-full rounded-lg pb-24 relative ${isButtonClicked&&"border-8"}`}

                    >
                        <div className="flex gap-4 items-center justify-start w-full m-auto mt-[50px]">
                            <div className="w-[120px] h-[130px] sm:w-[260px] sm:h-[270px] md:w-[300px] md:h-[310px] lg:w-[350px] lg:h-[360px] lg-a:w-[450px] lg-a:h-[460px] xl:w-[500px] xl:h-[510px] xl-a:w-[562px] xl-a:h-[572px] m-auto">
                                <h4 className="poppins6 text-white xl:text-[38px]">President</h4>
                                <div className="w-[120px] h-[130px]  sm:w-[260px] sm:h-[270px] md:w-[300px] md:h-[310px] lg:w-[350px] lg:h-[360px] lg-a:w-[450px] lg-a:h-[460px] xl:w-[500px] xl:h-[510px] xl-a:w-[567.38px] xl-a:h-[572.84px] rounded-[28.43px] border-[10px] border-transparent overflow-hidden hover:border-[10px]  ">
                                    <img className='h-full w-full object-cover' src={`${imageUrl}${candidateData?.chosen_candidate?.[4]?.voter_candidate?.candidate_image}`} alt="" />
                                </div>
                            </div>
                            <div className="w-[120px] h-[130px] sm:w-[260px] sm:h-[270px] md:w-[300px] md:h-[310px] lg:w-[350px] lg:h-[360px] lg-a:w-[450px] lg-a:h-[460px] xl:w-[500px] xl:h-[510px] xl-a:w-[562px] xl-a:h-[572px] m-auto">
                                <h4 className="poppins6 text-white xl:text-[38px]">
                                    Vice President
                                </h4>
                                <div className="w-[120px] h-[130px]  sm:w-[260px] sm:h-[270px] md:w-[300px] md:h-[310px] lg:w-[350px] lg:h-[360px] lg-a:w-[450px] lg-a:h-[460px] xl:w-[500px] xl:h-[510px] xl-a:w-[567.38px] xl-a:h-[572.84px] rounded-[28.43px] border-[10px] border-transparent overflow-hidden hover:border-[10px]  ">
                                    <img className='h-full w-full object-cover' src={`${imageUrl}${candidateData?.chosen_candidate?.[5]?.voter_candidate?.candidate_image}`} alt="" />
                                </div>
                            </div>
                        </div>

                       {isButtonClicked&&  <img
                                className="w-12 h-12 absolute left-[49%] transform -translate-x-2 -bottom-5 border-[5px] border-[#1c2452] rounded-full"
                                src={check}
                                alt=""
                            />}
                    </div>
                    <div className="flex justify-start relative mt-24">
                            {/* Button */}
                            <button
                                  onClick={handleButtonClick}
                                className={`rounded-lg px-5 py-3 bg-red-500 h-[40px] sm:w-[300px] sm:h-[50px] flex items-center justify-center gap-1 text-white font-poppins ml-3 `}
                            >
                                <img src={check} className="w-4" alt="" />{" "}
                                Select
                            </button>


                          

                        </div>
                </div>
            </div>
        </div>
    )
}

export default PartyPrediction
