import {useState} from "react";
import {useOutletContext} from "react-router-dom";

import {useNavigateWithReload} from "base/navigation/hooks";
import {MilestoneService} from "milestone/service";

import {MilestoneForm} from "milestone/presentational";
import {EntityUpdatePanel} from "base/entity/components";

const UpdateMilestonePanel = () => {
    const [error, setError] = useState("");
    const navigate = useNavigateWithReload();

    let project;
    [project] = useOutletContext();

    const basePath = `/projects/${project.id}/milestones`;

    const handleSubmit = milestone => {
        MilestoneService.update(milestone)
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
            title="Fecha de cumplimiento"
            form={<MilestoneForm onSubmit={handleSubmit} />}
            onCancel={handleFormCancel}
            error={error}
        />
    );
};

export default UpdateMilestonePanel;
