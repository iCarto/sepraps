import {BarChart} from "base/chart/components";
import {useQuestionnaireColors} from "questionnaire/hooks";

const QuestionnaireDeviationBarChart = ({field, data, showPercentage}) => {
    const {getColor, COLORS} = useQuestionnaireColors();

    const variationColumn = "variation" + (showPercentage ? "_perc" : "");

    let datasets = [
        {
            label: "Variación",
            data: data[variationColumn],
            borderWidth: 2,
            borderColor: context => {
                const index = context.dataIndex;
                const value = context.dataset.data[index];
                return value < 0
                    ? getColor(COLORS.REAL).main
                    : getColor(COLORS.REAL).dark;
            },
            backgroundColor: context => {
                const index = context.dataIndex;
                const value = context.dataset.data[index];
                return value < 0
                    ? getColor(COLORS.REAL).light
                    : getColor(COLORS.REAL).main;
            },
        },
    ];

    const chartOptions = {
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: true,
                text: `${field.label} - Variación${showPercentage ? " (%)" : ""}`,
            },
        },
    };

    return (
        data[variationColumn] && (
            <BarChart
                title={`${field.label} - Variación${showPercentage ? " (%)" : ""}`}
                labels={data["year_month"]}
                datasets={datasets}
                options={chartOptions}
            />
        )
    );
};

export default QuestionnaireDeviationBarChart;
