"use client"

import { useGlobalContextProvider } from "@/contextAPI"
import { darkModeColor, defaultColor } from "../../../color";
import { faChevronDown, faClose, faQuestion } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import IconsWindow from "../IconsWindow/IconsWindow";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import TimePicker from "./TimePicker";
import { AreaType, HabitType, FrequencyType } from "@/Types/GlobalTypes";
import HabitWindowArea from "./HabitWindowArea";
import { addNewHabit } from "@/utils/addNewHabit";
import toast from "react-hot-toast";

type DayOption = {
    id: number;
    name: string;
    isSelected: boolean;
}


type RepeatOption = {
    name: string;
    isSelected: boolean;
}





const HabitWindow = () => {
    const { habitWindowObject, darkModeObject } = useGlobalContextProvider();
    const { openHabitWindow } = habitWindowObject;
    const { isDarkMode } = darkModeObject;
    const [habitItem, setHabitItem] = useState<HabitType>({
        _id: "",
        name: "",
        icon: faChevronDown,
        frequency: [{ type: "Daily", days: [""], number: 3 }],
        notificationTime: "",
        isNotificationOn: false,
        areas: [],
        completedDays:[],
    })

    const [openIconWindow, setOpenIconWindow] = useState<boolean>(false);
    const [iconSelected, setIconSelected] = useState<IconProp>(habitItem.icon);

    const onUpdateHabitName = (inputText: string) => {
        const copyHabitItem = { ...habitItem };
        copyHabitItem.name = inputText;
        setHabitItem(copyHabitItem);
    }

    const changeRepeatOption = (repeatOptions: RepeatOption[]) => {
        const filterIsSelected = repeatOptions.filter((singleOption) => singleOption.isSelected);

        const nameOfSelectedOption = filterIsSelected[0].name;

        const copyHabitsItem = { ...habitItem };

        copyHabitsItem.frequency[0].type = nameOfSelectedOption;

        setHabitItem(copyHabitsItem);
    }

    const changeDaysOption = (allDays: DayOption[]) => {
        const selectedDays = allDays.filter((singleDay) => singleDay.isSelected).map((day) => day.name);

        const copyHabitsItem = { ...habitItem };
        copyHabitsItem.frequency[0].days = selectedDays;
        setHabitItem(copyHabitsItem);
    }

    const changeWeeksOption = (weeks: number) => {
        const copyHabitsItem = { ...habitItem };
        copyHabitsItem.frequency[0].number = weeks;
        setHabitItem(copyHabitsItem);
    }

    const updateReminderTime = (timeValue: string) => {
        const copyHabitsItem = { ...habitItem };
        copyHabitsItem.notificationTime = timeValue;
        setHabitItem(copyHabitsItem);
    }

    const getSelectedAreaItems = (selectedAreaItems: AreaType[]) => {
        const copyHabitsItem = { ...habitItem };
        copyHabitsItem.areas = selectedAreaItems;
        setHabitItem(copyHabitsItem);
    }


    useEffect(() => {
        const copyHabitItem = { ...habitItem };
        copyHabitItem.icon = iconSelected;
        setHabitItem(copyHabitItem);
    }, [iconSelected]);

    useEffect(() => {
        if (openHabitWindow) {
            setHabitItem({
                _id: "",
                name: "",
                icon: faChevronDown,
                frequency: [{ type: "Daily", days: [""], number: 3 }],
                notificationTime: "",
                isNotificationOn: false,
                areas: [],
                completedDays:[],
            })
        }
    }, [openHabitWindow])

    return (
        <div
            style={{
                backgroundColor: isDarkMode ? darkModeColor.background : "white",
                color: isDarkMode ? darkModeColor.textColor : "black",
            }}

            className={`top-[3%] left-1/2 transform -translate-x-1/2 w-[80%] z-50 p-10 rounded-md shadow-md
       ${openHabitWindow ? "absolute" : "hidden"} `}
        >
            <TimePicker onSaveTime={updateReminderTime} />
            <IconsWindow
                openIconWindow={openIconWindow}
                setOpenIconWindow={setOpenIconWindow}
                setIconSelected={setIconSelected}
            />

            <Header />
            <InputNameAndIconButton
                onUpdateHabitName={onUpdateHabitName}
                habitName={habitItem.name}
                setOpenIconWindow={setOpenIconWindow}
                iconSelected={iconSelected}
            />
            <Repeat onChangeOption={changeRepeatOption} onChangeDaysOption={changeDaysOption} onChangeWeeksOption={changeWeeksOption} />
            <Reminder habitItem={habitItem} setHabitItem={setHabitItem} />
            <HabitWindowArea onChange={getSelectedAreaItems} />
            <SaveButton habit={habitItem} />

        </div>
    )
}

