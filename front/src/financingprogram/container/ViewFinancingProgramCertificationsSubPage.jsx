import {useOutletContext} from "react-router-dom";

import {ViewCertificationsAnalysisContent} from "certification/container";

const ViewFinancingProgramCertificationsSubPage = () => {
    const [financingProgram] = useOutletContext();

    return (
        <ViewCertificationsAnalysisContent
            filter={{financing_program: financingProgram.id}}
            showContract={true}
            showProject={true}
        />
    );
};

export default ViewFinancingProgramCertificationsSubPage;
