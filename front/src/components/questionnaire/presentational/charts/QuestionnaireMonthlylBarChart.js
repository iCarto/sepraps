import {BarChart} from "components/common/chart";
import {useQuestionnaireColors} from "components/questionnaire/hooks";

const QuestionnaireTotalBarChart = ({field, data, showPercentage}) => {
    const {getColor, COLORS} = useQuestionnaireColors();

    const realValuesColumn = "real_values" + (showPercentage ? "_perc" : "");
    const expectedValuesColumn = "expected_values" + (showPercentage ? "_perc" : "");
    const extendedValuesColumn = "extended_values" + (showPercentage ? "_perc" : "");

    let datasets = [
        data[expectedValuesColumn]
            ? {
                  label: "Previsto",
                  data: data[expectedValuesColumn],
                  borderWidth: 2,
                  borderColor: getColor(COLORS.EXPECTED).main,
                  backgroundColor: getColor(COLORS.EXPECTED).light,
              }
            : null,
        data[realValuesColumn]
            ? {
                  label: "Ejecutado",
                  data: data[realValuesColumn],
                  borderWidth: 2,
                  borderColor: getColor(COLORS.REAL).main,
                  backgroundColor: getColor(COLORS.REAL).light,
              }
            : null,
        data[extendedValuesColumn]
            ? {
                  label: "Previsto (ampliado)",
                  data: data[extendedValuesColumn],
                  borderWidth: 2,
                  borderColor: getColor(COLORS.EXTENDED).main,
                  backgroundColor: getColor(COLORS.EXTENDED).light,
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
