import { faArrowLeft, faArrowRight , faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import HabitsContainerMiddle from "./HabitsContainerMiddle"
import { useGlobalContextProvider } from "@/contextAPI"
import { defaultColor,darkModeColor } from "../../../color"
import { useEffect } from "react"
import { getCurrentDayName, getDateString, getFormattedDate } from "@/utils/DateFunctions"

const HabitsContainer = () => {
    const {darkModeObject} = useGlobalContextProvider();
    const {isDarkMode} = darkModeObject;
    return (
        <div
        style={{
            color: isDarkMode ? darkModeColor.textColor : defaultColor.textColor,
            backgroundColor: isDarkMode ? darkModeColor.background : defaultColor.background
        }}
        className='mt-5 bg-slate-100 rounded-md p-5 flex flex-col gap-3'>
            <HabitsContainerTop />
            <HabitsContainerMiddle />
        </div>
    )
}

export default HabitsContainer



const HabitsContainerTop = () => {
    const {habitWindowObject,selectedCurrentDayObject,offsetDayObject} = useGlobalContextProvider();
    const {openHabitWindow,setOpenHabitWindow} = habitWindowObject;
    const {selectedCurrentDate , setSelectedCurrentDate} = selectedCurrentDayObject;
    const {offsetDay,setOffsetDay} = offsetDayObject;

    type Option = "next" | "prev";
    const updateDate = (option : Option) => {
        if(option==="next"){
            setOffsetDay((prev)=>prev+1);
        }
        else if(option==="prev"){
            setOffsetDay((prev)=>prev-1);
        }
    }
    useEffect(()=>{
        setSelectedCurrentDate(getDateString(new Date(),offsetDay));
    },[offsetDay])

    return (
        <div className='p-3 flex justify-between items-center'>
            <div className="flex gap-3 items-center">
                <div>
                    <h2 className='font-bold text-lg'>{getCurrentDayName(selectedCurrentDate)}</h2>
                    <span className='font-light text-[12px]'>{getFormattedDate(selectedCurrentDate)}</span>
                </div>
                <div className="flex gap-2 ml-4">
                    <div onClick={()=> updateDate("prev")} className="text-customRed cursor-pointer">
                        <FontAwesomeIcon icon={faArrowLeft} height={15} width={15} />
                    </div>
                    <div onClick={()=> updateDate("prev")} className="text-customRed cursor-pointer">
                        <FontAwesomeIcon icon={faArrowRight} height={15} width={15} />
                    </div>
                </div>
            </div>
            <button
            onClick={()=> setOpenHabitWindow(!openHabitWindow)}
            className="flex gap-2 items-center bg-customRed p-3 text-white rounded-md text-sm">
                <FontAwesomeIcon icon={faPlus} />
                <span>New habit</span>
            </button>

        </div>
    )
}

