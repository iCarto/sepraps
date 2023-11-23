import {useEffect, useState} from "react";
import {useOutletContext} from "react-router-dom";

import {ProjectStatsService} from "project/service";

import {BarChart} from "base/chart/components";

const ViewBuildingComponentsFinancialChart = ({filter}) => {
    let contract;
    [contract] = useOutletContext();

    const [chartData, setChartData] = useState(null);
    const [maxChartData, setMaxChartData] = useState(null);

    const parseChartData = chartData => {
        const result = Object.keys(chartData)
            .filter(key => key !== "code")
            .reduce((acc, key) => {
                acc[key] = chartData[key].map(parseFloat);
                return acc;
            }, {});
        return {...chartData, ...result};
    };
    const getMaxChartData = chartData => {
        let maxValue = 0;
        chartData.paid_amount.forEach((value, index) => {
            const expectedValue = chartData.expected_amount[index];
            const realValue = chartData.pending_amount[index] + value;
            if (expectedValue > maxValue) {
                maxValue = expectedValue;
            }
            if (realValue > maxValue) {
                maxValue = realValue;
            }
        });
        return maxValue;
    };

    useEffect(() => {
        ProjectStatsService.getBuildingComponentsStats(filter).then(chartData => {
            console.log({chartData});
            const parsedChartData = parseChartData(chartData);
            setChartData(parsedChartData);
            setMaxChartData(getMaxChartData(parsedChartData));
        });
    }, []);

    const colors = {
        paid: {
            main: "#5B9BD5",
            lightest: "#EFF5FB",
            light: "#AECDEA",
            dark: "#2E72B2",
        },
        pending: {
            main: "#8B6A36",
            lightest: "#F9F6F0",
            light: "#CCAD7B",
            dark: "#765A2E",
        },
        expected: {
            main: "#ED7D31",
            lightest: "#FDF3EC",
            light: "#F5B88E",
            dark: "#CE5D12",
        },
    };

    return (
        chartData && (
            <BarChart
                title="Componentes"
                labels={chartData.code}
                datasets={[
                    {
                        data: chartData.paid_amount,
                        label: "Pagado",
                        barPercentage: 0.3,
                        borderWidth: 2,
                        borderColor: colors.paid.main,
                        backgroundColor: colors.paid.light,
                    },
                    {
                        data: chartData.pending_amount,
                        label: "Pendiente",
                        barPercentage: 0.3,
                        borderWidth: 2,
                        borderColor: colors.pending.main,
                        backgroundColor: colors.pending.light,
                    },
                    {
                        data: chartData.expected_amount,
                        label: "Previsto",
                        barPercentage: 0.4,
                        borderWidth: 2,
                        borderColor: colors.expected.main,
                        backgroundColor: colors.expected.light,
                        // This binds the dataset to the right x & y axis
                        xAxisID: "right-x-axis",
                        yAxisID: "right-y-axis",
                    },
                ]}
                options={{
                    plugins: {
                        legend: {
                            position: "right",
                        },
                    },
                    scales: {
                        x: {
                            stacked: true,
                            barPercentage: 0.2,
                            categoryPercentage: 0.1,
                        },
                        y: {
                            stacked: true,
                            suggestedMax: maxChartData,
                        },
                        "right-x-axis": {
                            axis: "x",
                            display: false,
                        },
                        "right-y-axis": {
                            axis: "y",
                            stacked: true,
                            display: false,
                            suggestedMax: maxChartData,
                        },
                    },
                }}
            />
        )
    );
};

export default ViewBuildingComponentsFinancialChart;
