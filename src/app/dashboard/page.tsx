"use client"

import Sidebar from "@/components/Sidebar";
import Areas from "@/components/Areas/Areas";
import Statistics from "@/components/Statistics/Statistics";
import AllHabits from "@/components/AllHabits/AllHabits";
import { useGlobalContextProvider } from "@/contextAPI";
import { useState , useEffect} from "react";
import { menuItemType } from "@/Types/MenuItemType";

const Dashboard = () => {
    const {menuItemsObject} = useGlobalContextProvider();
    const {menuItems} = menuItemsObject;
    const [selectedMenu , setSelectedMenu] = useState<menuItemType | null>(null);
    let selectComponent = null;

    useEffect(()=> {
        menuItems.map((singleItem)=>{
            if(singleItem.isSelected){
                setSelectedMenu(singleItem);
            }
        })
    },[menuItems])

    switch(selectedMenu?.name){
        case "All Habits":
            selectComponent = <AllHabits/>
            break;
        case "Statistics":
            selectComponent = <Statistics/>
            break;
        case "Areas":
            selectComponent = <Areas/>
            break;
        case "All Areas":
            break;
    }

    return (
        <div className="flex">
            <Sidebar/>
            {selectComponent}
        </div>
    )
}

export default Dashboard