import {theme} from "Theme";
import {TRAINING_DATA_FILTER} from "./SocialComponentsTrainingsFilter";
import {BarChart} from "base/chart/components";
import {TextUtil} from "base/format/utilities";

const COLORS = {
    number_of_women: theme.palette.gender1,
    number_of_men: theme.palette.gender2,
    primary: theme.palette.primary,
};

const barProperties = {
    barPercentage: 0.3,
    borderWidth: 2,
};

const parseLabels = labels => {
    return labels.map(headCell => {
        if (Array.isArray(headCell)) {
            const parsedStrings = headCell.map(string =>
                TextUtil.convertDBTags(string)
            );
            return parsedStrings;
        }
        return TextUtil.convertDBTags(headCell);
    });
};

const SocialComponentsTrainingsChart = ({trainingData, trainingDataType}) => {
    const parseChartData = chartData => {
        const result = Object.keys(chartData).reduce((acc, key) => {
            let keyData = chartData[key];
            if (key !== "code") {
                //parse float
                keyData = chartData[key].map(parseFloat);
            }
            // remove last row ("total")
            acc[key] = keyData.slice(0, -1);
            return acc;
        }, {});
        return {...chartData, ...result};
    };

    const chartTrainingData = parseChartData(trainingData);
    const labels = chartTrainingData.code;

    const parsedLabels = parseLabels(labels);

    const getDatasets = trainingDataType => {
        if (trainingDataType === TRAINING_DATA_FILTER.DATA_TYPE.WOMEN_MEN.code) {
            return [
                {
                    data: chartTrainingData.number_of_women,
                    label: "Mujeres",
                    borderColor: COLORS.number_of_women.main,
                    backgroundColor: COLORS.number_of_women.light,
                    datalabels: {
                        color: "#ffff",
                    },
                    ...barProperties,
                },
                {
                    data: chartTrainingData.number_of_men,
                    label: "Varones",
                    borderColor: COLORS.number_of_men.main,
                    backgroundColor: COLORS.number_of_men.light,
                    ...barProperties,
                },
            ];
        }
        if (trainingDataType === TRAINING_DATA_FILTER.DATA_TYPE.WOMEN_PERCENTAGE.code) {
            return [
                {
                    data: chartTrainingData.women_percentage,
                    label: "% de mujeres",
                    borderColor: COLORS.number_of_women.main,
                    backgroundColor: COLORS.number_of_women.light,
                    datalabels: {
                        color: "#ffff",
                    },
                    ...barProperties,
                },
            ];
        }
        if (trainingDataType === TRAINING_DATA_FILTER.DATA_TYPE.HOURS.code) {
            return [
                {
                    data: chartTrainingData.number_of_hours,
                    label: "Nº de horas",
                    borderColor: COLORS.primary.main,
                    backgroundColor: COLORS.primary.light,
                    datalabels: {
                        color: "#ffff",
                    },
                    ...barProperties,
                },
            ];
        }
        return [];
    };

    const formatLegendLabels = chart => {
        const data = chart.data;

        if (data.labels.length && data.datasets.length) {
            return data.datasets.map((dataset, index) => {
                const meta = chart.getDatasetMeta(0);
                const style = meta.controller.getStyle(index);

                let total = dataset.data.reduce((acc, currentValue) => {
                    return acc + currentValue;
                }, 0);

                if (
                    trainingDataType ===
                    TRAINING_DATA_FILTER.DATA_TYPE.WOMEN_PERCENTAGE.code
                )
                    total = parseInt(trainingData.women_percentage.slice(-1)[0]);

                return {
                    text: `${dataset.label}: ${total}`,
                    fillStyle: dataset.backgroundColor,
                    strokeStyle: dataset.borderColor,
                    lineWidth: style.borderWidth,
                    hidden: !chart.getDataVisibility(index),
                    index: index,
                };
            });
        }
        return [];
    };

    return (
        trainingData && (
            <BarChart
                title="Componentes"
                labels={parsedLabels}
                datasets={getDatasets(trainingDataType)}
                options={{
                    plugins: {
                        legend: {
                            position: "right",
                            labels: {
                                font: {
                                    weight: "bold",
                                },
                                generateLabels(chart) {
                                    return formatLegendLabels(chart);
                                },
                            },
                            onClick(e, legendItem, legend) {
                                return;
                            },
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
                        y: {
                            grace: 5,
                        },
                    },
                }}
            />
        )
    );
};

export default SocialComponentsTrainingsChart;
