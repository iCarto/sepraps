import {useNavigateWithReload} from "base/navigation/hooks";
import {DialogLayout} from "base/shared/components";
import {ProjectService} from "project/service";
import {project_view_adapter} from "project/model";

const RemoveProjectProviderDialog = ({project, isDialogOpen, setIsDialogOpen}) => {
    const navigate = useNavigateWithReload();

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
