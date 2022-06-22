import {AuthAction, useAuth} from "auth";
import styled from "@mui/material/styles/styled";

import {MenuListItemLink} from "components/common/presentational";

import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import BallotOutlinedIcon from "@mui/icons-material/BallotOutlined";
import CasesOutlinedIcon from "@mui/icons-material/CasesOutlined";
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

const ModuleMenu = () => {
    const {ROLES} = useAuth();

    return (
        <Drawer component="nav" variant="permanent">
            <DrawerHeader />
            <Divider />
            <List>
                <MenuListItemLink
                    to={`/projects`}
                    tooltipTitle="Proyectos"
                    icon={<BallotOutlinedIcon />}
                />
                <MenuListItemLink
                    to={`/contracts`}
                    tooltipTitle="Contratos"
                    icon={<CasesOutlinedIcon />}
                />
                <AuthAction roles={[ROLES.MANAGEMENT, ROLES.SUPERVISION]}>
                    <MenuListItemLink
                        to={`/stats/phase`}
                        resolvedPathName={`/stats`}
                        tooltipTitle="Resultados"
                        icon={<QueryStatsIcon />}
                    />
                </AuthAction>
            </List>
        </Drawer>
    );
};

export {ModuleMenu as default, DrawerHeader};
