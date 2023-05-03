import {useEffect} from "react";
import {useOutletContext} from "react-router-dom";

import {ActionsMenu} from "base/shared/components";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import CancelIcon from "@mui/icons-material/Cancel";
import Divider from "@mui/material/Divider";

const SidebarPanelLayout = ({
    children,
    sidebarTitle,
    mainActionText = "",
    mainActionClick = null,
    mainActionIcon = null,
    sidebarActions = null,
    closeSidebarClick,
}) => {
    // setSidebarPanelOpen function is always the last element in the context array
    let setSidebarPanelOpen;
    const outletContext = useOutletContext();
    if (outletContext) {
        setSidebarPanelOpen = outletContext[outletContext.length - 1];
    }

    useEffect(() => {
        setSidebarPanelOpen(true);

        // returned function will be called on component unmount
        return () => {
            setSidebarPanelOpen(false);
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
                sx={{
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
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
                        <ActionsMenu>{sidebarActions}</ActionsMenu>
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

export default SidebarPanelLayout;
