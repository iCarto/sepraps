import {useNavigate, useOutletContext} from "react-router-dom";

import {
    SectionCard,
    SectionCardHeaderAction,
    SectionField,
    SectionSubheading,
} from "components/common/presentational";
import LaunchIcon from "@mui/icons-material/Launch";
import EditIcon from "@mui/icons-material/Edit";

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

    return (
        <SectionCard title="Financiación" secondaryActions={headerActions}>
            <SectionField label="Programa:" value={project.financing_fund_name} />
            <SectionField label="Financiador:" value={project.financing_program_name} />
            <SectionSubheading heading="Contrato" />
            <SectionField
                label="Número:"
                value={
                    project.construction_contract
                        ? project.construction_contract?.number
                        : "Este proyecto aún no se ha asignado a ningún contrato"
                }
            />
            <SectionField
                label="Presupuesto:"
                value={
                    project.construction_contract &&
                    project.construction_contract.awarding_budget + " $"
                }
            />
        </SectionCard>
    );
};

export default ProjectFinancingSection;
