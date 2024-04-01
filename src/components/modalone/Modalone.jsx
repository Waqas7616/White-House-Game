import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Avatar,
  Tooltip,
} from "@material-tailwind/react";
import robert from '../../images/robert.png'
import cross from '../../images/cross.png'
import republican from '../../images/republican.png'

export const Modalone = () => {
    const [popup, setPopup] = useState(true);
    const closePopup = () => {
        setPopup(false);
    }

  return (
    <>
     {popup && (
        <div>
          <Card className="max-w-[20rem] overflow-hidden h-[435px]">
            <CardHeader
              floated={false}
              shadow={false}
              color="transparent"
              className="m-0 rounded-none "
            >
              <img src={robert} alt="ui/ux review check" />
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
            <div className="bg-[white] items-center flex flex-col h-[277px] pt-3 ">
              <Typography
                variant="h6"
                color="textWhite"
                className="mb-3 font-extrabold text-[#333333] text-[13px] "
              >
                ROBERT F. KENNEDY JR
              </Typography>
              <Typography
                variant="body1"
                color="textSecondary"
                className="mb-3 text-[#333333] text-[12px]"
              >
                Born January 17, 1954,
              </Typography>
              <Typography
                variant="body1"
                color="textSecondary"
                className="mb-3 text-[#333333] text-[9px]"
              >
                Georgetown University Hospital, Washington DC
              </Typography>
              <Typography
                variant="body1"
                color="textPrimary"
                className="mb-3 text-[#333333] text-[11px] w-[189px] text-center"
              >
                <span className="font-extrabold">Occupation:</span>{" "}
                Environmental lawyer, author, health advocate
              </Typography>
              <Typography
                variant="body1"
                color="textPrimary"
                className="mb-3 text-[#333333] text-[11px] w-[172px] text-center"
              >
                Son of (assassinated) 64th Attorney General of the United
                States, RFK
              </Typography>
              <Typography
                variant="body1"
                color="textPrimary"
                className="mb-3 text-[#333333] text-[11px] w-[205px] text-center"
              >
                Nephew of (assassinated) 35th President of the United States,
                JFK
              </Typography>
            </div>
          </Card>
        </div>
      )}
    </>
  )
}
