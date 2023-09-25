import {useEffect, useState} from "react";
import {useLocation, useParams} from "react-router-dom";

import {ProviderService} from "provider/service";
import {useConfigModule} from "base/ui/module/provider";

import {PageLayout} from "base/ui/main";
import {ProviderSubPageMenu} from "provider/menu";

const ViewProviderPage = () => {
    const {id} = useParams();
    const [provider, setProvider] = useState(null);
    const location = useLocation();

    const {addToModuleFilter, setModuleBasePath} = useConfigModule();

    useEffect(() => {
        setProvider(null);
        setModuleBasePath(`/providers/list/${id}`);
        ProviderService.get(id).then(data => {
            addToModuleFilter({provider: data.id});
            setProvider(data);
        });
    }, [id, location.state?.lastRefreshDate]);

    return (
        provider && (
            <PageLayout
                menu={<ProviderSubPageMenu provider={provider} />}
                context={[provider]}
                subPage={true}
            />
        )
    );
};
export default ViewProviderPage;
