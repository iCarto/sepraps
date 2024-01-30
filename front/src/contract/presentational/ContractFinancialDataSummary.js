import Typography from "@mui/material/Typography";
import {NumberUtil} from "base/format/utilities";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";

const ContractFinancialDataSummary = ({contract}) => {
    const total_difference = contract.total_amount_percentage - 100;

    return (
        <Stack
            direction="row"
            spacing={2}
            justifyContent="space-around"
            alignItems="center"
        >
            <Stack direction="row" alignItems="center" spacing={1}>
                <Typography variant="overline">Adjudicado:</Typography>
                <Chip
                    label={NumberUtil.formatMillions(contract.total_awarding_budget)}
                />
            </Stack>
            <Stack direction="row" alignItems="center" spacing={1}>
                <Typography variant="overline">Total:</Typography>
                <Chip label={NumberUtil.formatMillions(contract.total_amount)} />
            </Stack>
            <Stack direction="row" alignItems="center" spacing={1}>
                <Chip
                    label={
                        <Typography fontSize={12}>
                            Desvío{" "}
                            <Typography component="span" fontWeight={600} fontSize={12}>
                                {NumberUtil.formatDecimal(total_difference, 0)} %
                            </Typography>
                        </Typography>
                    }
                    variant="outlined"
                    sx={{
                        color:
                            total_difference <= 0
                                ? "success.main"
                                : total_difference < 15
                                ? "warning.main"
                                : "error.main",
                        borderColor:
                            total_difference <= 0
                                ? "success.main"
                                : total_difference < 15
                                ? "warning.main"
                                : "error.main",
                    }}
                />
            </Stack>
        </Stack>
    );
};

export default ContractFinancialDataSummary;
