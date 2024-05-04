import dayGridPlugin from "@fullcalendar/daygrid";
import FullCalendar from "@fullcalendar/react";
import { MissionDto } from "../../../domain/dto/Mission.dto.ts";
import { Tooltip as ReactTooltip } from "react-tooltip";

export const CalendarLayout = ({ missions }: { missions: MissionDto[] }) => {

    return (
        <div className="calendar-container">
            <FullCalendar
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
                events={missions.map(({id, ...rest}) => rest)}
                eventDidMount={(arg) => {
                    arg.el.setAttribute("data-for", `my-tooltip-${arg.event.id}`);
                }}
            />
            {
                missions.map((mission, index) => (
                    <ReactTooltip
                        id={`my-tooltip-${index}`}
                        place="bottom"
                        content={mission.description}
                    />
                ))
            }
        </div>
    );
};
