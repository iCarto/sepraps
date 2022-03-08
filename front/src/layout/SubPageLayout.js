import {useState} from "react";
import {Outlet} from "react-router-dom";

import Container from "@mui/material/Container";
import Drawer from "@mui/material/Drawer";
import styled from "@mui/material/styles/styled";

const leftPanelDrawerWidth = 440;

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
            marginRight: leftPanelDrawerWidth,
        }),
        backgroundColor:
            theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
        height: "calc(100vh - 64px);",
        minHeight: "100%",
    })
);

const SubPageLayout = ({outletContext = [], ...props}) => {
    const [leftPanelDrawerOpened, setLeftPanelDrawerOpened] = useState(false);

    return (
        <Main open={leftPanelDrawerOpened}>
            <Container
                maxWidth="lg"
                sx={{
                    p: 3,
                    backgroundColor: theme =>
                        theme.palette.mode === "light"
                            ? theme.palette.grey[100]
                            : theme.palette.grey[900],
                }}
            >
                {props.children}
            </Container>
            <Drawer
                sx={{
                    width: leftPanelDrawerWidth,
                    flexShrink: 0,
                    "& .MuiDrawer-paper": {
                        width: leftPanelDrawerWidth,
                    },
                }}
                variant="persistent"
                anchor="right"
                open={leftPanelDrawerOpened}
            >
                <DrawerHeader />
                <Outlet context={[...outletContext, setLeftPanelDrawerOpened]} />
            </Drawer>
        </Main>
    );
};

export default SubPageLayout;
