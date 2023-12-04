import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";

const AddNewInlineItemFormBox = ({label, children}) => (
    <Box
        sx={{
            p: 3,
            border: 2,
            borderRadius: 2,
            borderColor: "primary.main",
            bgcolor: "grey.50",
        }}
    >
        <Stack direction="row" spacing={1} sx={{mb: 3}}>
            <AddCircleOutlineOutlinedIcon sx={{color: "grey"}} />
            <Typography color="grey.700" sx={{textTransform: "uppercase"}}>
                {label}
            </Typography>
        </Stack>
        {children}
    </Box>
);

export default AddNewInlineItemFormBox;
