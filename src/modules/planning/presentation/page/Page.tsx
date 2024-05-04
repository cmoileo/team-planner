import {CalendarLayout} from "../layout/calendar.layout.tsx";

export const PlanningPage = () => {
    const events = [
        { title: 'event 1', date: '2024-05-01' },
        { title: 'event 2', date: '2024-05-02' },
        { title: 'event 3', date: '2024-05-03' },
    ]
    return (
        <div>
            <CalendarLayout events={events} />
        </div>
    )
}