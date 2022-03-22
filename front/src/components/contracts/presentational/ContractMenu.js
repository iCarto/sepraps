import {MenuListItemLink} from "components/common/presentational";
import SelectContractDropDown from "../container/SelectContractDropDown";

import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider";
import MenuList from "@mui/material/MenuList";
import ListItemText from "@mui/material/ListItemText";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ListItemIcon from "@mui/material/ListItemIcon";
import InfoIcon from "@mui/icons-material/Info";
import FactCheckOutlinedIcon from "@mui/icons-material/FactCheckOutlined";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";

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
                        <MenuListItemLink to={`/contracts/${contract?.id}`}>
                            <ListItemIcon>
                                <InfoOutlinedIcon />
                            </ListItemIcon>
                            <ListItemText primary="Información" />
                        </MenuListItemLink>
                        <MenuListItemLink to={`/contracts/${contract?.id}/monitoring`}>
                            <ListItemIcon>
                                <PermContactCalendarIcon />
                            </ListItemIcon>
                            <ListItemText primary="Supervisión" />
                        </MenuListItemLink>
                        <MenuListItemLink to={`/contracts/${contract?.id}/projects`}>
                            <ListItemIcon>
                                <FactCheckOutlinedIcon />
                            </ListItemIcon>
                            <ListItemText primary="Proyectos" />
                        </MenuListItemLink>
                    </MenuList>
                </Box>
            </Box>
        )
    );
};

export default ContractMenu;
