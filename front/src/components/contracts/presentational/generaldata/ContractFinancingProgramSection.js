import {useOutletContext, useNavigate} from "react-router-dom";
import {useAuth} from "auth";

import {
    SectionCard,
    SectionCardHeaderAction,
    SectionField,
} from "components/common/presentational";
import EditIcon from "@mui/icons-material/Edit";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const ContractFinancingProgramSection = () => {
    const navigate = useNavigate();
    const {ROLES} = useAuth();

    let contract;
    [contract] = useOutletContext();

    const secondaryActions = [
        <SectionCardHeaderAction
            key="edit"
            name="edit"
            text="Modificar"
            icon={<EditIcon />}
            onClick={() => {
                navigate("financing_program/edit");
            }}
            roles={[ROLES.EDIT, ROLES.MANAGEMENT, ROLES.SUPERVISION]}
        />,
    ];

    return (
        <SectionCard
            title="Programa de financiación"
            secondaryActions={secondaryActions}
        >
            {contract.financing_program ? (
                <>
                    <SectionField
                        label="Programa:"
                        value={contract.financing_program.name}
                    />
                    <SectionField
                        label="Financiador/es:"
                        value={contract.financing_program.financing_funds
                            .map(financing_fund => financing_fund.name)
                            .join(", ")}
                    />
                </>
            ) : (
                <Stack alignItems="center" spacing={2}>
                    <Typography style={{fontStyle: "italic"}}>
                        El contrato aún no tiene programa de financiación asignado
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                            navigate("financing_program/edit");
                        }}
                    >
                        Asignar
                    </Button>
                </Stack>
            )}
        </SectionCard>
    );
};

export default ContractFinancingProgramSection;
