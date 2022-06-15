import {LineChart} from "components/common/chart";

const QuestionnaireAccumulatedLineChart = ({field, data}) => {
    let datasets = [
        {
            label: "Ejecutado",
            pointRadius: 2,
            data: data["real_values_acc"],
            borderColor: "rgb(2, 94, 170)",
            backgroundColor: "rgba(2, 94, 170)",
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
                    filter: function(legend) {
                        return legend.text !== "Tope previsto";
                    },
                },
            },
            title: {
                display: true,
                text: `${field.label} - Acumulado`,
            },
        },
    };

    if (field.include_expected_value === true) {
        const lastExpectedValue = data["expected_values_acc"]
            ? data["expected_values_acc"].filter(value => value !== "-").slice(-1)[0]
            : 0;

        datasets = [
            {
                label: "Previsto",
                pointRadius: 2,
                data: data["expected_values_acc"],
                borderColor: "rgba(239, 163, 54)",
                backgroundColor: "rgba(239, 163, 54)",
            },
            {
                label: "Previsto (ampliado)",
                data: data["extended_values"],
                borderColor: "#8B6A36",
                backgroundColor: "#8B6A36",
            },
            ...datasets,
        ];
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
            title={`${field.label} - Acumulado`}
            labels={data["index"]}
            datasets={datasets}
            options={chartOptions}
        />
    );
};

export default QuestionnaireAccumulatedLineChart;
