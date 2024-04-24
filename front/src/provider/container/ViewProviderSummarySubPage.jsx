import {useOutletContext} from "react-router-dom";
import {EntityViewSubPage} from "base/entity/components/container";
import {EntityAuditSection} from "base/entity/components/presentational/sections";
import {
    ViewOrUpdateProviderGeneralDataContent,
    ViewOrUpdateProviderLegalDataContent,
} from ".";

const ViewProviderSummarySubPage = () => {
    let provider;
    [provider] = useOutletContext();

    const sections = [
        <ViewOrUpdateProviderGeneralDataContent provider={provider} />,
        <ViewOrUpdateProviderLegalDataContent provider={provider} />,
        <EntityAuditSection entity={provider} />,
    ];

    return provider && <EntityViewSubPage sections={sections} />;
};

export default ViewProviderSummarySubPage;
