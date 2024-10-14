import { faArrowLeft, faArrowRight , faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import HabitsContainerMiddle from "./HabitsContainerMiddle"
import { useGlobalContextProvider } from "@/contextAPI"
import { defaultColor,darkModeColor } from "../../../color"

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
    
    return (
        <div className='p-3 flex justify-between items-center'>
            <div className="flex gap-3 items-center">
                <div>
                    <h2 className='font-bold text-lg'>Weekday</h2>
                    <span className='font-light text-[12px]'>Date</span>
                </div>
                <div className="flex gap-2 ml-4">
                    <div className="text-customRed cursor-pointer">
                        <FontAwesomeIcon icon={faArrowLeft} height={15} width={15} />
                    </div>
                    <div className="text-customRed cursor-pointer">
                        <FontAwesomeIcon icon={faArrowRight} height={15} width={15} />
                    </div>
                </div>
            </div>
            <button className="flex gap-2 items-center bg-customRed p-3 text-white rounded-md text-sm">
                <FontAwesomeIcon icon={faPlus} />
                <span>New habit</span>
            </button>

        </div>
    )
}

