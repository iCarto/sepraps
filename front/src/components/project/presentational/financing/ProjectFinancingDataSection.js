import {useOutletContext} from "react-router-dom";

import {SectionCard, SectionField} from "components/common/presentational";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const ProjectFinancingDataSection = () => {
    let project;
    [project] = useOutletContext();

    return (
        <SectionCard title="Programa">
            {project.construction_contract?.financing_program ? (
                <>
                    <SectionField
                        label="Programa de financiación:"
                        value={project.construction_contract.financing_program.name}
                    />
                    <SectionField
                        label="Financiador:"
                        value={project.construction_contract.financing_program.financing_funds
                            .map(financing_fund => financing_fund.name)
                            .join(", ")}
                    />
                </>
            ) : (
                <Stack alignItems="center">
                    <Typography p={6} sx={{fontStyle: "italic"}}>
                        Los datos de financiación de este proyecto se actualizarán
                        cuando sea asignado a un contrato.
                    </Typography>
                </Stack>
            )}
        </SectionCard>
    );
};

export default ProjectFinancingDataSection;
