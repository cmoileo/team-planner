export const MainButton = ({onClick, children}: {onClick: (e: React.FormEvent) => void | null, children: React.ReactNode}) => {
    return (
        <button className={"p-2 bg-blue-700 text-1x transition text-white rounded-lg active:bg-blue-800"} onClick={onClick}>{children}</button>
    )
}