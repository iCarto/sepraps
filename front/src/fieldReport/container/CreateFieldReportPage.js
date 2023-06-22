import {useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";

import {FieldReportService} from "fieldReport/service";
import {fieldReport_view_adapter} from "fieldReport/model";

import {EntityCreatePage} from "base/entity/components/container";
import {FieldReportForm} from "fieldReport/presentational/form";

const CreateFieldReportPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const basePath = location.pathname.split("/new")[0];

    const [error, setError] = useState("");

    const handleFormSubmit = fieldReport => {
        FieldReportService.create(fieldReport_view_adapter({...fieldReport}))
            .then(createdFieldReport => {
                navigate(`${basePath}/${createdFieldReport.id}/summary`);
            })
            .catch(error => {
                console.log(error);
                setError(error);
            });
    };

    const handleFormCancel = () => {
        navigate(`${basePath}/list`);
    };

    return (
        <EntityCreatePage
            title="Registro de informe de viaje"
            form={
                <FieldReportForm
                    onSubmit={handleFormSubmit}
                    onCancel={handleFormCancel}
                />
            }
            error={error}
        />
    );
};

export default CreateFieldReportPage;
