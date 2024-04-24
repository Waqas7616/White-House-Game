import React, { useEffect, useState } from "react";
import logo1 from "../../images/logo1.png";
import Vector from "../../images/Vector.png";
import axios from "axios";

export const ResetPassword = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const togglePasswordVisibility = () => {
      setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    const [jwtToken, setJwtToken] = useState("");

    useEffect(() => {
        
      const storedToken = localStorage.getItem("token");
      console.log("token", storedToken)
      if (storedToken) {
          setJwtToken(storedToken);
      } else {

      }
    }, []);

    const handleSubmit = async (e) => {
      e.preventDefault();

      if (newPassword !== confirmPassword) {
        alert("Passwords do not match");
        return;
      }

      try {
        // console.log("Request being sent...");

        const response = await axios.post(
          "https://pankhay.com/thewhitehousegame/public/api/rest_password",
          {
            password: newPassword,
            confirm_password: confirmPassword,
          },
          {
            headers: {
                Authorization: `Bearer ${jwtToken}`,
                // Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMTIyNDA0MTBiNGFmM2E5ZmEyODFkNzRmMWZmM2QyZmIzYzgxYWY2Njc4NDAwZGYwMDk1Y2NhMTMzYjM3M2FiMDRhYzBmOGVhY2Y4MzE1NTEiLCJpYXQiOjE3MDUzOTE5NTkuNDYzNTkzLCJuYmYiOjE3MDUzOTE5NTkuNDYzNTk2LCJleHAiOjE3MzcwMTQzNTkuNDQ5Nzc1LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.UX0uRxow1rwAiewLOT-xaOKzS8V4x2mZJeyEcJ1S4QONpKLtVVU3sM518DlpkZfY6S7yApTqloUD04sGIXTrulKNIuaK1Qq75wNQsW1B7hVPdYRyvZ8NkOh6dLIw45hieV8Gzhq6zfpjSMULozRYzieNsJq174U_HN7Eb_VdEAnnuSw7_KlryVQrInqCJzr8PtNTemQT1KbOhG0iw4P2GURkbtrXc_qWOqSWbcC2Fk2cQf7Edp0dMCBn-_fePBgMNZKBu8mJIy-DO4Un74HsESQde_PxKgwTGtm7SH3EnR3R0gGnJ4vxcu-s5kUJ-zk6AoZxKbQIVgNJ-8TA7azYSqcZcV7THbQBnYsqC4guIcRObwdzXISgxq4IdAJsTsXPtfqb4GWuhfVp0PufnRHHpL9xz1diMNQBWh6-gO5p0wLxzC3pLtHgSJ0lXgZ3ZmcmISD8e5uQ4UT9DNnGeI7k9LYK8xa61UpiBIbrfX47Jt2mwPJQQWp1QVomWVaokFcwXNtDYtFifOiCYhDfmKDXN0XYg1BeJLcEzDItsbU1nIJgLTtaCKHiCGDVrKGo8mF0IDHq6VFJBvUdoiGJlV8Vc36tNOYKsvoKJQCWQKX3x3L_SR-MrdCowWqBXSaJYmewBZOvsHE7i4Xo2OITR4ZTBM3RRfnzEd8K2ZAWhqOVkxk`,
                "Content-Type": "application/json",
                Accept: "application/json",
            },
          }
        );

        console.log(response.data);

        if (response.status === 200) {
          alert("Password reset successful!");
        } else {
          alert("Password reset failed. Please try again.");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("An error occurred. Please try again later.");
      }
    };



  return (
    <>
      <div className="bg-[#1c2452] pb-10 ">
        <div className="flex justify-center pt-5 ">
          <h2 className="text-white text-[23px] font-poppins">
            Reset Password
          </h2>
        </div>
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
            class="max-w-sm mx-auto rounded-lg bg-[#131A41] px-10 py-10"
          >
            <div class="mb-5">
              <label
                for="password"
                class="block mb-2 text-sm font-medium text-white font-poppins"
              >
                New Password
              </label>
              <input
                type="password"
                id="password"
                className="bg-gray-500 border border-gray-500 text-white text-sm rounded-lg focus:ring-gray-500 focus:gray-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter new password"
                required
                onChange={(e) => setNewPassword(e.target.value)}
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
                id="password"
                placeholder="Re-enter password"
                className="bg-gray-500 border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 pr-10"
                required
                onChange={(e) => setConfirmPassword(e.target.value)}
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
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-5 h-5 text-white"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-5 h-5 text-white"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                )}
              </button>
            </div>

            <div className="flex justify-center mt-5 ">
              <button className="rounded-lg px-5 py-3 bg-red-500 w-[380px] h-[50px] text-white font-poppins">
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
