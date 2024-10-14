import { faCode, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Checkbox, IconButton } from "@mui/material"
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import { useGlobalContextProvider } from "@/contextAPI"
import { defaultColor, darkModeColor } from "../../../color"


const HabitsContainerMiddle = () => {
    return (
        <div className='p-2'>
            <HabitCard />
            <HabitCard />
            <HabitCard />

        </div>
    )
}

const HabitCard = () => {
    const { darkModeObject } = useGlobalContextProvider();
    const { isDarkMode } = darkModeObject;
    return (
        <div className="flex p-2 items-center justify-between">
            {/**Check box Code */}
            <Checkbox
                icon={<RadioButtonUncheckedIcon />}
                checkedIcon={<CheckCircleIcon />}
                sx={{
                    color: defaultColor.default,
                    "&.Mui-checked": {
                        color: defaultColor.default,
                    },
                }}
            />

            <div
                style={{ backgroundColor: isDarkMode ? darkModeColor.backgroundSlate : defaultColor.backgroundSlate }}
                className="flex justify-between gap-2 w-full p-3 py-4 rounded-md bg-slate-100">
                <div className="w-full">

                    <div className='flex gap-2 justify-between'>
                        <div className="flex gap-2 items-center">
                            <FontAwesomeIcon icon={faCode} height={20} width={20} className='p-3 rounded-full w-4 h-4 bg-customRed text-white' />
                            <span>Habit Name</span>
                        </div>
                    </div>

                    <div className="flex gap-2 mt-2">
                        <div style={{
                            color: isDarkMode ? darkModeColor.textColor : defaultColor.default,
                            backgroundColor: isDarkMode ? defaultColor[50] : defaultColor[100],
                        }}
                            className='p-1 text-white text-[12px] rounded-md px-2'>
                            <span >Area1</span>
                        </div>
                        <div style={{
                            color: isDarkMode ? darkModeColor.textColor : defaultColor.default,
                            backgroundColor: isDarkMode ? defaultColor[50] : defaultColor[100],
                        }} className='p-1 text-white text-[12px] rounded-md px-2'>
                            <span >Area1</span>
                        </div>
                    </div>
                </div>
                <div className="w-10 flex items-center justify-center">
                    {/** 3 dot icon */}
                    {/* <FontAwesomeIcon icon={faEllipsisVertical} height={30}/> */}

                    <IconButton>
                        <MoreVertIcon sx={{color: isDarkMode ? "white" : "gray"}} />
                    </IconButton>
                </div>
            </div>
        </div>
    )
}

export default HabitsContainerMiddle