import {useOutletContext, useNavigate} from "react-router-dom";
import {DateUtil} from "utilities";

import {
    SectionCard,
    SectionCardHeaderAction,
    SectionField,
} from "components/common/presentational";
import EditIcon from "@mui/icons-material/Edit";

const ContractExecutionSection = ({isSidePanelOpen = null}) => {
    const navigate = useNavigate();

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
        />,
    ];

    return (
        <SectionCard
            title="Ejecución"
            secondaryActions={secondaryActions}
            isSidePanelOpen={isSidePanelOpen}
        >
            <SectionField
                label="Fecha de firma del contrato:"
                value={DateUtil.formatDate(contract.execution_signature_date)}
            />
            <SectionField
                label="Fecha de la orden de inicio:"
                value={DateUtil.formatDate(contract.execution_order_start_date)}
            />
            <SectionField
                label="Fecha del acta de inicio:"
                value={DateUtil.formatDate(contract.execution_certificate_start_date)}
            />
            <SectionField
                label="Fecha de recepción provisoria:"
                value={DateUtil.formatDate(contract.execution_expected_delivery_date)}
            />
            <SectionField
                label="Fecha de recepción definitiva:"
                value={DateUtil.formatDate(contract.execution_final_delivery_date)}
            />
        </SectionCard>
    );
};

export default ContractExecutionSection;
