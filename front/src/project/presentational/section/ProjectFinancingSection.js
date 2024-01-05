import {useNavigate} from "react-router-dom";
import {NumberUtil} from "base/format/utilities";

import {
    SectionCard,
    SectionCardHeaderAction,
    SectionField,
    SectionSubheading,
} from "base/ui/section/components";
import LaunchIcon from "@mui/icons-material/Launch";
import Grid from "@mui/material/Grid";

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

    const noFinancingInfoMessage = (
        <SectionField
            value="Este proyecto aún no tiene financiación asignada"
            valueCustomStyle={{fontStyle: "italic"}}
        />
    );

    const getContractInfo = contract => {
        if (contract) {
            return (
                <>
                    <SectionField label="Número" value={contract.number} />
                    <SectionField
                        label="Monto adjudicado"
                        value={NumberUtil.formatCurrency(contract.awarding_budget)}
                    />
                    <SectionField
                        label="Contratista"
                        value={contract.contractor?.name}
                    />
                </>
            );
        }
        return noFinancingInfoMessage;
    };

    const getFinancingProgramInfo = financing_program => {
        if (financing_program) {
            return (
                <>
                    <SectionField label="Programa" value={financing_program.name} />
                    <SectionField
                        label="Financiador/es"
                        value={financing_program.financing_funds
                            .map(financing_fund => financing_fund.name)
                            .join(", ")}
                    />
                </>
            );
        }
        return noFinancingInfoMessage;
    };

    return (
        <SectionCard
            title="Financiación"
            secondaryActions={project.closed ? null : headerActions}
        >
            <Grid container columnSpacing={2}>
                <Grid item md={6}>
                    <SectionSubheading heading="Contrato" />
                    {getContractInfo(project?.construction_contract)}
                </Grid>
                <Grid item md={6}>
                    <SectionSubheading heading="Programa" />
                    {getFinancingProgramInfo(
                        project?.construction_contract?.financing_program
                    )}
                </Grid>
            </Grid>
        </SectionCard>
    );
};

export default ProjectFinancingSection;
