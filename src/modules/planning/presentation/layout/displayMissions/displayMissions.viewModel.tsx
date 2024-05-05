import {MissionDto} from "../../../domain/dto/Mission.dto.ts";
import {Dispatch, FormEvent, SetStateAction} from "react";

export const useDisplayMissionsViewModel = (
    {
        missions,
        setMissions,
        filteredMissions,
        setFilteredMissions
    }: {
        missions: MissionDto[],
        setMissions: Dispatch<SetStateAction<MissionDto[]>>,
        filteredMissions: MissionDto[],
        setFilteredMissions: Dispatch<SetStateAction<MissionDto[]>>
    }) => {
    const handleChangeEvent = (e: FormEvent) => {
        e.preventDefault()
        if (!e.target) return
        const target = e.target as HTMLFormElement

        const missionId = Number(target.id)
        const updatedMissions = missions.map((mission) => {
            if (mission.id === missionId) {
                return {
                    ...mission,
                    name: target.missionTitle.value,
                    description: target.description.value,
                    start: target.start.value,
                    end: target.end.value,
                    assignedUsers: Array.from(target.assignedUsers.selectedOptions).map((option: any): number => {
                        const value = option.value
                        return Number(value)
                    })
                }
            }
            return mission
        })
        const updatedFilteredMissions = filteredMissions.map((mission) => {
            if (mission.id === missionId) {
                return {
                    ...mission,
                    title: target.missionTitle.value,
                    description: target.description.value,
                    start: target.start.value,
                    end: target.end.value,
                    assignedUsers: Array.from(target.assignedUsers.selectedOptions).map((option: any): number => {
                        const value = option.value
                        return Number(value)
                    })
                }
            }
            return mission
        })
        setMissions(updatedMissions)
        setFilteredMissions(updatedFilteredMissions)
    }
    return {
        handleChangeEvent
    };
}