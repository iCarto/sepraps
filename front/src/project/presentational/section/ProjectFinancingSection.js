import {useNavigate} from "react-router-dom";
import {CURRENCY_SYMBOL} from "base/format/config/i18n";
import {NumberUtil} from "base/format/utilities";
import {FieldUtil} from "base/ui/section/utilities";

import {
    SectionBox,
    SectionCard,
    SectionCardHeaderAction,
    SectionField,
} from "base/ui/section/components";
import Grid from "@mui/material/Grid";
import LaunchIcon from "@mui/icons-material/Launch";

const ProjectFinancingSection = ({project}) => {
    const navigate = useNavigate();

    const headerActions = [
        <SectionCardHeaderAction
            key="Go to financing subpage"
            name="Go to financing subpage"
            text="Ir a la página de Financiación"
            icon={<LaunchIcon />}
            onClick={() => {
                navigate(`/projects/list/${project.id}/financing`);
            }}
        />,
    ];

    const getNoFinancingInfoMessage = label => {
        return (
            <SectionField
                label={label}
                value="Este proyecto aún no tiene financiación asignada"
                valueCustomStyle={{
                    fontStyle: "italic",
                }}
            />
        );
    };

    const getContractInfo = contract => {
        if (contract) {
            return (
                <>
                    {FieldUtil.getSectionField("Número", contract.number)}
                    {FieldUtil.getSectionField(
                        "Monto adjudicado",
                        NumberUtil.formatInteger(contract.awarding_budget),
                        CURRENCY_SYMBOL
                    )}
                    {FieldUtil.getSectionField("Contratista", contract.name)}
                </>
            );
        }
        return getNoFinancingInfoMessage("Número");
    };

    const getFinancingProgramInfo = financing_program => {
        if (financing_program) {
            return (
                <>
                    {FieldUtil.getSectionField("Programa", financing_program.name)}
                    {FieldUtil.getSectionField(
                        "Financiador/es",
                        financing_program.financing_funds
                            .map(financing_fund => financing_fund.name)
                            .join(", ")
                    )}
                </>
            );
        }
        return getNoFinancingInfoMessage("Programa");
    };

    return (
        <SectionCard
            title="Financiación"
            secondaryActions={project.closed ? null : headerActions}
        >
            <Grid container columnSpacing={2}>
                <Grid item md={6}>
                    <SectionBox label="Contrato">
                        {getContractInfo(project?.construction_contract)}
                    </SectionBox>
                </Grid>
                <Grid item md={6}>
                    <SectionBox label="Programa">
                        {getFinancingProgramInfo(
                            project?.construction_contract?.financing_program
                        )}
                    </SectionBox>
                </Grid>
            </Grid>
        </SectionCard>
    );
};

export default ProjectFinancingSection;
