import {useState} from "react";
import {Outlet} from "react-router-dom";
import useTheme from "@mui/material/styles/useTheme";

import Container from "@mui/material/Container";
import Drawer from "@mui/material/Drawer";
import styled from "@mui/material/styles/styled";

const rightPanelDrawerWidth = 440;

const DrawerHeader = styled("div")(({theme}) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const Main = styled("main", {shouldForwardProp: prop => prop !== "open"})(
    ({theme, open}) => ({
        flexGrow: 1,
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginRight: 0,
        ...(open && {
            transition: theme.transitions.create("margin", {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginRight: rightPanelDrawerWidth,
        }),
        backgroundColor:
            theme.palette.mode === "light"
                ? theme.palette.pageBackground
                : theme.palette.grey[900],
        height: "calc(100vh - 64px)",
        minHeight: "100%",
    })
);

const PageLayoutWithPanel = ({
    outletContext = [],
    getIsSidePanelOpen = null,
    ...props
}) => {
    const theme = useTheme();

    const [rightPanelDrawerOpened, setRightPanelDrawerOpened] = useState(false);

    const getRightPanelDrawerStatus = () => {
        getIsSidePanelOpen(rightPanelDrawerOpened);
    };

    if (getIsSidePanelOpen) {
        getRightPanelDrawerStatus();
    }

    return (
        <Main open={rightPanelDrawerOpened}>
            <Container
                maxWidth="lg"
                sx={{
                    p: 3,
                    backgroundColor: theme.palette.pageBackground,
                }}
            >
                {props.children}
            </Container>
            <Drawer
                sx={{
                    width: rightPanelDrawerWidth,
                    flexShrink: 0,
                    "& .MuiDrawer-paper": {
                        width: rightPanelDrawerWidth,
                    },
                }}
                variant="persistent"
                anchor="right"
                open={rightPanelDrawerOpened}
            >
                <DrawerHeader />
                <Outlet
                    context={[
                        ...outletContext,
                        getIsSidePanelOpen,
                        setRightPanelDrawerOpened,
                    ]}
                />
            </Drawer>
        </Main>
    );
};

export default PageLayoutWithPanel;
