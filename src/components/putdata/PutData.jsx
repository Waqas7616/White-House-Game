import logo1 from "../../images/logo1.png";

import Layer from "../../images/Layer.png";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AppBanner from "../appbanner/AppBanner";
import bg from '../../images/images1.jpg'

export const PutData = () => {
  const navigate = useNavigate();
  const [AgeGroup, setAgeGroup] = useState([]);
  useEffect(() => {
    axios
      .get("https://thewhitehousegame.com/public/api/get_user_age")
      .then((response) => {
        console.log("Age Group:", response.data.user_age);

        setAgeGroup(response.data.user_age);
      })
      .catch((error) => {
        console.error("Error fetching Age Group:", error);
      });
  }, []);

  const [allstates, setAllStates] = useState([]);

  useEffect(() => {
    axios
      .get("https://thewhitehousegame.com/public/api/get_user_state")
      .then((response) => {
        setAllStates(response.data.user_state);
      })
      .catch((error) => {
        console.error("Error fetching All States:", error);
      });
  }, []);

  const [ethnicityData, setEthnicityData] = useState([]);

  useEffect(() => {
    axios
      .get("https://thewhitehousegame.com/public/api/get_user_ethnicty")
      .then((response) => {
        setEthnicityData(response.data.user_ethnicity);
      })
      .catch((error) => {
        console.error("Error fetching ethnicity data:", error);
      });
  }, []);

  const [CountryBirth, setCountryBirth] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://thewhitehousegame.com/public/api/get_all_user_country_birth"
      )
      .then((response) => {
        setCountryBirth(response.data.user_country_birth);
      })
      .catch((error) => {
        console.error("Error fetching Country Birth:", error);
      });
  }, []);

  const [byLanguage, setByLanguage] = useState([]);

  useEffect(() => {
    axios
      .get("https://thewhitehousegame.com/public/api/get_all_language")
      .then((response) => {
        setByLanguage(response.data.language);
      })
      .catch((error) => {
        console.error("Error fetching by Language:", error);
      });
  }, []);

  const [Employment, setEmployment] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://thewhitehousegame.com/public/api/get_all_user_employement"
      )
      .then((response) => {
        // console.log("User Employment:", response.data.user_employement);

        setEmployment(response.data.user_employement);
      })
      .catch((error) => {
        console.error("Error fetching user Employment:", error);
      });
  }, []);

  const [highereducation, setHigherEducation] = useState([]);

  useEffect(() => {
    axios
      .get("https://thewhitehousegame.com/public/api/get_all_education")
      .then((response) => {
        setHigherEducation(response.data.education);
      })
      .catch((error) => {
        console.log("Error in education api", error);
      });
  }, []);



  const [jwtToken, setJwtToken] = useState("");
  console.log("token :", jwtToken);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    console.log("token", storedToken);
    if (storedToken) {
      setJwtToken(storedToken);
    } else {
    }
  }, []);
  const email = localStorage.getItem('email')
  let id = localStorage.getItem("id");
  console.log(id, "data");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [votedIn2020, setVotedIn2020] = useState("No");
  const [payload, setPayLoad] = useState({
    id: id,
    language_id: "",
    user_age_id: "",
    user_ethnicity_id: "",
    user_country_birth_id: "",
    user_employement_id: "",
    user_gender_id: "",
    education_id: "",
    user_state_id: "",
    is_veteran: "",
    is_votted_2020: "",
    voter_candidate_id: "",
    source: "",
    is_subscription_newsletter:"No",

    user_votter_party: "",
  });

  

  const handleSubscriptionChange = (e) => {
    const isChecked = e.target.checked;
    const value = isChecked ? "yes" : "No";
    setIsSubscribed(isChecked); 
    setPayLoad({ ...payload, is_subscription_newsletter: value });

    
    if (!isChecked) {
      setPayLoad({ ...payload, is_subscription_newsletter: "No" });
    }
  };

  const handleVoteChange = (e) => {
    const value = e.target.value;
    setVotedIn2020(value);
    setPayLoad({ ...payload, is_votted_2020: value });
  };

  const handleSaveButtonClick = async () => {
    try {
      const response = await axios.post(
        "https://thewhitehousegame.com/public/api/update_user_info",
        payload,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      console.log("My payload is:", payload);
      console.log(response.data);

      navigate("/login");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
    <div className="h-screen">
    <AppBanner
        bannerTitle={"an account"}
        redTitle={"create"}
        bannerDesc={"And help us predict the mood of the nation"}
        bg={bg}
      />
      <div className="bg-[#1c2452] py-10 m-auto w-[80%] ">
    
      <div className="bg-[#1c2452] pb-10 m-auto  ">
        {/* <div className="flex justify-center pt-5 ">
          <h2 className="text-white text-[23px] font-poppins">
            Forgot Password
          </h2>
        </div> */}
        <div className="flex justify-center pt-5">
          <img src={logo1} alt="" />
        </div>
        <div className="flex justify-center pt-5">
          <img src={Layer} alt="" />
        </div>
        <div className="flex justify-center pt-3">
          <h2 className="text-white font-poppins text-[11px]">
            Answer as many of these questions as you like
          </h2>
        </div>
        <div className="flex justify-center pt-3 ">
          <h2 className="text-white font-bold font-poppins">Your biological sex</h2>
        </div>
        <div className="flex justify-center gap-5 pt-3">
          <div class="flex gap-10">
            <div class="inline-flex items-center">
              <label
                class="relative flex items-center p-3 rounded-full cursor-pointer"
                htmlFor="red"
              >
                <input
                  name="gender"
                  type="radio"
                  class="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-blue-gray-200 text-red-500 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-red-500 checked:before:bg-red-500 hover:before:opacity-10"
                  id="male"
                  value="1"
                  onChange={(e) =>
                    setPayLoad({ ...payload, user_gender_id: e.target.value })
                  }
                />
                <span class="absolute text-red-500 transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-3.5 w-3.5"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                  >
                    <circle data-name="ellipse" cx="8" cy="8" r="8"></circle>
                  </svg>
                </span>
              </label>
              <label
                class="mt-px font-poppins text-white text-[11px] md:text-[14px] cursor-pointer select-none"
                htmlFor="react"
              >
                Male
              </label>
            </div>
            <div class="inline-flex items-center">
              <label
                class="relative flex items-center p-3 rounded-full cursor-pointer"
                htmlFor="red"
              >
                <input
                  name="gender"
                  type="radio"
                  class="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-blue-gray-200 text-red-500 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-red-500 checked:before:bg-red-500 hover:before:opacity-10"
                  id="female"
                  value="2"
                  onChange={(e) =>
                    setPayLoad({ ...payload, user_gender_id: e.target.value })
                  }
                />
                <span class="absolute text-red-500 transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-3.5 w-3.5"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                  >
                    <circle data-name="ellipse" cx="8" cy="8" r="8"></circle>
                  </svg>
                </span>
              </label>
              <label
                class="mt-px font-poppins text-white text-[11px] md:text-[14px] cursor-pointer select-none"
                htmlFor="react"
              >
                Female
              </label>
            </div>
          </div>
        </div>
        <hr class="h-px my-8 bg-[#FFFFFF] opacity-[10%] border-0 dark:bg-white mx-20" />
        <div className="flex justify-center pt-3">
          <h2 className="text-white font-poppins text-[14px] font-bold md:text-[21px]">
            Your age group now
          </h2>
        </div>
        <div className="flex justify-center items-center  pt-3">
          <div 
            className="bg-transparent poppins4 text-[12px] md:text-[14px] border-white border-[1px] w-[28%] px-2 py-2 rounded-[10px] text-whiteColor"
          
          >
          <select
          className="bg-transparent w-full outline-none"
            name="states"
            id="search"
            onChange={(e) =>
              setPayLoad({ ...payload, user_age_id: parseInt(e.target.value) })
            }
          >
            <option className="bg-[#000]" value="">
            Select your age group
                  </option>
            {AgeGroup?.map((item) => (
              <option
                className="bg-[#000] border-transparent"
                key={item.id}
                value={item.id}
              >
                {item?.range}
              </option>
            ))}
          </select>
          </div>
        </div>
        <hr class="h-px my-8 bg-[#FFFFFF] opacity-[10%] border-0 dark:bg-white mx-20" />

        <div className="flex justify-center items-center pt-3">
          <h2 className="text-white text-[14px] font-bold md:text-[16px] font-poppins">
          Are you a US voter?
          </h2>
        </div>
        <div className="flex justify-center gap-5 pt-3">
          <div class="flex gap-10">
            <div class="inline-flex items-center">
              <label
                class="relative flex items-center p-3 rounded-full cursor-pointer"
                htmlFor="red"
              >
                <input
                  name="color"
                  type="radio"
                  class="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-blue-gray-200 text-red-500 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-red-500 checked:before:bg-red-500 hover:before:opacity-10"
                  id="red"
                  defaultChecked
                />
                <span class="absolute text-red-500 transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-3.5 w-3.5"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                  >
                    <circle data-name="ellipse" cx="8" cy="8" r="8"></circle>
                  </svg>
                </span>
              </label>
              <label
                class="mt-px font-poppins text-white text-[11px] md:text-[14px] cursor-pointer select-none"
                htmlFor="react"
              >
                Yes
              </label>
            </div>
            <div class="inline-flex items-center">
              <label
                class="relative flex items-center p-3 rounded-full cursor-pointer"
                htmlFor="red"
              >
                <input
                  name="color"
                  type="radio"
                  class="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-blue-gray-200 text-red-500 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-red-500 checked:before:bg-red-500 hover:before:opacity-10"
                  id="red"
                />
                <span class="absolute text-red-500 transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-3.5 w-3.5"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                  >
                    <circle data-name="ellipse" cx="8" cy="8" r="8"></circle>
                  </svg>
                </span>
              </label>
              <label
                class="mt-px font-poppins text-white text-[11px] md:text-[14px] cursor-pointer select-none"
                htmlFor="react"
              >
                No
              </label>
            </div>
          </div>
        </div>
        <hr class="h-px my-8 bg-[#FFFFFF] opacity-[10%] border-0 dark:bg-white mx-20" />
        <div className="max-w-[32rem] mx-auto rounded-lg bg-[#131A41] px-10 py-10">
          <div className="flex justify-center items-center ">
            <div className="searchBar flex flex-col w-full">
              <label
                htmlFor="search"
                className="text-whiteColor text-start poppins4 text-[14px]"
              >
                Your State
              </label>
              <div 
            className="bg-transparent poppins4 text-[12px] md:text-[14px] border-white border-[1px]  px-2 py-2 rounded-[10px] text-whiteColor mt-3"
          
          >
              <select
                name="states"
                id="search"
                className="bg-transparent outline-none w-full"
                onChange={(e) =>
                  setPayLoad({
                    ...payload,
                    user_state_id: parseInt(e.target.value),
                  })
                }
              >
                <option className="bg-[#000]" value="">
                Where you live
                  </option>
                {allstates?.map((item) => (
                  <option className="bg-[#000]" key={item.id} value={item.id}>
                    {item?.name}
                  </option>
                ))}
              </select>
              </div>
            </div>
          </div>

          <div className="flex justify-center items-center mt-10">
            <div className="searchBar flex flex-col w-full">
              <label
                htmlFor="search"
                className="text-whiteColor text-start poppins4 text-[14px]"
              >
                Your ethnicity
              </label>
              <div 
            className="bg-transparent poppins4 text-[12px] md:text-[14px] border-white border-[1px] px-2 py-2 rounded-[10px] text-whiteColor mt-3"
          
          >
              <select
                name="states"
                id="search"
                className="bg-transparent outline-none w-full"
                onChange={(e) =>
                  setPayLoad({
                    ...payload,
                    user_ethnicity_id: parseInt(e.target.value),
                  })
                }
              >
                <option className="bg-[#000]" value="">
                Select your ethnicity 
                  </option>
                {ethnicityData?.map((item) => (
                  <option className="bg-[#000]" key={item.id} value={item.id}>
                    {item?.name}
                  </option>
                ))}
              </select>
              </div>
            </div>
          </div>

          <div className="flex justify-center items-center mt-10">
            <div className="searchBar flex flex-col w-full">
              <label
                htmlFor="search"
                className="text-whiteColor text-start poppins4 text-[14px]"
              >
                Your country of birth
              </label>
              <div 
            className="bg-transparent poppins4 text-[12px] md:text-[14px] border-white border-[1px] px-2 py-2 rounded-[10px] text-whiteColor mt-3"
          
          >
              <select
                name="states"
                id="search"
                className="bg-transparent w-full outline-none"
                onChange={(e) =>
                  setPayLoad({
                    ...payload,
                    user_country_birth_id: parseInt(e.target.value),
                  })
                }
              >
                {/* <option className="bg-[#000]" value="">
                   USA
                  </option> */}
                {CountryBirth?.map((item) => (
                  <option className="bg-[#000]" key={item.id} value={item.id}>
                    {item?.name}
                  </option>
                ))}
              </select>
              </div>
            </div>
          </div>

          <div className="flex justify-center items-center mt-10">
            <div className="searchBar flex flex-col w-full">
              <label
                htmlFor="search"
                className="text-whiteColor text-start poppins4 text-[14px]"
              >
                What language do you speak at home?
              </label>
              <div 
            className="bg-transparent poppins4 text-[12px] md:text-[14px] border-white border-[1px] px-2 py-2 rounded-[10px] text-whiteColor mt-3"
          
          >
              <select
                name="states"
                id="search"
                className="bg-transparent w-full outline-none"
                onChange={(e) =>
                  setPayLoad({
                    ...payload,
                    language_id: parseInt(e.target.value),
                  })
                }
              >
                {/* <option className="bg-[#000]" value="">
                    Select All Languages
                  </option> */}
                {byLanguage?.map((item) => (
                  <option className="bg-[#000]" key={item.id} value={item.id}>
                    {item?.name}
                  </option>
                ))}
              </select>
              </div>
            </div>
          </div>

          <div className="flex justify-center items-center mt-10">
            <div className="searchBar flex flex-col w-full">
              <label
                htmlFor="search"
                className="text-whiteColor text-start poppins4 text-[14px]"
              >
                Your employment status
              </label>
              <div 
            className="bg-transparent poppins4 text-[12px] md:text-[14px] border-white border-[1px] px-2 py-2 rounded-[10px] text-whiteColor mt-3"
          
          >
              <select
                name="states"
                id="search"
                className="bg-transparent w-full outline-none"
                onChange={(e) =>
                  setPayLoad({
                    ...payload,
                    user_employement_id: parseInt(e.target.value),
                  })
                }
              >
                <option className="bg-[#000]" value="">
                Select best description
                  </option>
                {Employment?.map((item) => (
                  <option className="bg-[#000]" key={item.id} value={item.id}>
                    {item?.employement_status}
                  </option>
                ))}
              </select>
              </div>
            </div>
          </div>

          <div className="flex justify-center items-center mt-10">
            <div className="searchBar flex flex-col w-full">
              <label
                htmlFor="search"
                className="text-whiteColor text-start poppins4 text-[14px]"
              >
                Your highest education
              </label>
              <div 
            className="bg-transparent poppins4 text-[12px] md:text-[14px] border-white border-[1px] px-2 py-2 rounded-[10px] text-whiteColor mt-3"
          
          >
              <select
                name="states"
                id="search"
                className="bg-transparent w-full outline-none"
                onChange={(e) =>
                  setPayLoad({
                    ...payload,
                    education_id: parseInt(e.target.value),
                  })
                }
              >
                <option className="bg-[#000]" value="">
                Select best description
                  </option>
                {highereducation?.map((item) => (
                  <option className="bg-[#000]" key={item.id} value={item.id}>
                    {item?.name}
                  </option>
                ))}
              </select>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center mt-10">
          <h2 className="font-poppins text-white font-bold text-nowrap text-[14px] md:text-[18px]">
            Are you a Veteran or in Military service?
          </h2>
        </div>

        <div className="flex justify-center gap-5 pt-3">
          <div class="flex gap-10">
            <div class="inline-flex items-center">
              <label
                class="relative flex items-center p-3 rounded-full cursor-pointer"
                htmlFor="red"
              >
                <input
                  name="veteran"
                  type="radio"
                  class="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-blue-gray-200 text-red-500 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-red-500 checked:before:bg-red-500 hover:before:opacity-10"
                  id="veteran"
                  value="true"
                  onChange={(e) =>
                    setPayLoad({ ...payload, is_veteran: e.target.value === "true" })
                  }
                />
                <span class="absolute text-red-500 transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-3.5 w-3.5"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                  >
                    <circle data-name="ellipse" cx="8" cy="8" r="8"></circle>
                  </svg>
                </span>
              </label>
              <label
                class="mt-px font-poppins text-white text-[11px] md:text-[14px] cursor-pointer select-none"
                htmlFor="react"
              >
                Yes
              </label>
            </div>
            <div class="inline-flex items-center">
              <label
                class="relative flex items-center p-3 rounded-full cursor-pointer"
                htmlFor="red"
              >
                <input
                  name="veteran"
                  type="radio"
                  class="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-blue-gray-200 text-red-500 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-red-500 checked:before:bg-red-500 hover:before:opacity-10"
                  id="veteran"
                  value="false"
                  defaultChecked
                  onChange={(e) =>
                    setPayLoad({ ...payload, is_veteran: e.target.value === "true" })
                  }
                />
                <span class="absolute text-red-500 transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-3.5 w-3.5"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                  >
                    <circle data-name="ellipse" cx="8" cy="8" r="8"></circle>
                  </svg>
                </span>
              </label>
              <label
                class="mt-px font-poppins text-white text-[11px] md:text-[14px] cursor-pointer select-none"
                htmlFor="react"
              >
                No
              </label>
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center mt-10">
          <h2 className="font-poppins text-white text-[14px] md:text-[18px] font-bold">
            Did you vote in 2020?
          </h2>
        </div>
        <div className="flex justify-center gap-5 pt-3">
          <div class="flex gap-10">
            <div class="inline-flex items-center">
              <label
                class="relative flex items-center p-3 rounded-full cursor-pointer"
                htmlFor="red"
              >
                <input
                  name="voted2020"
                  type="radio"
                  class="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-blue-gray-200 text-red-500 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-red-500 checked:before:bg-red-500 hover:before:opacity-10"
                  id="red"
                  value="yes"
                  // onChange={(e) =>
                  //   setPayLoad({ ...payload, is_votted_2020: e.target.value })
                  // }
                  onChange={handleVoteChange}
                />
                <span class="absolute text-red-500 transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-3.5 w-3.5"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                  >
                    <circle data-name="ellipse" cx="8" cy="8" r="8"></circle>
                  </svg>
                </span>
              </label>
              <label
                class="mt-px font-poppins text-white text-[11px] md:text-[14px] cursor-pointer select-none"
                htmlFor="react"
              >
                Yes
              </label>
            </div>
            <div class="inline-flex items-center">
              <label
                class="relative flex items-center p-3 rounded-full cursor-pointer"
                htmlFor="red"
              >
                <input
                  name="voted2020"
                  type="radio"
                  class="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-blue-gray-200 text-red-500 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-red-500 checked:before:bg-red-500 hover:before:opacity-10"
                  id="no"
                  onChange={handleVoteChange}
                  defaultChecked
                  
                />
                <span class="absolute text-red-500 transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-3.5 w-3.5"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                  >
                    <circle data-name="ellipse" cx="8" cy="8" r="8"></circle>
                  </svg>
                </span>
              </label>
              <label
                class="mt-px font-poppins text-white text-[11px] md:text-[14px] cursor-pointer select-none"
                htmlFor="react"
              >
                No
              </label>
            </div>
          </div>
        </div>
        {votedIn2020 === "yes" && (
          <>
        <hr class="h-px my-8 bg-[#FFFFFF] opacity-[10%] border-0 dark:bg-white mx-20" />

        <div className="flex justify-center items-center mt-10">
          <h2 className="font-poppins text-white text-[14px] md:text-[18px] font-bold">
            Who did you vote for in 2020
          </h2>
        </div>

        <div className="flex justify-center gap-5 pt-3">
          <div class="flex gap-10">
            <div class="inline-flex items-center">
              <label
                class="relative flex items-center p-3 rounded-full cursor-pointer"
                htmlFor="red"
              >
                <input
                  name="candidate"
                  type="radio"
                  class="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-blue-gray-200 text-red-500 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-red-500 checked:before:bg-red-500 hover:before:opacity-10"
                  id="bidenHarris"
                  value="1"
                  onChange={(e) =>
                    setPayLoad({
                      ...payload,
                      voter_candidate_id: e.target.value,
                    })
                  }
                />
                <span class="absolute text-red-500 transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-3.5 w-3.5"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                  >
                    <circle data-name="ellipse" cx="8" cy="8" r="8"></circle>
                  </svg>
                </span>
              </label>
              <label
                class="mt-px font-poppins text-white text-[11px] md:text-[14px] cursor-pointer select-none"
                htmlFor="react"
              >
                Biden/Harris
              </label>
            </div>
            <div class="inline-flex items-center">
              <label
                class="relative flex items-center p-3 rounded-full cursor-pointer"
                htmlFor="red"
              >
                <input
                  name="candidate"
                  type="radio"
                  class="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-blue-gray-200 text-red-500 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-red-500 checked:before:bg-red-500 hover:before:opacity-10"
                  id="Trump/Pense"
                  value="2"
                  onChange={(e) =>
                    setPayLoad({
                      ...payload,
                      voter_candidate_id: e.target.value,
                    })
                  }
                />
                <span class="absolute text-red-500 transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-3.5 w-3.5"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                  >
                    <circle data-name="ellipse" cx="8" cy="8" r="8"></circle>
                  </svg>
                </span>
              </label>
              <label
                class="mt-px font-poppins text-white text-[11px] md:text-[14px] cursor-pointer select-none"
                htmlFor="react"
              >
                Trump/Pense
              </label>
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-5 pt-3">
          <div class="flex gap-10">
            <div class="inline-flex items-center">
              <label
                class="relative flex items-center p-3 rounded-full cursor-pointer"
                htmlFor="red"
              >
                <input
                  name="candidate"
                  type="radio"
                  class="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-blue-gray-200 text-red-500 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-red-500 checked:before:bg-red-500 hover:before:opacity-10"
                  id="Other"
                  value="3"
                  onChange={(e) =>
                    setPayLoad({
                      ...payload,
                      voter_candidate_id: e.target.value,
                    })
                  }
                />
                <span class="absolute text-red-500 transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-3.5 w-3.5"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                  >
                    <circle data-name="ellipse" cx="8" cy="8" r="8"></circle>
                  </svg>
                </span>
              </label>
              <label
                class="mt-px font-poppins text-white text-[11px] md:text-[14px] cursor-pointer select-none"
                htmlFor="react"
              >
                Other
              </label>
            </div>
          </div>
        </div>
        <hr class="h-px my-8 bg-[#FFFFFF] opacity-[10%] border-0 dark:bg-white mx-20" />

        <div className="flex justify-center items-center mt-10">
          <h2 className="font-poppins text-white font-bold text-[14px] md:text-[18px]">
            How did you cast your vote in 2020?
          </h2>
        </div>

        <div className="flex justify-center gap-5 pt-3">
          <div class="flex flex-col gap-2">
            <div class="inline-flex items-center">
              <label
                class="relative flex items-center p-3 rounded-full cursor-pointer"
                htmlFor="polling"
              >
                <input
                  name="source"
                  type="radio"
                  class="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-blue-gray-200 text-red-500 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-red-500 checked:before:bg-red-500 hover:before:opacity-10"
                  id="polling"
                  value="polling"
                  onChange={(e) =>
                    setPayLoad({ ...payload, source: e.target.value })
                  }
                />
                <span class="absolute text-red-500 transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-3.5 w-3.5"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                  >
                    <circle data-name="ellipse" cx="8" cy="8" r="8"></circle>
                  </svg>
                </span>
              </label>
              <label
                class="mt-px font-poppins text-white text-[11px] md:text-[14px] cursor-pointer select-none"
                htmlFor="react"
              >
                At a polling station on election day
              </label>
            </div>
            <div class="inline-flex items-center">
              <label
                class="relative flex items-center p-3 rounded-full cursor-pointer"
                htmlFor="mail"
              >
                <input
                  name="source"
                  type="radio"
                  class="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-blue-gray-200 text-red-500 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-red-500 checked:before:bg-red-500 hover:before:opacity-10"
                  id="mail"
                  value="mail"
                  onChange={(e) =>
                    setPayLoad({ ...payload, source: e.target.value })
                  }
                />
                <span class="absolute text-red-500 transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-3.5 w-3.5"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                  >
                    <circle data-name="ellipse" cx="8" cy="8" r="8"></circle>
                  </svg>
                </span>
              </label>
              <label
                class="mt-px font-poppins text-white text-[11px] md:text-[14px] cursor-pointer select-none"
                htmlFor="react"
              >
                Mail-in ballot or use a drop-box
              </label>
            </div>
          </div>
        </div>
        <hr class="h-px my-8 bg-[#FFFFFF] opacity-[10%] border-0 dark:bg-white mx-20" />
        </>
        )}

        <div className="flex justify-center items-center mt-10 ">
          <h2 className="font-poppins text-white font-bold  text-[14px] md:text-[18px] w-[345px] text-center">
            Which party’s candidate would you vote for today?
          </h2>
        </div>

        <div className="flex justify-center gap-5 pt-3">
          <div class="flex gap-10">
            <div class="inline-flex items-center">
              <label
                class="relative flex items-center p-3 rounded-full cursor-pointer"
                htmlFor="red"
              >
                <input
                  name="party"
                  type="radio"
                  class="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-blue-gray-200 text-red-500 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-red-500 checked:before:bg-red-500 hover:before:opacity-10"
                  id="Democratic"
                  value="1"
                  onChange={(e) =>
                    setPayLoad({
                      ...payload,
                      user_votter_party: e.target.value,
                    })
                  }
                />
                <span class="absolute text-red-500 transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-3.5 w-3.5"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                  >
                    <circle data-name="ellipse" cx="8" cy="8" r="8"></circle>
                  </svg>
                </span>
              </label>
              <label
                class="mt-px font-poppins text-white text-[11px] md:text-[14px] cursor-pointer select-none"
                htmlFor="react"
              >
                Democratic
              </label>
            </div>
            <div class="inline-flex items-center">
              <label
                class="relative flex items-center p-3 rounded-full cursor-pointer"
                htmlFor="red"
              >
                <input
                  name="party"
                  type="radio"
                  class="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-blue-gray-200 text-red-500 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-red-500 checked:before:bg-red-500 hover:before:opacity-10"
                  id="Republican"
                  value="2"
                  onChange={(e) =>
                    setPayLoad({
                      ...payload,
                      user_votter_party: e.target.value,
                    })
                  }
                />
                <span class="absolute text-red-500 transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-3.5 w-3.5"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                  >
                    <circle data-name="ellipse" cx="8" cy="8" r="8"></circle>
                  </svg>
                </span>
              </label>
              <label
                class="mt-px font-poppins text-white text-[11px] md:text-[14px] cursor-pointer select-none"
                htmlFor="react"
              >
                Republican
              </label>
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-5 pt-3">
          <div class="flex gap-10">
            <div class="inline-flex items-center">
              <label
                class="relative flex items-center p-3 rounded-full cursor-pointer"
                htmlFor="red"
              >
                <input
                  name="party"
                  type="radio"
                  class="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-blue-gray-200 text-red-500 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-red-500 checked:before:bg-red-500 hover:before:opacity-10"
                  id="Independent"
                  value="3"
                  onChange={(e) =>
                    setPayLoad({
                      ...payload,
                      user_votter_party: e.target.value,
                    })
                  }
                />
                <span class="absolute text-red-500 transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-3.5 w-3.5"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                  >
                    <circle data-name="ellipse" cx="8" cy="8" r="8"></circle>
                  </svg>
                </span>
              </label>
              <label
                class="mt-px font-poppins text-white text-[11px] md:text-[14px] cursor-pointer select-none"
                htmlFor="react"
              >
                Independent (Kennedy)
              </label>
            </div>
            <div class="inline-flex items-center">
              <label
                class="relative flex items-center p-3 rounded-full cursor-pointer"
                htmlFor="red"
              >
                <input
                  name="party"
                  type="radio"
                  class="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-blue-gray-200 text-red-500 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-red-500 checked:before:bg-red-500 hover:before:opacity-10"
                  id="Other"
                  value="4"
                  onChange={(e) =>
                    setPayLoad({
                      ...payload,
                      user_votter_party: e.target.value,
                    })
                  }
                />
                <span class="absolute text-red-500 transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-3.5 w-3.5"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                  >
                    <circle data-name="ellipse" cx="8" cy="8" r="8"></circle>
                  </svg>
                </span>
              </label>
              <label
                class="mt-px font-poppins text-white text-[11px] md:text-[14px] cursor-pointer select-none"
                htmlFor="react"
              >
                Other
              </label>
            </div>
          </div>
        </div>
        <hr class="h-px my-8 bg-[#FFFFFF] opacity-[10%] border-0 dark:bg-white mx-20" />

        <div className="flex justify-center items-center mt-10">
          <h2 className="font-poppins text-white font-bold text-[14px] md:text-[18px]">
            Keep me Informed
          </h2>
        </div>

        <div className="flex justify-center gap-5 pt-3">
          <div class="flex gap-10">
            <div class="inline-flex items-center">
              <label
                class="relative flex items-center p-3 rounded-full cursor-pointer"
                htmlFor="subscribe"
              >
                <input
                  name="newsletter"
                  type="radio"
                  class="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-blue-gray-200 text-red-500 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-red-500 checked:before:bg-red-500 hover:before:opacity-10"
                  id="subscribe"
                  value="yes"
              //     checked={payload.is_subscription_newsletter === "yes"}
              // onChange={handleSubscriptionChange}
              checked={isSubscribed}
              onChange={handleSubscriptionChange}
                />
                <span class="absolute text-red-500 transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-3.5 w-3.5"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                  >
                    <circle data-name="ellipse" cx="8" cy="8" r="8"></circle>
                  </svg>
                </span>
              </label>
              <label
                class="mt-px font-poppins text-white text-nowrap text-[11px] md:text-[14px] cursor-pointer select-none"
                htmlFor="react"
              >
                Join our monthly newsletter
              </label>
            </div>
          </div>
        </div>
        <hr class="h-px my-8 bg-[#FFFFFF] opacity-[10%] border-0 dark:bg-white mx-20" />
        <div className="flex justify-center mt-5 ">
          <button
            onClick={handleSaveButtonClick}
            className="rounded-lg px-5 py-3 bg-red-500 w-[380px] h-[50px] text-white font-poppins"
          >
            Save
          </button>
        </div>
<div className="mt-7">
        <h2 className="text-center font-poppins text-white text-[14px] md:text-[18px] ">
        Would you like to see what others think?
          </h2>
          <h2 className="mt-5 text-center font-poppins text-white text-[14px] md:text-[18px] font-bold">
          View our Stats
          </h2>
          </div>
      </div>
      </div>
      </div>
    </>
  );
};
