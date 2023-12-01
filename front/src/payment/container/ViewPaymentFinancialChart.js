import {useEffect, useState} from "react";

import {PaymentStatsService} from "payment/service";

import {LineChart} from "base/chart/components";

const ViewPaymentFinancialChart = ({filter}) => {
    const [chartData, setChartData] = useState(null);
    const [paidTotalAmount, setPaidTotalAmount] = useState(null);
    const [expectedTotalAmount, setExpectedTotalAmount] = useState(null);

    const parseChartData = chartData => {
        const result = Object.keys(chartData)
            .filter(key => key !== "name")
            .reduce((acc, key) => {
                acc[key] = chartData[key].map(parseFloat);
                return acc;
            }, {});
        return {...chartData, ...result};
    };

    useEffect(() => {
        PaymentStatsService.getPaymentStats(filter).then(chartData => {
            const parsedChartData = parseChartData(chartData);
            setChartData(parsedChartData);
            setPaidTotalAmount(parsedChartData.contract_paid_total_amount[0]);
            setExpectedTotalAmount(parsedChartData.contract_expected_total_amount[0]);
        });
    }, []);

    const colors = {
        paid: {
            main: "#5B9BD5",
            lightest: "#EFF5FB",
            light: "#AECDEA",
            dark: "#2E72B2",
        },
        pending: {
            main: "#8B6A36",
            lightest: "#F9F6F0",
            light: "#CCAD7B",
            dark: "#765A2E",
        },
        expected: {
            main: "#ED7D31",
            lightest: "#FDF3EC",
            light: "#F5B88E",
            dark: "#CE5D12",
        },
    };

    const chartOptions = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
        plugins: {
            legend: {
                position: "right",
            },
            annotation: {
                annotations: {
                    line1: {
                        type: "line",
                        yMin: paidTotalAmount,
                        yMax: paidTotalAmount,
                        borderColor: colors.paid.light,
                        backgroundColor: colors.paid.light,
                        borderWidth: 2,
                    },
                    line2: {
                        type: "line",
                        yMin: expectedTotalAmount,
                        yMax: expectedTotalAmount,
                        borderColor: colors.expected.light,
                        backgroundColor: colors.expected.light,
                        borderWidth: 2,
                    },
                },
            },
        },
    };

    console.log({chartData});

    return (
        chartData && (
            <LineChart
                title="Supervisión pagos"
                labels={chartData.name}
                datasets={[
                    {
                        data: chartData.cum_paid_total_amount,
                        label: "Pagado",
                        borderWidth: 3,
                        borderColor: colors.paid.main,
                        backgroundColor: colors.paid.main,
                    },
                    {
                        data: chartData.cum_expected_total_amount,
                        label: "Previsto",
                        borderWidth: 2,
                        borderColor: colors.expected.main,
                        backgroundColor: colors.expected.light,
                    },
                ]}
                options={chartOptions}
            />
        )
    );
};

export default ViewPaymentFinancialChart;
