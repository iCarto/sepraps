import {DateUtil, NumberUtil} from "base/format/utilities";
import DateRangeOutlinedIcon from "@mui/icons-material/DateRangeOutlined";
import EventOutlinedIcon from "@mui/icons-material/EventOutlined";
import EngineeringOutlinedIcon from "@mui/icons-material/EngineeringOutlined";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";

export function useContractCard() {
    const getExecutionPeriod = element => {
        if (
            !element.expected_execution_period &&
            !element.total_expected_execution_period
        )
            return "Pendiente";
        else if (element.total_expected_execution_period) {
            return `${element.total_expected_execution_period} días (${element.total_expected_execution_period_in_months} meses)`;
        } else
            return `${element.expected_execution_period} días (${element.expected_execution_period_in_months} meses)`;
    };

    const cardFields = [
        {
            label: "Programa de financiación",
            icon: <AccountBalanceOutlinedIcon fontSize="small" />,
            formatFunction: element => {
                return element?.financing_program?.short_name;
            },
        },
        {
            label: "Plazo previsto de ejecución",
            icon: <DateRangeOutlinedIcon fontSize="small" />,
            formatFunction: element => {
                return getExecutionPeriod(element);
            },
            note: element =>
                element.total_expected_execution_period
                    ? "Modificado en adenda/s"
                    : null,
        },
        {
            label: "Fecha de adjudicación",
            icon: <EventOutlinedIcon fontSize="small" />,
            formatFunction: element => {
                return DateUtil.formatDate(element.awarding_date);
            },
        },
        {
            label: "Monto adjudicado",
            icon: <MonetizationOnOutlinedIcon fontSize="small" />,
            formatFunction: element => {
                return (
                    NumberUtil.formatCurrency(element.total_awarding_budget) ||
                    NumberUtil.formatCurrency(element.awarding_budget)
                );
            },
            note: element =>
                element.total_awarding_budget ? "Modificado en adenda/s" : null,
        },
        {
            label: "Contratista",
            icon: <EngineeringOutlinedIcon fontSize="small" />,
            formatFunction: element => {
                return element.contractor?.name;
            },
        },
    ];

    return {cardFields};
}
