import {useNavigate, useOutletContext} from "react-router-dom";
import {NumberUtil} from "base/format/utilities";

import {
    SectionCard,
    SectionCardHeaderAction,
    SectionField,
    SectionSubheading,
} from "base/section/components";
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
                navigate(`/projects/${project.id}/financing`);
            }}
        />,
    ];

    const getFinancingInfo = () => (
        <>
            <SectionField
                label="Programa:"
                value={project.construction_contract.financing_program.name}
            />
            <SectionField
                label="Financiador/es:"
                value={project.construction_contract.financing_program.financing_funds
                    .map(financing_fund => financing_fund.name)
                    .join(", ")}
            />
        </>
    );

    const getNoFinancingInfo = () => (
        <SectionField
            label="Programa:"
            value="Este proyecto aún no tiene programa de financiación"
            valueFontStyle="italic"
        />
    );

    const getContractInfo = () => (
        <>
            <SectionField
                label="Número:"
                value={project.construction_contract.number}
            />
            <SectionField
                label="Monto adjudicado:"
                value={NumberUtil.formatCurrency(
                    project.construction_contract.awarding_budget
                )}
            />
            <SectionField
                label="Contratista:"
                value={project.construction_contract.contractor?.name}
            />
        </>
    );

    const getNoContractInfo = () => (
        <SectionField
            label="Número:"
            value="Este proyecto aún no ha sido asignado a ningún contrato"
            valueFontStyle="italic"
        />
    );

    return (
        <SectionCard title="Financiación" secondaryActions={headerActions}>
            <SectionSubheading heading="Contrato" />
            {project.construction_contract ? getContractInfo() : getNoContractInfo()}
            <SectionSubheading heading="Programa" />
            {project.construction_contract?.financing_program
                ? getFinancingInfo()
                : getNoFinancingInfo()}
        </SectionCard>
    );
};

export default ProjectFinancingSection;
