import React,{useEffect} from "react";
import Navbar from "../components/Navbar";
import AppBanner from "../components/appbanner/AppBanner";
import Terms from "../images/Terms.png";
import logo from "../images/logo.png";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import ReactGA from 'react-ga4'

export default function TermsCondition() {
  const navigate = useNavigate();
  useEffect(()=>{
    ReactGA.send({
      hitType:'pageview',
      path:window.location.pathname
    });
      },[])
  const paragraph = [
    "1.	As well as complying with the laws of your country of citizenship, country of residence and where you are using our services, you are also obligated to obey our terms and conditions.",
    "1.1	The conditions we place on use are designed to maintain the integrity and reputation of our platform.",
    "2.	Restricted activities",
    "2.1	When you open an account with The White House Game you agree to use their account lawfully and not use it in ways which violate regulations, statutes and laws in any country which has the right to exercise jurisdiction over our customers and their digital activities on our service.",
    "3.	Illegal activities prohibition",
    "3.1	The White House Game does not permit our platform being used to facilitate the sale or promotion of controlled substances, including medical prescription drugs, steroids, pharmaceuticals and health products, which have the potential to endanger users.",
    "4.	Fake accounts",
    "4.1	The White House Game does not permit a user to open more than one account on either or both our website or app platforms. Where we are made aware that an account member has created more than one account we reserve the right to delete any number of the accounts and remove all statistical data connected to these fraudulent accounts.",
    "5.	Promoting illegal political groups",
    "5.1	The White House Game does not permit its platform being used to promote illegal political, religious and similar groups or parties.",
    "5.2	Any group which is legally registered in their own jurisdiction, but is illegal in another jurisdiction where we operate may be prohibited from using our platform in cases where we make a discretionary decision determining limiting account activity.",
    "5.5	The White House Game reserves the right to withdraw services from legally registered organisations and individuals, if their use of our platform poses a commercial risk to us.",
    "6.	Offensive, blasphemous and obscenity",
    "6.1	The White House Game refuses or withdraws services to individuals, businesses and service providers involved in selling or promoting offensive, blasphemous and obscene products and services, such as pornography, sexual paraphernalia, religiously blasphemous items, material, and goods and services used for physical violence, with exceptions being art or historical items (such as antique swords etc).",
    "7.	Non-US based accounts",
    "7.1	Where we are made aware that non-US based players of our game are engaging in activity designed to manipulate results we reserve the right to cancel these accounts and delete their statistical contribution to our game. Foreigners and non-US based players are encouraged to play our game but must identify their true status as non-voters opinions will not be used to calculate our statistics. However a different set of statistics aim to discover what opinions of non-US citizens are.",
    "8.	Intellectual property infringement",
    "8.1	The White House Game refuses or withdraws services to individuals, businesses and organisations involved in the sale and promotion of goods and services which infringe on copyright protection, violate trademarks, the right of publicity or privacy or any other proprietary rights which are enforceable in the jurisdiction of the transaction.",
    "9.	Gambling services",
    "9.1	The White House Game refuses or withdraws services to individuals, businesses and organisations involved in ‘get rich quick’ schemes of a speculative nature and do not extend services to gambling promoters.",
    "10.	Sexual, racial, physical and linguistic questions",
    "10.1	The White House Game asks user to supply their demographic information so we can statistically create a representation of voting intentions amongst different racial groups, biological sexes, language communities etc. None of these questions are designed to discriminate in anyway.",
    "11.	Biological sex",
    "11.1	Our game is interested in finding out the voting intentions of the men and women voters. Where we use the noun ‘sex’ it refers to biological sex.",
    "12.	Pre-approval account holders",
    "12.1	The White House Game may decide to withdraw or limit services to individuals, businesses and organisations owing to the possibility of regulatory action against us or customer backlash against us.",
    "12.2	Actors Index may become aware of an account holder’s social or commercial reputation and we may limit, restrict or cancel services accordingly.",
    "13.	The White House Game’s limited liability for cancelled services",
    "13.1	The White House Game refuses to be held liable for any losses incurred by our withdrawal or limitation of services.",
    "13.2	Where The White House Game decides to close or suspend an account we will request instructions on where and how to forward any potential refunds and transfer them accordingly.",
    "13.3	The White House Game reserves the right to extend and withdraw services to whoever we determine to be in the best interests of our platform.",
    "14.	Loss denial",
    "14.1	The White House Game refuses to be held responsible for financial losses arising from digital activities on our platform which are subsequently found to have violated our terms of services.",
    "14.2	The White House Game will not be held responsible for individual or multiple transactions which we had no reasonable knowledge of knowing were illegal or violated our terms of service.",
    "14.3	Where we have received no official advice and confirmation that an account holder was violating our terms of service, then The White House Game shall be regarded as being unaware of such activity.",
    "15.	The White House Game terms and conditions violation awareness",
    "15.1	We rely on law enforcement agencies, public officials, government and non-government organisations and the general public to inform us that an account holder has engaged in online activity which violates our terms and conditions.",
    "15.2	The White House Game does not take responsibility for investigating our account holder’s activity on our platform or other platforms unless it is fraudulent or illegal in nature and has caused us to become aware of it already.",
    "16.	Reporting a violator of our Terms and conditions",
    "16.1	Other game users and the general public can report violators of our Terms and Conditions to us through our Contact Us pages.",
  ];

  return (
    <>
      <div className=" h-screen">
      <Helmet>
        <title>The White House Game | Terms and Conditions</title>
        <meta
          name="keywords"
          content="terms and conditions, rules, legal, white house game"
        />
        <meta
          name="description"
          content="To make sure our game is fun and useful and forbidden to inappropriate users and spam, it is obligatory for our player members to respect our Terms and Conditions."
        />
        <meta name="language" content="en" />
      </Helmet>
        <AppBanner
          bannerTitle={"CONDITIONS"}
          redTitle={"TERMS AND"}
          bg={Terms}
        />
        <div className="w-10/12 m-auto resp ">
          <div className="text-[#fff] text-[14px] sm:text-[36px] xl:text-[56px] orbit7 w-[200px] sm:w-[475px] md:w-[472px] lg:w-[576px] xl:w-[742px] mt-16 mb-5 m-auto text-center">
            The White House Game Terms and Conditions
          </div>
          <div className=" p-4">
            {/* <ul className=" pl-5 text-white">
              {paragraph.map((item, index) => (
                <li
                  key={index}
                  className={`mb-9 text-[16px] lg:text-[24px] ${
                    item.includes("1.") ||
                    item.includes("2.") ||
                    item.includes("3.") ||
                    item.includes("4.") ||
                    item.includes("5.") ||
                    item.includes("6.") ||
                    item.includes("7.") ||
                    item.includes("8.") ||
                    item.includes("9.") ||
                    item.includes("10.") ||
                    item.includes("11.") ||
                    item.includes("12.") ||
                    item.includes("13.") ||
                    item.includes("14.") ||
                    item.includes("15.") ||
                    item.includes("16.")
                      ? "font-extrabold"
                      : "font-light"
                  }`}
                >
                  {item}
                </li>
              ))}
            </ul> */}
            <ul className=" pl-5 text-white">
              {paragraph.map((item, index) => (
                <li
                  key={index}
                  className={`mb-9 text-[14px] lg:text-[18px] xl:text-[24px] poppins ${
                    /^[0-9]+\.\s/.test(item) ? " poppins6" : " poppins4"
                  }`}
                >
                  {item}
                </li>
              ))}
            </ul>

            <div className="my-5 pl-5">
              <p className="text-white pt-3 text-[16px] lg:text-[24px] poppins4">
                The White House Game Terms and Conditions
              </p>
              <p className="text-white pt-3 text-[16px] lg:text-[24px] poppins4">
                Version 24.05
              </p>
              <p className="text-white pt-3 text-[16px] lg:text-[24px] poppins4">
                Last update: 22 May 2023
              </p>
            </div>
          </div>
        </div>
        <div className="footer w-10/12 resp m-auto mt-12 pb-4 border-b-[1px] border-[rgba(255,255,255,0.6)]">
          <div className="flex flex-col gap-4 md:gap-6 lg:gap-6 md:flex-row justify-between items-center">
            <div className="logo">
              <img src={logo} alt="" />
            </div>
            <div>
              <div>
                <p className="text-[10px] lg:text-[18px] text-[#fff] poppins3 text-center mt-3">
                  Now you’ve played the Game - Buy the Shirt!
                  <a
                    href="https://thewhitehousegame.myspreadshop.com/the+white+house+game-A655354cb8ba6e22839f3b9c8?productType=654&sellable=nOkb1E5YopF90oXEZEz3-654-24&appearance=1138"
                    className="ml-1 font-black text-redish "
                  >
                    OUR SHOP
                  </a>
                </p>
              </div>
              <div className="flex gap-3 sm:gap-8 mx-5 sm:mx-0 mt-3">
                <h2
                  onClick={() => navigate("/contact")}
                  className="text-[8px] text-nowrap lg:text-[12px] poppins4 text-[#fff] cursor-pointer"
                >
                  Contact Us
                </h2>
                <h2
                  onClick={() => navigate("/privacypolicy")}
                  className="text-[8px] text-nowrap lg:text-[12px] poppins4 text-[#fff] cursor-pointer"
                >
                  Privacy Policy
                </h2>
                <h2
                  onClick={() => navigate("/termscondition")}
                  className="text-[8px] text-nowrap lg:text-[12px] poppins4 text-[#fff] cursor-pointer"
                >
                  Terms and Conditions
                </h2>
                <a
                  href="https://thewhitehousegame.myspreadshop.com/the+white+house+game-A655354cb8ba6e22839f3b9c8?productType=654&sellable=nOkb1E5YopF90oXEZEz3-654-24&appearance=1138"
                  class="text-[8px] text-nowrap lg:text-[12px] poppins4 text-[#fff] cursor-pointer"
                >
                  <h2>White House Shop</h2>
                </a>
              </div>
            </div>
            <div>
              <h2 className="text-[#fff] orbit7 text-[14px] lg:text-[18px]">
                Join White House News
              </h2>
              <p className="text-[#fff] poppins4 text-[11px] lg:text-[14px] my-1">
                Our free monthly newsletter
              </p>
              <div className="bg-[#fff] flex justify-between pl-2 rounded-l-[6px]">
                <input
                  className="border-0 bg-transparent text-[10px] lg:text-[13px] outline-none"
                  type="text"
                  placeholder="Enter your email"
                />
                <button
                  className="bg-redish text-[10px] lg:text-[13px] text-[#fff] p-3 poppins5 "
                  style={{
                    background:
                      "linear-gradient(90deg, #ED1C24 0%, #1C2452 100%)",
                  }}
                >
                  JOIN
                </button>
              </div>
            </div>
          </div>
          {/* <hr className="bg-[red] h-[1px]" /> */}
        </div>
        <p className="text-[10px] md:text-[14px] text-[#fff] poppins3 text-center mt-3 pb-20 mx-10 ml-10 md:mr-28 xl:mr-36">
          The White House Game © 2024. All rights reserved. Sitemap
        </p>
      </div>
    </>
  );
}
