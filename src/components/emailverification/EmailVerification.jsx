import React, { useState, useEffect, useRef } from "react";
import logo1 from "../../images/logo1.png";
import Vector from "../../images/Vector.png";
// import Layer from "../../images/Layer.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function EmailVerification(props) {
    const  navigate = useNavigate();
    // console.log("Email from props:", props.email);
    // const { email } = props.location.state;

    const [email, setEmail] = useState(""); // State to store email from local storage

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
     // Retrieve email from local storage
    if (storedEmail) {
      setEmail(storedEmail);
    } else {
      // Handle case if email is not found in local storage
    }
  }, []);
    
  const formRef = useRef(null);
  const inputsRef = useRef(Array(4).fill(null)); // Initialize inputsRef with an array of null values

//   const form = formRef.current;
const [form, setForm] = useState(null); // State to store form element reference

useEffect(() => {
  setForm(formRef.current); // Initialize form element reference
}, []);
  const inputs = inputsRef.current;

  const handleKeyDown = (e) => {
    if (
      !/^[0-9]{1}$/.test(e.key) &&
      e.key !== "Backspace" &&
      e.key !== "Delete" &&
      e.key !== "Tab" &&
      !e.metaKey
    ) {
      e.preventDefault();
    }

    if (e.key === "Delete" || e.key === "Backspace") {
      const index = inputs.indexOf(e.target);
      if (index > 0) {
        inputs[index - 1].value = "";
        inputs[index - 1].focus();
      }
    }
  };

  const handleInput = (e) => {
    const { target } = e;
    const index = inputs.indexOf(target);
    if (target.value) {
      if (index < inputs.length - 1) {
        inputs[index + 1].focus();
      } else {
        form.querySelector("button[type=submit]").focus();
      }
    }
  };

  const handleFocus = (e) => {
    e.target.select();
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text");
    if (!new RegExp(`^[0-9]{${inputs.length}}$`).test(text)) {
      return;
    }
    const digits = text.split("");
    inputs.forEach((input, index) => (input.value = digits[index]));
    form.querySelector("button[type=submit]").focus();
  };

  
//   if (!props.location.state || !props.location.state.email) {
//       // Agar undefined hai, toh koi fallback ya error message render karein
//       return <div>Error: Email not found!</div>;
//     }

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const otp = inputsRef.current.map(input => input.value).join(""); // Join OTP digits into a single string
  
    try {
      const response = await axios.post(
        "https://pankhay.com/thewhitehousegame/public/api/match_otp",
        {
          otp: otp,
          email: email
          
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          }
        }
      );
  
      console.log(response.data); // Log the response data
  
      if (response.status === 200) {
         localStorage.setItem('token',response?.data?.access_token)

        // alert("OTP verified successfully!");
        // Redirect or perform any other action upon successful OTP verification
        navigate("/PutData")
      } else {
        alert("OTP verification failed. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while verifying OTP. Please try again later.");
    }
  };
  

  return (
    <>
      <div className="bg-[#1c2452] pb-10 ">
        <div className="flex justify-center pt-5 ">
          <h2 className="text-white text-[23px] font-poppins">
            Email Verification
          </h2>
        </div>
        <div className="flex justify-center pt-5">
          <img src={logo1} alt="" />
        </div>

        <div className="flex justify-center pt-3">
          <h2 className="text-white font-poppins">Forgot your password?</h2>
        </div>
        <div className="flex justify-center items-center h-full">
          <div className=" px-6 py-4  text-white rounded-lg">
            <p className="text-center font-poppins text-[12px]">
              Code is send to examplemail.com
            </p>
          </div>
        </div>
        <div className="flex justify-center items-center ml-64">
          <img src={Vector} alt="" />
        </div>

        <div className=" mt-3">
          <form id="otp-form" ref={formRef} onSubmit={handleSubmit}>
            <div className="flex items-center justify-center gap-3 max-w-96 mx-auto text-center bg-[#131A41] px-4 sm:px-8 py-10 rounded-xl shadow">
              {inputsRef.current.map((inputRef, index) => (
                <input
                  key={index}
                  type="text"
                  className="w-14 h-14 text-center text-2xl font-extrabold text-white bg-[#1A2250] border border-transparent hover:border-[#1A2250] appearance-none rounded p-4 outline-none focus:bg-[#1A2250] focus:border-[#1A2250] focus:ring-2 focus:ring-[#1A2250]"
                  maxLength="1"
                  ref={(el) => (inputsRef.current[index] = el)}
                  onKeyDown={handleKeyDown}
                  onInput={handleInput}
                  onFocus={handleFocus}
                  onPaste={handlePaste}
                />
              ))}
            </div>
            <div className="flex justify-center items-center mt-3">
              <p className="text-white font-poppins text-[12px]">
                Your OTP will be expired in 1:59
              </p>
            </div>
            <div className="max-w-[260px] mx-auto mt-4 flex justify-center">
              <button
                type="submit"
                className="w-full inline-flex justify-center whitespace-nowrap rounded-lg bg-red-500 px-3.5 py-2.5 text-sm font-medium text-white shadow-sm shadow-indigo-950/10 hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-300 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 transition-colors duration-150"
              >
                Verify OTP
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default EmailVerification;
