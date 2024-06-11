import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import AppBanner from "../appbanner/AppBanner";
import DownloadApp from "../DownloadApp";
import Democraticlogo from "../../images/Democratic_Party-logo-108C42372F-seeklogo 1.svg";
import Republicanlogo from "../../images/Republicanlogo 1.svg";
import Independentlogo from "../../images/Constitution_Party_(USA)_logo 1.svg";
import bg from "../../images/candidatebg.jpg";

const Candidate = () => {
  const [showCard, setShowCard] = useState(null);

  const handleSvgClick = (index) => {
    setShowCard(showCard === index ? null : index);
  };

  const CustomNextArrow = (props) => (
    <div
      {...props}
      className="absolute  right-[.5%]  sm:-right-[1.5%]  md:-right-[5.5%]  lg:-right-[4.6%] top-[50%] translate-y-[-50%] xl:-right-[2%]  transform cursor-pointer"
    >
      <span className="text-2xl opacity-[0.5] hover:opacity-100">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="90"
          height="91"
          viewBox="0 0 90 91"
          fill="none"
        >
          <g filter="url(#filter0_d_49_552)">
            <rect
              x="25"
              y="25"
              width="40"
              height="41"
              rx="10"
              fill="url(#paint0_linear_49_552)"
            />
          </g>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M41.2998 37.2391C41.4615 37.0856 41.6758 37 41.8987 37C42.1216 37 42.336 37.0856 42.4976 37.2391L49.5036 44.0004C49.6605 44.1495 49.7853 44.3288 49.8707 44.5277C49.956 44.7265 50 44.9406 50 45.1569C50 45.3733 49.956 45.5873 49.8707 45.7862C49.7853 45.985 49.6605 46.1644 49.5036 46.3134L42.4469 53.1247C42.1196 53.4397 41.5895 53.4437 41.2573 53.1328C41.1769 53.0588 41.1125 52.969 41.0683 52.869C41.024 52.769 41.0008 52.661 41 52.5517C40.9993 52.4423 41.021 52.334 41.0638 52.2334C41.1067 52.1328 41.1697 52.0421 41.2491 51.9669L47.7069 45.7349C47.7854 45.6604 47.8479 45.5707 47.8906 45.4713C47.9333 45.3718 47.9553 45.2647 47.9553 45.1565C47.9553 45.0483 47.9333 44.9412 47.8906 44.8417C47.8479 44.7423 47.7854 44.6526 47.7069 44.5781L41.3007 38.3951C41.2222 38.3207 41.1597 38.231 41.117 38.1317C41.0743 38.0323 41.0523 37.9253 41.0523 37.8171C41.0523 37.7089 41.0743 37.6019 41.117 37.5025C41.1597 37.4032 41.2214 37.3135 41.2998 37.2391Z"
            fill="white"
          />
          <defs>
            <filter
              id="filter0_d_49_552"
              x="0"
              y="0"
              width="90"
              height="91"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset />
              <feGaussianBlur stdDeviation="12.5" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
              />
              <feBlend
                mode="normal"
                in2="BackgroundImageFix"
                result="effect1_dropShadow_49_552"
              />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow_49_552"
                result="shape"
              />
            </filter>
            <linearGradient
              id="paint0_linear_49_552"
              x1="25"
              y1="48.78"
              x2="65"
              y2="48.78"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#ED1C24" />
              <stop offset="1" stopColor="#1C2452" />
            </linearGradient>
          </defs>
        </svg>
      </span>
    </div>
  );
  const CustomPrevArrow = (props) => (
    <div
      {...props}
      className="absolute w-fit  left-[-2%] top-[50%] translate-y-[-50%] sm:-right-[1.5%]  md:-right-[2.5%]  lg:-right-[1.5%] z-50  cursor-pointer"
    >
      <span className="text-2xl opacity-[0.5] hover:opacity-100">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="90"
          height="91"
          viewBox="0 0 90 91"
          fill="none"
        >
          <g>
            <g filter="url(#paint0_linear_49_552)">
              <rect
                x="25"
                y="25"
                width="40"
                height="41"
                rx="10"
                fill="url(#paint0_linear_49_552)"
              />
            </g>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M49.7002 37.2391C49.5385 37.0856 49.3242 37 49.1013 37C48.8784 37 48.664 37.0856 48.5024 37.2391L41.4964 44.0004C41.3395 44.1495 41.2147 44.3288 41.1293 44.5277C41.044 44.7265 41 44.9406 41 45.1569C41 45.3733 41.044 45.5873 41.1293 45.7862C41.2147 45.985 41.3395 46.1644 41.4964 46.3134L48.5531 53.1247C48.8804 53.4397 49.4105 53.4437 49.7427 53.1328C49.8231 53.0588 49.8875 52.969 49.9317 52.869C49.976 52.769 49.9992 52.661 50 52.5517C50.0007 52.4423 49.979 52.334 49.9362 52.2334C49.8933 52.1328 49.8303 52.0421 49.7509 51.9669L43.2931 45.7349C43.2146 45.6604 43.1521 45.5707 43.1094 45.4713C43.0667 45.3718 43.0447 45.2647 43.0447 45.1565C43.0447 45.0483 43.0667 44.9412 43.1094 44.8417C43.1521 44.7423 43.2146 44.6526 43.2931 44.5781L49.6993 38.3951C49.7778 38.3207 49.8403 38.231 49.883 38.1317C49.9257 38.0323 49.9477 37.9253 49.9477 37.8171C49.9477 37.7089 49.9257 37.6019 49.883 37.5025C49.8403 37.4032 49.7786 37.3135 49.7002 37.2391Z"
              fill="white"
            />
          </g>
          <defs>
            <filter
              id="filter0_d_49_549"
              x="0"
              y="0"
              width="90"
              height="91"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset />
              <feGaussianBlur stdDeviation="12.5" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
              />
              <feBlend
                mode="normal"
                in2="BackgroundImageFix"
                result="effect1_dropShadow_49_549"
              />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow_49_549"
                result="shape"
              />
            </filter>
          </defs>
        </svg>
      </span>
    </div>
  );

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const imageUrl = "https://thewhitehousegame.com/public/";

  const getBackgroundColor = (partyName) => {
    if (
      partyName.includes("Democratic") ||
      partyName.includes("Republican") ||
      partyName.includes("Independent")
    ) {
      return "bg-white";

      return "bg-white";
    }
  };

  const getBackgroundImageStyle = (partyName) => {
    if (partyName.includes("Democratic")) {
      return {
        backgroundImage: `url(${Democraticlogo})`,
      };
    } else if (partyName.includes("Republican")) {
      return {
        backgroundImage: `url(${Republicanlogo})`,
      };
    } else if (partyName.includes("Independent")) {
      return {
        backgroundImage: `url(${Independentlogo})`,
      };
    }
    return {};
  };

  const getTextColor = (partyName) => {
    if (partyName.includes("Democratic") || partyName.includes("Republican")) {
      return "text-white";
    } else {
      return "text-gray-700";
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://thewhitehousegame.com/public/api/get_votter_candidate",
          {
            headers: {
              Accept: "application/json",
            },
          }
        );
        setData(response.data.votter_candidate);
        console.log("candidatessss Data", data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const settings = {
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <div className="h-screen">
        <AppBanner
          bannerTitle={"Data"}
          redTitle={"Candidate"}
          bannerDesc={
            <>Candidates and potential Candidates for <br/>President and Vice President</>
          }
          bg={bg}
        />
        <div className="mt-5 m-auto w-[85%] border-none">
          <div className="flex justify-center my-8 ">
            <h2 className="text-[#fff] text-[9px] md:text-[18px] orbit7 w-9/12 m-auto  text-center">
              A lot can happen before voting on Tuesday November 5, 2024{" "}
            </h2>
          </div>
          <Slider {...settings}>
            {data.map((item, index) => (
              <div key={index} className="p-4 relative">
                <div className="bg-white shadow-xl h-[450px] rounded-2xl overflow-hidden relative ">
                  <svg
                    onClick={() => handleSvgClick(index)}
                    className="flip absolute right-4 top-3 cursor-pointer fill-current text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 24c6.627 0 12-5.373 12-12s-5.373-12-12-12-12 5.373-12 12 5.373 12 12 12zm1-6h-2v-8h2v8zm-1-12.25c.69 0 1.25.56 1.25 1.25s-.56 1.25-1.25 1.25-1.25-.56-1.25-1.25.56-1.25 1.25-1.25z" />
                  </svg>
                  <div className="w-full h-full overflow-hidden">
                    <img
                      src={`${imageUrl}${item?.candidate_image}`}
                      alt="profile-picture"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div
                    className={`absolute ${
                      showCard === index ? "z-0" : "z-50"
                    } -bottom-3 left-[50%] translate-x-[-50%] w-full bg-white flex flex-row items-center gap-5 justify-center h-[80px] mt-2 mb-3`}
                  >
                    <div className="rounded-full h-[38px] w-[38px] shadow-xl shadow-[#0000004d]">
                      <img
                        className="w-9 text-center"
                        src={`${imageUrl}${item?.party?.party_badge}`}
                        alt=""
                      />
                    </div>
                    <div className="flex flex-col text-right items-center mr-10">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {item?.candidate_name}
                      </h3>
                      <p className="text-gray-700">
                        {item?.party?.party_name.split("(")[0]}
                      </p>
                    </div>
                  </div>
                </div>
                {showCard === index && (
                  <div className="absolute inset-0  shadow-2xl rounded-2xl overflow-hidden transform flip-animation z-10   border-none bg-[white]">
                    <div className="relative py-8 px-5 flex flex-col justify-start h-full">
                      {/* <svg
                        onClick={() => handleSvgClick(index)}
                        className="flip absolute right-4 top-3 cursor-pointer fill-current"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 24c6.627 0 12-5.373 12-12s-5.373-12-12-12-12 5.373-12 12 5.373 12 12 12zm1-6h-2v-8h2v8zm-1-12.25c.69 0 1.25.56 1.25 1.25s-.56 1.25-1.25 1.25-1.25-.56-1.25-1.25.56-1.25 1.25-1.25z" />
                      </svg> */}
                      <svg
                        onClick={() => handleSvgClick(index)}
                        className="flip absolute right-4 top-3 cursor-pointer fill-current w-6"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18 18 6M6 6l12 12"
                        />
                      </svg>

                      <div style={{ position: "relative", height: "100%" }}>
                        <img
                          src={
                            item?.party?.party_name.includes("Democratic")
                              ? Democraticlogo
                              : item?.party?.party_name.includes("Republican")
                              ? Republicanlogo
                              : item?.party?.party_name.includes(
                                  "Independent('Kennedy')"
                                )
                              ? Independentlogo
                              : ""
                          }
                          alt=""
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "100% 60%",
                            opacity: "0.25",
                          }}
                        />
                        <div className="absolute top-0 left-0 right-0 bottom-0 flex flex-col justify-start items-start text-white">
                          <h3 className="mb-3 font-extrabold poppins6 text-[20px] md:text-[25px] text-black">
                            {item?.candidate_name}
                          </h3>
                          <p className="text-[14px] md:text-[16px] lg:text-[18px] poppins4 text-black">
                            Born: {item?.dob}
                          </p>
                          <p className="mb-3 text-[12px] md:text-[14px] lg:text-[15px] xl:text-[18px] poppins4 text-black w-auto md:w-[80%] acer:w-[70%] 2xl:w-[60%]">
                            {item?.birth_place}
                          </p>
                          <p className="mb-3 text-[12px] md:text-[14px] lg:text-[15px] xl:text-[18px] poppins4 text-black">
                            Occupation: {item?.occupation}
                          </p>
                          <p className="mb-3 text-[12px] md:text-[14px] lg:text-[15px] xl:text-[18px] poppins6 text-black">
                            {item?.party?.party_name ===
                              "Independent('Kennedy')" &&
                            (item?.id === 33 || item.id === 34)
                              ? "Kennedy Independent"
                              : item?.party?.party_name ===
                                  "Independent('Kennedy')" &&
                                (item?.id === 3 || item.id === 10)
                              ? "Green Party Independent"
                              : item?.party?.party_name ===
                                  "Independent('Kennedy')" && item?.id === 36
                              ? "Libertarian Party Independent"
                              : item?.party?.party_name.split("(")[0]}
                          </p>
                          <p className=" text-[12px] md:text-[14px] lg:text-[15px] xl:text-[18px] poppins4 text-black ">
                            <ul>
                              {item.position &&
                                item?.position
                                  .split(",")
                                  .map((positionItem, index) => (
                                    <li
                                      key={index}
                                      className="mb-2 text-[12px] md:text-[14px] lg:text-[15px] xl:text-[18px] poppins4 text-black"
                                    >
                                      {positionItem.trim()}
                                    </li>
                                  ))}
                            </ul>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </Slider>
        </div>
        <div>
          <DownloadApp />
        </div>
      </div>
    </>
  );
};

export default Candidate;
