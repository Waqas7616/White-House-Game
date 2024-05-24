// import React, { useState } from "react";
// import logo1 from "../../images/logo1.png";
// import Vector from "../../images/Vector.png";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import AppBanner from "../appbanner/AppBanner";
// import Navbar from "../Navbar";

// export const SignUp = () => {
//   const [name, setName] = useState(""); // State for name
//   const [email, setEmail] = useState(""); // State for email
//   const [password, setPassword] = useState(""); // State for password
//   const [confirmed, setConfirmed] = useState(""); // State for confirm password
//   const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility
//   const [error, setError] = useState('')
//   const navigate = useNavigate();
//   const isValidEmail = (email) => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(email)
//   }
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!name || !email || !password || !confirmed) {
//       setError("All fields are required")
//     } else if (!isValidEmail) {
//       setError('Invalid Email')
//     }
//     else if (password !== confirmed) {
//       setError('Passwords do not match')
//     }
//     else if (password.length < 8) {
//       setError('Password must contain 8 characters')
//     }
//     else {
//       try {
//         const response = await axios.post(
//           "http://pankhay.com/thewhitehousegame/public/api/register",
//           {
//             name: name,
//             email: email,
//             password: password,
//             password_confirmation: confirmed,
//           },
//           {
//             headers: {
//               "Content-Type": "application/json",
//               Accept: "application/json",
//             },
//           }
//         );

//         console.log(response.data); // Log the response data

//         // Check if registration was successful
//         if (response.status === 200) {
//           localStorage.setItem("email", email);
//           localStorage.setItem('id', response.data.user.id)
//           // Registration successful, redirect user to login page
//           // alert("Registration successful!");
//           // navigate("/emailverification", { state: { email: email } });
//           navigate("/emailverification")
//         } else {
//           // Registration failed, show error message
//           alert("Registration failed. Please try again later.");
//         }
//       } catch (error) {
//         console.error("Error:", error);
//         setError(error.response.data.message)
//         // Handle error, show error message to user

//       }
//     }
//   };

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };
//   return (
//     <div className="h-screen">
//       {/* <AppBanner bannerTitle={'up'} redTitle={'Sign'} bannerDesc={'Sign up to continue'} /> */}
//       <Navbar />
//       <div className="flex flex-col text-center items-center justify-center mt-5">
//           <h1 className="text-whiteColor  sm:text-[33px] md:text-[40px] lg:text-[54px] xl-a:text-[78px] xl:w-[90%] 2xl:w-[50%] uppercase orbit9">
//             {" "}
//             <span className="text-redish">Sign</span> Up
//           </h1>

//         </div>
//       <div className="bg-[#1c2452] py-10 ">
//         {/* <div className="flex justify-center pt-5 ">
//           <h2 className="text-white text-[23px] font-poppins">Sign Up</h2>
//         </div>
//         <div className="flex justify-center pt-5">
//           <img src={logo1} alt="" />
//         </div> */}

//         <div className="flex justify-center items-center h-full">
//           <div className="w-[402px] px-6 py-4  text-white rounded-lg">
//             <p className="text-center font-poppins">
//               Create an account so you can update your prediction, view our
//               statsand understand our demographics.
//             </p>
//           </div>
//         </div>
//         <div className="flex justify-center items-center ml-64">
//           <img src={Vector} alt="" />
//         </div>

//         <div className="pt-5">
//           <form
//             onSubmit={handleSubmit}
//             class="max-w-sm mx-auto rounded-lg bg-[#131A41] px-10 py-10"
//           >
//             <div class="mb-5">
//               <label
//                 for="name"
//                 class="block mb-2 text-sm font-medium text-white font-poppins"
//               >
//                 Name
//               </label>
//               <input
//                 type="name"
//                 id="name"
//                 className="border-[1px] border-white/15 bg-[#1c2452]  text-white text-sm rounded-lg outline-none  block w-full p-2.5 "
//                 placeholder="Enter Name"

