import React from 'react'
import { defaultColor,darkModeColor } from '../../color'
import CircularProgressBar from './CircularProgressBar'
import { useGlobalContextProvider } from "@/contextAPI"



const MainStatistics = () => {
    const {darkModeObject} = useGlobalContextProvider();
    const {isDarkMode} = darkModeObject;
    const statisticsInfo = [
        { id: 1, num: 7, subTitle: "Best Streaks" },
        { id: 2, num: 10, subTitle: "Perfect Days" },
    ];
    return (
        <div 
        style={{ backgroundColor: isDarkMode ? darkModeColor.backgroundSlate : defaultColor.backgroundSlate }}
        className='flex mx-4 flex-col gap-5 justify-center items-center mt-14 bg-gray-400 rounded-xl p-5 pt-7'>
            <span className='font-bold text-xl cursor-pointer hover:text-customRed'>
                Statistics
            </span>

            <div className="relative pt-3">
                <CircularProgressBar progress = {89}/>
                <div className="flex flex-col justify-center items-center absolute top-[54%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
                    <span className='font-bold text-xl text-customRed'>89%</span>
                    <span className='text-[11px]'> {`Today's Progress`} </span>
                </div>
            </div>

            <div className="my-4 flex justify-center gap-6 flex-wrap items-center w-full">
                {statisticsInfo.map((singleItem,singleItemIndex) => (
                    <div className="flex items-center gap-2" key={singleItemIndex}>
                        <div className="w-2 h-2 bg-customRed rounded-full"></div>
                        <div className='text-[12px]'>
                            <span className='flex flex-col font-bold'> {singleItem.num} </span>
                            <span className='text-gray-600'> {singleItem.subTitle}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MainStatistics