import {styled} from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import FactCheckOutlinedIcon from "@mui/icons-material/FactCheckOutlined";
import {MenuListItemLink} from "components/common/presentational";

const drawerWidth = 240;

const openedMixin = theme => ({
    width: drawerWidth,
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
});

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
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: "nowrap",
        boxSizing: "border-box",
        ...(open && {
            ...openedMixin(theme),
            "& .MuiDrawer-paper": openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            "& .MuiDrawer-paper": closedMixin(theme),
        }),
    })
);

const MainMenu = ({drowerOpened, onDrawerToggle}) => {
    return (
        <Drawer variant="permanent" open={drowerOpened}>
            <DrawerHeader />
            <Divider />
            <List>
                <MenuListItemLink to={`/projects`}>
                    <ListItemIcon>
                        <FactCheckOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Proyectos" />
                </MenuListItemLink>
            </List>
            {drowerOpened && (
                <>
                    <Divider />
                    <ListItem button key="close" onClick={onDrawerToggle}>
                        <ListItemIcon>
                            <ChevronLeftIcon />
                        </ListItemIcon>
                        <ListItemText primary="Cerrar menú" />
                    </ListItem>
                </>
            )}
        </Drawer>
    );
};

export {MainMenu as default, DrawerHeader};
