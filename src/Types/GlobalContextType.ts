import {menuItemType} from "./MenuItemType"
import { Dispatch, SetStateAction } from "react"
import {DarkModeItem} from "./DarkModeType"
import { AreaType, HabitType } from "./GlobalTypes";


export type GlobalContextType = {
    menuItemsObject : {
        menuItems : menuItemType[];
        setMenuItems : Dispatch<SetStateAction<menuItemType[]>>;
    };
    openSideBarObject:{
        openSideBar: boolean;
        setOpenSideBar: Dispatch<SetStateAction<boolean>>;
    };
    darkModeObject:{
        isDarkMode:boolean;
        setDarkMode:Dispatch<SetStateAction<boolean>>;
        darkModeItems:DarkModeItem[];
        setDarkModeItems:Dispatch<SetStateAction<DarkModeItem[]>>;
    },
    habitWindowObject:{
        openHabitWindow: boolean;
        setOpenHabitWindow : Dispatch<SetStateAction<boolean>>;
    },
    openTimePickerObject : {
        openTimePickerWindow: boolean;
        setOpenTimePickerWindow : Dispatch<SetStateAction<boolean>>;
    },
    allAreasObject : {
        allAreas: AreaType[],
        setAllAreas: Dispatch<SetStateAction<AreaType[]>>
    },
    allHabitsObject : {
        allHabits : HabitType[],
        setAllHabits : Dispatch<SetStateAction<HabitType[]>>
    },
    selectedCurrentDayObject : {
        selectedCurrentDate : string,
        setSelectedCurrentDate :  Dispatch<SetStateAction<string>>;
    },
    offsetDayObject:{
        offsetDay:number,
        setOffsetDay: Dispatch<SetStateAction<number>>;
    },
    selectedAreaStringObject:{
        selectedAreaString : string,
        setSelectedAreaString : Dispatch<SetStateAction<string>>;
    },
    allFilteredHabitsObject:{
        allFilteredHabits : HabitType[],
        setAllFilteredHabits : Dispatch<SetStateAction<HabitType[]>>;
    }
}