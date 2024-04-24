import {useEffect, useState} from "react";

import {CertificationStatsService} from "certification/service";
import {DateUtil} from "base/format/utilities";
import {PaymentFinancialChartUtil} from "payment/presentational/chart";
import {
    FINANCIAL_CHART_CONTRACT_COLORS,
    ContractFinancialChartUtil,
} from "contract/presentational/chart";
import {ProjectFinancialChartAnnotations} from "project/presentational/chart";
import {LineChart} from "base/chart/components";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

const ViewCertificationsByProjectFinancialChart = ({
    filter,
    filterStartDate,
    filterEndDate,
    maxAmount,
    maxAmendedAmount,
    maxEndDate,
    maxAmendedEndDate,
}) => {
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        CertificationStatsService.getCertificationStatsTemporal({
            ...filter,
            start_date: DateUtil.formatDateForAPI(filterStartDate),
            end_date: DateUtil.formatDateForAPI(filterEndDate),
        }).then(chartData => {
            const parsedChartData = PaymentFinancialChartUtil.parseChartData(chartData);
            setChartData(parsedChartData);
        });
    }, []);

    const chartOptions = {
        scales: ContractFinancialChartUtil.getScalesConfig(),
        plugins: {
            legend: PaymentFinancialChartUtil.getLegendConfig(),
            datalabels: ContractFinancialChartUtil.getDatalabelsConfig(),
            tooltip: PaymentFinancialChartUtil.getTooltipConfig(chartData),
            annotation: {
                annotations: ProjectFinancialChartAnnotations.getAnnotations(
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
                        title="Supervisión de certificaciones por proyecto"
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

export default ViewCertificationsByProjectFinancialChart;
