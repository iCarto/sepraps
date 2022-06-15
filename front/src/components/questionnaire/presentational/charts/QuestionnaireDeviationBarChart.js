import {BarChart} from "components/common/chart";

const QuestionnaireDeviationBarChart = ({field, data}) => {
    let datasets = [
        {
            label: "Variación",
            data: data["variation"],
            borderColor: "rgb(2, 94, 170)",
            backgroundColor: context => {
                const index = context.dataIndex;
                const value = context.dataset.data[index];
                return value < 0 ? "#D4D4D4" : "#5f5f5f";
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
                text: `${field.label} - Variación`,
            },
        },
    };

    return (
        <BarChart
            title={`${field.label} - Variación`}
            labels={data["index"]}
            datasets={datasets}
            options={chartOptions}
        />
    );
};

export default QuestionnaireDeviationBarChart;
