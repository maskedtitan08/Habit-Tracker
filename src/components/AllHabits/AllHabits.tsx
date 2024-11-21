import React, { useEffect } from 'react'
import { UserButton, useUser } from "@clerk/nextjs"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faSearch } from '@fortawesome/free-solid-svg-icons'
import DarkMode from '../DarkMode'
import HabitsContainer from './HabitsContainer'
import HabitsCompleted from './HabitsCompleted'
import AllHabitsRightSideBar from '../RightSideBar/AllHabitsRightSideBar'
import { useGlobalContextProvider } from '@/contextAPI'
import { darkModeColor, defaultColor } from '../../../color'
import HabitWindow from './HabitWindow'
import {Toaster} from "react-hot-toast"
import AreasContainer from './AreasContainer'


const AllHabits = () => {
    return (
        <div className="max-lg:flex-col w-full flex flex-row gap-0 relative">
            <Toaster />
            <HabitWindow/>
            <div className="flex-col flex-grow m-3">
                <AllHabitsTopBar />
                <AreasContainer/>
                <HabitsContainer />
                <HabitsCompleted />
            </div>

            <AllHabitsRightSideBar />
        </div>
    )
}


const AllHabitsTopBar = () => {
    const { user } = useUser();
    const { openSideBarObject , darkModeObject } = useGlobalContextProvider();
    const {isDarkMode} = darkModeObject;
    const { openSideBar, setOpenSideBar } = openSideBarObject;
    const userButtonAppearance = {
        elements: {
            userButtonAvatarBox: "w-10 h-10",
            userButtonPopoverActionButton: "text-red-600",
        }
    }

    const openSidebarFunction = () => {
        setOpenSideBar(!openSideBar);
    }
    // Logic to close sidebar whenever whindow size is changes
    useEffect(() => {
        function handleResize() {
            setOpenSideBar(false);
        }

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        }
    }, [])

    return (
        <div
            style={{
                color: isDarkMode ? darkModeColor.textColor : defaultColor.textColor,
                backgroundColor: isDarkMode ? darkModeColor.background : defaultColor.background
            }}
            className='bg-slate-100 p-5 rounded-md flex justify-between'>

            <div className="flex gap-4">
                <div className="max-lg:flex hidden">
                    <UserButton appearance={userButtonAppearance} />
                </div>
                <div className="flex flex-col max-md:hidden">
                    <span className='text-xl'>
                        <span className='font-bold'>Hello</span>
                        <span className='font-light'>, {user?.fullName} </span>
                    </span>
                    <span className='font-light text-[12px] text-gray-400'>
                        Welcome Back!
                    </span>
                </div>
            </div>


            <div className='w-[50%] max-md:w[80%] flex gap-3 justify-between'>
                <SearchBar />
                <DarkMode />
                <FontAwesomeIcon
                    onClick={openSidebarFunction}
                    icon={faBars} className='m-2 max-xl:flex hidden mt-[12px] cursor-pointer '
                />
            </div>


        </div>
    )
}

const SearchBar = () => {
    const { darkModeObject } = useGlobalContextProvider();
    const { isDarkMode } = darkModeObject;
    return (
        <div className="w-[75%]">
            <div
                style={{ backgroundColor: isDarkMode ? darkModeColor.backgroundSlate : defaultColor.backgroundSlate }}
                className="flex gap-3 items-center p-3 bg-white rounded-3xl">
                <FontAwesomeIcon height={20} width={20} icon={faSearch} className='text-gray-500' />
                <input
                    style={{ backgroundColor: isDarkMode ? darkModeColor.backgroundSlate : defaultColor.backgroundSlate }}
                    placeholder='Search...' className='outline-none font-light text-[14px] w-full bg-white' />
            </div>
        </div>

    )
}

export default AllHabits