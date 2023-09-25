import {useState} from "react";
import {useLocation, useOutletContext, useParams} from "react-router-dom";
import {useNavigateWithReload} from "base/navigation/hooks";
import {ProjectService} from "project/service";
import {project_view_adapter} from "project/model";

import {ProjectForm} from "project/presentational/form";
import {EntityUpdatePanel} from "base/entity/components/presentational";

const UpdateProjectPanel = () => {
    const {section} = useParams();
    const location = useLocation();
    const basePath = location.pathname.split(section)[0];

    const [error, setError] = useState("");
    const navigate = useNavigateWithReload();

    let project;
    [project] = useOutletContext();

    const handleSubmit = project => {
        ProjectService.update(project_view_adapter({...project}))
            .then(() => {
                navigate(`/projects/list/${project.id}/summary`, true);
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
            title="Modificar proyecto"
            form={
                <ProjectForm
                    project={project}
                    updatedSection={section}
                    onSubmit={handleSubmit}
                    onCancel={handleFormCancel}
                />
            }
            onCancel={handleFormCancel}
            error={error}
        />
    );
};

export default UpdateProjectPanel;
