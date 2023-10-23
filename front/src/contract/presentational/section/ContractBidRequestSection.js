import {useNavigate} from "react-router-dom";
import {useAuth} from "base/user/provider";
import {DateUtil, NumberUtil} from "base/format/utilities";

import {
    SectionCard,
    SectionCardHeaderAction,
    SectionField,
} from "base/ui/section/components";
import EditIcon from "@mui/icons-material/Edit";
import Grid from "@mui/material/Grid";

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
            <Grid container spacing={2}>
                <Grid container item xs={6} direction="column">
                    <SectionField label="Número" value={contract?.bid_request_number} />
                    <SectionField
                        label="Identificador"
                        value={contract?.bid_request_id}
                    />
                    <SectionField
                        label="Fecha de publicación"
                        value={DateUtil.formatDate(contract?.bid_request_date)}
                    />
                </Grid>
                <Grid container item xs={6} direction="column">
                    <SectionField
                        label="Tipo de monto"
                        value={contract?.total_amount_type_label}
                    />
                    <SectionField
                        label="Frecuencia de pago"
                        value={contract?.payment_frequency_type_label}
                    />
                    <SectionField
                        label="Criterio de pago"
                        value={contract?.payment_criteria_type_label}
                    />
                    <SectionField
                        label="Monto estimado"
                        value={NumberUtil.formatCurrency(contract?.bid_request_budget)}
                    />
                </Grid>
            </Grid>
        </SectionCard>
    );
};

export default ContractBidRequestSection;
