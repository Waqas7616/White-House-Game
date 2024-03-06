import React from 'react'
import AppBanner from '../components/appbanner/AppBanner'
import mobile from '../images/about-mobile.png'
import count1 from '../images/1.png'

function About() {
  return (
    <div>
      <AppBanner redTitle={'About'} bannerTitle={'US'} bannerDesc={'We believe the 2024 Presidential Election is the most important since 1860. The results of that election triggered a Civil War. Will this one do the same?'}/>

      {/* ABOUT SEC  */}
      <div className=" bg-[#1c2452]">
        <div className='resp about w-10/12'>
            <h2 className="text-center text-white orbit7 sm:text-[23px] xl-a:text-[38px] ">
        About THE White House Game
        </h2>
        <div className="flex ">
            <div className="flex-1">
                <img src={mobile} alt="" />
            </div>
            <div className="flex-1"> <div className="no1">
                <h3 className="flex gap-4 bg-white ">
                    <h5 className="bg-[lime] text-white poppins6 "><img src={count1} alt="" /></h5>
                    <span className="text-white poppins6 bg-[lime]">The White House Game - board game</span>
                </h3>
                <p className="text-white poppins4">
                A board game with the same name was launched for the 2004 election. The inventor created the game in Australia, had it designed in New Zealand and manufactured in the USA.
                </p>
                <hr />
            </div></div>
           
        </div>
        </div>
        
      </div>
    </div>
  )
}

export default About
