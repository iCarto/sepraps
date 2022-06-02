import {useOutletContext, useNavigate} from "react-router-dom";
import {AuthAction, useAuth} from "auth";
import {DateUtil, NumberUtil} from "utilities";
import {
    SectionCard,
    SectionCardHeaderAction,
    SectionField,
} from "components/common/presentational";
import EditIcon from "@mui/icons-material/Edit";

const ContractAwardingSection = () => {
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
                navigate("awarding/edit");
            }}
            roles={[ROLES.EDIT, ROLES.MANAGEMENT]}
        />,
    ];

    return (
        <SectionCard title="Adjudicación" secondaryActions={secondaryActions}>
            <SectionField
                label="Fecha de adjudicación:"
                value={DateUtil.formatDate(contract.awarding_date)}
            />
            <SectionField
                label="Monto adjudicado:"
                value={NumberUtil.formatCurrency(contract?.awarding_budget)}
            />
            <SectionField
                label="Porcentaje de baja:"
                value={
                    contract.awarding_percentage_drop &&
                    NumberUtil.formatDecimal(contract.awarding_percentage_drop, 2) + "%"
                }
            />
        </SectionCard>
    );
};

export default ContractAwardingSection;
