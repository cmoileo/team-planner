import dayGridPlugin from "@fullcalendar/daygrid";
import FullCalendar from "@fullcalendar/react";
import {MissionDto} from "../../domain/dto/Mission.dto.ts";

export const CalendarLayout = ({missions}: {missions: MissionDto[]}) => {
    return (
        <div>
            <FullCalendar
                plugins={[ dayGridPlugin ]}
                initialView="dayGridMonth"
                events={missions.map(({ id, ...rest }) => rest)}
            />
        </div>
    )
}