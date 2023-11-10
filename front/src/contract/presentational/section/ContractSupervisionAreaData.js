import {SectionBox, SectionField} from "base/ui/section/components";
import Grid from "@mui/material/Grid";
import {NumberUtil} from "base/format/utilities";

const ContractSupervisionAreaData = ({supervisionArea}) => {
    return (
        <Grid container spacing={2}>
            <Grid container item xs={6} direction="column">
                <SectionField
                    label="Tipo de supervisión"
                    value={
                        supervisionArea?.supervisor
                            ? "Interna"
                            : supervisionArea?.supervision_contract
                            ? "Externa"
                            : null
                    }
                />
            </Grid>
            {supervisionArea?.supervisor && (
                <Grid container item xs={6} direction="column">
                    <SectionBox label="Supervisor interno">
                        <SectionField
                            label="Supervisor/a"
                            value={supervisionArea?.supervisor?.name}
                        />
                    </SectionBox>
                </Grid>
            )}
            {supervisionArea?.supervision_contract && (
                <Grid container item xs={6} direction="column">
                    <SectionBox label="Contrato de supervisión">
                        <SectionField
                            label="Número"
                            value={supervisionArea?.supervision_contract?.number}
                            linkPath={`/contracts/list/${supervisionArea?.supervision_contract?.id}/summary`}
                        />
                        <SectionField
                            label="Contratista"
                            value={
                                supervisionArea?.supervision_contract?.contractor.name
                            }
                        />
                        <SectionField
                            label="Monto adjudicado"
                            value={NumberUtil.formatInteger(
                                supervisionArea?.supervision_contract?.awarding_budget
                            )}
                            unit="Gs."
                        />
                    </SectionBox>
                </Grid>
            )}
        </Grid>
    );
};

export default ContractSupervisionAreaData;
