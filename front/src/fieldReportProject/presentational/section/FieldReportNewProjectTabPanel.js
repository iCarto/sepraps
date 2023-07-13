import {useState} from "react";
import {useOutletContext} from "react-router-dom";

import {FieldReportProjectService} from "fieldReportProject/service";
import {fieldReportProject_view_adapter} from "fieldReportProject/model";
import {useNavigateWithReload} from "base/navigation/hooks";

import {TabPanel} from "base/ui/tab";
import {AlertError} from "base/error/components";
import {FieldReportProjectForm} from "fieldReportProject/presentational/form";

const FieldReportNewProjectTabPanel = ({index, value}) => {
    let fieldReport;
    [fieldReport] = useOutletContext();

    const [error, setError] = useState("");

    const basePath = `/field-reports/${fieldReport.id}/projects`;
    const navigate = useNavigateWithReload();

    const handleSubmit = fieldReportProject => {
        console.log(fieldReportProject);
        FieldReportProjectService.create(
            fieldReportProject_view_adapter({
                ...fieldReportProject,
                field_report: fieldReport.id,
            })
        )
            .then(() => {
                navigate(`${basePath}/${fieldReportProject.project}`, true);
            })
            .catch(error => {
                console.log(error);
                setError(error);
            });
    };

    return (
        <TabPanel key={index} value={value} index={index}>
            <AlertError error={error} />
            <FieldReportProjectForm onSubmit={handleSubmit} />
        </TabPanel>
    );
};

export default FieldReportNewProjectTabPanel;
