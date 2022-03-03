import {useOutletContext, useNavigate} from "react-router-dom";
import {DateUtil} from "utilities";
import {
    SectionCard,
    SectionCardHeaderAction,
    SectionField,
} from "components/common/presentational";
import EditIcon from "@mui/icons-material/Edit";

const ContractAwardingSection = () => {
    const navigate = useNavigate();

    let contract;
    [contract] = useOutletContext();

    return (
        <SectionCard
            title="Adjudicación"
            secondaryActions={[
                <SectionCardHeaderAction
                    key="edit"
                    name="edit"
                    text="Modificar"
                    icon={<EditIcon />}
                    onClick={() => {
                        navigate("awarding/edit");
                    }}
                />,
            ]}
        >
            <SectionField
                label="Presupuesto:"
                value={contract.awarding_budget && contract.awarding_budget + " $"}
            />
            <SectionField
                label="Porcentaje de baja:"
                value={
                    contract.awarding_percentage_drop &&
                    contract.awarding_percentage_drop + "%"
                }
            />
            <SectionField
                label="Fecha:"
                value={DateUtil.formatDate(contract.awarding_date)}
            />
        </SectionCard>
    );
};

export default ContractAwardingSection;
