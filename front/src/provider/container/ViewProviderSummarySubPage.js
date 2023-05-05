import {useOutletContext} from "react-router-dom";
import {EntityViewSubPage} from "base/entity/pages";
import {EntityAuditSection} from "base/entity/sections";
import {ProviderGeneralDataSection} from "provider/presentational/section";

const ViewProviderSummarySubPage = () => {
    let provider;
    [provider] = useOutletContext();

    const sections = [
        <ProviderGeneralDataSection provider={provider} />,
        <EntityAuditSection entity={provider} />,
    ];

    return provider && <EntityViewSubPage sections={sections} />;
};

export default ViewProviderSummarySubPage;
