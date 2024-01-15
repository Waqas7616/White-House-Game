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
            className="absolute top-[10%] right-[0] transform cursor-pointer"
        >
            <span
                className="text-2xl"

            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="50"
                    height="41"
                    viewBox="0 0 76 41"
                    fill="none"
                >
                    <path
                        d="M0.47876 20.5H72.9043M72.9043 20.5L51.7684 2M72.9043 20.5L51.7684 39"
                        stroke="#F69E1E"
                        stroke-width="4"
                    />
                </svg>
            </span>
        </div>
    );

    const CustomPrevArrow = (props) => (
        <div
            {...props}
            className="absolute top-[10%] right-[4%] z-50  transform translate-y-2 cursor-pointer"
        >
            <span className="text-2xl ">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="50"
                    height="27"
                    viewBox="0 0 48 27"
                    fill="none"
                >
                    <path
                        opacity=""
                        d="M47.585 13.4992L3.49985 13.4992M3.49985 13.4992L16.3652 24.9141M3.49985 13.4992L16.3652 2.08428"
                        stroke="#D1D5DB"
                        strokeWidth="4"
                    />
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
        customNextArrow: <CustomNextArrow />,
        customPrevArrow: <CustomPrevArrow />
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
            <div className='bg-[gray]'>
                <div className="titles flex justify-between items-center w-10/12 m-auto">
                    <h1 className='orbit9 text-blackColor text-[37px]' >Candidates List</h1>
                    <h2 className='orbit7 text-redish uppercase text-[16px] cursor-pointer' onClick={handleExtention}>{extended ? 'see less' : 'see all'}</h2>
                </div>
                <div className="candidatesList w-10/12 m-auto mt-8 relative">
                    {!extended ? <Slider {...settings}>
                        {candidateData.map((item, index) => (
                            <div key={index} className="candidate flex flex-col items-center justify-between gap-[10px]" onClick={() => handleCandidateClick(index)}>
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
