import {useNavigate} from "react-router-dom";
import {useAuth} from "base/user/provider";
import {DateUtil, NumberUtil} from "base/format/utilities";

import {
    SectionCard,
    SectionCardHeaderAction,
    SectionField,
} from "base/ui/section/components";
import EditIcon from "@mui/icons-material/Edit";

const ContractBidRequestSection = ({contract}) => {
    const navigate = useNavigate();
    const {ROLES} = useAuth();

    const secondaryActions = [
        <SectionCardHeaderAction
            key="edit"
            name="edit"
            text="Modificar"
            icon={<EditIcon />}
            onClick={() => {
                navigate("bidrequest/edit");
            }}
            roles={[ROLES.EDIT, ROLES.MANAGEMENT, ROLES.SUPERVISION]}
        />,
    ];

    return (
        <SectionCard title="Licitación" secondaryActions={secondaryActions}>
            <SectionField label="Número" value={contract?.bid_request_number} />
            <SectionField label="Identificador" value={contract?.bid_request_id} />
            <SectionField
                label="Fecha de publicación"
                value={DateUtil.formatDate(contract?.bid_request_date)}
            />
            <SectionField
                label="Monto estimado"
                value={NumberUtil.formatCurrency(contract?.bid_request_budget)}
            />
        </SectionCard>
    );
};

export default ContractBidRequestSection;