export default HabitWindow

const Header = () => {
    const { habitWindowObject } = useGlobalContextProvider();
    const { setOpenHabitWindow } = habitWindowObject;

    return (
        <div className="flex justify-between items-center">
            <span className="font-bold text-xl">Add New Habit</span>
            <FontAwesomeIcon icon={faClose} onClick={() => { setOpenHabitWindow(false) }}
                className="text-gray-400 cursor-pointer" />
        </div>
    )
}

const InputNameAndIconButton = ({ onUpdateHabitName, habitName, setOpenIconWindow, iconSelected }:
    {
        onUpdateHabitName: (inputText: string) => void;
        habitName: string;
        setOpenIconWindow: React.Dispatch<React.SetStateAction<boolean>>;
        iconSelected: IconProp;
    }) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const { habitWindowObject, darkModeObject } = useGlobalContextProvider();
    const { isDarkMode } = darkModeObject;
    const { openHabitWindow } = habitWindowObject;

    function updateInputHabit(event: React.ChangeEvent<HTMLInputElement>) {
        onUpdateHabitName(event.target.value);
    }

    useEffect(() => {
        setTimeout(() => {
            inputRef.current?.focus();
        }, 500);

        if (!openHabitWindow) {
            onUpdateHabitName("");
        }
    }, [openHabitWindow]);

    useEffect(() => {
        inputRef.current?.focus();
    }, [iconSelected]);

    return (
        <div className="flex flex-col gap-2 mt-10 px-3">
            <span className="opacity-80 font-semibold">Habit Name</span>
            <div className="flex gap-4 justify-between items-center">
                <input
                    style={{ backgroundColor: isDarkMode ? darkModeColor.background : "white" }}
                    ref={inputRef}
                    onChange={(event) => updateInputHabit(event)}
                    className={`border w-full border-e-gray-200 outline-none p-4 rounded-md text-[13px]`}
                    placeholder="Type Habit Name..."
                />
                <FontAwesomeIcon icon={iconSelected} height={16} width={16}
                    className="mt-[1px] p-4 rounded-md text-white cursor-pointer bg-customRed"
                    onClick={() => setOpenIconWindow(true)}
                />

            </div>
        </div>
    )
}


const SaveButton = ({ habit }: { habit: HabitType }) => {
    const { habitWindowObject, allHabitsObject } = useGlobalContextProvider();
    const { allHabits, setAllHabits } = allHabitsObject;
    const { setOpenHabitWindow } = habitWindowObject;

    const checkNewHabitObject = () => {
        if (habit.name.trim() === "") {
            return toast.error("Habit name field is empty")
        }
        const habitExist = allHabits.some((singleHabit) => singleHabit.name === habit.name);
        if (!habitExist) {
            addNewHabit({ allHabits, setAllHabits, newHabit: habit });
            setOpenHabitWindow(false);
        }
        else {
            toast.error("Habit name already exist");
        }
    }
    return (
        <div className="w-full flex justify-center mt-9">
            <button onClick={checkNewHabitObject} className="bg-customRed p-4 w-[96%] rounded-md text-white">
                Add Habit
            </button>
        </div>
    )
}

