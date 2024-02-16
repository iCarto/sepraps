import {useParams} from "react-router-dom";
import {ContractContactService} from "contract/service";

import {ViewContactPanel} from "contact/container";

const ViewContractContactPanel = () => {
    const {contactId} = useParams();

    return <ViewContactPanel service={ContractContactService} id={contactId} />;
};

export default ViewContractContactPanel;
