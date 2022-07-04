import {useNavigate, useOutletContext} from "react-router-dom";
import {AuthAction, useAuth} from "auth";

import {SectionCard, SectionField} from "components/common/presentational";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const ProjectFinancingDataSection = () => {
    const navigate = useNavigate();
    const {ROLES} = useAuth();

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
                        Este proyecto aún no tiene financiador
                    </Typography>
                    <AuthAction
                        roles={[ROLES.EDIT, ROLES.MANAGEMENT, ROLES.SUPERVISION]}
                    >
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                navigate("add");
                            }}
                        >
                            Añadir
                        </Button>
                    </AuthAction>
                </Stack>
            )}
        </SectionCard>
    );
};

export default ProjectFinancingDataSection;
