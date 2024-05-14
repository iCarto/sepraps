import {FormContainer} from "base/form/components";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";

const AddNewInlineItemFormBox = ({label, children}) => (
    <FormContainer style={{p: 3}}>
        <Stack direction="row" spacing={1} sx={{mb: 3}}>
            <AddCircleOutlineOutlinedIcon sx={{color: "grey"}} />
            <Typography color="grey.700" sx={{textTransform: "uppercase"}}>
                {label}
            </Typography>
        </Stack>
        {children}
    </FormContainer>
);

export default AddNewInlineItemFormBox;
