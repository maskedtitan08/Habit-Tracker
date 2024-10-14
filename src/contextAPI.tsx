"use client"

import {ReactNode , createContext , useState , useContext} from "react"
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons"
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { GlobalContextType } from "./Types/GlobalContextType"
import { menuItemType } from "./Types/MenuItemType"
import {faChartSimple , faLayerGroup, faRectangleList} from "@fortawesome/free-solid-svg-icons"

type DarkModeItem = {
    id: number;
    icon: IconProp;
    isSelected: boolean;
}

const GlobalContext = createContext<GlobalContextType>({
    menuItemsObject: {
        menuItems: [],
        setMenuItems: ()=> {},
    },
    openSideBarObject: {
        openSideBar: false,
        setOpenSideBar: ()=> {},
    },
    darkModeObject: {
        isDarkMode: false,
        setDarkMode: ()=> {},
        darkModeItems: [],
        setDarkModeItems: ()=> {},
    },
    habitWindowObject : {
        openHabitWindow : false,
        setOpenHabitWindow: () => {},
    }

})

const GlobalContextProvider = ({children} : {children : ReactNode}) => {
    const [menuItems , setMenuItems] = useState<menuItemType[]>([
        {name: "All Habits", isSelected:true , icon : faRectangleList},
        {name: "Statistics", isSelected:false, icon: faChartSimple},
        {name: "Areas", isSelected:false, icon: faLayerGroup},
    ]);
    const [darkModeItems, setDarkModeItems] = useState<DarkModeItem[]>([
        { id: 1, icon: faSun, isSelected: false },
        { id: 2, icon: faMoon, isSelected: true },
    ]);
    const [openSideBar,setOpenSideBar] = useState<boolean>(false);
    const [isDarkMode,setDarkMode] = useState<boolean>(true);
    const [openHabitWindow , setOpenHabitWindow] = useState<boolean>(false);

    return (
        <GlobalContext.Provider value = {
            {
                menuItemsObject: {menuItems , setMenuItems},
                openSideBarObject:{openSideBar,setOpenSideBar},
                darkModeObject: {darkModeItems , setDarkModeItems , isDarkMode , setDarkMode},
                habitWindowObject:{openHabitWindow,setOpenHabitWindow},
            }
        }>
            {children}
        </GlobalContext.Provider>
    )
}

export function useGlobalContextProvider(){
    return useContext(GlobalContext)
}

export default GlobalContextProvider



