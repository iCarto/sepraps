import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

const PageWithMenuLayout = ({menu, children}) => {
    return (
        <Grid container>
            <Grid item style={{width: "210px", position: "fixed"}}>
                {menu}
            </Grid>
            <Grid item xs style={{marginLeft: "210px"}}>
                <Box
                    component="main"
                    sx={{
                        backgroundColor: theme =>
                            theme.palette.mode === "light"
                                ? theme.palette.grey[100]
                                : theme.palette.grey[900],
                        height: "100vh",
                        borderLeft: 1,
                        borderColor: theme => theme.palette.grey[300],
                    }}
                >
                    {children}
                </Box>
            </Grid>
        </Grid>
    );
};

export default PageWithMenuLayout;
