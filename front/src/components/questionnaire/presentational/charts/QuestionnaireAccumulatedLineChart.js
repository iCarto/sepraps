import {LineChart} from "components/common/chart";
import {useQuestionnaireColors} from "components/questionnaire/hooks";

const QuestionnaireAccumulatedLineChart = ({field, data, showPercentage}) => {
    const {getColor, COLORS} = useQuestionnaireColors();

    const realValuesColumn = "real_values_acc" + (showPercentage ? "_perc" : "");
    const expectedValuesColumn =
        "expected_values_acc" + (showPercentage ? "_perc" : "");
    const extendedValuesColumn =
        "extended_values_acc" + (showPercentage ? "_perc" : "");

    let datasets = [
        {
            label: "Ejecutado",
            pointRadius: 3,
            pointBorderWidth: 2,
            data: data[realValuesColumn],
            borderColor: getColor(COLORS.REAL).main,
            backgroundColor: getColor(COLORS.REAL).light,
        },
    ];

    const chartOptions = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
        plugins: {
            legend: {
                position: "top",
                labels: {
                    usePointStyle: true,
                },
            },
            title: {
                display: true,
                text: `${field.label} - Acumulado${showPercentage ? " (%)" : ""}`,
            },
        },
    };

    if (field.include_expected_value === true) {
        const lastExpectedValue = data[expectedValuesColumn]
            ? data[expectedValuesColumn].filter(value => value !== null).slice(-1)[0]
            : 0;

        datasets = [
            {
                label: "Previsto",
                pointRadius: 3,
                pointBorderWidth: 2,
                data: data[expectedValuesColumn],
                borderColor: getColor(COLORS.EXPECTED).main,
                backgroundColor: getColor(COLORS.EXPECTED).light,
            },
            data[extendedValuesColumn]
                ? {
                      label: "Previsto (ampliado)",
                      pointRadius: 3,
                      pointBorderWidth: 2,
                      data: data[extendedValuesColumn],
                      borderColor: getColor(COLORS.EXTENDED).main,
                      backgroundColor: getColor(COLORS.EXTENDED).light,
                  }
                : null,
            ...datasets,
        ].filter(n => n);

        chartOptions["plugins"] = {
            ...chartOptions.plugins,
            annotation: {
                annotations: {
                    line1: {
                        type: "line",
                        yMin: lastExpectedValue,
                        yMax: lastExpectedValue,
                        borderColor: "rgba(239, 163, 54, 0.3)",
                        backgroundColor: "rgba(239, 163, 54, 0.3)",
                        borderWidth: 2,
                    },
                },
            },
        };
    }

    return (
        <LineChart
            title={`${field.label} - Acumulado${showPercentage ? " (%)" : ""}`}
            labels={data["year_month"]}
            datasets={datasets}
            options={chartOptions}
        />
    );
};

export default QuestionnaireAccumulatedLineChart;
