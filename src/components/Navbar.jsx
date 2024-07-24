import React, { useState, useEffect } from "react";
import logo from "../images/logo2.png";
import burger from "../images/hamburger.png";
import closeMenu from "../images/closeMenu.png";
import { Link } from "react-router-dom";
import { Version } from "./version/Version";
import { useNavigate, useLocation } from "react-router-dom";
import securesecureLocalStorage from "react-secure-storage";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [active, setActive] = useState(1);

  const [link, setLink] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(
    securesecureLocalStorage.getItem("email") &&
      securesecureLocalStorage.getItem("token")
  );

  const electoralCount = securesecureLocalStorage.getItem("electoralCount");

  const logOut = () => {
    securesecureLocalStorage.removeItem("token");
    securesecureLocalStorage.removeItem("email");
    securesecureLocalStorage.removeItem("id");
    securesecureLocalStorage.removeItem("electoralCount");
    setIsLoggedIn(false);
    navigate("/login"); // Session expire karne ke baad isLoggedIn state ko false kar denge
  };

  const data = {
    title: "My",
    title2: "Account",
    desc: "Honest information helps us predict ",
    desc2: "the mood of the nation",
  };



  const handlePredictClick = () => {
    setShowModal(true);

    const handleClickOutside = (event) => {
      if (!event.target.closest(".modal-container")) {
        setShowModal(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  };



  // console.log("link value is :", link);

  const handleLinks = (e) => {
    setLink((prevLink) => (prevLink === e ? null : e));
  };

  // const toggleMenu = () => {
  //   setToggle(!toggle);
  // };

  // const submitLogout=()=>{

  // }

  return (
    <div
      className={`navbar  m-auto bg-[#41414163] backdrop-blur-[6px] resp px-4 mt-4 py-1 flex  
        rounded-[100px] w-10/12 
        items-center justify-between`}
    >
      <>
        <div className="logo -mt-1">
          <a href="/">
            <Link to="/">
              {" "}
              <img src={logo} className="w-28" alt="" />
            </Link>
          </a>
        </div>
        <div className="nav-links flex gap-8 ">
          <Link to={"/"}>
            {" "}
            <li
              className={`nav-link poppins4 hover:text-redish  ${
                location.pathname === "/" ? "active" : ""
              } cursor-pointer hover:font-[500] text-whiteColor`}
            >
              Home
            </li>
          </Link>
          <Link
            target="_blank"
            to={
              "http://thewhitehousegame.myspreadshop.com/the+white+house+game-A655354cb8ba6e22839f3b9c8?productType=654&sellable=nOkb1E5YopF90oXEZEz3-654-24&appearance=1138"
            }
          >
            {" "}
            <li
              className={`nav-link poppins4 hover:text-redish ${
                location.pathname === "/contact" ? "active" : ""
              }  cursor-pointer hover:font-[500] text-whiteColor`}
            >
              Shop
            </li>
          </Link>{" "}
          <Link to={"/candidate"}>
            {" "}
            <li
              className={`nav-link poppins4 hover:text-redish ${
                location.pathname === "/candidate" ? "active" : ""
              }  cursor-pointer hover:font-[500] text-whiteColor`}
            >
              Candidates
            </li>
          </Link>{" "}
          <li
            // onClick={() => handleLinks(3)}
            onClick={handlePredictClick}
            className={`nav-link poppins4 hover:text-redish ${
              location.pathname === "/predict" ? "active" : ""
            }  cursor-pointer hover:font-[500] text-whiteColor`}
          >
            Tell us who you think will win?
          </li>
          <div className="fixed flex items-center justify-center w-full h-full left-0 top-[10.5rem]  z-50 ">
            <div className=" z-50  modal-container ">
              {showModal && <Version />}
            </div>
          </div>
        </div>
        <div
          className={` ${
            !isLoggedIn
              ? "languages flex items-center gap-2 bg-[#131841] w-60 h-10 rounded-[5px] p-1"
              : ""
          }`}
        >
          {!isLoggedIn ? (
            <button
              onClick={() => navigate("/LogIn")}
              className={` w-full h-full text-center cursor-pointer text-[rgba(255,255,255,.6)] ${
                location.pathname === "/LogIn"
                  ? "bg-[#1A2250] rounded-[5px] border-[1px] border-[rgba(255,255,255,.2)] text-white "
                  : ""
              }`}
            >
              Log In
            </button>
          ) : (
            <div
              className={` ${
                isLoggedIn
                  ? "languages flex items-center gap-2 bg-[#131841] w-80 h-10 rounded-[5px] p-1"
                  : ""
              }`}
            >
              
              <button
                className={` w-full h-full text-center cursor-pointer text-[rgba(255,255,255,.6)] ${isLoggedIn?"block":"hidden"} ${
                  location.pathname === "/putdata"
                    ? "bg-[#1A2250] rounded-[5px] border-[1px] border-[rgba(255,255,255,.2)] text-white "
                    : ""
                }`}
                onClick={() => navigate("/putdata", { state: { data } })}
              >
                My Account
              </button>
              {isLoggedIn && ( <button
                onClick={() => navigate("/myvote")}
                className={` w-full h-full text-center cursor-pointer text-[rgba(255,255,255,.6)] ${
                  location.pathname == "/myvote"
                    ? "bg-[#1A2250] rounded-[5px] border-[1px] border-[rgba(255,255,255,.2)] text-white "
                    : ""
                }`}
              >
                My Vote
              </button>)}
             
              <button
                onClick={logOut}
                className={` w-full h-full text-center cursor-pointer text-[rgba(255,255,255,.6)] ${
                  location.pathname !== "/putdata" &&
                  location.pathname !== "/myvote"
                    ? "bg-[#1A2250] rounded-[5px] border-[1px] border-[rgba(255,255,255,.2)] text-white "
                    : ""
                }`}
              >
                Log Out
              </button>
            </div>
          )}

{!isLoggedIn && (
          <button
            className={`w-full h-full ${
              location.pathname !== "/LogIn"
                ? "bg-[#1A2250] rounded-[5px] border-[1px] border-[rgba(255,255,255,.2)] text-white"
                : "text-[rgba(255,255,255,.6)]"
            }`}
            onClick={() => {
              navigate("/signup");
            }}
          >
            Sign Up
          </button>
        )}
        </div>
      </>

      {/* MObile menu */}
    </div>
  );
}

export default Navbar;
