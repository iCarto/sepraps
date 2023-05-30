import {useNavigate} from "react-router-dom";
import {AuthAction} from "base/user/components";
import Button from "@mui/material/Button";

const AddNewButton = ({basePath, roles = []}) => {
    const navigate = useNavigate();

    return (
        <AuthAction roles={roles}>
            <Button
                variant="contained"
                color="primary"
                onClick={() => {
                    navigate(basePath);
                }}
            >
                Añadir
            </Button>
        </AuthAction>
    );
};

export default AddNewButton;
