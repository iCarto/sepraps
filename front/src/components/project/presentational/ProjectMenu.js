import SelectProjectDropDown from "../container/SelectProjectDropDown";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InfoIcon from "@mui/icons-material/Info";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import TopicIcon from "@mui/icons-material/Topic";
import Toolbar from "@mui/material/Toolbar";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";
import GradingIcon from "@mui/icons-material/Grading";
import {MenuListItemLink} from "components/common/presentational";

const ProjectMenu = ({projectId}) => {
    return (
        <Box>
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
                <SelectProjectDropDown />
            </Toolbar>
            <Divider />
            <Box>
                <List sx={{pt: 0}}>
                    <MenuListItemLink to={`/projects/${projectId}`}>
                        <ListItemIcon>
                            <InfoIcon />
                        </ListItemIcon>
                        <ListItemText primary="Información" />
                    </MenuListItemLink>
                    <MenuListItemLink to={`/projects/${projectId}/location`}>
                        <ListItemIcon>
                            <LocationOnIcon />
                        </ListItemIcon>
                        <ListItemText primary="Ubicación" />
                    </MenuListItemLink>
                    <MenuListItemLink to={`/projects/${projectId}/financing`}>
                        <ListItemIcon>
                            <AccountBalanceIcon />
                        </ListItemIcon>
                        <ListItemText primary="Financiación" />
                    </MenuListItemLink>
                    <MenuListItemLink to={`/projects/${projectId}/milestones`}>
                        <ListItemIcon>
                            <GradingIcon />
                        </ListItemIcon>
                        <ListItemText primary="Hitos" />
                    </MenuListItemLink>
                    <MenuListItemLink to={`/projects/${projectId}/contacts`}>
                        <ListItemIcon>
                            <PermContactCalendarIcon />
                        </ListItemIcon>
                        <ListItemText primary="Contactos" />
                    </MenuListItemLink>
                    <MenuListItemLink to={`/projects/${projectId}/documents`}>
                        <ListItemIcon>
                            <TopicIcon />
                        </ListItemIcon>
                        <ListItemText primary="Documentos" />
                    </MenuListItemLink>
                </List>
            </Box>
        </Box>
    );
};

export default ProjectMenu;
