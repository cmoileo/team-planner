import dayGridPlugin from "@fullcalendar/daygrid";
import FullCalendar from "@fullcalendar/react";
import { MissionDto } from "../../../domain/dto/Mission.dto.ts";
import { Tooltip as ReactTooltip } from "react-tooltip";

export const CalendarLayout = ({ missions }: { missions: MissionDto[] }) => {
    let index = 0;

    const filteredMissions = missions.filter(mission => mission.date);

    const sortedMissions = filteredMissions.sort((a, b) => {
        const dateA = new Date(a.date!);
        const dateB = new Date(b.date!);

        if (dateA.getTime() === dateB.getTime()) {
            return missions.indexOf(b) - missions.indexOf(a);
        }
        return dateA.getTime() - dateB.getTime();
    });

    const tooltips = sortedMissions.map((mission, index) => (
        <ReactTooltip
            id={`my-tooltip-${index}`}
            key={index}
            className={"z-20"}
            place={"top"}
            content={mission.description}
        />
    ));

    return (
        <div className="calendar-container">
            <FullCalendar
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
                events={missions.map(({ id, ...rest }) => rest)}
                eventDidMount={(arg) => {
                    arg.el.dataset.tooltipId = `my-tooltip-${index}`;
                    index++;
                }}
            />
            {tooltips}
        </div>
    );
};
