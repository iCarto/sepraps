import {useState} from "react";
import {useLocation, useOutletContext, useParams} from "react-router-dom";

import {FieldReportGoalsForm} from "../presentational/form";
import {useNavigateWithReload} from "base/navigation/hooks";
import {fieldReport_view_adapter} from "fieldReport/model";
import {FieldReportService} from "fieldReport/service";
import {EntityUpdatePanel} from "base/entity/components/presentational";

const UpdateFieldReportGoalsPanel = () => {
    const {action, goalId} = useParams();
    const location = useLocation();

    const [error, setError] = useState("");
    const navigate = useNavigateWithReload();

    let fieldReport;
    [fieldReport] = useOutletContext();

    const basePath = `/field-reports/${fieldReport.id}/summary`;

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

    const handleFormCancel = () => {
        navigate(basePath);
    };

    return (
        <EntityUpdatePanel
            title={action === "edit" ? `Modificar objetivo` : `Añadir objetivo`}
            form={
                <FieldReportGoalsForm
                    fieldReport={fieldReport}
                    goalId={action === "edit" ? goalId : null}
                    onSubmit={handleSubmit}
                />
            }
            onCancel={handleFormCancel}
            error={error}
        />
    );
};

export default UpdateFieldReportGoalsPanel;
