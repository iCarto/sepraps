import {styled} from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";

const drawerWidth = 440;

const DrawerHeader = styled("div")(({theme}) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const SidebarPanel = ({children}) => {
    return (
        <Drawer
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                "& .MuiDrawer-paper": {
                    width: drawerWidth,
                },
            }}
            variant="persistent"
            anchor="right"
            open={true}
        >
            <DrawerHeader />
            {children}
        </Drawer>
    );
};

export {SidebarPanel as default, DrawerHeader};