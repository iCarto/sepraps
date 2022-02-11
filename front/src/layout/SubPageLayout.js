import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import {styled} from "@mui/material/styles";
import {UpdateProjectProviderPanel} from "components/project/container";
import {Fragment} from "react";
import {Outlet} from "react-router-dom";

const drawerWidth = 440;

const DrawerHeader = styled("div")(({theme}) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const SubPageLayout = ({outletContext = [], ...props}) => {
    return (
        <Fragment>
            <Box
                component="main"
                sx={{
                    backgroundColor: theme =>
                        theme.palette.mode === "light"
                            ? theme.palette.grey[100]
                            : theme.palette.grey[900],
                    flexGrow: 1,
                    height: "100vh",
                    overflow: "auto",
                }}
            >
                {props.children}
            </Box>
            <Outlet context={[...outletContext]} />
        </Fragment>
    );
};

export default SubPageLayout;
