import {useParams} from "react-router-dom";

import {ContractorContactService} from "contractor/service";
import {ViewContactPanel} from "contact/container";

const ViewContractorContactPanel = () => {
    const {contactId} = useParams();

    return <ViewContactPanel service={ContractorContactService} id={contactId} />;
};

export default ViewContractorContactPanel;
