import {CalendarLayout} from "../layout/calendar.layout.tsx";
import {MissionDto} from "../../domain/dto/Mission.dto.ts";
import {useState} from "react";
import dataMissions from "../../../../datas/missions.json";

export const PlanningPage = () => {
    const [missions] = useState<MissionDto[]>(dataMissions);
    return (
        <div>
            <CalendarLayout missions={missions} />
        </div>
    )
}