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

function AppRoutes() {
  const [user, setUser] = useState();
  const [localToken, setLocalToken] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const user = localStorage.getItem("email");
    const tokens = localStorage.getItem("token");
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
        <Route path="/putdata" element={<PutData />} />
        <Route
          path="/electoral"
          element={
            localToken || user ? <ElectoralCollege /> : <Navigate to="/login" />
          }
        />

        <Route path="/party-prediction" element={<PartyPrediction />} />
        <Route path="/statewinner" element={<StateWinner />} />
        <Route path="/candidate" element={<Candidate />} />
        <Route path="/forgetmodal" element={<ForgotModal />} />
        <Route path="/termscondition" element={<TermsCondition />} />
        <Route path="/privacypolicy" element={<PrivacyPolicy />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/myvote" element={<MyVote />} />
        <Route
          path="/predictandelectoral"
          element={<PredictionAndElectoral />}
        />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
