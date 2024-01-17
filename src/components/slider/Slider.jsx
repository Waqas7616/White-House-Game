import React, { useState, useEffect } from 'react'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { firestore } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';
import obama from '../../images/Condidates/Barak Obama (Dem).jpg'
import sander from '../../images/Condidates/Bernie Sanders (Dem).jpg'
import cornel from '../../images/Condidates/Cornel West.jpg'
import dean from '../../images/Condidates/Dean Phillips (Dem).jpg'
import doug from '../../images/Condidates/Doug Burgum (Rep).jpg'
import elon from '../../images/Condidates/Elon Musk.jpg'
import suares from '../../images/Condidates/Francis Suares (Rep).jpg'
import newsom from '../../images/Condidates/Gavin Newsom (Dem).jpg'
import hillary from '../../images/Condidates/Hillary Clinton (Dem).jpg'
import jill from '../../images/Condidates/Jill Stein (Ind).jpg'
import biden from '../../images/Condidates/Joe Biden (Dem).jpg'
import rogan from '../../images/Condidates/Joe Rogan.jpg'
import kamala from '../../images/Condidates/Kamala Harris (Dem).jpg'
import kanye from '../../images/Condidates/Kanye West.jpg'
import williamson from '../../images/Condidates/Marianne Williamson (Dem).jpg'
import megan from '../../images/Condidates/Megan Markle.jpg'
import michelle from '../../images/Condidates/Michelle Obama (Dem).jpg'
import oprah from '../../images/Condidates/Oprah Winfrey.jpg'
import perry from '../../images/Condidates/Perry Johnson (Rep).jpg'
import kennedy from '../../images/Condidates/Robert F. Kennedy (Ind).jpeg'
import santos from '../../images/Condidates/Ron De Santos (Rep).jpg'
import scott from '../../images/Condidates/Tim Scott (Rep).jpg'
import tucker from '../../images/Condidates/Tucker Carlson.jpeg'
import tulsi from '../../images/Condidates/Tulsi Gabbard (Ind).jpg'
import CandidatePopup from '../Popup';


