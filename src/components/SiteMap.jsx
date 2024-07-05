import React from "react";
import AppBanner from "./appbanner/AppBanner";
import { useNavigate, useLocation, Link } from "react-router-dom";
import DownloadApp from "./DownloadApp";
import { Helmet } from "react-helmet";

export default function SiteMap() {
  const navigate = useNavigate();
  const location = useLocation();
  const data = {
    title: "My",
    title2: "Account",
    desc: "Honest information helps us predict ",
    desc2: "the mood of the nation",
  };
  return (
    <div>
       <Helmet>
        <title>The White House Game | Site Map Information Quick Links</title>
        <meta
          name="description"
          content="Explore quick links for navigating The White House Game. Predict the next President, view candidates, and learn about our terms and privacy policy."
        />
        <meta
          name="keywords"
          content="The White House Game, presidential election, candidates, predict president, terms and conditions, privacy policy"
        />
      </Helmet>
      <AppBanner bannerTitle={"Map"} redTitle={"Site"} />
      <h2 className="text-center text-white poppins5 mt-12 text-[30px]">
        Information Quick Links
      </h2>
      <div className="w-8/12 m-auto my-12">
        <div className="flex flex-wrap justify-center gap-12">
          <h2
            onClick={() => navigate("/")}
            className="poppins4 text-[20px] text-white hover:text-redish cursor-pointer  hover:underline"
          >
            Home
          </h2>
          <h2 className="poppins4 text-[20px] text-white hover:text-redish cursor-pointer  hover:underline">
            {" "}
            <Link
              target="_blank"
              to={
                "http://thewhitehousegame.myspreadshop.com/the+white+house+game-A655354cb8ba6e22839f3b9c8?productType=654&sellable=nOkb1E5YopF90oXEZEz3-654-24&appearance=1138"
              }
            >
              {" "}
              <h2
                className={`poppins4 text-[20px] text-white hover:text-redish cursor-pointer  hover:underline ${
                  location.pathname === "/contact" ? "active" : ""
                }  cursor-pointer hover:font-[500] text-whiteColor`}
              >
                Shop
              </h2>
            </Link>
          </h2>
          <h2
            onClick={() => navigate("/candidate")}
            className="poppins4 text-[20px] text-white hover:text-redish cursor-pointer  hover:underline"
          >
            Candidates
          </h2>
          <h2 className="poppins4 text-[20px] text-white hover:text-redish cursor-pointer  hover:underline">
            Tell us who you think will win?
          </h2>
          <h2
            onClick={() => navigate("/predict")}
            className="poppins4 text-[20px] text-white hover:text-redish cursor-pointer  hover:underline"
          >
            Predict who will be next President
          </h2>
          <h2
            onClick={() => navigate("/predictandelectoral")}
            className="poppins4 text-[20px] text-white hover:text-redish cursor-pointer  hover:underline"
          >
            Predict President and electoral College
          </h2>
          <h2
            // onClick={() => navigate("/putdata")}
            // className="poppins4 text-[20px] text-white hover:text-redish cursor-pointer  hover:underline"
            className={` poppins4 text-[20px] text-white hover:text-redish cursor-pointer  hover:underline ${
              location.pathname === "/putdata"
                ? ""
                : ""
            }`}
            onClick={() => navigate("/putdata", { state: { data } })}
          >
            My Account
          </h2>
          <h2
            onClick={() => navigate("/myvote")}
            className="poppins4 text-[20px] text-white hover:text-redish cursor-pointer  hover:underline"
          >
            My Vote
          </h2>
          <h2
            onClick={() => navigate("/about")}
            className="poppins4 text-[20px] text-white hover:text-redish cursor-pointer  hover:underline"
          >
            Who we are
          </h2>
          <h2
            onClick={() => navigate("/termscondition")}
            className="poppins4 text-[20px] text-white hover:text-redish cursor-pointer  hover:underline"
          >
            Terms and Condition
          </h2>
          <h2
            onClick={() => navigate("/privacypolicy")}
            className="poppins4 text-[20px] text-white hover:text-redish cursor-pointer  hover:underline"
          >
            Privacy policy
          </h2>
        </div>
      </div>
      <DownloadApp />
    </div>
  );
}
