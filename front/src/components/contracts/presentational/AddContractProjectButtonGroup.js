import {createRef, useState} from "react";
import {useNavigate} from "react-router-dom";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Typography from "@mui/material/Typography";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";

const AddContractProjectButtonGroup = () => {
    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = useState(null);
    const ref = createRef();

    const open = Boolean(anchorEl);

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box display="flex">
            <Button
                id="menu-button"
                color="primary"
                variant="contained"
                onClick={() => {
                    setAnchorEl(ref.current);
                }}
                endIcon={<ArrowDropDownIcon />}
                ref={ref}
                sx={{mr: 2, py: 1, lineHeight: 1.25}}
            >
                Añadir proyecto
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    "aria-labelledby": "menu-button",
                }}
            >
                <MenuItem
                    onClick={() => {
                        handleClose();
                        navigate("add/new");
                    }}
                >
                    <ListItemIcon>
                        <AddIcon fontSize="small" />
                    </ListItemIcon>
                    <Typography>Nuevo proyecto</Typography>
                </MenuItem>
                <MenuItem
                    onClick={() => {
                        handleClose();
                        navigate("add/existing");
                    }}
                >
                    <ListItemIcon>
                        <SearchIcon fontSize="small" />
                    </ListItemIcon>
                    <Typography>Proyecto existente</Typography>
                </MenuItem>
            </Menu>
        </Box>
    );
};

export default AddContractProjectButtonGroup;
