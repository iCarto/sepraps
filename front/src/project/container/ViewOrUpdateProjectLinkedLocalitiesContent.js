import {useState} from "react";
import {useAuth} from "base/user/provider";
import {useNavigateWithReload} from "base/navigation/hooks";

import {ProjectService} from "project/service";
import {project_view_adapter} from "project/model";
import {SectionCard, SectionCardHeaderAction} from "base/ui/section/components";
import {
    ProjectForm,
    ProjectFormLinkedLocalitiesList,
} from "project/presentational/form";
import {ProjectLinkedLocalitiesSection} from "project/presentational/section";
import EditIcon from "@mui/icons-material/Edit";

const ViewOrUpdateProjectLinkedLocalitiesContent = ({project}) => {
    const navigate = useNavigateWithReload();
    const {ROLES} = useAuth();
    const basePath = `/projects/list/${project.id}/location`;

    const [mode, setMode] = useState("view");
    const [error, setError] = useState(null);

    const secondaryActions = [
        <SectionCardHeaderAction
            key="edit"
            name="edit"
            text="Modificar"
            icon={<EditIcon />}
            onClick={() => {
                setMode("edit");
            }}
            roles={[ROLES.EDIT, ROLES.MANAGEMENT, ROLES.SUPERVISION]}
        />,
    ];

    const handleFormSubmit = project => {
        ProjectService.update(project_view_adapter({...project}))
            .then(() => {
                navigate(basePath, true);
            })
            .catch(error => {
                console.log(error);
                setError(error);
            });
    };

    const getComponent = mode => {
        if (mode === "view") {
            return <ProjectLinkedLocalitiesSection project={project} />;
        }
        if (mode === "edit") {
            return (
                <ProjectForm
                    project={project}
                    onSubmit={handleFormSubmit}
                    onCancel={() => {
                        setMode("view");
                    }}
                    error={error}
                >
                    <ProjectFormLinkedLocalitiesList name="linked_localities" />
                </ProjectForm>
            );
        }
    };

    return (
        <SectionCard
            title="Localidades vinculadas"
            secondaryActions={!project.closed && secondaryActions}
        >
            {getComponent(mode)}
        </SectionCard>
    );
};

export default ViewOrUpdateProjectLinkedLocalitiesContent;
