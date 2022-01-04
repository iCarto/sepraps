import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const ShowNoOfProjects = ({numberOfProjects}) => {
    return (
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
    );
};

export default ShowNoOfProjects;
