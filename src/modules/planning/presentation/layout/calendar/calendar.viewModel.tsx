import {useRef} from "react";

export const useCalendarViewModel = () => {
    const descriptionRef = useRef<HTMLDivElement>(null);
    const handleEventMouseEnter = (arg: any) => {
        if (!descriptionRef.current) return;
        descriptionRef.current.innerText = arg.event.extendedProps.description;
    }
    return {
        handleEventMouseEnter,
        descriptionRef
    }
}