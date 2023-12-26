import {useOutletContext} from "react-router-dom";
import {useAuth} from "base/user/provider";

import {DateUtil, NumberUtil} from "base/format/utilities";
import {FieldUtil} from "base/ui/section/utilities";

import {AddNewButton} from "base/shared/components";
import {
    SectionBox,
    SectionCard,
    SectionCardHeaderAction,
    SectionField,
} from "base/ui/section/components";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

const ProjectContractSection = ({contract}) => {
    const {ROLES} = useAuth();

    let project;
    [project] = useOutletContext();
    const isProjectClosed = project?.closed;

    return (
        <SectionCard title="Contrato de obras">
            {contract ? (
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <SectionField
                            label="Número de contrato"
                            value={contract.number}
                            linkPath={`/contracts/list/${contract.id}/summary`}
                        />
                        <SectionField
                            label="Número de licitación"
                            value={contract.bid_request_number}
                        />
                        {FieldUtil.getSectionField(
                            "Contratista",
                            contract.contractor?.name
                        )}
                    </Grid>
                    <Grid item xs={6}>
                        {FieldUtil.getSectionField(
                            "Monto adjudicado",
                            NumberUtil.formatCurrency(contract.awarding_budget)
                        )}
                        {FieldUtil.getSectionField(
                            "Fecha de firma del contrato",
                            DateUtil.formatDate(contract.execution_signature_date)
                        )}
                        {FieldUtil.getSectionField(
                            "Plazo previsto de ejecución del contrato",
                            contract.expected_execution_period &&
                                `${
                                    contract.expected_execution_period
                                } días (hasta el ${DateUtil.formatDate(
                                    contract.expected_execution_end_date
                                )})`
                        )}
                    </Grid>
                    <Grid item xs={12}>
                        <SectionBox label="Programa de financiación">
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <SectionField
                                        label="Programa de financiación"
                                        value={contract.financing_program.name}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <SectionField
                                        label="Financiador"
                                        value={contract.financing_program.financing_funds
                                            .map(financing_fund => financing_fund.name)
                                            .join(", ")}
                                    />
                                </Grid>
                            </Grid>
                        </SectionBox>
                    </Grid>
                </Grid>
            ) : (
                <Stack alignItems="center" spacing={3}>
                    <Typography sx={{fontStyle: "italic"}}>
                        Este proyecto aún no ha sido asignado a ningún contrato
                    </Typography>
                </Stack>
            )}
        </SectionCard>
    );
};

export default ProjectContractSection;
