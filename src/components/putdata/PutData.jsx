import logo1 from "../../images/logo1.png";

import Layer from "../../images/Layer.png";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const PutData = () => {
  const navigate = useNavigate();
  const [AgeGroup, setAgeGroup] = useState([]);
  useEffect(() => {
    axios
      .get("https://pankhay.com/thewhitehousegame/public/api/get_user_age")
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
      .get("https://pankhay.com/thewhitehousegame/public/api/get_user_state")
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
      .get("https://pankhay.com/thewhitehousegame/public/api/get_user_ethnicty")
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
        "https://pankhay.com/thewhitehousegame/public/api/get_all_user_country_birth"
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
      .get("https://pankhay.com/thewhitehousegame/public/api/get_all_language")
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
        "https://pankhay.com/thewhitehousegame/public/api/get_all_user_employement"
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
      .get("https://pankhay.com/thewhitehousegame/public/api/get_all_education")
      .then((response) => {
        setHigherEducation(response.data.education);
      })
      .catch((error) => {
        console.log("Error in education api", error);
      });
  }, []);

  const [votedIn2020, setVotedIn2020] = useState(false);

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

  let id = localStorage.getItem("id");
  console.log(id, "data");

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

    user_votter_party: "",
  });

  const handleSaveButtonClick = async () => {
    try {
      const response = await axios.post(
        "https://pankhay.com/thewhitehousegame/public/api/update_user_info",
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

      navigate("/OptionTwo");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div className="bg-[#1c2452] pb-10 ">
        <div className="flex justify-center pt-5 ">
          <h2 className="text-white text-[23px] font-poppins">
            Forgot Password
          </h2>
        </div>
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
          <h2 className="text-white font-poppins">Your Bilogical Sex</h2>
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
                class="mt-px font-poppins text-white cursor-pointer select-none"
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
                class="mt-px font-poppins text-white cursor-pointer select-none"
                htmlFor="react"
              >
                Female
              </label>
            </div>
          </div>
        </div>
        <hr class="h-px my-8 bg-white border-0 dark:bg-white mx-20" />
        <div className="flex justify-center pt-3">
          <h2 className="text-white font-poppins text-[21px]">
            Your age group now
          </h2>
        </div>
        <div className="flex justify-center items-center pt-3">
          <select
            name="states"
            id="search"
            className="bg-transparent poppins4 text-[14px] border-transparent w-[200px] lg:w-[220px] px-3 py-2 rounded-[10px] text-whiteColor"
            onChange={(e) =>
              setPayLoad({ ...payload, user_age_id: parseInt(e.target.value) })
            }
          >
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
        <div className="flex justify-center items-center pt-3">
          <h2 className="text-white text-[16px] font-poppins">
            are you a US voter
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
                class="mt-px font-poppins text-white cursor-pointer select-none"
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
                class="mt-px font-poppins text-white cursor-pointer select-none"
                htmlFor="react"
              >
                No
              </label>
            </div>
          </div>
        </div>
        <hr class="h-px my-8 bg-white border-0 dark:bg-white mx-20" />
        <div className="max-w-[32rem] mx-auto rounded-lg bg-[#131A41] px-10 py-10">
          <div className="flex justify-center items-center">
            <div className="searchBar flex flex-col ">
              <label
                htmlFor="search"
                className="text-whiteColor text-start poppins4 text-[14px]"
              >
                Your State
              </label>
              <select
                name="states"
                id="search"
                className="bg-transparent border-[1px] poppins4 text-[14px] border-whiteColor w-[263px] lg:w-[420px] px-3 py-2 rounded-[10px] text-whiteColor mt-3"
                onChange={(e) =>
                  setPayLoad({
                    ...payload,
                    user_state_id: parseInt(e.target.value),
                  })
                }
              >
                {allstates?.map((item) => (
                  <option className="bg-[#000]" key={item.id} value={item.id}>
                    {item?.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-center items-center mt-10">
            <div className="searchBar flex flex-col ">
              <label
                htmlFor="search"
                className="text-whiteColor text-start poppins4 text-[14px]"
              >
                Your Ethnicity
              </label>
              <select
                name="states"
                id="search"
                className="bg-transparent border-[1px] poppins4 text-[14px] border-whiteColor w-[263px] lg:w-[420px] px-3 py-2 rounded-[10px] text-whiteColor mt-3"
                onChange={(e) =>
                  setPayLoad({
                    ...payload,
                    user_ethnicity_id: parseInt(e.target.value),
                  })
                }
              >
                {ethnicityData?.map((item) => (
                  <option className="bg-[#000]" key={item.id} value={item.id}>
                    {item?.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-center items-center mt-10">
            <div className="searchBar flex flex-col ">
              <label
                htmlFor="search"
                className="text-whiteColor text-start poppins4 text-[14px]"
              >
                Your Country Of Birth
              </label>
              <select
                name="states"
                id="search"
                className="bg-transparent border-[1px] poppins4 text-[14px] border-whiteColor w-[263px] lg:w-[420px] px-3 py-2 rounded-[10px] text-whiteColor mt-3"
                onChange={(e) =>
                  setPayLoad({
                    ...payload,
                    user_country_birth_id: parseInt(e.target.value),
                  })
                }
              >
                {CountryBirth?.map((item) => (
                  <option className="bg-[#000]" key={item.id} value={item.id}>
                    {item?.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-center items-center mt-10">
            <div className="searchBar flex flex-col ">
              <label
                htmlFor="search"
                className="text-whiteColor text-start poppins4 text-[14px]"
              >
                What language do you speak at home?
              </label>
              <select
                name="states"
                id="search"
                className="bg-transparent border-[1px] poppins4 text-[14px] border-whiteColor w-[263px] lg:w-[420px] px-3 py-2 rounded-[10px] text-whiteColor mt-3"
                onChange={(e) =>
                  setPayLoad({
                    ...payload,
                    language_id: parseInt(e.target.value),
                  })
                }
              >
                {byLanguage?.map((item) => (
                  <option className="bg-[#000]" key={item.id} value={item.id}>
                    {item?.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-center items-center mt-10">
            <div className="searchBar flex flex-col ">
              <label
                htmlFor="search"
                className="text-whiteColor text-start poppins4 text-[14px]"
              >
                Your Employment Status
              </label>
              <select
                name="states"
                id="search"
                className="bg-transparent border-[1px] poppins4 text-[14px] border-whiteColor w-[263px] lg:w-[420px] px-3 py-2 rounded-[10px] text-whiteColor mt-3"
                onChange={(e) =>
                  setPayLoad({
                    ...payload,
                    user_employement_id: parseInt(e.target.value),
                  })
                }
              >
                {Employment?.map((item) => (
                  <option className="bg-[#000]" key={item.id} value={item.id}>
                    {item?.employement_status}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-center items-center mt-10">
            <div className="searchBar flex flex-col ">
              <label
                htmlFor="search"
                className="text-whiteColor text-start poppins4 text-[14px]"
              >
                Your Highest Education
              </label>
              <select
                name="states"
                id="search"
                className="bg-transparent border-[1px] poppins4 text-[14px] border-whiteColor w-[263px] lg:w-[420px] px-3 py-2 rounded-[10px] text-whiteColor mt-3"
                onChange={(e) =>
                  setPayLoad({
                    ...payload,
                    education_id: parseInt(e.target.value),
                  })
                }
              >
                {highereducation?.map((item) => (
                  <option className="bg-[#000]" key={item.id} value={item.id}>
                    {item?.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center mt-10">
          <h2 className="font-poppins text-white text-[16px]">
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
                  value="yes"
                  onChange={(e) =>
                    setPayLoad({ ...payload, is_veteran: e.target.value })
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
                class="mt-px font-poppins text-white cursor-pointer select-none"
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
                class="mt-px font-poppins text-white cursor-pointer select-none"
                htmlFor="react"
              >
                No
              </label>
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center mt-10">
          <h2 className="font-poppins text-white text-[16px]">
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
                  onChange={(e) =>
                    setPayLoad({ ...payload, is_votted_2020: e.target.value })
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
                class="mt-px font-poppins text-white cursor-pointer select-none"
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
                class="mt-px font-poppins text-white cursor-pointer select-none"
                htmlFor="react"
              >
                No
              </label>
            </div>
          </div>
        </div>
        <hr class="h-px my-8 bg-white border-0 dark:bg-white mx-20" />

        <div className="flex justify-center items-center mt-10">
          <h2 className="font-poppins text-white text-[16px]">
            who did you vote for in 2020
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
                class="mt-px font-poppins text-white cursor-pointer select-none"
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
                class="mt-px font-poppins text-white cursor-pointer select-none"
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
                class="mt-px font-poppins text-white cursor-pointer select-none"
                htmlFor="react"
              >
                Other
              </label>
            </div>
          </div>
        </div>
        <hr class="h-px my-8 bg-white border-0 dark:bg-white mx-20" />

        <div className="flex justify-center items-center mt-10">
          <h2 className="font-poppins text-white text-[16px]">
            How did you cast your vote in 2020?
          </h2>
        </div>

        <div className="flex justify-center gap-5 pt-3">
          <div class="flex flex-col gap-2">
            <div class="inline-flex items-center">
              <label
                class="relative flex items-center p-3 rounded-full cursor-pointer"
                htmlFor="red"
              >
                <input
                  name="polling"
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
                class="mt-px font-poppins text-white cursor-pointer select-none"
                htmlFor="react"
              >
                At a polling station on election day
              </label>
            </div>
            <div class="inline-flex items-center">
              <label
                class="relative flex items-center p-3 rounded-full cursor-pointer"
                htmlFor="red"
              >
                <input
                  name="mail"
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
                class="mt-px font-poppins text-white cursor-pointer select-none"
                htmlFor="react"
              >
                Mail-in ballot or use a drop-box
              </label>
            </div>
          </div>
        </div>
        <hr class="h-px my-8 bg-white border-0 dark:bg-white mx-20" />

        <div className="flex justify-center items-center mt-10 ">
          <h2 className="font-poppins text-white text-[16px] w-[345px] text-center">
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
                class="mt-px font-poppins text-white cursor-pointer select-none"
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
                class="mt-px font-poppins text-white cursor-pointer select-none"
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
                class="mt-px font-poppins text-white cursor-pointer select-none"
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
                class="mt-px font-poppins text-white cursor-pointer select-none"
                htmlFor="react"
              >
                Other
              </label>
            </div>
          </div>
        </div>
        <hr class="h-px my-8 bg-white border-0 dark:bg-white mx-20" />

        <div className="flex justify-center items-center mt-10">
          <h2 className="font-poppins text-white text-[16px]">
            Keep me Informed
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
                class="mt-px font-poppins text-white cursor-pointer select-none"
                htmlFor="react"
              >
                Join our monthly newsletter
              </label>
            </div>
          </div>
        </div>
        <hr class="h-px my-8 bg-white border-0 dark:bg-white mx-20" />
        <div className="flex justify-center mt-5 ">
          <button
            onClick={handleSaveButtonClick}
            className="rounded-lg px-5 py-3 bg-red-500 w-[380px] h-[50px] text-white font-poppins"
          >
            Save
          </button>
        </div>
      </div>
    </>
  );
};
