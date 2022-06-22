import {useTheme} from "@emotion/react";

import {MenuListItemLink} from "components/common/presentational";
import {QuestionnairesMenu} from "components/questionnaire/presentational";
import {SelectProjectDropDown} from "../container";

import Box from "@mui/material/Box";
import MenuList from "@mui/material/MenuList";
import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import TopicOutlinedIcon from "@mui/icons-material/TopicOutlined";
import PermContactCalendarOutlinedIcon from "@mui/icons-material/PermContactCalendarOutlined";
import LinearScaleOutlinedIcon from "@mui/icons-material/LinearScaleOutlined";

const ProjectMenu = ({project}) => {
    const theme = useTheme();

    const toolbarStyle = {backgroundColor: theme.palette.primary.main};

    return (
        project && (
            <Box sx={{height: "100%", backgroundColor: "#ffff"}}>
                <Toolbar sx={toolbarStyle} variant="dense" disableGutters>
                    <SelectProjectDropDown selectedProject={project} />
                </Toolbar>
                <Divider />
                <Box>
                    <MenuList sx={{pt: 0}}>
                        <MenuListItemLink
                            to={`/projects/${project.id}/summary`}
                            text="Resumen"
                            icon={<InfoOutlinedIcon />}
                        />
                        <MenuListItemLink
                            to={`/projects/${project.id}/location`}
                            text="Ubicación"
                            icon={<LocationOnOutlinedIcon />}
                        />
                        <MenuListItemLink
                            to={`/projects/${project.id}/financing`}
                            text="Financiación"
                            icon={<AccountBalanceOutlinedIcon />}
                        />
                        <MenuListItemLink
                            to={`/projects/${project.id}/milestones`}
                            text="Hitos"
                            icon={<LinearScaleOutlinedIcon />}
                        />
                        <QuestionnairesMenu
                            questionnaires={project.questionnaires}
                            basePath={`/projects/${project.id}`}
                        />
                        <MenuListItemLink
                            to={`/projects/${project.id}/contacts`}
                            text="Contactos"
                            icon={<PermContactCalendarOutlinedIcon />}
                        />
                        <MenuListItemLink
                            to={`/projects/${project.id}/documents`}
                            text="Documentos"
                            icon={<TopicOutlinedIcon />}
                        />
                    </MenuList>
                </Box>
            </Box>
        )
    );
};

export default ProjectMenu;
