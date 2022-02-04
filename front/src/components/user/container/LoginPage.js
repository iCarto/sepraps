import {useState} from "react";
import {useNavigate, useLocation} from "react-router-dom";
import {useAuth} from "auth";

import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";
import {LoginForm} from "../presentational";

const LoginPage = () => {
    let navigate = useNavigate();
    let location = useLocation();
    let auth = useAuth();

    const [error, setError] = useState("");

    let from = location.state?.from?.pathname || "/projects";

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
                setError(error.message);
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
            <Grid container component={Paper} elevation={6} square>
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
                        <Box
                            height="180px"
                            width="240px"
                            sx={{
                                backgroundImage:
                                    "url(https://pbs.twimg.com/profile_images/1301610161329573893/1-eNzLME_400x400.jpg)",
                                backgroundRepeat: "no-repeat",
                                backgroundSize: "cover",
                                backgroundPosition: "center center",
                            }}
                        />
                        <Typography component="h1" variant="h5" align="center">
                            Herramienta de seguimiento de programas de agua potable y
                            saneamiento
                        </Typography>
                    </Box>
                    {error && <Alert severity="error">{error}</Alert>}
                    <LoginForm handleValidation={validateLogin} />
                </Grid>
            </Grid>
        </Container>
    );
};

export default LoginPage;
