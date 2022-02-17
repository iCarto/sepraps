import {createRef, useState} from "react";
import {useNavigate} from "react-router-dom";

import Box from "@mui/material/Box";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Typography from "@mui/material/Typography";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";

const AddContactButtonGroup = ({basePath}) => {
    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = useState(null);
    const ref = createRef();

    const open = Boolean(anchorEl);

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box sx={{mt: 2}}>
            <ToggleButtonGroup color="primary">
                <Button
                    id="basic-button"
                    color="primary"
                    variant="contained"
                    onClick={() => {
                        navigate(basePath + "/new/add");
                    }}
                    startIcon={<AddIcon />}
                    ref={ref}
                >
                    Nuevo contacto
                </Button>
                <Button
                    color="primary"
                    variant="contained"
                    onClick={() => {
                        setAnchorEl(ref.current);
                    }}
                >
                    <ArrowDropDownIcon />
                </Button>
            </ToggleButtonGroup>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    "aria-labelledby": "basic-button",
                }}
            >
                <MenuItem
                    onClick={() => {
                        handleClose();
                        navigate(basePath + "/new/search");
                    }}
                >
                    <ListItemIcon>
                        <SearchIcon fontSize="small" />
                    </ListItemIcon>
                    <Typography style={{textTransform: "uppercase"}}>
                        Buscar contacto
                    </Typography>
                </MenuItem>
            </Menu>
        </Box>
    );
};

export default AddContactButtonGroup;
