import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

const FormBox = ({label, children}) => {
    return (
        <Box
            sx={{
                border: 0,
                borderRadius: 2,
                borderColor: "grey.300",
                p: 1,
            }}
        >
            <Typography
                sx={{color: "grey.500", fontSize: "0.8rem", textTransform: "uppercase"}}
            >
                {label}
            </Typography>
            <Divider />
            <Box sx={{p: 2}}>{children}</Box>
        </Box>
    );
};

export default FormBox;
