import {CalendarLayout} from "../layout/calendar/calendar.layout.tsx";
import {MissionDto} from "../../domain/dto/Mission.dto.ts";
import {useState} from "react";
import dataMissions from "../../../../datas/missions.json";
import {AddMissionLayout} from "../layout/addMission/addMission.layout.tsx";
import dataUsers from "../../../../datas/users.json";
import {UserDto} from "../../domain/dto/User.dto.ts";
import {FilerMissionsLayout} from "../layout/filterMissions/filterMissions.layout.tsx";
import {DisplayMissionsLayout} from "../layout/displayMissions/displayMissions.layout.tsx";

export const PlanningPage = () => {
    const [missions, setMissions] = useState<MissionDto[]>(dataMissions);
    const [users] = useState<UserDto[]>(dataUsers);
    const [filteredMissions, setFilteredMissions] = useState<MissionDto[]>(missions);
    return (
        <div className={"w-10/12 m-auto flex flex-col gap-12 mt-20 pb-16"}>
            <AddMissionLayout missions={missions} setMissions={setMissions} users={users} filteredMissions={filteredMissions} setFilteredMissions={setFilteredMissions} />
            <FilerMissionsLayout filteredMissions={filteredMissions} setFilteredMissions={setFilteredMissions} users={users} missions={missions} setMissions={setMissions} />
            <CalendarLayout filteredMissions={filteredMissions} missions={missions} setMissions={setMissions} users={users} setFilteredMissions={setFilteredMissions} />
            <DisplayMissionsLayout missions={missions} setMissions={setMissions} filteredMissions={filteredMissions} setFilteredMissions={setFilteredMissions} users={users} />
        </div>
    )
}