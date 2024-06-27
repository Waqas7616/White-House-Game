import React from "react";
import check from "../../images/check.png";
import closeMenu from "../../images/closeMenu.png";

export const ForgotModal = ({ closeModal }) => {
  return (
    <div className="w-full  h-screen fixed top-0 backdrop-blur-md z-50">
      <div className="max-w-[16rem] md:max-w-sm mx-auto rounded-lg absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-[#131A41] px-10 py-10">
        {/* <div className="">
          <button
            onClick={closeModal}
            className="absolute top-2 right-2 text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div> */}
        <div className="flex justify-center items-center ">
          <img className="h-12 w-12 md:h-20 md:w-20" src={check} alt="" />
        </div>
        <div className="flex justify-center items-center mt-3 ">
          <p className="text-white font-poppins font-bold text-[12px]">
          VALIDATION CODE SENT{" "}
          </p>
        </div>
        <div className="flex justify-center items-center mt-2">
          <h3 className="text-white text-[11px] md:text-[11px] font-poppins ">
          Please check the Validation code we’ve emailed you.
          </h3>
        </div>

        <div className="flex justify-center mt-5 ">
          <button
            onClick={closeModal}
            className="rounded-lg px-5 py-3 bg-red-500 w-[200px] h-[50px] md:w-[380px] md:h-[50px] text-white font-poppins"
          >
            Close
          </button>
        </div>
      </div>
    </div>

    // <div className="w-full h-screen fixed top-0 backdrop-blur-md z-50">
    //   <div className="max-w-[16rem] md:max-w-sm mx-auto rounded-lg  top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-[#131A41] px-10 py-10 relative">
    //     {/* Close icon */}
    //     <button
    //       onClick={closeModal}
    //       className="absolute top-2 right-2 text-white"
    //     >
    //       <svg
    //         xmlns="http://www.w3.org/2000/svg"
    //         className="h-6 w-6"
    //         fill="none"
    //         viewBox="0 0 24 24"
    //         stroke="currentColor"
    //       >
    //         <path
    //           strokeLinecap="round"
    //           strokeLinejoin="round"
    //           strokeWidth={2}
    //           d="M6 18L18 6M6 6l12 12"
    //         />
    //       </svg>
    //     </button>

    //     <div className="flex justify-center items-center ">
    //       <img className="h-20 w-20" src={check} alt="" />
    //     </div>
    //     <div className="flex justify-center items-center mt-3 ">
    //       <p className="text-white font-poppins text-[12px]">
    //         Thank you for joining{" "}
    //       </p>
    //     </div>
    //     <div className="flex justify-center items-center mt-2">
    //       <h3 className="text-white text-[18px] font-poppins font-bold ">
    //         The White House Game
    //       </h3>
    //     </div>

    //     <div className="flex justify-center mt-5 ">
    //       <button
    //         onClick={closeModal}
    //         className="rounded-lg px-5 py-3 bg-red-500 w-[200px] h-[50px] md:w-[380px] md:h-[50px] text-white font-poppins"
    //       >
    //         Next
    //       </button>
    //     </div>
    //   </div>
    // </div>
  );
};
