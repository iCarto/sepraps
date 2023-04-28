import {useState} from "react";
import {FOOTER_HEIGHT, PAGE_MENU_DRAWER_WIDTH} from "../app/config/measurements";

import {PageMenuHeading} from ".";

import useTheme from "@mui/material/styles/useTheme";
import styled from "@mui/material/styles/styled";

import MuiDrawer from "@mui/material/Drawer";
import MenuList from "@mui/material/MenuList";
import Divider from "@mui/material/Divider";

const closedMixin = theme => ({
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up("sm")]: {
        width: `calc(${theme.spacing(9)} + 1px)`,
    },
    bgcolor: theme.palette.grey[50],
});

const DrawerHeader = styled("div")(({theme}) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {shouldForwardProp: prop => prop !== "open"})(
    ({theme, open}) => ({
        width: `${PAGE_MENU_DRAWER_WIDTH}px`,
        flexShrink: 0,
        whiteSpace: "normal",
        boxSizing: "border-box",
        ...(!open && {
            ...closedMixin(theme),
            "& .MuiDrawer-paper": closedMixin(theme),
        }),
    })
);

const PageMenu = ({
    headingPrimaryText = "",
    headingSecondaryText = "",
    headingIcon = null,
    headingUrl = null,
    children,
}) => {
    const theme = useTheme();

    const [moduleOpened, setModuleOpened] = useState(null);

    const handleClick = moduleOpened => {
        setModuleOpened(prevState => {
            if (prevState === moduleOpened) {
                return null;
            }
            return moduleOpened;
        });
    };

    return (
        <Drawer
            component="nav"
            variant="permanent"
            open={true}
            role="left-side-page-menu"
            PaperProps={{
                sx: {
                    width: `${PAGE_MENU_DRAWER_WIDTH}px`,
                    borderRight: "3px solid " + theme.palette.menu.primary.header.text,
                    // paddingBottom: `${FOOTER_HEIGHT}px`,
                },
            }}
        >
            <DrawerHeader />
            <Divider />
            <MenuList sx={{pt: 0, color: "white"}}>
                {headingPrimaryText ? (
                    <PageMenuHeading
                        to={headingUrl}
                        headingPrimaryText={headingPrimaryText}
                        headingSecondaryText={headingSecondaryText}
                        headingIcon={headingIcon}
                    />
                ) : null}

                {children}
            </MenuList>
        </Drawer>
    );
};

export {PageMenu as default, DrawerHeader};
