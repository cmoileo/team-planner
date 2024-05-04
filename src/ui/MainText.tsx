import React, { forwardRef, HTMLAttributes } from 'react';

interface MainTextProps extends HTMLAttributes<HTMLDivElement> {
    htmltag?: React.ElementType;
}

const MainText: React.ForwardRefRenderFunction<HTMLDivElement, MainTextProps> = (
    { children, htmltag: HtmlTag = 'div', className = '', ...rest },
    ref: React.ForwardedRef<HTMLDivElement>
) => {
    const defaultClassName = 'text-xl font-normal text-blue-800';
    return <HtmlTag className={`${defaultClassName} ${className}`} ref={ref} {...rest}>{children}</HtmlTag>;
};

export default forwardRef(MainText);
