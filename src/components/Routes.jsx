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
import { PredictNext } from './predictnext/PredictNext'
import { Rules } from './rules/Rules'
import { OptionOne } from './optionone/OptionOne'
import { OptionTwo } from './optiontwo/OptionTwo'
import { Version } from './version/Version'

function AppRoutes() {
    return (
        <Router>
            <Routes>
                <Route path='/' exact element={<Home />} />
                <Route path='/about' element={<About />} />
                <Route path='/contact' element={<Contact />} />
                <Route path='/predict' element={<Prediction />} />
                <Route path='/login' element={<LogIn/>}/>
                <Route path='/signup' element={<SignUp/>}/>
                <Route path='/forgotpassword' element={<ForgotPassword/>}/>
                <Route path='/resetpassword' element={<ResetPassword/>}/>
                <Route path='/emailverification' element={<EmailVerification/>}/>
                <Route path='/forgotmodal' element={<ForgotModal/>}/>
                <Route path='/putdata' element={<PutData/>}/>
                <Route path='/predictnext' element={<PredictNext/>}/>
                <Route path='/rules' element={<Rules/>}/>
                <Route path='/optionone' element={<OptionOne/>}/>
                <Route path='/optiontwo' element={<OptionTwo/>}/>
                <Route path='/version' element={<Version/>}/>
                 
            </Routes>
        </Router>
    )
}

export default AppRoutes;
