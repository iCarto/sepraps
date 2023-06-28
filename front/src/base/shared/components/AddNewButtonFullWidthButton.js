import {cloneElement} from "react";
import {AuthAction} from "base/user/components";

import Stack from "@mui/material/Stack";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const AddNewButtonFullWidthButton = ({onClick, roles = [], icon = null}) => {
    const buttonIcon = icon || <AddCircleIcon />;

    const buttonStyle = {
        justifyContent: "center",
        alignItems: "center",
        p: 1,
        flexGrow: 1,
        backgroundColor: "grey.200",
        borderRadius: 1,
        "&:hover": {
            cursor: "pointer",
            backgroundColor: "grey.100",
        },
        "&:active": {
            transform: "translateY(1px)",
        },
    };

    const handleClick = () => {
        onClick();
    };

    return (
        <AuthAction roles={roles}>
            <Stack sx={buttonStyle} onClick={handleClick}>
                {cloneElement(buttonIcon, {
                    sx: {color: "grey.600", ...icon?.props?.sx},
                })}
            </Stack>
        </AuthAction>
    );
};

export default AddNewButtonFullWidthButton;
