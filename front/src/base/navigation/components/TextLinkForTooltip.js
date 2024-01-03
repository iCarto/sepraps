import {TextLink} from ".";

const TextLinkForTooltip = ({text, to, textStyle = {}}) => {
    const textLinkStyle = {
        color: "white",
        fontSize: "inherit",
        textDecoration: "underline",
        textDecorationColor: "white",
    };

    return (
        <TextLink text={text} to={to} textStyle={{...textLinkStyle, ...textStyle}} />
    );
};

export default TextLinkForTooltip;
