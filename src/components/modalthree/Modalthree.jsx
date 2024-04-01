import React, { useState } from "react";
import { Card, CardHeader, Typography } from "@material-tailwind/react";

import kamala from "../../images/kamala.png";
import republican from "../../images/republican.png";

import cross from "../../images/cross.png";

const Modalthree = () => {
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
              <img src={kamala} alt="ui/ux review check" />
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
                <img className="" src={republican} alt="" />
              </div>
              <div className="flex justify-center items-center">
                <div className="border-2 border-[#ED1C24] w-[69px]" />
              </div>
            </div>
            <div className="bg-[#232C5F] items-center flex flex-col h-[277px] pt-3 ">
              <Typography
                variant="h6"
                color="textWhite"
                className="mb-3 font-extrabold text-white text-[13px] font-poppins "
              >
                Kamala Harris
              </Typography>
              <Typography
                variant="body1"
                color="textSecondary"
                className="mb-3 text-white text-[12px] font-poppins"
              >
                Born October 20, 1964,
              </Typography>
              <Typography
                variant="body1"
                color="textSecondary"
                className="mb-3 text-white text-[9px] font-poppins"
              >
                Oakland, California
              </Typography>
              <Typography
                variant="body1"
                color="textPrimary"
                className="mb-3 text-white text-[11px] w-[189px] text-center font-poppins"
              >
                <span className="font-extrabold">Occupation:</span> Lawyer,
                author, politician
              </Typography>
              <Typography
                variant="body1"
                color="textPrimary"
                className="mb-3 text-white text-[11px] w-[172px] text-center font-poppins"
              >
                49th Vice President of the United States{" "}
                <span className="font-extrabold">(2021-2025)</span>
              </Typography>
              <Typography
                variant="body1"
                color="textPrimary"
                className="mb-3 text-white text-[11px] w-[205px] text-center font-poppins"
              >
                Senator representing California{" "}
                <span className="font-extrabold">(2017-2021)</span>
              </Typography>
              <Typography
                variant="body1"
                color="textSecondary"
                className="mb-3 text-white text-[11px] font-poppins"
              >
                Attorney General for California (2011-17)
              </Typography>
            </div>
          </Card>
        </div>
      )}
    </>
  );
};

export default Modalthree;
