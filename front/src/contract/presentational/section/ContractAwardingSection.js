import {MAX_MIN_AMOUNT_TYPE} from "contract/model";
import {DateUtil, NumberUtil} from "base/format/utilities";

import {TextLinkForTooltip} from "base/navigation/components";
import {SectionField} from "base/ui/section/components";

import Grid from "@mui/material/Grid";

const AwardingBudgetSection = ({contract, basePath = ""}) => {
    return contract.total_amount_type === MAX_MIN_AMOUNT_TYPE ? (
        <>
            <SectionField
                label="Monto mínimo adjudicado"
                value={NumberUtil.formatInteger(contract.awarding_budget_min)}
                unit="Gs."
            />
            <SectionField
                label="Monto máximo adjudicado"
                value={NumberUtil.formatInteger(contract.awarding_budget)}
                unit="Gs."
                tooltipText={
                    contract.total_awarding_budget ? (
                        <TextLinkForTooltip
                            text="Ver adendas posteriores"
                            to={`${basePath}/execution`}
                        />
                    ) : (
                        ""
                    )
                }
            />
        </>
    ) : (
        <SectionField
            label="Monto adjudicado"
            value={NumberUtil.formatInteger(contract.awarding_budget)}
            unit="Gs."
            tooltipText={
                contract.total_awarding_budget ? (
                    <TextLinkForTooltip
                        text="Ver adendas posteriores"
                        to={`${basePath}/execution`}
                    />
                ) : (
                    ""
                )
            }
        />
    );
};

const ContractAwardingSection = ({contract, basePath = ""}) => {
    const getNoDateMessage = label => (
        <SectionField
            label={label}
            value="Pendiente"
            valueCustomStyle={{fontStyle: "italic"}}
        />
    );

    const getExpectedExecutionPeriodInfo = () => {
        if (contract.execution_start_date) {
            return `${contract.expected_execution_period} días (${contract.expected_execution_period_in_months} meses)`;
        } else return `${contract.expected_execution_period} días`;
    };

    return (
        <Grid container spacing={2}>
            <Grid container item xs={6} direction="column">
                <SectionField
                    label="Fecha de adjudicación"
                    value={DateUtil.formatDate(contract?.awarding_date)}
                />
                {contract?.expected_execution_period ? (
                    <SectionField
                        label="Plazo previsto de ejecución"
                        value={getExpectedExecutionPeriodInfo()}
                        tooltipText={
                            contract.total_expected_execution_period ? (
                                <TextLinkForTooltip
                                    text="Ver adendas posteriores"
                                    to={`${basePath}/execution`}
                                />
                            ) : (
                                ""
                            )
                        }
                    />
                ) : (
                    getNoDateMessage("Plazo previsto de ejecución")
                )}
            </Grid>
            <Grid container item xs={6} direction="column">
                <AwardingBudgetSection contract={contract} basePath={basePath} />
                <SectionField
                    label="Porcentaje de baja"
                    value={NumberUtil.formatDecimal(
                        contract?.awarding_percentage_drop,
                        2
                    )}
                    unit="%"
                />
            </Grid>
        </Grid>
    );
};

export default ContractAwardingSection;
