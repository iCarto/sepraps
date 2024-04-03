import {ContractServiceChips} from ".";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import {DateUtil, NumberUtil} from "base/format/utilities";

import DateRangeOutlinedIcon from "@mui/icons-material/DateRangeOutlined";
import EventOutlinedIcon from "@mui/icons-material/EventOutlined";
import EngineeringOutlinedIcon from "@mui/icons-material/EngineeringOutlined";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import Badge from "@mui/material/Badge";

const ContractCard = ({entity: contract, onClick = null}) => {
    const getExecutionPeriod = element => {
        if (
            !element.expected_execution_period &&
            !element.total_expected_execution_period
        )
            return "—";
        else if (element.total_expected_execution_period) {
            return `${NumberUtil.formatInteger(
                element.total_expected_execution_period
            )} días (${element.total_expected_execution_period_in_months} meses)`;
        } else
            return `${NumberUtil.formatInteger(
                element.expected_execution_period
            )} días (${element.expected_execution_period_in_months} meses)`;
    };

    const CardField = ({label, icon, value, badgeNote = null}) => (
        <Stack direction="row" spacing={2}>
            {badgeNote ? (
                <Tooltip title={label + (badgeNote && ` (${badgeNote})`)}>
                    <Badge color="warning" variant="dot">
                        {icon}
                    </Badge>
                </Tooltip>
            ) : (
                <Tooltip title={label}>{icon}</Tooltip>
            )}
            <Typography variant="body2">{value}</Typography>
        </Stack>
    );

    return (
        <Card
            id={contract.id}
            onClick={() => {
                onClick(contract.id);
            }}
            sx={{cursor: onClick ? "pointer" : "inherit"}}
            elevation={3}
        >
            <CardContent>
                <Typography variant="h5" gutterBottom color="primary">
                    {contract.number}
                </Typography>
                <ContractServiceChips serviceLabels={contract.services_label} />
                <Typography variant="body2">{contract.comments}</Typography>
            </CardContent>
            <CardContent sx={{bgcolor: "grey.100"}}>
                <Stack spacing={1}>
                    <CardField
                        label="Programa de financiación"
                        icon={<AccountBalanceOutlinedIcon fontSize="small" />}
                        value={contract?.financing_program?.short_name}
                    />
                    <CardField
                        label="Fecha de adjudicación"
                        icon={<EventOutlinedIcon fontSize="small" />}
                        value={DateUtil.formatDate(contract.awarding_date)}
                    />
                    <CardField
                        label="Plazo previsto de ejecución"
                        icon={<DateRangeOutlinedIcon fontSize="small" />}
                        value={getExecutionPeriod(contract)}
                        badgeNote={
                            contract.total_expected_execution_period
                                ? "Modificado en adenda/s"
                                : null
                        }
                    />
                    <CardField
                        label="Monto adjudicado"
                        icon={<MonetizationOnOutlinedIcon fontSize="small" />}
                        value={
                            NumberUtil.formatCurrency(contract.total_awarding_budget) ||
                            NumberUtil.formatCurrency(contract.awarding_budget)
                        }
                        badgeNote={
                            contract.is_awarding_budget_amended
                                ? "Modificado en adenda/s"
                                : null
                        }
                    />
                    <CardField
                        label="Contratista"
                        icon={<EngineeringOutlinedIcon fontSize="small" />}
                        value={contract.contractor?.name}
                    />
                </Stack>
            </CardContent>
        </Card>
    );
};

export default ContractCard;
