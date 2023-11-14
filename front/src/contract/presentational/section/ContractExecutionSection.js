import {useNavigate} from "react-router-dom";
import {useAuth} from "base/user/provider";
import {DateUtil} from "base/format/utilities";
import {FieldUtil} from "base/ui/section/utilities";

import {
    SectionCard,
    SectionCardHeaderAction,
    SectionField,
} from "base/ui/section/components";
import EditIcon from "@mui/icons-material/Edit";

const ContractExecutionSection = ({contract}) => {
    const navigate = useNavigate();
    const {ROLES} = useAuth();

    const secondaryActions = [
        <SectionCardHeaderAction
            key="edit"
            name="edit"
            text="Modificar"
            icon={<EditIcon />}
            onClick={() => {
                navigate("execution/edit");
            }}
            roles={[ROLES.EDIT, ROLES.MANAGEMENT, ROLES.SUPERVISION]}
        />,
    ];

    const getNoDateMessage = label => (
        <SectionField
            label={label}
            value="Pendiente"
            valueCustomStyle={{fontStyle: "italic"}}
        />
    );

    const getExpectedExecutionPeriodInfo = () => {
        if (contract.execution_certificate_start_date) {
            return `${contract.expected_execution_period} días (${contract.expected_execution_period_in_months} meses)`;
        } else return `${contract.expected_execution_period} días`;
    };

    return (
        <SectionCard title="Ejecución" secondaryActions={secondaryActions}>
            {FieldUtil.getSectionField(
                "Fecha de firma del contrato",
                DateUtil.formatDate(contract?.execution_signature_date)
            )}
            {FieldUtil.getSectionField(
                "Fecha del acta de inicio",
                DateUtil.formatDate(contract?.execution_certificate_start_date)
            )}

            {contract?.expected_execution_period ? (
                <SectionField
                    label="Plazo previsto de ejecución"
                    value={getExpectedExecutionPeriodInfo()}
                />
            ) : (
                getNoDateMessage("Plazo previsto de ejecución:")
            )}
            {contract?.execution_certificate_start_date &&
                FieldUtil.getSectionField(
                    "Fecha prevista de fin de ejecución",
                    DateUtil.formatDate(contract?.expected_execution_end_date)
                )}
        </SectionCard>
    );
};

export default ContractExecutionSection;
