import {BarChart} from "components/common/chart";

const QuestionnaireDeviationBarChart = ({field, data, showPercentage}) => {
    const variationColumn = "variation" + (showPercentage ? "_perc" : "");

    let datasets = [
        {
            label: "Variación",
            data: data[variationColumn],
            borderColor: "rgb(2, 94, 170)",
            backgroundColor: context => {
                const index = context.dataIndex;
                const value = context.dataset.data[index];
                return value < 0 ? "#94bee3" : "#5b9bd5";
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
                labels={data["index"]}
                datasets={datasets}
                options={chartOptions}
            />
        )
    );
};

export default QuestionnaireDeviationBarChart;
