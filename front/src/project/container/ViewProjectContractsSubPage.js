import {useOutletContext} from "react-router-dom";

import {
    ProjectContractSection,
    ProjectOtherContractsSection,
} from "project/presentational/financing";
import {EntityViewSubPage} from "base/entity/components/container";

const ViewProjectContractsSubPage = () => {
    let project;
    [project] = useOutletContext();

    console.log({project});

    const sections = [
        <ProjectContractSection contract={project?.construction_contract} />,
        <ProjectOtherContractsSection
            contracts={project?.related_contracts.filter(
                contract => contract.id !== project?.construction_contract?.id
            )}
        />,
    ];

    return project && <EntityViewSubPage sections={sections} />;
};

export default ViewProjectContractsSubPage;
