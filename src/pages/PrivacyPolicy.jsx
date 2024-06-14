import React from "react";
import AppBanner from "../components/appbanner/AppBanner";
import logo from "../images/logo.png";
import Privacy from "../images/Privacy.png";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import ReactGA from 'react-ga4'
export default function PrivacyPolicy() {
  const navigate = useNavigate();
  useEffect(()=>{
    ReactGA.pageview(window.location.pathname);
      },[])
  const paragraph = [
    "1. What is policy covers",
    "1.1	The White House Game’s Privacy Policies describe how we collect, process, preserve, transfer and share our player’s and user’s personal and transactional data.",
    "1.2	These policies relate to our own platforms and do not necessarily apply to third party websites or platforms which may be partnered or linked to The White House Game, such as our shop.",
    "2.	Legal jurisdiction obligation",
    "2.1	The White House Game’s services and specific legal obligations regarding privacy differ according to the countries we operate in, where transactions take place and where our player’s reside.",
    "2.2	Consequently our policies are general in nature and may not exactly reflect every country’s legislated privacy obligations. If you have any specific questions which are not satisfactorily answered please contact The White House Game through the Contact Us page.",
    "3.	What personal data does The White House Game collect?",
    "3.1	Personal data collected by The White House Game during the account sign up process is usually a requirement in order for us to provide the information our game is designed to collect.",
    "3.2	The White House Game in most cases relies on the honesty of players to provide truthful information about themselves and/or their opinion and we typically do not investigate whether this information is true.",
    "3.3	Where The White House Game is made aware of inaccurate details contained in a member’s account we reserve the right to request it be corrected. If the member does not do so, The White House Game reserves the right to suspend or limit activity to that member until they do so.",
    "The White House Game in most cases relies on the honesty of players to provide truthful information about themselves and/or their opinion and we typically do not investigate whether this information is true.",
    "3.4	Some member information is collected primarily for marketing purposes.",
    "3.5	Most, and in many cases all personal data a customer provides us is visible by logging in to the account and is able to be edited or deleted.",
    "4.	What transactional data does Actors Index collect?",
    "4.1	Demographic and player Information is collected and recorded and associated to account data. Each time a member makes an update or carries out a transaction, a unique identification number (transaction ID) is assigned to the player and the transaction itself.",
    "4.2	Within the transaction ID we may categorise the type of transaction such as specifying the any merchants involved, category of demographic or location, types of changes etc, together with information about any financial instruments involved, (such as card or digital payment etc), device information, IP addresses involved, geolocation data and The White House Game servers used for the transaction.",
    "4.3	We may also collect timing data related to the precise time each transaction component occurred, such as time transaction carried out etc.",
    "4.4	The amount of transactional information we collect depends on the precise part of the game used, involvement of third parties, location and other factors.",
    "4.5	Where a transaction is made on behalf of someone else, we may also record specific data on that person as well; such data including, but not limited to, their name, address, contact details, amounts involved and account number.",
    "5.	Why The White House Game retains data",
    "5.1	Depending on the legal jurisdiction applying to accounts, different regulatory obligations are placed on us regarding the retention of personal data.",
    "5.2	For example in some countries we are legally obligated to preserve account data for a specific number of years. In some countries we are similarly obligated to ensure data is deleted after a specific time period.",
    "5.3	The White House Game seeks to maintain account opening data for as long as legally permitted, however transactional data we seek to delete as soon as legally permitted.",
    "5.4	The White House Game’s legal obligations relating to data retention often need to meet the requirements of multiple jurisdictions such as country of residence, the country where you opened your account, the country where transactions take place and the country where our servers processing transactions are located.",
    "6.	Social media data",
    "6.1	Some other digital payment platforms who connect their services to social media networks harvest user’s social media account’s friends and family information and gather their names, addresses and email contacts for marketing and profile purposes. The White House Game genuinely believes in privacy so does not participate in such ‘marketing’ techniques, however when we are conducting a promotion our users are free to forward our publicity material to contacts in their social media platforms, phone and email address books, if they wish to.",
    "7.	Third party information we provide",
    "7.1	Card issuers we process payments from, such as UnionPay, Visa and Mastercard and other digital payment methods require personal information about our account holders therefore we make available to them, with our customer’s permission, information which they request.",
    "7.2	If they require additional information which The White House Game does not request as part of our account opening process, we may request it at a later date in order to satisfy their request. The White House Game has no control over how our third party associates protect our customer’s personal data which they acquire through us.",
    "8.	Information third parties provide us",
    "8.1	Third party partners of The White House Game may supply us with information we require to simplify our account opening and services provision process. Where a trusted third party has already collected and verified the information we require, they may supply it to us to reduce the necessity to duplicate the process.",
    "8.2	Where we are legally obligated to seek verification of received information we shall do so, but where we are not required to verify it we will accept it as verified.",
    "8.3	All data we collect from a third party will be identified on customer’s records as being sourced from them, rather than directly from customers.",
    "9.	Non-The White House Game customer data",
    "9.1	Visitors or users of our services, including visitors to Our Shop will have data recorded from session cookies (if we have used them) for marketing purposes only. This may include IP address, device used, record of pages visited and time spent on each page, speed of page download etc. Our usage of cookies is elaborated in our Cookies Policy.",
    "10.	How The White House Game uses personal data",
    "10.1	The White House Game’s software may use customer data to confirm and authenticate identity when at least one The White House Game member is a party involved in a transaction.",
    "10.2	We need to ensure user’s session activity is permitted according to the perimeters set in the account.",
    "10.3	Where there are two parties in a transaction we need to validate both accounts before transacting. Typically this is practically instant.",
    "10.4	Where third parties, such as debit card issuers, banks or other electronic money institutions are involved we may need to have them validate our customer’s account data before fulfilling a transaction.",
    "10.5	In some instances our customer’s credit worthiness may also need to be checked while evaluating member transactions, such as with the involvement of a card issuer, so we may supply them our customer’s personal data for these types of verification purposes.",
    "11.	Marketing data",
    "11.1	The White House Game analyses customer data for internal marketing purposes to develop improvements and to correctly target promotional advertisements.",
    "11.2	Typically we aggregate data to understand user behaviour so we can improve functionality of our game.",
    "11.3	Additionally to improve the relevance of advertising and search result we will analyse our customer’s personal data to determine visibility of advertising, suitability of promotions and to potentially enhance screen display.",
    "11.4	We also use customer data to localise services and to ensure they are in the correct language.",
    "11.5	The White House Game’s use of cookies and tracking technologies for marketing purposes is laid out in our Cookies Policies.",
    "11.6	The White House Game may aggregate statistical data for third party marketing use as well. Such data may include business related and transactional activity of our customers, how customers interact with our platform and services etc.",
    "11.7	Aggregated data typically does not identify specific customers.",
    "12.	Profile building",
    "12.1	To allow The White House Game to suggest appropriate services to customers, to localise functionality and to help us make visible potentially interesting we may analyse customer transaction history and personal data.",
    "12.2	Additionally where customers permit us to access their computer’s mailing lists or mobile device’s address book in the course of performing a transaction, we may store or use this data to help facilitate future repeat transactions.",
    "12.3	Information stored may include usernames, mobile numbers and email addresses.",
    "13.	Security data for fraud prevention",
    "13.1	Security related information may be collected from customer accounts. As part of our illegal activity detection responsibilities we may seek to look for patterns of potentially illegal or fraudulent behaviour.",
    "13.2	If we suspect a user is involved in illegal activity we are likely to link accounts they transact with in connection to an investigation of the suspect, rather than innocent parties.",
    "13.3	We use personal data, device information, IP address and technical usage date together with geolocation information to profile and detect fraudulent activity and platform abuse.",
    "13.4	Customers may be innocently involved, such as through submitting applications to someone suspected of fraud; consequently your information may be collected in relations to them.",
    "13.5	The White House Game’s Cookies Policy is the same as Abacus Multimedia’s Cookies Policy, unless a different one is created.",
    "14.	Who The White House Game shares data with",
    "14.1	Where customers apply for third party services through the The White House Game platform it is part of the approval process for us to pass the applicant’s personal information to them.",
    "14.2	Other companies who may be involved in the delivery of services on behalf of The White House Game such as payment processing providers may be given customer’s personal information and data to allow them to carry out their The White House Game specified task, such as completing a transaction.",
    "14.3	The White House Game is legally obligated to provide customer information and data to law enforcement officials, who possess the authority to demand such information.",
    "14.4	The White House Game will also share personal information to appropriate parties who are in possession of a court order demanding that.",
    "14.5	Parties with a court order are not necessarily a law enforcement agency.",
    "14.6	Where The White House Game has partnered with another company or organisation to jointly launch a service or product we may provide this partner with personal and transactional and/or account data for strictly defined purposes.",
    "14.7	Other organisations or platforms who send or request information from our members may be provided with sufficient information in order to carry out the transaction. This is done to correctly identify customers and their account.",
    "14.8 	The other transactional party may retain sufficient information about our customer to safeguard themselves against disputes and to detect potential fraud or illegal activity.",
    "14.9	Third parties may also collect analytical data about our customers and transactions they are parties to, for performance and marketing purposes.",
    "15.	The White House Game’s voluntary disclosure",
    "15.1	There may be cases when The White House Game has reason to believe our platform is at financial or security risk from the actions or intentions of one or more account holders which may become apparent in transactional data.",
    "15.2	The White House Game reserves the right to determine at our sole discretion what constitutes a potential financial or security risk.",
    "15.3	In the interests of preventing our platform from suspected malevolent actions or intentions The White House Game may voluntarily disclose the suspected party’s personal and transactional data to investigators or law enforcement agencies.",
    "15.4	The White House Game may also disclose personal and transactional data for auditing, compliance, and corporate governance purposes.",
    "16.	Linked services",
    "16.1	Our members can link social media or other digital services to their The White House Game profiles without the account holder’s authorisation.",
    "16.2	During the process The White House Game may receive and also display the linked information.",
    "16.3	The White House Game members are advised to read the Privacy Policies of these social media or other digital service partners before linking them to their The White House Game profiles as we typically have no influence over how they use our customer’s personal and transactional data.",
    "17.	Privacy options on The White House Game",
    "17.1	Many services can only be provided by The White House Game to customers upon receipt of their personal data so when account holders choose to not provide it, they are likely to be unable to use those services.",
    "17.2	Members who wish to conceal their location may have the ability to restrict geolocation which will affect our data collection but typically this depends upon the device being used to access the The White House Game account.",
    "17.3	The location of our customers is important in determining which services are available so functionality of our site is connected to location.",
    "17.4	Customers choosing to deactivate geolocation features should refer to their device’s instruction manual.",
    "18.	How The White House Game protects data",
    "18.1	The White House Game software has been designed in-house and has minimal, if any, input from outside software developers.",
    "18.2	As a result our software has been developed in such a way as to prevent third parties from creating ‘back doors’ to our programs.",
    "18.3	Additionally rather than using partner or outsourced servers we host our platform on our own computer hardware under our control. Our servers are located with GoDaddy, which we believe to be in Arizona, USA.",
    "18.4	Customers in countries where it is a legal requirement to host personal data within the country, may have their own servers located in that country.",
    "18.5	Our parent company who created this game, app and website - Abacus Multimedia is responsible for securing our digital assets.",
    "18.6	Abacus Multimedia construct and maintain our platforms and swiftly react to any potential security breaches.",
    "18.7	Abacus Multimedia employ data encryption, firewalls and information access authorisation protocols.",
    "18.8	The White House Game is concerned with software performance. Abacus Multimedia has cyber crime technicians who monitor, detect and eliminate threats while also maintaining the integrity of the The White House Game network by monitoring customer activity and transactional data.",
    "18.9	Consequently we are vigilant regarding physical security, technical security and legal security, all designed to protect our network from malicious activity, misuse and unauthorised account access and disclosure, or interference with our customer’s personal and transactional data.",
    "18.10	The protection of account registration information, verification and log in information such as passwords is given the highest priority.",
    "19.	Age restriction",
    "19.1	The White House Game’s game and services may be age restricted through two limitations; firstly we comply with the laws of countries our members live in. Consequently if a player lives in a country were services have an age restriction, we abide by this rule.",
    "19.2	In countries with no age restrictions, The White House Game has its own age restriction of 12 years old.",
    "19.3	When we discover an account applicant has applied for an account and is below the age limit, The White House Game shall promptly delete all personal data and any supporting ID documentation submitted with the application.",
    "19.4	The White House Game shall only preserve data related to under age customers or applicants who have mistakenly or erroneously applied for services if we are legally obligated to retain copies of that information.",
    "20.	International transfer of data",
    "20.1	One condition of use is that The White House Game customers give permission for their personal and transactional data to potentially be transferred, stored, processed, used and accessed in different countries whose law enforcement or financial regulatory authorities may claim jurisdiction over it.",
    "20.2	Because of this, as a privacy protection measure The White House Game has deliberately selected an internet service provider whose servers have strong privacy protections.",
    "21.	Notifiable Data Breaches (NDB)",
    "21.1	If The White House Game does experience an illegal security breach, such as resulting from a malicious cyber attack or hacking and the seriousness of this justifies it being regarded as a notifiable data breach then The White House Game shall take immediate steps to inform affected customers and law enforcement or government regulatory authorities in relevant legal jurisdictions.",
    "21.2	Additionally we shall take immediate steps to repair any software or hardware damage and where appropriate inform customers what steps we have or are making.",
    "21.3	Where necessary The White House Game shall instruct affected or potentially affected customers on steps they should take as security precautions, such as changing passwords.",
    "21.4	In exceptional circumstances as a warning to others, The White House Game may contact the media to discuss a notifiable data breach.",
    "22.	European Union (EU)",
    "22.1	For The White House Game members whose place of residence or business is the EU, or for customers transacting using our platform while in the EU, or customers transacting with another The White House Game member who is EU based, then the General Data Protection Regulation (GDPR) applies to them and the transaction.",
    "23.	Australia",
    "23.1	The White House Game’s Australian based players or transactions involving Australian parties, or conducted in Australia may be subject to the following Australian legislation which we abide by; the Privacy Act 1988 (Commonwealth) and the Spam Act 2007 (Commonwealth).",
    "24.	Privacy Policy updates",
    "24.1	The White House Game revises all its legal policies, including this one when circumstances and the law require.",
    "24.2	Each revised policy shall replace the old one and come into effect when it is posted on our platform with its effective date shown",
    "25.	Privacy complaints",
    "25.1	If there is something you are unhappy with about our Privacy Policies you can contact us by lodging a dispute. Before making your complaint we invite you to read our policies and FAQ as it is likely an answer may be there.",
    "25.2	If you wish to raise an issue concerning a potential breach of privacy resulting from illegal access to your account contact The White House Game via our Contact Us page.",
    "25.3	Depending on the nature of your complaint, in many countries if you feel your legally protected privacy rights have been violated, then there are formal avenues you may be able to pursue.",
  ];
  return (
    <>
      <div className=" h-screen">
      <Helmet>
        <title>The White House Game | Privacy Policy</title>
        <meta
          name="keywords"
          content="privacy policy, data protection, legal, white house game"
        />
        <meta
          name="description"
          content="Your data is important and we genuinely believe in protecting our player’s information from snooping and hacking, including that done by government agencies."
        />
        <meta name="language" content="en" />
      </Helmet>
        <AppBanner
          bannerTitle={"Policies"}
          redTitle={"Privacy "}
          bg={Privacy}
          bannerDesc={
            "Protecting our player’s private data is important to us.."
          }
        />
        <div className="w-10/12 m-auto resp ">
          <div className="text-[#fff] text-[14px] sm:text-[36px] xl:text-[56px] orbit7 w-[200px] sm:w-[475px] md:w-[472px] lg:w-[576px] xl:w-[742px] mt-16 mb-5 m-auto text-center">
            The White House Game Privacy Policies
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
                  className={`mb-9 text-[14px] lg:text-[18px] xl:text-[24px] ${
                    /^[0-9]+\.\s/.test(item)
                      ? "poppins6"
                      : "poppins4"
                  }`}
                >
                  {item}
                </li>
              ))}
            </ul>

            <div className="my-5 pl-5">
              <p className="text-white pt-3 text-[16px] lg:text-[24px] poppins4">
                The White House Game Privacy Policies
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
