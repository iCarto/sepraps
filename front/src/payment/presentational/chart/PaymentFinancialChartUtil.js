export const FINANCIAL_CHART_COLORS = {
    approved: {
        main: "#5B9BD5",
        lightest: "#EFF5FB",
        light: "#AECDEA",
        dark: "#2E72B2",
    },
    expected: {
        main: "#ED7D31",
        lightest: "#FDF3EC",
        light: "#F5B88E",
        dark: "#CE5D12",
    },
};

const PaymentFinancialChartUtil = {
    getScalesConfig() {
        return {
            x: {
                grid: {
                    color: "#FAFAFA",
                },
            },
            y: {
                grid: {
                    color: "#F0F0F0",
                },
                beginAtZero: true,
                grace: "10%",
            },
        };
    },

    getLegendConfig() {
        return {
            position: "top",
            labels: {
                filter: l => l.text !== "Productos previstos",
            },
        };
    },

    getDatalabelsConfig() {
        return {
            display: false,
        };
    },

    getTooltipConfig(chartData) {
        return {
            callbacks: {
                footer: tooltipItems => {
                    const dataIndex = tooltipItems[0].dataIndex;
                    return chartData.payment_name[dataIndex]
                        ? `Productos: ${chartData.payment_name[dataIndex]}`
                        : "";
                },
            },
        };
    },
};

export default PaymentFinancialChartUtil;
