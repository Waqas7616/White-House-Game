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

export const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://thewhitehousegame.com/public/api/forget_password",
        {
          email: email,
        }
      );

      console.log(response.data);

      if (response.status === 200) {
        const receivedToken =
          "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMTIyNDA0MTBiNGFmM2E5ZmEyODFkNzRmMWZmM2QyZmIzYzgxYWY2Njc4NDAwZGYwMDk1Y2NhMTMzYjM3M2FiMDRhYzBmOGVhY2Y4MzE1NTEiLCJpYXQiOjE3MDUzOTE5NTkuNDYzNTkzLCJuYmYiOjE3MDUzOTE5NTkuNDYzNTk2LCJleHAiOjE3MzcwMTQzNTkuNDQ5Nzc1LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.UX0uRxow1rwAiewLOT-xaOKzS8V4x2mZJeyEcJ1S4QONpKLtVVU3sM518DlpkZfY6S7yApTqloUD04sGIXTrulKNIuaK1Qq75wNQsW1B7hVPdYRyvZ8NkOh6dLIw45hieV8Gzhq6zfpjSMULozRYzieNsJq174U_HN7Eb_VdEAnnuSw7_KlryVQrInqCJzr8PtNTemQT1KbOhG0iw4P2GURkbtrXc_qWOqSWbcC2Fk2cQf7Edp0dMCBn-_fePBgMNZKBu8mJIy-DO4Un74HsESQde_PxKgwTGtm7SH3EnR3R0gGnJ4vxcu-s5kUJ-zk6AoZxKbQIVgNJ-8TA7azYSqcZcV7THbQBnYsqC4guIcRObwdzXISgxq4IdAJsTsXPtfqb4GWuhfVp0PufnRHHpL9xz1diMNQBWh6-gO5p0wLxzC3pLtHgSJ0lXgZ3ZmcmISD8e5uQ4UT9DNnGeI7k9LYK8xa61UpiBIbrfX47Jt2mwPJQQWp1QVomWVaokFcwXNtDYtFifOiCYhDfmKDXN0XYg1BeJLcEzDItsbU1nIJgLTtaCKHiCGDVrKGo8mF0IDHq6VFJBvUdoiGJlV8Vc36tNOYKsvoKJQCWQKX3x3L_SR-MrdCowWqBXSaJYmewBZOvsHE7i4Xo2OITR4ZTBM3RRfnzEd8K2ZAWhqOVkxk";
        localStorage.setItem("JWT", receivedToken);

        setShowModal(true); // Modal show karen
      } else {
        alert("Failed to send password reset instructions. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);

      alert("An error occurred. Please try again later.");
    }
  };

  const closeModal = () => {
    setShowModal(false);
    navigate("/ResetPassword");
  };
  return (
    <div className="h-screen">
      <Navbar />
      <div className="flex flex-col text-center items-center justify-center mt-2">
        <h1 className="text-whiteColor  sm:text-[33px] md:text-[40px] lg:text-[54px] xl-a:text-[78px] xl:w-[90%] 2xl:w-[50%] uppercase orbit9">
          {" "}
          <span className="text-redish">Forgot</span><br /> Password
        </h1>
      </div>
      <div className="bg-[#1c2452] ">
        <div className="flex justify-center items-center h-full">
          <div className="w-[270px] px-6 py-4  text-white rounded-lg">
            <p className="text-center font-poppins text-[12px]">
            Even we don’t know your password 
So we’ll need to Reset it
            </p>
          </div>
        </div>
        <div className="flex justify-center items-center ml-64">
          <img src={Vector} alt="" />
        </div>

        <div className="pt-2 mx-3 sm:mx-5 lg:mx-0 relative">
          <form
            onSubmit={handleSubmit}
            class="max-w-sm mx-auto rounded-lg bg-[#131A41] px-7 py-7"
          >
            <div class="mb-5">
              <label
                for="email"
                class="block mb-2 text-sm font-medium text-white font-poppins"
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
              <button className="rounded-lg px-5 py-3 bg-red-500 w-[380px] h-[50px] text-white font-poppins">
                Send
              </button>
            </div>
          </form>
          <div className="flex justify-center items-center gap-2 mt-2">
            <p className="text-white font-poppins text-[10px]">
              Check your email for password reset instructions{" "}
            </p>
          </div>
          <div className="absolute -top-3 right-0 left-0 ">
            {showModal && <ForgotModal closeModal={closeModal}/>}
          </div>
        </div>
        <div>
          <DownloadApp/>
        </div>
      </div>
    </div>
  );
};
