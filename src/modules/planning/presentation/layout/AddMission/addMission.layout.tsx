import {MainButton} from "../../../../../ui/MainButton.tsx";
import {useAddMissionViewModel} from "./add-mission.viewModel.tsx";

export const AddMissionLayout = () => {
    const {handleOpenModal, handleAddMission} = useAddMissionViewModel();
    return (
        <div>
            <MainButton onClick={handleOpenModal} children={"Add mission"} />
            <form action="submit">
                <input type="text" placeholder={"Title"} />
                <input type="date" placeholder={"Date"} />
                <input type="time" placeholder={"Start"} />
                <input type="time" placeholder={"End"} />
                <input type="color" placeholder={"Color"} />
                <MainButton onClick={handleAddMission} children={"Submit"} />
            </form>
        </div>
    )
}