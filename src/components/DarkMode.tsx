import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useGlobalContextProvider } from "@/contextAPI";
import { useEffect } from "react";
import { darkModeColor, defaultColor } from "../../color";




const DarkMode = () => {
    const { darkModeObject } = useGlobalContextProvider();
    const { isDarkMode, setDarkMode, darkModeItems, setDarkModeItems } = darkModeObject;



    const handleClickedItem = (singleItemIndex: number) => {
        const updatedDarkModeItems = darkModeItems.map((darkModeItem, index) => {
            if (singleItemIndex === index) {
                return { ...darkModeItem, isSelected: true };
            }
            return { ...darkModeItem, isSelected: false };
        })

        setDarkModeItems(updatedDarkModeItems);
    }

    useEffect(() => {
        darkModeItems.forEach((singleItem) => {
            if (singleItem.id === 1 && singleItem.isSelected) {
                setDarkMode(false);
            }
            if (singleItem.id === 2 && singleItem.isSelected) {
                setDarkMode(true);
            }
        })
    }, [darkModeItems]);

    return (
        <div
            style={{ backgroundColor: isDarkMode ? darkModeColor.backgroundSlate : defaultColor.backgroundSlate }}
            className="bg-gray-400 w-[90px] relative rounded-3xl flex ">
            {darkModeItems.map((singleItem, singleItemIndex) => (
                <div
                    key={singleItemIndex}
                    onClick={() => { handleClickedItem(singleItemIndex) }}
                    className="h-full w-[45px] z-40 flex justify-center items-center"
                >
                    <FontAwesomeIcon icon={singleItem.icon}
                        className={`${singleItem.isSelected ? "text-customRed" : "text-gray-300"}`}
                        width={20} height={20}
                    />
                </div>
            ))}

            <div
                style={{ backgroundColor: isDarkMode ? darkModeColor.backgroundSlate : defaultColor.backgroundSlate }}
                className={`transform ${isDarkMode ? "translate-x-[48px]" : "translate-x-1"}
            w-[38px] absolute h-[38px] top-1 rounded-full bg-slate-100 transition-all`}></div>
        </div>
    )
}

export default DarkMode 