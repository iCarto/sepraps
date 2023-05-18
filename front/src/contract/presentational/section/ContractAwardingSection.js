import {useNavigate} from "react-router-dom";
import {FieldUtil} from "base/ui/section/utilities";
import {useAuth} from "base/user/provider";
import {DateUtil, NumberUtil} from "base/format/utilities";
import {SectionCard, SectionCardHeaderAction} from "base/ui/section/components";
import EditIcon from "@mui/icons-material/Edit";

const ContractAwardingSection = ({contract}) => {
    const navigate = useNavigate();
    const {ROLES} = useAuth();

    const secondaryActions = [
        <SectionCardHeaderAction
            key="edit"
            name="edit"
            text="Modificar"
            icon={<EditIcon />}
            onClick={() => {
                navigate("awarding/edit");
            }}
            roles={[ROLES.EDIT, ROLES.MANAGEMENT, ROLES.SUPERVISION]}
        />,
    ];

    return (
        <SectionCard title="Adjudicación" secondaryActions={secondaryActions}>
            {FieldUtil.getSectionField(
                "Fecha de adjudicación",
                DateUtil.formatDate(contract?.awarding_date)
            )}
            {FieldUtil.getSectionField(
                "Monto adjudicado",
                NumberUtil.formatCurrency(contract?.awarding_budget)
            )}
            {FieldUtil.getSectionField(
                "Porcentaje de baja",
                NumberUtil.formatDecimal(contract?.awarding_percentage_drop, 2),
                "%"
            )}
        </SectionCard>
    );
};

export default ContractAwardingSection;
