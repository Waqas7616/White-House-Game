import React,{useEffect} from "react";
import AppBanner from "../components/appbanner/AppBanner";
import mobile from "../images/about-mobile.png";
// import count1 from '../images/1.png'
import smile from "../images/smile.png";
import verify from "../images/verify.png";
import foriegn from "../images/foriegnicon.png";
import play from "../images/gameplay.png";
import DownloadApp from "../components/DownloadApp";
import bg from "../images/div.png";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import ReactGA from 'react-ga4'

function About() {

  const navigate = useNavigate();

  useEffect(()=>{
    ReactGA.send({
      hitType:'pageview',
      path:window.location.pathname
    });
      },[])

  return (
    <div>
       <Helmet>
        <title>The White House Game | About Us</title>
        <meta name="keywords" content="White House, game, app, presidential election, 2024, Trump, Biden, Kennedy, opinion polls, statistics, about us." />
        <meta name="description" content="Our game is based on a 2004 board game with the same name with a few variations. The same person invented both versions." />
        <meta name="language" content="en" />
      </Helmet>
      <AppBanner
        redTitle={"About"}
        bg={bg}
        bannerTitle={"US"}
        bannerDesc={
          <>
            We believe the 2024 Presidential Election is the most important since 1860.
            <br />
            The results of that election triggered a Civil War.
            <br />
            Will this one do the same?
          </>
        }
      />

      {/* ABOUT SEC  */}
      <div className=" bg-[#1c2452] py-[101px]">
        <div className="resp about w-10/12 m-auto">
          <h2 className="text-center text-white orbit7 sm:text-[23px] xl-a:text-[50px] ">
            <span className="text-redish">About</span> The White House Game
          </h2>
          <div className="flex xl:gap-16 mt-[50px] flex-wrap">
            <div className="">
              <img
                src={mobile}
                className="xl:w-[491px] xl:h-[890px] m-auto"
                alt=""
              />
            </div>
            <div className="flex-1 pt-10 xl:pr-8">
              <div className="no1 xl:w-[75%]">
                <h3 className="flex gap-1 xl:gap-4  items-start">
                  <h5 className="text-white poppins6 bg-redish xl:h-[56px] h-[30px] xl:w-[56px] w-[30px] rounded-full flex items-center justify-center xl:text-[25px]">
                    1
                  </h5>
                  <span className="text-white poppins6 w-full xl:w-[80%] xl:text-[36px]">
                    The White House Game - board game
                  </span>
                </h3>
                <p className="text-white poppins3 mt-8 lxl:text-[20px] text-white/90">
                  A board game with the same name was launched for the 2004
                  election. The inventor created the game in Australia, had it
                  designed in New Zealand and manufactured in the USA.
                </p>
                <hr className="my-10 border-white/40" />
              </div>
              <div className="no1 w-[75%]">
                <h3 className="flex gap-4  items-center">
                  <h5 className=" text-white poppins6 bg-redish xl:h-[56px] h-[30px] xl:w-[56px] w-[30px] rounded-full flex items-center justify-center xl:text-[25px]">
                    2
                  </h5>
                  <span className="text-white poppins6 xl:text-[36px]">
                    App game
                  </span>
                </h3>
                <p className=" poppins3 mt-8 xl:text-[20px] text-white/90">
                  In 2023 the board game was dusted off and redesigned and
                  launched as an App.
                </p>
                <hr className="my-10 border-white/40" />
              </div>
              <div className="no1 w-[75%]">
                <h3 className="flex gap-4  items-center">
                  <h5 className=" text-white poppins6 bg-redish xl:h-[56px] h-[30px] xl:w-[56px] w-[30px] rounded-full flex items-center justify-center xl:text-[25px]">
                    3
                  </h5>
                  <span className="text-white poppins6 xl:text-[36px]">
                    The future
                  </span>
                </h3>
                <p className=" poppins3 mt-8 xl:text-[20px] text-white/90">
                  If people enjoy playing the game and find it useful, we’ll
                  update it, fix any glitches and keep it going for other
                  elections.{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* DESIGNED SEC  */}

      <div className="board relative  py-[100px]">
        <div className="board-content resp w-10/12 m-auto">
          <h2 className="  text-redish orbit9 text-center xl:text-[50px]  xl:w-[70%] m-auto">
            Who designed and built
            <br /> The <span className="text-[#fff]">White House</span> Game?
          </h2>
          <p className="poppins3 text-white/90 xl:text-[20px] text-center xl:w-[70%] m-auto mt-8">
            The game was designed and built by{" "}
            <span>
              <a
              target="_blank"
                href="https://abacusmultimedia.com/"
                className="poppins6 hover:underline"
              >
                Abacus Multimedia{" "}
              </a>
              
            </span>{" "}
            as an example of what we can do. We have a team of skilled graphic designers and our own frontend and backend development teams, SEO technicians, in-house language translators and digital content creators.
            
            
          </p>
          <p className="poppins3 text-white/90 xl:text-[20px] text-center mt-3">If you need an App or Website built on any budget, <span className="cursor-pointer poppins6 hover:underline" onClick={()=>navigate("/contact")}>contact us.</span></p>
        </div>
      </div>

      {/* KNOW TWHG SEC  */}
      <div className="bg-[#1c2452] py-[100px]">
        <div className="resp w-10/12 m-auto">
          <h2 className="orbit9 text-center xl:text-[50px] text-white xl:w-[70%] m-auto">
            What to know about
            <br /> The White House Game
          </h2>
          <div className="flex flex-wrap justify-between mt-8 gap-5">
            <div className="bg-white flex items-start gap-4 xl:w-[48%] rounded-[46.69px] p-[23.35px] mt-3">
              <img
                src={smile}
                className="w-[30px] h-[30px] xl:w-auto xl:h-auto"
                alt=""
              />
              <div className="content">
                <h5 className="poppins6 text-[#333333] xl:text-[30px]">
                  Why isn’t it free?
                </h5>
                <p className="mt-4 poppins4 text-[#333333] xl:text-[19.45px]">
                To pay for development and maintenance costs without advertising and to discourage fake account we charge a membership fee of USD$1.49.
                </p>
              </div>
            </div>
            <div className="bg-white flex items-start gap-4 xl:w-[48%] rounded-[46.69px] p-[23.35px] mt-3">
              <img
                src={verify}
                className="w-[30px] h-[30px] xl:w-auto xl:h-auto"
                alt=""
              />
              <div className="content">
                <h5 className="poppins6 text-[#333333] xl:text-[30px]">
                  Which party do we support?
                </h5>
                <p className="mt-4 poppins4 text-[#333333] xl:text-[19.45px]">
                We don’t support any party or candidates and go to great lengths to be fair and impartial.
                </p>
              </div>
            </div>
            <div className="bg-white flex items-start gap-4 xl:w-[48%] rounded-[46.69px] p-[23.35px] mt-3">
              <img
                src={foriegn}
                className="w-[30px] h-[30px] xl:w-auto xl:h-auto"
                alt=""
              />
              <div className="content">
                <h5 className="poppins6 text-[#333333] xl:text-[30px]">
                  Can foreigners play the game?
                </h5>
                <p className="mt-4 poppins4 text-[#333333] xl:text-[19.45px]">
                  Yes, but we don’t use non-US players opinions for certain
                  results.
                </p>
              </div>
            </div>
            <div className="bg-white flex items-start gap-4 xl:w-[48%] rounded-[46.69px] p-[23.35px] mt-3">
              <img
                src={play}
                className="w-[30px] h-[30px] xl:w-auto xl:h-auto"
                alt=""
              />
              <div className="content">
                <h5 className="poppins6 text-[#333333] xl:text-[30px]">
                  Can I play more than once?
                </h5>
                <p className="mt-4 poppins4 text-[#333333] xl:text-[19.45px]">
                  Yes. If you change your opinions, Log In and update your vote.
                </p>
              </div>
            </div>
          </div>
        </div>
        <DownloadApp />
      </div>
    </div>
  );
}

export default About;
