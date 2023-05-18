import {useOutletContext} from "react-router-dom";

import {EntityViewSubPage} from "base/entity/components/container";
import {ListContractProjects} from "contract/container";

const ViewContractProjectsSubPage = () => {
    let contract;
    [contract] = useOutletContext();

    const sections = [<ListContractProjects projects={contract.projects} />];

    return contract && <EntityViewSubPage sections={sections} />;
};

export default ViewContractProjectsSubPage;
