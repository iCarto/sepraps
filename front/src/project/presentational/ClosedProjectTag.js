import Box from "@mui/material/Box/Box";
import Typography from "@mui/material/Typography";

const ClosedProjectTag = ({tagCustomStyle = {}}) => {
    const tagStyle = {
        my: 1,
        px: 0.5,
        borderRadius: "5%",
        bgcolor: "error.main",
        opacity: 0.8,
        ...tagCustomStyle,
    };

    return (
        <Box sx={tagStyle}>
            <Typography
                component="span"
                variant="button"
                sx={{fontWeight: 800, color: "#fff"}}
            >
                Archivado
            </Typography>
        </Box>
    );
};

export default ClosedProjectTag;
