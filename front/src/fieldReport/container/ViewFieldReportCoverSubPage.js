import {EntityViewSubPage} from "base/entity/components/container";
import {FieldReportGeneralDataSection} from "fieldReport/presentational/section";
import {useOutletContext} from "react-router-dom";

const ViewFieldReportCoverSubPage = () => {
    let fieldReport;
    [fieldReport] = useOutletContext();

    const sections = [<FieldReportGeneralDataSection fieldReport={fieldReport} />];

    return <EntityViewSubPage sections={sections} />;
};

export default ViewFieldReportCoverSubPage;
