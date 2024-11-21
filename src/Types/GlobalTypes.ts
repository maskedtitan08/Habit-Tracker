import { IconProp } from "@fortawesome/fontawesome-svg-core"

export type AreaType = {
    _id:string;
    icon : IconProp;
    name: string;
}

export type FrequencyType = {
    type: string;
    days: string[];
    number: number;
}
export type CompletedDay = {
    _id:string,
    date:string,
}
export type HabitType = {
    _id: string;
    name: string;
    icon: IconProp;
    frequency: FrequencyType[],
    notificationTime: string,
    isNotificationOn : boolean,
    areas: AreaType[],
    completedDays: CompletedDay[],
}