import {useState} from "react";
import {useNavigate} from "react-router";

import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";

import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import AddIcon from "@mui/icons-material/Add";
import InputIcon from "@mui/icons-material/Input";
import Stack from "@mui/material/Stack";

const ListSelector = ({
    title,
    items,
    renderItem,
    basePath = null,
    showAddButton = true,
    onClickMenuButton = null,
    secondaryAction = null,
}) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const openMenu = Boolean(anchorEl);
    const navigate = useNavigate();

    const handleOpenMenu = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    return (
        <Paper
            elevation={3}
            sx={{
                p: 1,
                backgroundColor: "grey.100",
                borderRadius: 1,
            }}
        >
            <Grid
                container
                justifyContent="space-between"
                alignItems="center"
                p={1}
                pr={0}
            >
                <Typography color="primary.main" sx={{textTransform: "uppercase"}}>
                    {title}
                </Typography>
                <Stack direction="row">
                    {showAddButton && !onClickMenuButton ? (
                        <IconButton
                            aria-label="add-new-button"
                            color="primary"
                            size="large"
                            onClick={() => {
                                navigate(`${basePath}/new`);
                            }}
                        >
                            <Tooltip id="add-new-button-tooltip" title="Añadir nuevo">
                                <AddCircleOutlineOutlinedIcon color="primary" />
                            </Tooltip>
                        </IconButton>
                    ) : null}
                    {onClickMenuButton ? (
                        <div>
                            <Tooltip title="Nuevo componente" placement="bottom-end">
                                <IconButton
                                    aria-label="new-component"
                                    onClick={handleOpenMenu}
                                >
                                    <AddCircleOutlineOutlinedIcon color="primary" />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                id="basic-menu"
                                anchorEl={anchorEl}
                                open={openMenu}
                                onClose={handleCloseMenu}
                                MenuListProps={{
                                    "aria-labelledby": "basic-button",
                                }}
                            >
                                <MenuItem
                                    onClick={() => {
                                        handleCloseMenu();
                                        onClickMenuButton("create");
                                    }}
                                >
                                    <ListItemIcon>
                                        <AddIcon />
                                    </ListItemIcon>
                                    <ListItemText>Crear nuevo</ListItemText>
                                </MenuItem>
                                <MenuItem
                                    onClick={() => {
                                        handleCloseMenu();
                                        onClickMenuButton("import");
                                    }}
                                >
                                    <ListItemIcon>
                                        <InputIcon />
                                    </ListItemIcon>
                                    <ListItemText>Importar existente</ListItemText>
                                </MenuItem>
                            </Menu>
                        </div>
                    ) : null}
                    {secondaryAction}
                </Stack>
            </Grid>
            <List
                sx={{
                    p: 0,
                    border: 1,
                    borderColor: "grey.300",
                    borderRadius: 1,
                    backgroundColor: "grey.200",
                    maxHeight: "600px",
                    overflow: "auto",
                }}
            >
                {items &&
                    items.map((item, index) => (
                        <Box key={item.id}>
                            {index != 0 && <Divider sx={{borderColor: "grey.200"}} />}
                            {renderItem(item)}
                        </Box>
                    ))}
            </List>
        </Paper>
    );
};

export default ListSelector;
