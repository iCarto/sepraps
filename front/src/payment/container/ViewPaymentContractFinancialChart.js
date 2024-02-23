import {useEffect, useState} from "react";

import {PaymentStatsService} from "payment/service";
import {DateUtil} from "base/format/utilities";
import {PaymentFinancialChartUtil} from "payment/presentational/chart";
import {
    ContractFinancialChartAnnotations,
    ContractFinancialChartUtil,
    FINANCIAL_CHART_CONTRACT_COLORS,
} from "contract/presentational/chart";
import {LineChart} from "base/chart/components";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

const ViewPaymentContractFinancialChart = ({contract}) => {
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        const filterStartDate = contract.execution_start_date;
        const filterEndDate =
            contract.amended_expected_execution_end_date ||
            contract.expected_execution_end_date;

        PaymentStatsService.getPaymentStats({
            contract: contract.id,
            start_date: DateUtil.formatDateForAPI(filterStartDate),
            end_date: DateUtil.formatDateForAPI(filterEndDate),
        }).then(chartData => {
            const parsedChartData = PaymentFinancialChartUtil.parseChartData(chartData);
            setChartData(parsedChartData);
        });
    }, []);

    const maxAmount = contract.awarding_budget_min
        ? [contract.awarding_budget_min, contract.awarding_budget]
        : contract.awarding_budget;

    const maxAmendedAmount =
        contract.total_awarding_budget !== maxAmount
            ? contract.total_awarding_budget
            : null;
    const maxEndDate = contract.expected_execution_end_date;
    const maxAmendedEndDate = contract.amended_expected_execution_end_date;

    const chartOptions = {
        scales: ContractFinancialChartUtil.getScalesConfig(),
        plugins: {
            legend: PaymentFinancialChartUtil.getLegendConfig(),
            datalabels: ContractFinancialChartUtil.getDatalabelsConfig(),
            tooltip: PaymentFinancialChartUtil.getTooltipConfig(chartData),
            annotation: {
                annotations: ContractFinancialChartAnnotations.getAnnotations(
                    maxAmount,
                    maxAmendedAmount,
                    maxEndDate,
                    maxAmendedEndDate
                ),
            },
        },
    };

    return (
        chartData && (
            <Grid container justifyContent="center">
                <Box sx={{maxWidth: "1000px"}}>
                    <LineChart
                        title="Supervisión de productos"
                        labels={chartData.month}
                        datasets={[
                            {
                                data: chartData.cum_approved_total_amount,
                                label: "Aprobado",
                                borderWidth: 3,
                                borderColor:
                                    FINANCIAL_CHART_CONTRACT_COLORS.approved.main,
                                backgroundColor:
                                    FINANCIAL_CHART_CONTRACT_COLORS.approved.main,
                                spanGaps: true,
                            },
                            {
                                data: chartData.cum_expected_total_amount,
                                label: "Previsto",
                                borderWidth: 2,
                                borderColor:
                                    FINANCIAL_CHART_CONTRACT_COLORS.expected.main,
                                backgroundColor:
                                    FINANCIAL_CHART_CONTRACT_COLORS.expected.light,
                                spanGaps: true,
                            },
                            {
                                type: "bar",
                                data: chartData.month_expected_amount,
                                label: "Productos previstos",
                                borderWidth: 2,
                                borderColor:
                                    FINANCIAL_CHART_CONTRACT_COLORS.expected.main,
                                backgroundColor:
                                    FINANCIAL_CHART_CONTRACT_COLORS.expected.light,
                            },
                        ]}
                        options={chartOptions}
                    />
                </Box>
            </Grid>
        )
    );
};

export default ViewPaymentContractFinancialChart;
