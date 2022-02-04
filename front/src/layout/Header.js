import {useAuth} from "auth";

import {AccountMenu} from "components/user/presentational";

import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

const Header = ({onShowDrawer}) => {
    let auth = useAuth();

    return auth.user ? (
        <AppBar
            position="fixed"
            color="primary"
            sx={{
                zIndex: theme => theme.zIndex.drawer + 1,
            }}
        >
            <Toolbar
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                }}
            >
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={onShowDrawer}
                    edge="start"
                >
                    <MenuIcon />
                </IconButton>
                <Box sx={{px: 2, backgroundColor: "white", height: "65px"}}>
                    <img src="/logo/logo_senasa.jpg" alt="Senasa logo" />
                </Box>
                <AccountMenu />
            </Toolbar>
        </AppBar>
    ) : null;
};

export default Header;
