import {useNavigateWithReload} from "hooks";
import {DialogLayout} from "components/common/presentational";
import {ProjectService} from "service/api";
import {project_view_adapter} from "model";

const RemoveProjectProviderDialog = ({project, isDialogOpen, setIsDialogOpen}) => {
    const navigate = useNavigateWithReload();

    console.log({isDialogOpen});

    const handleDialog = isOpen => {
        setIsDialogOpen(isOpen);
    };

    const handleConfirmRemoval = () => {
        setIsDialogOpen(false);
        ProjectService.updateProject(
            project_view_adapter({...project, provider: null})
        ).then(() => {
            navigate("/projects/" + project.id + "/location", true);
        });
    };

    return (
        <DialogLayout
            dialogLabel="Remove provider"
            dialogTitle="¿Quiere quitar este prestador del proyecto?"
            dialogContentText="Si hace clic en Quitar, el proyecto ya no tendrá un prestador asociado."
            mainActionClick={handleConfirmRemoval}
            mainActionText="Quitar"
            handleDialog={handleDialog}
            isDialogOpen={isDialogOpen}
        />
    );
};

export default RemoveProjectProviderDialog;
