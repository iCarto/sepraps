import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const Tag = ({content}) => {
    return (
        <Box
            sx={{
                ml: "12px",
                px: "6px",
                py: "3px",
                backgroundColor: "secondary.light",
                borderRadius: 1,
            }}
        >
            <Typography fontSize={"12px"}>{content}</Typography>
        </Box>
    );
};

export default Tag;
