import {EntityViewSubPage} from "base/entity/components/container";
import {FieldReportProjectsSection} from "fieldReport/presentational/section";

const ViewFieldReportProjectsSubPage = () => {
    const sections = [<FieldReportProjectsSection />];

    return <EntityViewSubPage sections={sections} />;
};

export default ViewFieldReportProjectsSubPage;
