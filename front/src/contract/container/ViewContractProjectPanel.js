import {useEffect, useState} from "react";
import {useOutletContext, useParams} from "react-router-dom";

import {useNavigateWithReload} from "base/navigation/hooks";
import {ContractService} from "contract/service";
import {ProjectService} from "project/service";
import {contract_view_adapter, createContract} from "contract/model";

import {EntityViewPanel} from "base/entity/components/presentational";
import {ProjectSection} from "project/presentational/section";

const ViewContractProjectPanel = () => {
    const navigate = useNavigateWithReload();
    const [project, setProject] = useState(null);
    const [error, setError] = useState("");

    let contract;
    [contract] = useOutletContext();

    const {idInfoPanel: projectId} = useParams();
    const {id: contractId} = useParams();

    useEffect(() => {
        ProjectService.get(projectId).then(project => {
            setProject(project);
        });
    }, [projectId]);

    const handleCloseSidebar = () => {
        navigate(`/contracts/${contractId}/projects`);
    };

    const handleUpdateContract = updatedContract => {
        ContractService.update(contract_view_adapter({...updatedContract}))
            .then(() => {
                navigate(`/contracts/${contractId}/projects`, true);
            })
            .catch(error => {
                console.log(error);
                setError(error);
            });
    };

    const handleClickDetail = () => {
        navigate(`/projects/${project?.id}/summary`);
    };

    return (
        <EntityViewPanel
            title="Datos básicos del proyecto"
            onClickCloseSidebar={handleCloseSidebar}
            onClickDetailButton={handleClickDetail}
            showRemoveAction={true}
            onClickRemoveAction={handleUpdateContract}
            createEntityObject={createContract}
            entity={contract}
            subEntityList={contract.projects}
            subEntityName="projects"
        >
            {<ProjectSection project={project} />}
        </EntityViewPanel>
    );
};

export default ViewContractProjectPanel;
