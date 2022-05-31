import {useOutletContext, useNavigate} from "react-router-dom";
import {useAuth} from "auth";
import {DateUtil} from "utilities";

import {
    SectionCard,
    SectionCardHeaderAction,
    SectionField,
} from "components/common/presentational";
import EditIcon from "@mui/icons-material/Edit";

const ContractExecutionSection = ({isSidePanelOpen = null}) => {
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

    const getDatetInfo = (label, date) => (
        <SectionField label={label} value={DateUtil.formatDate(date)} />
    );

    const getNoDatetInfo = label => (
        <SectionField label={label} value="Pendiente" valueFontStyle="italic" />
    );

    return (
        <SectionCard
            title="Ejecución"
            secondaryActions={secondaryActions}
            isSidePanelOpen={isSidePanelOpen}
        >
            {contract.execution_signature_date
                ? getDatetInfo(
                      "Fecha de firma del contrato:",
                      contract.execution_signature_date
                  )
                : getNoDatetInfo("Fecha de firma del contrato:")}
            {contract.execution_certificate_start_date
                ? getDatetInfo(
                      "Fecha del acta de inicio:",
                      contract.execution_certificate_start_date
                  )
                : getNoDatetInfo("Fecha del acta de inicio:")}
            {contract.expected_execution_period ? (
                <SectionField
                    label="Plazo previsto de ejecución:"
                    value={contract.expected_execution_period + " días"}
                />
            ) : (
                getNoDatetInfo("Plazo previsto de ejecución:")
            )}
            {contract.expected_execution_end_date
                ? getDatetInfo(
                      "Fecha prevista de fin de ejecución:",
                      contract.expected_execution_end_date
                  )
                : getNoDatetInfo("Fecha prevista de fin de ejecución:")}
            {contract.execution_final_delivery_date
                ? getDatetInfo(
                      "Fecha de recepción definitiva:",
                      contract.execution_final_delivery_date
                  )
                : getNoDatetInfo("Fecha de recepción definitiva:")}
        </SectionCard>
    );
};

export default ContractExecutionSection;
