import {useOutletContext} from "react-router-dom";

import {TabPanel} from "base/ui/tab";
import {FieldReportProjectForm} from "../form";

const FieldReportNewProjectTabPanel = ({index, value}) => {
    let fieldReport;
    [fieldReport] = useOutletContext();

    const basePath = `/field-reports/${fieldReport.id}/projects`;

    const handleSubmit = fieldReport => {
        console.log("handleSubmit", fieldReport);
        // FieldReportService.update(fieldReport_view_adapter({...fieldReport}))
        //     .then(() => {
        //         navigate(basePath, true);
        //     })
        //     .catch(error => {
        //         console.log(error);
        //         setError(error);
        //     });
    };

    return (
        <TabPanel key={index} value={value} index={index}>
            <FieldReportProjectForm onSubmit={handleSubmit} />
        </TabPanel>
    );
};

export default FieldReportNewProjectTabPanel;
