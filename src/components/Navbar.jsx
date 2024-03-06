import React, { useState, useEffect } from 'react'
import logo from '../images/logo.png'
import burger from '../images/hamburger.png'
import closeMenu from '../images/closeMenu.png'
function Navbar() {
    const [isMobile, setIsMobile] = useState(false)
    const [toggle, setToggle] = useState(false)

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768)
        }
        handleResize();
        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const toggleMenu = () => {
        setToggle(!toggle)
    }
    return (
        <div className={`navbar  m-auto bg-[#41414163] backdrop-blur-[6px] resp px-4 mt-4 py-1 flex ${toggle?'flex-col rounded-lg relative':'rounded-[100px] w-10/12 '}  items-center justify-between`}>
            {isMobile ? <><div className="logo"><a href="/"><img src={logo} alt="" /></a></div> <div onClick={toggleMenu}>{!toggle?<img width={30} src={burger}  alt="" />:<img className='absolute right-3 top-3' width={30} src={closeMenu} alt='close icon'/>}</div></> : <>
                <div className="logo"><a href="/"><img src={logo} alt="" /></a></div>
                <div className="nav-links flex gap-8 ">
                    <li className="nav-link poppins4 hover:text-redish cursor-pointer hover:font-[500] text-whiteColor">Home</li>
                    <li className="nav-link poppins4 hover:text-redish cursor-pointer hover:font-[500] text-whiteColor">About Us</li>
                    <li className="nav-link poppins4 hover:text-redish cursor-pointer hover:font-[500] text-whiteColor">Services</li>
                    <li className="nav-link poppins4 hover:text-redish cursor-pointer hover:font-[500] text-whiteColor">Contact Us</li>
                </div>
                <div className="download-button flex items-center justify-between gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M19.5 22C19.8978 22 20.2794 21.842 20.5607 21.5607C20.842 21.2794 21 20.8978 21 20.5C21 20.1022 20.842 19.7206 20.5607 19.4393C20.2794 19.158 19.8978 19 19.5 19C19.1022 19 18.7206 19.158 18.4393 19.4393C18.158 19.7206 18 20.1022 18 20.5C18 20.8978 18.158 21.2794 18.4393 21.5607C18.7206 21.842 19.1022 22 19.5 22ZM9.5 22C9.89782 22 10.2794 21.842 10.5607 21.5607C10.842 21.2794 11 20.8978 11 20.5C11 20.1022 10.842 19.7206 10.5607 19.4393C10.2794 19.158 9.89782 19 9.5 19C9.10218 19 8.72064 19.158 8.43934 19.4393C8.15804 19.7206 8 20.1022 8 20.5C8 20.8978 8.15804 21.2794 8.43934 21.5607C8.72064 21.842 9.10218 22 9.5 22Z" fill="white" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M5 4H22L20 15M5 4L7 15H20M5 4C4.833 3.333 4 2 2 2M20 15H5.23C3.446 15 2.5 15.781 2.5 17C2.5 18.219 3.446 19 5.23 19H19.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <button className='bg-[#ED1C24] py-[12px] px-[30px] text-white rounded-[100px]'>Download Now</button>
                </div>
            </>}


            {isMobile && toggle && (<>
                 <div className="nav-links flex flex-col gap-8 ">
                 <li className="nav-link poppins4 hover:text-redish cursor-pointer hover:font-[500] text-whiteColor">Home</li>
                 <li className="nav-link poppins4 hover:text-redish cursor-pointer hover:font-[500] text-whiteColor">About Us</li>
                 <li className="nav-link poppins4 hover:text-redish cursor-pointer hover:font-[500] text-whiteColor">Services</li>
                 <li className="nav-link poppins4 hover:text-redish cursor-pointer hover:font-[500] text-whiteColor">Contact Us</li>
             </div>
             <div className="download-button flex items-center justify-between gap-2">
                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                     <path d="M19.5 22C19.8978 22 20.2794 21.842 20.5607 21.5607C20.842 21.2794 21 20.8978 21 20.5C21 20.1022 20.842 19.7206 20.5607 19.4393C20.2794 19.158 19.8978 19 19.5 19C19.1022 19 18.7206 19.158 18.4393 19.4393C18.158 19.7206 18 20.1022 18 20.5C18 20.8978 18.158 21.2794 18.4393 21.5607C18.7206 21.842 19.1022 22 19.5 22ZM9.5 22C9.89782 22 10.2794 21.842 10.5607 21.5607C10.842 21.2794 11 20.8978 11 20.5C11 20.1022 10.842 19.7206 10.5607 19.4393C10.2794 19.158 9.89782 19 9.5 19C9.10218 19 8.72064 19.158 8.43934 19.4393C8.15804 19.7206 8 20.1022 8 20.5C8 20.8978 8.15804 21.2794 8.43934 21.5607C8.72064 21.842 9.10218 22 9.5 22Z" fill="white" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                     <path d="M5 4H22L20 15M5 4L7 15H20M5 4C4.833 3.333 4 2 2 2M20 15H5.23C3.446 15 2.5 15.781 2.5 17C2.5 18.219 3.446 19 5.23 19H19.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                 </svg>
                 <button className='bg-[#ED1C24] py-[12px] px-[30px] text-white rounded-[100px]'>Download Now</button>
                </div>
                </>
            )}

        </div>
    )
}

export default Navbar
