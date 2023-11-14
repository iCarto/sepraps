import {SectionField} from "base/ui/section/components";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import {AddNewButton} from "base/shared/components";
import Grid from "@mui/material/Grid";

const ContractFinancingProgramSection = ({contract}) => {
    return contract.financing_program ? (
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <SectionField
                    label="Programa"
                    value={contract?.financing_program?.name}
                />
            </Grid>
            <Grid item xs={6}>
                <SectionField
                    label="Financiador/es"
                    value={contract?.financing_program?.financing_funds
                        .map(financing_fund => financing_fund.name)
                        .join(", ")}
                />
            </Grid>
        </Grid>
    ) : (
        <Stack alignItems="center" spacing={3}>
            <Typography sx={{fontStyle: "italic"}}>
                El contrato aún no tiene programa de financiación asignado
            </Typography>
            <AddNewButton basePath="financing_program/edit" />
        </Stack>
    );
};

export default ContractFinancingProgramSection;
