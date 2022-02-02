import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";

const SidebarContainer = ({children}) => {
    const drawerWidth = 440;

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
            <Toolbar></Toolbar>
            {children}
        </Drawer>
    );
};

export default SidebarContainer;
