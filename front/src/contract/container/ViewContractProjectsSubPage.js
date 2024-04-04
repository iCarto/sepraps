import {useEffect, useState} from "react";
import {useOutletContext} from "react-router-dom";

import {EntityViewSubPage} from "base/entity/components/container";
import {ListContractProjects} from "contract/container";
import {ContractService} from "contract/service";
import {MapConfigProvider} from "base/geo/provider";

const ViewContractProjectsSubPage = () => {
    let contract;
    [contract] = useOutletContext();

    const [projects, setProjects] = useState([]);
    const [isLoading, setIsLoading] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        ContractService.getProjectsList(contract.id)
            .then(projects => {
                setProjects(projects);
                setIsLoading(false);
            })
            .catch(error => {
                setIsLoading(false);
                setError(error);
            });
    }, [contract]);

    const sections = [
        <MapConfigProvider>
            <ListContractProjects
                contract={contract}
                contractProjects={projects}
                error={error}
                isLoading={isLoading}
            />
        </MapConfigProvider>,
    ];

    return contract && <EntityViewSubPage sections={sections} />;
};

export default ViewContractProjectsSubPage;
