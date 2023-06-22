import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";

import {FieldReportService} from "fieldReport/service";
import {DateUtil} from "base/format/utilities";

import {EntityViewPanel} from "base/entity/components/presentational";
import {SectionCard, SectionField} from "base/ui/section/components";

const ViewFieldReportPanel = () => {
    const {id} = useParams();
    const navigate = useNavigate();

    const [fieldReport, setFieldReport] = useState(null);

    useEffect(() => {
        FieldReportService.get(id).then(fieldReport => {
            setFieldReport(fieldReport);
        });
    }, [id]);

    const handleClickDetail = () => {
        navigate(`/field-reports/${fieldReport.id}/summary`);
    };

    return (
        fieldReport && (
            <EntityViewPanel
                onClickDetailButton={handleClickDetail}
                title="Informe de viaje"
            >
                <SectionCard title={fieldReport.report_name}>
                    <SectionField label="Memorándum" value={fieldReport.report_code} />
                    <SectionField
                        label="Fecha"
                        value={DateUtil.formatDate(fieldReport.report_date)}
                    />
                    <SectionField
                        label="Autor/a"
                        value={fieldReport.reporting_person_name}
                    />
                </SectionCard>
            </EntityViewPanel>
        )
    );
};

export default ViewFieldReportPanel;
