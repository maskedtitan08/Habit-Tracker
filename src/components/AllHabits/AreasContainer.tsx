import { useGlobalContextProvider } from '@/contextAPI'
import { AreaType } from '@/Types/GlobalTypes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react'

const AreasContainer = () => {
    const {allAreasObject,darkModeObject,selectedAreaStringObject} = useGlobalContextProvider();
    const {allAreas} = allAreasObject;
    const {isDarkMode} = darkModeObject;
    const {setSelectedAreaString} = selectedAreaStringObject;

    const [selectedAreas , setSelectedAreas] = useState<{[key:number]:boolean}>({});
    const toggleSection = (index : number) => {
        const selectedAreasCopy = {...selectedAreas};
        Object.keys(selectedAreasCopy).forEach((key)=> {
            selectedAreasCopy[parseInt(key)] = false;
        })
        selectedAreasCopy[index] = true;
        setSelectedAreas(selectedAreasCopy)
        setSelectedAreaString(allAreas[index].name);
    }
    

    useEffect(()=>{
        const initialSelectedArea : {[key:number]:boolean} = {};
        allAreas.forEach((area, index) => {
            initialSelectedArea[index] = false;
        });
        initialSelectedArea[0] = true;

        setSelectedAreas(initialSelectedArea);
    },[allAreas])

  return (
    <div className='p-5 bg-white rounded-md flex gap-3 items-center transition-all mt-5 text-sm'>
        {allAreas?.map((area : AreaType , index)=>(
            <div onClick={()=> toggleSection(index)} key={index}>
                <SingleAreaContainer singleArea={area} isSelected={selectedAreas[index]} />
            </div>
        ))}
    </div>
  )
}

export default AreasContainer

const SingleAreaContainer = ({singleArea,isSelected} : {singleArea : AreaType , isSelected:boolean}) => {
    return(
        <div className={`p-2 x-3 rounded-md flex gap-1 items-center cursor-pointer 
        ${isSelected ? "bg-customRed text-white" : "text-gray-400"}`}>
            <FontAwesomeIcon icon={singleArea.icon} />
            <span>{singleArea.name}</span>

        </div>
    )
}