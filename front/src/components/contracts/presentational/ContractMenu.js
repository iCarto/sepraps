import {MenuListItemLink, MenuListItemIcon} from "components/common/presentational";
import SelectContractDropDown from "../container/SelectContractDropDown";
import {QuestionnairesMenu} from "components/questionnaire/presentational";

import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider";
import MenuList from "@mui/material/MenuList";
import ListItemText from "@mui/material/ListItemText";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import FactCheckOutlinedIcon from "@mui/icons-material/FactCheckOutlined";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";
import EventNoteIcon from "@mui/icons-material/EventNote";

const ContractMenu = ({contract}) => {
    return (
        contract && (
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
                    <SelectContractDropDown selectedContract={contract} />
                </Toolbar>
                <Divider />
                <Box>
                    <MenuList sx={{pt: 0}}>
                        <MenuListItemLink to={`/contracts/${contract?.id}/summary`}>
                            <MenuListItemIcon>
                                <InfoOutlinedIcon />
                            </MenuListItemIcon>
                            <ListItemText primary="Información" />
                        </MenuListItemLink>
                        <MenuListItemLink to={`/contracts/${contract?.id}/phases`}>
                            <ListItemIcon>
                                <EventNoteIcon />
                            </ListItemIcon>
                            <ListItemText primary="Fases" />
                        </MenuListItemLink>
                        <MenuListItemLink to={`/contracts/${contract?.id}/monitoring`}>
                            <MenuListItemIcon>
                                <PermContactCalendarIcon />
                            </MenuListItemIcon>
                            <ListItemText primary="Supervisión" />
                        </MenuListItemLink>

                        <MenuListItemLink to={`/contracts/${contract?.id}/projects`}>
                            <MenuListItemIcon>
                                <FactCheckOutlinedIcon />
                            </MenuListItemIcon>
                            <ListItemText primary="Proyectos" />
                        </MenuListItemLink>
                        <QuestionnairesMenu
                            questionnaires={contract.questionnaires}
                            basePath={`/contracts/${contract?.id}`}
                        />
                    </MenuList>
                </Box>
            </Box>
        )
    );
};

export default ContractMenu;
