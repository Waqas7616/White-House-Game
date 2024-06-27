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

export const PutData = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state?.data;
  const [AgeGroup, setAgeGroup] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [myAccountData, setMyAccountData] = useState([]);
  useEffect(() => {
    axios
      .get("https://thewhitehousegame.com/api/public/api/get_user_age")
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
      .get("https://thewhitehousegame.com/api/public/api/get_user_state")
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
      .get("https://thewhitehousegame.com/api/public/api/get_user_ethnicty")
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
        "https://thewhitehousegame.com/api/public/api/get_all_user_country_birth"
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
      .get("https://thewhitehousegame.com/api/public/api/get_all_language")
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
        "https://thewhitehousegame.com/api/public/api/get_all_user_employement"
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
      .get("https://thewhitehousegame.com/api/public/api/get_all_education")
      .then((response) => {
        setHigherEducation(response.data.education);
      })
      .catch((error) => {
        console.log("Error in education api", error);
      });
  }, []);

  const [jwtToken, setJwtToken] = useState("");

  useEffect(() => {
    const storedToken = secureLocalStorage.getItem("token");
    if (storedToken) {
      setJwtToken(storedToken);
    } else {
    }
  }, []);
  const email = secureLocalStorage.getItem("email");
  let id = secureLocalStorage.getItem("id");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [votedIn2020, setVotedIn2020] = useState("No");
  const [condition, setCondition] = useState(false);
  const [newPayload, setNewPayload] = useState(null);
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
    is_subscription_newsletter: "No",

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

  useEffect(() => {
    let adjustedPayload = { ...payload };

    if (adjustedPayload.is_votted_2020 === "No") {
      delete adjustedPayload.voter_candidate_id;
      delete adjustedPayload.source;
      setCondition(true);
      setNewPayload(adjustedPayload);
    }
  }, [payload, newPayload]);

  const handleSaveButtonClick = async () => {
    setIsLoading(true);

    try {
      const response = await axios.post(
        "https://thewhitehousegame.com/api/public/api/update_user_info",
        condition ? newPayload : payload,

        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      if (response.status === 200) {
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }

      navigate("/login");
    } catch (error) {
      console.error("Error:", error);
      setIsLoading(false);
    }
  };
  // useEffect(() => {
  //   axios
  //     .get(
  //       `https://thewhitehousegame.com/public/api/get_user_info/${payload.id}`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${jwtToken}`,
  //           "Content-Type": "application/json",
  //           Accept: "application/json",
  //         },
  //       }
  //     )
  //     .then((res) => {
  //       setMyAccountData(res.data);
  //     })
  //     .catch((err) => console.log("error", err));
  // }, [jwtToken]);
  // console.log("iiiiiiiiiiiiiiiiiiiiiiii", myAccountData);

  //   useEffect(() => {
  //     const fetchUserData = async () => {
  //         try {
  //             const response = await axios.get(
  //                 `https://thewhitehousegame.com/public/api/get_user_info/${payload.id}`,
  //                 {
  //                     headers: {
  //                         Authorization: `Bearer ${jwtToken}`,
  //                         "Content-Type": "application/json",
  //                         Accept: "application/json",
  //                     },
  //                 }
  //             );
  //             setMyAccountData(response.data);
  //             // User ki information ko payload mein set karna
  //             setPayLoad({
  //                 ...payload,
  //                 language_id: response.data.language_id,
  //                 user_age_id: response.data.user_age_id,
  //                 user_ethnicity_id: response.data.user_ethnicity_id,
  //                 user_country_birth_id: response.data.user_country_birth_id,
  //                 user_employement_id: response.data.user_employement_id,
  //                 user_gender_id: response.data.user_gender_id,
  //                 education_id: response.data.education_id,
  //                 user_state_id: response.data.user_state_id,
  //                 is_veteran: response.data.is_veteran,
  //                 is_votted_2020: response.data.is_votted_2020,
  //                 voter_candidate_id: response.data.voter_candidate_id,
  //                 source: response.data.source,
  //                 is_subscription_newsletter: response.data.is_subscription_newsletter,
  //                 user_votter_party: response.data.user_votter_party,
  //             });
  //         } catch (err) {
  //             console.log("error", err);
  //         }
  //     };

  //     if (jwtToken) {
  //         fetchUserData();
  //     }
  // }, [jwtToken]);

  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     try {
  //       const response = await axios.get(
  //         `https://thewhitehousegame.com/public/api/get_user_info/${payload.id}`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${jwtToken}`,
  //             "Content-Type": "application/json",
  //             Accept: "application/json",
  //           },
  //         }
  //       );
  //       setMyAccountData(response.data.data);
  //       console.log("data of account:",response)
  //       // User ki information ko payload mein set karna
  //       setPayLoad({
  //         ...payload,
  //         language_id: response.data.data.language_id,
  //         user_age_id: response.data.data.user_age_id,
  //         user_ethnicity_id: response.data.data.user_ethnicity_id,
  //         user_country_birth_id: response.data.data.user_country_birth_id,
  //         user_employement_id: response.data.data.user_employement_id,
  //         user_gender_id: response.data.data.user_gender_id,
  //         education_id: response.data.data.education_id,
  //         user_state_id: response.data.data.user_state_id,
  //         is_veteran: response.data.data.is_veteran,
  //         is_votted_2020: response.data.data.is_votted_2020,
  //         voter_candidate_id: response.data.data.voter_candidate_id,
  //         source: response.data.data.source,
  //         is_subscription_newsletter: response.data.is_subscription_newsletter,
  //         user_votter_party: response.data.data.user_votter_party,
  //       });
  //     } catch (err) {
  //       console.log("error", err);
  //     }
  //   };

  //   if (jwtToken && payload.id) {
  //     fetchUserData();
  //   }
  //   console.log("data histay:", payload)

  // }, [jwtToken, payload.id]);

  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     try {
  //       const response = await axios.get(
  //         `https://thewhitehousegame.com/public/api/get_user_info/${payload.id}`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${jwtToken}`,
  //             "Content-Type": "application/json",
  //             Accept: "application/json",
  //           },
  //         }
  //       );
  //       setMyAccountData(response.data.data);
  //       console.log("data of account:", response.data.data);

  //       setPayLoad((prevPayload) => ({
  //         ...prevPayload,
  //         language_id: response.data.data.language_id,
  //         user_age_id: response.data.data.user_age_id,
  //         user_ethnicity_id: response.data.data.user_ethnicity_id,
  //         user_country_birth_id: response.data.data.user_country_birth_id,
  //         user_employement_id: response.data.data.user_employement_id,
  //         user_gender_id: response.data.data.user_gender_id,
  //         education_id: response.data.data.education_id,
  //         user_state_id: response.data.data.user_state_id,
  //         is_veteran: response.data.data.is_veteran,
  //         is_votted_2020: response.data.data.is_votted_2020,
  //         voter_candidate_id: response.data.data.voter_candidate_id,
  //         source: response.data.data.source,
  //         is_subscription_newsletter: response.data.data.is_subscription_newsletter,
  //         user_votter_party: response.data.data.user_votter_party,
  //       }));

  //     } catch (err) {
  //       console.log("error", err);
  //     }
  //   };

  //   if (jwtToken && payload.id) {
  //     fetchUserData();
  //   }

  //   console.log("data histay:", payload)
  // }, [jwtToken, payload.id]);

  //   useEffect(() => {
  //     const fetchUserData = async () => {
  //       try {
  //         const response = await axios.get(
  //           `https://thewhitehousegame.com/public/api/get_user_info/${payload.id}`,
  //           {
  //             headers: {
  //               Authorization: `Bearer ${jwtToken}`,
  //               "Content-Type": "application/json",
  //               Accept: "application/json",
  //             },
  //           }
  //         );
  //         console.log("Response data:", response.data.data);

  //         // Ensure data consistency
  //         const userData = response.data;

  //         setMyAccountData(userData);
  //         // User ki information ko payload mein set karna
  //         setPayLoad({
  //           ...payload,
  //           language_id: userData.language_id || '',
  //           user_age_id: userData.user_age_id || '',
  //           user_ethnicity_id: userData.user_ethnicity_id || '',
  //           user_country_birth_id: userData.user_country_birth_id || '',
  //           user_employement_id: userData.user_employement_id || '',
  //           user_gender_id: userData.user_gender_id || '',
  //           education_id: userData.education_id || '',
  //           user_state_id: userData.user_state_id || '',
  //           is_veteran: userData.is_veteran || '',
  //           is_votted_2020: userData.is_votted_2020 || '',
  //           voter_candidate_id: userData.voter_candidate_id || '',
  //           source: userData.source || '',
  //           is_subscription_newsletter: userData.is_subscription_newsletter || '',
  //           user_votter_party: userData.user_votter_party || ''
  //         });

  //         console.log("Updated payload:", payload);

  //       } catch (err) {
  //         console.log("error", err);
  //       }
  //     };

  //     if (jwtToken && payload.id) {
  //       fetchUserData();
  //     }
  //   }, [jwtToken, payload.id]);

  // useEffect(() => {
  //   console.log("Payload dataone:", payload);
  // }, [payload]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `https://thewhitehousegame.com/api/public/api/get_user_info/${payload.id}`,
          {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        );

        // Ensure data consistency
        const userData = response.data.data;

        setMyAccountData(userData);
        // User ki information ko payload mein set karna
        const updatedPayload = {
          ...payload,
          language_id: userData.language_id || "",
          user_age_id: userData.user_age_id || "",
          user_ethnicity_id: userData.user_ethnicity_id || "",
          user_country_birth_id: userData.user_country_birth_id || "",
          user_employement_id: userData.user_employement_id || "",
          user_gender_id: userData.user_gender_id || "",
          education_id: userData.education_id || "",
          user_state_id: userData.user_state_id || "",
          is_veteran: userData.is_veteran || "",
          is_votted_2020: userData.is_votted_2020 || "",
          voter_candidate_id: userData.voter_candidate_id || "",
          source: userData.source || "",
          is_subscription_newsletter: userData.is_subscription_newsletter || "",
          user_votter_party: userData.user_votter_party || "",
        };

        setPayLoad(userData, updatedPayload);
      } catch (err) {
        console.log("error", err);
      }
    };

    if (jwtToken && payload.id) {
      fetchUserData();
    }
  }, [jwtToken, payload.id]);

  // Payload update hone par logging
  // useEffect(() => {
  // }, [payload]);

  return (
    <>
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
            {/* <div className="flex justify-center pt-5 ">
          <h2 className="text-white text-[23px] font-poppins">
            Forgot Password
          </h2>
        </div> */}
            {/* <div className="flex justify-center pt-5">
              <img src={logo1} alt="" />
            </div> */}
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
                      // value="1"
                      // value={payload.language_id}
                      // value={payload.user_gender_id || "1"}
                      value="1"
                      checked={
                        payload.user_gender_id === "1" ||
                        payload.gender === "Male"
                      }
                      onChange={(e) =>
                        setPayLoad({
                          ...payload,
                          user_gender_id: e.target.value,
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
                      // value="2"
                      // value={payload.language_id}
                      // value={payload.user_gender_id || "2"}
                      value="2"
                      checked={
                        payload.user_gender_id === "2" ||
                        payload.gender === "Female"
                      }
                      onChange={(e) =>
                        setPayLoad({
                          ...payload,
                          user_gender_id: e.target.value,
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
                  value={payload.user_age_id || payload.age}
                  onChange={(e) =>
                    setPayLoad({
                      ...payload,
                      user_age_id: parseInt(e.target.value),
                    })
                  }
                >
                  <option className="bg-[#000]" value="">
                    {payload.age ? payload.age : "Select your age group"}
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
                      value={payload.user_state_id || payload.state}
                      className="bg-transparent outline-none w-full"
                      onChange={(e) =>
                        setPayLoad({
                          ...payload,
                          user_state_id: parseInt(e.target.value),
                        })
                      }
                    >
                      <option className="bg-[#000]" value="">
                        {payload.state ? payload.state : "Where you live"}
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
                      // value="yes"
                      // value={payload.is_veteran || "yes"}
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
                      // value="No"
                      // value={payload.is_veteran || "No"}
                      value="No"
                      checked={payload.is_veteran === "No"}
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
                      // value="yes"
                      // value={payload.is_votted_2020 || "yes"}
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
                      id="No"
                      // value="No"
                      // value={payload.is_votted_2020 || "No"}
                      value="No"
                      checked={payload.is_votted_2020 === "No"}
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
                          id="bidenHarris"
                          // value="1"
                          // value={payload.voter_candidate_id || "1"}
                          value="1"
                          checked={payload.voter_candidate_id === "1"}
                          onChange={(e) =>
                            setPayLoad({
                              ...payload,
                              voter_candidate_id: e.target.value,
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
                          // value="2"
                          // value={payload.voter_candidate_id || "2"}
                          value="2"
                          checked={payload.voter_candidate_id === "2"}
                          onChange={(e) =>
                            setPayLoad({
                              ...payload,
                              voter_candidate_id: e.target.value,
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
                          // value="3"
                          // value={payload.voter_candidate_id || "3"}
                          value="3"
                          checked={payload.voter_candidate_id === "3"}
                          onChange={(e) =>
                            setPayLoad({
                              ...payload,
                              voter_candidate_id: e.target.value,
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
                      // value="1"
                      // value={payload.user_votter_party || "1"}
                      value="1"
                      checked={payload.user_votter_party === "1"}
                      onChange={(e) =>
                        setPayLoad({
                          ...payload,
                          user_votter_party: e.target.value,
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
                      // value="2"
                      // value={payload.user_votter_party || "2"}
                      value="2"
                      checked={payload.user_votter_party === "2"}
                      onChange={(e) =>
                        setPayLoad({
                          ...payload,
                          user_votter_party: e.target.value,
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
                      // value="3"
                      // value={payload.user_votter_party || "3"}
                      value="3"
                      checked={payload.user_votter_party === "3"}
                      onChange={(e) =>
                        setPayLoad({
                          ...payload,
                          user_votter_party: e.target.value,
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
                      // value="4"
                      // value={payload.user_votter_party || "4"}
                      value="4"
                      checked={payload.user_votter_party === "4"}
                      onChange={(e) =>
                        setPayLoad({
                          ...payload,
                          user_votter_party: e.target.value,
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
                      checked={isSubscribed}
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
              <h2 className="mt-5 text-center font-poppins text-white text-[14px] md:text-[18px] font-bold">
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
