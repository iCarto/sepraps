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

const AddContactButtonGroup = ({basePath, btnName}) => {
    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = useState(null);
    const ref = createRef();

    const open = Boolean(anchorEl);

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
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
                {btnName}
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    "aria-labelledby": "menu-button",
                }}
            >
                <MenuItem
                    onClick={() => {
                        handleClose();
                        navigate(basePath + "/new/add");
                    }}
                >
                    <ListItemIcon>
                        <AddIcon fontSize="small" />
                    </ListItemIcon>
                    <Typography>Nuevo</Typography>
                </MenuItem>
                <MenuItem
                    onClick={() => {
                        handleClose();
                        navigate(basePath + "/new/search");
                    }}
                >
                    <ListItemIcon>
                        <SearchIcon fontSize="small" />
                    </ListItemIcon>
                    <Typography>Existente</Typography>
                </MenuItem>
            </Menu>
        </>
    );
};

export default AddContactButtonGroup;