const Repeat = ({ onChangeOption, onChangeDaysOption, onChangeWeeksOption }: {
    onChangeOption: (repeatOptions: RepeatOption[]) => void;
    onChangeDaysOption: (allDays: DayOption[]) => void;
    onChangeWeeksOption: (weeks: number) => void;
}) => {
    const [repeatOptions, setRepeatOptions] = useState<RepeatOption[]>([
        { name: "Daily", isSelected: true },
        { name: "Weekly", isSelected: false },
    ])

    const days: DayOption[] = [
        { id: 1, name: "Mo", isSelected: false },
        { id: 2, name: "Tu", isSelected: false },
        { id: 3, name: "We", isSelected: false },
        { id: 4, name: "Th", isSelected: false },
        { id: 5, name: "Fr", isSelected: false },
        { id: 6, name: "Sa", isSelected: false },
        { id: 7, name: "Su", isSelected: false },
    ]

    const [allDays, setAllDays] = useState<DayOption[]>(days);
    const [weeks, setWeek] = useState(3);
    const [nameOfSelectedOption, setNameOfSelectedOption] = useState("");
    const { darkModeObject } = useGlobalContextProvider();
    const { isDarkMode } = darkModeObject;

    const changeOption = (indexClicked: number) => {
        const updateRepeatOptions = repeatOptions.map((singleOption, index) => {
            if (index === indexClicked) {
                return { ...singleOption, isSelected: true }
            }

            return { ...singleOption, isSelected: false };
        })
        setRepeatOptions(updateRepeatOptions);
        onChangeOption(updateRepeatOptions);
    }
    useEffect(() => {
        onChangeDaysOption(allDays);
    }, [allDays]);
    useEffect(() => {
        onChangeWeeksOption(weeks);
    }, [weeks]);

    useEffect(() => {
        const getNameOptionSelected = repeatOptions.filter((singleOption) => singleOption.isSelected)[0].name;

        setNameOfSelectedOption(getNameOptionSelected);
    }, [repeatOptions]);

    return (
        <div className="flex flex-col gap-2 mt-10 px-3">
            <span className="font-semibold text-[17px]">Repeat Frequency</span>

            <div className="flex gap-4 mt-2 items-center">
                {repeatOptions.map((singleOption, index) => (
                    <button key={index} onClick={() => changeOption(index)}
                        style={{
                            color: !singleOption.isSelected ? !isDarkMode ? defaultColor.default : darkModeColor.textColor : "",
                            backgroundColor: singleOption.isSelected ? defaultColor.default : !isDarkMode ? defaultColor[100] : defaultColor[50],
                        }}
                        className="p-2 x-3 rounded-md text-white cursor-pointer"
                    >
                        {singleOption.name}
                    </button>
                ))}

            </div>
            {nameOfSelectedOption === "Daily" ?
                (<DailyOptions allDays={allDays} setAllDays={setAllDays} />)
                :
                (<WeeklyOption weeks={weeks} setWeek={setWeek} />)
            }


        </div>
    )
}

const DailyOptions = ({ allDays, setAllDays }:
    {
        allDays: DayOption[],
        setAllDays: React.Dispatch<React.SetStateAction<DayOption[]>>,
    }) => {

    const { darkModeObject , habitWindowObject} = useGlobalContextProvider();
    const {openHabitWindow} = habitWindowObject;
    const { isDarkMode } = darkModeObject;

    const selectedDays = (singleDayIndex: number) => {
        const selectedCount: number = allDays.filter((singleDay) => singleDay.isSelected).length;
        const updatedAllDays = allDays.map((singleDay, index) => {
            if (index === singleDayIndex && selectedCount === 1 && singleDay.isSelected === true) return singleDay;

            return index === singleDayIndex ? { ...singleDay, isSelected: !singleDay.isSelected } : singleDay;
        })

        setAllDays(updatedAllDays);
    }

    useEffect(()=>{
        if(openHabitWindow){
            const updateSelectedDays = allDays.map((day)=>{
                return {...day,isSelected:false}
            })
            updateSelectedDays[0].isSelected = true;
            setAllDays(updateSelectedDays);
        }
    },[openHabitWindow]);


    return (
        <div className="mt-5 flex flex-col gap-4">
            <span className="font-medium opacity-85">Select days to repeat</span>
            <div className="flex gap-3 w-full">
                {allDays.map((singleDay, singleDayIndex) => (
                    <button key={singleDayIndex} onClick={() => selectedDays(singleDayIndex)}
                        style={{
                            color: !singleDay.isSelected ? !isDarkMode ? defaultColor.default : darkModeColor.textColor : "",
                            backgroundColor: singleDay.isSelected ? defaultColor.default : !isDarkMode ? defaultColor[100] : defaultColor[50],
                        }}
                        className={`p-2 px-3 w-11 text-center rounded-md select-none cursor-pointer ${singleDay.isSelected ? "text-white" : "text-gray-400"} `}
                    >
                        {singleDay.name}
                    </button>
                ))}
            </div>

        </div>
    )
}

