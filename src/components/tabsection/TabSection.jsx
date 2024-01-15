import React, { useState } from 'react'
import stats from '../../images/stats.png'
import badge from '../../images/president.png'
import ballot from '../../images/ballot.png'
import kennedy from '../../images/image 46.png'
import president from '../../images/president.png'

function TabSection() {
  const [tabs, setTabs] = useState(0);
  const [expandedVotes, setExpandedVotes] = useState(false);
  const expandVotes = () => {
    setExpandedVotes(!expandedVotes)
    console.log('votes',expandedVotes)
  }
  return (
    <div className="w-full bg-[#1c2452] py-8">
      <div className='w-10/12 m-auto '>
        <div className="flex justify-between items-center tabs py-5">
          <h2 className="tab-link text-whiteColor poppins4 relative  text-[13px] md:text-[17px] active">All</h2>
          <h2 className="tab-link text-whiteColor poppins4 relative  text-[13px] md:text-[17px]">Electoral College</h2>
          <h2 className="tab-link text-whiteColor poppins4 relative  text-[13px] md:text-[17px]">Sex</h2>
          <h2 className="tab-link text-whiteColor poppins4 relative  text-[13px] md:text-[17px]">2020 Election</h2>
          <h2 className="tab-link text-whiteColor poppins4 relative  text-[13px] md:text-[17px]">Age groups</h2>
          <h2 className="tab-link text-whiteColor poppins4 relative  text-[13px] md:text-[17px]">Ethnicity</h2>
          <h2 className="tab-link text-whiteColor poppins4 relative  text-[13px] md:text-[17px]">Country of birth</h2>
          <h2 className="tab-link text-whiteColor poppins4 relative  text-[13px] md:text-[17px]">Language</h2>
          <h2 className="tab-link text-whiteColor poppins4 relative  text-[13px] md:text-[17px]">Employment status</h2>
          <h2 className="tab-link text-whiteColor poppins4 relative  text-[13px] md:text-[17px]">Millitary</h2>
        </div>
        <div className="tab-content">
          <div className="all-tab-content">
            <h2 className="orbit7 mt-8 text-whiteColor text-center w-[245px] flex justify-between items-center m-auto text-[60px]"><span><img className='w-[50px]' src={stats} alt="" /> </span> stats</h2>
            <div className="search-section flex justify-between">
              <div className="badge flex items-center justify-between">
                <img src={badge} alt="" />
                <h2 className="poppins6 text-whiteColor text-[36px] ms-3">President</h2>
              </div>
              <div className="searchBar flex flex-col ">
                <label htmlFor="search ">Select State</label>
                <select name="states" id="search" className='bg-transparent border-3 border-[yellow]'>
                  <option value="ny">New york</option>
                  <option value="hst">Houston</option>
                </select>
              </div>
              <div className="votes-count flex items-center justify-between">
                <img src={ballot} alt="ballot" />
                <h2 className="poppins6 text-whiteColor text-[36px] ms-3">Votes : 245</h2>
              </div>
            </div>

            {/* STATS SECTION  */}
            <div className="stats relative py-5 px-4 bg-white/5 rounded-[10px] mt-8">
              {!expandedVotes ? <>
                <div className="voteCount flex gap-5 items-center h-[60px] bg-white/5 ">
                <div className="president-info relative bg-white px-4 w-1/4 h-full flex justify-between items-center">
                  <div className=' overflow-hidden overflow-y-hidden mb-[30px] ' ><img className='w-full h-full object-cover' src={kennedy} alt="" /></div>
                  <p className="poppins4">Robbert F. Kennedy</p>
                  <img src={president} alt="" />

                </div>
                <div className="president-votes w-3/4">
                <div class="w-full h-[31px] bg-[#454C72] rounded-full dark:bg-gray-700">
    <div class="bg-whiteColor text-xs font-medium text-black-100 h-full text-center p-0.5  leading-none rounded-[full]" style={{width: "45%"}}> 45%</div>
  </div>
                </div>
              </div>

              <div className="voteCount flex gap-5 items-center h-[60px] mt-8  bg-[#ED1C244D] ">
                <div className="president-info relative bg-redish px-4 w-1/4 h-full flex justify-between items-center">
                  <div className=' overflow-hidden overflow-y-hidden mb-[30px] ' ><img className='w-full h-full object-cover' src={kennedy} alt="" /></div>
                  <p className="poppins4 text-whiteColor">Robbert F. Kennedy</p>
                  <img src={president} alt="" />

                </div>
                <div className="president-votes w-3/4">
                <div class="w-full h-[31px] bg-[#454C72] rounded-full dark:bg-gray-700">
    <div class="bg-redish text-xs font-medium text-whiteColor h-full text-center p-0.5  leading-none rounded-[full]" style={{width: "45%"}}> 45%</div>
  </div>
                </div>
              </div>
              <button className='absolute bottom-[-20px] left-[50%]' onClick={expandVotes}><svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 72 72" fill="none">
  <circle cx="36" cy="36" r="36" fill="#272F5B"/>
  <path d="M36.4022 54.8707L27.5334 46.0019L25 48.5353L36.4022 59.9375L47.8043 48.5353L45.2709 46.0019L36.4022 54.8707Z" fill="white"/>
</svg></button></>:<><div className="voteCount flex gap-5 items-center h-[60px] bg-white/5 ">
                <div className="president-info relative bg-white px-4 w-1/4 h-full flex justify-between items-center">
                  <div className=' overflow-hidden overflow-y-hidden mb-[30px] ' ><img className='w-full h-full object-cover' src={kennedy} alt="" /></div>
                  <p className="poppins4">Robbert F. Kennedy</p>
                  <img src={president} alt="" />

                </div>
                <div className="president-votes w-3/4">
                <div class="w-full h-[31px] bg-[#454C72] rounded-full dark:bg-gray-700">
    <div class="bg-whiteColor text-xs font-medium text-black-100 h-full text-center p-0.5  leading-none rounded-[full]" style={{width: "45%"}}> 45%</div>
  </div>
                </div>
              </div>

              <div className="voteCount flex gap-5 items-center h-[60px] mt-8  bg-[#ED1C244D] ">
                <div className="president-info relative bg-redish px-4 w-1/4 h-full flex justify-between items-center">
                  <div className=' overflow-hidden overflow-y-hidden mb-[30px] ' ><img className='w-full h-full object-cover' src={kennedy} alt="" /></div>
                  <p className="poppins4 text-whiteColor">Robbert F. Kennedy</p>
                  <img src={president} alt="" />

                </div>
                <div className="president-votes w-3/4">
                <div class="w-full h-[31px] bg-[#454C72] rounded-full dark:bg-gray-700">
    <div class="bg-redish text-xs font-medium text-whiteColor h-full text-center p-0.5  leading-none rounded-[full]" style={{width: "45%"}}> 45%</div>
  </div>
                </div>
                  </div>
                  <div className="voteCount flex gap-5 items-center h-[60px] bg-white/5 mt-5">
                <div className="president-info relative bg-white px-4 w-1/4 h-full flex justify-between items-center">
                  <div className=' overflow-hidden overflow-y-hidden mb-[30px] ' ><img className='w-full h-full object-cover' src={kennedy} alt="" /></div>
                  <p className="poppins4">Robbert F. Kennedy</p>
                  <img src={president} alt="" />

                </div>
                <div className="president-votes w-3/4">
                <div class="w-full h-[31px] bg-[#454C72] rounded-full dark:bg-gray-700">
    <div class="bg-whiteColor text-xs font-medium text-black-100 h-full text-center p-0.5  leading-none rounded-[full]" style={{width: "45%"}}> 45%</div>
  </div>
                </div>
              </div>
              <button className='absolute bottom-[-20px] left-[50%]' onClick={expandVotes}><svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 72 72" fill="none">
  <circle cx="36" cy="36" r="36" fill="#272F5B"/>
  <path d="M36.4022 54.8707L27.5334 46.0019L25 48.5353L36.4022 59.9375L47.8043 48.5353L45.2709 46.0019L36.4022 54.8707Z" fill="white"/>
</svg></button></>}
              
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default TabSection
