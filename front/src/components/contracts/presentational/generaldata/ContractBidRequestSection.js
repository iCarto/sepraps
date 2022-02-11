import {useOutletContext, useNavigate} from "react-router-dom";
import {DateUtil} from "utilities";

import {
    SectionCard,
    SectionCardHeaderAction,
    SectionField,
} from "components/common/presentational";
import EditIcon from "@mui/icons-material/Edit";

const ContractBidRequestSection = () => {
    const navigate = useNavigate();

    let contract;
    [contract] = useOutletContext();

    return (
        <SectionCard
            title="Licitación"
            headerActions={[
                <SectionCardHeaderAction
                    key="edit"
                    name="edit"
                    title="Modificar"
                    icon={<EditIcon />}
                    onClick={() => {
                        navigate("bidrequest/edit");
                    }}
                />,
            ]}
        >
            <SectionField label="Número:" value={contract.bid_request_number} />
            <SectionField label="Identificador:" value={contract.bid_request_id} />
            <SectionField
                label="Fecha:"
                value={DateUtil.formatDate(contract.bid_request_date)}
            />
            <SectionField label="Presupuesto:" value={contract.bid_request_budget} />
            <SectionField
                label="Plazo previsto:"
                value={contract.bid_request_deadline + " meses"}
            />
        </SectionCard>
    );
};

export default ContractBidRequestSection;
