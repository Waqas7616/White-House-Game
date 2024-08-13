import logo1 from "../../images/logo1.png";

import Layer from "../../images/Layer.png";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import AppBanner from "../appbanner/AppBanner";
import bg from "../../images/images1.jpg";
import { Spinner } from "@material-tailwind/react";
import CustomSpinner from "../spinner";
import DownloadApp from "../DownloadApp";
import secureLocalStorage from "react-secure-storage";
import check from "../../images/check.png";
import { Helmet } from "react-helmet";

export const PutData = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state?.data;
  const [AgeGroup, setAgeGroup] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [myAccountData, setMyAccountData] = useState([]);
  useEffect(() => {
    axios
      .get("https://app.thewhitehousegame.com/api/get_user_age")
      .then((response) => {
        setAgeGroup(response.data.user_age);
      })
      .catch((error) => {
        console.error("Error fetching Age Group:", error);
      });
  }, []);

  const [allstates, setAllStates] = useState([]);

  useEffect(() => {
    axios
      .get("https://app.thewhitehousegame.com/api/get_user_state")
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
      .get("https://app.thewhitehousegame.com/api/get_user_ethnicty")
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
      .get("https://app.thewhitehousegame.com/api/get_all_user_country_birth")
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
      .get("https://app.thewhitehousegame.com/api/get_all_language")
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
      .get("https://app.thewhitehousegame.com/api/get_all_user_employement")
      .then((response) => {
        setEmployment(response.data.user_employement);
      })
      .catch((error) => {
        console.error("Error fetching user Employment:", error);
      });
  }, []);

  const [highereducation, setHigherEducation] = useState([]);

  useEffect(() => {
    axios
      .get("https://app.thewhitehousegame.com/api/get_all_education")
      .then((response) => {
        setHigherEducation(response.data.education);
      })
      .catch((error) => {
        console.log("Error in education api", error);
      });
  }, []);

  const [jwtToken, setJwtToken] = useState("");

  const storedToken = secureLocalStorage.getItem("token");

  const email = secureLocalStorage.getItem("email");

  let id = secureLocalStorage.getItem("id");

  const [isSubscribed, setIsSubscribed] = useState(false);
  // const [votedIn2020, setVotedIn2020] = useState("no");
  const [condition, setCondition] = useState(false);
  const [newPayload, setNewPayload] = useState(null);
  const [popUp, setPopUP] = useState(false);
  const [payload, setPayLoad] = useState({
    // id: id,
    language_id: "",
    user_age_id: myAccountData.age,
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
    is_subscription_newsletter: "no",

    user_votter_party: "",
  });
  // console.log("payload",payload)

  const handleSubscriptionChange = (e) => {
    const isChecked = e.target.checked;
    const value = isChecked ? "yes" : "no";
    setIsSubscribed(isChecked);
    setPayLoad({ ...payload, is_subscription_newsletter: value });

    if (!isChecked) {
      setPayLoad({ ...payload, is_subscription_newsletter: "no" });
    }
  };

  // const handleVoteChange = (e) => {
  //   const value = e.target.value;
  //   setVotedIn2020(value);
  //   setPayLoad({ ...payload, is_votted_2020: value });
  // };

  useEffect(() => {
    let adjustedPayload = { ...payload };

    if (adjustedPayload.is_votted_2020 === "No") {
      delete adjustedPayload.voter_candidate_id;
      delete adjustedPayload.source;
      setCondition(true);
      setNewPayload(adjustedPayload);
    }
  }, [payload]);

  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     try {
  //       const response = await axios.get(
  //         `https://app.thewhitehousegame.com/api/get_user_info`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${jwtToken}`,
  //             "Content-Type": "application/json",
  //             Accept: "application/json",
  //           },
  //         }
  //       );

  //       const userData = response.data.data;
  //       console.log('update user is ',response)
  //       setMyAccountData(userData);
  //       const updatedPayload = {
  //         ...payload,
  //         language_id: userData.language_id || "",
  //         user_age_id: userData.user_age_id || "",
  //         user_ethnicity_id: userData.user_ethnicity_id || "",
  //         user_country_birth_id: userData.user_country_birth_id || "",
  //         user_employement_id: userData.user_employement_id || "",
  //         user_gender_id: userData.user_gender_id || "",
  //         education_id: userData.education_id || "",
  //         user_state_id: userData.user_state_id || "",
  //         is_veteran: userData.is_veteran || "",
  //         is_votted_2020: userData.is_votted_2020 || "",
  //         voter_candidate_id: userData.voter_candidate_id || "",
  //         source: userData.source || "",
  //         is_subscription_newsletter: userData.is_subscription_newsletter || "",
  //         user_votter_party: userData.user_votter_party || "",
  //       };

  //       setPayLoad(userData, updatedPayload);

  //     } catch (err) {
  //       console.log("error", err);
  //     }
  //   };

  //   if (jwtToken && payload.id) {
  //     fetchUserData();
  //   }
  // }, [jwtToken,payload.id]);

  useEffect(() => {
    axios
      .get("https://app.thewhitehousegame.com/api/get_user_info", {
        headers: {
          Authorization: `Bearer ${storedToken}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
      .then((res) => {
        setMyAccountData(res?.data?.data);
      })
      .catch((error) => {
        console.log("Error fetching user data:", error);
      });
  }, [storedToken]);
  console.log("myaccount", myAccountData);

  useEffect(() => {
    setPayLoad((prevpayload) => ({
      ...prevpayload,
      language_id:
        byLanguage.find((lang) => lang.name === myAccountData?.language)?.id ||
        "",
      user_age_id:
        AgeGroup.find((age) => age.id === myAccountData?.age)?.id || "",
      user_ethnicity_id: ethnicityData.find(
        (ethnicith) => ethnicith.name === myAccountData?.ethnicity
      )?.id,
      user_country_birth_id:
        CountryBirth.find(
          (country) => country.name === myAccountData?.user_country_birth
        )?.id || "",
      user_employement_id:
        Employment.find(
          (employ) => employ.employement_status === myAccountData?.employment
        )?.id || "",
      user_gender_id: myAccountData?.gender || "",
      education_id:
        highereducation.find((edu) => edu.name === myAccountData?.education)
          ?.id || "",
      user_state_id:
        allstates.find((state) => state.name === myAccountData?.state)?.id ||
        "",
      is_veteran: myAccountData?.is_veteran || "",
      is_votted_2020: myAccountData?.is_votted_2020 || "",
      voter_candidate_id: myAccountData?.voter_candidate_id || "",
      source: myAccountData?.source || "",
      is_subscription_newsletter:
        myAccountData?.is_subscription_newsletter || "",

      user_votter_party: myAccountData?.voter_party_id || "",
    }));
  }, [myAccountData]);
  const handleSaveButtonClick = async () => {
    setIsLoading(true);
    // setPopUP(true);

    try {
      const response = await axios.post(
        "https://app.thewhitehousegame.com/api/update_user_info",
        condition ? newPayload : payload,

        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      if (response.status === 200) {
        setIsLoading(false);
        setPopUP(true);
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error:", error);
      setIsLoading(false);
    }
  };
  // console.log(payload)
  return (
    <>
      <Helmet>
        <title>The White House Game | My Account </title>
        <meta
          name="description"
          content="Access your account on The White House Game to manage your predictions, view your voting history, and update your personal information."
        />
        <meta
          name="keywords"
          content="The White House Game, My Account, manage predictions, voting history, personal information"
        />
      </Helmet>
      {popUp && (
        <div className="popup">
          <div className="w-full h-screen bg-black/60 fixed z-50 top-0 left-0 flex justify-center items-center">
            <div className="popup flex flex-col items-center justify-center  bg-[#1C2452] w-full max-w-md h-auto py-8 px-6 rounded-[30px] sm:w-5/12  relative">
              <div className="text-center mb-6">
                <img className="w-[80px] h-[80px]" src={logo1} alt="" />
              </div>
              <button
                onClick={() =>
                  navigate(data.title2 === "Account" ? "/predict" : "/login")
                }
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
                Your Account is updated successfully!
              </p>
              <div className="flex justify-center items-center mt-8">
                <img className="h-12 w-12 " src={check} alt="" />
              </div>
              <button
                onClick={() =>
                  navigate(data.title2 === "Account" ? "/predict" : "/login")
                }
                className="mt-8 text-white poppins5 bg-redish px-8 py-2 rounded"
              >
                close
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="h-screen">
        <AppBanner
          bannerTitle={data.title2}
          redTitle={data.title}
          bannerDesc={
            <>
              {data.desc}
              <br />
              {data.desc2}
            </>
          }
          bg={bg}
        />
        <div className="bg-[#1c2452] pb-10 mt-[30px] m-auto w-[80%] ">
          <div className="bg-[#1c2452] pb-10 m-auto  ">
            <div className="flex justify-center pt-5">
              <img src={Layer} alt="" />
            </div>
            <div className="flex justify-center pt-3">
              <h2 className="text-white font-poppins text-[15px]">
                Answer as many of these questions as you like
              </h2>
            </div>
            <div className="flex justify-center pt-3 ">
              <h2 className="text-white font-bold font-poppins">
                Your biological sex
              </h2>
            </div>
            <div className="flex justify-center gap-5 pt-3">
              <div className="flex gap-10">
                <div className="inline-flex items-center">
                  <label
                    className="relative flex items-center p-3 rounded-full cursor-pointer"
                    htmlFor="red"
                  >
                    <input
                      name="gender"
                      type="radio"
                      className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-blue-gray-200 text-red-500 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-red-500 checked:before:bg-red-500 hover:before:opacity-10"
                      id="male"
                      value="1"
                      checked={payload.user_gender_id === 1}
                      onChange={(e) =>
                        setPayLoad({
                          ...payload,
                          user_gender_id: parseInt(e.target.value),
                        })
                      }
                    />
                    <span className="absolute text-red-500 transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3.5 w-3.5"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                      >
                        <circle
                          data-name="ellipse"
                          cx="8"
                          cy="8"
                          r="8"
                        ></circle>
                      </svg>
                    </span>
                  </label>
                  <label
                    className="mt-px font-poppins text-white text-[11px] md:text-[14px] cursor-pointer select-none"
                    htmlFor="react"
                  >
                    Male
                  </label>
                </div>
                <div className="inline-flex items-center">
                  <label
                    className="relative flex items-center p-3 rounded-full cursor-pointer"
                    htmlFor="red"
                  >
                    <input
                      name="gender"
                      type="radio"
                      className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-blue-gray-200 text-red-500 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-red-500 checked:before:bg-red-500 hover:before:opacity-10"
                      id="female"
                      value="2"
                      checked={payload.user_gender_id === 2}
                      onChange={(e) =>
                        setPayLoad({
                          ...payload,
                          user_gender_id: parseInt(e.target.value),
                        })
                      }
                    />
                    <span className="absolute text-red-500 transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3.5 w-3.5"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                      >
                        <circle
                          data-name="ellipse"
                          cx="8"
                          cy="8"
                          r="8"
                        ></circle>
                      </svg>
                    </span>
                  </label>
                  <label
                    className="mt-px font-poppins text-white text-[11px] md:text-[14px] cursor-pointer select-none"
                    htmlFor="react"
                  >
                    Female
                  </label>
                </div>
              </div>
            </div>
            <hr className="h-px my-8 bg-[#FFFFFF] opacity-[10%] border-0 dark:bg-white mx-20" />
            <div className="flex justify-center pt-3">
              <h2 className="text-white font-poppins text-[14px] font-bold md:text-[21px]">
                Your age group now
              </h2>
            </div>
            <div className="flex justify-center items-center  pt-3">
              <div className="bg-transparent poppins4 text-[12px] md:text-[14px] border-white border-[1px] w-[28%] px-2 py-2 rounded-[10px] text-whiteColor">
                <select
                  className="bg-transparent w-full outline-none"
                  name="states"
                  id="search"
                  value={payload.user_age_id || myAccountData.age}
                  onChange={(e) =>
                    setPayLoad({
                      ...payload,
                      user_age_id: parseInt(e.target.value),
                    })
                  }
                >
                  <option className="bg-[#000]" value="">
                    {payload.user_age_id
                      ? payload.user_age_id
                      : "Select age group"}
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
            <hr className="h-px my-8 bg-[#FFFFFF] opacity-[10%] border-0 dark:bg-white mx-20" />

            <div className="flex justify-center items-center pt-3">
              <h2 className="text-white text-[14px] font-bold md:text-[16px] font-poppins">
                Are you a US voter?
              </h2>
            </div>
            <div className="flex justify-center gap-5 pt-3">
              <div className="flex gap-10">
                <div className="inline-flex items-center">
                  <label
                    className="relative flex items-center p-3 rounded-full cursor-pointer"
                    htmlFor="red"
                  >
                    <input
                      name="color"
                      type="radio"
                      className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-blue-gray-200 text-red-500 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-red-500 checked:before:bg-red-500 hover:before:opacity-10"
                      id="red"
                      defaultChecked
                    />
                    <span className="absolute text-red-500 transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3.5 w-3.5"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                      >
                        <circle
                          data-name="ellipse"
                          cx="8"
                          cy="8"
                          r="8"
                        ></circle>
                      </svg>
                    </span>
                  </label>
                  <label
                    className="mt-px font-poppins text-white text-[11px] md:text-[14px] cursor-pointer select-none"
                    htmlFor="react"
                  >
                    Yes
                  </label>
                </div>
                <div className="inline-flex items-center">
                  <label
                    className="relative flex items-center p-3 rounded-full cursor-pointer"
                    htmlFor="red"
                  >
                    <input
                      name="color"
                      type="radio"
                      className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-blue-gray-200 text-red-500 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-red-500 checked:before:bg-red-500 hover:before:opacity-10"
                      id="red"
                    />
                    <span className="absolute text-red-500 transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3.5 w-3.5"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                      >
                        <circle
                          data-name="ellipse"
                          cx="8"
                          cy="8"
                          r="8"
                        ></circle>
                      </svg>
                    </span>
                  </label>
                  <label
                    className="mt-px font-poppins text-white text-[11px] md:text-[14px] cursor-pointer select-none"
                    htmlFor="react"
                  >
                    No
                  </label>
                </div>
              </div>
            </div>
            <hr className="h-px my-8 bg-[#FFFFFF] opacity-[10%] border-0 dark:bg-white mx-20" />
            <div className="max-w-[32rem] mx-auto rounded-lg bg-[#131A41] px-10 py-10">
              <div className="flex justify-center items-center ">
                <div className="searchBar flex flex-col w-full">
                  <label
                    htmlFor="search"
                    className="text-whiteColor text-start poppins4 text-[14px]"
                  >
                    Your State
                  </label>
                  <div className="bg-transparent poppins4 text-[12px] md:text-[14px] border-white border-[1px]  px-2 py-2 rounded-[10px] text-whiteColor mt-3">
                    <select
                      name="states"
                      id="search"
                      value={payload.user_state_id || ""}
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
                        <option
                          className="bg-[#000]"
                          key={item.id}
                          value={item.id}
                        >
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
                  <div className="bg-transparent poppins4 text-[12px] md:text-[14px] border-white border-[1px] px-2 py-2 rounded-[10px] text-whiteColor mt-3">
                    <select
                      name="states"
                      id="search"
                      value={payload.user_ethnicity_id || payload.ethnicity}
                      className="bg-transparent outline-none w-full"
                      onChange={(e) =>
                        setPayLoad({
                          ...payload,
                          user_ethnicity_id: parseInt(e.target.value),
                        })
                      }
                    >
                      <option className="bg-[#000]" value="">
                        {payload.ethnicity
                          ? payload.ethnicity
                          : "Select your ethnicity"}
                      </option>
                      {ethnicityData?.map((item) => (
                        <option
                          className="bg-[#000]"
                          key={item.id}
                          value={item.id}
                        >
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
                  <div className="bg-transparent poppins4 text-[12px] md:text-[14px] border-white border-[1px] px-2 py-2 rounded-[10px] text-whiteColor mt-3">
                    <select
                      name="states"
                      id="search"
                      value={
                        payload.user_country_birth_id ||
                        payload.user_country_birth
                      }
                      className="bg-transparent w-full outline-none"
                      onChange={(e) =>
                        setPayLoad({
                          ...payload,
                          user_country_birth_id: parseInt(e.target.value),
                        })
                      }
                    >
                      <option className="bg-[#000]" value="">
                        {payload.user_country_birth
                          ? payload.user_country_birth
                          : "Select  your country of birth"}
                      </option>

                      {CountryBirth?.map((item) => (
                        <option
                          className="bg-[#000]"
                          key={item.id}
                          value={item.id}
                        >
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
                  <div className="bg-transparent poppins4 text-[12px] md:text-[14px] border-white border-[1px] px-2 py-2 rounded-[10px] text-whiteColor mt-3">
                    <select
                      name="states"
                      id="search"
                      value={payload.language_id || payload.language}
                      className="bg-transparent w-full outline-none"
                      onChange={(e) =>
                        setPayLoad({
                          ...payload,
                          language_id: parseInt(e.target.value),
                        })
                      }
                    >
                      <option className="bg-[#000]" value="">
                        {payload.language
                          ? payload.language
                          : "Select your language"}
                      </option>
                      {byLanguage?.map((item) => (
                        <option
                          className="bg-[#000]"
                          key={item.id}
                          value={item.id}
                        >
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
                  <div className="bg-transparent poppins4 text-[12px] md:text-[14px] border-white border-[1px] px-2 py-2 rounded-[10px] text-whiteColor mt-3">
                    <select
                      name="states"
                      id="search"
                      value={payload.user_employement_id || payload.employment}
                      className="bg-transparent w-full outline-none"
                      onChange={(e) =>
                        setPayLoad({
                          ...payload,
                          user_employement_id: parseInt(e.target.value),
                        })
                      }
                    >
                      <option className="bg-[#000]" value="">
                        {payload.employment
                          ? payload.employment
                          : "Select best description"}
                      </option>
                      {Employment?.map((item) => (
                        <option
                          className="bg-[#000]"
                          key={item.id}
                          value={item.id}
                        >
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
                  <div className="bg-transparent poppins4 text-[12px] md:text-[14px] border-white border-[1px] px-2 py-2 rounded-[10px] text-whiteColor mt-3">
                    <select
                      name="states"
                      id="search"
                      value={payload.education_id || payload.education}
                      className="bg-transparent w-full outline-none"
                      onChange={(e) =>
                        setPayLoad({
                          ...payload,
                          education_id: parseInt(e.target.value),
                        })
                      }
                    >
                      <option className="bg-[#000]" value="">
                        {payload.education
                          ? payload.education
                          : "Select best description"}
                      </option>
                      {highereducation?.map((item) => (
                        <option
                          className="bg-[#000]"
                          key={item.id}
                          value={item.id}
                        >
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
              <div className="flex gap-10">
                <div className="inline-flex items-center">
                  <label
                    className="relative flex items-center p-3 rounded-full cursor-pointer"
                    htmlFor="red"
                  >
                    <input
                      name="veteran"
                      type="radio"
                      className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-blue-gray-200 text-red-500 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-red-500 checked:before:bg-red-500 hover:before:opacity-10"
                      id="veteran"
                      value="yes"
                      checked={payload.is_veteran === "yes"}
                      onChange={(e) =>
                        setPayLoad({
                          ...payload,
                          is_veteran: e.target.value,
                        })
                      }
                    />
                    <span className="absolute text-red-500 transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3.5 w-3.5"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                      >
                        <circle
                          data-name="ellipse"
                          cx="8"
                          cy="8"
                          r="8"
                        ></circle>
                      </svg>
                    </span>
                  </label>
                  <label
                    className="mt-px font-poppins text-white text-[11px] md:text-[14px] cursor-pointer select-none"
                    htmlFor="react"
                  >
                    Yes
                  </label>
                </div>
                <div className="inline-flex items-center">
                  <label
                    className="relative flex items-center p-3 rounded-full cursor-pointer"
                    htmlFor="red"
                  >
                    <input
                      name="veteran"
                      type="radio"
                      className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-blue-gray-200 text-red-500 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-red-500 checked:before:bg-red-500 hover:before:opacity-10"
                      id="veteran"
                      value="no"
                      checked={payload.is_veteran === "no"}
                      onChange={(e) =>
                        setPayLoad({
                          ...payload,
                          is_veteran: e.target.value,
                        })
                      }
                    />
                    <span className="absolute text-red-500 transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3.5 w-3.5"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                      >
                        <circle
                          data-name="ellipse"
                          cx="8"
                          cy="8"
                          r="8"
                        ></circle>
                      </svg>
                    </span>
                  </label>
                  <label
                    className="mt-px font-poppins text-white text-[11px] md:text-[14px] cursor-pointer select-none"
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
              <div className="flex gap-10">
                <div className="inline-flex items-center">
                  <label
                    className="relative flex items-center p-3 rounded-full cursor-pointer"
                    htmlFor="red"
                  >
                    <input
                      name="voted2020"
                      type="radio"
                      className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-blue-gray-200 text-red-500 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-red-500 checked:before:bg-red-500 hover:before:opacity-10"
                      id="red"
                      value="yes"
                      checked={payload.is_votted_2020 === "yes"}
                      onChange={(e) =>
                        setPayLoad({
                          ...payload,
                          is_votted_2020: e.target.value,
                        })
                      }
                    />
                    <span className="absolute text-red-500 transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3.5 w-3.5"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                      >
                        <circle
                          data-name="ellipse"
                          cx="8"
                          cy="8"
                          r="8"
                        ></circle>
                      </svg>
                    </span>
                  </label>
                  <label
                    className="mt-px font-poppins text-white text-[11px] md:text-[14px] cursor-pointer select-none"
                    htmlFor="react"
                  >
                    Yes
                  </label>
                </div>
                <div className="inline-flex items-center">
                  <label
                    className="relative flex items-center p-3 rounded-full cursor-pointer"
                    htmlFor="red"
                  >
                    <input
                      name="voted2020"
                      type="radio"
                      className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-blue-gray-200 text-red-500 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-red-500 checked:before:bg-red-500 hover:before:opacity-10"
                      id="no"
                      value="no"
                      checked={payload.is_votted_2020 === "no"}
                      onChange={(e) =>
                        setPayLoad({
                          ...payload,
                          is_votted_2020: e.target.value,
                        })
                      }
                    />
                    <span className="absolute text-red-500 transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3.5 w-3.5"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                      >
                        <circle
                          data-name="ellipse"
                          cx="8"
                          cy="8"
                          r="8"
                        ></circle>
                      </svg>
                    </span>
                  </label>
                  <label
                    className="mt-px font-poppins text-white text-[11px] md:text-[14px] cursor-pointer select-none"
                    htmlFor="react"
                  >
                    No
                  </label>
                </div>
              </div>
            </div>
            {payload.is_votted_2020 === "yes" && (
              <>
                <hr className="h-px my-8 bg-[#FFFFFF] opacity-[10%] border-0 dark:bg-white mx-20" />

                <div className="flex justify-center items-center mt-10">
                  <h2 className="font-poppins text-white text-[14px] md:text-[18px] font-bold">
                    Who did you vote for in 2020
                  </h2>
                </div>

                <div className="flex justify-center gap-5 pt-3">
                  <div className="flex gap-10">
                    <div className="inline-flex items-center">
                      <label
                        className="relative flex items-center p-3 rounded-full cursor-pointer"
                        htmlFor="red"
                      >
                        <input
                          name="candidate"
                          type="radio"
                          className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-blue-gray-200 text-red-500 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-red-500 checked:before:bg-red-500 hover:before:opacity-10"
                          id="Biden/Harris"
                          value="1"
                          checked={payload.voter_candidate_id === 1}
                          onChange={(e) =>
                            setPayLoad({
                              ...payload,
                              voter_candidate_id: parseInt(e.target.value),
                            })
                          }
                        />
                        <span className="absolute text-red-500 transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-3.5 w-3.5"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                          >
                            <circle
                              data-name="ellipse"
                              cx="8"
                              cy="8"
                              r="8"
                            ></circle>
                          </svg>
                        </span>
                      </label>
                      <label
                        className="mt-px font-poppins text-white text-[11px] md:text-[14px] cursor-pointer select-none"
                        htmlFor="react"
                      >
                        Biden/Harris
                      </label>
                    </div>
                    <div className="inline-flex items-center">
                      <label
                        className="relative flex items-center p-3 rounded-full cursor-pointer"
                        htmlFor="red"
                      >
                        <input
                          name="candidate"
                          type="radio"
                          className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-blue-gray-200 text-red-500 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-red-500 checked:before:bg-red-500 hover:before:opacity-10"
                          id="Trump/Pense"
                          value="2"
                          checked={payload.voter_candidate_id === 2}
                          onChange={(e) =>
                            setPayLoad({
                              ...payload,
                              voter_candidate_id: parseInt(e.target.value),
                            })
                          }
                        />
                        <span className="absolute text-red-500 transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-3.5 w-3.5"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                          >
                            <circle
                              data-name="ellipse"
                              cx="8"
                              cy="8"
                              r="8"
                            ></circle>
                          </svg>
                        </span>
                      </label>
                      <label
                        className="mt-px font-poppins text-white text-[11px] md:text-[14px] cursor-pointer select-none"
                        htmlFor="react"
                      >
                        Trump/Pense
                      </label>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center gap-5 pt-3">
                  <div className="flex gap-10">
                    <div className="inline-flex items-center">
                      <label
                        className="relative flex items-center p-3 rounded-full cursor-pointer"
                        htmlFor="red"
                      >
                        <input
                          name="candidate"
                          type="radio"
                          className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-blue-gray-200 text-red-500 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-red-500 checked:before:bg-red-500 hover:before:opacity-10"
                          id="Other"
                          value="3"
                          checked={payload.voter_candidate_id === 3}
                          onChange={(e) =>
                            setPayLoad({
                              ...payload,
                              voter_candidate_id: parseInt(e.target.value),
                            })
                          }
                        />
                        <span className="absolute text-red-500 transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-3.5 w-3.5"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                          >
                            <circle
                              data-name="ellipse"
                              cx="8"
                              cy="8"
                              r="8"
                            ></circle>
                          </svg>
                        </span>
                      </label>
                      <label
                        className="mt-px font-poppins text-white text-[11px] md:text-[14px] cursor-pointer select-none"
                        htmlFor="react"
                      >
                        Other
                      </label>
                    </div>
                  </div>
                </div>
                <hr className="h-px my-8 bg-[#FFFFFF] opacity-[10%] border-0 dark:bg-white mx-20" />

                <div className="flex justify-center items-center mt-10">
                  <h2 className="font-poppins text-white font-bold text-[14px] md:text-[18px]">
                    How did you cast your vote in 2020?
                  </h2>
                </div>

                <div className="flex justify-center gap-5 pt-3">
                  <div className="flex flex-col gap-2">
                    <div className="inline-flex items-center">
                      <label
                        className="relative flex items-center p-3 rounded-full cursor-pointer"
                        htmlFor="polling"
                      >
                        <input
                          name="source"
                          type="radio"
                          className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-blue-gray-200 text-red-500 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-red-500 checked:before:bg-red-500 hover:before:opacity-10"
                          id="polling"
                          // value="polling"
                          // value={payload.source || "polling"}
                          value="polling"
                          checked={payload.source === "polling"}
                          onChange={(e) =>
                            setPayLoad({ ...payload, source: e.target.value })
                          }
                        />
                        <span className="absolute text-red-500 transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-3.5 w-3.5"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                          >
                            <circle
                              data-name="ellipse"
                              cx="8"
                              cy="8"
                              r="8"
                            ></circle>
                          </svg>
                        </span>
                      </label>
                      <label
                        className="mt-px font-poppins text-white text-[11px] md:text-[14px] cursor-pointer select-none"
                        htmlFor="react"
                      >
                        At a polling station on election day
                      </label>
                    </div>
                    <div className="inline-flex items-center">
                      <label
                        className="relative flex items-center p-3 rounded-full cursor-pointer"
                        htmlFor="mail"
                      >
                        <input
                          name="source"
                          type="radio"
                          className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-blue-gray-200 text-red-500 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-red-500 checked:before:bg-red-500 hover:before:opacity-10"
                          id="mail"
                          // value="mail"
                          // value={payload.source || "mail"}
                          value="mail"
                          checked={payload.source === "mail"}
                          onChange={(e) =>
                            setPayLoad({ ...payload, source: e.target.value })
                          }
                        />
                        <span className="absolute text-red-500 transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-3.5 w-3.5"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                          >
                            <circle
                              data-name="ellipse"
                              cx="8"
                              cy="8"
                              r="8"
                            ></circle>
                          </svg>
                        </span>
                      </label>
                      <label
                        className="mt-px font-poppins text-white text-[11px] md:text-[14px] cursor-pointer select-none"
                        htmlFor="react"
                      >
                        Mail-in ballot or use a drop-box
                      </label>
                    </div>
                  </div>
                </div>
                <hr className="h-px my-8 bg-[#FFFFFF] opacity-[10%] border-0 dark:bg-white mx-20" />
              </>
            )}

            <div className="flex justify-center items-center mt-10 ">
              <h2 className="font-poppins text-white font-bold  text-[14px] md:text-[18px] w-[345px] text-center">
                Which party’s candidate would you vote for today?
              </h2>
            </div>

            <div className="flex justify-center gap-5 pt-3">
              <div className="flex gap-10">
                <div className="inline-flex items-center">
                  <label
                    className="relative flex items-center p-3 rounded-full cursor-pointer"
                    htmlFor="red"
                  >
                    <input
                      name="party"
                      type="radio"
                      className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-blue-gray-200 text-red-500 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-red-500 checked:before:bg-red-500 hover:before:opacity-10"
                      id="Democratic"
                      value="1"
                      checked={payload.user_votter_party === 1}
                      onChange={(e) =>
                        setPayLoad({
                          ...payload,
                          user_votter_party: parseInt(e.target.value),
                        })
                      }
                    />
                    <span className="absolute text-red-500 transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3.5 w-3.5"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                      >
                        <circle
                          data-name="ellipse"
                          cx="8"
                          cy="8"
                          r="8"
                        ></circle>
                      </svg>
                    </span>
                  </label>
                  <label
                    className="mt-px font-poppins text-white text-[11px] md:text-[14px] cursor-pointer select-none"
                    htmlFor="react"
                  >
                    Democratic
                  </label>
                </div>
                <div className="inline-flex items-center">
                  <label
                    className="relative flex items-center p-3 rounded-full cursor-pointer"
                    htmlFor="red"
                  >
                    <input
                      name="party"
                      type="radio"
                      className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-blue-gray-200 text-red-500 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-red-500 checked:before:bg-red-500 hover:before:opacity-10"
                      id="Republican"
                      value="2"
                      checked={payload.user_votter_party === 2}
                      onChange={(e) =>
                        setPayLoad({
                          ...payload,
                          user_votter_party: parseInt(e.target.value),
                        })
                      }
                    />
                    <span className="absolute text-red-500 transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3.5 w-3.5"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                      >
                        <circle
                          data-name="ellipse"
                          cx="8"
                          cy="8"
                          r="8"
                        ></circle>
                      </svg>
                    </span>
                  </label>
                  <label
                    className="mt-px font-poppins text-white text-[11px] md:text-[14px] cursor-pointer select-none"
                    htmlFor="react"
                  >
                    Republican
                  </label>
                </div>
              </div>
            </div>

            <div className="flex justify-center gap-5 pt-3">
              <div className="flex gap-10">
                <div className="inline-flex items-center">
                  <label
                    className="relative flex items-center p-3 rounded-full cursor-pointer"
                    htmlFor="red"
                  >
                    <input
                      name="party"
                      type="radio"
                      className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-blue-gray-200 text-red-500 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-red-500 checked:before:bg-red-500 hover:before:opacity-10"
                      id="Independent"
                      value="3"
                      checked={payload.user_votter_party === 3}
                      onChange={(e) =>
                        setPayLoad({
                          ...payload,
                          user_votter_party: parseInt(e.target.value),
                        })
                      }
                    />
                    <span className="absolute text-red-500 transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3.5 w-3.5"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                      >
                        <circle
                          data-name="ellipse"
                          cx="8"
                          cy="8"
                          r="8"
                        ></circle>
                      </svg>
                    </span>
                  </label>
                  <label
                    className="mt-px font-poppins text-white text-[11px] md:text-[14px] cursor-pointer select-none"
                    htmlFor="react"
                  >
                    Independent (Kennedy)
                  </label>
                </div>
                <div className="inline-flex items-center">
                  <label
                    className="relative flex items-center p-3 rounded-full cursor-pointer"
                    htmlFor="red"
                  >
                    <input
                      name="party"
                      type="radio"
                      className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-blue-gray-200 text-red-500 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-red-500 checked:before:bg-red-500 hover:before:opacity-10"
                      id="Other"
                      value="4"
                      checked={payload.user_votter_party === 4}
                      onChange={(e) =>
                        setPayLoad({
                          ...payload,
                          user_votter_party: parseInt(e.target.value),
                        })
                      }
                    />
                    <span className="absolute text-red-500 transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3.5 w-3.5"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                      >
                        <circle
                          data-name="ellipse"
                          cx="8"
                          cy="8"
                          r="8"
                        ></circle>
                      </svg>
                    </span>
                  </label>
                  <label
                    className="mt-px font-poppins text-white text-[11px] md:text-[14px] cursor-pointer select-none"
                    htmlFor="react"
                  >
                    Other
                  </label>
                </div>
              </div>
            </div>
            <hr className="h-px my-8 bg-[#FFFFFF] opacity-[10%] border-0 dark:bg-white mx-20" />

            <div className="flex justify-center items-center mt-10">
              <h2 className="font-poppins text-white font-bold text-[14px] md:text-[18px]">
                Keep me Informed
              </h2>
            </div>

            <div className="flex justify-center gap-5 pt-3">
              <div className="flex gap-10">
                <div className="inline-flex items-center">
                  <label
                    className="relative flex items-center p-3 rounded-full cursor-pointer"
                    htmlFor="subscribe"
                  >
                    <input
                      name="newsletter"
                      type="radio"
                      className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-blue-gray-200 text-red-500 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-red-500 checked:before:bg-red-500 hover:before:opacity-10"
                      id="subscribe"
                      value="yes"
                      checked={payload.is_subscription_newsletter === "yes"}
                      onChange={handleSubscriptionChange}
                    />
                    <span className="absolute text-red-500 transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3.5 w-3.5"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                      >
                        <circle
                          data-name="ellipse"
                          cx="8"
                          cy="8"
                          r="8"
                        ></circle>
                      </svg>
                    </span>
                  </label>
                  <label
                    className="mt-px font-poppins text-white text-nowrap text-[11px] md:text-[14px] cursor-pointer select-none"
                    htmlFor="react"
                  >
                    Join our White House News newsletter
                  </label>
                </div>
              </div>
            </div>
            <hr className="h-px my-8 bg-[#FFFFFF] opacity-[10%] border-0 dark:bg-white mx-20" />
            <div className="flex justify-center mt-5 ">
              {isLoading ? (
                <CustomSpinner />
              ) : (
                <button
                  onClick={handleSaveButtonClick}
                  className="rounded-lg px-5 py-3 bg-red-500 w-[380px] h-[50px] text-white font-poppins"
                >
                  Save
                </button>
              )}
            </div>
            <div className="mt-7">
              <h2 className="text-center font-poppins text-white text-[14px] md:text-[18px] ">
                Would you like to see what others think?
              </h2>
              <h2
                onClick={() => navigate("/")}
                className="mt-5 text-center font-poppins text-white text-[14px] md:text-[18px] font-bold cursor-pointer hover:underline"
              >
                View our Stats
              </h2>
            </div>
          </div>
        </div>
        <DownloadApp />
      </div>
    </>
  );
};
