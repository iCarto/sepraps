import {useOutletContext} from "react-router-dom";
import {EntityViewSubPage} from "base/entity/pages";
import {ProviderContactsSection} from "provider/presentational/section";
import {EntityAddButtonGroup} from "base/entity/components";

const ViewProviderContactsSubPage = () => {
    let provider;
    [provider] = useOutletContext();

    const sections = [<ProviderContactsSection provider={provider} />];

    const subPageActions = [<EntityAddButtonGroup />];

    return (
        provider && (
            <EntityViewSubPage sections={sections} subPageActions={subPageActions} />
        )
    );
};

export default ViewProviderContactsSubPage;
