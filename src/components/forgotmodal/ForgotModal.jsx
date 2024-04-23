import React from 'react'
import check from "../../images/check.png"

export const ForgotModal = () => {
  return (
    <>
    <div className="max-w-sm mx-auto rounded-lg bg-[#131A41] px-10 py-10">
        <div className='flex justify-center items-center '>
            <img className='h-20 w-20' src={check} alt="" />
        </div>
        <div className='flex justify-center items-center mt-3 '>
            <p className='text-white font-poppins text-[12px]'>Your Password has been reset </p>
            
        </div>
        <div className='flex justify-center items-center mt-2'>
        <h3 className='text-white text-[18px] font-poppins font-bold '>Successfully</h3>
        </div>
         
          <div className="flex justify-center mt-5 ">
            <button className="rounded-lg px-5 py-3 bg-red-500 w-[380px] h-[50px] text-white font-poppins">
              Save Changes
            </button>
          </div>
          
        </div>
    </>
  )
}
