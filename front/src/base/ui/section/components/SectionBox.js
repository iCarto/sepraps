import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

const SectionBox = ({label, children}) => {
    return (
        <Box
            sx={{
                border: 1,
                borderRadius: 2,
                borderColor: "grey.200",
                mt: 3,
                p: 1,
            }}
        >
            <Typography sx={{color: "grey.500", fontSize: "0.8rem"}}>
                {label}
            </Typography>
            <Divider />
            {children}
        </Box>
    );
};

export default SectionBox;