const WeeklyOption = ({ weeks, setWeek }: { weeks: number, setWeek: React.Dispatch<React.SetStateAction<number>> }) => {

    const { darkModeObject } = useGlobalContextProvider();
    const { isDarkMode } = darkModeObject;

    const updateCounter = (option: string) => {
        if (option === "up") {
            setWeek((prev) => (prev < 7 ? prev + 1 : 7));
        }
        else if (option === "down") {
            setWeek((prev) => (prev > 1 ? prev - 1 : 1));

        }
    }

    return (
        <div className="mt-7 flex gap-20">
            <div className="flex flex-col gap-2">
                <span className="font-semibold">Frequency</span>
                <span className="text-sm font-light text-gray-400">
                    {weeks} times a week
                </span>
            </div>
            <div className="flex items-center justify-center">
                <button onClick={() => updateCounter("down")}
                    style={{
                        backgroundColor: !isDarkMode ? defaultColor[100] : defaultColor[50],
                        color: !isDarkMode ? defaultColor.default : darkModeColor.textColor,
                    }}
                    className="p-3 w-10 rounded-md text-white">
                    -
                </button>
                <span className="p-4 px-5 select-none">{weeks}</span>
                <button onClick={() => updateCounter("up")}
                    style={{
                        backgroundColor: !isDarkMode ? defaultColor[100] : defaultColor[50],
                        color: !isDarkMode ? defaultColor.default : darkModeColor.textColor,
                    }}
                    className="p-3 w-10 rounded-md text-white">
                    +
                </button>
            </div>
        </div>
    )
}

const Reminder = ({ habitItem, setHabitItem }: { habitItem: HabitType, setHabitItem: React.Dispatch<React.SetStateAction<HabitType>> }) => {
    const { darkModeObject, openTimePickerObject } = useGlobalContextProvider();
    const { setOpenTimePickerWindow } = openTimePickerObject;
    const { isDarkMode } = darkModeObject;
    const [isOn, setIsOn] = useState(false);

    const updateToggle = () => {
        const copyHabitItem = { ...habitItem };
        copyHabitItem.isNotificationOn = !isOn;
        setHabitItem(copyHabitItem);
        setIsOn(!isOn);
    }

    const ToggleSwitch = () => {
        return (
            <div className={`${isOn ? "bg-customRed" : "bg-slate-400"} w-16 h-[28px] relative rounded-md flex`}>
                <div className="w-1/2 h-full" onClick={updateToggle}></div>
                <div className="w-1/2 h-full" onClick={updateToggle}></div>
                <div className={`bg-white h-6 w-6 rounded-full ${isOn ? "right" : "left"}-[3px] top-[3px] absolute`}></div>
            </div>
        )
    }
    const openTheTimePicker = () => {
        setOpenTimePickerWindow(true);
    }
    return (
        <div className="flex flex-col gap-2 mt-10 px-3">
            <div className="flex justify-between">
                <span className="font-semibold text-[17px] ">Reminder</span>
                <ToggleSwitch />
            </div>
            {isOn && (
                <div className="flex justify-between p-4 m-2 mt-8 rounded-md"
                    style={{
                        backgroundColor: !isDarkMode ? defaultColor[100] : defaultColor[50],
                        color: !isDarkMode ? defaultColor.default : darkModeColor.textColor,
                    }}>
                    <span>Select time</span>
                    <div onClick={openTheTimePicker} className="flex gap-2 items-center justify-center cursor-pointer select-none">
                        <span>
                            {habitItem.notificationTime !== "" ? habitItem.notificationTime : "none"}
                        </span>
                        <FontAwesomeIcon icon={faChevronDown} height={12} width={12} />
                    </div>
                </div>
            )}
        </div>
    )
}

