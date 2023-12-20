import styled from "@mui/material/styles/styled";

import {SIDEBAR_PANEL_DRAWER_WIDTH} from "../app/config/measurements";

const ContentContainer = styled("main", {
    shouldForwardProp: prop => prop !== "open" && prop !== "openMarginRight",
})(({theme, style, openMarginRight = SIDEBAR_PANEL_DRAWER_WIDTH, open}) => ({
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
        marginRight: openMarginRight,
    }),
    ...style,
}));

export default ContentContainer;
