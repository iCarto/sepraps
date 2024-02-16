import {useOutletContext} from "react-router-dom";

import {ProviderContactService} from "provider/service";
import {UpdateContactPanel} from "contact/container";

const UpdateProviderContactPanel = () => {
    let provider;
    [provider] = useOutletContext();

    return (
        <UpdateContactPanel
            service={ProviderContactService}
            basePath={`/providers/list/${provider.id}/contacts`}
            allowedPosts={[
                "presidencia_prestador",
                "vicepresidencia_prestador",
                "tesoreria_prestador",
                "secretaria_prestador",
                "vocal_prestador",
                "otra_prestador",
            ]}
            entityId={provider.id}
        />
    );
};

export default UpdateProviderContactPanel;
