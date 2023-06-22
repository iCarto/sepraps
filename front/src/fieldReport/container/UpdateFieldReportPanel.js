import {useState} from "react";
import {useLocation, useOutletContext, useParams} from "react-router-dom";

import {FieldReportForm} from "../presentational/form";
import {useNavigateWithReload} from "base/navigation/hooks";
import {fieldReport_view_adapter} from "fieldReport/model";
import {FieldReportService} from "fieldReport/service";
import {EntityUpdatePanel} from "base/entity/components/presentational";

const UpdateFieldReportPanel = () => {
    const {section} = useParams();
    const location = useLocation();
    const basePath = location.pathname.split(section)[0];

    const [error, setError] = useState("");
    const navigate = useNavigateWithReload();

    let fieldReport;
    [fieldReport] = useOutletContext();

    const handleSubmit = fieldReport => {
        FieldReportService.update(fieldReport_view_adapter({...fieldReport}))
            .then(() => {
                navigate(basePath, true);
            })
            .catch(error => {
                console.log(error);
                setError(error);
            });
    };

    const handleFormCancel = () => {
        navigate(basePath);
    };

    return (
        <EntityUpdatePanel
            title="Modificar informe de viaje"
            form={
                <FieldReportForm
                    fieldReport={fieldReport}
                    updatedSection={section}
                    onSubmit={handleSubmit}
                    onCancel={handleFormCancel}
                />
            }
            onCancel={handleFormCancel}
            error={error}
        />
    );
};

export default UpdateFieldReportPanel;
