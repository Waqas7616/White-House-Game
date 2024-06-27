import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo2.png";
import burger from "../images/hamburger.png";
import closeMenu from "../images/closeMenu.png";
import { useNavigate, useLocation } from "react-router-dom";
import { Version } from "./version/Version";
import securesecureLocalStorage from "react-secure-storage";

function MobileNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const [toggle, setToggle] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const toggleMenu = () => {
    setToggle(!toggle);
  };

  const [isLoggedIn, setIsLoggedIn] = useState(
    securesecureLocalStorage.getItem("email") &&
      securesecureLocalStorage.getItem("token")
  );

  const logOut = () => {
    securesecureLocalStorage.removeItem("token");
    securesecureLocalStorage.removeItem("email");
    securesecureLocalStorage.removeItem("id");
    securesecureLocalStorage.removeItem("electoralCount");
    setIsLoggedIn(false);
    navigate("/login"); // Session expire karne ke baad isLoggedIn state ko false kar denge
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
  const data = {
    title: "My",
    title2: "Account",
    desc: "Honest information helps us predict ",
    desc2: "the mood of the nation",
  };

  return (
    <div
      className={`navbar  m-auto bg-[#41414163] backdrop-blur-[6px] resp px-4 mt-4 py-1 flex  ${
        toggle ? "flex-col rounded-lg relative" : "rounded-[100px] w-10/12 "
      }  items-center justify-between`}
    >
      <div className="logo ">
        <Link to="/">
          <img src={logo} className="w-20" alt="" />
        </Link>
      </div>{" "}
      <div onClick={toggleMenu}>
        {!toggle ? (
          <img width={30} src={burger} alt="" className="cursor-pointer" />
        ) : (
          <img
            className="absolute right-3 top-3 cursor-pointer"
            width={30}
            src={closeMenu}
            alt="close icon"
          />
        )}
      </div>
      {toggle && (
        <>
          <div className="nav-links flex flex-col gap-8 items-center mt-4">
            <Link to={"/"}>
              <li
                className={`nav-link poppins4 hover:text-redish cursor-pointer hover:font-[500] text-whiteColor ${
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
              <li
                className={`nav-link poppins4 hover:text-redish cursor-pointer hover:font-[500] text-whiteColor ${
                  location.pathname === "/contact" ? "active" : ""
                }  cursor-pointer hover:font-[500] text-whiteColor`}
              >
                Shop
              </li>
            </Link>
            <Link to={"/candidate"}>
              <li
                className={`nav-link poppins4 hover:text-redish cursor-pointer hover:font-[500] text-whiteColor ${
                  location.pathname === "/candidate" ? "active" : ""
                }  cursor-pointer hover:font-[500] text-whiteColor`}
              >
                Candidates
              </li>
            </Link>

            <li
              onClick={handlePredictClick}
              className={`nav-link poppins4 hover:text-redish cursor-pointer hover:font-[500] text-whiteColor ${
                location.pathname === "/predict" ? "active" : ""
              }  cursor-pointer hover:font-[500] text-whiteColor`}
            >
              Tell us who you think will win ?
            </li>

            {showModal && (
              <div className="relative flex items-center justify-center w-full h-full left-0 -top-52  z-50 ">
                <div className=" z-50 modal-container ">
                  <Version />
                </div>
              </div>
            )}
          </div>
          <div className="download-button flex items-center justify-between gap-2">
            {!isLoggedIn ? (
              <div>
                <h2
                  onClick={() => navigate("/LogIn")}
                  // onClick={() => setIsLoggedIn(true)}
                  className={` nav-link poppins4 hover:text-redish   cursor-pointer hover:font-[500] text-whiteColor mt-6 mb-3 ${
                    location.pathname === "/LogIn" ? "  text-white " : ""
                  }`}
                >
                  Log In
                </h2>
              </div>
            ) : (
              <div>
                <h2
                  className={`nav-link poppins4 hover:text-redish   cursor-pointer hover:font-[500] text-whiteColor mt-6 mb-3 ${
                    location.pathname === "/putdata" ? " text-white " : ""
                  }`}
                  onClick={() => navigate("/putdata", { state: { data } })}
                >
                  My Account
                </h2>
                <h2
                  onClick={() => navigate("/myvote")}
                  className={`nav-link poppins4 hover:text-redish   cursor-pointer hover:font-[500] text-whiteColor mt-6 mb-3 text-center ${
                    location.pathname == "/myvote" ? " text-white " : ""
                  }`}
                >
                  My Vote
                </h2>
                <h2
                  onClick={logOut}
                  className={`nav-link poppins4 hover:text-redish   cursor-pointer hover:font-[500] text-whiteColor mt-6 mb-3 text-center  ${
                    location.pathname !== "/putdata" &&
                    location.pathname !== "/myvote"
                      ? " text-white "
                      : ""
                  }`}
                >
                  Logout
                </h2>
              </div>
            )}
            {/* <button className="bg-[#ED1C24] py-[12px] px-[30px] text-white rounded-[100px] my-8">
              Download Now
            </button> */}
          </div>
          <button
            className={`nav-link poppins4 hover:text-redish   cursor-pointer hover:font-[500] text-whiteColor mt-4 mb-3  ${
              !isLoggedIn ? "block" : "hidden"
            } ${location.pathname !== "/LogIn" ? " text-white " : ""}`}
            onClick={() => {
              navigate("/signup");
            }}
          >
            Sign Up
          </button>
        </>
      )}
    </div>
  );
}

export default MobileNav;
