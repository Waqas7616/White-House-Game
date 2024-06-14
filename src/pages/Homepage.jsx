import React, { useEffect } from "react";
import Banner from "../components/banner";
import TabSection from "../components/tabsection/TabSection";
import Shop from "../components/Shop";
import DownloadApp from "../components/DownloadApp";
import { Helmet } from "react-helmet";
import ReactGA from 'react-ga4';
function Homepage() {
  useEffect(()=>{
ReactGA.pageview(window.location.pathname);
  },[])
  return (
    <div>
      <Helmet>
        <title>The White House Game | Who will run the free world?</title>
        <meta
          name="keywords"
          content="2024 Presidential election, prediction, play."
        />
        <meta
          name="description"
          content="Who runs America affects the entire world. So who wins on November 5, 2024 matters. Will Donald Trump return or will Biden surprise voters again? Can Kennedy break the two party mould?"
        />
        <meta name="language" content="en" />
      </Helmet>
      <Banner />
      <TabSection />
      <Shop />
      <DownloadApp />
    </div>
  );
}

export default Homepage;
