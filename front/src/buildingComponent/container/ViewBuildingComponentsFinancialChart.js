import {useEffect, useState} from "react";

import {CUSTOM_COLORS, theme} from "Theme";

import {ProjectStatsService} from "project/service";

import {NumberUtil} from "base/format/utilities";
import {BarChart} from "base/chart/components";

// Custom plugin for total sum on top of bar
// https://youtu.be/ARXBu4OOseg?si=_O5IQiBo2owD_Jp9
const totalAmountTopLabels = {
    id: "totalamounttoplabels",
    afterDatasetsDraw(chart, args, pluginOptions) {
        const {
            ctx,
            scales: {x, y},
        } = chart;

        chart.data.datasets[0].data.forEach((datapoint, index) => {
            const datasetArray = [];

            chart.data.datasets.forEach(dataset => {
                datasetArray.push(dataset.data[index]);
            });

            const totalAmount = NumberUtil.formatMillions(
                datasetArray[0] + datasetArray[1]
            );

            ctx.font = "bold 12px sans-serif";
            ctx.fillStyle = CUSTOM_COLORS.grey[700];
            ctx.textAlign = "center";
            ctx.fillText(
                `Total: ${totalAmount}`,
                x.getPixelForValue(index),
                chart.getDatasetMeta(1).data[index].y - 10
            );
        });
    },
};

const ViewBuildingComponentsFinancialChart = ({filter}) => {
    const [chartData, setChartData] = useState(null);
    const [maxChartData, setMaxChartData] = useState(null);

    const parseChartData = chartData => {
        const result = Object.keys(chartData)
            .filter(key => key !== "code" && key !== "code_label" && key !== "name")
            .reduce((acc, key) => {
                acc[key] = chartData[key].map(parseFloat);
                return acc;
            }, {});
        return {...chartData, ...result};
    };

    const getMaxChartData = chartData => {
        let maxValue = 0;
        if (Object.keys(chartData).length) {
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
        }
        return maxValue;
    };

    useEffect(() => {
        ProjectStatsService.getBuildingComponentsStats(filter).then(chartData => {
            console.log(chartData);
            const parsedChartData = parseChartData(chartData);
            setChartData(parsedChartData);
            setMaxChartData(getMaxChartData(parsedChartData));
        });
    }, []);

    const formatLabel = value => {
        if (value) return `${NumberUtil.formatMillions(value)} `;
        else return null;
    };

    return (
        chartData && (
            <BarChart
                title="Componentes"
                labels={chartData.name}
                plugins={[totalAmountTopLabels]}
                datasets={[
                    {
                        data: chartData.paid_amount,
                        label: "Pagado",
                        barPercentage: 0.3,
                        borderWidth: 2,
                        borderColor: theme.palette.paid.main,
                        backgroundColor: theme.palette.paid.light,
                        datalabels: {
                            align: "center",
                            color: "#ffff",
                            formatter: function(value, context) {
                                return formatLabel(value);
                            },
                        },
                    },
                    {
                        data: chartData.pending_amount,
                        label: "Pendiente",
                        barPercentage: 0.3,
                        borderWidth: 2,
                        borderColor: theme.palette.pending.main,
                        backgroundColor: theme.palette.pending.light,
                        datalabels: {
                            align: "center",
                            formatter: function(value, context) {
                                return formatLabel(value);
                            },
                        },
                    },
                    {
                        data: chartData.expected_amount,
                        label: "Previsto",
                        barPercentage: 0.4,
                        borderWidth: 2,
                        borderColor: theme.palette.expected.main,
                        backgroundColor: theme.palette.expected.light,
                        // This binds the dataset to the right x & y axis
                        xAxisID: "right-x-axis",
                        yAxisID: "right-y-axis",
                        datalabels: {
                            labels: {
                                title: null,
                            },
                        },
                    },
                ]}
                options={{
                    plugins: {
                        legend: {
                            position: "right",
                        },
                        datalabels: {
                            labels: {
                                title: {
                                    font: {
                                        weight: "bold",
                                    },
                                },
                            },
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
                            grace: "5%",
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
                            grace: "5%",
                        },
                    },
                }}
            />
        )
    );
};

export default ViewBuildingComponentsFinancialChart;
