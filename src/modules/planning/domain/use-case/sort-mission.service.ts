import {MissionDto} from "../dto/Mission.dto.ts";

export const sortedMissions = (missions: MissionDto[], filteredMissions: MissionDto[]): MissionDto[] => {
    return filteredMissions.sort((a: MissionDto, b: MissionDto) => {
        const startDateA = a.start ? new Date(a.start) : null;
        const startDateB = b.start ? new Date(b.start) : null;

        const endDateA = a.end ? new Date(a.end) : null;
        const endDateB = b.end ? new Date(b.end) : null;

        if (startDateA && startDateB) {
            if (startDateA.getTime() !== startDateB.getTime()) {
                return startDateA.getTime() - startDateB.getTime();
            }
        } else if (startDateA && !startDateB) {
            return -1;
        } else if (!startDateA && startDateB) {
            return 1;
        }

        if (endDateA && endDateB) {
            if (endDateA.getTime() !== endDateB.getTime()) {
                return endDateB.getTime() - endDateA.getTime();
            }
        } else if (endDateA && !endDateB) {
            return -1;
        } else if (!endDateA && endDateB) {
            return 1;
        }

        if (startDateA && startDateB && startDateA.getTime() === startDateB.getTime() &&
            endDateA && endDateB && endDateA.getTime() === endDateB.getTime()) {
            return missions.indexOf(b) - missions.indexOf(a);
        }

        return missions.indexOf(a) - missions.indexOf(b);
    });
}