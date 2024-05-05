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
                    const eventTitleElement = arg.el.querySelector(".fc-event-title.fc-sticky");
                    const newInput = document.createElement("input");
                    newInput.value = eventTitleElement?.textContent || "";
                    newInput.type = "text";
                    newInput.className = "w-full bg-transparent border-none";
                    newInput.addEventListener("click", (event) => {
                        event.stopPropagation();
                    });

                    if (eventTitleElement) {
                        eventTitleElement.innerHTML = "";
                        eventTitleElement.appendChild(newInput);

                        // Assurer que l'élément <input> obtient le focus
                        newInput.focus();
                    }
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
