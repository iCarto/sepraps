import {useOutletContext} from "react-router-dom";
import {EntityViewSubPage} from "base/entity/pages";
import {ProviderContactsSection} from "provider/presentational/section";
import {AddContactButtonGroup} from "contact/presentational";
import {DownloadEntityPDFReportButton} from "base/report/components";

const ViewProviderContactsSubPage = () => {
    let provider;
    [provider] = useOutletContext();

    const sections = [<ProviderContactsSection provider={provider} />];

    const subPageActions = [
        <AddContactButtonGroup />,
        // TO-DO: CREATE NEW COMPONENT TO PRINT CONTACTS INSTEAD OF ENTITY REPORT
        <DownloadEntityPDFReportButton />,
    ];

    return (
        provider && (
            <EntityViewSubPage sections={sections} subPageActions={subPageActions} />
        )
    );
};

export default ViewProviderContactsSubPage;
