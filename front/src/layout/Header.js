import {useAuth} from "auth";
import {useNavigate} from "react-router-dom";

import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {Fragment} from "react";

export default function Header() {
    let auth = useAuth();
    let navigate = useNavigate();

    return auth.user ? (
        <AppBar
            position="static"
            color="default"
            elevation={0}
            sx={{borderBottom: theme => `1px solid ${theme.palette.divider}`}}
        >
            <Toolbar sx={{flexWrap: "wrap"}}>
                <Typography variant="h6" color="inherit" noWrap sx={{flexGrow: 1}}>
                    SEPRAPS
                </Typography>
                <Fragment>
                    <Typography>Conectado como: {auth.user}</Typography>
                    <Button
                        href="#"
                        variant="outlined"
                        sx={{my: 1, mx: 1.5}}
                        onClick={() => {
                            auth.logout(() => navigate("/"));
                        }}
                    >
                        Cerrar sesión
                    </Button>
                </Fragment>
            </Toolbar>
        </AppBar>
    ) : null;
}
