import React from 'react'
import Banner from '../components/banner'
import TabSection from '../components/tabsection/TabSection'
import Shop from '../components/Shop'
import DownloadApp from '../components/DownloadApp'

function Homepage() {
  return (
    <div>
      <Banner />
      <TabSection/>
      <Shop/>
      <DownloadApp/>
      
    </div>
  )
}

export default Homepage
