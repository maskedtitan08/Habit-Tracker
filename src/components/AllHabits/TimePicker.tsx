import { useGlobalContextProvider } from "@/contextAPI"
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { defaultColor } from "../../../color";
import { useEffect, useRef, useState } from "react";

const TimePicker = ({onSaveTime}: {onSaveTime : (timeValue : string)=>void}) => {
  const { darkModeObject, openTimePickerObject } = useGlobalContextProvider();
  const { isDarkMode } = darkModeObject;
  const { openTimePickerWindow, setOpenTimePickerWindow } = openTimePickerObject;
  const [timeValues, setTimeValues] = useState([
    { text: "08", isSelected: true },
    { text: "15", isSelected: false },
  ]);
  const [meridiem, setMeridiem] = useState([
    { text: "AM", isSelected: true },
    { text: "PM", isSelected: false }
  ])
  const hoursRef = useRef<HTMLInputElement>(null);
  const minutesRef = useRef<HTMLInputElement>(null);



  const updateMeridiemFx = (clickedIndex: number) => {
    const updatedMeridiem = meridiem.map((item, index) => {
      if (index === clickedIndex) {
        return { ...item, isSelected: true };
      }
      return { ...item, isSelected: false };
    })
    setMeridiem(updatedMeridiem);
  }

  const updateTimeValues = (clickedIndex: number) => {
    const updatedTimeValues = timeValues.map((item, index) => {
      if (index === clickedIndex) {
        return { ...item, isSelected: true };
      }
      return { ...item, isSelected: false };

    })
    setTimeValues(updatedTimeValues);
  }

  const updateTimeValuesText = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const timeValuesCopy = [...timeValues];
    const currentText = event.target.value;
    const parsedValue = parseInt(currentText, 10);

    const isNumeric = /^\d*$/.test(currentText);

    function isValidInput(currentText:string , parsedValue:number , index:number){
      if ((index==0 && currentText.length <= 2 && parsedValue >= 0 && parsedValue <= 12) ||
      (index==1 && currentText.length <= 2 && parsedValue >= 0 && parsedValue <= 59) ||
      currentText === ""){
        return true;
      }
      return false;
    }

    if(isNumeric && isValidInput(currentText,parsedValue,index)) {
      timeValuesCopy[index].text = currentText;
      setTimeValues(timeValuesCopy);
    }
  }

  const handleOnBlur = (index: number) => {
    const timeValuesCopy = [...timeValues];
    const currentText = timeValuesCopy[index].text;

    if (currentText === "") {
      timeValuesCopy[index].text = "00";

    }
    else if (currentText.length == 1) {
      timeValuesCopy[index].text = "0" + currentText;
    }

    setTimeValues(timeValuesCopy);
  }

  const saveTime = () => {
    const meridiemSelected = meridiem.filter((singleMeridiem)=> singleMeridiem.isSelected)[0].text;
    const selectedTimeFormatted = timeValues[0].text + ":" + timeValues[1].text + " " + meridiemSelected;

    onSaveTime(selectedTimeFormatted);
    setOpenTimePickerWindow(false);
  }

  useEffect(() => {
    if (openTimePickerWindow) {
      if (timeValues[0].isSelected) {
        hoursRef.current?.focus();
      }
      else if (timeValues[1].isSelected) {
        minutesRef.current?.focus();
      }
    }
  }, [openTimePickerWindow]);


  return (
    <div className={`bg-white w-[413px] top-[89px] left-1/2 transform -translate-x-1/2 z-50 p-7 rounded-md shadow-md ${openTimePickerWindow ? "absolute" : "hidden"
      }`}>

      <span className="font-bold flex justify-between items-center">
        <span>Select Time</span>
        <FontAwesomeIcon icon={faClose} height={20} width={20} className={`top-8 right-4 text-gray-300 cursor-pointer`}
          onClick={() => setOpenTimePickerWindow(false)} />
      </span>

      <div className="flex gap-8 mt-9">
        <div className="flex gap-2 justify-center items-center">
          <input value={timeValues[0].text} onClick={() => { updateTimeValues(0) }} style={{
            backgroundColor: defaultColor[100],
            color: defaultColor.default,
          }}
            ref={hoursRef}
            onChange={(event) => updateTimeValuesText(event, 0)}
            onBlur={() => handleOnBlur(0)}
            readOnly={!timeValues[0].isSelected}
            className="w-[100px] text-[45px] p-4 rounded-md text-center outline-none " />
          <span className="text-2xl font-bold">:</span>
          <input value={timeValues[1].text} onClick={() => { updateTimeValues(1) }} style={{
            backgroundColor: defaultColor.backgroundSlate,
            color: defaultColor.textColor,
          }}
            ref={minutesRef}
            onChange={(event) => updateTimeValuesText(event, 1)}
            onBlur={() => handleOnBlur(1)}
            readOnly={!timeValues[1].isSelected}
            className="w-[100px] text-[45px] p-4 rounded-md text-center outline-none " />
        </div>
        <div className="flex flex-col gap-3">
          {meridiem.map((item, index) => (
            <span key={index} onClick={() => updateMeridiemFx(index)}
              style={{
                backgroundColor: item.isSelected ? defaultColor[100] : defaultColor.backgroundSlate,
                color: item.isSelected ? defaultColor.default : defaultColor.textColor,
              }} className="text-xl flex justify-center items-center rounded-md cursor-pointer  select-none w-[104px] h-[45px] ">
              {item.text}
            </span>
          ))}


        </div>
      </div>
      <button className="bg-customRed p-3 text-white w-full rounded-md mt-10 mb-1">
        Save
      </button>
    </div>
  )
}

export default TimePicker