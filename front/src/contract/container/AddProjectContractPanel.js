import {useState} from "react";
import {useOutletContext} from "react-router-dom";
import {useNavigateWithReload} from "base/navigation/hooks";
import {ProjectService} from "project/service";
import {project_view_adapter} from "project/model";

import {ContractFormSearch} from "contract/presentational/form";
import {EntityUpdatePanel} from "base/entity/components/presentational";

const AddProjectContractPanel = () => {
    const [error, setError] = useState("");

    const navigate = useNavigateWithReload();

    let project;
    [project] = useOutletContext();

    const handleContractToAdd = selectedContract => {
        const updatedProject = project_view_adapter({
            ...project,
            construction_contract: selectedContract,
        });
        ProjectService.update(updatedProject)
            .then(project => {
                navigate(`/projects/list/${project.id}/financing`, true);
            })
            .catch(error => {
                console.log(error);
                setError(error);
            });
    };

    const handleFormCancel = () => {
        navigate(`/projects/list/${project.id}/financing/`);
    };

    return (
        <EntityUpdatePanel
            title="Añadir contrato existente"
            form={<ContractFormSearch onSubmit={handleContractToAdd} />}
            onCancel={handleFormCancel}
            error={error}
        />
    );
};

export default AddProjectContractPanel;
