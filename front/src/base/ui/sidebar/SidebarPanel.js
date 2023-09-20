import {useEffect} from "react";
import {useOutletContext} from "react-router-dom";

import {MenuActions} from "base/ui/menu";

import styled from "@mui/material/styles/styled";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import CancelIcon from "@mui/icons-material/Cancel";
import Divider from "@mui/material/Divider";

const DrawerHeader = styled("div")(({theme}) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const SidebarPanel = ({
    sidebarTitle,
    mainActionText = "",
    mainActionClick = null,
    mainActionIcon = null,
    sidebarActions = null,
    closeSidebarClick,
    children,
}) => {
    // setOpen function is always the last element in the context array
    let setOpen;
    const outletContext = useOutletContext();
    if (outletContext) {
        setOpen = outletContext[outletContext.length - 1];
    }

    useEffect(() => {
        setOpen(true);

        // returned function will be called on component unmount
        return () => {
            setOpen(false);
        };
    });

    const onClose = () => {
        closeSidebarClick();
    };

    const onMainActionClick = () => {
        mainActionClick();
    };

    return (
        <Box component="aside">
            <Grid
                container
                p={2}
                pb={1}
                sx={{justifyContent: "space-between", alignItems: "center"}}
            >
                <Grid item xs={sidebarActions ? 9 : 10}>
                    <Box sx={{display: "flex", justifyContent: "flex-start"}} p={1}>
                        <Typography
                            variant="h6"
                            color="primary"
                            align="left"
                            sx={{
                                lineHeight: 1.25,
                                letterSpacing: 0,
                            }}
                        >
                            {sidebarTitle}
                        </Typography>
                    </Box>
                </Grid>
                {sidebarActions && (
                    <Grid item xs="auto">
                        <MenuActions>{sidebarActions}</MenuActions>
                    </Grid>
                )}
                <Grid item xs="auto">
                    <Tooltip title="Cerrar">
                        <IconButton onClick={onClose}>
                            <CancelIcon />
                        </IconButton>
                    </Tooltip>
                </Grid>
            </Grid>
            <Divider />
            <Box p={3}>
                <Grid container>{children}</Grid>
                {mainActionClick && (
                    <Grid container justifyContent="center" mt={2}>
                        <Button
                            variant="contained"
                            onClick={onMainActionClick}
                            startIcon={mainActionIcon ? mainActionIcon : null}
                        >
                            {mainActionText}
                        </Button>
                    </Grid>
                )}
            </Box>
        </Box>
    );
};

export {SidebarPanel as default, DrawerHeader};
