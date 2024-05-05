import {MissionDto} from "../../../domain/dto/Mission.dto.ts";

export const useFilterMissions = (
    {
        setFilteredMissions,
        missions,
    }: {
        filteredMissions: MissionDto[],
        setFilteredMissions: (missions: MissionDto[]) => void,
        missions: MissionDto[],
        setMissions: (missions: MissionDto[]) => void,
    }
) => {
    const handleFilterMissions = (userId: number) => {
        const newMissions: MissionDto[] = []
        missions.forEach((mission) => {
            if (mission.assignedUsers.includes(userId)) {
                newMissions.push(mission)
            }
        })
        setFilteredMissions(newMissions)
    }

    const handleResetFilters = () => {
        setFilteredMissions(missions)
    }

    return {
        handleFilterMissions,
        handleResetFilters
    }
}