import {LineChart} from "components/common/chart";

const QuestionnaireAccumulatedLineChart = ({field, data, showPercentage}) => {
    const realValuesColumn = "real_values_acc" + (showPercentage ? "_perc" : "");
    const expectedValuesColumn =
        "expected_values_acc" + (showPercentage ? "_perc" : "");
    const extendedValuesColumn =
        "extended_values_acc" + (showPercentage ? "_perc" : "");

    let datasets = [
        {
            label: "Ejecutado",
            pointRadius: 3,
            data: data[realValuesColumn],
            borderColor: "#5b9bd5",
            backgroundColor: "#5b9bd5",
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
            ? data[expectedValuesColumn].filter(value => value !== "-").slice(-1)[0]
            : 0;

        datasets = [
            {
                label: "Previsto",
                pointRadius: 3,
                data: data[expectedValuesColumn],
                borderColor: "#ed7d31",
                backgroundColor: "#ed7d31",
            },
            data[extendedValuesColumn]
                ? {
                      label: "Previsto (ampliado)",
                      pointRadius: 3,
                      data: data[extendedValuesColumn],
                      borderColor: "#8B6A36",
                      backgroundColor: "#8B6A36",
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
            labels={data["index"]}
            datasets={datasets}
            options={chartOptions}
        />
    );
};

export default QuestionnaireAccumulatedLineChart;
