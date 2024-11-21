import { HabitType } from "@/Types/GlobalTypes"
import { Dispatch } from "react";
import toast from "react-hot-toast";

export const addNewHabit = ({allHabits,setAllHabits,newHabit} : {
    allHabits: HabitType[];
    setAllHabits: Dispatch<React.SetStateAction<HabitType[]>>;
    newHabit: HabitType;
}) => {
    try{
        setAllHabits([...allHabits,newHabit]);
        toast.success("New habit added");
    }
    catch(error){
        toast.error("Something went wrong!...");
    }
}