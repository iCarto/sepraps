import {CUSTOM_FONT_FAMILY} from "Theme";
import Link from "@mui/material/Link";

const FooterTextLink = ({to, title, text}) => {
    return (
        <Link
            href={to}
            title={title}
            aria-label={title}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
                textDecoration: "none",
                color: "white",
                fontFamily: CUSTOM_FONT_FAMILY,
                fontSize: "14px",
            }}
        >
            {text}
        </Link>
    );
};

export default FooterTextLink;
