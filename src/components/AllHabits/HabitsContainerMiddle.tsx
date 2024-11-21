
import React, { useEffect, useState } from 'react'

import { useGlobalContextProvider } from "@/contextAPI"
import { HabitType } from '@/Types/GlobalTypes'
import { getCurrentDayName } from '@/utils/DateFunctions'
import EmptyHabitsPlaceholder from './EmptyHabitsPlaceholder'
import HabitCard from './HabitCard'
import SuccessIcon from '@/Assets/SuccessIcon'
import { defaultColor } from '../../../color'



const HabitsContainerMiddle = () => {
    const { allHabitsObject, selectedAreaStringObject, selectedCurrentDayObject,allFilteredHabitsObject } = useGlobalContextProvider();
    const { allHabits } = allHabitsObject;
    const { selectedAreaString } = selectedAreaStringObject;
    const { selectedCurrentDate } = selectedCurrentDayObject;
    const {allFilteredHabits, setAllFilteredHabits} =  allFilteredHabitsObject;

    useEffect(() => {
        const getTwoFirstDayLetter = getCurrentDayName(selectedCurrentDate).slice(0, 2);

        let filteredHabitsByArea: HabitType[] = [];
        const filteredHabitsByFrequency = allHabits.filter((habit) => {
            return habit.frequency[0].days.some((day) => day === getTwoFirstDayLetter);
        })

        if (selectedAreaString !== "All") {
            filteredHabitsByArea = filteredHabitsByFrequency.filter((habit) =>
                habit.areas.some((area) => area.name === selectedAreaString)
            )
        }
        else {
            filteredHabitsByArea = filteredHabitsByFrequency;
        }

        setAllFilteredHabits(filteredHabitsByArea);
    }, [selectedCurrentDate, allHabits, selectedAreaString])

    const isAllHabitsCompleted = allFilteredHabits.length>0 && allFilteredHabits.every((habit)=> {
        return habit.completedDays.some((day)=> day.date === selectedCurrentDate);
    })

    return (
        <div className='p-2'>
            {allFilteredHabits.length === 0 ? (
                <EmptyHabitsPlaceholder />
            ) : (
                <>
                    {isAllHabitsCompleted && (
                        <div className='flex justify-center items-center p-5 flex-col'>
                            <SuccessIcon color = {defaultColor.textColor} />
                            <span className='text-[13px] text-gray-500 w-64 text-center mt-6 '>
                                Great job! 
                                Completed all habits for today
                            </span>

                        </div>
                    )}
                    {allFilteredHabits.map((singleHabit, index) => (
                        <div key={index}>
                            {singleHabit.completedDays.some((day)=> day.date === selectedCurrentDate) == false && <HabitCard singleHabit={singleHabit} />}
                            
                        </div>
                    ))}
                </>
            )}


        </div>
    )
}

export default HabitsContainerMiddle