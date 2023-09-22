import {useNavigate, useParams} from "react-router-dom";

import {FieldReportService} from "fieldReport/service";
import {DateUtil} from "base/format/utilities";

import {EntitySummaryPanel} from "base/entity/components/presentational";
import {SectionField} from "base/ui/section/components";

const ViewFieldReportPanel = () => {
    const {id} = useParams();
    const navigate = useNavigate();

    const getSectionData = fieldReport => {
        return (
            <>
                <SectionField label="Número de memorándum" value={fieldReport.code} />
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
                    label="Elaborado por"
                    value={`${fieldReport?.reporting_person}`}
                />
                <SectionField
                    label="Otros participantes en la intervención"
                    value={fieldReport?.participant_persons?.join(", ")}
                />
                <SectionField
                    label="A la atención de"
                    value={fieldReport?.reported_persons?.join(", ")}
                />
            </>
        );
    };

    const handleClickDetail = () => {
        navigate(`/field-reports/${id}/summary`);
    };

    return (
        <EntitySummaryPanel
            service={FieldReportService}
            id={id}
            title="Informe de viaje"
            getSectionTitle={fieldReport => fieldReport?.name}
            getSectionData={getSectionData}
            onClickDetailButton={handleClickDetail}
        />
    );
};

export default ViewFieldReportPanel;
