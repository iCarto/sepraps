import {useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";

import {ProjectService} from "project/service";
import {project_view_adapter} from "project/model";

import {ProjectForm} from "project/presentational/form";
import {EntityCreatePage} from "base/entity/pages";

const CreateProjectPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const basePath = location.pathname.split("/new")[0];

    const [error, setError] = useState("");

    const handleFormSubmit = project => {
        ProjectService.create(project_view_adapter({...project}))
            .then(createdProject => {
                navigate(`/projects/${createdProject.id}/summary`);
            })
            .catch(error => {
                console.log(error);
                setError(error);
            });
    };

    const handleFormCancel = () => {
        navigate(`${basePath}/list`);
    };

    return (
        <EntityCreatePage
            title="Registro de proyecto"
            form={
                <ProjectForm onSubmit={handleFormSubmit} onCancel={handleFormCancel} />
            }
            error={error}
        />
    );
};

export default CreateProjectPage;
