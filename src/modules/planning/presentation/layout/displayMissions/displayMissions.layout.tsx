import {MissionDto} from "../../../domain/dto/Mission.dto.ts";
import {Dispatch, SetStateAction} from "react";
import {useDisplayMissionsViewModel} from "./displayMissions.viewModel.tsx";
import {MainButton} from "../../../../../ui/MainButton.tsx";
import MainText from "../../../../../ui/MainText.tsx";

export const DisplayMissionsLayout = (
    {
        missions,
        setMissions,
        filteredMissions,
        setFilteredMissions
    }: {
        missions: MissionDto[],
        setMissions: Dispatch<SetStateAction<MissionDto[]>>,
        filteredMissions: MissionDto[],
        setFilteredMissions: Dispatch<SetStateAction<MissionDto[]>>
    }) => {
    const {handleChangeEvent} = useDisplayMissionsViewModel({missions, setMissions, filteredMissions, setFilteredMissions});

    return (
        <div className="flex flex-col gap-10">
            {
                missions.map((mission) => {
                    return (
                        <form onSubmit={handleChangeEvent} key={mission.id} id={String(mission.id)} className={"flex gap-10 items-center"}>
                            <input className={"border p-2"} type="text" defaultValue={mission.title} name={"missionTitle"}/>
                            <textarea className={"border p-2"} name="description" defaultValue={mission.description}></textarea>
                            <input className={"border p-2"} type="date" defaultValue={mission.start} name={"start"}/>
                            <MainText>-</MainText>
                            <input className={"border p-2"} type="date" defaultValue={mission.end} name={"end"}/>
                            <MainButton>Save changes</MainButton>
                        </form>
                    );
                })
            }
        </div>
    );
};