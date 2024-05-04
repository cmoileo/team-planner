import { useRef } from "react";

export const useCalendarViewModel = () => {
    const descriptionRef = useRef<HTMLDivElement>(null);

    const handleEventMouseEnter = (arg: any) => {
        if (!descriptionRef.current) return;

        descriptionRef.current.innerText = arg.event.extendedProps.description;
        console.log(arg)
        // descriptionRef.current.style.top = `${arg.el.clientY}px`;
        // descriptionRef.current.style.left = `${arg.el.clientX}px`;
    };

    return {
        handleEventMouseEnter,
        descriptionRef
    };
};
