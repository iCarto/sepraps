import {MenuListItemLink, MenuListItemIcon} from "components/common/presentational";
import {SelectProjectDropDown} from "../container";

import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import TopicOutlinedIcon from "@mui/icons-material/TopicOutlined";
import PermContactCalendarOutlinedIcon from "@mui/icons-material/PermContactCalendarOutlined";
import LinearScaleOutlinedIcon from "@mui/icons-material/LinearScaleOutlined";
import MenuList from "@mui/material/MenuList";
import {QuestionnairesMenu} from "components/questionnaire/presentational";

const ProjectMenu = ({project}) => {
    return (
        project && (
            <Box sx={{height: "100%", backgroundColor: "grey.200"}}>
                <Toolbar
                    sx={{
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
                        <MenuListItemLink to={`/projects/${project.id}/summary`}>
                            <MenuListItemIcon>
                                <InfoOutlinedIcon />
                            </MenuListItemIcon>
                            <ListItemText primary="Resumen" />
                        </MenuListItemLink>
                        <MenuListItemLink to={`/projects/${project.id}/location`}>
                            <MenuListItemIcon>
                                <LocationOnOutlinedIcon />
                            </MenuListItemIcon>
                            <ListItemText primary="Ubicación" />
                        </MenuListItemLink>
                        <MenuListItemLink to={`/projects/${project.id}/financing`}>
                            <MenuListItemIcon>
                                <AccountBalanceOutlinedIcon />
                            </MenuListItemIcon>
                            <ListItemText primary="Financiación" />
                        </MenuListItemLink>
                        <MenuListItemLink to={`/projects/${project.id}/milestones`}>
                            <MenuListItemIcon>
                                <LinearScaleOutlinedIcon />
                            </MenuListItemIcon>
                            <ListItemText primary="Hitos" />
                        </MenuListItemLink>
                        <QuestionnairesMenu
                            questionnaires={project.questionnaires}
                            basePath={`/projects/${project.id}`}
                        />
                        <MenuListItemLink to={`/projects/${project.id}/contacts`}>
                            <MenuListItemIcon>
                                <PermContactCalendarOutlinedIcon />
                            </MenuListItemIcon>
                            <ListItemText primary="Contactos" />
                        </MenuListItemLink>
                        <MenuListItemLink to={`/projects/${project.id}/documents`}>
                            <MenuListItemIcon>
                                <TopicOutlinedIcon />
                            </MenuListItemIcon>
                            <ListItemText primary="Documentos" />
                        </MenuListItemLink>
                    </MenuList>
                </Box>
            </Box>
        )
    );
};

export default ProjectMenu;
