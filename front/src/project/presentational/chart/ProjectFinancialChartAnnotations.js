import {DateUtil, NumberUtil} from "base/format/utilities";
import {FINANCIAL_CHART_CONTRACT_COLORS} from "contract/presentational/chart";

const ProjectFinancialChartAnnotations = {
    getAnnotations(maxAmount, maxAmendedAmount, maxEndDate, maxAmendedEndDate) {
        const annotations = {};

        if (maxAmount) {
            let minAmountDisplay;
            let maxAmountDisplay;
            let labelAmount;
            if (maxAmount instanceof Array) {
                minAmountDisplay = maxAmount[0];
                maxAmountDisplay = maxAmount[1];
                labelAmount = `${NumberUtil.formatCurrency(
                    minAmountDisplay
                )} - ${NumberUtil.formatCurrency(maxAmountDisplay)}`;
            } else {
                minAmountDisplay = maxAmount;
                maxAmountDisplay = maxAmount;
                labelAmount = `${NumberUtil.formatCurrency(maxAmount)}`;
            }
            annotations["max_amount"] = {
                type: "box",
                label: {
                    content: `Monto previsto para componentes de obra (${labelAmount})`,
                    display: true,
                    color: FINANCIAL_CHART_CONTRACT_COLORS.money.light,
                    backgroundColor: "white",
                    padding: 3,
                    font: {size: 9},
                    position: "start",
                    yAdjust: -15,
                },
                yMin: minAmountDisplay,
                yMax: maxAmountDisplay,
                borderColor: FINANCIAL_CHART_CONTRACT_COLORS.money.light,
                backgroundColor: "rgba(55, 42, 21, 0.02)",
                borderWidth: 1,
                borderDash: [3, 6],
                drawTime: "beforeDatasetsDraw",
            };
        }

        if (maxAmendedAmount) {
            annotations["max_amended_amount"] = {
                type: "line",
                label: {
                    content: `Acta del proyecto (${NumberUtil.formatCurrency(
                        maxAmendedAmount
                    )})`,
                    display: true,
                    color: FINANCIAL_CHART_CONTRACT_COLORS.money.dark,
                    backgroundColor: "white",
                    padding: 3,
                    font: {size: 9},
                    position: "start",
                    yAdjust: -10,
                },
                scaleID: "y",
                value: maxAmendedAmount,
                borderColor: FINANCIAL_CHART_CONTRACT_COLORS.money.dark,
                backgroundColor: FINANCIAL_CHART_CONTRACT_COLORS.money.dark,
                borderWidth: 1,
                borderDash: [3, 6],
                drawTime: "beforeDatasetsDraw",
            };
        }

        if (maxEndDate) {
            annotations["max_date"] = {
                type: "line",
                mode: "vertical",
                value: DateUtil.formatYearAndMonth(maxEndDate),
                scaleID: "x",
                borderColor: FINANCIAL_CHART_CONTRACT_COLORS.time.main,
                drawTime: "beforeDatasetsDraw",
                borderWidth: 1,
                borderDash: [3, 6],
                label: {
                    display: true,
                    content: `Fin contrato (${DateUtil.formatDate(maxEndDate)})`,
                    backgroundColor: "white",
                    padding: 3,
                    color: FINANCIAL_CHART_CONTRACT_COLORS.time.main,
                    font: {size: 9},
                    position: "start",
                },
            };
        }

        if (maxAmendedEndDate) {
            annotations["max_amended_date"] = {
                type: "line",
                mode: "vertical",
                value: DateUtil.formatYearAndMonth(maxAmendedEndDate),
                scaleID: "x",
                borderColor: FINANCIAL_CHART_CONTRACT_COLORS.time.dark,
                drawTime: "beforeDatasetsDraw",
                borderWidth: 1,
                borderDash: [3, 6],
                label: {
                    display: true,
                    content: `Fin adenda (${DateUtil.formatDate(maxAmendedEndDate)})`,
                    backgroundColor: "white",
                    padding: 3,
                    color: FINANCIAL_CHART_CONTRACT_COLORS.time.dark,
                    font: {size: 9},
                    position: "start",
                },
            };
        }

        return annotations;
    },
};

export default ProjectFinancialChartAnnotations;
