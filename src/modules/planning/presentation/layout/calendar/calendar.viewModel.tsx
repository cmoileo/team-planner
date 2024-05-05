import {MissionDto} from "../../../domain/dto/Mission.dto.ts";

export const useCalendarViewModel = ({missions}: {missions: MissionDto[]}) => {
    const filteredMissions = missions.filter(mission => mission.date);

    const sortedMissions = filteredMissions.sort((a, b) => {
        const dateA = new Date(a.date!);
        const dateB = new Date(b.date!);

        if (dateA.getTime() === dateB.getTime()) {
            return missions.indexOf(b) - missions.indexOf(a);
        }
        return dateA.getTime() - dateB.getTime();
    });

    return {
        sortedMissions
    };
};
