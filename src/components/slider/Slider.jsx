import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

import axios from "axios";

import { Modal } from "../modal/Modal";
import Loading from "../skeleton/Loading";

function CustomSlider() {
  const [selectedCandidateIndex, setSelectedCandidateIndex] = useState(null);
  const handleCandidateClick = (index) => {
    setSelectedCandidateIndex(index);
  };

  const handleClose = () => setSelectedCandidateIndex(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".modal-container")) {
        handleClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const [data, setData] = useState([]);

  const [loading, setLoading] = useState(true);

  const imageUrl = "http://thewhitehousegame.com/public/";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://thewhitehousegame/public/api/get_votter_candidate",
          {
            headers: {
              Accept: "application/json",
            },
          }
        );
        setData(response.data.votter_candidate);
        console.log("halaka :", response)
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    // console.log("habibi", data);
  }, []);

  const CustomNextArrow = (props) => (
    <div
      {...props}
      className="absolute top-[13%] right-[.5%] sm:top-[13%] sm:-right-[1.5%] md:top-[13%] md:-right-[5.5%] lg:top-[13%] lg:-right-[1%] xl:top-[13%] xl:-right-[0%]  transform cursor-pointer"
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
      className="absolute w-fit top-[13%] left-[-3%] sm:top-[13%] sm:-right-[1.5%] md:top-[13%] md:-right-[1.5%] lg:top-[13%] lg:-right-[1.5%] z-50  cursor-pointer"
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

  const [extended, setExtended] = useState(false);
  const handleExtention = () => {
    setExtended(!extended);
    // console.log(extended)
  };
  const settings = {
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      {selectedCandidateIndex !== null && (
        <div className="shadow-2xl ">
          <div className="fixed flex items-center justify-center w-full h-full top-0  z-50 ">
            <div className=" z-50  modal-container ">
              <Modal
                candidate={data[selectedCandidateIndex]}
                onClose={() => setSelectedCandidateIndex(null)}
                handleClose={handleClose}
              />
            </div>
          </div>
        </div>
      )}

      <div className="customSlider bg-white">
        <div className="titles flex justify-between items-center resp w-10/12 m-auto">
          <h1 className="orbit9 text-blackColor md:text-[37px]">
            Candidates List
          </h1>
          <h2
            className="orbit7 text-redish uppercase text-[16px] cursor-pointer"
            onClick={handleExtention}
          >
            {extended ? "see less" : "see all"}
          </h2>
        </div>
        <div className="candidatesList  w-10/12 m-auto mt-8 resp relative">
          {loading && (
            // <span className="relative flex h-3 w-3">
            //   <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-900 opacity-75 text-[red]">
            //     Loading
            //   </span>
            //   <span className="relative inline-flex rounded-full h-3 w-3 bg-[red]"></span>
            // </span>
            <Loading />
          )}
          {!extended ? (
            <Slider {...settings}>
              {data?.map((item, index) => (
                <div
                  key={index}
                  className="candidate flex flex-col items-center justify-between gap-[10px] "
                  onClick={() => handleCandidateClick(index)}
                >
                  <div className="image w-[129px] h-[129px] sm:w-[150px] sm:h-[150px] rounded-[50%]  flex">
                    <img
                      className=" w-[129px] h-[129px] sm:w-[130px] sm:h-[130px] md:w-[150px] md:h-[150px]   rounded-[50%] object-cover cursor-pointer"
                      src={`${imageUrl}${item?.candidate_image}`}
                      alt=""
                      onClick={() => handleCandidateClick(index)}
                    />
                  </div>
                  <h5 className="poppins5 text-[17px] text-center  lg:text-center lg:mr-10 text-blackColor">
                    {/* {item.candidate_name.split(" ")[1]} */}
                    {item.candidate_name === 'Robert F Kennedy' ? item.candidate_name.split(" ")[2] : item.candidate_name.split(" ")[0]}
                    {/* {item.candidate_name.split(" ")[0]} */}
                  </h5>
                </div>
              ))}
            </Slider>
          ) : (
            <div className="flex flex-wrap justify-center gap-12">
              {data?.map((item, index) => (
                <div
                  key={index}
                  className="candidate flex flex-col items-center justify-between gap-[10px]"
                >
                  <div className="image w-[129px] h-[129px] sm:w-[150px] sm:h-[150px] rounded-[50%]  flex">
                    <img
                      className=" w-[129px] h-[129px] sm:w-[150px] sm:h-[150px] rounded-[50%] object-cover cursor-pointer"
                      src={`${imageUrl}${item?.candidate_image}`}
                      alt=""
                      onClick={() => handleCandidateClick(index)}
                    />
                  </div>
                  <h5 className="poppins5 text-[17px] text-center text-blackColor">
                    {item.candidate_name === 'Robert F Kennedy' ? item.candidate_name.split(" ")[2] : item.candidate_name.split(" ")[0]}
                  </h5>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default CustomSlider;
