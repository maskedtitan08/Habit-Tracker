import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import MenuSelection from "./MenuSelection"
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons"
import { SignOutButton } from "@clerk/nextjs"
import { useGlobalContextProvider } from "@/contextAPI"
import { useEffect, useRef } from "react"
import { defaultColor, darkModeColor } from "../../color"

const LeftSidebar = () => {
    const { openSideBarObject, darkModeObject } = useGlobalContextProvider();
    const { openSideBar, setOpenSideBar } = openSideBarObject;
    const { isDarkMode } = darkModeObject;
    const sideBarRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleOutsideClicked = (event: MouseEvent) => {
            if (!sideBarRef.current?.contains(event.target as Node)) {
                setOpenSideBar(false);
            }
        }
        document.addEventListener('click', handleOutsideClicked);
        return () => {
            document.removeEventListener('click', handleOutsideClicked);
        }
    }, [openSideBar]);
    return (
        <div
            style={{
                color: isDarkMode ? darkModeColor.textColor : defaultColor.textColor,
                backgroundColor: isDarkMode ? darkModeColor.background : defaultColor.background
            }}
            ref={sideBarRef} className={`${!openSideBar ? "max-xl:hidden" : "fixed shadow-lg"}  p-10 flex-grow z-50 flex-col min-h-screen transition-all bg-slate-100`}>
            <div className="text-center sm:text-left mb-7 sm:mb-0 ">
                <div className="flex gap-2 items-center sm:justify-start justify-center">
                    <span className="text-2xl font-light flex items-center gap-2">
                        <div className="p2 rounded-md">
                            {/* Logo Code */}
                        </div>
                        <span style={{ color: "#d90429" }} className="font-bold text-mainColor" >Habit</span>
                        <span className="font-light">Tracker</span>
                    </span>
                </div>
            </div>
            <MenuSelection />
            <div className="mt-12">
                <div className="flex gap-2 items-center ml-8 p-2 hover:text-customRed transition-all">
                    <FontAwesomeIcon width={20} height={20} icon={faRightFromBracket} />
                    <div> <SignOutButton /> </div>
                </div>
            </div>
        </div>
    )
}

export default LeftSidebar