//                 onChange={(e) => setName(e.target.value)}
//               />
//             </div>

//             <div class="mb-5">
//               <label
//                 for="email"
//                 class="block mb-2 text-sm font-medium text-white font-poppins"
//               >
//                 Email Address
//               </label>
//               <input
//                 type="email"
//                 id="email"
//                 value={email}
//                 className="border-[1px] border-white/15 bg-[#1c2452]  text-white text-sm rounded-lg outline-none  block w-full p-2.5 "
//                 placeholder="Enter Email Address"

//                 onChange={(e) => setEmail(e.target.value)}
//               />
//             </div>

//             <div className="mb-5 relative">
//               <label
//                 htmlFor="password"
//                 className="block mb-2 text-sm font-medium text-white font-poppins"
//               >
//                 Password
//               </label>
//               <input
//                 type={showPassword ? "text" : "password"}
//                 id="password"
//                 placeholder="*******"
//                 className="border-[1px] border-white/15 bg-[#1c2452]  text-white text-sm rounded-lg outline-none  block w-full p-2.5 "

//                 onChange={(e) => setPassword(e.target.value)}
//               />
//               <button
//                 type="button"
//                 onClick={togglePasswordVisibility}
//                 className="absolute inset-y-12 right-0 flex items-center px-2 focus:outline-none"
//               >
//                 {showPassword ? (
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     strokeWidth="1.5"
//                     stroke="currentColor"
//                     class="w-5 h-5 text-white"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
//                     />
//                   </svg>
//                 ) : (
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     strokeWidth="1.5"
//                     stroke="currentColor"
//                     class="w-5 h-5 text-white"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
//                     />
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
//                     />
//                   </svg>
//                 )}
//               </button>
//               <p className="text-[10px] text-white ml-1 pt-1 font-poppins">
//                 Minimum of 8 letters and/or numbers and symbols
//               </p>
//             </div>

//             <div className="mb-5 relative">
//               <label
//                 htmlFor="confirmPassword"
//                 className="block mb-2 text-sm font-medium text-white font-poppins"
//               >
//                 Confirm Password
//               </label>
//               <input
//                 type={showPassword ? "text" : "password"}
//                 id="confirmPassword"
//                 placeholder="*******"
//                 className="border-[1px] border-white/15 bg-[#1c2452]  text-white text-sm rounded-lg outline-none  block w-full p-2.5 "

//                 onChange={(e) => setConfirmed(e.target.value)}
//               />
//               <button
//                 type="button"
//                 onClick={togglePasswordVisibility}
//                 className="absolute inset-y-12 right-0 flex items-center px-2 focus:outline-none"
//               >
//                 {showPassword ? (
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     strokeWidth="1.5"
//                     stroke="currentColor"
//                     class="w-5 h-5 text-white"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
//                     />
//                   </svg>
//                 ) : (
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     strokeWidth="1.5"
//                     stroke="currentColor"
//                     class="w-5 h-5 text-white"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
//                     />
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
//                     />
//                   </svg>
//                 )}
//               </button>
//             </div>
//             <p className="text-redish poppins4 mt-2">
//               {error}
//             </p>
//             <div className="flex justify-center mt-5 ">
//               <button className="rounded-lg px-5 py-3 bg-red-500 w-[380px] h-[50px] text-white font-poppins">
//                 Signup
//               </button>
//             </div>
//           </form>

//           <div className="flex justify-center items-center gap-2 mt-2">
//             <p className="text-white font-poppins text-[11px]">
//               Don't have an account ?{" "}
//             </p>
//             <button
//               onClick={() => navigate("/LogIn")}
//               className="underline underline-offset-4 text-white font-poppins text-[11px] cursor-pointer"
//             >
//               Login Now
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// import React, { useState } from "react";
// import logo1 from "../../images/logo1.png";
// import Vector from "../../images/Vector.png";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import AppBanner from "../appbanner/AppBanner";
// import Navbar from "../Navbar";
// import { ForgotModal } from "../forgotmodal/ForgotModal";
// // import ForgotModal from "../ForgotModal"; // Import the ForgotModal component

