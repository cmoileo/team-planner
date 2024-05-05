import {MissionDto} from "../../../domain/dto/Mission.dto.ts";
import {Tooltip as ReactTooltip} from "react-tooltip";
import {Dispatch, SetStateAction} from "react";

export const useCalendarViewModel = ({missions, setMissions}: {missions: MissionDto[], setMissions: Dispatch<SetStateAction<MissionDto[]>>}) => {
    const filteredMissions = missions.filter(mission => mission.date);

    const sortedMissions = filteredMissions.sort((a, b) => {
        const dateA = new Date(a.date!);
        const dateB = new Date(b.date!);

        if (dateA.getTime() === dateB.getTime()) {
            return missions.indexOf(b) - missions.indexOf(a);
        }
        return dateA.getTime() - dateB.getTime();
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

    const updateMission = (missionId: number, newDate: string) => {
        const updatedMissions = missions.map(mission => {
            if (mission.id === missionId) {
                return {
                    ...mission,
                    date: newDate
                }
            }
            return mission;
        });
        setMissions(updatedMissions);
    }

    const handleChangeEvent = (arg: any) => {
        const newDate = new Date(arg.event._instance.range.start);
        const formattedDate = convertDate(newDate.toISOString());
        const description = arg.event._def.extendedProps.description;
        const selectedMission = findMissionByDescription(description);
        updateMission(selectedMission!.id, formattedDate);
    }

    return {
        tooltips,
        handleChangeEvent
    };
};
