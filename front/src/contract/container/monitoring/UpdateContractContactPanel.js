import {useOutletContext} from "react-router-dom";

import {ContractContactService} from "contract/service";
import {UpdateContactPanel} from "contact/container";

const UpdateContractContactPanel = ({area}) => {
    let contract;
    [contract] = useOutletContext();

    return (
        <UpdateContactPanel
            service={ContractContactService}
            basePath={`/contracts/list/${contract.id}/${area}_staff`}
            allowedPosts={[
                "residente_obra",
                "fiscal_obra",
                "supervisor_obra",
                "coordinador_social",
                "supervisor_social",
                "otro_contacto",
            ]}
            entityId={contract.id}
        />
    );
};

export default UpdateContractContactPanel;
