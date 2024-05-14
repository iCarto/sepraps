import useTheme from "@mui/material/styles/useTheme";

import {FOOTER_HEIGHT, PAGE_MENU_DRAWER_WIDTH} from "../app/config/measurements";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";

const Footer = ({
    logo = null,
    text = "",
    links = [],
    fontFamily = "",
    position = "relative",
}) => {
    const theme = useTheme();

    const listItemStyle = {
        width: "fit-content",
        fontFamily: fontFamily || "inherit",
        p: 0,
        pt: "14px",
        [theme.breakpoints.up("md")]: {
            p: 0,
            "&:not(:last-child):after": {
                content: '" | "',
                px: "1rem",
                color: "white",
            },
        },
    };

    const footerLinks = links.map((link, index) => (
        <ListItem key={index} sx={listItemStyle}>
            {link}
        </ListItem>
    ));

    return (
        <Paper
            component="footer"
            sx={{
                position: position,
                right: 0,
                bottom: 0,
                left: 0,
                m: 0,
                px: "1rem",
                pb: {xs: "1rem", md: 0},
                zIndex: theme.zIndex.drawer + 1,
                borderRadius: 0,
                bgcolor: "primary.main",
            }}
            elevation={3}
        >
            <Box
                display="flex"
                flexDirection={{xs: "column", md: "row"}}
                height={{xs: "fit-content", md: `${FOOTER_HEIGHT}px`}}
            >
                {logo && (
                    <Box
                        display="flex"
                        alignItems="center"
                        sx={{width: `calc(${PAGE_MENU_DRAWER_WIDTH}px - 1rem)`}}
                    >
                        {logo}
                    </Box>
                )}
                <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="flexStart"
                    justifyContent="center"
                >
                    <Typography
                        component="span"
                        sx={{
                            color: "white",
                            fontFamily: fontFamily || "inherit",
                            fontSize: "14px",
                            m: 0,
                            p: 0,
                        }}
                    >
                        {text}
                    </Typography>

                    {links.length ? (
                        <List
                            sx={{
                                display: "flex",
                                flexDirection: {xs: "column", md: "row"},
                                width: "100%",
                                p: 0,
                            }}
                        >
                            {footerLinks}
                        </List>
                    ) : null}
                </Box>
            </Box>
        </Paper>
    );
};

export default Footer;
