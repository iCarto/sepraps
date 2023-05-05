import {useState} from "react";
import {useOutletContext} from "react-router-dom";
import {useNavigateWithReload} from "base/navigation/hooks";
import {ProjectService} from "project/service";
import {project_view_adapter} from "project/model";

import {ProjectLinkedLocalitiesForm} from "../presentational/location";
import {EntityUpdatePanel} from "base/entity/components";

const AddProjectLinkedLocalitiesPanel = () => {
    const [error, setError] = useState("");
    const navigate = useNavigateWithReload();

    let project;
    [project] = useOutletContext();

    const basePath = `/projects/${project.id}/location`;

    const handleSubmit = project => {
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
            title="Añadir localidad"
            form={
                <ProjectLinkedLocalitiesForm
                    project={project}
                    onSubmit={handleSubmit}
                />
            }
            onCancel={handleFormCancel}
            error={error}
        />
    );
};

export default AddProjectLinkedLocalitiesPanel;
