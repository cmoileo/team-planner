import {MissionDto} from "../../../domain/dto/Mission.dto.ts";
import {Dispatch, SetStateAction} from "react";
import {useDisplayMissionsViewModel} from "./displayMissions.viewModel.tsx";
import {MainButton} from "../../../../../ui/MainButton.tsx";
import MainText from "../../../../../ui/MainText.tsx";
import {UserDto} from "../../../domain/dto/User.dto.ts";

export const DisplayMissionsLayout = (
    {
        missions,
        setMissions,
        filteredMissions,
        setFilteredMissions,
        users
    }: {
        missions: MissionDto[],
        setMissions: Dispatch<SetStateAction<MissionDto[]>>,
        filteredMissions: MissionDto[],
        setFilteredMissions: Dispatch<SetStateAction<MissionDto[]>>,
        users: UserDto[]
    }) => {
    const {handleChangeEvent} = useDisplayMissionsViewModel({missions, setMissions, filteredMissions, setFilteredMissions});

    return (
        <div className="flex flex-col gap-10">
            {
                missions.map((mission) => {
                    console.log(mission.backgroundColor)
                    return (
                        <form onSubmit={handleChangeEvent} key={mission.id} id={String(mission.id)} className={"flex gap-10 items-center"}>
                            <input className={"border p-2"} type="text" defaultValue={mission.title} name={"missionTitle"}/>
                            <textarea className={"border p-2"} name="description" defaultValue={mission.description}></textarea>
                            <input className={"border p-2"} type="date" defaultValue={mission.start} name={"start"}/>
                            <MainText>-</MainText>
                            <input className={"border p-2"} type="date" defaultValue={mission.end} name={"end"}/>
                            <select className="border p-2" name="assignedUsers" multiple>
                                {users.map((user) => {
                                    const isSelected = mission.assignedUsers.includes(user.userId);
                                    return (
                                        <option key={user.userId} value={user.userId} selected={isSelected}>
                                            {user.name}
                                        </option>
                                    );
                                })}
                            </select>
                            <input className={"border p-2"} type="color" defaultValue={mission.backgroundColor} name={"color"}/>
                            <MainButton>Save changes</MainButton>
                        </form>
                    );
                })
            }
        </div>
    );
};