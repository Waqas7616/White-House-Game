import cross from "../../images/cross.png";
import { Card, CardHeader, Typography } from "@material-tailwind/react";

export const Modal = ({ candidate, onClose }) => {
  const imageUrl = "https://pankhay.com/thewhitehousegame/public/";

  const getBackgroundColor = (partyName) => {
    if (partyName === "Democratic") {
      return "bg-[#546BED] text-[white]";
    } else if (partyName === "Republican") {
      return "bg-red-500 text-[white]";
    } else {
      return "bg-[white] text-[black]";
    }
  };

  const getTextColor = (partyName) => {
    if (partyName === "Democratic" || partyName === "Republican") {
      return "text-[white]";
    } else {
      return "text-[#333333]";
    }
  };

  return (
    <>
      <div className="">
        <Card className="relative max-w-[20rem] overflow-hidden h-[435px] rounded-lg shadow-2xl bg-black-50/50  ">
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 rounded-none "
          >
            <img
              src={`${imageUrl}${candidate?.candidate_image}`}
              alt="ui/ux review check"
              className="h-[14rem] w-[25rem] object-fill"
            />
            <div className="absolute top-2 right-3 ">
              <img
                onClick={onClose}
                className="w-7 h-7 cursor-pointer"
                src={cross}
                alt=""
              />
            </div>
          </CardHeader>
          <div className=" absolute  flex justify-center items-center top-28 left-4 space-x-2 mb-4">
            <div className="flex justify-center items-center ml-12">
              <div className="border-2 border-[#ED1C24] w-[69px]" />
            </div>
            <div className="w-[42px] h-[42px] flex justify-center items-center rounded-full bg-white">
              <img
                className=""
                src={`${imageUrl}${candidate?.party?.party_badge}`}
                alt=""
              />
            </div>
            <div className="flex justify-center items-center">
              <div className="border-2 border-[#ED1C24] w-[69px]" />
            </div>
          </div>
          <div
            className={` items-center flex flex-col h-[277px] pt-3 ${getBackgroundColor(
              candidate?.party?.party_name
            )} ${getTextColor(candidate?.party?.party_name)}`}
          >
            <Typography
              variant="h6"
              color=""
              className="mb-3 font-extrabold font-poppins  text-[13px] "
            >
              {candidate?.candidate_name}
            </Typography>
            <Typography
              variant="body1"
              color="textSecondary"
              className="mb-3  text-[12px] font-poppins"
            >
              Born {candidate?.dob}
            </Typography>
            <Typography
              variant="body1"
              color="textSecondary"
              className="mb-3  text-[11px] w-[189px] text-center font-poppins"
            >
              {/* Georgetown University Hospital, Washington DC */}
              {candidate?.birth_place}
            </Typography>
            <Typography
              variant="body1"
              color="textPrimary"
              className="mb-3  text-[11px] w-[189px] text-center font-poppins"
            >
              <span className="font-extrabold">Occupation:</span>{" "}
              {candidate?.occupation}
            </Typography>
            <Typography
              variant="body1"
              color="textPrimary"
              className="mb-3  text-[11px] w-[172px] text-center font-poppins"
            >
              {candidate?.position}
            </Typography>
          </div>
        </Card>
      </div>
    </>
  );
};
