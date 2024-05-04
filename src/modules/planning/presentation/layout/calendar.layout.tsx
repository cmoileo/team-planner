import dayGridPlugin from "@fullcalendar/daygrid";
import FullCalendar from "@fullcalendar/react";
import {EventDto} from "../../domain/dto/Event.dto.ts";

export const CalendarLayout = ({events}: {events: EventDto[]}) => {
    return (
        <div>
            <FullCalendar
                plugins={[ dayGridPlugin ]}
                initialView="dayGridMonth"
                events={events}
            />
        </div>
    )
}