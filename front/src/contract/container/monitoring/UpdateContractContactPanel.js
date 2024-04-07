import {useOutletContext, useParams} from "react-router-dom";

import {ContractContactService} from "contract/service";
import {UpdateContactPanel} from "contact/container";

const UpdateContractContactPanel = () => {
    let contract;
    [contract] = useOutletContext();

    const {area} = useParams();

    const getAllowedPosts = contract => {
        const supervisionArea = contract?.supervision_areas.find(
            supervision_area => supervision_area.area === area
        );
        return supervisionArea ? supervisionArea.staff : [];
    };

    return (
        <UpdateContactPanel
            service={ContractContactService}
            basePath={`/contracts/list/${contract.id}/contacts`}
            allowedPosts={getAllowedPosts(contract)}
            entityId={contract.id}
        />
    );
};

export default UpdateContractContactPanel;
