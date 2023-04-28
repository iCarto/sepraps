import {SIDEBAR_PANEL_DRAWER_WIDTH} from "../app/config/measurements";
import styled from "@mui/material/styles/styled";
import useTheme from "@mui/material/styles/useTheme";
import Drawer from "@mui/material/Drawer";

const DrawerHeader = styled("div")(({theme}) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const SidebarPanelDrawer = ({children, isSidebarPanelOpen}) => {
    const theme = useTheme();
    return (
        <Drawer
            sx={{
                width: SIDEBAR_PANEL_DRAWER_WIDTH,
                flexShrink: 0,
                "& .MuiDrawer-paper": {
                    width: SIDEBAR_PANEL_DRAWER_WIDTH,
                    borderLeft: `3px solid ${theme.palette.secondary.dark}`,
                },
            }}
            variant="persistent"
            anchor="right"
            open={isSidebarPanelOpen}
        >
            <DrawerHeader />
            {children}
        </Drawer>
    );
};

export default SidebarPanelDrawer;
