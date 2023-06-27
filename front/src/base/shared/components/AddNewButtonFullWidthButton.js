import {AuthAction} from "base/user/components";

import Stack from "@mui/material/Stack";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const AddNewButtonFullWidthButton = ({onClick = null, roles = []}) => {
    const buttonStyle = {
        alignItems: "center",
        p: 1,
        backgroundColor: "grey.200",
        borderRadius: 1,
        "&:hover": {
            cursor: "pointer",
            backgroundColor: "rgba(0, 0, 0, 0.04)",
        },
        "&:active": {
            transform: "translateY(1px)",
        },
    };

    const handleClick = () => {
        console.log("clic");
        // onClick();
    };

    return (
        <AuthAction roles={roles}>
            <Stack sx={buttonStyle} onClick={handleClick}>
                <AddCircleIcon sx={{color: "grey.600"}} />
            </Stack>
        </AuthAction>
    );
};

export default AddNewButtonFullWidthButton;
