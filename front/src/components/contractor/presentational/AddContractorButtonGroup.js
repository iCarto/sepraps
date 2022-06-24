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

const AddContractorButtonGroup = () => {
    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = useState(null);
    const ref = createRef();

    const open = Boolean(anchorEl);

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box>
            <Button
                id="menu-button"
                color="primary"
                variant="contained"
                onClick={() => {
                    setAnchorEl(ref.current);
                }}
                endIcon={<ArrowDropDownIcon />}
                ref={ref}
                mt={0}
            >
                Añadir
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
                        navigate("contractor/new/add");
                    }}
                >
                    <ListItemIcon>
                        <AddIcon fontSize="small" />
                    </ListItemIcon>
                    <Typography>Nuevo Contratista</Typography>
                </MenuItem>
                <MenuItem
                    onClick={() => {
                        handleClose();
                        navigate("contractor/new/search");
                    }}
                >
                    <ListItemIcon>
                        <SearchIcon fontSize="small" />
                    </ListItemIcon>
                    <Typography>Contratista Existente</Typography>
                </MenuItem>
            </Menu>
        </Box>
    );
};

export default AddContractorButtonGroup;
