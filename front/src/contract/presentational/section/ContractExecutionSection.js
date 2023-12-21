import {DateUtil} from "base/format/utilities";
import {FieldUtil} from "base/ui/section/utilities";
import Grid from "@mui/material/Grid";

const ContractExecutionSection = ({contract}) => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={6}>
                {FieldUtil.getSectionField(
                    "Fecha de firma del contrato",
                    DateUtil.formatDate(contract?.execution_signature_date)
                )}
                {FieldUtil.getSectionField(
                    "Fecha de inicio del contrato",
                    DateUtil.formatDate(contract?.execution_start_date)
                )}
            </Grid>
            <Grid item xs={6}>
                {contract?.execution_start_date &&
                    FieldUtil.getSectionField(
                        "Fecha prevista de fin de ejecución",
                        DateUtil.formatDate(contract?.expected_execution_end_date)
                    )}
            </Grid>
        </Grid>
    );
};

export default ContractExecutionSection;
