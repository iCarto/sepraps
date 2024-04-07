import {useOutletContext} from "react-router-dom";

import {ContractContactsSection} from "contract/presentational/section";
import {EntityViewSubPage} from "base/entity/components/container";
import {SUPERVISION_AREAS} from "contract/model";

const ViewContractStaffSubPage = () => {
    let contract;
    [contract] = useOutletContext();

    const sections = [
        <ContractContactsSection
            contractId={contract.id}
            area={SUPERVISION_AREAS.BUILDING}
            title="Plantel área técnica"
        />,
        <ContractContactsSection
            contractId={contract.id}
            area={SUPERVISION_AREAS.SOCIAL}
            title="Plantel área social"
        />,
    ];

    return contract && <EntityViewSubPage sections={sections} />;
};

export default ViewContractStaffSubPage;
