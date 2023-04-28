import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

const LogoLink = ({
    textLogo = "",
    href = "",
    title = "",
    src = "",
    alt = "",
    style = {},
    logoHeightMobile = "",
    logoHeight = "",
    targetBlank = true,
}) => {
    return (
        <Link
            href={href}
            title={title}
            aria-label={title}
            target={targetBlank ? "_blank" : null}
            rel={targetBlank ? "noopener noreferrer" : null}
            sx={{textDecoration: "none"}}
        >
            {src ? (
                <Box
                    component="img"
                    src={src}
                    alt={alt}
                    height={{
                        xs: logoHeightMobile || logoHeight,
                        md: logoHeight,
                    }}
                    sx={{
                        ...style,
                    }}
                />
            ) : (
                <Typography
                    variant="h4"
                    sx={{
                        color: "grey.700",
                        fontWeight: "regular",
                        textTransform: "uppercase",
                        ...style,
                    }}
                >
                    {textLogo}
                </Typography>
            )}
        </Link>
    );
};

export default LogoLink;
