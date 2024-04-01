import React from 'react'
import question from '../../images/question.png'
// import title from '../../images/demTITLE.png'
import calender from '../../images/calender.png'
import PredictSlider from './PredictSlider'
import obama from '../../images/Condidates/Barak Obama (Dem).jpg'
import west from '../../images/Condidates/Cornel West.jpg'

function Predict({ titleImage }) {
    const data = [
        obama, west
    ]
    return (
        <div className='bg-[#1c2452] py-[100px]'>
            <div className="resp m-auto w-10/12">
                <img src={question} alt="" className="m-auto" />
                <img src={titleImage} alt="" className="m-auto mt-5" />
                <p className="poppins4 text-white text-center xl:w-[55%] xl:text-[30px] m-auto mt-5">
                    Select who you think will be the Democratic Party&apos;s Presidential candidate on
                </p>
                <p className="poppins4 text-white/80 xl:text-[22px] text-center justify-center flex items-center gap-2 m-auto mt-5">
                    <img src={calender} alt="" />
                    Tuesday, November
                    <span className="poppins5 text-white xl:text-[22px]">5, 2024</span>
                </p>
                <div className="flex gap-4 items-center justify-start w-full m-auto mt-[50px]">
                    <div className="xl:w-[562px] xl:h-[572px] m-auto ">
                        <h4 className="poppins6 text-white xl:text-[38px]">President</h4>
                        <div>
                            <PredictSlider data={data} printData={console.log('hello')} />
                        </div>
                    </div>
                    <div className="xl:w-[562px] xl:h-[572px] m-auto ">
                        <h4 className="poppins6 text-white xl:text-[38px]">Vice President</h4>
                        <div>
                            <PredictSlider data={data} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Predict
