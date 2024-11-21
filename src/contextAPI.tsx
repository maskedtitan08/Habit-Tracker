"use client"

import { ReactNode, createContext, useState, useContext, useEffect } from "react"
import { faCode, faGraduationCap, faMoon, faSun, faUsers } from "@fortawesome/free-solid-svg-icons"
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { GlobalContextType } from "./Types/GlobalContextType"
import { menuItemType } from "./Types/MenuItemType"
import { faChartSimple, faLayerGroup, faRectangleList } from "@fortawesome/free-solid-svg-icons"
import { AreaType, HabitType } from "./Types/GlobalTypes";
import { textToIcon } from "./components/IconsWindow/IconData";
import { getDateString } from "./utils/DateFunctions";
import {v4 as uuidv4} from "uuid";

type DarkModeItem = {
    id: number;
    icon: IconProp;
    isSelected: boolean;
}

const GlobalContext = createContext<GlobalContextType>({
    menuItemsObject: {
        menuItems: [],
        setMenuItems: () => { },
    },
    openSideBarObject: {
        openSideBar: false,
        setOpenSideBar: () => { },
    },
    darkModeObject: {
        isDarkMode: false,
        setDarkMode: () => { },
        darkModeItems: [],
        setDarkModeItems: () => { },
    },
    habitWindowObject: {
        openHabitWindow: false,
        setOpenHabitWindow: () => { },
    },
    openTimePickerObject: {
        openTimePickerWindow: false,
        setOpenTimePickerWindow: () => { }
    },
    allAreasObject: {
        allAreas: [],
        setAllAreas: () => { }
    },
    allHabitsObject: {
        allHabits: [],
        setAllHabits: () => { }
    },
    selectedCurrentDayObject : {
        selectedCurrentDate : "",
        setSelectedCurrentDate : () => { }
    },
    offsetDayObject:{
        offsetDay:0,
        setOffsetDay:()=> {}
    },
    selectedAreaStringObject:{
        selectedAreaString : "",
        setSelectedAreaString : () => {},
    },
    allFilteredHabitsObject : {
        allFilteredHabits : [],
        setAllFilteredHabits : () => {}
    }




})

const GlobalContextProvider = ({ children }: { children: ReactNode }) => {
    const [menuItems, setMenuItems] = useState<menuItemType[]>([
        { name: "All Habits", isSelected: true, icon: faRectangleList },
        { name: "Statistics", isSelected: false, icon: faChartSimple },
        { name: "Areas", isSelected: false, icon: faLayerGroup },
    ]);
    const [darkModeItems, setDarkModeItems] = useState<DarkModeItem[]>([
        { id: 1, icon: faSun, isSelected: false },
        { id: 2, icon: faMoon, isSelected: true },
    ]);
    const [allAreas, setAllAreas] = useState<AreaType[]>([
        { _id: uuidv4(), icon: faUsers, name: "All" },
        { _id: uuidv4(), icon: faGraduationCap, name: "Work" },
        { _id: uuidv4(), icon: faCode, name: "Code" },
    ])
    const [allHabits, setAllHabits] = useState<HabitType[]>([]);
    const [openSideBar, setOpenSideBar] = useState<boolean>(false);
    const [isDarkMode, setDarkMode] = useState<boolean>(true);
    const [openHabitWindow, setOpenHabitWindow] = useState<boolean>(false);
    const [openTimePickerWindow, setOpenTimePickerWindow] = useState<boolean>(false);
    const [selectedCurrentDate , setSelectedCurrentDate] = useState(()=> getDateString(new Date()));
    const [offsetDay , setOffsetDay] = useState(0);
    const [selectedAreaString , setSelectedAreaString] = useState<string>("All");
    const [allFilteredHabits, setAllFilteredHabits] = useState<HabitType[]>([]);

    useEffect(()=>{
        function fetchData(){
            const allHabitsData = [
                {
                    _id:uuidv4(),
                    name:"",
                    icon: textToIcon("faTools") as IconProp,
                    frequency : [{type:"Daily" , days:["M"],number:1}],
                    notificationTime:"",
                    isNotificationOn:false,
                    areas:[
                        {_id:uuidv4(),icon:faGraduationCap,name:"Study"},
                        {_id:uuidv4(),icon:faCode,name:"Code"},
                    ],
                    completedDays:[
                        {_id:uuidv4(),date:""},
                        {_id:uuidv4(),date:""}
                    ]
                }
            ]
            setTimeout(() => {
                setAllHabits(allHabitsData)
            }, 1000);
        }
        fetchData();
        
    },[])

    return (
        <GlobalContext.Provider value={
            {
                menuItemsObject: { menuItems, setMenuItems },
                openSideBarObject: { openSideBar, setOpenSideBar },
                darkModeObject: { darkModeItems, setDarkModeItems, isDarkMode, setDarkMode },
                habitWindowObject: { openHabitWindow, setOpenHabitWindow },
                openTimePickerObject: { openTimePickerWindow, setOpenTimePickerWindow },
                allAreasObject: { allAreas, setAllAreas },
                allHabitsObject:{allHabits,setAllHabits},
                selectedCurrentDayObject:{selectedCurrentDate, setSelectedCurrentDate},
                offsetDayObject:{offsetDay,setOffsetDay},
                selectedAreaStringObject:{selectedAreaString,setSelectedAreaString},
                allFilteredHabitsObject:{allFilteredHabits , setAllFilteredHabits}
            }
        }>
            {children}
        </GlobalContext.Provider>
    )
}

export function useGlobalContextProvider() {
    return useContext(GlobalContext)
}

export default GlobalContextProvider



