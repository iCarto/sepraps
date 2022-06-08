import Button from "@mui/material/Button";
import {AuthAction, useAuth} from "auth";

const CloseProjectButton = ({allMilestonesCompleted, openDialog, projectIsClosed}) => {
    const {ROLES} = useAuth();

    const handleDialog = () => {
        openDialog();
    };

    return (
        <AuthAction roles={[ROLES.MANAGEMENT]}>
            <Button
                variant="contained"
                color="error"
                disabled={!allMilestonesCompleted || projectIsClosed}
                onClick={handleDialog}
            >
                {projectIsClosed ? "Proyecto archivado" : "Archivar proyecto"}
            </Button>
        </AuthAction>
    );
};

export default CloseProjectButton;
