import {useNavigate} from "react-router-dom";

import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";

const EntityCreateButton = ({basePath = ""}) => {
    const navigate = useNavigate();

    return (
        <Button
            variant="contained"
            onClick={() => {
                navigate(`/${basePath}/new`);
            }}
            startIcon={<AddIcon />}
        >
            Crear
        </Button>
    );
};
export default EntityCreateButton;
