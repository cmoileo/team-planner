import dayGridPlugin from "@fullcalendar/daygrid";
import FullCalendar from "@fullcalendar/react";
import { MissionDto } from "../../../domain/dto/Mission.dto.ts";
import { Tooltip as ReactTooltip } from "react-tooltip";
import {useCalendarViewModel} from "./calendar.viewModel.tsx";

export const CalendarLayout = ({ missions }: { missions: MissionDto[] }) => {
    const {sortedMissions} = useCalendarViewModel({missions});
    let index = 0;

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
