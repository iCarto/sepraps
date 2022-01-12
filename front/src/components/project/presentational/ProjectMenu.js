import {Link, useMatch, useParams, useResolvedPath} from "react-router-dom";
import SelectProjectDropDown from "../container/SelectProjectDropDown";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InfoIcon from "@mui/icons-material/Info";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Toolbar from "@mui/material/Toolbar";
import ArrowBack from "@mui/icons-material/ArrowBack";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";

const drawerWidth = 240;

function MenuListItemLink({children, to, ...props}) {
    let resolved = useResolvedPath(to);
    let match = useMatch({path: resolved.pathname, end: true});

    return (
        <ListItem
            button
            component={Link}
            to={to}
            sx={{bgcolor: match ? "grey.100" : "inherit"}}
            {...props}
        >
            {children}
        </ListItem>
    );
}

const ProjectMenu = () => {
    const {id} = useParams();

    return (
        <Drawer
            variant="permanent"
            anchor="left"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: {width: drawerWidth, boxSizing: "border-box"},
            }}
        >
            <Toolbar />
            <Toolbar
                sx={{
                    // -----  OPTION 1 - LIGHT GREY ------
                    backgroundColor: "#E2F0FF",
                    // -----  OPTION 2 - DARK BLUE (change button & code font color to white in SelectProjectDropDown) ------
                    // backgroundColor: "primary.dark",
                    // -----  OPTION 3 - DARK GREY (change button & code font color to white in SelectProjectDropDown) ------
                    // backgroundColor: "grey.700",
                }}
                variant="dense"
                disableGutters
            >
                <SelectProjectDropDown MenuListItemLink={MenuListItemLink} />
            </Toolbar>{" "}
            <Divider />
            <Box sx={{overflow: "auto"}}>
                <List sx={{pt: 0}}>
                    <MenuListItemLink to={`/project/${id}`}>
                        <ListItemIcon>
                            <InfoIcon />
                        </ListItemIcon>
                        <ListItemText primary="Información" />
                    </MenuListItemLink>
                    <MenuListItemLink to={`/project/${id}/location`}>
                        <ListItemIcon>
                            <LocationOnIcon />
                        </ListItemIcon>
                        <ListItemText primary="Ubicación" />
                    </MenuListItemLink>
                    <MenuListItemLink to={`/project/${id}/financing`}>
                        <ListItemIcon>
                            <AccountBalanceIcon />
                        </ListItemIcon>
                        <ListItemText primary="Financiación" />
                    </MenuListItemLink>
                    <MenuListItemLink to={`/project/${id}/contacts`}>
                        <ListItemIcon>
                            <PermContactCalendarIcon />
                        </ListItemIcon>
                        <ListItemText primary="Contactos" />
                    </MenuListItemLink>
                    <Divider />
                    <MenuListItemLink to="/">
                        <ListItemIcon>
                            <ArrowBack />
                        </ListItemIcon>
                        <ListItemText primary="Volver al listado" />
                    </MenuListItemLink>
                </List>
            </Box>
        </Drawer>
    );
};

export default ProjectMenu;
