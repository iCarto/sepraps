import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const ShowNoOfProjects = ({numberOfProjects}) => {
    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                px: 1,
                backgroundColor: "grey.600",
                borderRadius: 1,
                color: "grey.100",
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
