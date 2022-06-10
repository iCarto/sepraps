import Button from "@mui/material/Button";

const CloseProjectButton = ({openDialog, isBtnDisabled, isProjectClosed}) => {
    const handleDialog = () => {
        openDialog();
    };

    return (
        <Button
            variant="contained"
            color="error"
            disabled={isBtnDisabled}
            onClick={handleDialog}
        >
            {isProjectClosed ? "Proyecto archivado" : "Archivar proyecto"}
        </Button>
    );
};

export default CloseProjectButton;
