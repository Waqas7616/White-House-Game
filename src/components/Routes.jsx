import React from 'react'
import { BrowserRouter as Router, Route, Routes, } from 'react-router-dom'
import Home from '../pages/Homepage'
import About from '../pages/About'
import Contact from '../pages/Contact'
import { Modal } from './modal/Modal'
import { Modalone } from './modalone/Modalone'

function AppRoutes() {
    return (
        <Router>
            <Routes>
                <Route path='/' exact element={<Home />} />
                <Route path='/about' element={<About />} />
                <Route path='/contact' element={<Contact />} />
                <Route path='/modal' element={<Modal/>}/>
                <Route path='/modalone' element={<Modalone/>}/>
            </Routes>
        </Router>
    )
}

export default AppRoutes
