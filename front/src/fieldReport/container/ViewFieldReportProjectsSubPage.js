import {useOutletContext} from "react-router-dom";

import {EntityViewSubPage} from "base/entity/components/container";
import {FieldReportProjectsSection} from "fieldReport/presentational/section";

const ViewFieldReportProjectsSubPage = () => {
    let fieldReport;
    [fieldReport] = useOutletContext();

    const sections = [<FieldReportProjectsSection fieldReport={fieldReport} />];

    return fieldReport && <EntityViewSubPage sections={sections} />;
};

export default ViewFieldReportProjectsSubPage;
