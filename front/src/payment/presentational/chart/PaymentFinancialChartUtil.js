const PaymentFinancialChartUtil = {
    getLegendConfig() {
        return {
            position: "top",
            labels: {
                filter: l => l.text !== "Productos previstos",
            },
        };
    },

    getTooltipConfig(chartData) {
        return {
            callbacks: {
                footer: tooltipItems => {
                    const dataIndex = tooltipItems[0].dataIndex;
                    return chartData.payment_name[dataIndex]
                        ? `Producto: ${chartData.payment_name[dataIndex]}`
                        : "";
                },
            },
        };
    },

    parseChartData(chartData) {
        const result = Object.keys(chartData)
            .filter(key => !["month", "payment_name"].includes(key))
            .reduce((acc, key) => {
                acc[key] = chartData[key].map(value => {
                    const parsedValue = parseFloat(value);
                    return isNaN(parsedValue) ? null : parsedValue;
                });
                return acc;
            }, {});

        // Get last month approved amount and position in array
        const currentApprovedAmount = Math.max.apply(
            Math,
            result["cum_approved_total_amount"]
        );
        const currentApprovedAmountPosition = result[
            "cum_approved_total_amount"
        ].indexOf(currentApprovedAmount);

        // put 0's at first columns and nulls on last columns for approved
        result["cum_approved_total_amount"] = result["cum_approved_total_amount"].map(
            (value, index) => {
                if (!value) {
                    return 0;
                }
                if (index > currentApprovedAmountPosition) {
                    return null;
                }
                return value;
            }
        );

        const hasForecast = result["cum_expected_total_amount"].some(
            value => value != null
        );
        if (hasForecast) {
            // sum current approved amount to expected
            result["cum_expected_total_amount"] = result[
                "cum_expected_total_amount"
            ].map((value, index) => {
                if (index > currentApprovedAmountPosition) {
                    return value + currentApprovedAmount;
                }
                return null;
            });
            result["cum_expected_total_amount"][
                currentApprovedAmountPosition
            ] = currentApprovedAmount;
        }

        // remove no increased data points
        result["cum_approved_total_amount"] = result["cum_approved_total_amount"].map(
            (value, index) => {
                if (
                    index != 0 &&
                    value === result["cum_approved_total_amount"][index - 1]
                ) {
                    return null;
                }
                return value;
            }
        );
        result["cum_expected_total_amount"] = result["cum_expected_total_amount"].map(
            (value, index) => {
                if (
                    index != 0 &&
                    value === result["cum_expected_total_amount"][index - 1]
                ) {
                    return null;
                }
                return value;
            }
        );

        return {...chartData, ...result};
    },
};

export default PaymentFinancialChartUtil;
