import {MainButton} from "../../../../../ui/MainButton.tsx";
import {useAddMissionViewModel} from "./add-mission.viewModel.tsx";

export const AddMissionLayout = () => {
    const {handleOpenModal, handleAddMission, modalRef, shadowRef} = useAddMissionViewModel();
    return (
        <div>
            <MainButton onClick={handleOpenModal} children={"Add mission"} />
            <div onClick={handleOpenModal} ref={shadowRef} className={"hidden w-screen h-screen fixed top-0 left-0 opacity-75 bg-black z-10"}></div>
            <form ref={modalRef} className={"flex flex-col gap-16 absolute p-16 bg-white rounded-2xl z-20"}>

                <input type="text" placeholder={"Title"} />
                <MainButton onClick={handleAddMission} children={"Submit"} />
            </form>
        </div>
    )
}