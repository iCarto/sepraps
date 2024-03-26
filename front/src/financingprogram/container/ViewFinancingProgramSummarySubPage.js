import {useOutletContext} from "react-router-dom";
import {EntityViewSubPage} from "base/entity/components/container";
import {EntityAuditSection} from "base/entity/components/presentational/sections";
import {ViewOrUpdateFinancingProgramGeneralDataContent} from ".";

const ViewFinancingProgramSummarySubPage = () => {
    let financingprogram;
    [financingprogram] = useOutletContext();

    const sections = [
        <ViewOrUpdateFinancingProgramGeneralDataContent
            financingprogram={financingprogram}
        />,
    ];

    return financingprogram && <EntityViewSubPage sections={sections} />;
};

export default ViewFinancingProgramSummarySubPage;
