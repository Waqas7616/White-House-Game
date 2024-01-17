import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import img from "../images/cloths.png";
// import ballot from "../images/ballot.png";
import black from "../images/black.jpg";
import red from "../images/red.jpg";
import navy from "../images/navy.jpg";
import burgundy1 from "../images/burgundy1.jpg";
import red1 from "../images/red1.jpg";
import navy1 from "../images/navy1.jpg";
// import burgundy1 from '../images/burgundy1.jpg'
import red2 from "../images/red2.jpg";
import navy2 from "../images/navy2.jpg";
import burgundy2 from "../images/burgundy2.jpg";
import red3 from "../images/red3.jpg";
import navy3 from "../images/navy3.jpg";
import burgundy3 from "../images/burgundy3.jpg";
import red4 from "../images/red4.jpg";
import navy4 from "../images/navy4.jpg";
import burgundy4 from "../images/burgundy4.jpg";

const CustomNextArrow = (props) => (
  <div
    {...props}
    className="absolute top-[30%] lg:right-[0%] xl:right-[2%] transform cursor-pointer"
  >
    <span className="text-2xl">
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
          fill-rule="evenodd"
          clip-rule="evenodd"
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
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
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
            <stop stop-color="#ED1C24" />
            <stop offset="1" stop-color="#1C2452" />
          </linearGradient>
        </defs>
      </svg>
    </span>
  </div>
);

const CustomPrevArrow = (props) => (
  <div
    {...props}
    className="absolute top-[30%] left-[-3%] z-50 transform translate-y-2 cursor-pointer"
  >
    <span className="text-2xl ">
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
            fill-rule="evenodd"
            clip-rule="evenodd"
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
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
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

export default function Shop() {
  const [changeColor, setChangeColor] = useState("");
  const ChnageColor = (item) => {
    console.log("Indes of shirt :", item);
    setChangeColor(item);
    // console.log("click", changeColor);
  };
  const settings1 = {
    className: "center",
    centerMode: true,
    centerPadding: "0px",
    dots: false,
    infinite: true,
    arrows: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 2,
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

  const Porducts = [
    {
      product_name: "Believe Design Products",
      Image_Url: black,
      red: red,
      navy: navy,
      price: "$120",
      id: "1",
    },
    {
      product_name: "Bidden and trump Funny pictures on shirt",
      Image_Url: burgundy2,
      red: red2,
      navy: navy2,
      price: "$52.99",
      id: "2",
    },
    {
      product_name: "Black Grunge Christmas T Shirts, Hoodeis",
      Image_Url: burgundy1,
      red: red1,
      navy: navy1,
      price: "$27.99",
      id: "3",
    },
    {
      product_name: "Cat Shirts",
      Image_Url: burgundy4,
      red: red4,
      navy: navy4,
      price: "$26.99",
      id: "4",
    },
    {
      product_name: "The White House Game",
      Image_Url: burgundy3,
      red: red3,
      navy: navy3,
      price: "$41.49",
      id: "5",
    },
  ];
  return (
    <div className="CondidateList-section py-12">
      <div className="w-8/12 m-auto">
        <div>
          <h2 className="text-[36px] text-[#000] orbit9 flex justify-between items-center mb-5">
            {" "}
            Shop <span className="text-redish text-[16px]">ALL PRODUCTS</span>
          </h2>
          <Slider {...settings1}>
            {Porducts.map((item, index) => (
              <div key={index} className="    relative">
                <div className="px-2 w-[255px] ">
                  <div>
                    <h2 className="absolute top-1 left-3 z-50 bg-[#1C2452] text-[#fff] text-[14px] poppins4 px-3 ">
                      NEW
                    </h2>
                    <h2
                      className="absolute top-7 left-3 z-50 text-[#fff] text-[14px] poppins4 px-4 "
                      style={{
                        background:
                          "linear-gradient(90deg, #ED1C24 0%, #1C2452 100%)",
                      }}
                    >
                      20%OFF
                    </h2>
                  </div>
                  <div className="bg-[#FFFFFF] flex justify-center flex-col items-center h-[340px]  relative">
                    <div className="">
                      {changeColor === item?.id ? (
                        <img src={item.Image_Url} alt="i" />
                      ) : changeColor === item?.id ? (
                        <img src={item.red} alt="e" />
                      ) : (
                        <img src={item.navy} alt="nothing" />
                      )}
                    </div>
                    <div className="shopDots flex gap-3  absolute bottom-4">
                      <div
                        className="bg-[#8D3450] w-[10px] h-[10px] rounded-full "
                        onClick={() => ChnageColor(item?.id)}
                      ></div>
                      <div
                        className="bg-redish w-[10px] h-[10px] rounded-full"
                        onClick={() => ChnageColor(item?.id)}
                      ></div>
                      <div
                        className="bg-[#2E343E] w-[10px] h-[10px] rounded-full"
                        onClick={() => ChnageColor(item?.id)}
                      ></div>
                    </div>
                  </div>
                  <p className="flex items-start justify-between text-[#363636] text-[14px] poppins3 mt-3">
                    {item.product_name}{" "}
                    <span className="text-redish text poppins4">
                      {item.price}
                    </span>
                  </p>
                  <p className="text-[12px] text-[#000] poppins3 underline mt-3">
                    Select options
                  </p>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
}
