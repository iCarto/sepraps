import {useNavigate} from "react-router-dom";
import {useAuth} from "auth";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

const MainPage = () => {
    const auth = useAuth();
    const navigate = useNavigate();

    return (
        <Container
            component="main"
            sx={{
                height: "100vh",
                display: "flex",
                alignItems: "center",
            }}
        >
            <Box>
                <Typography variant="h3" component="div" align="center" gutterBottom>
                    Herramienta de seguimiento de programas de agua potable y
                    saneamiento
                </Typography>

                <Typography variant="body1" align="center" gutterBottom>
                    Hola {auth.user}
                </Typography>

                <Typography align="center">
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
                </Typography>
            </Box>
        </Container>
    );
};

export default MainPage;
