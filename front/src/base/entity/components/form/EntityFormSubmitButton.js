import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

const EntityFormSubmitButton = ({isSubmitting, onSubmit}) => {
    return (
        <Button variant="contained" onClick={() => onSubmit()} disabled={isSubmitting}>
            Guardar
            {isSubmitting && <CircularProgress size={15} sx={{ml: 1}} />}
        </Button>
    );
};

export default EntityFormSubmitButton;
