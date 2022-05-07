import {useNavigate, useOutletContext} from "react-router-dom";

import {
    SectionCard,
    SectionCardHeaderAction,
    SectionField,
} from "components/common/presentational";
import EditIcon from "@mui/icons-material/Edit";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const ProjectFinancingDataSection = () => {
    const navigate = useNavigate();

    let project;
    [project] = useOutletContext();

    const headerActions = [
        <SectionCardHeaderAction
            key="edit"
            name="edit"
            text="Modificar"
            icon={<EditIcon />}
            onClick={() => {
                navigate("edit");
            }}
        />,
    ];

    return (
        <SectionCard
            title="Programa"
            secondaryActions={project.financing_program_name ? headerActions : []}
        >
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
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                            navigate("add");
                        }}
                    >
                        Añadir
                    </Button>
                </Stack>
            )}
        </SectionCard>
    );
};

export default ProjectFinancingDataSection;