function CustomSlider() {
    const [data, setData] = useState([]);
    const [popupCandidate, setPopupCandidate] = useState(null)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const collectionRef = collection(firestore, 'candidates');
                const snapshot = await getDocs(collectionRef);

                const fetchedData = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),

                }));
                setData(fetchedData);
                console.log('kdasjfkdsjfla', fetchedData)

            } catch (error) {
                console.log('Error fetching Data:', error)
            }
        };
        fetchData();
        console.log('My data is :', data)

    }, [])
    const handleCandidateClick = (index) => {
        setPopupCandidate(index);
    };

    const handlePopupClose = () => {
        setPopupCandidate(null);
    };

    const CustomNextArrow = (props) => (
        <div
          {...props}
          className="absolute top-[10%] right-[4%] transform cursor-pointer"
        >
          <span className="text-2xl">
          <svg xmlns="http://www.w3.org/2000/svg" width="90" height="91" viewBox="0 0 90 91" fill="none">
        <g filter="url(#filter0_d_49_552)">
          <rect x="25" y="25" width="40" height="41" rx="10" fill="url(#paint0_linear_49_552)"/>
        </g>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M41.2998 37.2391C41.4615 37.0856 41.6758 37 41.8987 37C42.1216 37 42.336 37.0856 42.4976 37.2391L49.5036 44.0004C49.6605 44.1495 49.7853 44.3288 49.8707 44.5277C49.956 44.7265 50 44.9406 50 45.1569C50 45.3733 49.956 45.5873 49.8707 45.7862C49.7853 45.985 49.6605 46.1644 49.5036 46.3134L42.4469 53.1247C42.1196 53.4397 41.5895 53.4437 41.2573 53.1328C41.1769 53.0588 41.1125 52.969 41.0683 52.869C41.024 52.769 41.0008 52.661 41 52.5517C40.9993 52.4423 41.021 52.334 41.0638 52.2334C41.1067 52.1328 41.1697 52.0421 41.2491 51.9669L47.7069 45.7349C47.7854 45.6604 47.8479 45.5707 47.8906 45.4713C47.9333 45.3718 47.9553 45.2647 47.9553 45.1565C47.9553 45.0483 47.9333 44.9412 47.8906 44.8417C47.8479 44.7423 47.7854 44.6526 47.7069 44.5781L41.3007 38.3951C41.2222 38.3207 41.1597 38.231 41.117 38.1317C41.0743 38.0323 41.0523 37.9253 41.0523 37.8171C41.0523 37.7089 41.0743 37.6019 41.117 37.5025C41.1597 37.4032 41.2214 37.3135 41.2998 37.2391Z" fill="white"/>
        <defs>
          <filter id="filter0_d_49_552" x="0" y="0" width="90" height="91" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <feOffset/>
            <feGaussianBlur stdDeviation="12.5"/>
            <feComposite in2="hardAlpha" operator="out"/>
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/>
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_49_552"/>
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_49_552" result="shape"/>
          </filter>
          <linearGradient id="paint0_linear_49_552" x1="25" y1="48.78" x2="65" y2="48.78" gradientUnits="userSpaceOnUse">
            <stop stop-color="#ED1C24"/>
            <stop offset="1" stop-color="#1C2452"/>
          </linearGradient>
        </defs>
      </svg>
          </span>
        </div>
      );
      
      const CustomPrevArrow = (props) => (
        <div
          {...props}
          className="absolute top-[10%] left-[-3%] z-50 transform translate-y-2 cursor-pointer"
        >
          <span className="text-2xl ">
          <svg xmlns="http://www.w3.org/2000/svg" width="90" height="91" viewBox="0 0 90 91" fill="none">
        <g >
          <g filter="url(#paint0_linear_49_552)">
            <rect x="25" y="25" width="40" height="41" rx="10" fill="url(#paint0_linear_49_552)"/>
          </g>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M49.7002 37.2391C49.5385 37.0856 49.3242 37 49.1013 37C48.8784 37 48.664 37.0856 48.5024 37.2391L41.4964 44.0004C41.3395 44.1495 41.2147 44.3288 41.1293 44.5277C41.044 44.7265 41 44.9406 41 45.1569C41 45.3733 41.044 45.5873 41.1293 45.7862C41.2147 45.985 41.3395 46.1644 41.4964 46.3134L48.5531 53.1247C48.8804 53.4397 49.4105 53.4437 49.7427 53.1328C49.8231 53.0588 49.8875 52.969 49.9317 52.869C49.976 52.769 49.9992 52.661 50 52.5517C50.0007 52.4423 49.979 52.334 49.9362 52.2334C49.8933 52.1328 49.8303 52.0421 49.7509 51.9669L43.2931 45.7349C43.2146 45.6604 43.1521 45.5707 43.1094 45.4713C43.0667 45.3718 43.0447 45.2647 43.0447 45.1565C43.0447 45.0483 43.0667 44.9412 43.1094 44.8417C43.1521 44.7423 43.2146 44.6526 43.2931 44.5781L49.6993 38.3951C49.7778 38.3207 49.8403 38.231 49.883 38.1317C49.9257 38.0323 49.9477 37.9253 49.9477 37.8171C49.9477 37.7089 49.9257 37.6019 49.883 37.5025C49.8403 37.4032 49.7786 37.3135 49.7002 37.2391Z" fill="white"/>
        </g>
        <defs>
          <filter id="filter0_d_49_549" x="0" y="0" width="90" height="91" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <feOffset/>
            <feGaussianBlur stdDeviation="12.5"/>
            <feComposite in2="hardAlpha" operator="out"/>
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/>
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_49_549"/>
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_49_549" result="shape"/>
          </filter>
        </defs>
      </svg>
          </span>
        </div>
      );

    const [extended, setExtended] = useState(false);
    const handleExtention = () => {
        setExtended(!extended);
        console.log(extended)
    }
    const settings = {
        arrows: true,
        infinite: true,
        speed: 500,
        slidesToShow: 7,
        slidesToScroll: 1,
        // className: "center",
        // centerMode: true,
        // centerPadding: "10px",
        nextArrow: <CustomNextArrow />,
        prevArrow: <CustomPrevArrow />,
    }

    const candidateData = [
        { name: 'Barak Obama', image_url: obama },
        { name: 'Bernie Sanders', image_url: sander },
        { name: 'Cornel West', image_url: cornel },
        { name: 'Dean Phillips', image_url: dean },
        { name: 'Doug Burgum', image_url: doug },
        { name: 'Elon Musk', image_url: elon },
        { name: 'Francis Sures', image_url: suares },
        { name: 'Gevin Newsom', image_url: newsom },
        { name: 'Hillary Clinton', image_url: hillary },
        { name: 'Jill Stein', image_url: jill },
        { name: 'Joe Biden', image_url: biden },
        { name: 'Joe Rogan', image_url: rogan },
        { name: 'Kamala Harris', image_url: kamala },
        { name: 'Kanye West', image_url: kanye },
        { name: 'Marianne Williamson', image_url: williamson },
        { name: 'Megan Markle', image_url: megan },
        { name: 'Michelle Obama', image_url: michelle },
        { name: 'Oprah Winfrey', image_url: oprah },
        { name: 'Perry Jhonson', image_url: perry },
        { name: 'Robert F. Kennedy', image_url: kennedy },
        { name: 'Ron De Santos', image_url: santos },
        { name: 'Tim Scott', image_url: scott },
        { name: 'Tucker Carlson', image_url: tucker },
        { name: 'Tulsi Gabbard', image_url: tulsi },

    ]
    return (
        <>
            <div className='CondidateList-section py-5'>
                <div className="titles flex justify-between items-center w-10/12 m-auto">
                    <h1 className='orbit9 text-blackColor text-[37px]' >Candidates List</h1>
                    <h2 className='orbit7 text-redish uppercase text-[16px] cursor-pointer' onClick={handleExtention}>{extended ? 'see less' : 'see all'}</h2>
                </div>
                <div className="candidatesList  w-10/12 m-auto mt-8 relative">
                    {!extended ? <Slider {...settings}>
                        {candidateData.map((item, index) => (
                            <div key={index} className="candidate flex flex-col items-center justify-between gap-[10px] " onClick={() => handleCandidateClick(index)}>
                                <div className="image w-[116px] h-[116px] rounded-[50%]  flex">
                                    <img className=' w-[116px] h-[116px] rounded-[50%] object-cover' src={item.image_url} alt="" />
                                </div>
                                <h5 className='poppins5 text-[17px] text-blackColor'>{item.name}</h5>
                            </div>
                        ))}

                    </Slider> : <div className='flex flex-wrap justify-center gap-12'>
                        {candidateData.map((item, index) => (
                            <div key={index} className="candidate flex flex-col items-center justify-between gap-[10px]">
                                <div className="image w-[116px] h-[116px] rounded-[50%]  flex">
                                    <img className=' w-[116px] h-[116px] rounded-[50%] object-fit' src={item.image_url} alt="" />
                                </div>
                                <h5 className='poppins5 text-[17px] text-blackColor'>{item.name}</h5>
                            </div>
                        ))}
                    </div>}

                </div>
            </div>
            {popupCandidate !== null && (
            <div onClick={console.log('Popup Candidate Index:', popupCandidate)}> <CandidatePopup
                    candidateIndex={data[popupCandidate]}
                    onClose={handlePopupClose}
                    data={data}
                /></div>
               
              
            )}
        </>

    )
}

export default CustomSlider
