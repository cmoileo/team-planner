import {UserDto} from "../../../domain/dto/User.dto.ts";
import {useFilterMissions} from "./filterMissions.viewModel.tsx";
import {MissionDto} from "../../../domain/dto/Mission.dto.ts";
import MainText from "../../../../../ui/MainText.tsx";
import {MainButton} from "../../../../../ui/MainButton.tsx";

export const FilerMissionsLayout = (
    {
        filteredMissions,
        setFilteredMissions,
        users,
        missions,
        setMissions,
    }: {
        filteredMissions: MissionDto[],
        setFilteredMissions: (missions: MissionDto[]) => void,
        users: UserDto[],
        missions: MissionDto[],
        setMissions: (missions: MissionDto[]) => void,
    }
) => {
    const {handleFilterMissions, handleResetFilters} = useFilterMissions({filteredMissions, setFilteredMissions, missions, setMissions});
    return (
        <div className={"flex flex-col gap-10"}>
            <MainText htmltag={"h2"} className={"text-2xl"} children={"Filter by users"} />
            <MainButton onClick={handleResetFilters} children={"Reste filters"} />
            <div className={"flex gap-12"}>
                {
                    users.map((user: UserDto) => (
                        <div key={user.userId} onClick={() => handleFilterMissions(user.userId)}
                             className={"flex cursor-pointer flex-col gap-4"}>
                            <h2 className={"text-2xl font-bold"}>{user.name}</h2>
                            <img className={'w-20 h-20 object-cover rounded-lg'} src={user.profilePicture} alt=""/>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}