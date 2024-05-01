import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import img from "../images/cloths.png";
// import ballot from "../images/ballot.png";
import black from "../images/black.png";
import red from "../images/red.png";
import navy from "../images/navy.png";
import burgundy1 from "../images/burgundy1.png";
import red1 from "../images/red1.png";
import navy1 from "../images/navy1.png";
// import burgundy1 from '../images/burgundy1.jpg'
import red2 from "../images/red2.png";
import navy2 from "../images/navy2.png";
import burgundy2 from "../images/burgundy2.png";
import red3 from "../images/red3.png";
import navy3 from "../images/navy3.png";
import burgundy3 from "../images/burgundy3.png";
import red4 from "../images/red4.png";
import navy4 from "../images/navy4.png";
import burgundy4 from "../images/burgundy4.png";

const CustomNextArrow = (props) => (
  <div
    {...props}
    className="absolute top-[30%] right-[-20%] sm:right-[-10%] md:right-[-7%] lg:right-[-5%] xl:right-[-3%]  cursor-pointer"
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
    className="absolute top-[30%] left-[-18%] sm:left-[-10%] md:left-[-7%] lg:left-[-5%] xl:left-[-3%] z-50  cursor-pointer"
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

export default function Shop() {
  useEffect(() => {
    // console.log("my screen is ", window.innerHeight);
  }, []);
  const [changeColor, setChangeColor] = useState("");
  const ChangeIndex = (index) => {
    // console.log("Indes of shirt :", item);
    setChangeColor(index);
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
          dots: false,
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

  // const Porducts = [
  //   {
  //     product_name: "Believe Design Products",
  //     Image_Url: black,
  //     red: red,
  //     navy: navy,
  //     price: "$120",
  //     id: "1",
  //   },
  //   {
  //     product_name: "Bidden and trump Funny pictures on shirt",
  //     Image_Url: burgundy2,
  //     red: red2,
  //     navy: navy2,
  //     price: "$52.99",
  //     id: "2",
  //   },
  //   {
  //     product_name: "Black Grunge Christmas T Shirts, Hoodeis",
  //     Image_Url: burgundy1,
  //     red: red1,
  //     navy: navy1,
  //     price: "$27.99",
  //     id: "3",
  //   },
  //   {
  //     product_name: "Cat Shirts",
  //     Image_Url: burgundy4,
  //     red: red4,
  //     navy: navy4,
  //     price: "$26.99",
  //     id: "4",
  //   },
  //   {
  //     product_name: "The White House Game",
  //     Image_Url: burgundy3,
  //     red: red3,
  //     navy: navy3,
  //     price: "$41.49",
  //     id: "5",
  //   },
  // ];
  return (
    <div className="CondidateList-section py-12">
      <div className="w-8/12 m-auto resp">
        <div>
          <h2 className="md:text-[36px] text-[#000] orbit9 flex justify-between items-center mb-5">
            {" "}
            Shop{" "}
            <a
              href="https://thewhitehousegame.myspreadshop.com/"
              className="text-redish md:text-[16px]"
            >
              ALL PRODUCTS
            </a>
          </h2>
          <Slider {...settings1}>
            <div className="    relative ">
              <div className="px-2  ">
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
                <div className="bg-[#F9F6E5] flex justify-center flex-col items-center h-[410px] acer:h-[410px]  relative">
                  <div className="py-5">
                    <img
                      src={
                        changeColor === 1
                          ? black
                          : changeColor === 2
                            ? red
                            : navy
                      }
                      alt=""
                    />
                  </div>
                  <div className="shopDots flex gap-3  absolute bottom-5">
                    <div className="border-[1px] border-transparent rounded-full p-1 hover:border-[1px] hover:border-[#000] hover:rounded-full hover:p-1" onClick={() => ChangeIndex(1)}>
                      <div
                        className="bg-[#000] w-[10px] h-[10px] rounded-full"

                      ></div>
                    </div>
                    <div className="border-[1px] border-transparent rounded-full p-1 hover:border-[1px] hover:border-redish hover:rounded-full hover:p-1" onClick={() => ChangeIndex(2)}>
                      <div
                        className="bg-redish w-[10px] h-[10px] rounded-full"

                      ></div>
                    </div>
                    <div className="border-[1px] border-transparent rounded-full p-1 hover:border-[1px] hover:border-[#2E343E] hover:rounded-full hover:p-1" onClick={() => ChangeIndex(3)}>
                      <div
                        className="bg-[#2E343E] w-[10px] h-[10px] rounded-full"

                      ></div>
                    </div>
                  </div>
                </div>
                <p className="flex items-start justify-between text-[#363636] text-[14px] poppins3 mt-3">
                  Believe Design Products
                  <span className="text-redish text poppins4">$120</span>
                </p>
                <a
                  href="https://thewhitehousegame.myspreadshop.com/believe+design+products-A655c9cfab17f820ce648a9be?productType=812&sellable=ZbogDxayRkFLbxb73MR2-812-7&appearance=397"
                  className="text-[12px] text-[#000] poppins3 underline mt-3"
                >
                  Select options
                </a>
              </div>
            </div>
            <div className="    relative">
              <div className="px-2  ">
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
                <div className="bg-[#E8F0F3] flex justify-center flex-col items-center h-[410px] acer:h-[410px]  relative">
                  <div className="">
                    <img
                      src={
                        changeColor === 4
                          ? burgundy2
                          : changeColor === 5
                            ? red2
                            : navy2
                      }
                      alt=""
                    />
                  </div>
                  <div className="shopDots flex gap-3  absolute bottom-5">
                    <div className="border-[1px] border-transparent rounded-full p-1 hover:border-[1px] hover:border-[#8A344D] hover:rounded-full hover:p-1" onClick={() => ChangeIndex(4)}>
                      <div
                        className="bg-[#8A344D] w-[10px] h-[10px] rounded-full"

                      ></div>
                    </div>
                    <div className="border-[1px] border-transparent rounded-full p-1 hover:border-[1px] hover:border-redish hover:rounded-full hover:p-1" onClick={() => ChangeIndex(5)}>
                      <div
                        className="bg-redish w-[10px] h-[10px] rounded-full"

                      ></div>
                    </div>
                    <div className="border-[1px] border-transparent rounded-full p-1 hover:border-[1px] hover:border-[#2E343E] hover:rounded-full hover:p-1" onClick={() => ChangeIndex(6)}>
                      <div
                        className="bg-[#2E343E] w-[10px] h-[10px] rounded-full"

                      ></div>
                    </div>
                  </div>
                </div>
                <p className="flex items-start justify-between text-[#363636] text-[14px] poppins3 mt-3">
                  Bidden and trump Funny pictures on shirt
                  <span className="text-redish text poppins4">$52.99</span>
                </p>
                <a
                  href="https://thewhitehousegame.myspreadshop.com/bidden+and+trump+funny+pictures+on+shirt-A655b3ef2b17f820ce6792ffb?productType=20&sellable=Ln4k1Qxz75IJoGoG5BwO-20-22&appearance=4"
                  className="text-[12px] text-[#000] poppins3 underline mt-3"
                >
                  Select options
                </a>
              </div>
            </div>
            <div className="    relative">
              <div className="px-2  ">
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
                <div className="bg-[#f9f6e5] flex justify-center flex-col items-center h-[410px] acer:h-[410px]  relative">
                  <div className="">
                    <img className=""
                      src={
                        changeColor === 7
                          ? burgundy1
                          : changeColor === 8
                            ? red1
                            : navy1
                      }
                      alt=""
                    />
                  </div>
                  <div className="shopDots flex gap-3  absolute bottom-5">
                    <div className="border-[1px] border-transparent rounded-full p-1 hover:border-[1px] hover:border-[#8A344D] hover:rounded-full hover:p-1" onClick={() => ChangeIndex(7)}>
                      <div
                        className="bg-[#8A344D] w-[10px] h-[10px] rounded-full"

                      ></div>
                    </div>
                    <div className="border-[1px] border-transparent rounded-full p-1 hover:border-[1px] hover:border-redish hover:rounded-full hover:p-1" onClick={() => ChangeIndex(8)}>
                      <div
                        className="bg-redish w-[10px] h-[10px] rounded-full"

                      ></div>
                    </div>
                    <div className="border-[1px] border-transparent rounded-full p-1 hover:border-[1px] hover:border-[#353983] hover:rounded-full hover:p-1" onClick={() => ChangeIndex(9)}>
                      <div
                        className="bg-[#353983] w-[10px] h-[10px] rounded-full"

                      ></div>
                    </div>
                  </div>
                </div>
                <p className="flex items-start justify-between text-[#363636] text-[14px] poppins3 mt-3">
                  Black Grunge Christmas T Shirts, Hoodeis
                  <span className="text-redish text poppins4">$27.99</span>
                </p>
                <a
                  href="https://thewhitehousegame.myspreadshop.com/black+grunge+christmas+t+shirts+hoodeis-A655c9b63b17f820ce642c62b?productType=815&sellable=2LV0YLZV07uRy0ym2VMJ-815-9&appearance=317"
                  className="text-[12px] text-[#000] poppins3 underline mt-3"
                >
                  Select options
                </a>
              </div>
            </div>
            <div className="    relative">
              <div className="px-2  ">
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
                <div className="bg-[#E4E9ED] flex justify-center flex-col items-center h-[410px] acer:h-[410px]  relative">
                  <div className="">
                    <img
                      src={
                        changeColor === 10
                          ? burgundy4
                          : changeColor === 11
                            ? red4
                            : navy4
                      }
                      alt=""
                    />
                  </div>
                  <div className="shopDots flex gap-3  absolute bottom-5">
                    <div className="border-[1px] border-transparent rounded-full p-1 hover:border-[1px] hover:border-[#8A344D] hover:rounded-full hover:p-1" onClick={() => ChangeIndex(10)}>
                      <div
                        className="bg-[#8A344D] w-[10px] h-[10px] rounded-full"

                      ></div>
                    </div>
                    <div className="border-[1px] border-transparent rounded-full p-1 hover:border-[1px] hover:border-redish hover:rounded-full hover:p-1" onClick={() => ChangeIndex(11)}>
                      <div
                        className="bg-redish w-[10px] h-[10px] rounded-full"

                      ></div>
                    </div>
                    <div className="border-[1px] border-transparent rounded-full p-1 hover:border-[1px] hover:border-[#2E343E] hover:rounded-full hover:p-1" onClick={() => ChangeIndex(12)}>
                      <div
                        className="bg-[#2E343E] w-[10px] h-[10px] rounded-full"

                      ></div>
                    </div>
                  </div>
                </div>
                <p className="flex items-start justify-between text-[#363636] text-[14px] poppins3 mt-3">
                  Cat Shirts
                  <span className="text-redish text poppins4">$26.99</span>
                </p>
                <a
                  href="https://thewhitehousegame.myspreadshop.com/cat+shirts-A655b3b4c8ba6e22839213f65?productType=210&sellable=wQO8dpZjn4u9Qon997Lv-210-7&appearance=231"
                  className="text-[12px] text-[#000] poppins3 underline mt-3"
                >
                  Select options
                </a>
              </div>
            </div>
            <div className="    relative">
              <div className="px-2  ">
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
                <div className="bg-[#E8F0F3] flex justify-center flex-col items-center h-[410px] acer:h-[410px]  relative">
                  <div className="">
                    <img
                      src={
                        changeColor === 13
                          ? burgundy3
                          : changeColor === 14
                            ? red3
                            : navy3
                      }
                      alt=""
                    />
                  </div>
                  <div className="shopDots flex gap-3  absolute bottom-5">
                    <div className="border-[1px] border-transparent rounded-full p-1 hover:border-[1px] hover:border-[#8A344D] hover:rounded-full hover:p-1" onClick={() => ChangeIndex(13)}>
                      <div
                        className="bg-[#8A344D] w-[10px] h-[10px] rounded-full"

                      ></div>
                    </div>
                    <div className="border-[1px] border-transparent rounded-full p-1 hover:border-[1px] hover:border-redish hover:rounded-full hover:p-1" onClick={() => ChangeIndex(14)}>
                      <div
                        className="bg-redish w-[10px] h-[10px] rounded-full"

                      ></div>
                    </div>
                    <div className="border-[1px] border-transparent rounded-full p-1 hover:border-[1px] hover:border-[#2E343E] hover:rounded-full hover:p-1" onClick={() => ChangeIndex(15)}>
                      <div
                        className="bg-[#2E343E] w-[10px] h-[10px] rounded-full"

                      ></div>
                    </div>
                  </div>
                </div>
                <p className="flex items-start justify-between text-[#363636] text-[14px] poppins3 mt-3">
                  The White House Game
                  <span className="text-redish text poppins4">$41.49</span>
                </p>
                <a
                  href="https://thewhitehousegame.myspreadshop.com/the+white+house+game-A655354cb8ba6e22839f3b9c8?productType=654&sellable=nOkb1E5YopF90oXEZEz3-654-24&appearance=1138"
                  className="text-[12px] text-[#000] poppins3 underline mt-3"
                >
                  Select options
                </a>
              </div>
            </div>
          </Slider>
        </div>
      </div>
    </div>
  );
}
