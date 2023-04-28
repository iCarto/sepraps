import styled from "@mui/material/styles/styled";

import MuiDrawer from "@mui/material/Drawer";
import MenuList from "@mui/material/MenuList";
import Divider from "@mui/material/Divider";

const moduleMenuDrawerWidth = 240;

const closedMixin = theme => ({
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up("sm")]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
    backgroundColor: theme.palette.grey[50],
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
        width: moduleMenuDrawerWidth,
        flexShrink: 0,
        whiteSpace: "nowrap",
        boxSizing: "border-box",
        ...(!open && {
            ...closedMixin(theme),
            "& .MuiDrawer-paper": closedMixin(theme),
        }),
    })
);

const ModuleMenu = ({children}) => {
    return (
        <Drawer component="nav" variant="permanent">
            <DrawerHeader />
            <Divider />
            <MenuList sx={{pt: 1.5}}>{children}</MenuList>
        </Drawer>
    );
};

export {ModuleMenu as default, DrawerHeader};
