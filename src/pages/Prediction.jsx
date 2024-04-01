import React from 'react'
import AppBanner from '../components/appbanner/AppBanner'
import bg from '../images/predictbg.png'
import Predict from '../components/predict/Predict'
import dem from '../images/demTITLE.png'
import rep from '../images/repTITLE.png'
import ind from '../images/indTITLE.png'

function Prediction() {
    return (
        <div>
            <AppBanner redTitle={'YOUR'} bg={bg} bannerTitle={'PREDICTION'} bannerDesc={'Predict the next President of the United States and tell the world what you think!'} />
            <Predict titleImage={dem} />
            <Predict titleImage={rep} />
            <Predict titleImage={ind} />
            <div className="buttons flex items-center justify-center gap-4 xl:mt-[54px]">
                <button className="rounded-[6px] text-white"></button>
                <button className="rounded-[6px] text-white"></button>
            </div>
        </div>
    )
}

export default Prediction
