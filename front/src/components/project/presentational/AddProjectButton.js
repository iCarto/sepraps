import {useNavigate} from "react-router-dom";

import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";

const AddProjectButton = ({basePath}) => {
    const navigate = useNavigate();

    return (
        <Button
            id="basic-button"
            color="primary"
            variant="contained"
            sx={{mt: 2}}
            onClick={() => {
                navigate(basePath + "/new/add");
            }}
            startIcon={<AddIcon />}
        >
            Añadir proyecto
        </Button>
    );
};

export default AddProjectButton;
