import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { defaultColor } from "../../color"
import MenuSelection from "./MenuSelection"
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons"
import { SignOutButton } from "@clerk/nextjs"
import { useUser } from "@clerk/nextjs"

const Sidebar = () => {
    const { user } = useUser();
    return (
        <div className="border-r-2 h-screen p-10">
            <div className="text-center sm:text-left mb-7 sm:mb-0 ">
                <div className="flex gap-2 items-center sm:justify-start justify-center">
                    <span className="text-2xl font-light flex items-center gap-2">
                        <div className="p2 rounded-md">
                            {/* Icon Code */}
                        </div>
                        <span style={{ color: "#d90429" }} className="font-bold text-mainColor" >Habit</span>
                        <span className="font-light">Tracker</span>
                    </span>
                </div>
            </div>
            <MenuSelection />
            <div className="mt-12">
                <div>Hello! {user?.firstName} {user?.lastName} </div>
                <div className="flex gap-2 items-center ml-8 p-2 hover:text-customRed transition-all">
                    <FontAwesomeIcon width={20} height={20} icon={faRightFromBracket} />
                    <div> <SignOutButton /> </div>
                </div>
            </div>

        </div>
    )
}

export default Sidebar