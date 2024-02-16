import {useOutletContext} from "react-router-dom";

import {ContractContactsSection} from "contract/presentational/section";
import {EntityViewSubPage} from "base/entity/components/container";

const ViewContractStaffSubPage = ({area}) => {
    let contract;
    [contract] = useOutletContext();

    const sections = [<ContractContactsSection contract={contract} area={area} />];

    return contract && <EntityViewSubPage sections={sections} />;
};

export default ViewContractStaffSubPage;
