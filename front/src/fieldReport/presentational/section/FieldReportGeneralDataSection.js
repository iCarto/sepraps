import {useNavigate} from "react-router-dom";

import {useAuth} from "base/user/provider";
import {DateUtil} from "base/format/utilities";
import {
    SectionCard,
    SectionCardHeaderAction,
    SectionField,
} from "base/ui/section/components";

import EditIcon from "@mui/icons-material/Edit";

const FieldReportGeneralDataSection = ({fieldReport}) => {
    const navigate = useNavigate();
    const {ROLES} = useAuth();

    const secondaryActions = [
        <SectionCardHeaderAction
            key="edit"
            name="edit"
            text="Modificar"
            icon={<EditIcon />}
            onClick={() => {
                navigate(`generaldata/edit`);
            }}
            roles={[ROLES.EDIT, ROLES.MANAGEMENT, ROLES.SUPERVISION]}
        />,
    ];

    const reported_persons = fieldReport?.reported_persons.map(
        person => `${person.name} (${person.role})`
    );
    const other_reporting_persons = fieldReport?.other_reporting_persons.map(
        person => `${person.name} (${person.role})`
    );

    return (
        <SectionCard title="Datos del informe" secondaryActions={secondaryActions}>
            <SectionField label="Nombre" value={fieldReport?.report_name} />
            <SectionField label="Nº de memorándum" value={fieldReport?.report_code} />
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
    );
};

export default FieldReportGeneralDataSection;
