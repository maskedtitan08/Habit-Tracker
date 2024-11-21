import { IconProp } from "@fortawesome/fontawesome-svg-core";
import {
    faCalculator, faFlask, faGlobe, faBook, faLaptopCode, faPalette,
    faComments, faPhoneAlt, faEnvelope, faShareAlt, faSearch, faSlidersH, faFilter, faSort, faChartPie,
    faTable, faDatabase, faFileAlt, faCamera, faQuestion, faCogs, faCodeBranch, faUser, faGraduationCap, faHandshake, faChartLine,
    faMoneyBill, faBriefcase, faTools, faLightbulb, faPlaneDeparture,
    faClose
} from "@fortawesome/free-solid-svg-icons";

type iconData = {
    faIcon: IconProp;
    isSelected: boolean;
}

export const iconsData: iconData[] = [
    { faIcon: faCalculator, isSelected: false },
    { faIcon: faFlask, isSelected: false },
    { faIcon: faGlobe, isSelected: false },
    { faIcon: faBook, isSelected: false },
    { faIcon: faLaptopCode, isSelected: false },
    { faIcon: faPalette, isSelected: false },
    { faIcon: faComments, isSelected: false },
    { faIcon: faPhoneAlt, isSelected: false },
    { faIcon: faEnvelope, isSelected: false },
    { faIcon: faShareAlt, isSelected: false },
    { faIcon: faSearch, isSelected: false },
    { faIcon: faSlidersH, isSelected: false },
    { faIcon: faFilter, isSelected: false },
    { faIcon: faSort, isSelected: false },
    { faIcon: faChartPie, isSelected: false },
    { faIcon: faTable, isSelected: false },
    { faIcon: faDatabase, isSelected: false },
    { faIcon: faFileAlt, isSelected: false },
    { faIcon: faCamera, isSelected: false },
    { faIcon: faQuestion, isSelected: false },
    { faIcon: faCogs, isSelected: false },
    { faIcon: faCodeBranch, isSelected: false },
    { faIcon: faUser, isSelected: false },
    { faIcon: faGraduationCap, isSelected: false },
    { faIcon: faHandshake, isSelected: false },
    { faIcon: faChartLine, isSelected: false },
    { faIcon: faMoneyBill, isSelected: false },
    { faIcon: faBriefcase, isSelected: false },
    { faIcon: faTools, isSelected: false },
    { faIcon: faLightbulb, isSelected: false },
    { faIcon: faPlaneDeparture, isSelected: false },

];

export function textToIcon(iconText: string): IconProp | string {
    switch (iconText) {
        case "faCalculator":
            return faCalculator;
        case "faFlask":
            return faFlask;
        case "faGlobe":
            return faGlobe;
        case "faBook":
            return faBook;
        default:
            return faClose;
        
    }
}