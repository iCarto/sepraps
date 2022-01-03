import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

const ShowNoOfProjects = ({numberOfProjects}) => {
    return (
        <Grid
            item
            xs={12}
            sm={4}
            lg={6}
            sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    px: 1,
                    border: 1,
                    borderRadius: 1,
                    color: "grey.700",
                    textTransform: "uppercase",
                }}
            >
                <Typography
                    component="span"
                    variant="h4"
                    sx={{
                        mr: 1,
                    }}
                >
                    {numberOfProjects}
                </Typography>
                <Typography variant="body1">proyectos</Typography>
            </Box>
        </Grid>
    );
};

export default ShowNoOfProjects;
