import {MissionDto} from "../../../domain/dto/Mission.dto.ts";
import {Tooltip as ReactTooltip} from "react-tooltip";
import {Dispatch, SetStateAction} from "react";
import {sortedMissions} from "../../../domain/use-case/sort-mission.service.ts";
import {convertDate} from "../../../domain/use-case/convert-date.service.ts";

export const useCalendarViewModel = ({missions, setMissions}: {missions: MissionDto[], setMissions: Dispatch<SetStateAction<MissionDto[]>>}) => {
    let index = 0;
    const filteredMissions = missions.filter(mission => mission.start && mission.end);

    const tooltips = sortedMissions(missions, filteredMissions).map((mission, index) => (
        <ReactTooltip
            id={`my-tooltip-${index}`}
            key={index}
            className={"z-20"}
            place={"top"}
            content={mission.description}
        />
    ));

    const handleMountEvent = (arg: any) => {
        arg.el.dataset.tooltipId = `my-tooltip-${index}`;
        arg.el.dataset.id = index.toString();
        const eventContainer = arg.el.querySelector(".fc-event-title-container");
        eventContainer?.classList.add("flex");
        eventContainer?.classList.add("justify-between");
        const crossIcon = document.createElement("span");
        crossIcon.className = "cross-icon relative right-2";
        crossIcon.innerHTML = "&times;";
        crossIcon.onclick = () => {
            if (!arg.el.dataset.id) return;
            const selectedMission: MissionDto | undefined = findMissionByDescription(arg.event._def.extendedProps.description);
            handleDeleteMission(selectedMission);
        };
        eventContainer?.appendChild(crossIcon);
        index++;
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
        const newStartDate = new Date(arg.event._instance.range.start);
        const newEndDate = new Date(arg.event._instance.range.end);
        const formattedStartDate = convertDate(newStartDate.toISOString());
        const formattedEndDate = convertDate(newEndDate.toISOString());
        const description = arg.event._def.extendedProps.description;
        const selectedMission = findMissionByDescription(description);
        updateMissionByDateRange(selectedMission!.id, formattedStartDate, formattedEndDate);
    }

    const handleDeleteMission = (selectedMission: MissionDto | undefined) => {
        if (!selectedMission) return;
        if (window.confirm("Are you sure you want to delete this mission?")) {
            const updatedMissions = missions.filter(mission => mission.id !== selectedMission.id);
            setMissions(updatedMissions);
        }
    };

    return {
        tooltips,
        handleChangeEvent,
        handleMountEvent
    };
};
