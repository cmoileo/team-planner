import { useRef} from "react";

export const useAddMissionViewModel = () => {
    const modalRef = useRef<HTMLFormElement>(null);
    const shadowRef = useRef<HTMLDivElement>(null);
    const handleOpenModal = () => {
        if (!modalRef.current || !shadowRef.current) return console.error("Ref not found")
        if (shadowRef.current.classList.contains("hidden")) {
            shadowRef.current.classList.remove("hidden")
            modalRef.current.classList.remove("hidden")
        } else {
            shadowRef.current.classList.add("hidden")
            modalRef.current.classList.add("hidden")
        }
    }

    const handleAddMission = (e: React.FormEvent) => {
        handleOpenModal()
        e.preventDefault()
    }

    return {
        handleOpenModal,
        handleAddMission,
        modalRef,
        shadowRef
    }
}