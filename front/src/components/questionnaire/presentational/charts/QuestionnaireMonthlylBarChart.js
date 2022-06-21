import {BarChart} from "components/common/chart";

const QuestionnaireTotalBarChart = ({field, data, showPercentage}) => {
    const realValuesColumn = "real_values" + (showPercentage ? "_perc" : "");
    const expectedValuesColumn = "expected_values" + (showPercentage ? "_perc" : "");
    const extendedValuesColumn = "extended_values" + (showPercentage ? "_perc" : "");

    let datasets = [
        data[expectedValuesColumn]
            ? {
                  label: "Previsto",
                  data: data[expectedValuesColumn],
                  borderColor: "#ed7d31",
                  backgroundColor: "#ed7d31",
              }
            : null,
        data[realValuesColumn]
            ? {
                  label: "Ejecutado",
                  data: data[realValuesColumn],
                  borderColor: "#5b9bd5",
                  backgroundColor: "#5b9bd5",
              }
            : null,
        data[extendedValuesColumn]
            ? {
                  label: "Previsto (ampliado)",
                  data: data[extendedValuesColumn],
                  borderColor: "#8B6A36",
                  backgroundColor: "#8B6A36",
              }
            : null,
        // To remove null values
    ].filter(n => n);

    const chartOptions = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: true,
                text: `${field.label} - Mensual${showPercentage ? " (%)" : ""}`,
            },
        },
    };

    return (
        <BarChart
            title={`${field.label} - Mensual${showPercentage ? " (%)" : ""}`}
            labels={data["index"]}
            datasets={datasets}
            options={chartOptions}
        />
    );
};

export default QuestionnaireTotalBarChart;
