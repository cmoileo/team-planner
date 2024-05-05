import React from 'react';

interface MainButtonProps {
    onClick?: ((e: React.FormEvent) => void);
    children: React.ReactNode;
}

export const MainButton: React.FC<MainButtonProps> = ({ onClick, children }) => {
    return (
        <button
            className={"p-2 h-fit bg-blue-700 text-1x transition text-white rounded-lg active:bg-blue-800"}
            onClick={onClick}
        >
            {children}
        </button>
    );
};
