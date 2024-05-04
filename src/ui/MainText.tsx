import React from 'react';

interface MainTextProps {
    children: React.ReactNode;
    htmltag?: React.ElementType;
    className?: string;
}

const MainText: React.FC<MainTextProps> = ({ children, htmltag: HtmlTag = 'div', className = '', ...rest }) => {
    const defaultClassName = 'text-xl font-normal text-blue-800';
    return <HtmlTag className={`${defaultClassName} ${className}`} {...rest}>{children}</HtmlTag>;
};

export default MainText;
