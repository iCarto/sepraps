import {useEffect, useState} from "react";
import {useOutletContext} from "react-router-dom";

import {EntityViewSubPage} from "base/entity/components/container";
import {ListContractProjects} from "contract/container";
import {ContractService} from "contract/service";

const ViewContractProjectsSubPage = () => {
    let contract;
    [contract] = useOutletContext();

    const [projects, setProjects] = useState([]);

    useEffect(() => {
        ContractService.getProjectsList(contract.id).then(projects => {
            setProjects(projects);
        });
    }, [contract]);

    const sections = [<ListContractProjects contract={contract} projects={projects} />];

    return contract && <EntityViewSubPage sections={sections} />;
};

export default ViewContractProjectsSubPage;
