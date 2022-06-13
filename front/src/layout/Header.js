import {Link} from "react-router-dom";

import {useAuth} from "auth";

import {AccountMenu} from "components/user/presentational";

import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";

const Header = () => {
    let auth = useAuth();

    return auth.user ? (
        <AppBar
            position="fixed"
            color="primary"
            sx={{
                zIndex: theme => theme.zIndex.drawer + 1,
                paddingRight: 2,
            }}
        >
            <Toolbar
                disableGutters
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                }}
            >
                <Box sx={{px: "38px", backgroundColor: "white", height: "65px"}}>
                    <Link to="" title="Inicio">
                        <img src="/logo/logo_senasa.jpg" alt="Senasa logo" />
                    </Link>
                </Box>
                <AccountMenu />
            </Toolbar>
        </AppBar>
    ) : null;
};

export default Header;
