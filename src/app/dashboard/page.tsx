"use client"

import LeftSidebar from "@/components/LeftSidebar";
import Areas from "@/components/Areas/Areas";
import Statistics from "@/components/Statistics/Statistics";
import AllHabits from "@/components/AllHabits/AllHabits";
import { useGlobalContextProvider } from "@/contextAPI";
import { useState, useEffect } from "react";
import { menuItemType } from "@/Types/MenuItemType";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { darkModeColor, defaultColor } from "../../../color";


const Dashboard = () => {
    const { menuItemsObject , darkModeObject } = useGlobalContextProvider();
    const {isDarkMode} = darkModeObject
    const { menuItems } = menuItemsObject;
    const [selectedMenu, setSelectedMenu] = useState<menuItemType | null>(null);
    let selectComponent = null;

    useEffect(() => {
        menuItems.map((singleItem) => {
            if (singleItem.isSelected) {
                setSelectedMenu(singleItem);
            }
        })
    }, [menuItems])

    switch (selectedMenu?.name) {
        case "All Habits":
            selectComponent = <AllHabits />
            break;
        case "Statistics":
            selectComponent = <Statistics />
            break;
        case "Areas":
            selectComponent = <Areas />
            break;
        case "All Areas":
            break;
    }

    return (
        <div
            style={{ backgroundColor: isDarkMode ? darkModeColor.backgroundSlate : defaultColor.backgroundSlate }}
            className="flex">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <LeftSidebar />
                {selectComponent}
            </LocalizationProvider>

        </div>
    )
}

export default Dashboard