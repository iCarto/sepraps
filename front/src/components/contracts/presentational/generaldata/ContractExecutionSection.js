import {useOutletContext, useNavigate} from "react-router-dom";
import {useAuth} from "auth";
import {DateUtil} from "utilities";

import {
    SectionCard,
    SectionCardHeaderAction,
    SectionField,
} from "components/common/presentational";
import EditIcon from "@mui/icons-material/Edit";

const ContractExecutionSection = () => {
    const navigate = useNavigate();
    const {ROLES} = useAuth();

    let contract;
    [contract] = useOutletContext();

    const secondaryActions = [
        <SectionCardHeaderAction
            key="edit"
            name="edit"
            text="Modificar"
            icon={<EditIcon />}
            onClick={() => {
                navigate("execution/edit");
            }}
            roles={[ROLES.EDIT, ROLES.MANAGEMENT]}
        />,
    ];

    const getNoDatetMessage = label => (
        <SectionField label={label} value="Pendiente" valueFontStyle="italic" />
    );

    const getDatetInfo = (label, date) => {
        if (date) {
            return <SectionField label={label} value={DateUtil.formatDate(date)} />;
        } else
            return (
                <SectionField label={label} value="Pendiente" valueFontStyle="italic" />
            );
    };

    const getExpectedExecutionPeriodInfo = () => {
        if (contract.execution_certificate_start_date) {
            return `${contract.expected_execution_period} días (${contract.expected_execution_period_in_months} meses)`;
        } else return `${contract.expected_execution_period} días`;
    };

    return (
        <SectionCard title="Ejecución" secondaryActions={secondaryActions}>
            {getDatetInfo(
                "Fecha de firma del contrato:",
                contract.execution_signature_date
            )}
            {getDatetInfo(
                "Fecha del acta de inicio:",
                contract.execution_certificate_start_date
            )}

            {contract.expected_execution_period ? (
                <SectionField
                    label="Plazo previsto de ejecución:"
                    value={getExpectedExecutionPeriodInfo()}
                />
            ) : (
                getNoDatetMessage("Plazo previsto de ejecución:")
            )}
            {contract.execution_certificate_start_date &&
                getDatetInfo(
                    "Fecha prevista de fin de ejecución:",
                    contract.expected_execution_end_date
                )}
            {getDatetInfo(
                "Fecha de recepción definitiva:",
                contract.execution_final_delivery_date
            )}
        </SectionCard>
    );
};

export default ContractExecutionSection;
