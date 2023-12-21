import {useOutletContext} from "react-router-dom";

import {ContractContactsSection} from "contract/presentational/section";
import {EntityViewSubPage} from "base/entity/components/container";
import {EntityAddButtonGroup} from "base/entity/components/presentational";

const ViewContractStaffSubPage = ({area}) => {
    let contract;
    [contract] = useOutletContext();

    const sections = [<ContractContactsSection contract={contract} area={area} />];

    const subPageActions = [<EntityAddButtonGroup />];

    return (
        contract && (
            <EntityViewSubPage sections={sections} subPageActions={subPageActions} />
        )
    );
};

export default ViewContractStaffSubPage;
