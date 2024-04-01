import React from 'react'
import { BrowserRouter as Router, Route, Routes, } from 'react-router-dom'
import Home from '../pages/Homepage'
import About from '../pages/About'
import Contact from '../pages/Contact'
<<<<<<< HEAD
import Prediction from '../pages/Prediction'
=======
import { Modal } from './modal/Modal'
import { Modalone } from './modalone/Modalone'
>>>>>>> 8541e1eb5d8e55a65680cf50e8c99416987ee3b9

function AppRoutes() {
    return (
        <Router>
            <Routes>
                <Route path='/' exact element={<Home />} />
                <Route path='/about' element={<About />} />
                <Route path='/contact' element={<Contact />} />
<<<<<<< HEAD
                <Route path='/predict' element={<Prediction />} />
=======
                <Route path='/modal' element={<Modal/>}/>
                <Route path='/modalone' element={<Modalone/>}/>
>>>>>>> 8541e1eb5d8e55a65680cf50e8c99416987ee3b9
            </Routes>
        </Router>
    )
}

export default AppRoutes
