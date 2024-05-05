import {MainButton}  from "../../../../../ui/MainButton.tsx";
import {useAddMissionViewModel} from "./add-mission.viewModel.tsx";
import MainText from "../../../../../ui/MainText.tsx";
import {MissionDto} from "../../../domain/dto/Mission.dto.ts";
import {Dispatch, SetStateAction} from "react";
import {UserDto} from "../../../domain/dto/User.dto.ts";
export const AddMissionLayout = (
    {
        missions,
        setMissions,
        users,
        filteredMissions,
        setFilteredMissions
    }: {
        missions: MissionDto[] | null,
        setMissions: Dispatch<SetStateAction<MissionDto[]>>,
        users: UserDto[],
        filteredMissions: MissionDto[] | null,
        setFilteredMissions: Dispatch<SetStateAction<MissionDto[]>>
    }) => {
    const {handleOpenModal, handleAddMission, modalRef, shadowRef} = useAddMissionViewModel({missions, setMissions, filteredMissions, setFilteredMissions});
    return (
        <div>
            <div className={"flex justify-between"}>
                <MainButton onClick={handleOpenModal} children={"Add mission"} />
                <MainButton onClick={() => console.log(missions)} children={"Save modifications"} />
            </div>
            <div onClick={handleOpenModal} ref={shadowRef} className={"hidden w-screen h-screen fixed top-0 left-0 opacity-75 bg-black z-10"}></div>
            <form onSubmit={handleAddMission} ref={modalRef} className={"hidden flex flex-col gap-6 absolute p-16 bg-white rounded-2xl z-20"}>
                <MainText htmltag={"label"} children={"Mission title"} />
                <input required type="text" name={"missionTitle"} placeholder={"Title"} />
                <MainText htmltag={"label"} children={"Mission description"} />
                <textarea required name={"description"} placeholder={"Description"} />
                <MainText htmltag={"label"} children={"Mission start date"} />
                <input required type="date" name={"start"} />
                <MainText htmltag={"label"} children={"Mission end date"} />
                <input required type="date" name={"end"} />
                <MainText htmltag={"label"} children={"Mission color"} />
                <input required type="color" name={"color"} />
                <MainText htmltag={"label"} children={"Assigned users"} />
                <select required name={"assignedUsers"} multiple>
                    {users.map(user => <option key={user.userId} value={user.userId}>{user.name}</option>)}
                </select>
                <MainButton children={"Submit"} />
            </form>
        </div>
    )
}