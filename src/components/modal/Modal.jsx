import cross from "../../images/cross.png";
import { Card, CardHeader, Typography } from "@material-tailwind/react";

export const Modal = ({ candidate, onClose }) => {
  const imageUrl = "https://thewhitehousegame.com/public/";

  const getBackgroundColor = (partyName) => {
    if (partyName === "Democratic") {
      return " bg-blue-500  border-[blue] text-[white]";
    } else if (partyName === "Republican") {
      return "bg-red-500 border-red-500 text-[white]";
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
    <div className="">
      <div className="rounded-lg ">
        <Card className={`relative max-w-[20rem] overflow-hidden h-[450px] rounded-lg shadow-2xl bg-black-50/50  ${getBackgroundColor(
                      candidate?.party?.party_name
                    )}`}>
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 rounded-none "
          >
            <div className=" overflow-hidden ">
              <img
                src={`${imageUrl}${candidate?.candidate_image}`}
                alt="ui/ux review check"
                className="w-full  "
              />
              <div className="absolute top-2 right-3 ">
                <img
                  onClick={onClose}
                  className="w-7 h-7 cursor-pointer"
                  src={cross}
                  alt=""
                />
              </div>
              <div className=" absolute  flex justify-center items-center bottom-[-10px] left-4 space-x-2 mb-4">
                <div className="flex justify-center items-center ml-12 ">
                  <div
                    className={`border-2 w-[69px] ${getBackgroundColor(
                      candidate?.party?.party_name
                    )}`} 
                  />
                </div>
                <div className="w-[48px] h-[48px] flex justify-center items-center rounded-full bg-white">
                  <img
                    className=" h-9 w-9"
                    src={`${imageUrl}${candidate?.party?.party_badge}`}
                    alt=""
                  />
                </div>
                <div className="flex justify-center items-center ">
                <div
                    className={`border-2 w-[69px] ${getBackgroundColor(
                      candidate?.party?.party_name
                    )}`}
                  />
                </div>
              </div>
            </div>
          </CardHeader>

          <div
            className={` flex flex-col justify-start px-5 h-[220px] pt-3  ${getBackgroundColor(
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
              Born: {candidate?.dob}
            </Typography>
            <Typography
              variant="body1"
              color="textSecondary"
              className="mb-3  text-[11px]  font-poppins"
            >
              {/* Georgetown University Hospital, Washington DC */}
              {candidate?.birth_place}
            </Typography>
            <Typography
              variant="body1"
              color="textPrimary"
              className="mb-3  text-[11px]  font-poppins"
            >
              <span className="font-extrabold">Occupation:</span>{" "}
              {candidate?.occupation}
            </Typography>
            <Typography
              variant="body1"
              color="textPrimary"
              className="mb-3  text-[11px] font-poppins"
            >
              <ul >
                              {candidate?.position
                                .split(",")
                                .map((positionItem, index) => (
                                  <li
                                    key={index}
                                    className=""
                                  >
                                    {positionItem.trim()}
                                  </li>
                                ))}
                            </ul>
            </Typography>
          </div>
        </Card>
      </div>
    </div>
  );
};
