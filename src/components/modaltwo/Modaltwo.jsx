import React, { useState } from "react";
import { Card, CardHeader, Typography } from "@material-tailwind/react";

import joebiden from "../../images/joebiden.png";
import republican from "../../images/republican.png";

import cross from "../../images/cross.png";

const Modaltwo = () => {
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
              <img src={joebiden} alt="ui/ux review check" />
              <div className="absolute top-2 right-3 cursor-pointer ">
                <img
                  onClick={closePopup}
                  className="w-7 h-7"
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
                className="mb-3 font-extrabold text-white text-[13px] font-poppins"
              >
                Joe Biden
              </Typography>
              <Typography
                variant="body1"
                color="textSecondary"
                className="mb-3 text-white text-[12px] font-poppins"
              >
                Born November 20, 1942,
              </Typography>
              <Typography
                variant="body1"
                color="textSecondary"
                className="mb-3 text-white text-[9px] font-poppins"
              >
                Scranton, Pennsylvania
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
                className="mb-3 font-extrabold text-white text-[11px] w-[172px] text-center font-poppins"
              >
                46th President of the United States (2021-2025)
              </Typography>
              <Typography
                variant="body1"
                color="textPrimary"
                className="mb-3 text-white text-[11px] w-[205px] text-center font-poppins"
              >
                47th Vice President of the United States{" "}
                <span className="font-extrabold">(2009-2017)</span>
              </Typography>
              <Typography
                variant="body1"
                color="textSecondary"
                className="mb-3 text-white text-[11px] font-poppins"
              >
                Senator representing Delaware (1973-2009)
              </Typography>
            </div>
          </Card>
        </div>
      )}
    </>
  );
};

export default Modaltwo;
