import { defaultColor, darkModeColor } from '../../../color'
import { useGlobalContextProvider } from "@/contextAPI"
import HabitCard from './HabitCard'



const HabitsCompleted = () => {
    const { darkModeObject, allFilteredHabitsObject, selectedCurrentDayObject } = useGlobalContextProvider();
    const { allFilteredHabits } = allFilteredHabitsObject;
    const { selectedCurrentDate } = selectedCurrentDayObject;
    const { isDarkMode } = darkModeObject;
    const areAllHabitsNotCompleted = allFilteredHabits.every((habit) => {
        return !habit.completedDays.some((day) => day.date === selectedCurrentDate)
    })
    return (
        <div
            style={{
                color: isDarkMode ? darkModeColor.textColor : defaultColor.textColor,
                backgroundColor: isDarkMode ? darkModeColor.background : defaultColor.background
            }} className='bg-slate-100 mt-7 p-8 rounded-md'>
            <span className='font-bold text-lg mb-2'>Habits Completed</span>
            <div className='mt-4 opacity-50'>
                <div className='mt-10 w-full flex justify-center'>
                    {areAllHabitsNotCompleted && <p className='text-sm text-gray-500 w-72 text-center'>No habits completed today</p>}
                </div>
                {allFilteredHabits.map((singleHabit, index) => (
                    <div key={index}>
                        {singleHabit.completedDays.some((day) => day.date === selectedCurrentDate) == true && <HabitCard singleHabit={singleHabit} />}

                    </div>
                ))}
            </div>
        </div>
    )
}

export default HabitsCompleted
