import React from "react";
import AppBanner from "../components/appbanner/AppBanner";
import bg from "../images/form.png";
import Shop from "../components/Shop";
import DownloadApp from "../components/DownloadApp";
import background from "../images/contactbg.png";

function Contact() {
  return (
    <div>
      <AppBanner
        bannerTitle={"US"}
        bg={background}
        redTitle={"CONTACT"}
        bannerDesc={
          "We hope you enjoyed predicting who the next President and Vice President will be in this year’s HISTORIC and EXCITING election."
        }
      />

      <div className="w-full py-[100px] bg-[#1c2452]">
        <div className="resp m-auto w-10/12">
          <h2 className="orbit9 text-center text-white xl:text-[50px]">
            Here’s how to reach us
          </h2>
          <p className="poppins4 text-white/90 xl:text-[24px] mt-6 text-center">
            FEEL FREE TO DROP US A MESSAGE
          </p>

          <div className="contact-form mt-8 flex gap-4 items-start h-[550px] mb-20 ">
            <div className="flex-1 ">
              <input
                type="text"
                placeholder="Name"
                className="outline-none border-[1.5px] border-[#dedede] rounded-[4px] px-4 py-2 w-full mt-3 text-[#757575] poppins4 text-[16px]"
              />
              <input
                type="email"
                placeholder="Email"
                className="outline-none border-[1.5px] border-[#dedede] rounded-[4px] px-4 py-2 w-full mt-3 text-[#757575] poppins4 text-[16px]"
              />
              <input
                type="text"
                placeholder="Subject"
                className="outline-none border-[1.5px] border-[#dedede] rounded-[4px] px-4 py-2 w-full mt-3 text-[#757575] poppins4 text-[16px]"
              />
              <textarea
                placeholder="Message"
                rows={12}
                className="outline-none border-[1.5px] border-[#dedede] rounded-[4px] px-4 py-2 w-full mt-3 text-[#757575] poppins4 text-[16px]"
              />
              <button className="bg-redish text-white whitespace-nowrap poppins6 xl:text-[16px] py-2 px-4 rounded-[6px] mt-10 ">
                Submit Now
              </button>
            </div>
            <div className="form-bg flex-1 w-full h-[88%] overflow-hidden py-[13px] ">
              <img className="w-full" src={bg} alt="" />
            </div>
          </div>
          <hr className="border-white/40" />
        </div>
      </div>
      <Shop />
      <DownloadApp />
    </div>
  );
}

export default Contact;
