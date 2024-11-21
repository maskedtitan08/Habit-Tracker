import { Checkbox, IconButton } from "@mui/material"
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import { faCode, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { defaultColor, darkModeColor } from "../../../color"
import {v4 as uuidv4} from "uuid";
import { HabitType } from '@/Types/GlobalTypes'
import { useGlobalContextProvider } from "@/contextAPI"
import React, { useEffect, useState } from 'react'



const HabitCard = ({ singleHabit }: { singleHabit: HabitType }) => {
    const { darkModeObject , allHabitsObject,selectedCurrentDayObject} = useGlobalContextProvider();
    const { isDarkMode } = darkModeObject;
    const {allHabits,setAllHabits} = allHabitsObject;
    const { selectedCurrentDate } = selectedCurrentDayObject;

    const [checked , setChecked] = useState(singleHabit.completedDays.some((day)=>day.date === selectedCurrentDate));

    const handleClickedCheckbox = (event : React.ChangeEvent<HTMLInputElement>) => {
        const checked = event.target.checked;
        setChecked(checked);

        if(checked) checkHabit();
        else uncheckHabit();
    }

    const checkHabit = () => {
        const completedDay = {
            _id:uuidv4(),
            date:selectedCurrentDate,
        }
        const updatedHabits : HabitType = {...singleHabit,completedDays: [...singleHabit.completedDays , completedDay]}
        const updateAllHabits:HabitType[] = allHabits.map((habit)=> {
            if(habit._id === updatedHabits._id) return updatedHabits;
            else return habit;
        })
        setAllHabits(updateAllHabits);
    }

    const uncheckHabit = () => {
        const updatedHabits:HabitType = {...singleHabit , completedDays : singleHabit.completedDays.filter((day)=>day.date !== selectedCurrentDate)}
        const updateAllHabits:HabitType[] = allHabits.map((habit)=> {
            if(habit._id === updatedHabits._id) return updatedHabits;
            else return habit;
        })
        setAllHabits(updateAllHabits);
    }
    useEffect(()=>{
        const isCompleted = singleHabit.completedDays.some((day)=>day.date === selectedCurrentDate);
        setChecked(isCompleted);
    },[singleHabit,selectedCurrentDate,allHabits]);
    return (
        <div className="flex p-2 items-center justify-between">
            {/**Check box Code */}
            <Checkbox
                icon={<RadioButtonUncheckedIcon />}
                checkedIcon={<CheckCircleIcon />}
                checked={checked}
                onChange={handleClickedCheckbox}
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
                            <span>{singleHabit.name}</span>
                        </div>
                    </div>

                    <div className="flex gap-2 mt-2">
                        {singleHabit?.areas.map((singleArea, index) => (
                            <div style={{
                                color: isDarkMode ? darkModeColor.textColor : defaultColor.default,
                                backgroundColor: isDarkMode ? defaultColor[50] : defaultColor[100],
                            }}
                                key={index}
                                className='p-1 text-white text-[12px] rounded-md px-2'>
                                <span >{singleArea.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="w-10 flex items-center justify-center">
                    <IconButton>
                        <MoreVertIcon sx={{ color: isDarkMode ? "white" : "gray" }} />
                    </IconButton>
                </div>
            </div>
        </div>
    )
}

export default HabitCard