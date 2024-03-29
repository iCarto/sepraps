import {useEffect, useState} from "react";

import {PaymentStatsService} from "payment/service";

import {LineChart} from "base/chart/components";
import Box from "@mui/material/Box";
import {
    FINANCIAL_CHART_COLORS,
    PaymentFinancialChartContractAnnotations,
    PaymentFinancialChartUtil,
} from "payment/presentational/chart";
import Grid from "@mui/material/Grid";
import {DateUtil} from "base/format/utilities";

const ViewPaymentContractFinancialChart = ({contract}) => {
    const [chartData, setChartData] = useState(null);

    const parseChartData = chartData => {
        const result = Object.keys(chartData)
            .filter(key => !["month", "payment_name"].includes(key))
            .reduce((acc, key) => {
                acc[key] = chartData[key].map(value => {
                    const parsedValue = parseFloat(value);
                    return isNaN(parsedValue) ? null : parsedValue;
                });
                return acc;
            }, {});

        // Get last month approved amount and position in array
        const currentApprovedAmount = Math.max.apply(
            Math,
            result["cum_approved_total_amount"]
        );
        const currentApprovedAmountPosition = result[
            "cum_approved_total_amount"
        ].indexOf(currentApprovedAmount);

        // put 0's at first columns and nulls on last columns for approved
        result["cum_approved_total_amount"] = result["cum_approved_total_amount"].map(
            (value, index) => {
                if (!value) {
                    return 0;
                }
                if (index > currentApprovedAmountPosition) {
                    return null;
                }
                return value;
            }
        );

        const hasForecast = result["cum_expected_total_amount"].some(
            value => value != null
        );
        if (hasForecast) {
            // sum current approved amount to expected
            result["cum_expected_total_amount"] = result[
                "cum_expected_total_amount"
            ].map((value, index) => {
                if (index > currentApprovedAmountPosition) {
                    return value + currentApprovedAmount;
                }
                return null;
            });
            result["cum_expected_total_amount"][
                currentApprovedAmountPosition
            ] = currentApprovedAmount;
        }

        // remove no increased data points
        result["cum_approved_total_amount"] = result["cum_approved_total_amount"].map(
            (value, index) => {
                if (
                    index != 0 &&
                    value === result["cum_approved_total_amount"][index - 1]
                ) {
                    return null;
                }
                return value;
            }
        );
        result["cum_expected_total_amount"] = result["cum_expected_total_amount"].map(
            (value, index) => {
                if (
                    index != 0 &&
                    value === result["cum_expected_total_amount"][index - 1]
                ) {
                    return null;
                }
                return value;
            }
        );

        return {...chartData, ...result};
    };

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
            const parsedChartData = parseChartData(chartData);
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
        scales: PaymentFinancialChartUtil.getScalesConfig(),
        plugins: {
            legend: PaymentFinancialChartUtil.getLegendConfig(),
            datalabels: PaymentFinancialChartUtil.getDatalabelsConfig(),
            tooltip: PaymentFinancialChartUtil.getTooltipConfig(chartData),
            annotation: {
                annotations: PaymentFinancialChartContractAnnotations.getAnnotations(
                    maxAmount,
                    maxAmendedAmount,
                    maxEndDate,
                    maxAmendedEndDate
                ),
            },
        },
    };

    console.log({chartData});

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
                                borderColor: FINANCIAL_CHART_COLORS.approved.main,
                                backgroundColor: FINANCIAL_CHART_COLORS.approved.main,
                                spanGaps: true,
                            },
                            {
                                data: chartData.cum_expected_total_amount,
                                label: "Previsto",
                                borderWidth: 2,
                                borderColor: FINANCIAL_CHART_COLORS.expected.main,
                                backgroundColor: FINANCIAL_CHART_COLORS.expected.light,
                                spanGaps: true,
                            },
                            {
                                type: "bar",
                                data: chartData.month_expected_amount,
                                label: "Productos previstos",
                                borderWidth: 2,
                                borderColor: FINANCIAL_CHART_COLORS.expected.main,
                                backgroundColor: FINANCIAL_CHART_COLORS.expected.light,
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
