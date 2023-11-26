import {BarChart} from "base/chart/components";
import {TRAINING_DATA_FILTER} from "./SocialComponentsTrainingsFilter";
import {CUSTOM_COLORS} from "Theme";

const COLORS = {
    number_of_woman: {
        main: "#54457F",
        lightest: "#E8E4F1",
        light: "#9688BF",
        dark: "#1B1528",
    },
    number_of_men: {
        main: "#707E45",
        lightest: "#E5E9D8",
        light: "#B1BD89",
        dark: "#232716",
    },
    primary: CUSTOM_COLORS.primary,
};

const barProperties = {
    barPercentage: 0.3,
    borderWidth: 2,
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
    console.log({chartTrainingData});

    const getDatasets = trainingDataType => {
        if (trainingDataType === TRAINING_DATA_FILTER.DATA_TYPE.WOMEN_MEN.code) {
            return [
                {
                    data: chartTrainingData.number_of_woman,
                    label: "Nº de mujeres",
                    borderColor: COLORS.number_of_woman.main,
                    backgroundColor: COLORS.number_of_woman.light,
                    ...barProperties,
                },
                {
                    data: chartTrainingData.number_of_men,
                    label: "Nº de varones",
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
                    borderColor: COLORS.primary.main,
                    backgroundColor: COLORS.primary.light,
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
                    ...barProperties,
                },
            ];
        }
        return [];
    };

    return (
        trainingData && (
            <BarChart
                title="Componentes"
                labels={chartTrainingData.code}
                datasets={getDatasets(trainingDataType)}
                options={{
                    plugins: {
                        legend: {
                            position: "right",
                        },
                    },
                }}
            />
        )
    );
};

export default SocialComponentsTrainingsChart;
