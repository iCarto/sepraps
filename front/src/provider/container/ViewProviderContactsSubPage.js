import {useOutletContext} from "react-router-dom";
import {EntityViewSubPage} from "base/entity/components/container";
import {ProviderContactsSection} from "provider/presentational/section";

const ViewProviderContactsSubPage = () => {
    let provider;
    [provider] = useOutletContext();

    const sections = [<ProviderContactsSection provider={provider} />];

    return provider && <EntityViewSubPage sections={sections} />;
};

export default ViewProviderContactsSubPage;
