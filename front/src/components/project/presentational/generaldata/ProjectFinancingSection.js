import {useNavigate, useOutletContext} from "react-router-dom";

import {
    SectionCard,
    SectionCardHeaderAction,
    SectionField,
    SectionSubheading,
} from "components/common/presentational";
import LaunchIcon from "@mui/icons-material/Launch";

const ProjectFinancingSection = () => {
    const navigate = useNavigate();

    let project;
    [project] = useOutletContext();

    const headerActions = [
        <SectionCardHeaderAction
            key="Go to financing subpage"
            name="Go to financing subpage"
            text="Ir a la página de Financiación"
            icon={<LaunchIcon />}
            onClick={() => {
                navigate(`financing`);
            }}
        />,
    ];

    const financingInfo = (
        <>
            <SectionField label="Programa:" value={project.financing_fund_name} />
            <SectionField label="Financiador:" value={project.financing_program_name} />
        </>
    );

    const noFinancingInfo = (
        <SectionField
            label="Programa:"
            value="Este proyecto aún no tiene financiador"
            valueFontStyle="italic"
        />
    );

    const contractInfo = (
        <>
            <SectionField
                label="Número:"
                value={project.construction_contract?.number}
            />
            <SectionField
                label="Presupuesto:"
                value={
                    project.construction_contract &&
                    project.construction_contract.awarding_budget + " $"
                }
            />
        </>
    );

    const noContractInfo = (
        <SectionField
            label="Número:"
            value="Este proyecto aún no ha sido asignado a ningún contrato"
            valueFontStyle="italic"
        />
    );

    return (
        <SectionCard title="Financiación" secondaryActions={headerActions}>
            {project.financing_fund_name ? financingInfo : noFinancingInfo}
            <SectionSubheading heading="Contrato" />
            {project.construction_contract ? contractInfo : noContractInfo}
        </SectionCard>
    );
};

export default ProjectFinancingSection;
