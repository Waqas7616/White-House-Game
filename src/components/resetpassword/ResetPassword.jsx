import React, { useEffect, useState } from "react";
import logo1 from "../../images/logo1.png";
import Vector from "../../images/Vector.png";
import axios from "axios";
import Navbar from "../Navbar";
import DownloadApp from "../DownloadApp";
import { Helmet } from "react-helmet";
import secureLocalStorage from "react-secure-storage";
import MobileNav from "../MobileNav";
import CustomSpinner from "../spinner";
import { useNavigate } from "react-router-dom";
import check from "../../images/check.png";

export const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isloading, setisLoading] = useState(false);
  const [popup, setPopUp] = useState(false);
  const navigate = useNavigate();
  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const [jwtToken, setJwtToken] = useState("");

  useEffect(() => {
    const storedToken = secureLocalStorage.getItem("token");
    if (storedToken) {
      setJwtToken(storedToken);
    } else {
    }
  }, []);

  const handleSubmit = async (e) => {
    setisLoading(true);
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      setisLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "https://app.thewhitehousegame.com/api/rest_password",
        {
          password: newPassword,
          confirm_password: confirmPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,

            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      if (response.status === 200) {
        setisLoading(false);
        setPopUp(true);
      } else {
        console("Password reset failed. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      setisLoading(false);
    }
  };

  return (
    <>
      <div className="h-screen">
        {popup && (
          <div className="popup">
            <div className="w-full h-screen bg-black/60 fixed z-50 top-0 left-0 flex justify-center items-center">
              <div className="popup flex flex-col items-center justify-center  bg-[#1C2452] w-full max-w-md h-auto py-8 px-6 rounded-[30px] sm:w-5/12 sm:h-[52vh] relative">
                <div className="text-center mb-6">
                  <img className="w-[80px] h-[80px]" src={logo1} alt="" />
                </div>
                <button
                  onClick={() => navigate("/")}
                  className="absolute top-4 right-4 text-white hover:text-gray-400 transition-colors duration-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>

                <p className="text-white text-center text-[16px]">
                  {" "}
                  Your Password has been changed successfully!
                </p>
                <div className="flex justify-center items-center mt-8">
                  <img className="h-12 w-12 " src={check} alt="" />
                </div>
                <button
                  onClick={() => navigate("/")}
                  className="mt-8 text-white poppins5 bg-redish px-8 py-2 rounded"
                >
                  close
                </button>
              </div>
            </div>
          </div>
        )}
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
        <div className="flex flex-col text-center items-center justify-center mt-5">
          <h1 className="text-whiteColor  sm:text-[33px] md:text-[40px] lg:text-[54px] xl-a:text-[78px] xl:w-[90%] 2xl:w-[50%] uppercase orbit9">
            {" "}
            <span className="text-redish">Reset</span> Password
          </h1>
        </div>
        <div className="bg-[#1c2452] pb-10 ">
          <div className="flex justify-center pt-5">
            <img src={logo1} alt="" />
          </div>

          <div className="flex justify-center pt-3">
            <h2 className="text-white font-poppins">Change your password?</h2>
          </div>
          <div className="flex justify-center items-center h-full">
            <div className="w-[304px] px-6 py-4  text-white rounded-lg">
              <p className="text-center font-poppins text-[12px]">
                Enter a new password below to change your password
              </p>
            </div>
          </div>
          <div className="flex justify-center items-center ml-64">
            <img src={Vector} alt="" />
          </div>

          <div className="pt-5">
            <form
              onSubmit={handleSubmit}
              className="max-w-sm mx-auto rounded-lg bg-[#131A41] px-10 py-10"
            >
              <div className="mb-5">
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-white font-poppins"
                >
                  New Password
                </label>
                <input
                  type="password"
                  id="new-password"
                  className="bg-gray-500 border border-gray-500 text-white text-sm rounded-lg focus:ring-gray-500 focus:gray-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter new password"
                  required
                  onChange={(e) => setNewPassword(e.target.value)}
                  autoComplete="new-password"
                />
              </div>

              <div className="mb-5 relative">
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-white font-poppins"
                >
                  Confirm Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  id="confirm-password"
                  placeholder="Re-enter password"
                  className="bg-gray-500 border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 pr-10"
                  required
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  autoComplete="confirm-password"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-12 right-0 flex items-center px-2 focus:outline-none"
                >
                  {showPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-5 h-5 text-white"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-5 h-5 text-white"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                      />
                    </svg>
                  )}
                </button>
              </div>
              <p className="poppins5 text-redish">{error}</p>
              <div className="flex justify-center mt-5 ">
                {isloading ? (
                  <CustomSpinner />
                ) : (
                  <button className="rounded-lg px-5 py-3 bg-red-500 w-[380px] h-[50px] text-white font-poppins">
                    Save Changes
                  </button>
                )}
              </div>
            </form>
          </div>
          <div>
            <DownloadApp />
          </div>
        </div>
      </div>
    </>
  );
};
