import {useNavigate} from "react-router-dom";
import {AuthAction} from "base/user/components";
import Button from "@mui/material/Button";

const AddNewButton = ({text = "", basePath = "", onClick = null, roles = []}) => {
    const navigate = useNavigate();

    const handleClick = () => {
        if (onClick) onClick();
        else navigate(basePath);
    };

    return (
        <AuthAction roles={roles}>
            <Button variant="contained" color="primary" onClick={handleClick}>
                {text || "Añadir"}
            </Button>
        </AuthAction>
    );
};

export default AddNewButton;
