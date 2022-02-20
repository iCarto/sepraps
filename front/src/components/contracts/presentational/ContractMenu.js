import SelectContractDropDown from "../container/SelectContractDropDown";

import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InfoIcon from "@mui/icons-material/Info";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Toolbar from "@mui/material/Toolbar";
import {MenuListItemLink} from "components/common/presentational";

const ContractMenu = ({contract}) => {
    return (
        contract && (
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
                    <SelectContractDropDown selectedContract={contract} />
                </Toolbar>
                <Divider />
                <Box>
                    <List sx={{pt: 0}}>
                        <MenuListItemLink to={`/contracts/${contract.id}`}>
                            <ListItemIcon>
                                <InfoIcon />
                            </ListItemIcon>
                            <ListItemText primary="Información" />
                        </MenuListItemLink>
                        <MenuListItemLink to={`/contracts/${contract.id}/projects`}>
                            <ListItemIcon>
                                <LocationOnIcon />
                            </ListItemIcon>
                            <ListItemText primary="Proyectos" />
                        </MenuListItemLink>
                    </List>
                </Box>
            </Box>
        )
    );
};

export default ContractMenu;
