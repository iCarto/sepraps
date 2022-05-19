import {useNavigateWithReload} from "hooks";
import {DialogLayout} from "components/common/presentational";
import {ProjectService} from "service/api";
import {project_view_adapter} from "model";

const CloseProjectDialog = ({project, isDialogOpen, setIsDialogOpen}) => {
    const navigate = useNavigateWithReload();

    const handleDialog = isOpen => {
        setIsDialogOpen(isOpen);
    };

    //-------- TO-DO UPDATE FUNCTION
    const handleConfirmClosure = () => {
        console.log("Projecto cerrado");
        setIsDialogOpen(false);
        navigate("/projects/" + project.id + "/milestones", true);
    };

    return (
        <DialogLayout
            dialogLabel="Close project"
            dialogTitle="¿Quiere archivar este proyecto?"
            dialogContentText="Si hace clic en Archivar, el proyecto se cerrará y no aparecerá en los proyectos activos."
            mainActionClick={handleConfirmClosure}
            mainActionText="Archivar"
            handleDialog={handleDialog}
            isDialogOpen={isDialogOpen}
        />
    );
};

export default CloseProjectDialog;
