import dayGridPlugin from "@fullcalendar/daygrid";
import FullCalendar from "@fullcalendar/react";
import { MissionDto } from "../../../domain/dto/Mission.dto.ts";
import {useCalendarViewModel} from "./calendar.viewModel.tsx";
import interactionPlugin from "@fullcalendar/interaction";
import {Dispatch, SetStateAction} from "react";
import {UserDto} from "../../../domain/dto/User.dto.ts";

export const CalendarLayout = (
    {
        filteredMissions,
        missions,
        setMissions,
        users
    }: {
        filteredMissions: MissionDto[],
        missions: MissionDto[],
        setMissions: Dispatch<SetStateAction<MissionDto[]>>,
        users: UserDto[],
    }) => {
    const { tooltips, handleChangeEvent, handleMountEvent} = useCalendarViewModel({missions, setMissions, users});

    return (
        <div className="calendar-container">
            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                events={filteredMissions.map(({ id, ...rest }) => rest)}
                eventDidMount={(arg) => handleMountEvent(arg)}
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
