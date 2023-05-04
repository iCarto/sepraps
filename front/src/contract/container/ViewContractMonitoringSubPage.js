import {useOutletContext} from "react-router-dom";

import {ContractContactsSection} from "contract/presentational/section";
import {EntityViewSubPage} from "base/entity/pages";
import {EntityAddButtonGroup} from "base/entity/components";

const ViewContractMonitoringSubPage = () => {
    let contract;
    [contract] = useOutletContext();

    const sections = [<ContractContactsSection contract={contract} />];

    const subPageActions = [<EntityAddButtonGroup />];

    return (
        contract && (
            <EntityViewSubPage sections={sections} subPageActions={subPageActions} />
        )
    );
};

export default ViewContractMonitoringSubPage;
