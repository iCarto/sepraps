import {useNavigate} from "react-router-dom";
import {FieldUtil} from "base/ui/section/utilities";
import {useAuth} from "base/user/provider";
import {DateUtil, NumberUtil} from "base/format/utilities";
import {
    SectionBox,
    SectionCard,
    SectionCardHeaderAction,
    SectionField,
} from "base/ui/section/components";
import EditIcon from "@mui/icons-material/Edit";
import Grid from "@mui/material/Grid";
import {MAX_MIN_AMOUNT_TYPE} from "contract/model";

const AwardingBudgetSection = ({contract}) => {
    return contract.total_amount_type === MAX_MIN_AMOUNT_TYPE ? (
        <>
            <SectionField
                label="Monto mínimo"
                value={NumberUtil.formatInteger(contract.awarding_budget_min)}
                unit="Gs."
            />
            <SectionField
                label="Monto máximo"
                value={NumberUtil.formatInteger(contract.awarding_budget)}
                unit="Gs."
            />
        </>
    ) : (
        <SectionField
            label="Monto"
            value={NumberUtil.formatInteger(contract.awarding_budget)}
            unit="Gs."
        />
    );
};

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
            <Grid container spacing={2}>
                <Grid container item xs={6} direction="column">
                    <SectionBox label="Adjudicación">
                        <SectionField
                            label="Fecha de adjudicación"
                            value={DateUtil.formatDate(contract?.awarding_date)}
                        />
                    </SectionBox>
                </Grid>
                <Grid container item xs={6} direction="column">
                    <SectionBox label="Monto adjudicado">
                        <AwardingBudgetSection contract={contract} />
                        <SectionField
                            label="Porcentaje de baja"
                            value={NumberUtil.formatDecimal(
                                contract?.awarding_percentage_drop,
                                2
                            )}
                            unit="%"
                        />
                    </SectionBox>
                </Grid>
            </Grid>
        </SectionCard>
    );
};

export default ContractAwardingSection;
