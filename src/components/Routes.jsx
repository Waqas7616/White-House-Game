import React from 'react'
import { BrowserRouter as Router, Route, Routes, } from 'react-router-dom'
import Home from '../pages/Homepage'
import About from '../pages/About'
import Contact from '../pages/Contact'
import Prediction from '../pages/Prediction'


import { LogIn } from './login/LogIn'
import { SignUp } from './signup/SignUp'
import { ForgotPassword } from './forgotpassword/ForgotPassword'
import { ResetPassword } from './resetpassword/ResetPassword'
import EmailVerification from './emailverification/EmailVerification'
import { ForgotModal } from './forgotmodal/ForgotModal'
import { PutData } from './putdata/PutData'
import ElectoralCollege from '../pages/ElectoralCollege'
import PartyPrediction from '../pages/PartyPrediction'
import { Navigate } from 'react-router-dom'
function AppRoutes() {
    
    const user = localStorage.getItem('email');
    const token = localStorage.getItem('token');
    return (
        <Router>
            <Routes>
                <Route path='/' exact element={<Home />} />
                <Route path='/about' element={<About />} />
                <Route path='/contact' element={<Contact />} />
                <Route path='/predict' element={user || token ? <Prediction /> : <Navigate to='/login'/>} />

                <Route path='/login' element={<LogIn />} />
                <Route path='/signup' element={<SignUp />} />
                <Route path='/forgotpassword' element={<ForgotPassword />} />
                <Route path='/resetpassword' element={<ResetPassword />} />
                <Route path='/emailverification' element={<EmailVerification />} />
                <Route path='/forgotmodal' element={<ForgotModal />} />
                <Route path='/putdata' element={<PutData />} />
                <Route path='/electoral' element={user || token ? <ElectoralCollege /> : <Navigate to='/login'/>} />

                <Route path='/party-prediction' element={<PartyPrediction />} />

            </Routes>
        </Router>
    )
}

export default AppRoutes;
