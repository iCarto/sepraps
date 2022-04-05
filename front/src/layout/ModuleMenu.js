import {MenuListItemLink} from "components/common/presentational";

import styled from "@mui/material/styles/styled";

import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import ListItemIcon from "@mui/material/ListItemIcon";
import FactCheckOutlinedIcon from "@mui/icons-material/FactCheckOutlined";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import QueryStatsIcon from "@mui/icons-material/QueryStats";

const moduleMenuDrawerWidth = 240;

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
    backgroundColor: theme.palette.grey[200],
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

const ModuleMenu = () => {
    return (
        <Drawer component="nav" variant="permanent">
            <DrawerHeader />
            <Divider />
            <List>
                <MenuListItemLink to={`/projects`}>
                    <Tooltip title="Proyectos" placement="bottom-end">
                        <ListItemIcon>
                            <FactCheckOutlinedIcon />
                        </ListItemIcon>
                    </Tooltip>
                </MenuListItemLink>
                <MenuListItemLink to={`/contracts`}>
                    <Tooltip title="Contratos" placement="bottom-end">
                        <ListItemIcon>
                            <WorkOutlineOutlinedIcon />
                        </ListItemIcon>
                    </Tooltip>
                </MenuListItemLink>
                <MenuListItemLink to={`/stats/phase`}>
                    <Tooltip title="Resultados" placement="bottom-end">
                        <ListItemIcon>
                            <QueryStatsIcon />
                        </ListItemIcon>
                    </Tooltip>
                </MenuListItemLink>
            </List>
        </Drawer>
    );
};

export {ModuleMenu as default, DrawerHeader};
