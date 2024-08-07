import {useState} from "react";
import {useOutletContext} from "react-router-dom";

import {FieldReportProjectService} from "fieldReportProject/service";
import {fieldReportProject_view_adapter} from "fieldReportProject/model";
import {useNavigateWithReload} from "base/navigation/hooks";

import {AlertError} from "base/error/components";
import {FieldReportProjectForm} from "fieldReportProject/presentational/form";
import {TabPanel} from "base/ui/tab/components";

const FieldReportNewProjectTabPanel = ({index, activeTabId}) => {
    let fieldReport;
    [fieldReport] = useOutletContext();

    const [error, setError] = useState("");

    const basePath = `/field-reports/list/${fieldReport.id}/projects`;
    const navigate = useNavigateWithReload();

    const handleSubmit = fieldReportProject => {
        console.log(fieldReportProject);
        return FieldReportProjectService.create(
            fieldReportProject_view_adapter({
                ...fieldReportProject,
                field_report: fieldReport.id,
            })
        )
            .then(createdFieldReportProject => {
                navigate(`${basePath}/${createdFieldReportProject.id}`, true);
            })
            .catch(error => {
                console.log(error);
                setError(error);
            });
    };

    return (
        <TabPanel key={index} index={index} visible={activeTabId === -1}>
            <AlertError error={error} />
            <FieldReportProjectForm onSubmit={handleSubmit} />
        </TabPanel>
    );
};

export default FieldReportNewProjectTabPanel;
