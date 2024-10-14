import React from 'react'
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { darkModeColor, defaultColor } from '../../color'
import { useGlobalContextProvider } from "@/contextAPI"


const Calendar = () => {
    const { darkModeObject } = useGlobalContextProvider();
    const { isDarkMode } = darkModeObject;
    return (
        <div 
        style={{ backgroundColor: isDarkMode ? darkModeColor.backgroundSlate : defaultColor.backgroundSlate }}

        className='flex mx-4 flex-col gap-5 justify-center items-center mt-10 rounded-xl p-5 pt-7'>
            <DateCalendar
                sx={{
                    "& .MuiPickersDay-root": {
                        color: isDarkMode ? darkModeColor.textColor : defaultColor.textColor,
                        "&.Mui-selected":{
                            backgroundColor:defaultColor.default,
                            color: "white",
                        }
                    },

                    "& .MuiPickersYear-yearButton": {
                        color: isDarkMode ? darkModeColor.textColor : defaultColor.textColor,
                        "&.Mui-selected":{
                            backgroundColor:defaultColor.default,
                            color: "white",
                        }
                    },

                    "& .MuiDayCalendar-weekDayLabel": {
                        color: isDarkMode ? darkModeColor.textColor : defaultColor.textColor,
                        "&.Mui-selected":{
                            backgroundColor:defaultColor.default,
                            color: "white",
                        }
                    },
                    "& .MuiPickersArrowSwitcher-button": {
                        color: isDarkMode ? darkModeColor.textColor : defaultColor.textColor,
                        "&.Mui-selected":{
                            backgroundColor:defaultColor.default,
                            color: "white",
                        }
                    },
                    "& .MuiButtonBase-root": {
                        color: isDarkMode ? darkModeColor.textColor : defaultColor.textColor,
                        "&.Mui-selected":{
                            backgroundColor:defaultColor.default,
                            color: "white",
                        }
                    },

                }}
            />
        </div>
    )
}

export default Calendar