import {useOutletContext} from "react-router-dom";

import {ContractorContactService} from "contractor/service";
import {UpdateContactPanel} from "contact/container";

const UpdateContractContractorContactPanel = () => {
    let contract;
    [contract] = useOutletContext();

    return (
        <UpdateContactPanel
            service={ContractorContactService}
            basePath={`/contracts/list/${contract.id}/awarding`}
            allowedPosts={["responsable_contratista", "residente_obra"]}
            entityId={contract.id}
        />
    );
};

export default UpdateContractContractorContactPanel;
