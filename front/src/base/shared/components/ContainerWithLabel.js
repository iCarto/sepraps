import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

/**
 * This component renders a Box container with a tag imitating defaut MUI input boxes
 *
 */

const ContainerWithLabel = ({label = "", isAreaActive = false, children, ...props}) => {
    return (
        <Box
            sx={{
                position: "relative",
                mt: 1,
                p: 1,
                border: 1,
                borderColor: isAreaActive ? "grey.800" : "grey.400",
                borderRadius: 1,
                backgroundColor: "white",
            }}
        >
            <Typography
                component="label"
                sx={{
                    position: "absolute",
                    top: "-10px",
                    left: "10px",
                    px: "6px",
                    backgroundColor: "grey.50",
                    fontSize: "12px",
                    color: "grey.600",
                }}
            >
                {label}
            </Typography>
            {children}
        </Box>
    );
};

export default ContainerWithLabel;
