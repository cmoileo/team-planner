import {CalendarLayout} from "../layout/calendar.layout.tsx";
import {MissionDto} from "../../domain/dto/Mission.dto.ts";
import {useState} from "react";
import dataMissions from "../../../../datas/missions.json";
import {AddMissionLayout} from "../layout/AddMission/addMission.layout.tsx";

export const PlanningPage = () => {
    const [missions, setMissions] = useState<MissionDto[]>(dataMissions);
    return (
        <div className={"w-10/12 m-auto flex flex-col gap-12 mt-20 pb-16"}>
            <AddMissionLayout missions={missions} setMissions={setMissions} />
            <CalendarLayout missions={missions} />
        </div>
    )
}