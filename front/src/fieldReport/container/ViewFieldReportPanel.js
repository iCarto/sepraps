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

    const reported_persons = fieldReport?.reported_persons.map(
        person => `${person.name}`
    );
    const other_reporting_persons = fieldReport?.other_reporting_persons.map(
        person => `${person.name}`
    );

    return (
        fieldReport && (
            <EntityViewPanel
                onClickDetailButton={handleClickDetail}
                title="Informe de viaje"
            >
                <SectionCard title={fieldReport.name}>
                    <SectionField label="Memorándum" value={fieldReport.code} />
                    <SectionField
                        label="Fecha del informe"
                        value={DateUtil.formatDate(fieldReport.date)}
                    />
                    <SectionField
                        label="Fechas de la intervención"
                        value={`${DateUtil.formatDate(
                            fieldReport?.visit_date_start
                        )} - ${DateUtil.formatDate(fieldReport?.visit_date_end)}`}
                    />
                    <SectionField
                        label="Autor/a"
                        value={`${fieldReport?.reporting_person_name}, (${fieldReport?.reporting_person_role})`}
                    />
                    <SectionField
                        label="Participante/s en la intervención"
                        value={other_reporting_persons?.join(", ")}
                    />
                    <SectionField
                        label="Responsable/s de aprobación"
                        value={reported_persons?.join(", ")}
                    />
                </SectionCard>
            </EntityViewPanel>
        )
    );
};

export default ViewFieldReportPanel;
