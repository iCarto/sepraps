import {useNavigate} from "react-router-dom";
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

const BidRequestBudgetSection = ({contract}) => {
    return contract.total_amount_type === MAX_MIN_AMOUNT_TYPE ? (
        <>
            <SectionField
                label="Monto mínimo"
                value={NumberUtil.formatCurrency(contract.bid_request_budget_min)}
            />
            <SectionField
                label="Monto máximo"
                value={NumberUtil.formatCurrency(contract.bid_request_budget)}
            />
        </>
    ) : (
        <SectionField
            label="Monto"
            value={NumberUtil.formatCurrency(contract.bid_request_budget)}
        />
    );
};

const ContractBidRequestSection = ({contract}) => {
    const navigate = useNavigate();
    const {ROLES} = useAuth();

    console.log({contract});
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
            <Grid container spacing={2}>
                <Grid container item xs={6} direction="column">
                    <SectionBox label="Licitación">
                        <SectionField
                            label="Número"
                            value={contract?.bid_request_number}
                        />
                        <SectionField
                            label="Identificador"
                            value={contract?.bid_request_id}
                        />
                        <SectionField
                            label="Fecha de publicación"
                            value={DateUtil.formatDate(contract?.bid_request_date)}
                        />
                    </SectionBox>
                </Grid>
                <Grid container item xs={6} direction="column">
                    <SectionBox label="Monto estimado">
                        <SectionField
                            label="Tipo de monto"
                            value={contract?.total_amount_type_label}
                        />
                        <BidRequestBudgetSection contract={contract} />
                    </SectionBox>
                    <SectionBox label="Pagos">
                        <SectionField
                            label="Frecuencia de pago"
                            value={contract?.payment_frequency_type_label}
                        />
                        <SectionField
                            label="Criterio de pago"
                            value={contract?.payment_criteria_type_label}
                        />
                    </SectionBox>
                </Grid>
            </Grid>
        </SectionCard>
    );
};

export default ContractBidRequestSection;
