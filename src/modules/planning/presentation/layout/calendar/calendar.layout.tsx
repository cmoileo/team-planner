import dayGridPlugin from "@fullcalendar/daygrid";
import FullCalendar from "@fullcalendar/react";
import {MissionDto} from "../../../domain/dto/Mission.dto.ts";
import {useCalendarViewModel} from "./calendar.viewModel.tsx";
import MainText from "../../../../../ui/MainText.tsx";

export const CalendarLayout = ({missions}: {missions: MissionDto[]}) => {
    const {handleEventMouseEnter, descriptionRef}: {
        handleEventMouseEnter: (arg: any) => void;
        descriptionRef: any;
    } = useCalendarViewModel();

    return (
        <div>
            <MainText htmltag={"p"} children={"test"} className={"p-2 rounded-sm bg-blue-50 w-fit"} ref={descriptionRef}/>
            <FullCalendar
                plugins={[ dayGridPlugin ]}
                initialView="dayGridMonth"
                events={missions.map(({ id, ...rest }) => rest)}
                eventDidMount={(arg) => {
                    arg.el.addEventListener("mouseenter", () => handleEventMouseEnter(arg));
                }}
            />
        </div>
    )
}