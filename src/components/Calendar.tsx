import React from 'react'
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { darkModeColor, defaultColor } from '../../color'
import { useGlobalContextProvider } from "@/contextAPI"
import dayjs, { Dayjs } from 'dayjs';


const Calendar = () => {
    const { darkModeObject,selectedCurrentDayObject,offsetDayObject } = useGlobalContextProvider();
    const { isDarkMode } = darkModeObject;
    const {selectedCurrentDate} = selectedCurrentDayObject;
    const {setOffsetDay} = offsetDayObject;

    const value:Dayjs | null = selectedCurrentDate ? dayjs(selectedCurrentDate) : null;

    const handleOnDateChange = (newDate : Dayjs) => {
        const jsDate = newDate.toDate();
        const currentDate = new Date();

        const differenceInMs = jsDate.getTime() - currentDate.getTime();

        const differenceInDays = differenceInMs/(1000*3600*24);
        setOffsetDay(Math.floor(differenceInDays+1));
    }
    return (
        <div 
        style={{ backgroundColor: isDarkMode ? darkModeColor.backgroundSlate : defaultColor.backgroundSlate }}

        className='flex mx-4 flex-col gap-5 justify-center items-center mt-10 rounded-xl p-5 pt-7'>
            <DateCalendar
                onChange={handleOnDateChange}
                value={value}
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