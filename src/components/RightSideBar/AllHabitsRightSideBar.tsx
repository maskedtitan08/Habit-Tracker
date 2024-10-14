import React from 'react'
import { UserButton } from '@clerk/nextjs'
import { useUser } from '@clerk/nextjs'
import MainStatistics from '../MainStatistics'
import Calendar from '../Calendar'
import { useGlobalContextProvider } from "@/contextAPI"
import { defaultColor,darkModeColor } from "../../../color"


const AllHabitsRightSideBar = () => {
    const {darkModeObject} = useGlobalContextProvider();
    const {isDarkMode} = darkModeObject;
  return (
    <div
    style={{
        color: isDarkMode ? darkModeColor.textColor : defaultColor.textColor,
        backgroundColor: isDarkMode ? darkModeColor.background : defaultColor.background
    }} 
    className='flex flex-col items-center bg-slate-100 rounded-lg p-2'>
        <UserProfile />
        <MainStatistics/>
        <Calendar/>
    </div>
  )
}

export default AllHabitsRightSideBar

const UserProfile = () => {
    const userButtonAppearance = {
        elements : {
            userButtonAvatarBox : "w-14 h-14",
            userButtonPopoverActionButton : "text-red-600",
        }
    }

    const {user} = useUser();
    return (
        <div className='flex flex-col gap-3 items-center justify-center mt-8 max-lg:hidden'>
            <UserButton appearance={userButtonAppearance} />
            <div>
                <span> {user?.fullName} </span>
            </div>

        </div>
    )
}