import dayGridPlugin from "@fullcalendar/daygrid";
import FullCalendar from "@fullcalendar/react";
import { MissionDto } from "../../../domain/dto/Mission.dto.ts";
import {useCalendarViewModel} from "./calendar.viewModel.tsx";
import interactionPlugin from "@fullcalendar/interaction";
import {Dispatch, SetStateAction} from "react";

export const CalendarLayout = ({ missions, setMissions }: { missions: MissionDto[], setMissions: Dispatch<SetStateAction<MissionDto[]>> }) => {
    const { tooltips, handleChangeEvent} = useCalendarViewModel({missions, setMissions});
    let index = 0;

    console.log(missions);

    return (
        <div className="calendar-container">
            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                events={missions.map(({ id, ...rest }) => rest)}
                eventDidMount={(arg) => {
                    arg.el.dataset.tooltipId = `my-tooltip-${index}`;
                    index++;
                }}
                droppable={true}
                editable={true}
                eventResizableFromStart={true}
                eventDrop={handleChangeEvent}
                eventResize={handleChangeEvent}
            />
            {tooltips}
        </div>
    );
};
