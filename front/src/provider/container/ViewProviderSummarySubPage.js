import {useOutletContext} from "react-router-dom";
import {EntityViewSubPage} from "base/entity/pages";
import {EntityAuditSection} from "base/entity/sections";
import {ProviderGeneralDataSection} from "provider/presentational/section";
import {DownloadEntityPDFReportButton} from "base/report/components";

const ViewProviderSummarySubPage = () => {
    let provider;
    [provider] = useOutletContext();

    const sections = [
        <ProviderGeneralDataSection provider={provider} />,
        <EntityAuditSection entity={provider} />,
    ];

    const subPageActions = [<DownloadEntityPDFReportButton />];

    return (
        provider && (
            <EntityViewSubPage sections={sections} subPageActions={subPageActions} />
        )
    );
};

export default ViewProviderSummarySubPage;
