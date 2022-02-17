import SelectContractDropDown from "../container/SelectContractDropDown";

import {MenuListItemLink} from "components/common/presentational";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InfoIcon from "@mui/icons-material/Info";
import FactCheckOutlinedIcon from "@mui/icons-material/FactCheckOutlined";

const ContractMenu = ({contract}) => {
    return (
        contract && (
            <Box>
                <List sx={{pt: 0}}>
                    <MenuListItemLink to={`/contracts/${contractId}`}>
                        <ListItemIcon>
                            <InfoIcon />
                        </ListItemIcon>
                        <ListItemText primary="Información" />
                    </MenuListItemLink>
                    <MenuListItemLink to={`/contracts/${contractId}/projects`}>
                        <ListItemIcon>
                            <FactCheckOutlinedIcon />
                        </ListItemIcon>
                        <ListItemText primary="Proyectos" />
                    </MenuListItemLink>
                </List>
            </Box>
        )
    );
};

export default ContractMenu;