// export const SignUp = () => {
//   const [name, setName] = useState(""); // State for name
//   const [email, setEmail] = useState(""); // State for email
//   const [password, setPassword] = useState(""); // State for password
//   const [confirmed, setConfirmed] = useState(""); // State for confirm password
//   const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility
//   const [error, setError] = useState('');
//   const [showModal, setShowModal] = useState(true); // State to show the modal
//   const navigate = useNavigate();

//   const isValidEmail = (email) => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(email)
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!name || !email || !password || !confirmed) {
//       setError("All fields are required")
//     } else if (!isValidEmail(email)) {
//       setError('Invalid Email')
//     } else if (password !== confirmed) {
//       setError('Passwords do not match')
//     } else if (password.length < 8) {
//       setError('Password must contain 8 characters')
//     } else {
//       try {
//         const response = await axios.post(
//           "http://pankhay.com/thewhitehousegame/public/api/register",
//           {
//             name: name,
//             email: email,
//             password: password,
//             password_confirmation: confirmed,
//           },
//           {
//             headers: {
//               "Content-Type": "application/json",
//               Accept: "application/json",
//             },
//           }
//         );

//         console.log(response.data); // Log the response data

//         // Check if registration was successful
//         if (response.status === 200) {
//           localStorage.setItem("email", email);
//           localStorage.setItem('id', response.data.user.id);

//           // Show the modal
//           setShowModal(true);
//           console.log("modalopen:" ,showModal)

//           // Hide the modal and redirect after a few seconds
//           // setTimeout(() => {
//             // setShowModal(false);
//             navigate("/emailverification");
//           // }, 3000); // Show the modal for 3 seconds
//         } else {
//           // Registration failed, show error message
//           alert("Registration failed. Please try again later.");
//         }
//       } catch (error) {
//         console.error("Error:", error);
//         setError(error.response.data.message);
//       }
//     }
//   };

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const handleOpenModal = () => {
//     setIsModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//   };

//   return (
//     <div className="h-screen ">
//       <Navbar />
//       <div className="flex flex-col text-center items-center justify-center mt-5 ">
//         <h1 className="text-whiteColor sm:text-[33px] md:text-[40px] lg:text-[54px] xl-a:text-[78px] xl:w-[90%] 2xl:w-[50%] uppercase orbit9">
//           {" "}
//           <span className="text-redish">Sign</span> Up
//         </h1>
//       </div>
//       <div className="bg-[#1c2452] py-10 relative">
//         <div className="flex justify-center items-center h-full">
//           <div className="w-[402px] px-6 py-4 text-white rounded-lg">
//             <p className="text-center font-poppins">
//               Create an account so you can update your prediction, view our stats and understand our demographics.
//             </p>
//           </div>
//         </div>
//         <div className="flex justify-center items-center ml-64">
//           <img src={Vector} alt="" />
//         </div>
//         <div className="pt-5">
//           <form onSubmit={handleSubmit} className="max-w-sm mx-auto rounded-lg bg-[#131A41] px-10 py-10">
//             <div className="mb-5">
//               <label htmlFor="name" className="block mb-2 text-sm font-medium text-white font-poppins">Name</label>
//               <input
//                 type="name"
//                 id="name"
//                 className="border-[1px] border-white/15 bg-[#1c2452] text-white text-sm rounded-lg outline-none block w-full p-2.5"
//                 placeholder="Enter Name"
//                 onChange={(e) => setName(e.target.value)}
//               />
//             </div>
//             <div className="mb-5">
//               <label htmlFor="email" className="block mb-2 text-sm font-medium text-white font-poppins">Email Address</label>
//               <input
//                 type="email"
//                 id="email"
//                 value={email}
//                 className="border-[1px] border-white/15 bg-[#1c2452] text-white text-sm rounded-lg outline-none block w-full p-2.5"
//                 placeholder="Enter Email Address"
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//             </div>
//             <div className="mb-5 relative">
//               <label htmlFor="password" className="block mb-2 text-sm font-medium text-white font-poppins">Password</label>
//               <input
//                 type={showPassword ? "text" : "password"}
//                 id="password"
//                 placeholder="*******"
//                 className="border-[1px] border-white/15 bg-[#1c2452] text-white text-sm rounded-lg outline-none block w-full p-2.5"
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//               <button type="button" onClick={togglePasswordVisibility} className="absolute inset-y-12 right-0 flex items-center px-2 focus:outline-none">
//                 {showPassword ? (
//                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 text-white">
//                     <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"/>
//                   </svg>
//                 ) : (
//                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 text-white">
//                     <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"/>
//                     <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
//                   </svg>
//                 )}
//               </button>
//               <p className="text-[10px] text-white ml-1 pt-1 font-poppins">Minimum of 8 letters and/or numbers and symbols</p>
//             </div>
//             <div className="mb-5 relative">
//               <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-white font-poppins">Confirm Password</label>
//               <input
//                 type={showPassword ? "text" : "password"}
//                 id="confirmPassword"
//                 placeholder="*******"
//                 className="border-[1px] border-white/15 bg-[#1c2452] text-white text-sm rounded-lg outline-none block w-full p-2.5"
//                 onChange={(e) => setConfirmed(e.target.value)}
//               />
//               <button type="button" onClick={togglePasswordVisibility} className="absolute inset-y-12 right-0 flex items-center px-2 focus:outline-none">
//                 {showPassword ? (
//                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 text-white">
//                     <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"/>
//                   </svg>
//                 ) : (
//                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 text-white">
//                     <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"/>
//                     <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
//                   </svg>
//                 )}
//               </button>
//             </div>
//             <p className="text-redish poppins4 mt-2">{error}</p>
//             <div className="flex justify-center mt-5">
//               <button className="rounded-lg px-5 py-3 bg-red-500 w-[380px] h-[50px] text-white font-poppins">
//                 Signup
//               </button>
//             </div>
//           </form>
//           <div className="flex justify-center items-center gap-2 mt-2">
//             <p className="text-white font-poppins text-[11px]">Don't have an account ?</p>
//             <button onClick={() => navigate("/LogIn")} className="underline underline-offset-4 text-white font-poppins text-[11px] cursor-pointer">
//               Login Now
//             </button>
//           </div>
//           <div className="absolute -top-3 left-0 right-0">
//       {showModal && <ForgotModal onClose={handleCloseModal} />}
//       </div>
//         </div>

//       </div>
//        {/* Modal will be shown when showModal is true */}
//     </div>
//   );
// };

import React, { useState } from "react";
import logo1 from "../../images/logo1.png";
import Vector from "../../images/Vector.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AppBanner from "../appbanner/AppBanner";
import Navbar from "../Navbar";
import { ForgotModal } from "../forgotmodal/ForgotModal";
import DownloadApp from "../DownloadApp";
// import ForgotModal from "../ForgotModal"; // Import the ForgotModal component

export const SignUp = () => {
  const [name, setName] = useState(""); // State for name
  const [email, setEmail] = useState(""); // State for email
  const [password, setPassword] = useState(""); // State for password
  const [confirmed, setConfirmed] = useState(""); // State for confirm password
  const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false); // State to show the modal
  const navigate = useNavigate();

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmed) {
      setError("All fields are required");
    } else if (!isValidEmail(email)) {
      setError("Invalid Email");
    } else if (password !== confirmed) {
      setError("Passwords do not match");
    } else if (password.length < 8) {
      setError("Password must contain 8 characters");
    } else {
      try {
        const response = await axios.post(
          "http://thewhitehousegame.com/public/api/register",
          {
            name: name,
            email: email,
            password: password,
            password_confirmation: confirmed,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        );

        console.log(response.data); // Log the response data

        // Check if registration was successful
        if (response.status === 200) {
          localStorage.setItem("email", email);
          localStorage.setItem("id", response.data.user.id);

          // Show the modal
          setShowModal(true);
        } else {
          // Registration failed, show error message
          alert("Registration failed. Please try again later.");
        }
      } catch (error) {
        console.error("Error:", error);
        setError(error.response.data.message);
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const closeModal = () => {
    setShowModal(false);
    navigate("/emailverification");
  };

  return (
    <div className="h-screen">
      <Navbar />
      <div className="flex flex-col text-center items-center justify-center mt-2">
        <h1 className="text-whiteColor sm:text-[33px] md:text-[40px] lg:text-[54px] xl-a:text-[78px] xl:w-[90%] 2xl:w-[50%] uppercase orbit9">
          {" "}
          <span className="text-redish">Sign</span> Up
        </h1>
      </div>
      <div className="bg-[#1c2452]">
        <div className="flex justify-center items-center h-full">
          <div className="w-[420px] px-2 py-4 text-white rounded-lg">
            <p className="text-center font-poppins">
              Create an account to play The White House Game and view our
              fascinating Election Stats.
            </p>
          </div>
        </div>
        <div className="flex justify-center items-center ml-64">
          <img src={Vector} alt="" />
        </div>
        <div className="pt-3 relative mx-3 sm:mx-5 lg:mx-0">
          <form
            onSubmit={handleSubmit}
            className="max-w-sm mx-auto rounded-lg bg-[#131A41] px-10 py-10"
          >
            <div className="mb-5">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-white font-poppins"
              >
                Name
              </label>
              <input
                type="name"
                id="name"
                className="border-[1px] border-white/15 bg-[#1c2452] text-white text-sm rounded-lg outline-none block w-full p-2.5"
                placeholder="Enter a name or username"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-white font-poppins"
              >
                Email address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                className="border-[1px] border-white/15 bg-[#1c2452] text-white text-sm rounded-lg outline-none block w-full p-2.5"
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-5 relative">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-white font-poppins"
              >
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="*******"
                className="border-[1px] border-white/15 bg-[#1c2452] text-white text-sm rounded-lg outline-none block w-full p-2.5"
                onChange={(e) => setPassword(e.target.value)}
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
                      d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
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
                      d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                )}
              </button>
              <p className="text-[10px] text-white ml-1 pt-1 font-poppins">
                Minimum of 8 letters and/or numbers and symbols
              </p>
            </div>
            <div className="mb-5 relative">
              <label
                htmlFor="confirmPassword"
                className="block mb-2 text-sm font-medium text-white font-poppins"
              >
                Confirm Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="confirmPassword"
                placeholder="*******"
                className="border-[1px] border-white/15 bg-[#1c2452] text-white text-sm rounded-lg outline-none block w-full p-2.5"
                onChange={(e) => setConfirmed(e.target.value)}
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
                      d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
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
                      d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                )}
              </button>
            </div>
            <p className="text-redish poppins4 mt-2">{error}</p>
            <div className="flex justify-center mt-5">
              <button className="rounded-lg px-5 py-3 bg-red-500 w-[380px] h-[50px] text-white font-poppins">
                Sign Up
              </button>
            </div>
          </form>
          <div className="flex justify-center items-center gap-2 mt-2">
            <p className="text-white font-poppins text-[11px]">
              Already have an account?
            </p>
            <button
              onClick={() => navigate("/LogIn")}
              className=" text-white font-poppins text-[11px] cursor-pointer hover:underline"
            >
              Log In now
            </button>
          </div>
          <div className="absolute -top-3 right-0 left-0 ">
            {showModal && <ForgotModal closeModal={closeModal} />}
          </div>
        </div>
        <div>
          <DownloadApp />
        </div>
      </div>
      {/* Modal will be shown when showModal is true */}
    </div>
  );
};
