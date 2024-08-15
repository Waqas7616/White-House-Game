import React, { useState } from "react";
import logo1 from "../../images/logo1.png";
import Vector from "../../images/Vector.png";
import Layer from "../../images/Layer.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AppBanner from "../appbanner/AppBanner";
import Navbar from "../Navbar";
import { ForgotModal } from "../forgotmodal/ForgotModal";
import DownloadApp from "../DownloadApp";
import { Helmet } from "react-helmet";
import secureLocalStorage from "react-secure-storage";
import MobileNav from "../MobileNav";
import CustomSpinner from "../spinner";
import { useLocation } from "react-router-dom";

export const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isloading, setIsLoading] = useState(false);
  const location = useLocation();
  const dataone = {
    email: email,
  };

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://app.thewhitehousegame.com/api/forget_password",
        {
          email: email,
        }
      );

      if (response.status === 200) {
        setIsLoading(false);

        setShowModal(true);
      } else {
        console.log(
          "Failed to send password reset instructions. Please try again."
        );
      }
    } catch (error) {
      console.error("Error:", error);
      setIsLoading(false);

      console.log("An error occurred. Please try again later.");
    }
  };

  const closeModal = () => {
    setShowModal(false);
    navigate("/otpmatch", { state: { dataone } });
  };
  return (
    <div className="h-screen">
      <Helmet>
        <title>The White House Game | Log In to your account</title>
        <meta
          name="keywords"
          content="2024 Presidential election, log in, login."
        />
        <meta
          name="description"
          content="To play The White House Game or update your prediction, open an account. You can also view all our interesting statistics about the 2024 election."
        />
      </Helmet>

      <div className="hidden lg:block">
        <Navbar />
      </div>
      <div className="block lg:hidden">
        <MobileNav />
      </div>
      <div className="flex flex-col text-center items-center justify-center mt-2">
        <h1 className="text-whiteColor  sm:text-[33px] md:text-[40px] lg:text-[54px] xl-a:text-[78px] xl:w-[90%] 2xl:w-[50%] uppercase orbit9">
          {" "}
          <span className="text-redish">Forgot</span>
          <br /> Password
        </h1>
      </div>
      <div className="bg-[#1c2452] ">
        <div className="flex justify-center items-center h-full">
          <div className="w-[270px] px-6 py-4  text-white rounded-lg">
            <p className="text-center font-poppins text-[12px]">
              Even we don’t know your password So we’ll need to Reset it
            </p>
          </div>
        </div>
        <div className="flex justify-center items-center ml-64">
          <img src={Vector} alt="" />
        </div>

        <div className="pt-2 mx-3 sm:mx-5 lg:mx-0 relative">
          <form
            onSubmit={handleSubmit}
            className="max-w-sm mx-auto rounded-lg bg-[#131A41] px-7 py-7"
          >
            <div className="mb-5">
              <label
                for="email"
                className="block mb-2 text-sm font-medium text-white font-poppins"
              >
                Email address
              </label>
              <input
                type="email"
                id="email"
                className="bg-gray-500 border border-gray-500 text-white text-sm rounded-lg focus:ring-gray-500 focus:gray-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter your email"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex justify-center mt-5 ">
              {isloading ? (
                <CustomSpinner />
              ) : (
                <button className="rounded-lg px-5 py-3 bg-red-500 w-[380px] h-[50px] text-white font-poppins">
                  Send
                </button>
              )}
            </div>
          </form>
          <div className="flex justify-center items-center gap-2 mt-2">
            <p className="text-white font-poppins text-[10px]">
              Check your email for password reset instructions{" "}
            </p>
          </div>
          <div className="absolute -top-3 right-0 left-0 ">
            {showModal && <ForgotModal closeModal={closeModal} />}
          </div>
        </div>
        <div>
          <DownloadApp />
        </div>
      </div>
    </div>
  );
};
