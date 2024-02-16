import {useOutletContext} from "react-router-dom";

import {ContractContactService} from "contract/service";
import {UpdateContactPanel} from "contact/container";

const UpdateContractContactPanel = ({area}) => {
    let contract;
    [contract] = useOutletContext();

    const getAllowedPosts = contract => {
        const supervisionArea = contract?.supervision_areas.find(
            supervision_area => supervision_area.area === area
        );
        return supervisionArea ? supervisionArea.staff : [];
    };

    return (
        <UpdateContactPanel
            service={ContractContactService}
            basePath={`/contracts/list/${contract.id}/${area}_staff`}
            allowedPosts={getAllowedPosts(contract)}
            entityId={contract.id}
        />
    );
};

export default UpdateContractContactPanel;
