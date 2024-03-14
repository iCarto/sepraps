import {useParams} from "react-router-dom";

import {ViewContactPanel} from "contact/container";
import {ContactService} from "contact/service";

const ViewProjectContactPanel = () => {
    const {contactId} = useParams();

    return <ViewContactPanel service={ContactService} id={contactId} />;
};

export default ViewProjectContactPanel;
