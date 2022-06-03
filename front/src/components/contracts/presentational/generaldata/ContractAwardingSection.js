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

    const getValueInfo = (label, value) => {
        if (value) {
            return <SectionField label={label} value={value} />;
        } else
            return (
                <SectionField label={label} value="Pendiente" valueFontStyle="italic" />
            );
    };

    return (
        <SectionCard title="Adjudicación" secondaryActions={secondaryActions}>
            {getValueInfo(
                "Fecha de adjudicación:",
                DateUtil.formatDate(contract.awarding_date)
            )}
            {getValueInfo(
                "Monto adjudicado:",
                NumberUtil.formatCurrency(contract?.awarding_budget)
            )}
            {getValueInfo(
                "Porcentaje de baja:",
                contract.awarding_percentage_drop &&
                    NumberUtil.formatDecimal(contract.awarding_percentage_drop, 2) + "%"
            )}
        </SectionCard>
    );
};

export default ContractAwardingSection;
