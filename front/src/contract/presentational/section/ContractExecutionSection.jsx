import {DateUtil} from "base/format/utilities";
import {FieldUtil} from "base/ui/section/utilities";
import Grid from "@mui/material/Grid";
import {ContractServiceUtil} from "contract/utilities";

const ContractExecutionSection = ({contract, services = null}) => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={6}>
                {FieldUtil.getSectionField(
                    "Fecha de firma del contrato",
                    DateUtil.formatDate(contract?.execution_signature_date)
                )}
                {FieldUtil.getSectionField(
                    ContractServiceUtil.getExecutionStartDateLabel(services),
                    DateUtil.formatDate(contract?.execution_start_date)
                )}
            </Grid>
            {contract?.execution_start_date && (
                <Grid item xs={6}>
                    {FieldUtil.getSectionField(
                        "Fecha prevista de fin de ejecución",
                        DateUtil.formatDate(contract?.expected_execution_end_date)
                    )}
                    {contract?.amended_expected_execution_end_date &&
                        FieldUtil.getSectionField(
                            "Fecha prevista de fin de ejecución ampliada",
                            DateUtil.formatDate(
                                contract?.amended_expected_execution_end_date
                            ),
                            "",
                            "Ver adendas"
                        )}
                </Grid>
            )}
        </Grid>
    );
};

export default ContractExecutionSection;
