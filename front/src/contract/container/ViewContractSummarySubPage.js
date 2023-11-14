import {useOutletContext} from "react-router-dom";
import {EntityViewSubPage} from "base/entity/components/container";
import {EntityAuditSection} from "base/entity/components/presentational/sections";
import {ViewOrUpdateContractContent} from ".";

const ViewContractSummarySubPage = () => {
    let contract;
    [contract] = useOutletContext();

    const sections = [
        <ViewOrUpdateContractContent
            contract={contract}
            section="generaldata"
            label="Información"
        />,
        <EntityAuditSection entity={contract} />,
    ];

    return contract && <EntityViewSubPage sections={sections} />;
};

export default ViewContractSummarySubPage;
