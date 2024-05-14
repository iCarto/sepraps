import Button from "@mui/material/Button";

const CloseProjectButton = ({openDialog, isButtonDisabled, isProjectClosed}) => {
    const handleDialog = () => {
        openDialog();
    };

    return (
        <Button
            variant="contained"
            color="error"
            disabled={isButtonDisabled}
            onClick={handleDialog}
        >
            {isProjectClosed ? "Proyecto archivado" : "Archivar proyecto"}
        </Button>
    );
};

export default CloseProjectButton;
