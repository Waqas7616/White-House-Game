import React, { useState } from "react";
import trump from '../../images/trump.png'
import democrat from '../../images/democrat.png'
import cross from '../../images/cross.png'
import {
    Card,
    CardHeader,
    Typography,
    
  } from "@material-tailwind/react";

export const Modal = () => {
    const [popup, setPopup] = useState(true);

    const closePopup = () => {
      setPopup(false);
    };
  return (
    <>
        {popup && (
        <div>
          <Card className="max-w-[20rem] overflow-hidden h-[435px] rounded-lg">
            <CardHeader
              floated={false}
              shadow={false}
              color="transparent"
              className="m-0 rounded-none "
            >
              <img src={trump} alt="ui/ux review check" />
              <div className="absolute top-2 right-3 ">
                <img
                  onClick={closePopup}
                  className="w-7 h-7 cursor-pointer"
                  src={cross}
                  alt=""
                />
              </div>
            </CardHeader>
            <div className=" absolute  flex justify-center items-center mt-[7.9rem] space-x-2 mb-4">
              <div className="flex justify-center items-center ml-12">
                <div className="border-2 border-[#ED1C24] w-[69px]" />
              </div>
              <div className="w-[42px] h-[42px] flex justify-center items-center rounded-full bg-white">
                <img className=" object-cover" src={democrat} alt="" />
              </div>
              <div className="flex justify-center items-center">
                <div className="border-2 border-[#ED1C24] w-[69px]" />
              </div>
            </div>
            <div className="bg-[#ED1C24] items-center flex flex-col h-[277px] pt-3 ">
              <Typography
                variant="h6"
                color="textWhite"
                className="mb-3 font-extrabold text-white text-[13px] font-poppins "
              >
                Donald Trump
              </Typography>
              <Typography
                variant="body1"
                color="textSecondary"
                className="mb-3 text-white text-[12px] font-poppins"
              >
                Born June 14, 1946
              </Typography>
              <Typography
                variant="body1"
                color="textSecondary"
                className="mb-3 text-white text-[9px] font-poppins"
              >
                Queens, New York
              </Typography>
              <Typography
                variant="body1"
                color="textPrimary"
                className="mb-3 text-white text-[11px] w-[189px] text-center font-poppins"
              >
                <span className="font-extrabold font-poppins">Occupation:</span> Businessman,
                media personality, politician
              </Typography>
              <Typography
                variant="body1"
                color="textPrimary"
                className="mb-3 text-white text-[11px] w-[172px] text-center font-poppins"
              >
                45th President of the United States{" "}
                <span className="font-extrabold">(2017-2021)</span>
              </Typography>
              <Typography
                variant="body1"
                color="textPrimary"
                className="mb-3 text-white text-[11px] w-[205px] text-center font-poppins"
              >
                Real estate and business career started{" "}
                <span className="font-extrabold">1968</span>
              </Typography>
              <Typography
                variant="body1"
                color="textSecondary"
                className="mb-3 text-white text-[11px] font-poppins"
              >
                Reality TV show host (2004-15)
              </Typography>
              {/* <div className="absolute z-0 right-[1px] top-[201px] h-[291px]">
              <img className="w-[96px] h-[234px]" src={imgeesix} alt="" />
            </div> */}
            </div>
          </Card>
        </div>
      )}
    </>
  );
};
