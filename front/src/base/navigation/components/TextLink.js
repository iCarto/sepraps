// import { Link as RouterLink } from "react-router-dom";
import {HashLink} from "react-router-hash-link";
import useTheme from "@mui/material/styles/useTheme";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

const TextLink = ({text, to, textStyleProps = {}}) => {
    const theme = useTheme();
    const textLinkStyle = {
        display: "inline-block",
        color: theme.palette.primary.main,
        textDecoration: "underline",
        textDecorationColor: "rgba(0, 123, 196, 0.4)",
    };

    const textLinkHoverStyle = {
        "&:hover": {
            textDecoration: "underline",
            textDecorationColor: theme.palette.primary.dark,
        },
    };

    return (
        <Link component={HashLink} to={to} smooth style={{...textLinkStyle}}>
            <Typography sx={{...textLinkHoverStyle, ...textStyleProps}}>
                {text}
            </Typography>
        </Link>
    );
};

export default TextLink;
