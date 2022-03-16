import {MenuListItemLink} from "components/common/presentational";
import {SelectProjectDropDown} from "../container";

import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import InfoIcon from "@mui/icons-material/Info";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import TopicIcon from "@mui/icons-material/Topic";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";
import LinearScaleIcon from "@mui/icons-material/LinearScale";
import MenuList from "@mui/material/MenuList";

const ProjectMenu = ({project}) => {
    return (
        project && (
            <Box sx={{height: "100%", backgroundColor: "grey.200"}}>
                <Toolbar
                    sx={{
                        // -----  OPTION 1 - LIGHT GREY ------
                        // backgroundColor: "#E2F0FF",
                        // -----  OPTION 2 - DARK BLUE (change button & code font color to white in SelectProjectDropDown) ------
                        // backgroundColor: "primary.dark",
                        // -----  OPTION 3 - DARK GREY (change button & code font color to white in SelectProjectDropDown) ------
                        backgroundColor: "grey.700",
                    }}
                    variant="dense"
                    disableGutters
                >
                    <SelectProjectDropDown selectedProject={project} />
                </Toolbar>
                <Divider />
                <Box>
                    <MenuList sx={{pt: 0}}>
                        <MenuListItemLink to={`/projects/${project.id}`}>
                            <ListItemIcon>
                                <InfoIcon />
                            </ListItemIcon>
                            <ListItemText primary="Resumen" />
                        </MenuListItemLink>
                        <MenuListItemLink to={`/projects/${project.id}/location`}>
                            <ListItemIcon>
                                <LocationOnIcon />
                            </ListItemIcon>
                            <ListItemText primary="Ubicación" />
                        </MenuListItemLink>
                        <MenuListItemLink to={`/projects/${project.id}/financing`}>
                            <ListItemIcon>
                                <AccountBalanceIcon />
                            </ListItemIcon>
                            <ListItemText primary="Financiación" />
                        </MenuListItemLink>
                        <MenuListItemLink to={`/projects/${project.id}/milestones`}>
                            <ListItemIcon>
                                <LinearScaleIcon />
                            </ListItemIcon>
                            <ListItemText primary="Hitos" />
                        </MenuListItemLink>
                        <MenuListItemLink to={`/projects/${project.id}/contacts`}>
                            <ListItemIcon>
                                <PermContactCalendarIcon />
                            </ListItemIcon>
                            <ListItemText primary="Contactos" />
                        </MenuListItemLink>
                        <MenuListItemLink to={`/projects/${project.id}/documents`}>
                            <ListItemIcon>
                                <TopicIcon />
                            </ListItemIcon>
                            <ListItemText primary="Documentos" />
                        </MenuListItemLink>
                    </MenuList>
                </Box>
            </Box>
        )
    );
};

export default ProjectMenu;
