import {useOutletContext} from "react-router-dom";

import {TabPanel} from "base/ui/tab";
import {FieldReportProjectForm} from "fieldReportProject/presentational/form";
import {FieldReportProjectService} from "fieldReportProject/service";
import {fieldReportProject_view_adapter} from "fieldReportProject/model";
import {useNavigateWithReload} from "base/navigation/hooks";

const FieldReportNewProjectTabPanel = ({index, value}) => {
    let fieldReport;
    [fieldReport] = useOutletContext();

    const basePath = `/field-reports/${fieldReport.id}/projects`;
    const navigate = useNavigateWithReload();

    const handleSubmit = fieldReportProject => {
        FieldReportProjectService.create(
            fieldReportProject_view_adapter({
                ...fieldReportProject,
                field_report: fieldReport.id,
            })
        )
            .then(() => {
                navigate(basePath, true);
            })
            .catch(error => {
                console.log(error);
                // setError(error);
            });
    };

    return (
        <TabPanel key={index} value={value} index={index}>
            <FieldReportProjectForm onSubmit={handleSubmit} />
        </TabPanel>
    );
};

export default FieldReportNewProjectTabPanel;
