import {Dispatch, SetStateAction, useRef} from "react";
import {MissionDto} from "../../../domain/dto/Mission.dto.ts";

export const useAddMissionViewModel = (
    {
        missions,
        setMissions,
        filteredMissions,
        setFilteredMissions
    }: {
        missions: MissionDto[] | null,
        setMissions: Dispatch<SetStateAction<MissionDto[]>>,
        filteredMissions: MissionDto[] | null,
        setFilteredMissions: Dispatch<SetStateAction<MissionDto[]>>
    }) => {
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
        if (!modalRef.current) return console.error("Ref not found")
        handleOpenModal()
        e.preventDefault()
        const target = e.target as HTMLFormElement
        const newMission: MissionDto = {
            id: missions ? missions.length : 0,
            missionId: missions ? missions.length : 0,
            title: target.missionTitle.value,
            description: target.description.value,
            start: target.start.value,
            end: target.end.value,
            backgroundColor: target.color.value,
            assignedUsers: Array.from(target.assignedUsers.selectedOptions).map((option: any): number => {
                const value = option.value
                return Number(value)
            })
        }
        missions ? setMissions([...missions, newMission]) : setMissions([newMission])
        filteredMissions ? setFilteredMissions([...filteredMissions, newMission]) : setFilteredMissions([newMission])
        modalRef.current.reset()
    }

    return {
        handleOpenModal,
        handleAddMission,
        modalRef,
        shadowRef
    }
}