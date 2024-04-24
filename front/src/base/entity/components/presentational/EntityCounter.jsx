import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const EntityCounter = ({size, entityName}) => {
    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minWidth: "fit-content",
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
                {size}
            </Typography>
            <Typography variant="body1">{entityName}</Typography>
        </Box>
    );
};

export default EntityCounter;
