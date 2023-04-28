import {useState} from "react";
import {useOutletContext} from "react-router-dom";

import {ContractContactsSection} from "../presentational";
import {EntityViewSubPage} from "base/entity/pages";
import {DownloadEntityPDFReportButton} from "base/report/components";
import {AddContactButtonGroup} from "contact/presentational";

const ViewContractMonitoringSubPage = () => {
    let contract;
    [contract] = useOutletContext();

    const sections = [<ContractContactsSection contract={contract} />];

    const subPageActions = [
        <AddContactButtonGroup />,
        <DownloadEntityPDFReportButton />,
    ];

    return (
        contract && (
            <EntityViewSubPage sections={sections} subPageActions={subPageActions} />
        )
    );
};

export default ViewContractMonitoringSubPage;
