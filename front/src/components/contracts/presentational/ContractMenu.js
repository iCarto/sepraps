import {useTheme} from "@emotion/react";

import {SelectContractDropDown} from "../container";
import {MenuListItemLink} from "components/common/presentational";
import {QuestionnairesMenu} from "components/questionnaire/presentational";

import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider";
import MenuList from "@mui/material/MenuList";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import FactCheckOutlinedIcon from "@mui/icons-material/FactCheckOutlined";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";
import EventNoteIcon from "@mui/icons-material/EventNote";

const ContractMenu = ({contract}) => {
    const theme = useTheme();

    const toolbarStyle = {backgroundColor: theme.palette.primary.main};

    return (
        contract && (
            <Box sx={{height: "100%", backgroundColor: "#ffff"}}>
                <Toolbar sx={toolbarStyle} variant="dense" disableGutters>
                    <SelectContractDropDown selectedContract={contract} />
                </Toolbar>
                <Divider />
                <Box>
                    <MenuList sx={{pt: 0}}>
                        <MenuListItemLink
                            to={`/contracts/${contract?.id}/summary`}
                            text="Información"
                            icon={<InfoOutlinedIcon />}
                        />
                        <MenuListItemLink
                            to={`/contracts/${contract?.id}/phases`}
                            text="Fases"
                            icon={<EventNoteIcon />}
                        />
                        <MenuListItemLink
                            to={`/contracts/${contract?.id}/monitoring`}
                            text="Supervisión"
                            icon={<PermContactCalendarIcon />}
                        />
                        <MenuListItemLink
                            to={`/contracts/${contract?.id}/projects`}
                            text="Proyectos"
                            icon={<FactCheckOutlinedIcon />}
                        />
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
