import {useState} from "react";
import {useNavigate, useLocation} from "react-router-dom";
import {useAuth} from "base/user/provider";
import {APP_LOGO_URL, APP_NAME, APP_NAME_LONG} from "base/ui/app/config/appInfo";

import {LoginForm} from ".";
import {AlertError} from "base/error/components";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

const LoginPage = () => {
    let navigate = useNavigate();
    let location = useLocation();
    let auth = useAuth();

    const [error, setError] = useState("");

    let from = location.state?.from?.pathname || "/";

    function validateLogin(username, password) {
        auth.login(username, password, () => {})
            .then(() => {
                // Send them back to the page they tried to visit when they were
                // redirected to the login page. Use { replace: true } so we don't create
                // another entry in the history stack for the login page.  This means that
                // when they get to the protected page and click the back button, they
                // won't end up back on the login page, which is also really nice for the
                // user experience.
                navigate(from, {replace: true});
            })
            .catch(error => {
                setError(error);
            });
    }

    return (
        <Container
            component="main"
            sx={{
                height: "100vh",
                display: "flex",
                alignItems: "center",
            }}
        >
            <Grid
                container
                component={Paper}
                elevation={6}
                square
                sx={{borderRadius: "3px"}}
            >
                <Grid
                    item
                    xs={12}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage:
                            "url(https://images.unsplash.com/photo-1538300342682-cf57afb97285?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2574&q=80)",
                        backgroundRepeat: "no-repeat",
                        backgroundColor: t =>
                            t.palette.mode === "light"
                                ? t.palette.grey[50]
                                : t.palette.grey[900],
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        borderRadius: "3px 0px 0 3px",
                    }}
                />
                <Grid item xs={12} sm={8} md={5}>
                    <Box
                        component="header"
                        sx={{
                            mx: 4,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <img
                            src={APP_LOGO_URL}
                            alt={`${APP_NAME} logo`}
                            style={{padding: "24px"}}
                        />
                        <Typography component="h1" variant="h5" align="center">
                            {APP_NAME_LONG}
                        </Typography>
                    </Box>
                    <AlertError error={error} />
                    <LoginForm handleValidation={validateLogin} />
                </Grid>
            </Grid>
        </Container>
    );
};

export default LoginPage;
