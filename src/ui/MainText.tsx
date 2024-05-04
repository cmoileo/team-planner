export const MainText = ({ children, htmltag: HtmlTag = 'div', ...rest }) => {
    return <HtmlTag {...rest}>{children}</HtmlTag>;
};