import {MenuListItemLink} from "components/common/presentational";
import {SelectProjectDropDown} from "../container";

import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import TopicOutlinedIcon from "@mui/icons-material/TopicOutlined";
import PermContactCalendarOutlinedIcon from "@mui/icons-material/PermContactCalendarOutlined";
import LinearScaleOutlinedIcon from "@mui/icons-material/LinearScaleOutlined";
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
                                <InfoOutlinedIcon />
                            </ListItemIcon>
                            <ListItemText primary="Resumen" />
                        </MenuListItemLink>
                        <MenuListItemLink to={`/projects/${project.id}/location`}>
                            <ListItemIcon>
                                <LocationOnOutlinedIcon />
                            </ListItemIcon>
                            <ListItemText primary="Ubicación" />
                        </MenuListItemLink>
                        <MenuListItemLink to={`/projects/${project.id}/financing`}>
                            <ListItemIcon>
                                <AccountBalanceOutlinedIcon />
                            </ListItemIcon>
                            <ListItemText primary="Financiación" />
                        </MenuListItemLink>
                        <MenuListItemLink to={`/projects/${project.id}/milestones`}>
                            <ListItemIcon>
                                <LinearScaleOutlinedIcon />
                            </ListItemIcon>
                            <ListItemText primary="Hitos" />
                        </MenuListItemLink>
                        <MenuListItemLink to={`/projects/${project.id}/contacts`}>
                            <ListItemIcon>
                                <PermContactCalendarOutlinedIcon />
                            </ListItemIcon>
                            <ListItemText primary="Contactos" />
                        </MenuListItemLink>
                        <MenuListItemLink to={`/projects/${project.id}/documents`}>
                            <ListItemIcon>
                                <TopicOutlinedIcon />
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
