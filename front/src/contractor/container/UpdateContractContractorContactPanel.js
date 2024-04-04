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
            allowedPosts={[
                "responsable_del_contratista",
                "residente_de_obra",
                "fiscal_de_obra",
                "fiscal_social",
            ]}
            entityId={contract.contractor.id}
        />
    );
};

export default UpdateContractContractorContactPanel;
