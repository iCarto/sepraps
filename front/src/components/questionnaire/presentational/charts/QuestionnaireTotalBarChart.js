import {BarChart} from "components/common/chart";

const QuestionnaireTotalBarChart = ({field, data}) => {
    let datasets = [
        {
            label: "Ejecutado",
            data: data["real_values"],
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
            },
            title: {
                display: true,
                text: `${field.label} - Total`,
            },
        },
    };

    if (field.include_expected_value === true) {
        datasets = [
            {
                label: "Previsto",
                data: data["expected_values"],
                borderColor: "rgba(239, 163, 54)",
                backgroundColor: "rgba(239, 163, 54)",
            },
            ...datasets,
            {
                label: "Previsto (ampliado)",
                data: data["extended_values"],
                borderColor: "#8B6A36",
                backgroundColor: "#8B6A36",
            },
        ];
    }

    return (
        <BarChart
            title={`${field.label} - Total`}
            labels={data["index"]}
            datasets={datasets}
            options={chartOptions}
        />
    );
};

export default QuestionnaireTotalBarChart;
