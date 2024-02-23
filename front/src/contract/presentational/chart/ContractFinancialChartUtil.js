export const FINANCIAL_CHART_CONTRACT_COLORS = {
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
    money: {
        main: "#8B6A36",
        lightest: "#F9F6F0",
        light: "#CCAD7B",
        dark: "#765A2E",
    },
    time: {
        main: "#AAAAAA",
        lightest: "#EEEEEE",
        light: "#DDDDDD",
        dark: "#777777",
    },
};

const ContractFinancialChartUtil = {
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

    getDatalabelsConfig() {
        return {
            display: false,
        };
    },
};

export default ContractFinancialChartUtil;
