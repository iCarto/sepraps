import {useState} from "react";
import {useAuth} from "base/user/provider";
import {useNavigateWithReload} from "base/navigation/hooks";

import {ProjectService} from "project/service";
import {project_view_adapter} from "project/model";
import {SectionCard, SectionCardHeaderAction} from "base/ui/section/components";
import {MapInfrastructure} from "base/map/components";
import {ProjectForm, ProjectFormLocationFields} from "project/presentational/form";
import {FormContainer} from "base/form/components";
import EditIcon from "@mui/icons-material/Edit";

const ViewOrUpdateProjectInfrastructureContent = ({project}) => {
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
            return (
                <MapInfrastructure
                    infrastructure={{
                        latitude: project.main_infrastructure.latitude,
                        longitude: project.main_infrastructure.longitude,
                        altitude: project.main_infrastructure.altitude,
                        name: project.name,
                        location: project.location,
                    }}
                />
            );
        }
        if (mode === "edit") {
            return (
                <FormContainer>
                    <ProjectForm
                        project={project}
                        onSubmit={handleFormSubmit}
                        onCancel={() => {
                            setMode("view");
                        }}
                        error={error}
                    >
                        <ProjectFormLocationFields orientation="horizontal" />
                    </ProjectForm>
                </FormContainer>
            );
        }
    };

    return (
        <SectionCard
            title="Infraestructura principal"
            secondaryActions={!project.closed && secondaryActions}
        >
            {getComponent(mode)}
        </SectionCard>
    );
};

export default ViewOrUpdateProjectInfrastructureContent;
