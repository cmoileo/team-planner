import {MissionDto} from "../../../domain/dto/Mission.dto.ts";
import {Tooltip as ReactTooltip} from "react-tooltip";
import {Dispatch, SetStateAction} from "react";
import {sortedMissions} from "../../../domain/use-case/sort-mission.service.ts";
import {convertDate} from "../../../domain/use-case/convert-date.service.ts";
import {UserDto} from "../../../domain/dto/User.dto.ts";

export const useCalendarViewModel = (
    {
        missions,
        setMissions,
        users,
    }: {
        missions: MissionDto[],
        setMissions: Dispatch<SetStateAction<MissionDto[]>>,
        users: UserDto[],
    }) => {
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

    const handleCreateCrossIcon = (arg: any, eventContainer: HTMLDivElement) => {
        const crossIcon = document.createElement("span");
        crossIcon.className = "cross-icon relative right-2";
        crossIcon.innerHTML = "&times;";
        crossIcon.onclick = () => {
            if (!arg.el.dataset.id) return;
            const selectedMission: MissionDto | undefined = findMissionByDescription(arg.event._def.extendedProps.description);
            handleDeleteMission(selectedMission);
        };
        eventContainer?.appendChild(crossIcon);
    }
    const addAssignedUsersImages = (arg: any, eventContainer: HTMLDivElement) => {
        const assignedUsers = users.find(user => user.missions.includes(arg.event._def.extendedProps.missionId))?.missions;
        if (!assignedUsers) return;
        const imagesContainer = document.createElement("div");
        imagesContainer.className = "flex gap-2";
        eventContainer?.appendChild(imagesContainer);
        assignedUsers.forEach((assignedUser: number) => {
            const user = users.find(user => user.userId === assignedUser);
            if (!user) return;
            const userImage = document.createElement("img");
            userImage.src = user.profilePicture;
            userImage.className = "w-6 h-6 rounded-full";
            imagesContainer?.appendChild(userImage);
        });
    }
    const handleMountEvent = (arg: any) => {
        arg.el.dataset.tooltipId = `my-tooltip-${index}`;
        arg.el.dataset.id = index.toString();
        const eventContainer = arg.el.querySelector(".fc-event-title-container");
        eventContainer?.classList.add("flex");
        eventContainer?.classList.add("justify-between");
        handleCreateCrossIcon(arg, eventContainer);
        addAssignedUsersImages(arg, eventContainer);
        index++;
    }
    const findMissionByDescription = (description: string) => {
        return missions.find(mission => mission.description === description);
    }

    const findMissionById = (missionId: number) => {
        return missions.find(mission => mission.missionId === missionId);
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
        const missionId = arg.event._def.extendedProps.missionId;
        const selectedMission = findMissionById(missionId)
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
