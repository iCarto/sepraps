import Button from "@mui/material/Button";

const CloseProjectButton = ({allMilestonesCompleted, openDialog, projectIsClosed}) => {
    const handleDialog = () => {
        openDialog();
    };

    return (
        <Button
            variant="contained"
            color="error"
            disabled={!allMilestonesCompleted || projectIsClosed}
            onClick={handleDialog}
        >
            {projectIsClosed ? "Proyecto archivado" : "Archivar proyecto"}
        </Button>
    );
};

export default CloseProjectButton;
