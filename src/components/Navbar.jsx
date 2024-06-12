import React, { useState, useEffect } from "react";
import logo from "../images/logo2.png";
import burger from "../images/hamburger.png";
import closeMenu from "../images/closeMenu.png";
import { Link } from "react-router-dom";
import { Version } from "./version/Version";
import { useNavigate, useLocation } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [active, setActive] = useState(1);

  // const login = localStorage.getItem("email");
  // const token = localStorage.getItem("token");
  const [showModal, setShowModal] = useState(false);
  // const login = localStorage.getItem("email")
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
  // const logOut = () => {
  //   localStorage.clear("token", "email");

  // };

  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("email") && localStorage.getItem("token")
  );

  const logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("id");
    localStorage.removeItem("electoralCount");
    setIsLoggedIn(false);
    navigate("/login"); // Session expire karne ke baad isLoggedIn state ko false kar denge
  };

  const [isMobile, setIsMobile] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [link, setLink] = useState(0);
  // console.log("link value is :", link);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleLinks = (e) => {
    setLink((prevLink) => (prevLink === e ? null : e));
  };

  const toggleMenu = () => {
    setToggle(!toggle);
  };

  // const submitLogout=()=>{

  // }

  return (
    <div
      className={`navbar  m-auto bg-[#41414163] backdrop-blur-[6px] resp px-4 mt-4 py-1 flex  ${
        toggle ? "flex-col rounded-lg relative" : "rounded-[100px] w-10/12 "
      }  items-center justify-between`}
    >
      {isMobile ? (
        <>
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
        </>
      ) : (
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
            {/* <Link to={"/about"}>
              {" "}
              <li
                className={`nav-link poppins4 hover:text-redish ${
                  location.pathname === "/about" ? "active" : ""
                }  cursor-pointer hover:font-[500] text-whiteColor`}
              >
                About Us
              </li>
            </Link> */}
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
              Tell us who you think will win ?
            </li>
            {/* <Link to={"/myvote"}>
              {" "}
              <li
                className={`nav-link poppins4 hover:text-redish ${
                  location.pathname === "/myvote" ? "active" : ""
                }  cursor-pointer hover:font-[500] text-whiteColor`}
              >
                My Vote
              </li>
            </Link> */}
            {/* </Link> */}
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
            {/* hover:bg-[#1A2250] hover:rounded-[5px] hover:border-[1px] hover:border-[rgba(255,255,255,.2)] hover:text-white
                  text-[rgba(255,255,255,.6)] */}
            {!isLoggedIn ? (
              <button
                // onClick={() => navigate("/LogIn")}
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
                  className={` w-full h-full text-center cursor-pointer text-[rgba(255,255,255,.6)] ${
                    location.pathname === "/putdata"
                      ? "bg-[#1A2250] rounded-[5px] border-[1px] border-[rgba(255,255,255,.2)] text-white "
                      : ""
                  }`}
                  onClick={() => navigate("/putdata", { state: { data } })}
                >
                  My Account
                </button>
                <button
                  onClick={() => navigate("/myvote")}
                  className={` w-full h-full text-center cursor-pointer text-[rgba(255,255,255,.6)] ${
                    location.pathname == "/myvote"
                      ? "bg-[#1A2250] rounded-[5px] border-[1px] border-[rgba(255,255,255,.2)] text-white "
                      : ""
                  }`}
                >
                  My Vote
                </button>
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

            {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M19.5 22C19.8978 22 20.2794 21.842 20.5607 21.5607C20.842 21.2794 21 20.8978 21 20.5C21 20.1022 20.842 19.7206 20.5607 19.4393C20.2794 19.158 19.8978 19 19.5 19C19.1022 19 18.7206 19.158 18.4393 19.4393C18.158 19.7206 18 20.1022 18 20.5C18 20.8978 18.158 21.2794 18.4393 21.5607C18.7206 21.842 19.1022 22 19.5 22ZM9.5 22C9.89782 22 10.2794 21.842 10.5607 21.5607C10.842 21.2794 11 20.8978 11 20.5C11 20.1022 10.842 19.7206 10.5607 19.4393C10.2794 19.158 9.89782 19 9.5 19C9.10218 19 8.72064 19.158 8.43934 19.4393C8.15804 19.7206 8 20.1022 8 20.5C8 20.8978 8.15804 21.2794 8.43934 21.5607C8.72064 21.842 9.10218 22 9.5 22Z"
                fill="white"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M5 4H22L20 15M5 4L7 15H20M5 4C4.833 3.333 4 2 2 2M20 15H5.23C3.446 15 2.5 15.781 2.5 17C2.5 18.219 3.446 19 5.23 19H19.5"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg> */}
            <button
              className={`w-full h-full ${!isLoggedIn ? "block" : "hidden"} ${
                location.pathname !== "/LogIn"
                  ? "bg-[#1A2250] rounded-[5px] border-[1px] border-[rgba(255,255,255,.2)] text-white "
                  : "text-[rgba(255,255,255,.6)]"
              }`}
              onClick={() => {
                navigate("/signup");
              }}
            >
              Sign Up
            </button>
          </div>
        </>
      )}

      {isMobile && toggle && (
        <>
          <div className="nav-links flex flex-col gap-8 items-center">
            <Link to={"/"}>
              <li
                onClick={() => handleLinks(0)}
                className="nav-link poppins4 hover:text-redish cursor-pointer hover:font-[500] text-whiteColor"
              >
                Home
              </li>
            </Link>

            {/* <Link to={"/about"}>
              <li
                onClick={() => handleLinks(1)}
                className="nav-link poppins4 hover:text-redish cursor-pointer hover:font-[500] text-whiteColor"
              >
                About Us
              </li>
            </Link> */}
            <Link
              to={
                "http://thewhitehousegame.myspreadshop.com/the+white+house+game-A655354cb8ba6e22839f3b9c8?productType=654&sellable=nOkb1E5YopF90oXEZEz3-654-24&appearance=1138"
              }
            >
              <li
                onClick={() => handleLinks(3)}
                className="nav-link poppins4 hover:text-redish cursor-pointer hover:font-[500] text-whiteColor"
              >
                Shop
              </li>
            </Link>
            <Link to={"/candidate"}>
              <li
                onClick={() => handleLinks(3)}
                className="nav-link poppins4 hover:text-redish cursor-pointer hover:font-[500] text-whiteColor"
              >
                Candidates
              </li>
            </Link>

            <li
              // onClick={() => handleLinks(2)}
              onClick={handlePredictClick}
              className="nav-link poppins4 hover:text-redish cursor-pointer hover:font-[500] text-whiteColor"
            >
              Tell us who you think will win ?
            </li>
            <Link to={"/myvote"}>
              {" "}
              <li className="nav-link poppins4 hover:text-redish cursor-pointer hover:font-[500] text-whiteColor">
                My Vote
              </li>
            </Link>
            {showModal && (
              <div className="relative flex items-center justify-center w-full h-full left-0 -top-52  z-50 ">
                <div className=" z-50 modal-container ">
                  <Version />
                </div>
              </div>
            )}
          </div>
          <div className="download-button flex items-center justify-between gap-2">
            {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M19.5 22C19.8978 22 20.2794 21.842 20.5607 21.5607C20.842 21.2794 21 20.8978 21 20.5C21 20.1022 20.842 19.7206 20.5607 19.4393C20.2794 19.158 19.8978 19 19.5 19C19.1022 19 18.7206 19.158 18.4393 19.4393C18.158 19.7206 18 20.1022 18 20.5C18 20.8978 18.158 21.2794 18.4393 21.5607C18.7206 21.842 19.1022 22 19.5 22ZM9.5 22C9.89782 22 10.2794 21.842 10.5607 21.5607C10.842 21.2794 11 20.8978 11 20.5C11 20.1022 10.842 19.7206 10.5607 19.4393C10.2794 19.158 9.89782 19 9.5 19C9.10218 19 8.72064 19.158 8.43934 19.4393C8.15804 19.7206 8 20.1022 8 20.5C8 20.8978 8.15804 21.2794 8.43934 21.5607C8.72064 21.842 9.10218 22 9.5 22Z"
                fill="white"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M5 4H22L20 15M5 4L7 15H20M5 4C4.833 3.333 4 2 2 2M20 15H5.23C3.446 15 2.5 15.781 2.5 17C2.5 18.219 3.446 19 5.23 19H19.5"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg> */}
            {/* <div>
              <h2
                onClick={() => navigate("/LogIn")}
                className={`nav-link poppins4 hover:text-redish   cursor-pointer hover:font-[500] text-whiteColor`}
              >
                Login
              </h2>
            </div> */}
            {!isLoggedIn ? (
              <div>
                <h2
                  onClick={() => navigate("/LogIn")}
                  // onClick={() => setIsLoggedIn(true)}
                  className={`nav-link poppins4 hover:text-redish   cursor-pointer hover:font-[500] text-whiteColor`}
                >
                  Login
                </h2>
              </div>
            ) : (
              <div>
                <h2
                  onClick={logOut}
                  className={`nav-link poppins4 hover:text-redish   cursor-pointer hover:font-[500] text-whiteColor`}
                >
                  Logout
                </h2>
              </div>
            )}
            <button className="bg-[#ED1C24] py-[12px] px-[30px] text-white rounded-[100px] my-8">
              Download Now
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Navbar;
