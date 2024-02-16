import {useParams} from "react-router-dom";

import {ViewContactPanel} from "contact/container";
import {ProviderContactService} from "provider/service";

const ViewProviderContactPanel = () => {
    const {contactId} = useParams();

    return <ViewContactPanel service={ProviderContactService} id={contactId} />;
};

export default ViewProviderContactPanel;
