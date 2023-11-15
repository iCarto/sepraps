import {createRef, useState} from "react";
import {useNavigate} from "react-router-dom";

import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Typography from "@mui/material/Typography";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";

const EntityAddButtonGroup = ({basePath = "", onAdd = null, onSearch = null}) => {
    const [anchorEl, setAnchorEl] = useState(null);

    const navigate = useNavigate();
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
                        onAdd ? onAdd() : navigate(`${basePath}add/new`);
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
                        onSearch ? onSearch() : navigate(`${basePath}add/existing`);
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

export default EntityAddButtonGroup;
