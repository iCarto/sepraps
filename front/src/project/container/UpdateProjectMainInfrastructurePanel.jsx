import {useState} from "react";
import {useOutletContext} from "react-router-dom";
import {useNavigateWithReload} from "base/navigation/hooks";
import {ProjectService} from "project/service";
import {project_view_adapter} from "project/model";

import {ProjectForm} from "project/presentational/form";
import {EntityUpdatePanel} from "base/entity/components/presentational";

const UpdateProjectMainInfrastructurePanel = () => {
    const [error, setError] = useState("");
    const navigate = useNavigateWithReload();

    let project;
    [project] = useOutletContext();

    const basePath = `/projects/list/${project.id}/location`;

    const handleSubmit = project => {
        console.log(project);
        ProjectService.update(project_view_adapter({...project}))
            .then(() => {
                navigate(basePath, true);
            })
            .catch(error => {
                console.log(error);
                setError(error);
            });
    };

    const handleFormCancel = () => {
        navigate(basePath);
    };

    return (
        <EntityUpdatePanel
            title="Modificar infraestructura principal"
            form={
                <ProjectForm
                    project={project}
                    updatedSection="main_infrastructure"
                    onSubmit={handleSubmit}
                />
            }
            onCancel={handleFormCancel}
            error={error}
        />
    );
};

export default UpdateProjectMainInfrastructurePanel;
