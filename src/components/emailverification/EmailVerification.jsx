import React, { useState, useEffect, useRef } from "react";
import logo1 from "../../images/logo1.png";
import Vector from "../../images/Vector.png";
// import Layer from "../../images/Layer.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DownloadApp from "../DownloadApp";
import Navbar from "../Navbar";
import securesecureLocalStorage from "react-secure-storage";
import secureLocalStorage from "react-secure-storage";

function EmailVerification(props) {

  const navigate = useNavigate();
  const token=securesecureLocalStorage.getItem('token');
  const data={
    title:'Create',
    title2:'An Account',
    desc:'And help us predict the mood of the nation'
  }
  // console.log("Email from props:", props.email);
  // const { email } = props.location.state;

  const [email, setEmail] = useState(""); // State to store email from local storage
  const [timeLeft, setTimeLeft] = useState(120); 
  const [isRunning, setIsRunning] = useState(true);
  const [error,setError]=useState();
  const [isLoading,setIsLoading]=useState(false);

  useEffect(() => {
    let intervalId;

    if (isRunning && timeLeft > 0) {
      intervalId = setInterval(() => {
        setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false); // Stop the timer when timeLeft reaches 0
    }

    // Clean up function to clear the interval when the component unmounts or timeLeft becomes 0
    return () => clearInterval(intervalId);
  }, [isRunning,timeLeft]);

 const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    const storedEmail = securesecureLocalStorage.getItem("email");
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

    const otp = inputsRef.current.map((input) => input.value).join(""); // Join OTP digits into a single string

    try {
      const response = await axios.post(
        "https://thewhitehousegame.com/api/public/api/match_otp",
        {
          otp: otp,
          email: email,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );


      if (response.status === 200) {
        secureLocalStorage.setItem("token", response?.data?.access_token);

        // alert("OTP verified successfully!");
        // Redirect or perform any other action upon successful OTP verification
        navigate("/PutData",{state:{data}});
      } else {
        setError(response.data.message)
      }
    } catch (error) {
      console.error("Error:", error);
      setError(error.response.data.message)
    }
  };

  const resendOtp=()=>{
    
    axios.post("https://thewhitehousegame.com/api/public/api/resendOTP",

      {
        "email":email
      },
      {
        headers:{
          Authorization:`Bearer ${token}`,
          Accept:'application/json'
        }
      }
    ).then((res)=>{setIsRunning(true);setTimeLeft(120);})
    
  }

  return (
    <>
      <div className="h-screen">
        <Navbar />
        <div className="flex flex-col text-center items-center justify-center mt-5">
          <h1 className="text-whiteColor sm:text-[33px] md:text-[40px] lg:text-[54px] xl-a:text-[78px] xl:w-[90%] 2xl:w-[50%] uppercase orbit9">
            {" "}
            <span className="text-redish">Match</span> OTP
          </h1>
        </div>
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
            <h2 className="text-white font-poppins">Verify Email</h2>
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
                
              {error?     <p className="text-redish poppins5 text-center">{error}</p>:<> 
              {timeLeft!==0&&<p className="text-white font-poppins text-[12px]">
                Your OTP will be expired in {formatTime(timeLeft)}
              </p>} </>
              }
               
              </div>
        
              <div className="max-w-[260px] mx-auto mt-4 flex justify-center">
                {timeLeft===0?<div
                  onClick={resendOtp}
                  className="w-full inline-flex cursor-pointer justify-center whitespace-nowrap rounded-lg bg-red-500 px-3.5 py-2.5 text-sm font-medium text-white shadow-sm shadow-indigo-950/10 focus:outline-none    transition-colors duration-150"
                >
                  Resend OTP
                </div>:<button
                  type="submit"
                  className="w-full inline-flex justify-center whitespace-nowrap rounded-lg bg-red-500 px-3.5 py-2.5 text-sm font-medium text-white shadow-sm shadow-indigo-950/10 focus:outline-none  focus-visible:outline-none  transition-colors duration-150"
                >
                  Verify OTP
                </button>}
                
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
}

export default EmailVerification;
