import {MainButton}  from "../../../../../ui/MainButton.tsx";
import {useAddMissionViewModel} from "./add-mission.viewModel.tsx";
import MainText from "../../../../../ui/MainText.tsx";

export const AddMissionLayout = () => {
    const {handleOpenModal, handleAddMission, modalRef, shadowRef} = useAddMissionViewModel();
    return (
        <div>
            <MainButton onClick={handleOpenModal} children={"Add mission"} />
            <div onClick={handleOpenModal} ref={shadowRef} className={"hidden w-screen h-screen fixed top-0 left-0 opacity-75 bg-black z-10"}></div>
            <form onSubmit={handleAddMission} ref={modalRef} className={"hidden flex flex-col gap-6 absolute p-16 bg-white rounded-2xl z-20"}>
                <MainText htmltag={"label"} children={"Mission title"} />
                <input type="text" name={"title"} placeholder={"Title"} />
                <MainText htmltag={"label"} children={"Mission title"} />
                <textarea name={"description"} placeholder={"Description"} />
                <MainText htmltag={"label"} children={"Mission color"} />
                <input type="color" name={"color"} />
                <MainButton children={"Submit"} />
            </form>
        </div>
    )
}