export type MissionDto = {
    id: number;
    missionId: number;
    title: string;
    description: string;
    date?: string;
    start?: string;
    end?: string;
    backgroundColor?: string;
    assignedUsers: number[];
}