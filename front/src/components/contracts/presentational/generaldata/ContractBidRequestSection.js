import {useOutletContext, useNavigate} from "react-router-dom";
import {useAuth} from "auth";
import {DateUtil, NumberUtil} from "utilities";

import {
    SectionCard,
    SectionCardHeaderAction,
    SectionField,
} from "components/common/presentational";
import EditIcon from "@mui/icons-material/Edit";

const ContractBidRequestSection = ({isSidePanelOpen = null}) => {
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
                navigate("bidrequest/edit");
            }}
            roles={[ROLES.EDIT, ROLES.MANAGEMENT]}
        />,
    ];

    return (
        <SectionCard
            title="Licitación"
            secondaryActions={secondaryActions}
            isSidePanelOpen={isSidePanelOpen}
        >
            <SectionField label="Número:" value={contract.bid_request_number} />
            <SectionField label="Identificador:" value={contract.bid_request_id} />
            <SectionField
                label="Fecha de Publicación:"
                value={DateUtil.formatDate(contract.bid_request_date)}
            />
            <SectionField
                label="Monto Estimado:"
                value={NumberUtil.formatCurrency(contract?.bid_request_budget)}
            />
            {/* <SectionField
                label="Plazo Previsto:"
                value={
                    contract.bid_request_deadline &&
                    contract.bid_request_deadline + " meses"
                }
            /> */}
        </SectionCard>
    );
};

export default ContractBidRequestSection;
