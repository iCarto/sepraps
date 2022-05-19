import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";

const CloseProjectButton = ({allMilestonesCompleted, openDialog}) => {
    const handleDialog = () => {
        openDialog();
    };

    // --------TO-DO: Tooltip not working on disabled button. Override pointer events to allow.

    const archiveDisabledText =
        "El proyecto aún no se puede archivar porque no se han cumplido todos sus hitos";

    return (
        <Tooltip title={!allMilestonesCompleted ? archiveDisabledText : ""}>
            <Button
                variant="contained"
                color="error"
                disabled={!allMilestonesCompleted}
                onClick={handleDialog}
            >
                Archivar proyecto
            </Button>
        </Tooltip>
    );
};

export default CloseProjectButton;
