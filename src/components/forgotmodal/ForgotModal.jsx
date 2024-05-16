import React from 'react'
import check from "../../images/check.png"



export const ForgotModal = ({closeModal}) => {
  return (
    <>
    <div className="max-w-[16rem] md:max-w-sm mx-auto rounded-lg bg-[#131A41] px-10 py-10">
        <div className='flex justify-center items-center '>
            <img className='h-20 w-20' src={check} alt="" />
        </div>
        <div className='flex justify-center items-center mt-3 '>
            <p className='text-white font-poppins text-[12px]'>Your Email has been send </p>
            
        </div>
        <div className='flex justify-center items-center mt-2'>
        <h3 className='text-white text-[18px] font-poppins font-bold '>Successfully</h3>
        </div>
         
          <div className="flex justify-center mt-5 ">
            <button onClick={closeModal} className="rounded-lg px-5 py-3 bg-red-500 w-[200px] h-[50px] md:w-[380px] md:h-[50px] text-white font-poppins">
              Close
            </button>
          </div>
          
        </div>
    </>
  )
}
