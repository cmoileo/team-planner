import {MissionDto} from "../../../domain/dto/Mission.dto.ts";
import {Tooltip as ReactTooltip} from "react-tooltip";
import {Dispatch, SetStateAction} from "react";

export const useCalendarViewModel = ({missions, setMissions}: {missions: MissionDto[], setMissions: Dispatch<SetStateAction<MissionDto[]>>}) => {
    const filteredMissions = missions.filter(mission => mission.start && mission.end);

    const sortedMissions = filteredMissions.sort((a, b) => {
        const startDateA = a.start ? new Date(a.start) : null;
        const startDateB = b.start ? new Date(b.start) : null;

        const endDateA = a.end ? new Date(a.end) : null;
        const endDateB = b.end ? new Date(b.end) : null;

        // Comparer les dates de début
        if (startDateA && startDateB) {
            if (startDateA.getTime() !== startDateB.getTime()) {
                return startDateA.getTime() - startDateB.getTime();
            }
        } else if (startDateA && !startDateB) {
            return -1; // Placer l'événement avec une date de début définie en premier
        } else if (!startDateA && startDateB) {
            return 1; // Placer l'événement avec une date de début définie en premier
        }

        // Si les dates de début sont les mêmes, comparer les dates de fin
        if (endDateA && endDateB) {
            if (endDateA.getTime() !== endDateB.getTime()) {
                return endDateB.getTime() - endDateA.getTime(); // Inverser l'ordre des dates de fin
            }
        } else if (endDateA && !endDateB) {
            return -1; // Placer l'événement avec une date de fin définie en premier
        } else if (!endDateA && endDateB) {
            return 1; // Placer l'événement avec une date de fin définie en premier
        }

        // Si les dates de début et de fin sont les mêmes, inverser l'ordre
        if (startDateA && startDateB && startDateA.getTime() === startDateB.getTime() &&
            endDateA && endDateB && endDateA.getTime() === endDateB.getTime()) {
            return missions.indexOf(b) - missions.indexOf(a);
        }

        // Par défaut, conserver l'ordre d'origine
        return missions.indexOf(a) - missions.indexOf(b);
    });


    const tooltips = sortedMissions.map((mission, index) => (
        <ReactTooltip
            id={`my-tooltip-${index}`}
            key={index}
            className={"z-20"}
            place={"top"}
            content={mission.description}
        />
    ));

    const convertDate = (dateString: string) => {
        const dateObject = new Date(dateString);
        const year = dateObject.getFullYear();
        const month = (dateObject.getMonth() + 1).toString().padStart(2, "0");
        const day = dateObject.getDate().toString().padStart(2, "0");
        const formattedDate = `${year}-${month}-${day}`;
        return formattedDate;
    }

    const findMissionByDescription = (description: string) => {
        return missions.find(mission => mission.description === description);
    }

    const updateMissionByDateRange = (missionId: number, newStartDate: string, newEndDate: string) => {
        const updatedMissions = missions.map(mission => {
            if (mission.id === missionId) {
                return {
                    ...mission,
                    start: newStartDate,
                    end: newEndDate
                }
            }
            return mission;
        });
        setMissions(updatedMissions);
    }

    const handleChangeEvent = (arg: any) => {
        console.log(arg.event._instance.range.start, arg.event._instance.range.end)
        const newStartDate = new Date(arg.event._instance.range.start);
        const newEndDate = new Date(arg.event._instance.range.end);
        const formattedStartDate = convertDate(newStartDate.toISOString());
        const formattedEndDate = convertDate(newEndDate.toISOString());
        const description = arg.event._def.extendedProps.description;
        const selectedMission = findMissionByDescription(description);
        updateMissionByDateRange(selectedMission!.id, formattedStartDate, formattedEndDate);
    }

    return {
        tooltips,
        handleChangeEvent
    };
};
