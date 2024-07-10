import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../pages/Homepage";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Prediction from "../pages/Prediction";

import { LogIn } from "./login/LogIn";
import { SignUp } from "./signup/SignUp";
import { ForgotPassword } from "./forgotpassword/ForgotPassword";
import { ResetPassword } from "./resetpassword/ResetPassword";
import EmailVerification from "./emailverification/EmailVerification";
import { ForgotModal } from "./forgotmodal/ForgotModal";
import { PutData } from "./putdata/PutData";
import ElectoralCollege from "../pages/ElectoralCollege";
import PartyPrediction from "../pages/PartyPrediction";
import { Navigate } from "react-router-dom";
import StateWinner from "./statewinner/StateWinner";
import Candidate from "./candidate/Candidate";
import TermsCondition from "../pages/TermsCondition";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import MyVote from "../pages/MyVote";
import PredictionAndElectoral from "../pages/PredictionAndElectoral";
import CustomSpinner from "./spinner";
import PaymentPage from "../pages/payment/Payment";
import securesecureLocalStorage from "react-secure-storage";
import ScrollTop from "./scrolltop/ScrollTop";
import SiteMap from "./SiteMap";
import OtpMatch from "./otpmatch/OtpMatch";
import axios from "axios";
// import { useNavigate } from 'react-router-dom';

const useAxiosInterceptor = (Navigate) => {
  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 401) {
          securesecureLocalStorage.removeItem("token");
          securesecureLocalStorage.removeItem("email");
          Navigate("/login");
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, [Navigate]);
};

function AppRoutes() {
  const [user, setUser] = useState();
  const [localToken, setLocalToken] = useState();
  const [loading, setLoading] = useState(true);

  useAxiosInterceptor(Navigate);

  useEffect(() => {
    const user = securesecureLocalStorage.getItem("email");
    const tokens = securesecureLocalStorage.getItem("token");
    setLoading(false);
    setUser(user);
    setLocalToken(tokens);
  }, [loading, localToken, user]);

  if (loading) {
    return (
      <div className="text-white h-screen w-[100vw] flex justify-center items-center text-[50px]">
        <CustomSpinner />
      </div>
    );
  }
  return (
    <Router>
      <ScrollTop />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route
          path="/predict"
          element={
            localToken || user ? <Prediction /> : <Navigate to="/login" />
          }
        />

        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/emailverification" element={<EmailVerification />} />
        <Route path="/forgotmodal" element={<ForgotModal />} />
        <Route
          path="/putdata"
          element={localToken || user ? <PutData /> : <Navigate to="/" />}
        />
        <Route
          path="/electoral"
          element={
            localToken || user ? <ElectoralCollege /> : <Navigate to="/login" />
          }
        />

        <Route
          path="/party-prediction"
          element={
            localToken || user ? <PartyPrediction /> : <Navigate to="/" />
          }
        />
        <Route path="/statewinner" element={<StateWinner />} />
        <Route path="/candidate" element={<Candidate />} />
        <Route path="/forgetmodal" element={<ForgotModal />} />
        <Route path="/termscondition" element={<TermsCondition />} />
        <Route path="/privacypolicy" element={<PrivacyPolicy />} />
        <Route
          path="/payment"
          element={localToken || user ? <PaymentPage /> : <Navigate to="/" />}
        />
        <Route
          path="/myvote"
          element={localToken || user ? <MyVote /> : <Navigate to="/" />}
        />
        <Route
          path="/predictandelectoral"
          element={
            localToken || user ? (
              <PredictionAndElectoral />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="/sitemap" element={<SiteMap />} />
        <Route path="/otpmatch" element={<OtpMatch />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
